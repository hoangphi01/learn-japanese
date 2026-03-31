---
layout: default
title: "Sổ Tay Du Lịch Nhật Bản"
permalink: /pages/travel-phrasebook/
---

# Sổ Tay JP — Cẩm Nang Du Lịch

<p>Hơn 120 cụm từ thiết yếu cho chuyến du lịch Nhật Bản, sắp xếp theo tình huống. Nhấn <strong>Copy</strong> để sao chép hoặc <strong>Nghe</strong> để phát âm tiếng Nhật.</p>

## Từ Điển Nhanh

<p>Dịch nhanh từ hoặc câu ngắn. Tự động nhận diện chiều dịch: nhập tiếng Nhật → dịch sang tiếng Việt, nhập tiếng Việt → dịch sang tiếng Nhật.</p>

<div class="dict-section">
  <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
    <input type="text" id="dict-input" placeholder="Nhập từ hoặc câu ngắn..."
           style="flex:1;min-width:200px;padding:0.6rem 1rem;border:2px solid var(--navy-blue);border-radius:var(--radius-sm);font-size:1rem;font-family:inherit;">
    <button class="btn btn-primary" id="dict-translate-btn">Dịch</button>
    <span id="dict-direction-label" style="font-size:0.85rem;color:var(--med-gray);white-space:nowrap;">VN → JP</span>
  </div>
  <div id="dict-result" class="dict-result">
    <span style="color:var(--med-gray);">Nhập từ hoặc câu để dịch...</span>
  </div>
  <p style="font-size:0.75rem;color:var(--med-gray);margin-top:0.75rem;margin-bottom:0;">Powered by MyMemory Translation API — giới hạn 5.000 ký tự/ngày cho bản miễn phí.</p>
</div>

## Cụm Từ Thông Dụng

<div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap;">
  <input type="text" id="phrase-search" placeholder="Tìm kiếm: toilet, cảm ơn, bao nhiêu..."
         style="flex:1;min-width:200px;padding:0.6rem 1rem;border:2px solid var(--navy-blue);border-radius:var(--radius-sm);font-size:1rem;font-family:inherit;">
  <span id="phrase-count" style="font-size:0.85rem;color:var(--med-gray);white-space:nowrap;"></span>
</div>

<div id="phrase-categories" class="phrase-categories"></div>

<div id="phrase-grid" class="phrase-grid"></div>

<script>
LJPhrasebook.init({{ site.data.travel_phrases | jsonify }});
</script>
