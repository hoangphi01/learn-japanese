---
layout: default
title: "Giới thiệu phương pháp"
permalink: /pages/about/
---

<img src="{{ '/assets/images/preview_default.png' | relative_url }}" alt="NihonGo! — Tiếng Nhật theo tư duy toán học" style="width:100%;border-radius:var(--radius,0);margin-bottom:1.5rem;">

# Giới thiệu: NihonGo!

## Triết lý cốt lõi

<div class="jp-formula">
Câu nói = f(Từ vựng<sub>[Biến số]</sub>, Trợ từ<sub>[Toán tử]</sub>, Động từ<sub>[Hàm số]</sub>)
</div>

Cuốn sách này **không** dạy bạn học tiếng Nhật theo cách truyền thống. Nó dạy bạn **giải mã** tiếng Nhật — coi ngôn ngữ như một hệ thống toán học.

**Nguyên tắc:**
- Học hệ thống tạo ra mẫu câu, không học thuộc mẫu câu
- Particles = type annotations / toán tử
- Động từ = hàm số có conjugation rules
- Tính từ = hàm số 2 lớp (Class A い / Class B な)

## So sánh phương pháp

<table class="kana-table">
<thead>
<tr><th>Khía cạnh</th><th>Phương pháp truyền thống</th><th>Phương pháp Toán học</th></tr>
</thead>
<tbody>
<tr><td>Từ vựng</td><td>Học thuộc từng từ một</td><td>Mapping rules từ âm Hán-Việt</td></tr>
<tr><td>Ngữ pháp</td><td>Học thuộc mẫu câu</td><td>Pattern = Hàm số + Biến số</td></tr>
<tr><td>Chữ viết</td><td>Viết lại không hệ thống</td><td>Nhận dạng form + stroke logic</td></tr>
<tr><td>Giao tiếp</td><td>3–6 tháng</td><td><strong>8 tuần</strong></td></tr>
</tbody>
</table>

## Lợi thế Hán-Việt

60–70% từ vựng N5 là Hán-Nhật. Người Việt có âm Hán-Việt → decode phần lớn từ vựng mà không cần học thuộc.

**15 quy tắc ánh xạ:**

{% for rule in site.data.hv_rules %}
**{{ rule.id }}. {{ rule.hv_pattern }} → {{ rule.onyomi }}**
{% for ex in rule.examples %}- {{ ex.hv }} → {{ ex.jp }}
{% endfor %}
{% endfor %}

## Hai mục tiêu, một lộ trình

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0;">
<div style="text-align:center;padding:1.5rem;background:var(--light-red);border-radius:var(--radius);">
<div style="font-size:2.5rem;font-weight:700;color:var(--japan-red);">8</div>
<div style="font-weight:700;">tuần</div>
<p style="font-size:0.9rem;color:var(--med-gray);margin:0;">Giao tiếp sinh tồn: mua sắm, ăn uống, đi lại, hỏi đường.</p>
</div>
<div style="text-align:center;padding:1.5rem;background:var(--light-blue);border-radius:var(--radius);">
<div style="font-size:2.5rem;font-weight:700;color:var(--navy-blue);">6</div>
<div style="font-weight:700;">tháng</div>
<p style="font-size:0.9rem;color:var(--med-gray);margin:0;">JLPT N5: đọc hiểu, 800 từ vựng, 100 Kanji, ngữ pháp N5.</p>
</div>
</div>

## Cam kết cần thiết

<div class="key-box box">
<div class="box-title">Yêu cầu tối thiểu để đạt mục tiêu 8 tuần</div>
<div class="box-content">
<p style="text-align:center;font-weight:700;font-size:1.1rem;">1 giờ / ngày × 56 ngày = 56 giờ tổng</p>

<table class="kana-table">
<thead>
<tr><th>Hoạt động</th><th>Thời gian</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>Đọc lý thuyết</td><td>20 phút</td><td>Hiểu cấu trúc, không học thuộc</td></tr>
<tr><td>Bài tập trong sách</td><td>20 phút</td><td>Điền ngay, không để qua hôm sau</td></tr>
<tr><td>Luyện tập tình huống</td><td>20 phút</td><td>Nói to, tạo phản xạ</td></tr>
</tbody>
</table>

</div>
</div>

<p style="text-align:right;margin-top:2rem;">
<span class="jp" style="font-size:1.3rem;color:var(--gold-accent);">頑張ってください。</span><br>
<em>Ganbatte kudasai — Chúc bạn cố gắng hết mình.</em>
</p>

---

## Biểu tượng trong bài học

NihonGo! sử dụng bộ icon SVG thống nhất thay vì emoji, giúp hiển thị sắc nét trên mọi thiết bị và đồng bộ với giao diện.

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.75rem;margin:1.5rem 0;">
{% assign icons = "star,Đã nhớ|correct,Đúng|wrong,Sai|speaker,Phát âm|timer,Thời gian" | split: "|" %}
{% for item in icons %}
{% assign parts = item | split: "," %}
<div style="text-align:center;padding:0.75rem;background:var(--light-gold);border:2px solid var(--gold-accent);border-radius:var(--radius-sm,0);">
<img src="{{ '/assets/symbols/' | append: parts[0] | append: '.svg' | relative_url }}" alt="{{ parts[1] }}" style="width:28px;height:28px;filter:brightness(0) saturate(100%) invert(15%) sepia(60%) saturate(800%) hue-rotate(200deg) brightness(90%);">
<div style="font-size:0.8rem;font-weight:600;margin-top:0.3rem;color:var(--navy-blue);">{{ parts[1] }}</div>
</div>
{% endfor %}
</div>

---

## Nhật ký cập nhật

<table class="kana-table">
<thead>
<tr><th>Ngày</th><th>Cập nhật</th></tr>
</thead>
<tbody>
<tr><td>11/04/2026</td><td>Kiểm Tra Từ Vựng — hệ thống test immersive với 2 chế độ (KT nghĩa / KT từ), lọc theo chương, đánh dấu từ đã nhớ, bộ icon SVG (star, correct, wrong, timer, speaker)</td></tr>
<tr><td>09/04/2026</td><td>Mở rộng N5 toàn diện — Ch7–20 (71 bài học, 20 chương), SRS Leitner 5 hộp, Mock Test N5 (37 câu), Grammar Hub (20 mẫu), Reading Practice, Sổ Tay phrasebook TTS</td></tr>
<tr><td>04/04/2026</td><td>Kiến trúc dữ liệu — n5_vocabulary.yml (119 từ), flashcard_decks.yml (6 bộ), grammar.yml (20 mẫu), mock_test_n5.yml, reading_practice.yml</td></tr>
<tr><td>01/04/2026</td><td>HV Decoder nâng cấp — từ điển mở rộng, 15 quy tắc ánh xạ, tìm kiếm + phân trang. Sổ Tay du lịch 120+ cụm từ</td></tr>
<tr><td>31/03/2026</td><td>Ra mắt NihonGo! — 18 bài học (Ch1–6), Flashcard Katakana &amp; Hiragana, HV Decoder với từ điển ~120 mục, Welcome screen, PWA, Modern theme, Google Analytics, Sidebar với bộ lọc cấp độ</td></tr>
</tbody>
</table>

<div style="text-align:center;margin-top:2.5rem;">
<img src="{{ '/assets/images/collab-logo.png' | relative_url }}" alt="hoangphi01 x Claude" style="max-width:220px;height:auto;opacity:0.7;">
</div>
