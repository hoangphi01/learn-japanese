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

- **Hán-Việt Decoder** — 15 quy tắc ánh xạ Hán-Việt → On'yomi, khai thác lợi thế người Việt
- **100% N5 Coverage** — 20 chương, 71 bài học, từ chữ viết đến ngữ pháp nâng cao
- **Level Selector** — Chọn cấp độ JLPT (N5–N1), lọc nội dung phù hợp
- **Dual Theme** — Pixel theme (mặc định) và Modern theme, chuyển đổi tức thì
- **Progress Tracking** — Theo dõi tiến độ bài học và điểm quiz (localStorage)
- **Interactive** — Quiz trắc nghiệm, flashcards lật 3D, bài tập tương tác
- **Mobile-first** — Responsive design với mobile dock, học mọi lúc mọi nơi
- **Chapter Accent Colors** — Mỗi chương có màu nhấn riêng trên badge và header
- **OG Meta Preview** — Hình ảnh preview khi chia sẻ link trên mạng xã hội

## Nội dung đã xuất bản

| Chương | Tên | Bài học | Nội dung chính |
|--------|-----|---------|----------------|
| 1 | Katakana & Hệ Thống Âm | 4 bài | Hệ thống âm thanh, Katakana hàng 1–5 |
| 2 | Dakuten, Âm Kết Hợp & Số | 4 bài | Katakana dakuten, âm kết hợp, số đếm |
| 3 | Hiragana | 4 bài | Hiragana cơ bản, bảng chữ, dakuten |
| 4 | Trợ Từ (Particles) | 4 bài | Cấu trúc SOV, 7 toán tử, 5 hàm giao tiếp |
| 5 | Động Từ & Danh Từ | 4 bài | ます-form, 15 động từ, 50 danh từ |
| 6 | Hán-Việt Decoder | 3 bài | Định lý Hán-Việt, 15 quy tắc |
| 7 | Từ Vựng Chuyên Biệt | 4 bài | 3 kịch bản: mua sắm, nhà hàng, ga tàu |
| 8 | Simulation Drills | 3 bài | Toolkit sinh tồn, 5 simulation thực tế |
| 9 | Ôn Tập & Nghe Hiểu | 3 bài | Shadowing, filler words, self-assessment |
| 10 | Tính Từ い/な | 5 bài | 2 lớp tính từ, 4 dạng chia, 50 tính từ N5 |
| 11 | Te-Form | 4 bài | 3 nhóm động từ, quy tắc chia, 5 mẫu câu |
| 12 | Nai-Form | 3 bài | Toán tử NOT(), 4 mẫu phủ định |
| 13 | Ta-Form & Trải Nghiệm | 3 bài | Toán tử PAST(), たことがある, たりたりする |
| 14 | Dictionary Form | 3 bài | Dạng gốc, ことができる, 前に, 趣味 |
| 15 | Plain Form | 3 bài | 2 speech registers, と思う/と言う/でしょう |
| 16 | Tồn Tại & Vị Trí | 3 bài | あります/います, 8 danh từ vị trí |
| 17 | Counters & So Sánh | 4 bài | 15 lượng từ, biến âm, より/一番 |
| 18 | Mong Muốn & Cho-Nhận | 3 bài | 欲しい/たい, あげる/もらう/くれる |
| 19 | Điều Kiện & Mệnh Đề QH | 4 bài | と/たら/とき/ても, relative clauses |
| 20 | Tổng Ôn N5 | 3 bài | 103 Kanji, bảng chia 6 dạng, mock test |

**Tổng: 71 bài học** across 20 chương — **100% JLPT N5 coverage**

### Roadmap

| Phase | Chương | Nội dung | Trạng thái |
|-------|--------|----------|------------|
| 1 — Chữ viết | 1–3 | Katakana, Hiragana, Số đếm | ✅ Hoàn thành |
| 2 — Ngữ pháp cơ bản | 4–6 | Particles, Động từ, Hán-Việt Decoder | ✅ Hoàn thành |
| 3 — Thực chiến | 7–9 | 3 Kịch bản, Simulation, Ôn tập | ✅ Hoàn thành |
| 4 — Verb Forms | 10–14 | Tính từ, Te/Nai/Ta/Dict-form | ✅ Hoàn thành |
| 5 — Advanced Grammar | 15–19 | Plain form, Tồn tại, Counters, Điều kiện | ✅ Hoàn thành |
| 6 — Grand Review | 20 | 103 Kanji, tổng ôn, mock test N5 | ✅ Hoàn thành |

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
- **Vanilla JS** — 10 modules (IIFE pattern): quiz, flashcards, SRS, progress, theme, nav, mock-test, hv-decoder, phrasebook, welcome
- **CSS Custom Properties** — Design system with dual themes, ported from LaTeX tcolorbox
- **localStorage** — Client-side persistence (progress, theme, level selection)

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full system architecture: directory tree, data model, layouts, CSS/JS breakdown, and component patterns.

## Contributing

See [CLAUDE.md](CLAUDE.md) for project conventions, build commands, localStorage keys, and do-not rules.

## Dựa trên

Sách LaTeX "NihonGo!" (V4, 22 chương, ~130 trang).
