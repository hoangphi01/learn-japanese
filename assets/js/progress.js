// ============================================================
// PROGRESS TRACKING — localStorage
// ============================================================

var LJProgress = (function () {
  var STORAGE_KEY = 'lj_progress';

  function getData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { lessons: {}, quizScores: {} };
    } catch (e) {
      return { lessons: {}, quizScores: {} };
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage full or unavailable
    }
  }

  function toggleLesson(lessonId, completed) {
    var data = getData();
    if (completed) {
      data.lessons[lessonId] = { completed: true, date: new Date().toISOString() };
    } else {
      delete data.lessons[lessonId];
    }
    saveData(data);
    updateUI();
  }

  function isLessonComplete(lessonId) {
    var data = getData();
    return !!(data.lessons[lessonId] && data.lessons[lessonId].completed);
  }

  function saveQuizScore(quizId, score, total) {
    var data = getData();
    data.quizScores[quizId] = { score: score, total: total, date: new Date().toISOString() };
    saveData(data);
  }

  function getCompletedCount() {
    var data = getData();
    return Object.keys(data.lessons).length;
  }

  function getTotalLessons() {
    var items = document.querySelectorAll('.chapter-lessons li[data-lesson]');
    return items.length;
  }

  function updateUI() {
    var data = getData();

    // Update sidebar checkmarks
    var items = document.querySelectorAll('.chapter-lessons li[data-lesson]');
    items.forEach(function (li) {
      var id = li.getAttribute('data-lesson');
      if (data.lessons[id] && data.lessons[id].completed) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    });

    // Update lesson complete checkbox
    var checkbox = document.getElementById('mark-complete');
    if (checkbox) {
      var lessonId = checkbox.getAttribute('data-lesson');
      checkbox.checked = isLessonComplete(lessonId);
    }

    // Update overall progress
    var total = getTotalLessons();
    var completed = getCompletedCount();
    var pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    var progressFill = document.getElementById('overall-progress');
    var progressPct = document.getElementById('overall-pct');

    if (progressFill) progressFill.style.width = pct + '%';
    if (progressPct) progressPct.textContent = pct + '%';

    // Update mobile progress bar
    var mobileFill = document.getElementById('mobile-progress-fill');
    var mobilePct = document.getElementById('mobile-progress-pct');
    if (mobileFill) mobileFill.style.width = pct + '%';
    if (mobilePct) mobilePct.textContent = pct + '%';

    // Update chapter cards on homepage
    var cards = document.querySelectorAll('.chapter-card[data-chapter]');
    cards.forEach(function (card) {
      var chId = card.getAttribute('data-chapter');
      var chItems = document.querySelectorAll(
        '#ch-' + chId + '-lessons li[data-lesson]'
      );
      var chTotal = chItems.length;
      var chDone = 0;
      chItems.forEach(function (li) {
        var id = li.getAttribute('data-lesson');
        if (data.lessons[id] && data.lessons[id].completed) chDone++;
      });
      var fill = card.querySelector('.chapter-card-progress-fill');
      if (fill && chTotal > 0) {
        fill.style.width = Math.round((chDone / chTotal) * 100) + '%';
      }
    });
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', updateUI);

  return {
    toggleLesson: toggleLesson,
    isLessonComplete: isLessonComplete,
    saveQuizScore: saveQuizScore,
    getCompletedCount: getCompletedCount,
    updateUI: updateUI
  };
})();
