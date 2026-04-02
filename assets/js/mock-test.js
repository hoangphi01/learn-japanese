// ============================================================
// N5 MOCK TEST ENGINE
// ============================================================

var LJMockTest = (function () {
  var state = {
    questions: [],
    answers: {},
    currentSection: 0,
    timer: null,
    startTime: 0,
    elapsed: 0,
    isActive: false
  };

  var SECTIONS = [
    { id: 'vocabulary', label: 'Từ vựng', icon: '📝', count: 10 },
    { id: 'grammar', label: 'Ngữ pháp', icon: '📐', count: 8 },
    { id: 'reading', label: 'Đọc hiểu', icon: '📖', count: 5 }
  ];

  var TOTAL_TIME = 30 * 60; // 30 minutes in seconds

  // ─── Shuffle helper ────────────────────────────────
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ─── Start test ────────────────────────────────────
  function start() {
    var startScreen = document.getElementById('mock-test-start');
    var testArea = document.getElementById('mock-test-area');
    if (startScreen) startScreen.style.display = 'none';
    if (testArea) testArea.style.display = 'block';

    // Build questions from data embedded in page
    state.questions = [];
    state.answers = {};

    SECTIONS.forEach(function (section) {
      var pool = window.mockTestData[section.id] || [];
      var selected = shuffle(pool).slice(0, section.count);
      selected.forEach(function (q, i) {
        state.questions.push({
          id: section.id + '-' + i,
          section: section.id,
          sectionLabel: section.label,
          q: q.q,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation
        });
      });
    });

    state.isActive = true;
    state.startTime = Date.now();
    state.elapsed = 0;

    renderQuestions();
    startTimer();
  }

  // ─── Timer ─────────────────────────────────────────
  function startTimer() {
    var timerEl = document.getElementById('mock-test-timer');
    state.timer = setInterval(function () {
      state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      var remaining = Math.max(0, TOTAL_TIME - state.elapsed);
      var min = Math.floor(remaining / 60);
      var sec = remaining % 60;

      if (timerEl) {
        timerEl.textContent = pad(min) + ':' + pad(sec);
        if (remaining <= 300) timerEl.classList.add('timer-warning');
        if (remaining <= 60) timerEl.classList.add('timer-danger');
      }

      if (remaining <= 0) {
        submitTest();
      }
    }, 1000);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  // ─── Render questions ──────────────────────────────
  function renderQuestions() {
    var container = document.getElementById('mock-test-questions');
    if (!container) return;

    var html = '';
    var currentSection = '';

    state.questions.forEach(function (q, idx) {
      if (q.section !== currentSection) {
        currentSection = q.section;
        var sectionInfo = SECTIONS.find(function (s) { return s.id === currentSection; });
        html += '<div class="mock-section-header">' +
          '<h3>' + (sectionInfo ? sectionInfo.icon + ' ' : '') + q.sectionLabel + '</h3>' +
        '</div>';
      }

      html += '<div class="mock-question" id="mq-' + idx + '" data-idx="' + idx + '">' +
        '<p class="mock-q-number">Câu ' + (idx + 1) + '</p>' +
        '<p class="mock-q-text">' + q.q + '</p>' +
        '<div class="mock-q-options">';

      q.options.forEach(function (opt, oi) {
        html += '<button class="mock-option-btn" data-q="' + idx + '" data-val="' + oi + '" onclick="LJMockTest.selectAnswer(' + idx + ',' + oi + ')">' +
          '<span class="mock-option-letter">' + String.fromCharCode(65 + oi) + '</span>' +
          '<span class="mock-option-text">' + opt + '</span>' +
        '</button>';
      });

      html += '</div>' +
        '<div class="mock-explanation" id="mq-exp-' + idx + '" style="display:none;">' +
          '<p>' + q.explanation + '</p>' +
        '</div>' +
      '</div>';
    });

    container.innerHTML = html;

    // Update question count
    var countEl = document.getElementById('mock-test-count');
    if (countEl) countEl.textContent = '0 / ' + state.questions.length;
  }

  // ─── Answer selection ──────────────────────────────
  function selectAnswer(qIdx, optIdx) {
    state.answers[qIdx] = optIdx;

    // Update button states
    var btns = document.querySelectorAll('.mock-option-btn[data-q="' + qIdx + '"]');
    btns.forEach(function (btn) {
      btn.classList.remove('selected');
      if (parseInt(btn.getAttribute('data-val'), 10) === optIdx) {
        btn.classList.add('selected');
      }
    });

    // Update answered count
    var answered = Object.keys(state.answers).length;
    var countEl = document.getElementById('mock-test-count');
    if (countEl) countEl.textContent = answered + ' / ' + state.questions.length;

    // Show submit button if all answered
    var submitBtn = document.getElementById('mock-test-submit');
    if (submitBtn && answered === state.questions.length) {
      submitBtn.classList.add('ready');
    }
  }

  // ─── Submit test ───────────────────────────────────
  function submitTest() {
    stopTimer();
    state.isActive = false;

    var correct = 0;
    var sectionScores = {};
    SECTIONS.forEach(function (s) { sectionScores[s.id] = { correct: 0, total: 0 }; });

    state.questions.forEach(function (q, idx) {
      sectionScores[q.section].total++;
      var userAnswer = state.answers[idx];
      var isCorrect = userAnswer === q.answer;

      if (isCorrect) {
        correct++;
        sectionScores[q.section].correct++;
      }

      // Show correct/incorrect on buttons
      var btns = document.querySelectorAll('.mock-option-btn[data-q="' + idx + '"]');
      btns.forEach(function (btn) {
        btn.classList.add('disabled');
        var val = parseInt(btn.getAttribute('data-val'), 10);
        if (val === q.answer) btn.classList.add('correct');
        if (val === userAnswer && !isCorrect) btn.classList.add('incorrect');
      });

      // Show explanation
      var exp = document.getElementById('mq-exp-' + idx);
      if (exp) exp.style.display = 'block';

      // Mark question
      var qEl = document.getElementById('mq-' + idx);
      if (qEl) qEl.classList.add(isCorrect ? 'q-correct' : 'q-incorrect');
    });

    var total = state.questions.length;
    var pct = Math.round((correct / total) * 100);

    // Show results
    var resultsEl = document.getElementById('mock-test-results');
    if (resultsEl) {
      var timeUsed = Math.floor(state.elapsed / 60) + ':' + pad(state.elapsed % 60);

      var sectionHtml = '';
      SECTIONS.forEach(function (s) {
        var sc = sectionScores[s.id];
        sectionHtml += '<div class="mock-section-score">' +
          '<span class="mock-section-name">' + s.icon + ' ' + s.label + '</span>' +
          '<span class="mock-section-val">' + sc.correct + ' / ' + sc.total + '</span>' +
        '</div>';
      });

      var grade = '';
      if (pct >= 90) grade = 'Xuất sắc!';
      else if (pct >= 70) grade = 'Đạt! Tiếp tục cố gắng.';
      else if (pct >= 50) grade = 'Gần đạt. Ôn lại những phần yếu.';
      else grade = 'Cần luyện thêm. Hãy ôn lại bài học!';

      resultsEl.innerHTML =
        '<div class="mock-results-card">' +
          '<h2>Kết quả</h2>' +
          '<div class="mock-score-display">' +
            '<span class="mock-score-number">' + correct + '</span>' +
            '<span class="mock-score-total">/ ' + total + '</span>' +
            '<span class="mock-score-pct">(' + pct + '%)</span>' +
          '</div>' +
          '<p class="mock-grade">' + grade + '</p>' +
          '<div class="mock-section-scores">' + sectionHtml + '</div>' +
          '<p class="mock-time-used">Thời gian: ' + timeUsed + '</p>' +
          '<div class="mock-results-actions">' +
            '<button class="btn btn-primary" onclick="LJMockTest.restart()">Làm lại</button>' +
            '<button class="btn btn-secondary" onclick="LJMockTest.scrollToFirst()">Xem đáp án</button>' +
          '</div>' +
        '</div>';
      resultsEl.style.display = 'block';
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide timer bar
    var timerBar = document.getElementById('mock-test-toolbar');
    if (timerBar) timerBar.classList.add('test-done');

    // Save to progress
    if (typeof LJProgress !== 'undefined') {
      LJProgress.saveQuizScore('mock-test-n5', correct, total);
    }
  }

  function restart() {
    stopTimer();
    var resultsEl = document.getElementById('mock-test-results');
    if (resultsEl) { resultsEl.style.display = 'none'; resultsEl.innerHTML = ''; }
    var timerBar = document.getElementById('mock-test-toolbar');
    if (timerBar) timerBar.classList.remove('test-done');
    var timerEl = document.getElementById('mock-test-timer');
    if (timerEl) { timerEl.classList.remove('timer-warning', 'timer-danger'); }
    start();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToFirst() {
    var first = document.querySelector('.mock-question.q-incorrect');
    if (first) first.scrollIntoView({ behavior: 'smooth' });
  }

  return {
    start: start,
    selectAnswer: selectAnswer,
    submitTest: submitTest,
    restart: restart,
    scrollToFirst: scrollToFirst
  };
})();
