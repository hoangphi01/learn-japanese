# NihonGo!

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

## Tính năng

- **Hán-Việt Decoder** — 8 quy tắc ánh xạ Hán-Việt → On'yomi, khai thác lợi thế người Việt
- **Dual Timeline** — 8 tuần giao tiếp sinh tồn + 6 tháng JLPT N5
- **Level Selector** — Chọn cấp độ JLPT (N5–N1), lọc nội dung phù hợp
- **Dual Theme** — Pixel theme (mặc định) và Modern theme, chuyển đổi tức thì
- **Progress Tracking** — Theo dõi tiến độ bài học và điểm quiz (localStorage)
- **Interactive** — Quiz trắc nghiệm, flashcards lật 3D, bài tập tương tác
- **Mobile-first** — Responsive design với mobile dock, học mọi lúc mọi nơi

## Nội dung đã xuất bản

| Chương | Tên | Bài học | Nội dung chính |
|--------|-----|---------|----------------|
| 1 | Katakana & Hệ Thống Âm | 4 bài | Hệ thống âm thanh, Katakana hàng 1–5, bài tập |
| 2 | Dakuten, Âm Kết Hợp & Số | 4 bài | Katakana dakuten, âm kết hợp, số đếm, bài tập |
| 3 | Hiragana | 4 bài | Hiragana cơ bản, bảng chữ, dakuten, bài tập |

**Tổng: 12 bài học** across 3 chương (Phase 1 — Chữ viết)

### Roadmap

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

Yêu cầu: Ruby 3.3+ (rbenv), Bundler.

## Tech Stack

- **Jekyll 4.3** — Static site generator
- **GitHub Pages** — Hosting
- **Vanilla JS** — 6 modules (IIFE pattern): quiz, flashcards, progress, theme, nav, welcome
- **CSS Custom Properties** — Design system with dual themes, ported from LaTeX tcolorbox
- **localStorage** — Client-side persistence (progress, theme, level selection)

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full system architecture: directory tree, data model, layouts, CSS/JS breakdown, and component patterns.

## Contributing

See [CLAUDE.md](CLAUDE.md) for project conventions, build commands, localStorage keys, and do-not rules.

## Dựa trên

Sách LaTeX "NihonGo!" (V4, 68 trang, 10 chương).
