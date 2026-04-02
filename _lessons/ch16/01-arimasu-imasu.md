---
layout: lesson
title: "あります vs います: Toán Tử EXISTS()"
chapter: 16
lesson: 1
total_lessons_in_chapter: 3
phase: 5
week: 16
estimated_time: "20 phút"
prev_lesson: ch15/03-bai-tap
next_lesson: ch16/02-vi-tri-pattern
tags: [existence, arimasu, imasu, phase-5]
level: N5
---

## Toán Tử EXISTS() — Có Tồn Tại Hay Không?

Tiếng Việt chỉ dùng một từ "có" cho mọi thứ. Tiếng Nhật phân biệt rõ:

<div class="formula-box box">
<div class="box-content">
<div class="jp-formula">
<strong>EXISTS(vô sinh)</strong> = <span lang="ja">あります</span> (arimasu) — đồ vật, địa điểm, sự kiện<br>
<strong>EXISTS(hữu sinh)</strong> = <span lang="ja">います</span> (imasu) — người, động vật
</div>
</div>
</div>

<div class="grammar-box box">
<div class="box-title">Quy tắc chọn あります vs います</div>
<div class="box-content">

<span lang="ja">あります</span> (arimasu): Dùng cho vật <strong>không tự di chuyển</strong> — sách, bàn, công viên, cuộc họp, thời gian.<br><br>
<span lang="ja">います</span> (imasu): Dùng cho sinh vật <strong>tự di chuyển</strong> — người, mèo, chim, cá, côn trùng.<br><br>
<strong>Ngoại lệ:</strong> Robot, xe hơi (máy móc) → <span lang="ja">あります</span>. Cây cối → <span lang="ja">あります</span> (không tự di chuyển).

</div>
</div>

<table class="kana-table">
<thead>
<tr><th>あります (vô sinh)</th><th>います (hữu sinh)</th></tr>
</thead>
<tbody>
<tr><td><span lang="ja">本</span> (hon — sách)</td><td><span lang="ja">猫</span> (neko — mèo)</td></tr>
<tr><td><span lang="ja">机</span> (tsukue — bàn)</td><td><span lang="ja">先生</span> (sensei — giáo viên)</td></tr>
<tr><td><span lang="ja">公園</span> (kouen — công viên)</td><td><span lang="ja">子供</span> (kodomo — trẻ em)</td></tr>
<tr><td><span lang="ja">会議</span> (kaigi — cuộc họp)</td><td><span lang="ja">彼女</span> (kanojo — cô ấy)</td></tr>
<tr><td><span lang="ja">時間</span> (jikan — thời gian)</td><td><span lang="ja">鳥</span> (tori — chim)</td></tr>
<tr><td><span lang="ja">お金</span> (okane — tiền)</td><td><span lang="ja">魚</span> (sakana — cá)</td></tr>
</tbody>
</table>

## Hai Cấu Trúc Câu

### Cấu trúc 1: <span lang="ja">Nに Nが あります/います</span> — Mô Tả "Ở Đâu Có Gì"

<div class="grammar-box box">
<div class="box-title">Place に Thing が あります/います</div>
<div class="box-content">

Dùng khi muốn nói <strong>"ở chỗ X có Y"</strong> — giới thiệu sự tồn tại.<br><br>
<span lang="ja">机の上に本があります。</span> (Tsukue no ue ni hon ga arimasu.)<br>
→ Trên bàn có sách.<br><br>
<span lang="ja">公園に子供がいます。</span> (Kouen ni kodomo ga imasu.)<br>
→ Ở công viên có trẻ em.<br><br>
<span lang="ja">教室に先生がいます。</span> (Kyoushitsu ni sensei ga imasu.)<br>
→ Trong lớp học có giáo viên.

</div>
</div>

### Cấu trúc 2: <span lang="ja">Nは Nに あります/います</span> — Hỏi/Nói "Y Ở Đâu"

<div class="grammar-box box">
<div class="box-title">Thing は Place に あります/います</div>
<div class="box-content">

Dùng khi muốn nói <strong>"Y ở chỗ X"</strong> — nói vị trí cụ thể.<br><br>
<span lang="ja">トイレはどこにありますか。</span> (Toire wa doko ni arimasu ka.)<br>
→ Nhà vệ sinh ở đâu?<br><br>
<span lang="ja">（トイレは）二階にあります。</span> (Nikai ni arimasu.)<br>
→ (Nhà vệ sinh) ở tầng hai.<br><br>
<span lang="ja">山田さんはどこにいますか。</span> (Yamada-san wa doko ni imasu ka.)<br>
→ Anh Yamada ở đâu?<br><br>
<span lang="ja">（山田さんは）会議室にいます。</span> (Kaigishitsu ni imasu.)<br>
→ (Anh Yamada) ở phòng họp.

