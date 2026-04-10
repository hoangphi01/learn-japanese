---
layout: default
title: "Luyện Đọc N5"
permalink: /reading/
---

<h1>Luyện Đọc N5</h1>
<p>{{ site.data.reading_practice | size }} đoạn văn ngắn với furigana (chữ nhỏ phía trên kanji) và từ vựng. Nhấn vào đoạn để xem bản dịch.</p>

<div class="reading-list">
{% for text in site.data.reading_practice %}
<div class="reading-card" id="reading-{{ text.id }}">
  <div class="reading-header">
    <h2 class="reading-title">{{ text.title }}</h2>
    <span class="reading-badge">{{ text.level }}</span>
  </div>

  <div class="reading-text">
    {{ text.text_html }}
  </div>

  <div class="reading-actions">
    <button class="btn btn-secondary reading-toggle" onclick="this.closest('.reading-card').classList.toggle('show-translation')">
      Xem bản dịch
    </button>
    <button class="btn btn-secondary" onclick="LJReading.speakText(this)" data-text="{{ text.text_html | strip_html }}">
      <img src="{{ site.baseurl }}/assets/symbols/speaker.svg" alt="Nghe" class="tts-icon"> Nghe
    </button>
  </div>

  <div class="reading-translation">
    <p>{{ text.translation }}</p>
  </div>

  <div class="reading-vocab">
    <h4>Từ vựng</h4>
    <table class="kana-table">
      <thead>
        <tr><th>Từ</th><th>Đọc</th><th>Nghĩa</th></tr>
      </thead>
      <tbody>
        {% for v in text.vocabulary %}
        <tr>
          <td>{{ v.word }}</td>
          <td>{{ v.reading }}</td>
          <td>{{ v.meaning }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>
{% endfor %}
</div>

<style>
.reading-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.reading-card {
  background: white;
  border: 3px solid var(--navy-blue);
  box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
  padding: 1.5rem;
}

.reading-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reading-title {
  font-size: 1.1rem;
  font-family: var(--font-jp);
}

.reading-badge {
  font-family: var(--font-pixel);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  background: var(--gold-accent);
  color: white;
}

.reading-text {
  font-family: var(--font-jp);
  font-size: 1.2rem;
  line-height: 2.2;
  padding: 1rem;
  background: var(--cream-bg);
  border-left: 4px solid var(--navy-blue);
  margin-bottom: 1rem;
}

.reading-text ruby {
  ruby-align: center;
}

.reading-text rt {
  font-size: 0.55em;
  color: var(--med-gray);
}

.reading-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.reading-translation {
  display: none;
  padding: 0.75rem;
  background: var(--light-green);
  border-left: 4px solid var(--hira-color);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.reading-card.show-translation .reading-translation {
  display: block;
}

.reading-card.show-translation .reading-toggle {
  background: var(--hira-color);
  color: white;
  border-color: var(--hira-color);
}

.reading-vocab {
  margin-top: 0.5rem;
}

.reading-vocab h4 {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* Modern theme */
[data-theme="modern"] .reading-card {
  border-radius: var(--radius);
  border-width: 1px;
  box-shadow: var(--shadow);
}

[data-theme="modern"] .reading-badge {
  border-radius: 4px;
}

[data-theme="modern"] .reading-text {
  border-radius: var(--radius);
}

[data-theme="modern"] .reading-translation {
  border-radius: var(--radius-sm);
}
</style>

<script>
var LJReading = (function () {
  function speakText(btn) {
    if (!('speechSynthesis' in window)) return;
    var text = btn.getAttribute('data-text');
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.75;
    var voices = window.speechSynthesis.getVoices();
    var jpVoice = voices.find(function (v) { return v.lang.indexOf('ja') === 0; });
    if (jpVoice) utterance.voice = jpVoice;
    window.speechSynthesis.speak(utterance);
  }
  return { speakText: speakText };
})();
</script>
