---
layout: default
title: "NihonGo! — Giải mã Tiếng Nhật theo phương pháp Logic"
---

<div class="hero">
  <h1 class="hero-title">
    <span class="accent">Nihon</span>Go!
  </h1>
  <p class="hero-subtitle">Giải mã Tiếng Nhật theo phương pháp Logic</p>
  <div class="hero-formula">
    Câu nói = f(<span class="var">Từ vựng</span>, <span class="op">Trợ từ</span>, <span class="var">Động từ</span>)
  </div>
</div>

<div class="progress-dashboard" style="max-width: 600px; margin: 0 auto 2rem;">
  <div class="progress-header">
    <span class="progress-week">Tiến độ tổng</span>
    <span class="progress-sep">|</span>
    <span class="progress-phase">8 Tuần → Giao tiếp · 6 Tháng → N5</span>
  </div>
  <div class="progress-row">
    <div class="progress-info">
      <span class="progress-name red">MỤC TIÊU 8 TUẦN</span>
    </div>
    <span class="progress-value red" id="overall-pct-home">0%</span>
  </div>
  <div class="progress-track-lg">
    <div class="progress-fill-lg red" id="overall-progress-home" style="width: 0%"></div>
  </div>
</div>

## Lộ trình học

<div class="chapter-grid">
{% for ch in site.data.chapters %}
  {% assign ch_lessons = site.lessons | where: "chapter", ch.id | sort: "lesson" %}
  {% assign first_lesson = ch_lessons | first %}
  <a class="chapter-card" data-chapter="{{ ch.id }}" data-level="{{ ch.level }}" {% if first_lesson %}href="{{ first_lesson.url | relative_url }}"{% endif %}>
    <div class="chapter-card-header">
      <span class="chapter-card-num">{{ ch.id }}</span>
      <span class="chapter-card-title">{{ ch.title }}</span>
    </div>
    <div class="chapter-card-meta">
      Chương {{ ch.id }} · {{ ch.week }} · {{ ch.lessons }} bài học
    </div>
    <div class="chapter-card-progress">
      <div class="chapter-card-progress-fill" style="width: 0%"></div>
    </div>
  </a>
{% endfor %}
</div>

## Phương pháp độc đáo

**Lợi thế Hán-Việt** — 60–70% từ vựng N5 là Hán-Nhật. Người Việt có âm Hán-Việt → decode phần lớn từ vựng mà không cần học thuộc.

<table class="kana-table">
<thead>
<tr><th>Quy tắc</th><th>Hán-Việt</th><th>On'yomi</th><th>Ví dụ</th></tr>
</thead>
<tbody>
<tr><td>T- đầu → S-/Z-</td><td><strong>T</strong>âm</td><td><strong>S</strong>hin (心)</td><td>Tâm = Tim</td></tr>
<tr><td>-c cuối → -ku</td><td>Họ<strong>c</strong></td><td>Ga<strong>ku</strong> (学)</td><td>Học = Học</td></tr>
<tr><td>Đ- đầu → D-</td><td><strong>Đ</strong>ại</td><td><strong>D</strong>ai (大)</td><td>Đại = Lớn</td></tr>
<tr><td>Ph- đầu → H-/F-</td><td><strong>Ph</strong>ong</td><td><strong>F</strong>ū (風)</td><td>Phong = Gió</td></tr>
</tbody>
</table>

<a href="{{ '/pages/hv-decoder/' | relative_url }}" class="btn btn-primary" style="margin-top: 1rem;">Khám phá Hán-Việt Decoder →</a>
