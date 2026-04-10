---
layout: default
title: "Flashcards: Hiragana"
permalink: /flashcards/hiragana/
---

<nav class="lesson-nav-top">
  <a href="{{ '/flashcards/' | relative_url }}" class="lesson-nav-btn prev">
    <span class="nav-arrow">&larr;</span>
    <span class="nav-label">Flashcards</span>
  </a>
</nav>

<h1>Flashcards Hiragana</h1>
<p>Nhấn vào thẻ để lật. Nhấn đúp để đánh dấu "đã biết". Nhấn <img src="{{ site.baseurl }}/assets/symbols/speaker.svg" alt="Nghe" class="tts-icon"> để nghe phát âm.</p>

<div class="flashcard-controls">
  <button class="btn btn-secondary" onclick="LJFlashcard.shuffle('hira-deck')">Trộn bài</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.flipAll('hira-deck')">Lật tất cả</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.resetAll('hira-deck')">Reset</button>
  <button class="btn srs-review-btn" onclick="LJSRS.startReview('hira-deck')">Ôn tập SRS <span class="srs-due-count" id="srs-due-hira-deck"></span></button>
</div>

<div class="flashcard-score">
  <span class="score-label">Đã biết: </span>
  <span class="score-value" data-deck-score="hira-deck">0 / 46</span>
</div>

<div class="flashcard-grid" id="hira-deck">
{% for kana in site.data.kana.hiragana.basic %}
  <div class="flashcard hira" data-front="{{ kana.char }}" data-back="{{ kana.romaji }}" onclick="this.classList.toggle('flipped')">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <span class="flashcard-char">{{ kana.char }}</span>
        <button class="tts-btn" onclick="event.stopPropagation(); LJFlashcard.speak('{{ kana.char }}')" title="Nghe phát âm"><img src="{{ site.baseurl }}/assets/symbols/speaker.svg" alt="Nghe" class="tts-icon"></button>
      </div>
      <div class="flashcard-back">
        <span class="flashcard-text">{{ kana.romaji }}</span>
      </div>
    </div>
  </div>
{% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var stats = LJSRS.getDeckStats('hira-deck');
  var badge = document.getElementById('srs-due-hira-deck');
  if (badge && stats.due > 0) badge.textContent = stats.due;
});
</script>
