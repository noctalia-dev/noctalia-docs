// Injects URL-based breadcrumbs into pagefind search result titles.
// Sets --result-path CSS custom property so ::after can display it.
(function () {
  const toTitleCase = (s) =>
    s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  function formatPath(href) {
    try {
      const segments = new URL(href).pathname.split('/').filter(Boolean);
      // All segments except the last (the page itself) form the breadcrumb
      const parents = segments.length > 1 ? segments.slice(0, -1) : segments;
      return parents.map(toTitleCase).join(' › ');
    } catch {
      return '';
    }
  }

  function annotate(root) {
    root.querySelectorAll(
      '.pagefind-ui__result-inner > .pagefind-ui__result-title:not([data-bc])'
    ).forEach((title) => {
      title.dataset.bc = '1';
      const link = title.querySelector('a.pagefind-ui__result-link');
      if (!link) return;
      const path = formatPath(link.href);
      if (path) title.style.setProperty('--result-path', JSON.stringify(path));
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) annotate(node);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('starlight__search');
    if (search) observer.observe(search, { subtree: true, childList: true });
  });
})();
