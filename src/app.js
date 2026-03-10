document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.section;

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(target).classList.add('active');
    });
  });

  if (window.appInfo) {
    const versionEl = document.querySelector('.app-version');
    if (versionEl) {
      versionEl.textContent = `v${window.appInfo.version} (${window.appInfo.platform})`;
    }
  }
});
