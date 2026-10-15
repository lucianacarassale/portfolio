/* Funciones compartidas: reloj, footer y helpers. */
(function () {
  var LC = (window.LC = {});

  LC.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  LC.num = function (i) { return String(i + 1).padStart(2, '0'); };

  /* "layout" de data.js → bloques de galería. Ej: 'fila 03 04', 'enmarcada 05 negro' */
  var TYPES = { completa: 'full', fila: 'row', enmarcada: 'framed' };
  var COLORS = { negro: '#000000', blanco: '#FFFFFF' };
  LC.fromLayout = function (layout, files) {
    var out = [];
    layout.forEach(function (line) {
      /* Bloque de texto: { texto: ['párrafo 1', 'párrafo 2'] } */
      if (line && line.texto) {
        out.push({ type: 'text', text: [].concat(line.texto) });
        return;
      }
      /* Fila con etiquetas abajo de cada foto: { fila: '06 07 08', etiquetas: ['Active', ...] } */
      var captions = null;
      if (line && typeof line === 'object') {
        captions = line.etiquetas || null;
        line = line.fila ? 'fila ' + line.fila : line.enmarcada ? 'enmarcada ' + line.enmarcada : '';
      }
      var words = String(line).trim().split(/\s+/);
      var type = TYPES[words[0].toLowerCase()];
      if (!type) return;
      var srcs = [], ratios = [], bg = null;
      words.slice(1).forEach(function (w) {
        /* "05" = foto 05 · "05:1.6" = foto 05 recortada a esa proporción (ancho / alto) */
        var m = /^(\d+)(?::([\d.]+))?$/.exec(w);
        var f = m && files[m[1].padStart(2, '0')];
        if (f) { srcs.push(f.src); ratios.push(m[2] ? +m[2] : f.ratio); }
        else if (COLORS[w.toLowerCase()] || /^#[0-9a-f]{3,8}$/i.test(w)) bg = COLORS[w.toLowerCase()] || w;
      });
      if (!srcs.length) return;
      if (type === 'full') srcs.forEach(function (s) { out.push({ type: 'full', src: s }); });
      else out.push({ type: type, src: srcs, ratio: ratios, bg: bg, captions: captions });
    });
    return out;
  };

  LC.isMobile = window.matchMedia('(max-width: 760px)').matches;

  /* Imágenes automáticas (js/media.js): completan lo que data.js deja vacío */
  var media = window.MEDIA || {};
  (window.PROJECTS || []).forEach(function (p, i) {
    var m = media[LC.num(i)];
    if (!m) return;
    if (!p.cover) p.cover = m.cover;
    if (!p.hero) p.hero = m.hero;
    if (p.gallery && p.gallery.length) return;
    /* En celular se usa layoutMobile si el proyecto lo tiene */
    var lay = (LC.isMobile && p.layoutMobile && p.layoutMobile.length) ? p.layoutMobile : p.layout;
    p.gallery = lay && lay.length ? LC.fromLayout(lay, m.files || {}) : m.gallery;
    /* Si el layout ya usa la 01 (o hero: 'none'), no se muestra la imagen principal arriba */
    p.heroInLayout = p.hero === 'none' || !!(lay && /(^|\s)0?1(:|\s|$)/.test(lay.join(' ')));
  });

  LC.title = function (p) { return p.collab ? p.title + '  |  ' + p.collab : p.title; };
  LC.meta = function (p) { return p.client + '.  [' + p.role + ']'; };

  LC.projectUrl = function (p) { return 'project.html?p=' + encodeURIComponent(p.slug); };

  LC.isVideo = function (src) { return /\.(mp4|webm|mov)$/i.test(src || ''); };

  /* Devuelve el HTML de una imagen/video o un placeholder de color */
  LC.media = function (src, tone, label, cls, alt) {
    var c = 'media' + (cls ? ' ' + cls : '');
    if (src && LC.isVideo(src)) {
      return '<div class="' + c + '"><video src="' + LC.esc(src) + '" autoplay muted loop playsinline preload="metadata"></video></div>';
    }
    if (src) {
      return '<div class="' + c + '"><img src="' + LC.esc(src) + '" alt="' + LC.esc(alt || '') + '" loading="lazy" decoding="async"></div>';
    }
    return '<div class="' + c + '" style="background-color:' + LC.esc(tone || '#ECECEC') + '"><span class="ph-label">[' + LC.esc(label || 'Image') + ']</span></div>';
  };

  /* Asegura que los videos (sin sonido) arranquen solos en todos los navegadores */
  LC.playVideos = function (root) {
    var vids = (root || document).querySelectorAll('video');
    for (var k = 0; k < vids.length; k++) {
      vids[k].muted = true;
      var pr = vids[k].play();
      if (pr && pr.catch) pr.catch(function () {});
    }
  };

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') LC.playVideos();
  });

  LC.labelHtml = function (p, i) {
    return '<span class="label">' +
      '<span class="n">[' + LC.num(i) + ']</span>' +
      '<span class="t">' + LC.esc(LC.title(p)) + '</span>' +
      '<span class="m">' + LC.esc(LC.meta(p)) + '</span>' +
      '</span>';
  };

  /* Reloj de Buenos Aires */
  function tick() {
    var t;
    try {
      t = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/Buenos_Aires', hour12: false }) + ' (GMT−3)';
    } catch (e) { t = '(GMT−3)'; }
    var els = document.querySelectorAll('[data-clock]');
    for (var k = 0; k < els.length; k++) els[k].textContent = t;
  }
  tick();
  setInterval(tick, 1000);

  /* Footer: email y año desde data.js */
  var site = window.SITE || {};
  var mails = document.querySelectorAll('[data-mail]');
  for (var m = 0; m < mails.length; m++) {
    if (site.email) {
      mails[m].href = 'mailto:' + site.email;
      mails[m].textContent = site.email;
    } else {
      mails[m].removeAttribute('href');
      mails[m].textContent = '[Your email]';
    }
  }
  var counts = document.querySelectorAll('[data-count]');
  for (var c = 0; c < counts.length; c++) counts[c].textContent = 'Works [' + (window.PROJECTS || []).length + ']';
  var years = document.querySelectorAll('[data-year]');
  for (var y = 0; y < years.length; y++) years[y].textContent = '©' + (site.year || new Date().getFullYear());
})();
