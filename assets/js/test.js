// ============================================================
// TEST ENGINE — Kiểm tra từ vựng (LJTest)
// ============================================================

var LJTest = (function () {
  var KNOWN_KEY = 'lj_test_known';

  // ─── State ─────────────────────────────────
  var allWords = [];
  var filteredWords = [];
  var knownWords = [];
  var selectedChapters = [];
  var config = { pool: 'all', type: 'meaning', count: 10 };
  var questions = [];
  var questionResults = [];
  var currentIndex = 0;
  var correctCount = 0;
  var wrongCount = 0;
  var startTime = 0;
  var answering = false;
  var timerInterval = null;
  var elapsedSeconds = 0;

  // ─── Init ──────────────────────────────────
  function init() {
    allWords = window.LJ_VOCABULARY || [];
    knownWords = loadKnown();
    buildChapterFilter();
    filterByChapters();
    updateCounts();
  }

  function buildChapterFilter() {
    var container = document.getElementById('chapter-filter');
    if (!container) return;

    // Find unique chapters and group by phase
    var chapterMap = {};
    allWords.forEach(function (w) {
      if (!chapterMap[w.chapter]) chapterMap[w.chapter] = true;
    });

    var chapters = Object.keys(chapterMap).map(Number).sort(function (a, b) { return a - b; });

    // Group by phase: 1-3=Phase1, 4-6=Phase2, 7-9=Phase3, 10-14=Phase4, 15-19=Phase5, 20=Phase6
    var phases = [
      { label: 'Phase 1 — Kana & Âm', range: [1, 3] },
      { label: 'Phase 2 — Cơ Bản', range: [4, 6] },
      { label: 'Phase 3 — Giao Tiếp', range: [7, 9] },
      { label: 'Phase 4 — Ngữ Pháp', range: [10, 14] },
      { label: 'Phase 5 — Nâng Cao', range: [15, 19] },
      { label: 'Phase 6 — Tổng Ôn', range: [20, 20] }
    ];

    var html = '<div class="config-select-all">' +
      '<button onclick="LJTest.selectAllChapters(true)">Chọn tất cả</button>' +
      '<button onclick="LJTest.selectAllChapters(false)">Bỏ chọn</button>' +
      '</div>';

    phases.forEach(function (phase) {
      var phaseChapters = chapters.filter(function (ch) {
        return ch >= phase.range[0] && ch <= phase.range[1];
      });
      if (phaseChapters.length === 0) return;

      html += '<div class="config-phase-group">';
      html += '<div class="config-phase-label">' + phase.label + '</div>';
      html += '<div class="config-chapter-grid">';
      phaseChapters.forEach(function (ch) {
        var count = allWords.filter(function (w) { return w.chapter === ch; }).length;
        html += '<label class="config-chapter-item">' +
          '<input type="checkbox" value="' + ch + '" checked onchange="LJTest.onChapterChange()">' +
          '<span>Ch' + ch + ' (' + count + ')</span>' +
          '</label>';
      });
      html += '</div></div>';
    });

    container.innerHTML = html;
    selectedChapters = chapters.slice();
  }

  function onChapterChange() {
    var checkboxes = document.querySelectorAll('#chapter-filter input[type="checkbox"]');
    selectedChapters = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) selectedChapters.push(parseInt(cb.value, 10));
    });
    filterByChapters();
    updateCounts();
  }

  function selectAllChapters(select) {
    var checkboxes = document.querySelectorAll('#chapter-filter input[type="checkbox"]');
    checkboxes.forEach(function (cb) { cb.checked = select; });
    onChapterChange();
  }

  function filterByChapters() {
    filteredWords = allWords.filter(function (w) {
      return selectedChapters.indexOf(w.chapter) !== -1;
    });
  }

  function loadKnown() {
    try {
      return JSON.parse(localStorage.getItem(KNOWN_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveKnown() {
    localStorage.setItem(KNOWN_KEY, JSON.stringify(knownWords));
  }

  function updateCounts() {
    var allEl = document.getElementById('pool-all-count');
    var knownEl = document.getElementById('pool-known-count');
    var progressEl = document.getElementById('known-progress');

    var filteredKnown = knownWords.filter(function (k) {
      return filteredWords.some(function (w) { return w.word === k; });
    });

    if (allEl) allEl.textContent = filteredWords.length;
    if (knownEl) knownEl.textContent = filteredKnown.length;
    if (progressEl) {
      var sym = window.LJ_SYMBOLS || {};
      progressEl.innerHTML = filteredKnown.length + ' / ' + filteredWords.length + ' từ đã nhớ <img src="' + (sym.star || '/assets/symbols/star.svg') + '" alt="" class="test-icon test-icon-star">';
    }
  }

  // ─── Config Controls ──────────────────────────
  function setPool(btn) {
    activateBtn(btn);
    config.pool = btn.getAttribute('data-pool');
  }

  function setType(btn) {
    activateBtn(btn);
    config.type = btn.getAttribute('data-type');
  }

  function setCount(btn) {
    activateBtn(btn);
    var val = btn.getAttribute('data-count');
    var customInput = document.getElementById('custom-count');

    if (val === 'custom') {
      if (customInput) customInput.style.display = 'block';
      config.count = 'custom';
    } else {
      if (customInput) customInput.style.display = 'none';
      config.count = val === 'all' ? 'all' : parseInt(val, 10);
    }
  }

  function activateBtn(btn) {
    var siblings = btn.parentElement.querySelectorAll('.config-btn');
    siblings.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
  }

  function resetKnown() {
    if (!confirm('Đặt lại tất cả từ đã nhớ?')) return;
    knownWords = [];
    saveKnown();
    updateCounts();
  }

  // ─── Test Mode (Immersive) ──────────────────
  function enterTestMode() {
    document.body.classList.add('test-mode');
    var navbar = document.getElementById('test-navbar');
    if (navbar) navbar.style.display = '';
    elapsedSeconds = 0;
    updateTimer();
    timerInterval = setInterval(function () {
      elapsedSeconds++;
      updateTimer();
    }, 1000);
    updateNavbar();
  }

  function exitTestMode() {
    document.body.classList.remove('test-mode');
    var navbar = document.getElementById('test-navbar');
    if (navbar) navbar.style.display = 'none';
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimer() {
    var mins = Math.floor(elapsedSeconds / 60);
    var secs = elapsedSeconds % 60;
    var str = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    var el = document.getElementById('tn-timer');
    if (el) el.textContent = str;
  }

  function updateNavbar() {
    var total = questions.length;
    var current = currentIndex + 1;
    var pct = total > 0 ? (currentIndex / total) * 100 : 0;

    var fillEl = document.getElementById('tn-progress-fill');
    var textEl = document.getElementById('tn-progress-text');
    var correctEl = document.getElementById('tn-correct');
    var wrongEl = document.getElementById('tn-wrong');

    if (fillEl) fillEl.style.width = pct + '%';
    if (textEl) textEl.textContent = 'Câu ' + current + '/' + total;
    if (correctEl) correctEl.textContent = correctCount;
    if (wrongEl) wrongEl.textContent = wrongCount;
  }

  function confirmExit() {
    if (confirm('Bạn có chắc muốn thoát bài kiểm tra?')) {
      exitTestMode();
      backToConfig();
    }
  }

  // ─── Start Test ───────────────────────────────
  function start() {
    filterByChapters();
    var pool = getPool();
    if (pool.length < 4) {
      alert('Cần ít nhất 4 từ để bắt đầu kiểm tra!');
      return;
    }

    var count = config.count;
    if (count === 'custom') {
      var customInput = document.getElementById('custom-count');
      count = parseInt(customInput ? customInput.value : '10', 10);
      if (isNaN(count) || count < 1) {
        alert('Vui lòng nhập số câu hợp lệ!');
        return;
      }
    }
    if (count === 'all') count = pool.length;
    count = Math.min(count, pool.length);

    // Generate questions
    var shuffled = shuffle(pool.slice());
    var selected = shuffled.slice(0, count);
    questions = selected.map(function (word) {
      return generateQuestion(word, pool);
    });

    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    questionResults = [];
    startTime = Date.now();
    answering = false;

    showScreen('test-quiz');
    enterTestMode();
    showQuestion(0);
  }

  function getPool() {
    var skipKnown = document.getElementById('toggle-skip-known');
    var skip = skipKnown && skipKnown.checked;

    var pool;
    if (config.pool === 'known') {
      pool = filteredWords.filter(function (w) {
        return knownWords.indexOf(w.word) !== -1;
      });
    } else {
      pool = filteredWords.slice();
    }

    if (skip) {
      pool = pool.filter(function (w) {
        return knownWords.indexOf(w.word) === -1;
      });
    }

    return pool;
  }

  function generateQuestion(wordObj, pool) {
    var type = config.type;
    if (type === 'both') {
      type = Math.random() < 0.5 ? 'meaning' : 'word';
    }

    // Prefer distractors from the same chapter
    var sameChapter = pool.filter(function (w) {
      return w.word !== wordObj.word && w.chapter === wordObj.chapter;
    });
    var otherChapter = pool.filter(function (w) {
      return w.word !== wordObj.word && w.chapter !== wordObj.chapter;
    });

    var wrongPool = shuffle(sameChapter).concat(shuffle(otherChapter));
    var seen = {};
    var wrongs = [];
    for (var i = 0; i < wrongPool.length && wrongs.length < 3; i++) {
      var key = type === 'meaning' ? wrongPool[i].vi : wrongPool[i].word;
      if (key !== (type === 'meaning' ? wordObj.vi : wordObj.word) && !seen[key]) {
        seen[key] = true;
        wrongs.push(wrongPool[i]);
      }
    }

    var options = wrongs.concat([wordObj]);
    options = shuffle(options);

    return {
      wordObj: wordObj,
      type: type,
      options: options,
      correctIndex: options.indexOf(wordObj)
    };
  }

  // ─── Quiz Display ─────────────────────────────
  function showQuestion(index) {
    var q = questions[index];
    var hideRomaji = document.getElementById('toggle-hide-romaji');
    var hide = hideRomaji && hideRomaji.checked;

    var charEl = document.getElementById('test-char');
    var kanaEl = document.getElementById('test-kana');
    var romajiEl = document.getElementById('test-romaji');
    var speakBtn = document.getElementById('test-speak-btn');

    if (q.type === 'meaning') {
      // Show Japanese word → pick Vietnamese meaning
      charEl.className = 'test-char';
      charEl.textContent = q.wordObj.word;
      if (kanaEl) {
        kanaEl.textContent = q.wordObj.kana !== q.wordObj.word ? q.wordObj.kana : '';
        kanaEl.style.display = q.wordObj.kana !== q.wordObj.word ? '' : 'none';
      }
      if (romajiEl) {
        romajiEl.textContent = q.wordObj.romaji;
        romajiEl.className = 'test-romaji' + (hide ? ' hidden' : '');
      }
      if (speakBtn) speakBtn.style.display = '';
    } else {
      // Show Vietnamese meaning → pick Japanese word
      charEl.className = 'test-prompt-meaning';
      charEl.textContent = q.wordObj.vi;
      if (kanaEl) {
        kanaEl.textContent = q.wordObj.romaji;
        kanaEl.className = 'test-kana' + (hide ? ' hidden' : '');
        kanaEl.style.display = '';
      }
      if (romajiEl) {
        romajiEl.textContent = '';
        romajiEl.style.display = 'none';
      }
      if (speakBtn) speakBtn.style.display = 'none';
    }

    // Render options
    var optionsEl = document.getElementById('test-options');
    optionsEl.innerHTML = '';
    q.options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'test-option-btn';
      if (q.type === 'meaning') {
        btn.textContent = opt.vi;
      } else {
        btn.innerHTML = '<span class="jp">' + opt.word + '</span>';
      }
      btn.setAttribute('data-index', i);
      btn.onclick = function () { selectAnswer(btn, i); };
      optionsEl.appendChild(btn);
    });

    answering = false;
    updateNavbar();
  }

  function selectAnswer(btn, index) {
    if (answering) return;
    answering = true;

    var q = questions[currentIndex];
    var isCorrect = (index === q.correctIndex);
    var allBtns = document.querySelectorAll('#test-options .test-option-btn');

    allBtns.forEach(function (b) {
      var i = parseInt(b.getAttribute('data-index'), 10);
      if (i === q.correctIndex) b.classList.add('correct');
      if (i !== index && i !== q.correctIndex) b.classList.add('disabled');
    });

    // TTS: speak the word
    if (typeof LJFlashcard !== 'undefined' && LJFlashcard.speak) {
      LJFlashcard.speak(q.wordObj.word);
    }

    if (isCorrect) {
      correctCount++;
      if (knownWords.indexOf(q.wordObj.word) === -1) {
        knownWords.push(q.wordObj.word);
        saveKnown();
      }
    } else {
      btn.classList.add('incorrect');
      wrongCount++;
    }

    questionResults.push({
      wordObj: q.wordObj,
      type: q.type,
      correct: isCorrect,
      chosen: q.options[index]
    });

    updateNavbar();

    var delay = isCorrect ? 800 : 1200;
    setTimeout(function () {
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestion(currentIndex);
      } else {
        showResults();
      }
    }, delay);
  }

  function speakCurrent() {
    if (questions.length === 0) return;
    var q = questions[currentIndex];
    if (typeof LJFlashcard !== 'undefined' && LJFlashcard.speak) {
      LJFlashcard.speak(q.wordObj.word);
    }
  }

  // ─── Results ──────────────────────────────────
  function showResults() {
    exitTestMode();

    var total = questions.length;
    var pct = Math.round((correctCount / total) * 100);

    document.getElementById('results-score-big').textContent = correctCount + '/' + total;

    var msgEl = document.getElementById('results-message');
    if (pct === 100) msgEl.textContent = 'Xuất sắc! Bạn nhớ hết rồi!';
    else if (pct >= 80) msgEl.textContent = 'Tốt lắm! Gần hoàn hảo!';
    else if (pct >= 60) msgEl.textContent = 'Khá tốt! Cần ôn thêm một chút.';
    else msgEl.textContent = 'Cần ôn tập thêm nhiều hơn!';

    document.getElementById('results-correct-count').textContent = correctCount + ' ĐÚNG';
    document.getElementById('results-wrong-count').textContent = wrongCount + ' SAI';

    var mins = Math.floor(elapsedSeconds / 60);
    var secs = elapsedSeconds % 60;
    var timeStr = mins > 0 ? mins + ' phút ' + secs + ' giây' : secs + ' giây';
    document.getElementById('results-time').textContent = 'Thời gian: ' + timeStr;

    // Render word list
    var listEl = document.getElementById('results-word-list');
    listEl.innerHTML = '';

    questionResults.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'results-word-row ' + (r.correct ? 'correct' : 'wrong');

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = r.correct;
      cb.setAttribute('data-word', r.wordObj.word);
      cb.addEventListener('change', function () { updateSaveCount(); });

      var charSpan = document.createElement('span');
      charSpan.className = 'rw-char';
      charSpan.textContent = r.wordObj.word;

      var infoDiv = document.createElement('div');
      infoDiv.className = 'rw-info';
      infoDiv.innerHTML =
        '<span class="rw-kana">' + r.wordObj.kana + '</span>' +
        '<span class="rw-romaji">' + r.wordObj.romaji + '</span>' +
        '<span class="rw-meaning">' + r.wordObj.vi + '</span>';

      var statusSpan = document.createElement('span');
      statusSpan.className = 'rw-status';
      var sym = window.LJ_SYMBOLS || {};
      var iconSrc = r.correct ? (sym.correct || '/assets/symbols/correct.svg') : (sym.wrong || '/assets/symbols/wrong.svg');
      var iconClass = r.correct ? 'test-icon-correct' : 'test-icon-wrong';
      statusSpan.innerHTML = '<img src="' + iconSrc + '" alt="" class="test-icon ' + iconClass + '">';

      row.appendChild(cb);
      row.appendChild(charSpan);
      row.appendChild(infoDiv);
      row.appendChild(statusSpan);
      listEl.appendChild(row);
    });

    updateSaveCount();
    updateCounts();
    showScreen('test-results');
  }

  function updateSaveCount() {
    var checkboxes = document.querySelectorAll('#results-word-list input[type="checkbox"]');
    var checked = 0;
    checkboxes.forEach(function (cb) { if (cb.checked) checked++; });
    var btn = document.getElementById('btn-save-known');
    var sym = window.LJ_SYMBOLS || {};
    if (btn) btn.innerHTML = '<img src="' + (sym.star || '/assets/symbols/star.svg') + '" alt="" class="test-icon test-icon-star"> Lưu từ đã nhớ (' + checked + ' từ)';
  }

  function saveMarked() {
    var checkboxes = document.querySelectorAll('#results-word-list input[type="checkbox"]');
    var markedWords = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) markedWords.push(cb.getAttribute('data-word'));
    });

    markedWords.forEach(function (w) {
      if (knownWords.indexOf(w) === -1) knownWords.push(w);
    });

    var unchecked = [];
    checkboxes.forEach(function (cb) {
      if (!cb.checked) unchecked.push(cb.getAttribute('data-word'));
    });
    knownWords = knownWords.filter(function (k) {
      return unchecked.indexOf(k) === -1;
    });

    saveKnown();
    updateCounts();

    var btn = document.getElementById('btn-save-known');
    if (btn) {
      var sym2 = window.LJ_SYMBOLS || {};
      btn.innerHTML = '<img src="' + (sym2.correct || '/assets/symbols/correct.svg') + '" alt="" class="test-icon test-icon-correct"> Đã lưu!';
      btn.disabled = true;
      setTimeout(function () {
        btn.disabled = false;
        updateSaveCount();
      }, 1500);
    }
  }

  // ─── Navigation ───────────────────────────────
  function showScreen(id) {
    var screens = document.querySelectorAll('.test-screen');
    screens.forEach(function (s) { s.style.display = 'none'; });
    var target = document.getElementById(id);
    if (target) target.style.display = 'block';
  }

  function backToConfig() {
    exitTestMode();
    filterByChapters();
    updateCounts();
    showScreen('test-config');
  }

  function retry() {
    start();
  }

  // ─── Helpers ──────────────────────────────────
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // ─── Init on DOM ready ────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    setPool: setPool,
    setType: setType,
    setCount: setCount,
    start: start,
    speakCurrent: speakCurrent,
    backToConfig: backToConfig,
    retry: retry,
    resetKnown: resetKnown,
    confirmExit: confirmExit,
    saveMarked: saveMarked,
    onChapterChange: onChapterChange,
    selectAllChapters: selectAllChapters
  };
})();
