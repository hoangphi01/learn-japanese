// ============================================================
// NAV & SIDEBAR — Mobile navigation
// ============================================================

(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var navLinks = document.getElementById('nav-links');
  var sidebar = document.getElementById('sidebar');
  var sidebarClose = document.getElementById('sidebar-close');
  var sidebarOverlay = document.getElementById('sidebar-overlay');

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      // On mobile, also toggle sidebar
      if (window.innerWidth <= 1024 && sidebar) {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
      }
    });
  }

  // Sidebar close
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  }

  // Chapter toggle in sidebar
  var toggles = document.querySelectorAll('.chapter-toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var parent = btn.closest('.sidebar-chapter');
      parent.classList.toggle('active');
    });
  });
})();
