---
layout: lesson
title: "Hiragana Dakuten & Âm kết hợp"
chapter: 3
lesson: 3
total_lessons_in_chapter: 4
phase: 1
week: 2
estimated_time: "15 phút"
prev_lesson: ch03/02-bang-hiragana
next_lesson: ch03/04-bai-tap
tags: [hiragana, kana, phase-1]
level: N5
---

## Dakuten & Handakuten (giống Katakana)

Quy tắc **y hệt** Katakana — thêm ゛ hoặc ゜:

| Gốc | + Dakuten | Âm |
|-----|-----------|-----|
| <span class="jp" style="color:var(--hira-color)">か</span> ka | <span class="jp" style="color:var(--hira-color)">が</span> | ga |
| <span class="jp" style="color:var(--hira-color)">さ</span> sa | <span class="jp" style="color:var(--hira-color)">ざ</span> | za |
| <span class="jp" style="color:var(--hira-color)">た</span> ta | <span class="jp" style="color:var(--hira-color)">だ</span> | da |
| <span class="jp" style="color:var(--hira-color)">は</span> ha | <span class="jp" style="color:var(--hira-color)">ば</span> | ba |
| <span class="jp" style="color:var(--hira-color)">は</span> ha | <span class="jp" style="color:var(--hira-color)">ぱ</span> | pa (handakuten ゜) |

## Âm kết hợp Hiragana

Cùng quy tắc: hàng -I + ゃ/ゅ/ょ nhỏ:

<table class="kana-table">
<thead>
<tr>
<th></th>
<th>+ゃ (ya)</th>
<th>+ゅ (yu)</th>
<th>+ょ (yo)</th>
</tr>
</thead>
<tbody>
<tr>
<th style="background:var(--hira-color);color:white">K</th>
<td><span class="jp" style="color:var(--hira-color)">きゃ</span><span class="romaji">kya</span></td>
<td><span class="jp" style="color:var(--hira-color)">きゅ</span><span class="romaji">kyu</span></td>
<td><span class="jp" style="color:var(--hira-color)">きょ</span><span class="romaji">kyo</span></td>
</tr>
<tr>
<th style="background:var(--hira-color);color:white">S</th>
<td><span class="jp" style="color:var(--hira-color)">しゃ</span><span class="romaji">sha</span></td>
<td><span class="jp" style="color:var(--hira-color)">しゅ</span><span class="romaji">shu</span></td>
<td><span class="jp" style="color:var(--hira-color)">しょ</span><span class="romaji">sho</span></td>
</tr>
<tr>
<th style="background:var(--hira-color);color:white">T</th>
<td><span class="jp" style="color:var(--hira-color)">ちゃ</span><span class="romaji">cha</span></td>
<td><span class="jp" style="color:var(--hira-color)">ちゅ</span><span class="romaji">chu</span></td>
<td><span class="jp" style="color:var(--hira-color)">ちょ</span><span class="romaji">cho</span></td>
</tr>
<tr>
<th style="background:var(--hira-color);color:white">N</th>
<td><span class="jp" style="color:var(--hira-color)">にゃ</span><span class="romaji">nya</span></td>
<td><span class="jp" style="color:var(--hira-color)">にゅ</span><span class="romaji">nyu</span></td>
<td><span class="jp" style="color:var(--hira-color)">にょ</span><span class="romaji">nyo</span></td>
</tr>
<tr>
<th style="background:var(--hira-color);color:white">R</th>
<td><span class="jp" style="color:var(--hira-color)">りゃ</span><span class="romaji">rya</span></td>
<td><span class="jp" style="color:var(--hira-color)">りゅ</span><span class="romaji">ryu</span></td>
<td><span class="jp" style="color:var(--hira-color)">りょ</span><span class="romaji">ryo</span></td>
</tr>
</tbody>
</table>

## Phụ âm đôi trong Hiragana

Giống Katakana, dùng **っ nhỏ** (tsu nhỏ):

| Từ | Phiên âm | Nghĩa |
|----|---------|-------|
| <span class="jp">がっこう</span> | ga**kk**ō | trường học |
| <span class="jp">きって</span> | ki**tt**e | tem |
| <span class="jp">にっぽん</span> | ni**pp**on | Nhật Bản |

<div class="grammar-box box">
<div class="box-title">Trợ từ đặc biệt: は và へ</div>
<div class="box-content">
<p>Khi <span class="jp">は</span> dùng làm <strong>trợ từ chủ đề</strong>, đọc là <strong>"wa"</strong> (không phải "ha").</p>
<p>Khi <span class="jp">へ</span> dùng làm <strong>trợ từ hướng</strong>, đọc là <strong>"e"</strong> (không phải "he").</p>
<p style="text-align:center;margin-top:0.5rem;">
<span class="jp">わたし<strong>は</strong></span> = watashi <strong>wa</strong> (tôi thì...)<br>
<span class="jp">とうきょう<strong>へ</strong></span> = Tōkyō <strong>e</strong> (đến Tokyo)
</p>
</div>
</div>

## Luyện tập nhanh

Nối mỗi Hiragana gốc với dạng Dakuten:

{% include matching-quiz.html pairs="か (ka):が (ga),さ (sa):ざ (za),た (ta):だ (da),は (ha):ば (ba)" %}

<div class="quiz-question" data-correct="wa">
  <p class="question-text">Trợ từ chủ đề <span class="jp-char">は</span> đọc là gì?</p>
  <div class="question-options">
    <button class="option-btn" data-value="ha" onclick="LJQuiz.checkAnswer(this, 'wa')">ha</button>
    <button class="option-btn" data-value="wa" onclick="LJQuiz.checkAnswer(this, 'wa')">wa</button>
    <button class="option-btn" data-value="ba" onclick="LJQuiz.checkAnswer(this, 'wa')">ba</button>
  </div>
  <div class="question-explanation" style="display:none;">
    Khi は dùng làm <strong>trợ từ chủ đề</strong>, đọc là <strong>"wa"</strong> (không phải "ha"). Đây là ngoại lệ quan trọng nhất!
  </div>
</div>
