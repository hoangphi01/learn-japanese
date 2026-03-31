# Toán Học Ngôn Ngữ: Tiếng Nhật Cấp Tốc

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://hoangphi01.github.io/learn-japanese/)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red?logo=jekyll)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ruby](https://img.shields.io/badge/Ruby-3.3.6-red?logo=ruby)](https://www.ruby-lang.org/)
[![JLPT](https://img.shields.io/badge/JLPT-N5-orange)](https://www.jlpt.jp/)

> Giải mã Tiếng Nhật theo phương pháp Logic-Toán học. 8 tuần giao tiếp cơ bản, 6 tháng N5.

## Triết lý

```
Câu nói = f(Từ vựng[Biến số], Trợ từ[Toán tử], Động từ[Hàm số])
```

Học **hệ thống tạo ra** mẫu câu, không học thuộc mẫu câu — giống học đại số thay vì học thuộc bảng nhân.

## Điểm nổi bật

- **Hán-Việt Decoder** — 8 quy tắc ánh xạ Hán-Việt → On'yomi, khai thác lợi thế người Việt
- **Dual Timeline** — 8 tuần giao tiếp sinh tồn + 6 tháng JLPT N5
- **Interactive** — Quiz, flashcards, progress tracking (localStorage)
- **Mobile-first** — Học mọi lúc mọi nơi trên điện thoại

## Nội dung

| Phase | Chương | Nội dung |
|-------|--------|----------|
| 1 — Chữ viết | 1–3 | Katakana, Hiragana, Số đếm |
| 2 — Ngữ pháp | 4–6 | Particles, Động từ, Hán-Việt Decoder |
| 3 — Thực chiến | 7–9 | 3 Kịch bản, Simulation, Ôn tập |
| 4 — N5 | 10+ | Tính từ, Te-form, và hơn thế |

## Phát triển

```bash
# Cài đặt
bundle install

# Chạy local
bundle exec jekyll serve

# Build
bundle exec jekyll build
```

Yêu cầu: Ruby 3.3+, Bundler.

## Tech Stack

- **Jekyll** — Static site generator
- **GitHub Pages** — Hosting
- **Vanilla JS** — Quiz engine, flashcards, progress tracking
- **CSS Custom Properties** — Design system ported từ LaTeX
- **localStorage** — Lưu tiến độ học tập

## Dựa trên

Sách LaTeX "Toán Học Ngôn Ngữ: Tiếng Nhật Cấp Tốc" (V4, 68 trang, 10 chương).
