// ============================================================
// NAV & SIDEBAR — Navigation and sidebar toggle
// ============================================================

(function () {
  var hamburger = document.getElementById('nav-hamburger');
  var navLinks = document.getElementById('nav-links');
  var sidebar = document.getElementById('sidebar');
  var sidebarClose = document.getElementById('sidebar-close');
  var sidebarOverlay = document.getElementById('sidebar-overlay');
  var sidebarToggle = document.getElementById('sidebar-toggle');

  // Restore sidebar state from localStorage (desktop)
  // Default: sidebar open → toggle shows X (active)
  var sidebarState = localStorage.getItem('lj_sidebar');
  if (sidebarState === 'collapsed' && sidebar && window.innerWidth > 1024) {
    sidebar.classList.add('collapsed');
  } else if (sidebarToggle && window.innerWidth > 1024) {
    sidebarToggle.classList.add('active');
  }

  // Sidebar toggle (navbar button)
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      if (window.innerWidth > 1024) {
        // Desktop: collapse/expand
        sidebar.classList.toggle('collapsed');
        sidebarToggle.classList.toggle('active');
        localStorage.setItem('lj_sidebar',
          sidebar.classList.contains('collapsed') ? 'collapsed' : 'open');
      } else {
        // Mobile: slide open/close
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
      }
    });
  }

  // Hamburger toggle (mobile nav links)
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Sidebar close button
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      if (sidebarToggle) sidebarToggle.classList.remove('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      if (sidebarToggle) sidebarToggle.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  }

  // Mobile dock: sidebar toggle
  var dockSidebar = document.getElementById('dock-sidebar');
  if (dockSidebar && sidebar) {
    dockSidebar.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  // Mobile dock: theme toggle
  var dockTheme = document.getElementById('dock-theme');
  var themeCheckbox = document.getElementById('theme-toggle');
  if (dockTheme && themeCheckbox) {
    dockTheme.addEventListener('click', function () {
      themeCheckbox.checked = !themeCheckbox.checked;
      themeCheckbox.dispatchEvent(new Event('change'));
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

  // Level selector in sidebar
  var levelSelect = document.getElementById('sidebar-level-select');
  var levelBadge = document.getElementById('sidebar-level-badge');

  function filterChaptersByLevel(level) {
    var chapters = document.querySelectorAll('.sidebar-chapter');
    chapters.forEach(function (ch) {
      ch.style.display = ch.getAttribute('data-level') === level ? '' : 'none';
    });
    if (levelBadge) levelBadge.textContent = level;
    localStorage.setItem('lj_selected_level', level);
  }

  if (levelSelect) {
    var savedLevel = localStorage.getItem('lj_selected_level') || 'N5';
    levelSelect.value = savedLevel;
    filterChaptersByLevel(savedLevel);

    levelSelect.addEventListener('change', function () {
      filterChaptersByLevel(this.value);
    });
  }
})();
