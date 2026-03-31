---
layout: default
title: "Bộ Giải Mã Hán-Việt"
permalink: /pages/hv-decoder/
---

# Bộ Giải Mã Hán-Việt → On'yomi

<p>60–70% từ vựng N5 là Hán-Nhật. Dùng bộ giải mã để <strong>dự đoán On'yomi từ âm Hán-Việt</strong> — tra cứu từ điển trước, nếu không có thì áp dụng 15 quy tắc.</p>

<div id="hv-decoder-tool">
  <div style="margin:1.5rem 0;">
    <label for="hv-input" style="font-weight:600;display:block;margin-bottom:0.5rem;">Nhập từ Hán-Việt:</label>
    <div style="display:flex;gap:0.5rem;">
      <input type="text" id="hv-input" placeholder="Ví dụ: tiểu học, đại học, nhật bản..."
             style="flex:1;padding:0.6rem 1rem;border:2px solid var(--navy-blue);border-radius:var(--radius-sm);font-size:1rem;font-family:inherit;">
      <button class="btn btn-primary" onclick="decodeHV()">Giải mã</button>
    </div>
  </div>
  <div id="hv-result" style="display:none;padding:1rem;background:var(--light-blue);border-radius:var(--radius);margin-bottom:1.5rem;font-family:'Bookerly',Georgia,serif;"></div>
</div>

## Từ Điển Hán-Việt

<p>Tra cứu nhanh bảng ánh xạ Hán-Việt → On'yomi. Nhấn vào dòng bất kỳ để giải mã.</p>

<div class="hv-browse-controls">
  <div class="hv-browse-search">
    <input type="text" id="hv-browse-search" placeholder="Tìm kiếm: ác, 悪, aku, xấu..."
           style="flex:1;padding:0.5rem 0.8rem;border:2px solid var(--navy-blue);border-radius:var(--radius-sm);font-size:0.95rem;font-family:inherit;">
  </div>
  <div class="hv-level-filter">
    <button class="btn" onclick="browseFilter('all')">Tất cả</button>
    <button class="btn active" onclick="browseFilter('N5')">N5</button>
    <button class="btn" onclick="browseFilter('N4')">N4</button>
    <button class="btn" onclick="browseFilter('N3')">N3</button>
  </div>
</div>

<div id="hv-browse-info" style="font-size:0.85rem;color:var(--med-gray);margin-bottom:0.5rem;"></div>

<div style="overflow-x:auto;">
<table class="kana-table" id="hv-browse-table">
<thead>
<tr><th>Hán-Việt</th><th>Kanji</th><th>On'yomi</th><th>Nghĩa</th><th>JLPT</th></tr>
</thead>
<tbody id="hv-browse-body"></tbody>
</table>
</div>

<div class="hv-pagination" id="hv-pagination"></div>

## 15 Quy Tắc Ánh Xạ

{% for rule in site.data.hv_rules %}
<div class="grammar-box box">
<div class="box-title">Quy tắc {{ rule.id }}: {{ rule.hv_pattern }} → {{ rule.onyomi }}</div>
<div class="box-content">

<p>{{ rule.description }}</p>

<table class="kana-table">
<thead>
<tr><th>Hán-Việt</th><th>On'yomi (Nhật)</th></tr>
</thead>
<tbody>
{% for ex in rule.examples %}
<tr><td>{{ ex.hv }}</td><td>{{ ex.jp }}</td></tr>
{% endfor %}
</tbody>
</table>

</div>
</div>
{% endfor %}

<div class="key-box box">
<div class="box-title">Golden Rule: On'yomi vs Kun'yomi</div>
<div class="box-content">
<p><strong>On'yomi</strong> (âm Hán): dùng khi Kanji đi theo cặp (熟語 jukugo). Ánh xạ HV hoạt động ở đây.</p>
<p><strong>Kun'yomi</strong> (âm thuần Nhật): dùng khi Kanji đứng một mình hoặc có okurigana. Không ánh xạ được.</p>
<p style="text-align:center;font-size:1.1rem;margin-top:0.5rem;">
<span class="jp">大学</span> = <strong>Dai</strong>-gaku (On) = Đại Học<br>
<span class="jp">大きい</span> = <strong>oo</strong>-kii (Kun) = to, lớn
</p>
</div>
</div>

