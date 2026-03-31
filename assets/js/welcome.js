// ============================================================
// WELCOME MODAL — localStorage dismiss + level select
// ============================================================

var LJWelcome = (function () {
  var DISMISSED_KEY = 'lj_welcome_dismissed';
  var LEVEL_KEY = 'lj_selected_level';

  function init() {
    var overlay = document.getElementById('welcome-overlay');
    if (!overlay) return;

    // Already dismissed — remove overlay immediately
    if (localStorage.getItem(DISMISSED_KEY) === 'true') {
      overlay.classList.add('hidden');
      return;
    }

    document.body.classList.add('welcome-active');

    var cards = overlay.querySelectorAll('.level-card.level-active');
    var startBtn = document.getElementById('welcome-start');
    var dismissCheck = document.getElementById('welcome-dismiss-check');
    var selectedLevel = null;

    // Level card selection
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        // Deselect all
        overlay.querySelectorAll('.level-card').forEach(function (c) {
          c.classList.remove('selected');
        });
        // Select this one
        card.classList.add('selected');
        selectedLevel = card.getAttribute('data-level');
        startBtn.disabled = false;
      });
    });

    // Start button
    startBtn.addEventListener('click', function () {
      if (!selectedLevel) return;

      localStorage.setItem(LEVEL_KEY, selectedLevel);

      if (dismissCheck.checked) {
        localStorage.setItem(DISMISSED_KEY, 'true');
      }

      overlay.classList.add('hidden');
      document.body.classList.remove('welcome-active');
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init: init };
})();
