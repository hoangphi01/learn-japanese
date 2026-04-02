---
layout: lesson
title: "Bài Tập Chương 7"
chapter: 7
lesson: 4
total_lessons_in_chapter: 4
phase: 3
week: 6
estimated_time: "15 phút"
prev_lesson: ch07/03-kich-ban-ga-tau
next_lesson: ch08/01-toolkit-sinh-ton
tags: [vocabulary, shopping, restaurant, station, phase-3]
level: N5
---

## Bài 7.1 — Nối từ vựng 3 kịch bản

{% include matching-quiz.html pairs="試着室:Phòng thử đồ,お会計:Tính tiền,乗り換え:Đổi tàu,免税:Miễn thuế,おすすめ:Món đề xuất,切符:Vé tàu,現金:Tiền mặt,注文:Gọi món" %}

## Bài 7.2 — Điền câu theo tình huống

{% include exercise-box.html title="Tình huống thực tế" content="Điền câu tiếng Nhật phù hợp cho từng tình huống." %}

{% include fill-blank.html before="(Tại cửa hàng — hỏi thử đồ) " blank="試着できますか？|試着できますか" after="" hint="shichaku dekimasu ka?" %}

{% include fill-blank.html before="(Tại nhà hàng — 4 người) " blank="四人です|四人です。" after="" hint="yonin desu" %}

{% include fill-blank.html before="(Tại ga tàu — hỏi sân ga) " blank="何番線ですか？|何番線ですか" after="" hint="nan-bansen desu ka?" %}

{% include fill-blank.html before="(Tính tiền) " blank="お会計をお願いします|お会計をお願いします。" after="" hint="okaikei wo onegaishimasu" %}

{% include fill-blank.html before="(Hỏi giá đến Osaka) 大阪まで、" blank="いくらですか？|いくらですか" after="" hint="ikura desu ka?" %}

## Bài 7.3 — Quiz tổng hợp

<div class="quiz-section">

<div class="quiz-question" data-correct="a">
<p class="question-text">Bạn muốn mua áo, hỏi có cỡ L không. Nói gì?</p>
<div class="question-options">
<button class="option-btn" data-value="a" onclick="LJQuiz.checkAnswer(this, 'a')"><span lang="ja">Lサイズはありますか？</span></button>
<button class="option-btn" data-value="b" onclick="LJQuiz.checkAnswer(this, 'a')"><span lang="ja">Lサイズをください。</span></button>
<button class="option-btn" data-value="c" onclick="LJQuiz.checkAnswer(this, 'a')"><span lang="ja">Lサイズがいいです。</span></button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">〜はありますか？</span> = "Có ~ không?" — dùng khi hỏi xem có hàng không.
</div>
</div>

<div class="quiz-question" data-correct="b">
<p class="question-text">Nhân viên nhà hàng hỏi <span lang="ja">ご予約はありますか？</span> — nghĩa là gì?</p>
<div class="question-options">
<button class="option-btn" data-value="a" onclick="LJQuiz.checkAnswer(this, 'b')">Bạn muốn gọi món gì?</button>
<button class="option-btn" data-value="b" onclick="LJQuiz.checkAnswer(this, 'b')">Có đặt chỗ trước không?</button>
<button class="option-btn" data-value="c" onclick="LJQuiz.checkAnswer(this, 'b')">Thanh toán thế nào?</button>
</div>
</div>

<div class="quiz-question" data-correct="c">
<p class="question-text">Tàu nào dừng mọi ga?</p>
<div class="question-options">
<button class="option-btn" data-value="a" onclick="LJQuiz.checkAnswer(this, 'c')"><span lang="ja">急行</span> (kyuukou)</button>
<button class="option-btn" data-value="b" onclick="LJQuiz.checkAnswer(this, 'c')"><span lang="ja">特急</span> (tokkyuu)</button>
<button class="option-btn" data-value="c" onclick="LJQuiz.checkAnswer(this, 'c')"><span lang="ja">普通</span> (futsuu)</button>
</div>
</div>

<div class="quiz-question" data-correct="a">
<p class="question-text"><span lang="ja">免税</span> có âm Hán-Việt là gì?</p>
<div class="question-options">
<button class="option-btn" data-value="a" onclick="LJQuiz.checkAnswer(this, 'a')">Miễn thuế</button>
<button class="option-btn" data-value="b" onclick="LJQuiz.checkAnswer(this, 'a')">Hiện kim</button>
<button class="option-btn" data-value="c" onclick="LJQuiz.checkAnswer(this, 'a')">Hội kế</button>
</div>
</div>

<div class="quiz-question" data-correct="b">
<p class="question-text">Bạn đang ở nhà hàng, muốn gọi nước. Nói gì?</p>
<div class="question-options">
<button class="option-btn" data-value="a" onclick="LJQuiz.checkAnswer(this, 'b')"><span lang="ja">お水はありますか？</span></button>
<button class="option-btn" data-value="b" onclick="LJQuiz.checkAnswer(this, 'b')"><span lang="ja">すみません、お水をください。</span></button>
<button class="option-btn" data-value="c" onclick="LJQuiz.checkAnswer(this, 'b')"><span lang="ja">お水は何ですか？</span></button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">すみません</span> để gọi nhân viên + <span lang="ja">〜をください</span> = "cho tôi ~"
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
