---
layout: default
title: "Bộ Giải Mã Hán-Việt"
permalink: /pages/hv-decoder/
---

# Bộ Giải Mã Hán-Việt → On'yomi

<p>60–70% từ vựng N5 là Hán-Nhật. Dùng bộ giải mã để <strong>dự đoán On'yomi từ âm Hán-Việt</strong> — tra cứu từ điển trước, nếu không có thì áp dụng 8 quy tắc.</p>

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

## 8 Quy Tắc Ánh Xạ

{% for rule in site.data.hv_rules %}
<div class="grammar-box box">
<div class="box-title">Quy tắc {{ rule.id }}: {{ rule.hv_pattern }} → {{ rule.onyomi }}</div>
<div class="box-content" markdown="1">

{{ rule.description }}

| Hán-Việt | On'yomi (Nhật) |
|----------|---------------|
{% for ex in rule.examples %} | {{ ex.hv }} | {{ ex.jp }} |
{% endfor %}

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

  // Compound match — show directly
  if (result.source === 'compound') {
    var comp = result.compound;
    var displayReading = LJHVDecoder.toMacron(comp.reading);
    displayReading = displayReading.charAt(0).toUpperCase() + displayReading.slice(1);
    html += '<div style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">';
    html += 'Kết quả: ' + escapeHtml(result.input) + ' → <span class="jp">' + escapeHtml(comp.kanji) + '</span> ' + escapeHtml(displayReading);
    html += '</div>';
    html += '<div style="padding-left:1rem;">';
    html += '<span style="color:green;">&#10003;</span> tra cứu từ ghép chính xác';
    if (comp.meaning) {
      html += ' — ' + escapeHtml(comp.meaning);
    }
    html += '</div>';
    html += '<div style="margin-top:0.75rem;padding-top:0.5rem;border-top:1px solid rgba(0,0,0,0.1);font-size:0.85rem;">';
    html += '<span style="color:green;">&#10003;</span> Độ tin cậy: <strong>cao</strong> — từ ghép có trong từ điển';
    html += '</div>';

    resultEl.innerHTML = html;
    resultEl.style.display = 'block';
    return;
  }

  // Syllable-by-syllable fallback
  // Build combined kanji string
  var combinedKanji = '';
  for (var c = 0; c < result.syllables.length; c++) {
    combinedKanji += result.syllables[c].kanji || '?';
  }

  // Header line with combined reading
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

  // Per-syllable breakdown
  html += '<div style="padding-left:1rem;">';
  for (var i = 0; i < result.syllables.length; i++) {
    var syl = result.syllables[i];
    html += '<div style="margin-bottom:0.4rem;">';

    if (syl.source === 'dictionary') {
      var reading = LJHVDecoder.toMacron(syl.onyomi);
      html += '<strong>' + escapeHtml(syl.original) + '</strong>';
      html += ' → <span class="jp" style="font-size:1.1em;">' + escapeHtml(syl.kanji) + '</span> ' + escapeHtml(reading);
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
    } else if (syl.source === 'rules') {
      html += '<strong>' + escapeHtml(syl.original) + '</strong>';
      html += ' → <em>(dự đoán theo quy tắc)</em>';
      html += ' — <span style="color:orange;">&#9679; dựa trên quy tắc</span>';
      html += '<br><span style="font-size:0.85rem;color:#666;">  Quy tắc phù hợp: ';
      for (var k = 0; k < syl.ruleMatches.length; k++) {
        if (k > 0) html += ', ';
        html += 'QT' + syl.ruleMatches[k].ruleId + ' (' + escapeHtml(syl.ruleMatches[k].rule.hv_pattern) + ')';
      }
      html += '</span>';
    } else {
      html += '<strong>' + escapeHtml(syl.original) + '</strong>';
      html += ' → <em>(không tìm thấy)</em>';
      html += ' — <span style="color:red;">&#10007; chưa có dữ liệu</span>';
    }

    html += '</div>';
  }
  html += '</div>';

  // Multi-syllable disclaimer for syllable-by-syllable results
  if (result.syllables.length > 1) {
    html += '<div style="margin-top:0.5rem;padding-left:1rem;font-size:0.85rem;color:#886600;">';
    html += '<span style="color:orange;">&#9888;</span> Ghép từng chữ — kiểm tra từ điển Nhật để xác nhận';
    html += '</div>';
  }

  // Confidence indicator
  html += '<div style="margin-top:0.75rem;padding-top:0.5rem;border-top:1px solid rgba(0,0,0,0.1);font-size:0.85rem;">';
  if (result.allResolved) {
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

document.getElementById('hv-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') decodeHV();
});
</script>
