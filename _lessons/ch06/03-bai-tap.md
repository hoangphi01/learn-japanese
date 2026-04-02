---
layout: lesson
title: "Bài Tập Chương 6"
chapter: 6
lesson: 3
total_lessons_in_chapter: 3
phase: 2
week: 5
estimated_time: "15 phút"
prev_lesson: ch06/02-8-quy-tac
next_lesson: ch07/01-kich-ban-mua-sam
tags: [han-viet, kanji, phase-2]
level: N5
---

## Bài 6.1 — Áp dụng mapping rules

Dùng 8 quy tắc đã học để đoán On'yomi từ âm Hán-Việt.

<div class="quiz-section">

<div class="quiz-question" data-correct="daigaku">
<p class="question-text"><strong>Đại học</strong> → On'yomi? (Rule 5: Đ→D, Rule 2: -c→-ku)</p>
<div class="question-options">
<button class="option-btn" data-value="daigaku" onclick="LJQuiz.checkAnswer(this, 'daigaku')">daigaku (大学)</button>
<button class="option-btn" data-value="taigaku" onclick="LJQuiz.checkAnswer(this, 'daigaku')">taigaku</button>
<button class="option-btn" data-value="daikaku" onclick="LJQuiz.checkAnswer(this, 'daigaku')">daikaku</button>
</div>
</div>

<div class="quiz-question" data-correct="jinkou">
<p class="question-text"><strong>Nhân khẩu</strong> → On'yomi? (Rule 6: Nh→Jin)</p>
<div class="question-options">
<button class="option-btn" data-value="ninkou" onclick="LJQuiz.checkAnswer(this, 'jinkou')">ninkō</button>
<button class="option-btn" data-value="jinkou" onclick="LJQuiz.checkAnswer(this, 'jinkou')">jinkō (人口)</button>
<button class="option-btn" data-value="nhankou" onclick="LJQuiz.checkAnswer(this, 'jinkou')">nhankō</button>
</div>
</div>

<div class="quiz-question" data-correct="kokusai">
<p class="question-text"><strong>Quốc tế</strong> → On'yomi? (Rule 2: -c→-ku)</p>
<div class="question-options">
<button class="option-btn" data-value="kokutai" onclick="LJQuiz.checkAnswer(this, 'kokusai')">kokutai</button>
<button class="option-btn" data-value="kokusai" onclick="LJQuiz.checkAnswer(this, 'kokusai')">kokusai (国際)</button>
<button class="option-btn" data-value="kuocsai" onclick="LJQuiz.checkAnswer(this, 'kokusai')">kuocsai</button>
</div>
</div>

<div class="quiz-question" data-correct="keizai">
<p class="question-text"><strong>Kinh tế</strong> → On'yomi?</p>
<div class="question-options">
<button class="option-btn" data-value="kinsai" onclick="LJQuiz.checkAnswer(this, 'keizai')">kinsai</button>
<button class="option-btn" data-value="kinzai" onclick="LJQuiz.checkAnswer(this, 'keizai')">kinzai</button>
<button class="option-btn" data-value="keizai" onclick="LJQuiz.checkAnswer(this, 'keizai')">keizai (経済)</button>
</div>
</div>

<div class="quiz-question" data-correct="shokuhin">
<p class="question-text"><strong>Thực phẩm</strong> → On'yomi? (Rule 2: -c→-ku, Rule 8: Ph→H)</p>
<div class="question-options">
<button class="option-btn" data-value="shokuhin" onclick="LJQuiz.checkAnswer(this, 'shokuhin')">shokuhin (食品)</button>
<button class="option-btn" data-value="shokuphin" onclick="LJQuiz.checkAnswer(this, 'shokuhin')">shokuphin</button>
<button class="option-btn" data-value="thucpham" onclick="LJQuiz.checkAnswer(this, 'shokuhin')">thucpham</button>
</div>
</div>

</div>

<div class="quiz-results" id="quiz-results" style="display:none;">
<div class="results-card">
<h2>Kết quả</h2>
<div class="score-display">
<span class="score-number" id="quiz-score">0</span>
<span class="score-total">/ <span id="quiz-total">5</span></span>
</div>
<p class="score-message" id="score-message"></p>
<button class="btn btn-primary" onclick="LJQuiz.reset()">Làm lại</button>
</div>
</div>

## Bài 6.2 — On'yomi hay Kun'yomi?

<div class="quiz-section">

<div class="quiz-question" data-correct="onyomi">
<p class="question-text"><span class="jp" style="font-size:1.3rem">大学</span> (đại học) — đọc theo cách nào?</p>
<div class="question-options">
<button class="option-btn" data-value="onyomi" onclick="LJQuiz.checkAnswer(this, 'onyomi')">On'yomi (daigaku)</button>
<button class="option-btn" data-value="kunyomi" onclick="LJQuiz.checkAnswer(this, 'onyomi')">Kun'yomi</button>
</div>
<div class="question-explanation" style="display:none;">
2 Kanji ghép nhau → <strong>On'yomi</strong>. 大 (Đại=Dai) + 学 (Học=Gaku) = daigaku.
</div>
</div>

<div class="quiz-question" data-correct="kunyomi">
<p class="question-text"><span class="jp" style="font-size:1.3rem">山</span> (núi, đứng một mình) — đọc theo cách nào?</p>
<div class="question-options">
<button class="option-btn" data-value="onyomi" onclick="LJQuiz.checkAnswer(this, 'kunyomi')">On'yomi (san)</button>
<button class="option-btn" data-value="kunyomi" onclick="LJQuiz.checkAnswer(this, 'kunyomi')">Kun'yomi (yama)</button>
</div>
<div class="question-explanation" style="display:none;">
Kanji đứng <strong>một mình</strong> → thường đọc Kun'yomi = yama.
</div>
</div>

<div class="quiz-question" data-correct="onyomi">
<p class="question-text"><span class="jp" style="font-size:1.3rem">火山</span> (núi lửa) — đọc theo cách nào?</p>
<div class="question-options">
<button class="option-btn" data-value="onyomi" onclick="LJQuiz.checkAnswer(this, 'onyomi')">On'yomi (kazan)</button>
<button class="option-btn" data-value="kunyomi" onclick="LJQuiz.checkAnswer(this, 'onyomi')">Kun'yomi (hiyama)</button>
</div>
<div class="question-explanation" style="display:none;">
2 Kanji ghép nhau → <strong>On'yomi</strong>. 火 (Hỏa=Ka) + 山 (Sơn=Zan) = kazan.
</div>
</div>

<div class="quiz-question" data-correct="kunyomi">
<p class="question-text"><span class="jp" style="font-size:1.3rem">食べる</span> (ăn) — đọc theo cách nào?</p>
<div class="question-options">
<button class="option-btn" data-value="onyomi" onclick="LJQuiz.checkAnswer(this, 'kunyomi')">On'yomi (shoku)</button>
<button class="option-btn" data-value="kunyomi" onclick="LJQuiz.checkAnswer(this, 'kunyomi')">Kun'yomi (taberu)</button>
</div>
<div class="question-explanation" style="display:none;">
Có <strong>okurigana</strong> (べる kèm theo) → Kun'yomi = taberu.
</div>
</div>

</div>
