// ============================================================
// QUIZ ENGINE
// ============================================================

var LJQuiz = (function () {
  var answered = {};

  function checkAnswer(btn, correctValue) {
    var question = btn.closest('.quiz-question');
    var qId = getQuestionId(question);

    // Already answered
    if (answered[qId]) return;
    answered[qId] = true;

    var selectedValue = btn.getAttribute('data-value');
    var allBtns = question.querySelectorAll('.option-btn');

    // Disable all buttons
    allBtns.forEach(function (b) {
      b.classList.add('disabled');
      if (b.getAttribute('data-value') === correctValue) {
        b.classList.add('correct');
      }
    });

    // Mark selected
    if (selectedValue !== correctValue) {
      btn.classList.add('incorrect');
    }

    // Show explanation
    var explanation = question.querySelector('.question-explanation');
    if (explanation) {
      explanation.style.display = 'block';
    }

    // Check if all questions answered
    checkAllAnswered();
  }

  function getQuestionId(question) {
    var allQuestions = document.querySelectorAll('.quiz-question');
    for (var i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i] === question) return 'q' + i;
    }
    return 'q-unknown';
  }

  function checkAllAnswered() {
    var allQuestions = document.querySelectorAll('.quiz-question');
    var total = allQuestions.length;
    if (total === 0) return;

    var answeredCount = Object.keys(answered).length;
    if (answeredCount < total) return;

    // Calculate score
    var correct = 0;
    allQuestions.forEach(function (q, i) {
      var correctVal = q.getAttribute('data-correct');
      var selected = q.querySelector('.option-btn.correct.disabled:not(.incorrect)');
      // Check if the user's answer was correct
      var userBtn = q.querySelector('.option-btn.incorrect');
      if (!userBtn) {
        correct++;
      }
    });

    // Show results
    var resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      var scoreEl = document.getElementById('quiz-score');
      var totalEl = document.getElementById('quiz-total');
      var msgEl = document.getElementById('score-message');

      if (scoreEl) scoreEl.textContent = correct;
      if (totalEl) totalEl.textContent = total;

      var pct = Math.round((correct / total) * 100);
      if (msgEl) {
        if (pct === 100) msgEl.textContent = 'Xuất sắc! Bạn đã nắm vững bài học này!';
        else if (pct >= 70) msgEl.textContent = 'Tốt lắm! Hãy ôn lại những câu sai nhé.';
        else msgEl.textContent = 'Cần luyện thêm. Hãy đọc lại bài học và thử lại!';
      }

      // Save score
      var quizId = window.location.pathname;
      if (typeof LJProgress !== 'undefined') {
        LJProgress.saveQuizScore(quizId, correct, total);
      }
    }
  }

  function reset() {
    answered = {};
    var allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(function (b) {
      b.classList.remove('correct', 'incorrect', 'disabled');
    });

    var explanations = document.querySelectorAll('.question-explanation');
    explanations.forEach(function (e) {
      e.style.display = 'none';
    });

    var resultsDiv = document.getElementById('quiz-results');
    if (resultsDiv) resultsDiv.style.display = 'none';
  }

  // ─── Matching Quiz ─────────────────────────────────
  var selectedLeft = null;
  var selectedRight = null;

  function initMatching() {
    var containers = document.querySelectorAll('.matching-quiz');
    containers.forEach(function (container) {
      // Shuffle right column items
      var rightItems = Array.from(container.querySelectorAll('.match-item[data-side="right"]'));
      var parent = rightItems[0] && rightItems[0].parentNode;
      if (!parent) return;

      // Fisher-Yates shuffle then re-append
      for (var i = rightItems.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = rightItems[i];
        rightItems[i] = rightItems[j];
        rightItems[j] = temp;
      }

      // Find the first right item's position and re-insert
      var leftItems = container.querySelectorAll('.match-item[data-side="left"]');
      rightItems.forEach(function (item) {
        container.appendChild(item);
      });
    });
  }

  function selectMatch(item) {
    if (item.classList.contains('matched')) return;

    var side = item.getAttribute('data-side');
    var container = item.closest('.matching-quiz');

    if (side === 'left') {
      // Deselect previous left
      if (selectedLeft) selectedLeft.classList.remove('selected');
      selectedLeft = item;
      item.classList.add('selected');
    } else if (side === 'right') {
      if (!selectedLeft) return; // Must select left first
      // Deselect previous right
      if (selectedRight) selectedRight.classList.remove('selected');
      selectedRight = item;
      item.classList.add('selected');

      // Check match
      var leftPair = selectedLeft.getAttribute('data-pair');
      var rightPair = selectedRight.getAttribute('data-pair');

      if (leftPair === rightPair) {
        selectedLeft.classList.add('matched');
        selectedLeft.classList.remove('selected');
        selectedRight.classList.add('matched');
        selectedRight.classList.remove('selected');
        selectedLeft = null;
        selectedRight = null;
      } else {
        // Wrong — brief red flash
        var wrongLeft = selectedLeft;
        var wrongRight = selectedRight;
        wrongLeft.classList.add('incorrect');
        wrongRight.classList.add('incorrect');
        setTimeout(function () {
          wrongLeft.classList.remove('selected', 'incorrect');
          wrongRight.classList.remove('selected', 'incorrect');
        }, 500);
        selectedLeft = null;
        selectedRight = null;
      }
    }
  }

  // ─── Fill-in-Blank ────────────────────────────────
  function checkBlank(btn) {
    var container = btn.closest('.fill-blank');
    var input = container.querySelector('input');
    if (!input || input.classList.contains('correct')) return;

    var answers = (input.getAttribute('data-answers') || '').split('|');
    var userVal = input.value.trim().toLowerCase();

    var isCorrect = answers.some(function (a) {
      return a.trim().toLowerCase() === userVal;
    });

    input.classList.remove('correct', 'incorrect');
    if (isCorrect) {
      input.classList.add('correct');
      input.setAttribute('readonly', 'true');
      btn.style.display = 'none';
      var feedback = container.querySelector('.blank-feedback');
      if (feedback) {
        feedback.textContent = '✓';
        feedback.style.color = 'var(--hira-color)';
        feedback.style.display = 'inline';
      }
    } else {
      input.classList.add('incorrect');
      var feedback = container.querySelector('.blank-feedback');
      if (feedback) {
        feedback.textContent = 'Thử lại!';
        feedback.style.color = 'var(--japan-red)';
        feedback.style.display = 'inline';
      }
    }
  }

  function showHint(btn) {
    var container = btn.closest('.fill-blank');
    var hint = container.querySelector('.blank-hint');
    if (hint) {
      hint.style.display = 'inline';
      btn.style.display = 'none';
    }
  }

  // Init matching quizzes on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatching);
  } else {
    initMatching();
  }

  return {
    checkAnswer: checkAnswer,
    reset: reset,
    initMatching: initMatching,
    selectMatch: selectMatch,
    checkBlank: checkBlank,
    showHint: showHint
  };
})();
