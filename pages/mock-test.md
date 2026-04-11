---
layout: default
title: "Kiểm Tra"
permalink: /mock-test/
---

<link rel="stylesheet" href="{{ '/assets/css/test.css' | relative_url }}">

<script>
// Embed mock test data from YAML
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

// Embed vocabulary data
window.LJ_VOCABULARY = {{ site.data.n5_vocabulary | jsonify }};
window.LJ_SYMBOLS = {
  star: "{{ '/assets/symbols/star.svg' | relative_url }}",
  correct: "{{ '/assets/symbols/correct.svg' | relative_url }}",
  wrong: "{{ '/assets/symbols/wrong.svg' | relative_url }}",
  timer: "{{ '/assets/symbols/timer.svg' | relative_url }}",
  speaker: "{{ '/assets/symbols/speaker.svg' | relative_url }}"
};
</script>
<script src="{{ '/assets/js/mock-test.js' | relative_url }}"></script>

<!-- ════════════════════════════════════════════════════
     HUB: Choose test type
     ════════════════════════════════════════════════════ -->
<div id="test-hub">
  <h1><span style="font-family:var(--font-jp)">検査</span> Kiểm Tra</h1>

  <div class="test-hub-grid">
    <!-- Card 1: Thi Thử N5 -->
    <div class="test-hub-card" onclick="showMockTest()">
      <div class="test-hub-badge">N5</div>
      <div class="test-hub-icon"><img src="{{ '/assets/symbols/timer.svg' | relative_url }}" alt="" class="test-icon" style="width:36px;height:36px;filter:brightness(0) saturate(100%) invert(15%) sepia(40%) saturate(800%) hue-rotate(200deg) brightness(90%);"></div>
      <h3>Thi Thử N5</h3>
      <p>23 câu &middot; 30 phút &middot; 3 phần<br><small>Từ vựng + Ngữ pháp + Đọc hiểu</small></p>
      <span class="btn btn-primary" style="margin-top:auto;">Vào thi &rarr;</span>
    </div>

    <!-- Card 2: Kiểm Tra Từ Vựng -->
    <div class="test-hub-card" onclick="showVocabTest()">
      <div class="test-hub-badge">N5</div>
      <div class="test-hub-icon"><img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon" style="width:36px;height:36px;filter:brightness(0) saturate(100%) invert(70%) sepia(80%) saturate(600%) hue-rotate(10deg) brightness(100%);"></div>
      <h3>Kiểm Tra Từ Vựng</h3>
      <p>Chọn chương &middot; KT nghĩa / KT từ<br><small>119 từ &middot; Đánh dấu từ đã nhớ</small></p>
      <span class="btn btn-primary" style="margin-top:auto;">Cấu hình &rarr;</span>
    </div>

    <!-- Card 3: Ngữ Pháp N5 -->
    <a href="{{ '/grammar/' | relative_url }}" class="test-hub-card" style="text-decoration:none;color:inherit;">
      <div class="test-hub-badge">N5</div>
      <div class="test-hub-icon"><img src="{{ '/assets/symbols/correct.svg' | relative_url }}" alt="" class="test-icon" style="width:36px;height:36px;filter:brightness(0) saturate(100%) invert(45%) sepia(70%) saturate(500%) hue-rotate(110deg) brightness(95%);"></div>
      <h3>Ngữ Pháp N5</h3>
      <p>Tra cứu &middot; Lọc theo tag<br><small>20 mẫu ngữ pháp N5</small></p>
      <span class="btn btn-primary" style="margin-top:auto;">Mở &rarr;</span>
    </a>

    <!-- Card 4: Luyện Đọc -->
    <a href="{{ '/reading/' | relative_url }}" class="test-hub-card" style="text-decoration:none;color:inherit;">
      <div class="test-hub-badge">N5</div>
      <div class="test-hub-icon"><img src="{{ '/assets/symbols/speaker.svg' | relative_url }}" alt="" class="test-icon" style="width:36px;height:36px;filter:brightness(0) saturate(100%) invert(15%) sepia(40%) saturate(800%) hue-rotate(200deg) brightness(90%);"></div>
      <h3>Luyện Đọc</h3>
      <p>Đọc hiểu &middot; Furigana &middot; Từ vựng<br><small>5 bài đọc N5</small></p>
      <span class="btn btn-primary" style="margin-top:auto;">Mở &rarr;</span>
    </a>
  </div>