<script>
// Initialize decoder with data from Jekyll
LJHVDecoder.init({{ site.data.hv_kanji | jsonify }}, {{ site.data.hv_rules | jsonify }}, {{ site.data.hv_compounds | jsonify }});

function decodeHV() {
  var input = document.getElementById('hv-input').value.trim();
  var resultEl = document.getElementById('hv-result');
  if (!input) { resultEl.style.display = 'none'; return; }

  var result = LJHVDecoder.decode(input);
  if (!result) { resultEl.style.display = 'none'; return; }

  var html = '';

  // Compound match — show compound header, then syllable breakdown
  if (result.source === 'compound') {
    var comp = result.compound;
    var displayReading = LJHVDecoder.toMacron(comp.reading);
    displayReading = displayReading.charAt(0).toUpperCase() + displayReading.slice(1);
    var levelClass = comp.level ? comp.level.toLowerCase() : 'n5';
    html += '<div style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">';
    html += 'Kết quả: ' + escapeHtml(result.input) + ' → <span class="jp">' + escapeHtml(comp.kanji) + '</span> ' + escapeHtml(displayReading);
    if (comp.level) html += ' <span class="hv-level-badge ' + levelClass + '">' + escapeHtml(comp.level) + '</span>';
    html += '</div>';
    html += '<div style="padding-left:1rem;margin-bottom:0.5rem;">';
    html += '<span style="color:green;">&#10003;</span> tra cứu từ ghép chính xác';
    if (comp.meaning) {
      html += ' — ' + escapeHtml(comp.meaning);
    }
    html += '</div>';
  }

  // Build combined kanji string
  var combinedKanji = '';
  for (var c = 0; c < result.syllables.length; c++) {
    combinedKanji += result.syllables[c].kanji || '?';
  }

  // Header line with combined reading (skip if compound — already shown above)
  if (result.source !== 'compound') {
    if (result.combined) {
      var display = LJHVDecoder.toMacron(result.combined);
      html += '<div style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">';
      html += 'Kết quả: ' + escapeHtml(result.input) + ' → <span class="jp">' + escapeHtml(combinedKanji) + '</span> ' + escapeHtml(display);
      html += '</div>';
    } else {
      html += '<div style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">';
      html += 'Phân tích: ' + escapeHtml(result.input);
      if (combinedKanji.indexOf('?') === -1) html += ' → <span class="jp">' + escapeHtml(combinedKanji) + '</span>';
      html += '</div>';
    }
  }

  // Per-syllable / per-kanji breakdown
  if (result.source === 'compound' && result.syllables.length > 0 && result.syllables[0].source === 'compound-breakdown') {
    html += '<div style="padding-left:1rem;margin-top:0.5rem;">';
    html += '<div style="font-weight:600;margin-bottom:0.4rem;">Phân tích từng chữ:</div>';
    for (var i = 0; i < result.syllables.length; i++) {
      var syl = result.syllables[i];
      var reading = LJHVDecoder.toMacron(syl.onyomi);
      reading = reading.charAt(0).toUpperCase() + reading.slice(1);
      html += '<div style="margin-bottom:0.3rem;">';
      html += '<span class="jp" style="font-size:1.1em;">' + escapeHtml(syl.kanji) + '</span>';
      html += ' (' + escapeHtml(reading) + ')';
      html += ' &larr; <em>' + escapeHtml(syl.original) + '</em>';
      html += '</div>';
    }
    if (result.compound && result.compound.note) {
      html += '<div style="margin-top:0.5rem;font-size:0.9rem;color:#886600;">';
      html += '&#128161; ' + escapeHtml(result.compound.note);
      html += '</div>';
    }
    html += '</div>';
  } else {
    // Per-syllable breakdown (syllable-by-syllable fallback)
    html += '<div style="padding-left:1rem;">';
    for (var i = 0; i < result.syllables.length; i++) {
      var syl = result.syllables[i];
      html += '<div style="margin-bottom:0.4rem;">';

      if (syl.source === 'dictionary') {
        var reading = LJHVDecoder.toMacron(syl.onyomi);
        var levelClass = syl.dictMatches[0].level ? syl.dictMatches[0].level.toLowerCase() : 'n5';
        html += '<strong>' + escapeHtml(syl.original) + '</strong>';
        html += ' &rarr; <span class="jp" style="font-size:1.1em;">' + escapeHtml(syl.kanji) + '</span> ' + escapeHtml(reading);
        if (syl.dictMatches[0].meaning) {
          html += ' <em>(' + escapeHtml(syl.dictMatches[0].meaning) + ')</em>';
        }
        html += ' <span class="hv-level-badge ' + levelClass + '">' + escapeHtml(syl.dictMatches[0].level || 'N5') + '</span>';
        html += ' — <span style="color:green;">&#10003; tra cứu chính xác</span>';

        // Show alternatives if multiple dict matches
        if (syl.dictMatches.length > 1) {
          html += '<br><span style="font-size:0.85rem;color:#666;">  Cũng có: ';
          for (var j = 1; j < syl.dictMatches.length && j < 4; j++) {
            if (j > 1) html += ', ';
            html += '<span class="jp">' + escapeHtml(syl.dictMatches[j].kanji) + '</span> ';
            html += LJHVDecoder.toMacron(syl.dictMatches[j].onyomi);
            html += ' (' + escapeHtml(syl.dictMatches[j].meaning) + ')';
          }
          html += '</span>';
        }

        // Related compounds
        var related = LJHVDecoder.findRelatedCompounds(syl.original);
        if (related.length > 0) {
          html += '<div class="hv-related">';
          html += '<h4>Từ ghép liên quan:</h4>';
          for (var r = 0; r < related.length && r < 5; r++) {
            var rel = related[r];
            var relReading = LJHVDecoder.toMacron(rel.reading);
            html += '<div class="hv-related-item">';
            html += '<span class="jp">' + escapeHtml(rel.kanji) + '</span> ';
            html += escapeHtml(relReading) + ' — ' + escapeHtml(rel.meaning);
            html += '</div>';
          }
          html += '</div>';
        }
      } else if (syl.source === 'rules') {
        html += '<strong>' + escapeHtml(syl.original) + '</strong>';
        html += ' &rarr; <em>(dự đoán theo quy tắc)</em>';
        html += ' — <span style="color:orange;">&#9679; dựa trên quy tắc</span>';
        html += '<br><span style="font-size:0.85rem;color:#666;">  Quy tắc phù hợp: ';
        for (var k = 0; k < syl.ruleMatches.length; k++) {
          if (k > 0) html += ', ';
          html += 'QT' + syl.ruleMatches[k].ruleId + ' (' + escapeHtml(syl.ruleMatches[k].rule.hv_pattern) + ')';
        }
        html += '</span>';
      } else {
        html += '<strong>' + escapeHtml(syl.original) + '</strong>';
        html += ' &rarr; <em>(không tìm thấy)</em>';
        html += ' — <span style="color:red;">&#10007; chưa có dữ liệu</span>';
      }

      html += '</div>';
    }
    html += '</div>';
  }

  // Multi-syllable disclaimer for syllable-by-syllable results (not compounds)
  if (result.source !== 'compound' && result.syllables.length > 1) {
    html += '<div style="margin-top:0.5rem;padding-left:1rem;font-size:0.85rem;color:#886600;">';
    html += '<span style="color:orange;">&#9888;</span> Ghép từng chữ — kiểm tra từ điển Nhật để xác nhận';
    html += '</div>';
  }

  // Confidence indicator
  html += '<div style="margin-top:0.75rem;padding-top:0.5rem;border-top:1px solid rgba(0,0,0,0.1);font-size:0.85rem;">';
  if (result.source === 'compound') {
    html += '<span style="color:green;">&#10003;</span> Độ tin cậy: <strong>cao</strong> — từ ghép có trong từ điển';
  } else if (result.allResolved) {
    html += '<span style="color:green;">&#10003;</span> Độ tin cậy: <strong>cao</strong> — tất cả âm tiết đều có trong từ điển';
  } else {
    var dictCount = result.syllables.filter(function(s) { return s.source === 'dictionary'; }).length;
    var ruleCount = result.syllables.filter(function(s) { return s.source === 'rules'; }).length;
    if (dictCount > 0 || ruleCount > 0) {
      html += '<span style="color:orange;">&#9679;</span> Độ tin cậy: <strong>trung bình</strong> — ';
      html += dictCount + '/' + result.syllables.length + ' tra cứu được';
    } else {
      html += '<span style="color:red;">&#10007;</span> Độ tin cậy: <strong>thấp</strong> — không tìm thấy dữ liệu phù hợp';
    }
  }
  html += '</div>';

  resultEl.innerHTML = html;
  resultEl.style.display = 'block';
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Browse table with search + pagination ──
var _browseLevel = 'N5';
var _browseQuery = '';
var _browsePage = 1;
var _browsePerPage = 20;

function getFilteredDict() {
  var dict = LJHVDecoder.getDict();
  var results = [];
  var q = _browseQuery.toLowerCase().trim();
  for (var i = 0; i < dict.length; i++) {
    var e = dict[i];
    if (_browseLevel !== 'all' && e.level !== _browseLevel) continue;
    if (q) {
      var haystack = (e.hv_viet || e.hv) + ' ' + e.hv + ' ' + e.kanji + ' ' + e.onyomi + ' ' + e.meaning;
      if (haystack.toLowerCase().indexOf(q) === -1) continue;
    }
    results.push(e);
  }
  return results;
}

function renderBrowse() {
  var filtered = getFilteredDict();
  var totalPages = Math.max(1, Math.ceil(filtered.length / _browsePerPage));
  if (_browsePage > totalPages) _browsePage = totalPages;
  var start = (_browsePage - 1) * _browsePerPage;
  var page = filtered.slice(start, start + _browsePerPage);

  // Info
  document.getElementById('hv-browse-info').textContent =
    'Hiển thị ' + (filtered.length ? start + 1 : 0) + '–' + Math.min(start + _browsePerPage, filtered.length) + ' / ' + filtered.length + ' mục';

  // Table body
  var html = '';
  for (var i = 0; i < page.length; i++) {
    var e = page[i];
    var lvl = (e.level || 'N5').toLowerCase();
    html += '<tr onclick="browseClick(\'' + escapeAttr(e.hv) + '\')">';
    html += '<td>' + escapeHtml(e.hv_viet || e.hv) + '</td>';
    html += '<td class="jp">' + escapeHtml(e.kanji) + '</td>';
    html += '<td>' + escapeHtml(LJHVDecoder.toMacron(e.onyomi)) + '</td>';
    html += '<td>' + escapeHtml(e.meaning) + '</td>';
    html += '<td><span class="hv-level-badge ' + lvl + '">' + escapeHtml(e.level || 'N5') + '</span></td>';
    html += '</tr>';
  }
  document.getElementById('hv-browse-body').innerHTML = html;

  // Pagination
  var pHtml = '';
  if (totalPages > 1) {
    pHtml += '<button class="btn btn-sm" onclick="browseGo(1)"' + (_browsePage === 1 ? ' disabled' : '') + '>&laquo;</button>';
    pHtml += '<button class="btn btn-sm" onclick="browseGo(' + (_browsePage - 1) + ')"' + (_browsePage === 1 ? ' disabled' : '') + '>&lsaquo;</button>';
    // Show page numbers around current
    var pStart = Math.max(1, _browsePage - 2);
    var pEnd = Math.min(totalPages, _browsePage + 2);
    for (var p = pStart; p <= pEnd; p++) {
      pHtml += '<button class="btn btn-sm' + (p === _browsePage ? ' active' : '') + '" onclick="browseGo(' + p + ')">' + p + '</button>';
    }
    pHtml += '<button class="btn btn-sm" onclick="browseGo(' + (_browsePage + 1) + ')"' + (_browsePage === totalPages ? ' disabled' : '') + '>&rsaquo;</button>';
    pHtml += '<button class="btn btn-sm" onclick="browseGo(' + totalPages + ')"' + (_browsePage === totalPages ? ' disabled' : '') + '>&raquo;</button>';
  }
  document.getElementById('hv-pagination').innerHTML = pHtml;
}

function browseFilter(level) {
  _browseLevel = level;
  _browsePage = 1;
  var btns = document.querySelectorAll('.hv-level-filter button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
    var txt = btns[i].textContent.trim();
    if (txt === level || (level === 'all' && txt === 'Tất cả')) btns[i].classList.add('active');
  }
  renderBrowse();
}

function browseGo(page) {
  _browsePage = page;
  renderBrowse();
  document.getElementById('hv-browse-table').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function browseClick(hv) {
  var input = document.getElementById('hv-input');
  input.value = hv;
  decodeHV();
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function escapeAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Search input
document.getElementById('hv-browse-search').addEventListener('input', function() {
  _browseQuery = this.value;
  _browsePage = 1;
  renderBrowse();
});

// Init browse on load
document.addEventListener('DOMContentLoaded', function() {
  renderBrowse();
});

document.getElementById('hv-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') decodeHV();
});
</script>
