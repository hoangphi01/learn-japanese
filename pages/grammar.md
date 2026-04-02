---
layout: default
title: "Ngữ Pháp N5"
permalink: /grammar/
---

<h1>Ngữ Pháp N5</h1>
<p>Tổng hợp {{ site.data.grammar | size }} mẫu ngữ pháp N5 theo chương. Nhấn vào mẫu để xem chi tiết và ví dụ.</p>

<div class="grammar-filter">
  <button class="btn btn-secondary grammar-filter-btn active" onclick="LJGrammar.filter('all', this)">Tất cả</button>
  <button class="btn btn-secondary grammar-filter-btn" onclick="LJGrammar.filter('particle', this)">Trợ từ</button>
  <button class="btn btn-secondary grammar-filter-btn" onclick="LJGrammar.filter('verb', this)">Động từ</button>
  <button class="btn btn-secondary grammar-filter-btn" onclick="LJGrammar.filter('copula', this)">Copula</button>
  <button class="btn btn-secondary grammar-filter-btn" onclick="LJGrammar.filter('existence', this)">Tồn tại</button>
</div>

<div class="grammar-search">
  <input type="text" id="grammar-search" placeholder="Tìm kiếm ngữ pháp..." oninput="LJGrammar.search(this.value)">
</div>

<div class="grammar-list" id="grammar-list">
{% for g in site.data.grammar %}
<div class="grammar-card" data-tags="{{ g.tags | join: ',' }}" data-chapter="{{ g.chapter }}" id="grammar-{{ g.id }}">
  <div class="grammar-card-header" onclick="this.parentElement.classList.toggle('expanded')">
    <div class="grammar-card-title">
      <span class="grammar-pattern">{{ g.pattern }}</span>
      <span class="grammar-meaning">{{ g.meaning }}</span>
    </div>
    <div class="grammar-card-meta">
      <span class="grammar-badge">Ch {{ g.chapter }}</span>
      <span class="grammar-badge grammar-badge-level">{{ g.level }}</span>
      <span class="grammar-expand-icon">&#9660;</span>
    </div>
  </div>
  <div class="grammar-card-body">
    <div class="grammar-formation">
      <strong>Cấu trúc:</strong> {{ g.formation }}
    </div>
    <div class="grammar-examples">
      <strong>Ví dụ:</strong>
      {% for ex in g.examples %}
      <div class="grammar-example">
        <p class="grammar-ex-jp">{{ ex.jp }}</p>
        <p class="grammar-ex-romaji">{{ ex.romaji }}</p>
        <p class="grammar-ex-vi">{{ ex.vi }}</p>
      </div>
      {% endfor %}
    </div>
    {% if g.chapter %}
    <div class="grammar-link">
      <a href="{{ '/lessons/ch0' | append: g.chapter | append: '/' | relative_url }}">Xem bài học Ch{{ g.chapter }} &rarr;</a>
    </div>
    {% endif %}
  </div>
</div>
{% endfor %}
</div>

<script>
var LJGrammar = (function () {
  function filter(tag, btn) {
    var cards = document.querySelectorAll('.grammar-card');
    cards.forEach(function (card) {
      if (tag === 'all') {
        card.style.display = '';
      } else {
        var tags = (card.getAttribute('data-tags') || '').split(',');
        card.style.display = tags.indexOf(tag) >= 0 ? '' : 'none';
      }
    });
    // Update active button
    var btns = document.querySelectorAll('.grammar-filter-btn');
    btns.forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
  }

  function search(query) {
    var q = query.toLowerCase().trim();
    var cards = document.querySelectorAll('.grammar-card');
    cards.forEach(function (card) {
      if (!q) {
        card.style.display = '';
        return;
      }
      var text = card.textContent.toLowerCase();
      card.style.display = text.indexOf(q) >= 0 ? '' : 'none';
    });
  }

  return { filter: filter, search: search };
})();
</script>