</div>

<script>
function showMockTest() {
  document.getElementById('test-hub').style.display = 'none';
  document.getElementById('mock-test-section').style.display = 'block';
}
function showVocabTest() {
  document.getElementById('test-hub').style.display = 'none';
  document.getElementById('vocab-test-section').style.display = 'block';
}
function backToHub() {
  document.getElementById('test-hub').style.display = 'block';
  document.getElementById('mock-test-section').style.display = 'none';
  document.getElementById('vocab-test-section').style.display = 'none';
}
</script>

<!-- ════════════════════════════════════════════════════
     SECTION A: Thi Thử N5 (Mock Test)
     ════════════════════════════════════════════════════ -->
<div id="mock-test-section" style="display:none;">

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
    <div class="config-actions">
      <button class="btn btn-secondary" onclick="backToHub()">&larr; Quay lại</button>
      <button class="btn btn-primary mock-start-btn" onclick="LJMockTest.start()">Bắt đầu thi &rarr;</button>
    </div>
  </div>
</div>

<!-- Immersive Test Navbar (Mock) -->
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

</div><!-- /mock-test-section -->

<!-- ════════════════════════════════════════════════════
     SECTION B: Kiểm Tra Từ Vựng (Vocab Test)
     ════════════════════════════════════════════════════ -->
<div id="vocab-test-section" style="display:none;">

<!-- Screen 1: Config -->
<div class="test-screen" id="test-config">
  <h1><span style="font-family:var(--font-jp)">検査</span> Kiểm tra từ vựng</h1>

  <div class="test-config-card">
    <div class="test-level-badge">N5</div>

    <div class="config-section">
      <h3 class="config-label">Chọn chương</h3>
      <div id="chapter-filter"></div>
    </div>

    <div class="config-section">
      <h3 class="config-label">Loại từ</h3>
      <div class="config-options">
        <button class="config-btn active" data-pool="all" onclick="LJTest.setPool(this)">Tất cả (<span id="pool-all-count">0</span>)</button>
        <button class="config-btn" data-pool="known" onclick="LJTest.setPool(this)">Đã nhớ <img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon test-icon-star"> (<span id="pool-known-count">0</span>)</button>
      </div>
    </div>

    <div class="config-section">
      <h3 class="config-label">Loại kiểm tra</h3>
      <div class="config-options">
        <button class="config-btn active" data-type="meaning" onclick="LJTest.setType(this)">KT nghĩa</button>
        <button class="config-btn" data-type="word" onclick="LJTest.setType(this)">KT từ</button>
        <button class="config-btn" data-type="both" onclick="LJTest.setType(this)">Cả 2</button>
      </div>
    </div>

    <div class="config-section">
      <h3 class="config-label">Số câu</h3>
      <div class="config-options">
        <button class="config-btn active" data-count="10" onclick="LJTest.setCount(this)">10</button>
        <button class="config-btn" data-count="20" onclick="LJTest.setCount(this)">20</button>
        <button class="config-btn" data-count="all" onclick="LJTest.setCount(this)">Tất cả</button>
        <button class="config-btn" data-count="custom" onclick="LJTest.setCount(this)">Tự nhập</button>
      </div>
      <input type="number" class="config-custom-input" id="custom-count" min="1" max="999" placeholder="Nhập số câu..." style="display:none;">
    </div>

    <div class="config-section">
      <h3 class="config-label">Tùy chọn</h3>
      <label class="config-toggle">
        <input type="checkbox" id="toggle-skip-known">
        <span>Bỏ qua từ đã nhớ <img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon test-icon-star"></span>
      </label>
      <label class="config-toggle">
        <input type="checkbox" id="toggle-hide-romaji">
        <span>Ẩn romaji trong bài kiểm tra</span>
      </label>
    </div>

    <div class="config-section config-progress">
      <span id="known-progress">0 / 0 từ đã nhớ <img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon test-icon-star"></span>
      <button class="btn-link" onclick="LJTest.resetKnown()">Đặt lại</button>
    </div>

    <div class="config-actions">
      <button class="btn btn-secondary" onclick="backToHub()">&larr; Quay lại</button>
      <button class="btn btn-primary" onclick="LJTest.start()">Bắt đầu &rarr;</button>
    </div>
  </div>
