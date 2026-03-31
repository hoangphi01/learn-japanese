---
layout: default
title: "Lộ trình học"
permalink: /pages/roadmap/
---

# Bản Đồ 8 Tuần + Lộ Trình N5

## Phase 1: Nền tảng chữ viết (Tuần 1–3)

<div style="display:flex;flex-direction:column;gap:0.75rem;">
{% for ch in site.data.chapters %}
{% if ch.phase == 1 %}
<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:var(--light-red);border-radius:var(--radius);border-left:4px solid var(--japan-red);">
  <span style="background:var(--japan-red);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">{{ ch.id }}</span>
  <div style="flex:1;">
    <strong>{{ ch.title }}</strong><br>
    <small style="color:var(--med-gray);">{{ ch.week }} · {{ ch.milestone }}</small>
  </div>
  <span style="font-size:0.8rem;font-weight:700;color:var(--japan-red);">{{ ch.eight_week_pct }}%</span>
</div>
{% endif %}
{% endfor %}
</div>

## Phase 2: Hệ thống ngữ pháp (Tuần 4–6)

<div style="display:flex;flex-direction:column;gap:0.75rem;">
{% for ch in site.data.chapters %}
{% if ch.phase == 2 %}
<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:var(--light-blue);border-radius:var(--radius);border-left:4px solid var(--navy-blue);">
  <span style="background:var(--navy-blue);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">{{ ch.id }}</span>
  <div style="flex:1;">
    <strong>{{ ch.title }}</strong><br>
    <small style="color:var(--med-gray);">{{ ch.week }} · {{ ch.milestone }}</small>
  </div>
  <span style="font-size:0.8rem;font-weight:700;color:var(--navy-blue);">{{ ch.eight_week_pct }}%</span>
</div>
{% endif %}
{% endfor %}
</div>

## Phase 3: Thực chiến (Tuần 7–8)

<div style="display:flex;flex-direction:column;gap:0.75rem;">
{% for ch in site.data.chapters %}
{% if ch.phase == 3 %}
<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:var(--light-gold);border-radius:var(--radius);border-left:4px solid var(--gold-accent);">
  <span style="background:var(--gold-accent);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">{{ ch.id }}</span>
  <div style="flex:1;">
    <strong>{{ ch.title }}</strong><br>
    <small style="color:var(--med-gray);">{{ ch.week }} · {{ ch.milestone }}</small>
  </div>
  <span style="font-size:0.8rem;font-weight:700;color:var(--gold-accent);">{{ ch.eight_week_pct }}%</span>
</div>
{% endif %}
{% endfor %}
</div>

## Phase 4: Mở rộng N5 (Tháng 2–6)

<div style="display:flex;flex-direction:column;gap:0.75rem;">
{% for ch in site.data.chapters %}
{% if ch.phase == 4 %}
<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:var(--light-green);border-radius:var(--radius);border-left:4px solid var(--hira-color);">
  <span style="background:var(--hira-color);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">{{ ch.id }}</span>
  <div style="flex:1;">
    <strong>{{ ch.title }}</strong><br>
    <small style="color:var(--med-gray);">{{ ch.week }} · {{ ch.milestone }}</small>
  </div>
  <span style="font-size:0.8rem;font-weight:700;color:var(--hira-color);">N5 {{ ch.n5_pct }}%</span>
</div>
{% endif %}
{% endfor %}
</div>

## N5 Coverage

| Thành phần | N5 yêu cầu | 8 tuần | 6 tháng |
|-----------|-----------|--------|---------|
| Hiragana | 46 ký tự | 100% | 100% |
| Katakana | 46 ký tự | 100% | 100% |
| Kanji | ~100 | 50 (50%) | 100 |
| Từ vựng | ~800 từ | 50 core + HV | 800+ |
| Ngữ pháp | ~100 điểm | 15 cốt lõi | 80+ |
