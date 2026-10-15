/* Página Works / Index / CV */
(function () {
  var LC = window.LC;
  var projects = window.PROJECTS || [];
  var site = window.SITE || {};
  var body = document.body;
  var bg = document.querySelector('.hover-bg');
  var bgLabel = bg.querySelector('.ph-label');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Grilla de Works ---- */
  var grid = document.querySelector('.grid-works');
  grid.innerHTML = projects.map(function (p, i) {
    return '<a class="work" href="' + LC.projectUrl(p) + '" data-i="' + i + '">' +
      LC.labelHtml(p, i) +
      LC.media(p.cover, p.tone, 'Image', '', LC.title(p)) +
      '</a>';
  }).join('');
  LC.playVideos(grid);

  /* Works e Index son la misma grilla: en Index las imágenes se aplastan hasta
     desaparecer y los textos suben. Para animar la altura hace falta saberla en px. */
  function measure() {
    var first = grid.querySelector('.work');
    if (first) grid.style.setProperty('--mh', (first.offsetWidth * 9 / 16) + 'px');
  }
  measure();
  window.addEventListener('resize', measure);

  /* ---- Contador del footer ---- */
  var count = document.querySelector('[data-count]');
  if (count) count.textContent = 'Works [' + projects.length + ']';

  /* ---- CV: LinkedIn (el email lo completa common.js en todos los [data-mail]) ---- */
  var li = document.querySelector('[data-linkedin]');
  if (li) { if (site.linkedin) li.href = site.linkedin; else li.remove(); }
  var cvLink = document.querySelector('[data-cv-file]');
  if (cvLink) { if (site.cvFile) cvLink.href = site.cvFile; else cvLink.remove(); }

  /* ---- Efecto: fondo a pantalla completa al pasar el mouse ---- */
  var current = null;
  function setHover(i) {
    if (i === current) return;
    if (current !== null) {
      var prev = document.querySelectorAll('[data-i="' + current + '"]');
      for (var a = 0; a < prev.length; a++) prev[a].classList.remove('is-current');
    }
    current = i;
    if (i === null) { body.classList.remove('is-hovering'); return; }
    var p = projects[i];
    var now = document.querySelectorAll('[data-i="' + i + '"]');
    for (var b = 0; b < now.length; b++) now[b].classList.add('is-current');
    bg.style.backgroundColor = p.tone || '#111111';
    bgLabel.textContent = '';
    if (bgMedia) { bgMedia.remove(); bgMedia = null; }
    if (p.cover) {
      bgMedia = document.createElement(LC.isVideo(p.cover) ? 'video' : 'img');
      if (bgMedia.tagName === 'VIDEO') {
        bgMedia.muted = true; bgMedia.loop = true; bgMedia.autoplay = true; bgMedia.playsInline = true;
        /* Arranca en el mismo punto que la miniatura, así no salta */
        var thumb = grid.querySelector('[data-i="' + i + '"] video');
        bgMedia.src = p.cover;
        if (thumb) bgMedia.currentTime = thumb.currentTime;
      } else {
        bgMedia.src = p.cover;
        bgMedia.alt = '';
      }
      bg.appendChild(bgMedia);
      LC.playVideos(bg);
    }
    body.classList.add('is-hovering');
  }
  var bgMedia = null;

  /* Solo se selecciona al estar encima de la imagen (Works) o del texto (Index) */
  if (canHover) {
    grid.addEventListener('mouseover', function (e) {
      var m = e.target.closest(grid.classList.contains('is-index') ? '.label' : '.media');
      var w = m && m.closest('[data-i]');
      setHover(w ? +w.getAttribute('data-i') : null);
    });
    grid.addEventListener('mouseleave', function () { setHover(null); });
  }
  /* Teclado: el foco también muestra el fondo */
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest && e.target.closest('[data-i]');
    setHover(el ? +el.getAttribute('data-i') : null);
  });

  /* ---- Vistas: #works, #index, #cv ---- */
  var cv = document.querySelector('.view-cv');
  var views = ['works', 'index', 'cv'];
  function show() {
    var v = (location.hash || '#works').slice(1);
    if (views.indexOf(v) < 0) v = 'works';
    setHover(null);
    grid.classList.toggle('is-shown', v !== 'cv');
    grid.classList.toggle('is-index', v === 'index');
    cv.classList.toggle('is-shown', v === 'cv');
    measure();
    views.forEach(function (k) {
      var links = document.querySelectorAll('[data-view-link="' + k + '"]');
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle('is-active', k === v);
        if (k === v) links[j].setAttribute('aria-current', 'page'); else links[j].removeAttribute('aria-current');
      }
    });
  }
  window.addEventListener('hashchange', show);
  /* Al cargar la página no se anima: aparece directo en la vista pedida */
  grid.classList.add('no-anim');
  show();
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { grid.classList.remove('no-anim'); });
  });
})();
