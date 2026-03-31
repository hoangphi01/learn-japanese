---
layout: default
title: Trang Chủ
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
  <a class="chapter-card" data-chapter="{{ ch.id }}" {% if first_lesson %}href="{{ first_lesson.url | relative_url }}"{% endif %}>
    <div class="chapter-card-header">
      <span class="chapter-card-num">{{ ch.id }}</span>
      <span class="chapter-card-title">{{ ch.title }}</span>
    </div>
    <div class="chapter-card-meta">
      {{ ch.week }} · {{ ch.lessons }} bài học
    </div>
    <div class="chapter-card-progress">
      <div class="chapter-card-progress-fill" style="width: 0%"></div>
    </div>
  </a>
{% endfor %}
</div>

## Phương pháp độc đáo

**Lợi thế Hán-Việt** — 60–70% từ vựng N5 là Hán-Nhật. Người Việt có âm Hán-Việt → decode phần lớn từ vựng mà không cần học thuộc.

| Quy tắc | Hán-Việt | On'yomi | Ví dụ |
|---------|----------|---------|-------|
| T- đầu → S-/Z- | **T**âm | **S**hin (心) | Tâm = Tim |
| -c cuối → -ku | Họ**c** | Ga**ku** (学) | Học = Học |
| Đ- đầu → D- | **Đ**ại | **D**ai (大) | Đại = Lớn |
| Ph- đầu → H-/F- | **Ph**ong | **F**ū (風) | Phong = Gió |

<a href="{{ '/pages/hv-decoder/' | relative_url }}" class="btn btn-primary" style="margin-top: 1rem;">Khám phá HV Decoder →</a>
