// меню + фильтр кейсов + тема + reveal
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });

  // переключатель темы (сохраняем выбор)
  var tt = document.getElementById('theme-toggle');
  if (tt) tt.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var sysDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
    var next = cur ? (cur === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // reveal on scroll (без JS контент виден — класс добавляем скриптом)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.probs,.products-grid,.cases-grid,.book-grid,.verify-grid,.about-grid,.deliver-grid,.result-numbers,.steps');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight) { el.classList.add('in'); return; }
      el.classList.add('rv'); io.observe(el);
    });
  }

  var bar = document.querySelector('.filter-bar');
  if (bar) {
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('#cases-cards .case-card').forEach(function (card) {
        var tags = (card.dataset.tag || '').split(' ');
        card.style.display = (f === 'all' || tags.indexOf(f) !== -1) ? '' : 'none';
      });
    });
  }
});
