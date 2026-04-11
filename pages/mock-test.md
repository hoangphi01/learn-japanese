---
layout: default
title: "Thi Thử N5"
permalink: /mock-test/
---

<script>
// Embed test data from YAML
window.mockTestData = {
  vocabulary: [
    {% for q in site.data.mock_test_n5.vocabulary %}
    { q: {{ q.q | jsonify }}, options: {{ q.options | jsonify }}, answer: {{ q.answer }}, explanation: {{ q.explanation | jsonify }} }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  grammar: [
    {% for q in site.data.mock_test_n5.grammar %}
    { q: {{ q.q | jsonify }}, options: {{ q.options | jsonify }}, answer: {{ q.answer }}, explanation: {{ q.explanation | jsonify }} }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  reading: [
    {% for q in site.data.mock_test_n5.reading %}
    { q: {{ q.q | jsonify }}, options: {{ q.options | jsonify }}, answer: {{ q.answer }}, explanation: {{ q.explanation | jsonify }} }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
};
</script>
<script src="{{ '/assets/js/mock-test.js' | relative_url }}"></script>

<div id="mock-test-start" class="mock-test-start">
  <h1>Thi Thử N5</h1>
  <div class="mock-intro">
    <p>Đề thi thử JLPT N5 gồm <strong>23 câu</strong> trong <strong>30 phút</strong>, chia 3 phần:</p>
    <table class="kana-table">
      <thead>
        <tr><th>Phần</th><th>Nội dung</th><th>Số câu</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Từ vựng (Vocabulary)</td><td>10 câu</td></tr>
        <tr><td>2</td><td>Ngữ pháp (Grammar)</td><td>8 câu</td></tr>
        <tr><td>3</td><td>Đọc hiểu (Reading)</td><td>5 câu</td></tr>
      </tbody>
    </table>
    <p>Câu hỏi được chọn ngẫu nhiên từ ngân hàng đề. Mỗi lần thi sẽ là một đề khác nhau.</p>
    <div class="mock-start-tips">
      <h3>Mẹo làm bài</h3>
      <ul>
        <li>Đọc kỹ câu hỏi trước khi chọn đáp án</li>
        <li>Không dừng quá lâu ở 1 câu — quay lại sau nếu chưa chắc</li>
        <li>Phần đọc hiểu: đọc câu hỏi trước, rồi tìm đáp án trong đoạn văn</li>
      </ul>
    </div>
    <button class="btn btn-primary mock-start-btn" onclick="LJMockTest.start()">Bắt đầu thi</button>
  </div>
</div>

<!-- ─── Immersive Test Navbar ────────────────────────── -->
<div class="test-navbar mock-navbar" id="mock-test-navbar" style="display:none;">
  <button class="tn-exit" onclick="LJMockTest.confirmExit()" title="Thoát"><img src="{{ '/assets/symbols/wrong.svg' | relative_url }}" alt="Thoát" class="test-icon"></button>
  <div class="tn-progress">
    <div class="tn-progress-bar">
      <div class="tn-progress-fill" id="mn-progress-fill"></div>
    </div>
    <span class="tn-progress-text" id="mn-progress-text">0/23 câu</span>
  </div>
  <span class="tn-timer" id="mn-timer">30:00</span>
  <button class="btn btn-secondary mock-nav-submit" id="mn-submit" onclick="LJMockTest.submitTest()">Nộp bài</button>
</div>

<div id="mock-test-area" style="display:none;">
  <div id="mock-test-questions"></div>

  <div class="mock-submit-area">
    <button class="btn btn-primary" onclick="LJMockTest.submitTest()">Nộp bài</button>
  </div>

  <div id="mock-test-results" style="display:none;"></div>
</div>
