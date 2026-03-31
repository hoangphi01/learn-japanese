(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function applyTheme(theme) {
    if (theme === 'modern') {
      document.documentElement.setAttribute('data-theme', 'modern');
      toggle.checked = true;
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.checked = false;
    }
  }

  // Apply saved theme (also done inline in <head> to prevent FOUC)
  var saved = localStorage.getItem('lj_theme');
  if (saved === null) saved = 'modern';
  applyTheme(saved);

  toggle.addEventListener('change', function () {
    var next = toggle.checked ? 'modern' : '';
    applyTheme(next);
    if (next) {
      localStorage.setItem('lj_theme', next);
    } else {
      localStorage.removeItem('lj_theme');
    }
  });
})();
