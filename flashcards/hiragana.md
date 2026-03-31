---
layout: default
title: "Flashcards: Hiragana"
---

<h1>Flashcards Hiragana</h1>
<p>Nhấn vào thẻ để lật. Nhấn đúp để đánh dấu "đã biết".</p>

<div class="flashcard-controls">
  <button class="btn btn-secondary" onclick="LJFlashcard.shuffle('hira-deck')">Trộn bài</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.flipAll('hira-deck')">Lật tất cả</button>
  <button class="btn btn-secondary" onclick="LJFlashcard.resetAll('hira-deck')">Reset</button>
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
      </div>
      <div class="flashcard-back">
        <span class="flashcard-text">{{ kana.romaji }}</span>
      </div>
    </div>
  </div>
{% endfor %}
</div>