</div>

<!-- Immersive Test Navbar (Vocab) -->
<div class="test-navbar" id="test-navbar" style="display:none;">
  <button class="tn-exit" onclick="LJTest.confirmExit()" title="Thoát"><img src="{{ '/assets/symbols/wrong.svg' | relative_url }}" alt="Thoát" class="test-icon"></button>
  <div class="tn-progress">
    <div class="tn-progress-bar">
      <div class="tn-progress-fill" id="tn-progress-fill"></div>
    </div>
    <span class="tn-progress-text" id="tn-progress-text">Câu 1/10</span>
  </div>
  <span class="tn-timer" id="tn-timer">00:00</span>
  <div class="tn-counters">
    <span class="tn-correct" id="tn-correct">0</span>
    <span class="tn-sep">&middot;</span>
    <span class="tn-wrong" id="tn-wrong">0</span>
  </div>
</div>

<!-- Screen 2: Quiz -->
<div class="test-screen" id="test-quiz" style="display:none;">
  <div class="test-question-card" id="test-question-card">
    <div class="test-prompt" id="test-prompt">
      <span class="test-char" id="test-char">言葉</span>
      <button class="test-speak-btn" id="test-speak-btn" onclick="LJTest.speakCurrent()" title="Nghe phát âm">
        <img src="{{ '/assets/symbols/speaker.svg' | relative_url }}" alt="Nghe" class="tts-icon">
      </button>
    </div>
    <span class="test-kana" id="test-kana"></span>
    <span class="test-romaji" id="test-romaji"></span>
    <div class="test-options" id="test-options"></div>
  </div>
</div>

<!-- Screen 3: Results -->
<div class="test-screen" id="test-results" style="display:none;">
  <div class="test-results-card">
    <div class="results-score-big" id="results-score-big">0/0</div>
    <p class="results-message" id="results-message"></p>
    <div class="results-breakdown">
      <span class="results-correct-count" id="results-correct-count">0 ĐÚNG</span>
      <span class="results-wrong-count" id="results-wrong-count">0 SAI</span>
    </div>
    <p class="results-time" id="results-time"></p>
    <div class="results-mark-section">
      <div class="results-mark-info">
        <strong><img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon test-icon-star"> Đánh dấu "đã nhớ"</strong>
        <p>Tick từ nào đã thuộc → lần KT sau bỏ qua. Từ đúng được tick sẵn.</p>
      </div>
      <div class="results-word-list" id="results-word-list"></div>
      <button class="btn-save-known" id="btn-save-known" onclick="LJTest.saveMarked()">
        <img src="{{ '/assets/symbols/star.svg' | relative_url }}" alt="" class="test-icon test-icon-star"> Lưu từ đã nhớ (0 từ)
      </button>
    </div>
    <div class="results-actions">
      <button class="btn btn-primary" onclick="LJTest.retry()">Làm tiếp từ mới</button>
      <button class="btn btn-secondary" onclick="backToHub()">&larr; Về trang kiểm tra</button>
    </div>
  </div>
</div>

</div><!-- /vocab-test-section -->

<script src="{{ '/assets/js/test.js' | relative_url }}"></script>
