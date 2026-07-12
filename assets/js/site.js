// меню + фильтр кейсов
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });

  var bar = document.querySelector('.filter-bar');
  if (bar) {
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('#cases-cards .case-card').forEach(function (card) {
        card.style.display = (f === 'all' || card.dataset.tag === f) ? '' : 'none';
      });
    });
  }
});
