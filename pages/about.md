---
layout: default
title: "Giới thiệu phương pháp"
permalink: /pages/about/
---

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

| Khía cạnh | Phương pháp truyền thống | Phương pháp Toán học |
|-----------|------------------------|---------------------|
| Từ vựng | Học thuộc từng từ một | Mapping rules từ âm Hán-Việt |
| Ngữ pháp | Học thuộc mẫu câu | Pattern = Hàm số + Biến số |
| Chữ viết | Viết lại không hệ thống | Nhận dạng form + stroke logic |
| Giao tiếp | 3–6 tháng | **8 tuần** |

## Lợi thế Hán-Việt

60–70% từ vựng N5 là Hán-Nhật. Người Việt có âm Hán-Việt → decode phần lớn từ vựng mà không cần học thuộc.

**8 quy tắc ánh xạ:**

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

| Hoạt động | Thời gian | Mô tả |
|-----------|----------|-------|
| Đọc lý thuyết | 20 phút | Hiểu cấu trúc, không học thuộc |
| Bài tập trong sách | 20 phút | Điền ngay, không để qua hôm sau |
| Luyện tập tình huống | 20 phút | Nói to, tạo phản xạ |

</div>
</div>

<p style="text-align:right;margin-top:2rem;">
<span class="jp" style="font-size:1.3rem;color:var(--gold-accent);">頑張ってください。</span><br>
<em>Ganbatte kudasai — Chúc bạn cố gắng hết mình.</em>
</p>
