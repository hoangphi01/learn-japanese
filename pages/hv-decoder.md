---
layout: default
title: "Bộ Giải Mã Hán-Việt"
permalink: /pages/hv-decoder/
---

# Bộ Giải Mã Hán-Việt → On'yomi

<p>60–70% từ vựng N5 là Hán-Nhật. Dùng 8 quy tắc dưới đây để <strong>đoán On'yomi từ âm Hán-Việt</strong>.</p>

<div id="hv-decoder-tool">
  <div style="margin:1.5rem 0;">
    <label for="hv-input" style="font-weight:600;display:block;margin-bottom:0.5rem;">Nhập từ Hán-Việt:</label>
    <div style="display:flex;gap:0.5rem;">
      <input type="text" id="hv-input" placeholder="Ví dụ: Tâm, Đại, Phong..."
             style="flex:1;padding:0.6rem 1rem;border:2px solid var(--navy-blue);border-radius:var(--radius-sm);font-size:1rem;font-family:inherit;">
      <button class="btn btn-primary" onclick="decodeHV()">Giải mã</button>
    </div>
  </div>
  <div id="hv-result" style="display:none;padding:1rem;background:var(--light-blue);border-radius:var(--radius);margin-bottom:1.5rem;"></div>
</div>

## 8 Quy Tắc Ánh Xạ

{% for rule in site.data.hv_rules %}
<div class="grammar-box box">
<div class="box-title">Quy tắc {{ rule.id }}: {{ rule.hv_pattern }} → {{ rule.onyomi }}</div>
<div class="box-content" markdown="1">

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
function decodeHV() {
  var input = document.getElementById('hv-input').value.trim();
  var result = document.getElementById('hv-result');
  if (!input) { result.style.display = 'none'; return; }

  var rules = [
    { pattern: /^t/i, match: 'T- đầu', predict: 'S-/Z- (Ví dụ: Tâm→Shin, Sinh→Sei)' },
    { pattern: /[cC][hH]?$/i, match: '-c/-ch cuối', predict: '-ku/-ki (Ví dụ: Học→Gaku)' },
    { pattern: /t$/i, match: '-t cuối', predict: '-tsu/-chi (Ví dụ: Nhất→Ichi)' },
    { pattern: /(ng|nh)$/i, match: '-ng/-nh cuối', predict: 'Trường âm -ō/-ū (Ví dụ: Đường→Dō)' },
    { pattern: /^[đĐ]/i, match: 'Đ- đầu', predict: 'D- (Ví dụ: Đại→Dai)' },
    { pattern: /^[Nn]h/i, match: 'Nh- đầu', predict: 'Ni-/Jin- (Ví dụ: Nhân→Jin)' },
    { pattern: /n$/i, match: '-n cuối', predict: '-n giữ nguyên (Ví dụ: Quan→Kan)' },
    { pattern: /^[Pp]h/i, match: 'Ph- đầu', predict: 'H-/F- (Ví dụ: Phong→Fū)' }
  ];

  var matches = [];
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].pattern.test(input)) {
      matches.push('<strong>Quy tắc ' + (i+1) + ':</strong> ' + rules[i].match + ' → ' + rules[i].predict);
    }
  }

  if (matches.length > 0) {
    result.innerHTML = '<p><strong>Phân tích "' + input + '":</strong></p><ul>' +
      matches.map(function(m) { return '<li>' + m + '</li>'; }).join('') + '</ul>';
  } else {
    result.innerHTML = '<p>Không tìm thấy quy tắc phù hợp cho "' + input + '". Hãy thử các từ như: Tâm, Đại, Phong, Học, Nhật...</p>';
  }
  result.style.display = 'block';
}

document.getElementById('hv-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') decodeHV();
});
</script>