</div>
</div>

<div class="formula-box box">
<div class="box-content">
<div class="jp-formula">
<strong>So sánh hai cấu trúc:</strong><br><br>
「Place に Thing が ある/いる」 = giới thiệu cái gì tồn tại<br>
「Thing は Place に ある/いる」 = chỉ ra vị trí cụ thể<br><br>
Giống SQL: SELECT thing FROM place vs SELECT location WHERE thing = X
</div>
</div>
</div>

<div class="culture-box box">
<div class="box-title">Nhà Nhật Bản — Những Thứ Đặc Trưng</div>
<div class="box-content">

<span lang="ja">玄関</span> (genkan) — lối vào, nơi cởi giày. Mọi nhà Nhật đều có!<br>
<span lang="ja">畳</span> (tatami) — chiếu cói truyền thống, đo diện tích phòng bằng số chiếu.<br>
<span lang="ja">こたつ</span> (kotatsu) — bàn sưởi có chăn phủ, dùng vào mùa đông.<br>
<span lang="ja">押し入れ</span> (oshiire) — tủ âm tường kiểu Nhật, cất futon ban ngày.<br><br>
<span lang="ja">玄関に靴があります。</span> — Ở genkan có giày.<br>
<span lang="ja">部屋に畳があります。</span> — Trong phòng có tatami.

</div>
</div>

## Luyện tập

<div class="quiz-section">

<div class="quiz-question" data-correct="arimasu">
<p class="question-text"><span lang="ja">テーブルの上にコップが＿＿。</span> (Trên bàn có cốc.)</p>
<div class="question-options">
<button class="option-btn" data-value="arimasu" onclick="LJQuiz.checkAnswer(this, 'arimasu')">あります</button>
<button class="option-btn" data-value="imasu" onclick="LJQuiz.checkAnswer(this, 'arimasu')">います</button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">コップ</span> (koppu — cốc) là vật vô sinh → <span lang="ja">あります</span>.
</div>
</div>

<div class="quiz-question" data-correct="imasu">
<p class="question-text"><span lang="ja">庭に猫が＿＿。</span> (Trong vườn có mèo.)</p>
<div class="question-options">
<button class="option-btn" data-value="arimasu" onclick="LJQuiz.checkAnswer(this, 'imasu')">あります</button>
<button class="option-btn" data-value="imasu" onclick="LJQuiz.checkAnswer(this, 'imasu')">います</button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">猫</span> (neko — mèo) là sinh vật → <span lang="ja">います</span>.
</div>
</div>

<div class="quiz-question" data-correct="arimasu2">
<p class="question-text"><span lang="ja">駅の近くにコンビニが＿＿。</span> (Gần ga có cửa hàng tiện lợi.)</p>
<div class="question-options">
<button class="option-btn" data-value="arimasu2" onclick="LJQuiz.checkAnswer(this, 'arimasu2')">あります</button>
<button class="option-btn" data-value="imasu2" onclick="LJQuiz.checkAnswer(this, 'arimasu2')">います</button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">コンビニ</span> (konbini — cửa hàng tiện lợi) là địa điểm/vật → <span lang="ja">あります</span>.
</div>
</div>

<div class="quiz-question" data-correct="imasu3">
<p class="question-text"><span lang="ja">教室に学生が＿＿。</span> (Trong lớp có sinh viên.)</p>
<div class="question-options">
<button class="option-btn" data-value="arimasu3" onclick="LJQuiz.checkAnswer(this, 'imasu3')">あります</button>
<button class="option-btn" data-value="imasu3" onclick="LJQuiz.checkAnswer(this, 'imasu3')">います</button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">学生</span> (gakusei — sinh viên) là người → <span lang="ja">います</span>.
</div>
</div>

<div class="quiz-question" data-correct="arimasu4">
<p class="question-text"><span lang="ja">明日会議が＿＿。</span> (Ngày mai có cuộc họp.)</p>
<div class="question-options">
<button class="option-btn" data-value="arimasu4" onclick="LJQuiz.checkAnswer(this, 'arimasu4')">あります</button>
<button class="option-btn" data-value="imasu4" onclick="LJQuiz.checkAnswer(this, 'arimasu4')">います</button>
</div>
<div class="question-explanation" style="display:none;">
<span lang="ja">会議</span> (kaigi — cuộc họp) là sự kiện → <span lang="ja">あります</span>. Sự kiện luôn dùng <span lang="ja">あります</span>.
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
