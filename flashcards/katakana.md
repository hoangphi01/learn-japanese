---
layout: default
title: "Flashcards: Katakana"
permalink: /flashcards/katakana/
---

<nav class="lesson-nav-top">
  <a href="{{ '/flashcards/' | relative_url }}" class="lesson-nav-btn prev">
    <span class="nav-arrow">&larr;</span>
    <span class="nav-label">Flashcards</span>
  </a>
</nav>

<h1>Flashcards Katakana</h1>
<p>Nhấn vào thẻ để lật. Nhấn đúp để đánh dấu "đã biết". Nhấn 🔊 để nghe phát âm.</p>

<div class="flashcard-controls">
  <button class="btn btn-secondary" onclick="LJFlashcard.shuffle('kata-deck')">Trộn bài</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.flipAll('kata-deck')">Lật tất cả</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.resetAll('kata-deck')">Reset</button>
  <button class="btn srs-review-btn" onclick="LJSRS.startReview('kata-deck')">Ôn tập SRS <span class="srs-due-count" id="srs-due-kata-deck"></span></button>
</div>

<div class="flashcard-score">
  <span class="score-label">Đã biết: </span>
  <span class="score-value" data-deck-score="kata-deck">0 / 46</span>
</div>

<div class="flashcard-grid" id="kata-deck">
{% for kana in site.data.kana.katakana.basic %}
  <div class="flashcard kata" data-front="{{ kana.char }}" data-back="{{ kana.romaji }}" onclick="this.classList.toggle('flipped')">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <span class="flashcard-char">{{ kana.char }}</span>
        <button class="tts-btn" onclick="event.stopPropagation(); LJFlashcard.speak('{{ kana.char }}')" title="Nghe phát âm">🔊</button>
      </div>
      <div class="flashcard-back">
        <span class="flashcard-text">{{ kana.romaji }}</span>
        {% if kana.note %}
        <span class="flashcard-note">{{ kana.note }}</span>
        {% endif %}
      </div>
    </div>
  </div>
{% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var stats = LJSRS.getDeckStats('kata-deck');
  var badge = document.getElementById('srs-due-kata-deck');
  if (badge && stats.due > 0) badge.textContent = stats.due;
});
</script>
