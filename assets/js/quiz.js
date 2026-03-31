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

  return {
    checkAnswer: checkAnswer,
    reset: reset
  };
})();
