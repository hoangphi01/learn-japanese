/**
 * Phrasebook — Sổ Tay Du Lịch Nhật Bản
 * Category filter, search, copy, TTS, mini-dictionary
 */
var LJPhrasebook = (function () {
  'use strict';

  var _data = [];
  var _currentCat = 'all';
  var _searchQuery = '';
  var _slowMode = localStorage.getItem('lj_tts_slow') === 'true';

  function init(data) {
    _data = data || [];
    renderCategories();
    renderPhrases();
    bindEvents();
    updateSlowToggle();
  }

  function toggleSlow() {
    _slowMode = !_slowMode;
    localStorage.setItem('lj_tts_slow', _slowMode ? 'true' : 'false');
    updateSlowToggle();
  }

  function updateSlowToggle() {
    var btn = document.getElementById('tts-slow-toggle');
    if (!btn) return;
    if (_slowMode) {
      btn.classList.add('active');
      btn.innerHTML = '&#128034; Chậm: ON';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '&#128034; Chậm';
    }
  }

  // ── Category pills ──

  function renderCategories() {
    var container = document.getElementById('phrase-categories');
    if (!container) return;
    var html = '<button class="phrase-cat-btn active" data-cat="all">Tất cả</button>';
    for (var i = 0; i < _data.length; i++) {
      var cat = _data[i];
      html += '<button class="phrase-cat-btn" data-cat="' + cat.category + '">'
            + cat.icon + ' ' + cat.title + '</button>';
    }
    container.innerHTML = html;

    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.phrase-cat-btn');
      if (!btn) return;
      _currentCat = btn.getAttribute('data-cat');
      var btns = container.querySelectorAll('.phrase-cat-btn');
      for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
      btn.classList.add('active');
      renderPhrases();
    });
  }

  // ── Phrase grid ──

  function getFiltered() {
    var results = [];
    var q = _searchQuery.toLowerCase().trim();
    for (var i = 0; i < _data.length; i++) {
      var cat = _data[i];
      if (_currentCat !== 'all' && cat.category !== _currentCat) continue;
      for (var j = 0; j < cat.phrases.length; j++) {
        var p = cat.phrases[j];
        if (q) {
          var haystack = (p.vi + ' ' + p.jp + ' ' + p.romaji + ' ' + (p.note || '')).toLowerCase();
          if (haystack.indexOf(q) === -1) continue;
        }
        results.push({ phrase: p, catTitle: cat.title, catIcon: cat.icon });
      }
    }
    return results;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function renderPhrases() {
    var grid = document.getElementById('phrase-grid');
    if (!grid) return;
    var items = getFiltered();

    if (items.length === 0) {
      grid.innerHTML = '<p style="color:var(--med-gray);grid-column:1/-1;">Không tìm thấy cụm từ nào.</p>';
      updateCount(0);
      return;
    }

    var html = '';
    for (var i = 0; i < items.length; i++) {
      var p = items[i].phrase;
      html += '<div class="phrase-card">';
      html += '<div class="phrase-card-vi">' + escapeHtml(p.vi) + '</div>';
      html += '<div class="phrase-card-jp">' + escapeHtml(p.jp) + '</div>';
      html += '<div class="phrase-card-romaji">' + escapeHtml(p.romaji) + '</div>';
      if (p.note) {
        html += '<div class="phrase-card-note">' + escapeHtml(p.note) + '</div>';
      }
      html += '<div class="phrase-card-actions">';
      html += '<button class="btn btn-sm phrase-copy-btn" data-text="' + escapeHtml(p.jp) + '" title="Copy">&#128203; Copy</button>';
      html += '<button class="btn btn-sm phrase-tts-btn" data-text="' + escapeHtml(p.jp) + '" title="Nghe phát âm">&#128264; Nghe</button>';
      html += '</div>';
      html += '</div>';
    }
    grid.innerHTML = html;
    updateCount(items.length);
  }

  function updateCount(n) {
    var el = document.getElementById('phrase-count');
    if (el) el.textContent = n + ' cụm từ';
  }

  // ── Copy & TTS ──

  function handleCopy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Đã copy!');
      });
    } else {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Đã copy!');
    }
  }

  function handleTTS(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ TTS');
      return;
    }
    // Cancel any current speech
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP';
    utter.rate = _slowMode ? 0.5 : 0.85;
    // Try to find a Japanese voice
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang.indexOf('ja') === 0) {
        utter.voice = voices[i];
        break;
      }
    }
    window.speechSynthesis.speak(utter);
  }

  function showToast(msg) {
    var existing = document.querySelector('.phrase-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'phrase-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 1500);
  }

  // ── Mini dictionary ──

  function containsJapanese(str) {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(str);
  }

  function translate() {
    var input = document.getElementById('dict-input');
    var resultEl = document.getElementById('dict-result');
    if (!input || !resultEl) return;
    var text = input.value.trim();
    if (!text) {
      resultEl.innerHTML = '<span style="color:var(--med-gray);">Nhập từ hoặc câu để dịch...</span>';
      return;
    }

    var isJP = containsJapanese(text);
    var langpair = isJP ? 'ja|vi' : 'vi|ja';
    var dirLabel = isJP ? 'JP → VN' : 'VN → JP';

    resultEl.innerHTML = '<span style="color:var(--med-gray);">Đang dịch...</span>';

    // Update direction indicator
    var dirEl = document.getElementById('dict-direction-label');
    if (dirEl) dirEl.textContent = dirLabel;

    var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + langpair;

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
          var translated = data.responseData.translatedText;
          var html = '<div class="dict-result-direction">' + escapeHtml(dirLabel) + '</div>';
          html += '<div class="dict-result-original">' + escapeHtml(text) + '</div>';
          html += '<div class="dict-result-translated">' + escapeHtml(translated) + '</div>';

          // Show alternative matches if available
          if (data.matches && data.matches.length > 1) {
            html += '<div class="dict-result-alts">';
            var shown = 0;
            for (var i = 0; i < data.matches.length && shown < 3; i++) {
              var m = data.matches[i];
              if (m.translation === translated) continue;
              html += '<div class="dict-alt-item">' + escapeHtml(m.translation) + '</div>';
              shown++;
            }
            html += '</div>';
          }
          resultEl.innerHTML = html;
        } else {
          resultEl.innerHTML = '<span style="color:var(--japan-red);">Không tìm thấy kết quả.</span>';
        }
      })
      .catch(function () {
        resultEl.innerHTML = '<span style="color:var(--japan-red);">Lỗi kết nối. Vui lòng thử lại sau.</span>';
      });
  }

  // ── Event binding ──

  function bindEvents() {
    // Search
    var searchInput = document.getElementById('phrase-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        _searchQuery = this.value;
        renderPhrases();
      });
    }

    // Delegate copy & TTS clicks
    var grid = document.getElementById('phrase-grid');
    if (grid) {
      grid.addEventListener('click', function (e) {
        var copyBtn = e.target.closest('.phrase-copy-btn');
        if (copyBtn) {
          handleCopy(copyBtn.getAttribute('data-text'));
          return;
        }
        var ttsBtn = e.target.closest('.phrase-tts-btn');
        if (ttsBtn) {
          handleTTS(ttsBtn.getAttribute('data-text'));
          return;
        }
      });
    }

    // Dictionary translate button
    var dictBtn = document.getElementById('dict-translate-btn');
    if (dictBtn) {
      dictBtn.addEventListener('click', translate);
    }

    // Dictionary input enter key
    var dictInput = document.getElementById('dict-input');
    if (dictInput) {
      dictInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') translate();
      });
    }

    // Load voices for TTS (some browsers need this)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.getVoices();
      };
    }
  }

  return { init: init, toggleSlow: toggleSlow };
})();
