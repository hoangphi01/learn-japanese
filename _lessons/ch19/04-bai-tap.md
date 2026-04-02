---
layout: lesson
title: "Bài Tập Chương 19"
chapter: 19
lesson: 4
total_lessons_in_chapter: 4
phase: 5
week: 19
estimated_time: "20 phút"
prev_lesson: ch19/03-menh-de-quan-he
next_lesson: ch20/01-kanji-tong-hop
tags: [conditionals, relative-clauses, review, phase-5]
level: N5
---

## Bài 19.1 — 4 Loại Điều Kiện

{% include exercise-box.html title="Chọn cấu trúc điều kiện phù hợp" content="Chọn と / たら / とき / ても dựa vào ngữ cảnh." %}

<div class="quiz-section">

<div class="quiz-question" data-correct="to">
<p class="question-text"><span lang="ja">春になる___、桜が咲きます。</span> (quy luật tự nhiên)</p>
<div class="question-options">
<button class="option-btn" data-value="to" onclick="LJQuiz.checkAnswer(this, 'to')">と</button>
<button class="option-btn" data-value="tara" onclick="LJQuiz.checkAnswer(this, 'to')">たら</button>
<button class="option-btn" data-value="toki" onclick="LJQuiz.checkAnswer(this, 'to')">とき</button>
<button class="option-btn" data-value="temo" onclick="LJQuiz.checkAnswer(this, 'to')">ても</button>
</div>
<div class="question-explanation" style="display:none;">Quy luật tự nhiên tất yếu → <span lang="ja">と</span></div>
</div>

<div class="quiz-question" data-correct="tara">
<p class="question-text"><span lang="ja">雨が降っ___、試合はどうなりますか？</span> (giả định — hỏi)</p>
<div class="question-options">
<button class="option-btn" data-value="to" onclick="LJQuiz.checkAnswer(this, 'tara')">と</button>
<button class="option-btn" data-value="tara" onclick="LJQuiz.checkAnswer(this, 'tara')">たら</button>
<button class="option-btn" data-value="toki" onclick="LJQuiz.checkAnswer(this, 'tara')">とき</button>
<button class="option-btn" data-value="temo" onclick="LJQuiz.checkAnswer(this, 'tara')">ても</button>
</div>
<div class="question-explanation" style="display:none;">Giả định linh hoạt → <span lang="ja">たら</span> (V-た + ら)</div>
</div>

<div class="quiz-question" data-correct="toki">
<p class="question-text"><span lang="ja">困った___、先生に相談してください。</span> (thời điểm)</p>
<div class="question-options">
<button class="option-btn" data-value="to" onclick="LJQuiz.checkAnswer(this, 'toki')">と</button>
<button class="option-btn" data-value="tara" onclick="LJQuiz.checkAnswer(this, 'toki')">たら</button>
<button class="option-btn" data-value="toki" onclick="LJQuiz.checkAnswer(this, 'toki')">とき</button>
<button class="option-btn" data-value="temo" onclick="LJQuiz.checkAnswer(this, 'toki')">ても</button>
</div>
<div class="question-explanation" style="display:none;">Chỉ thời điểm cụ thể → <span lang="ja">とき</span></div>
</div>

<div class="quiz-question" data-correct="temo">
<p class="question-text"><span lang="ja">忙しく___、健康を大切にしてください。</span> (dù thế nào)</p>
<div class="question-options">
<button class="option-btn" data-value="to" onclick="LJQuiz.checkAnswer(this, 'temo')">と</button>
<button class="option-btn" data-value="tara" onclick="LJQuiz.checkAnswer(this, 'temo')">たら</button>
<button class="option-btn" data-value="toki" onclick="LJQuiz.checkAnswer(this, 'temo')">とき</button>
<button class="option-btn" data-value="temo" onclick="LJQuiz.checkAnswer(this, 'temo')">ても</button>
</div>
<div class="question-explanation" style="display:none;">Nhượng bộ (dù/mặc dù) → <span lang="ja">ても</span></div>
</div>

## Bài 19.2 — Mệnh Đề Quan Hệ

{% include exercise-box.html title="Ghép mệnh đề quan hệ" content="Chọn cụm danh từ đúng với mệnh đề quan hệ." %}

<div class="quiz-question" data-correct="A">
<p class="question-text">「hôm qua」+「ăn」+「bánh」= ?</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">昨日食べたケーキ</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">ケーキを昨日食べた</span></button>
<button class="option-btn" data-value="C" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">昨日食べるケーキ</span></button>
</div>
<div class="question-explanation" style="display:none;">Mệnh đề quan hệ đứng TRƯỚC danh từ, dùng ta-form (quá khứ): <span lang="ja">昨日食べた + ケーキ</span></div>
</div>

<div class="quiz-question" data-correct="A">
<p class="question-text">「Tanaka-san mua」+「sách」= ?</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">田中さんが買った本</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">田中さんは買った本</span></button>
<button class="option-btn" data-value="C" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">本が田中さんを買った</span></button>
</div>
<div class="question-explanation" style="display:none;">Trong mệnh đề quan hệ, chủ ngữ dùng <span lang="ja">が</span> (không dùng は): <span lang="ja">田中さん<strong>が</strong>買った本</span></div>
</div>

<div class="quiz-question" data-correct="A">
<p class="question-text">「tôi đang sống」+「thành phố」= ?</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">私が住んでいる町</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">町は私が住んでいる</span></button>
<button class="option-btn" data-value="C" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">私は住んでいる町</span></button>
</div>
<div class="question-explanation" style="display:none;"><span lang="ja">[私が住んでいる]町</span> — mệnh đề đứng trước, chủ ngữ dùng が</div>
</div>

<div class="quiz-question" data-correct="A">
<p class="question-text">「có thể nói tiếng Nhật」+「người」= ?</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">日本語が話せる人</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">人は日本語が話せる</span></button>
<button class="option-btn" data-value="C" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">日本語を話せる人</span></button>
</div>
</div>

## Bài 19.3 — Tổng Hợp

{% include exercise-box.html title="Dịch sang tiếng Nhật" content="Chọn câu dịch chính xác nhất." %}

<div class="quiz-question" data-correct="A">
<p class="question-text">Nếu có thời gian, tôi muốn học tiếng Nhật.</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">時間があったら、日本語を勉強したいです。</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">時間があると、日本語を勉強したいです。</span></button>
</div>
<div class="question-explanation" style="display:none;">Giả định + ý chí (したい) → dùng <span lang="ja">たら</span>, không dùng と (と không kết hợp với ý chí)</div>
</div>

<div class="quiz-question" data-correct="A">
<p class="question-text">Dù khó, tôi vẫn cố gắng.</p>
<div class="question-options">
<button class="option-btn" data-value="A" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">難しくても、頑張ります。</span></button>
<button class="option-btn" data-value="B" onclick="LJQuiz.checkAnswer(this, 'A')"><span lang="ja">難しいと、頑張ります。</span></button>
</div>
<div class="question-explanation" style="display:none;">Nhượng bộ (dù) → <span lang="ja">ても</span>. い-adj: 難し<strong>くても</strong></div>
</div>

</div>

<div class="quiz-results" id="quiz-results" style="display:none;">
<div class="results-card">
<h2>Kết quả</h2>
<div class="score-display">
<span class="score-number" id="quiz-score">0</span>
<span class="score-total">/ <span id="quiz-total">12</span></span>
</div>
<p class="score-message" id="score-message"></p>
<button class="btn btn-primary" onclick="LJQuiz.reset()">Làm lại</button>
</div>
</div>
