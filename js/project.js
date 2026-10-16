/* Página de proyecto: se arma sola a partir de data.js */
(function () {
  var LC = window.LC;
  var projects = window.PROJECTS || [];
  var slug = new URLSearchParams(location.search).get('p');
  var i = projects.findIndex(function (p) { return p.slug === slug; });
  if (i < 0) i = 0;
  var p = projects[i];
  var next = projects[(i + 1) % projects.length];
  var nextI = (i + 1) % projects.length;

  document.title = LC.title(p).replace(/\s+\|\s+/, ' — ') + ' — Luciana Carassale';
  document.querySelector('h1').textContent = LC.title(p).replace(/\s+\|\s+/, ' — ') + ' × ' + p.client;

  /* Título fijo en el medio de la pantalla */
  document.querySelector('.p-overlay').innerHTML =
    '<span class="split">' +
      '<span style="font-weight:500">[' + LC.num(i) + ']</span>' +
      '<span class="label" style="grid-template-columns:minmax(0,1fr)">' +
        '<span class="t">' + LC.esc(LC.title(p)) + '</span>' +
        '<span class="m" style="grid-column:1">' + LC.esc(LC.meta(p)) + '</span>' +
      '</span>' +
    '</span>';

  /* Color de fondo propio del proyecto (bg en data.js); con fondo oscuro, texto claro */
  if (p.bg) {
    document.documentElement.style.setProperty('--paper', p.bg);
    var hex = p.bg.replace('#', '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    var lum = (parseInt(hex.slice(0, 2), 16) * 299 + parseInt(hex.slice(2, 4), 16) * 587 + parseInt(hex.slice(4, 6), 16) * 114) / 1000;
    if (lum < 128) document.documentElement.style.setProperty('--ink', '#FFFFFF');
  }

  /* Si se cruza el tamaño celular/desktop y el proyecto tiene layoutMobile, se rearma */
  if (p.layoutMobile) {
    window.matchMedia('(max-width: 760px)').addEventListener('change', function () { location.reload(); });
  }

  /* Galería de ejemplo si el proyecto todavía no tiene fotos */
  var gallery = (p.gallery && p.gallery.length) ? p.gallery : (p.hero || p.cover) ? [] : [
    { type: 'wide', src: '' },
    { type: 'pair', src: ['', ''] },
    { type: 'pair-bleed', src: ['', ''] },
    { type: 'full', src: '' }
  ];
  var shades = ['#3A332C', '#26221F', '#4A4038', '#5A4A3C', '#1F1B18', '#332B25'];
  var s = 0;
  function tone() { return shades[(s++) % shades.length]; }

  var html = p.heroInLayout ? '' : LC.media(p.hero || p.cover, p.hero || p.cover ? null : '#2B2520', 'Hero image or video — full bleed', 'p-hero', LC.title(p));

  gallery.forEach(function (b, k) {
    var src = b.src;
    /* Si la primera imagen del layout es 'completa', entra entera en la pantalla */
    var fit = p.heroInLayout && k === 0 && b.type === 'full';
    if (b.type === 'wide') {
      html += '<div class="g-wide-wrap">' + LC.media(src, tone(), 'Image — wide', 'g-wide') + '</div>';
    } else if (b.type === 'pair') {
      src = src || ['', ''];
      html += '<div class="g-pair">' + LC.media(src[0], tone(), 'Image — 4:5') + LC.media(src[1], tone(), 'Image — 4:5') + '</div>';
    } else if (b.type === 'pair-bleed') {
      src = src || ['', ''];
      html += '<div class="g-bleed">' + LC.media(src[0], tone(), 'Image — edge to edge') + LC.media(src[1], tone(), 'Image — edge to edge') + '</div>';
    } else if (b.type === 'row' || b.type === 'framed') {
      /* Fotos pegadas, todas de la misma altura (el ancho sale de la proporción de cada una) */
      var cells = [].concat(src).map(function (one, k) {
        var r = (b.ratio && b.ratio[k]) || 0.8;
        var cap = b.captions && b.captions[k] ? '<span class="g-caption">' + LC.esc(b.captions[k]) + '</span>' : '';
        return '<div class="g-cell" style="flex:' + r + ' 1 0%;aspect-ratio:' + r + '">' + LC.media(one, tone(), 'Image') + cap + '</div>';
      }).join('');
      var style = b.bg ? ' style="background-color:' + LC.esc(b.bg) + '"' : '';
      /* En celular: filas de 4 o más → de a 2; filas que mezclan una horizontal → una debajo de otra */
      var n = [].concat(src).length;
      var mixed = n > 1 && (b.ratio || []).some(function (r) { return r > 1.2; });
      var keep = p.mobileGrid === 'desktop';  /* en celular, igual que desktop */
      var rowCls = 'g-row' + (keep ? '' : n >= 4 ? ' g-row--wrap' : mixed ? ' g-row--stack' : '');
      html += b.type === 'row'
        ? '<div class="' + rowCls + '">' + cells + '</div>'
        : '<div class="g-framed"' + style + '><div class="g-row">' + cells + '</div></div>';
    } else if (b.type === 'cards') {
      html += '<div class="g-cards">' + b.cards.map(function (c) {
        return '<figure class="g-card">' + LC.media(c.src, tone(), 'Image', '', c.name) +
          '<figcaption><span>' + LC.esc(c.name) + '</span><span class="g-card-place">' + LC.esc(c.place) + '</span></figcaption></figure>';
      }).join('') + '</div>';
    } else if (b.type === 'text') {
      var dark = b.bg && /^#(000|000000|1a1a1a|111111)$/i.test(b.bg);
      html += '<div class="g-text' + (dark ? ' g-text--dark' : '') + '"' + (b.bg ? ' style="background-color:' + LC.esc(b.bg) + '"' : '') + '><div>' +
        b.text.map(function (t) { return '<p>' + LC.esc(t) + '</p>'; }).join('') + '</div></div>';
    } else if (b.type === 'single') {
      html += '<div class="g-single">' + LC.media(src, tone(), 'Image — single') + '</div>';
    } else {
      html += LC.media(src, tone(), 'Image or video — full bleed', 'g-full' + (fit ? ' g-fit' : '') + (fit && p.hero === 'none' ? ' g-fit--space' : ''));
    }
  });
  /* Ficha del proyecto (info en data.js): CAMPAIGN / ROL / AGENCY + descripción.
     Va en todos los proyectos; lo que falte completar se muestra entre corchetes. */
  var info = p.info || {};
  var val = function (v, ph) {
    return v ? LC.esc(v) : '<span class="p-info-ph">[' + ph + ']</span>';
  };
  var row = function (label, v, ph) {
    return '<div class="p-info-row"><span class="p-info-k">' + label + '</span><span>' + val(v, ph) + '</span></div>';
  };
  var infoHtml = '<div class="p-info">' +
    '<div class="p-info-top">' + row('Campaign', info.campaign, 'Campaign') +
      '<span class="p-info-year">' + val(info.year, 'Year') + '</span></div>' +
    row('Role', info.rol, 'Role') + row('Agency', info.agency, 'Agency') +
    /* El texto puede tener varios párrafos (separados por un renglón vacío) */
    (info.text
      ? '<div class="p-info-text">' + String(info.text).split(/\n\s*\n/).map(function (t) { return '<p>' + LC.esc(t.trim()) + '</p>'; }).join('') + '</div>'
      : '<p class="p-info-text">' + val('', 'Project description') + '</p>') +
  '</div>';

  document.querySelector('.p-gallery').innerHTML = html;
  LC.playVideos(document.querySelector('.p-gallery'));

  /* Sonido: los navegadores no dejan que un video arranque solo con audio,
     así que arrancan en silencio y cada uno tiene un botón "Sound on".
     Suena uno a la vez: al activar uno, los demás se silencian. */
  var gVideos = document.querySelectorAll('.p-gallery video');
  function setSound(v, on) {
    v.muted = !on;
    v.dataset.sound = on ? 'on' : 'off';
    var btn = v.parentNode.querySelector('.sound-btn');
    if (btn) { btn.textContent = on ? 'Sound off' : 'Sound on'; btn.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    if (on) {
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      for (var k = 0; k < gVideos.length; k++) if (gVideos[k] !== v && gVideos[k].dataset.sound === 'on') setSound(gVideos[k], false);
    }
  }
  for (var k = 0; k < gVideos.length; k++) {
    (function (v) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sound-btn';
      btn.textContent = 'Sound on';
      btn.setAttribute('aria-pressed', 'false');
      v.parentNode.appendChild(btn);
      var toggle = function (e) { e.preventDefault(); setSound(v, v.muted); };
      btn.addEventListener('click', toggle);
      v.addEventListener('click', toggle);
      v.style.cursor = 'pointer';
    })(gVideos[k]);
  }

  /* Siguiente proyecto */
  var nextEl = document.querySelector('.p-next');
  nextEl.classList.toggle('has-info', !!infoHtml);
  nextEl.innerHTML = infoHtml +
    '<a class="split" href="' + LC.projectUrl(next) + '">' +
      '<span style="font-weight:500;font-size:15px">[' + LC.num(nextI) + ']</span>' +
      '<span class="p-next-body">' +
        '<span class="p-next-row">' +
          '<span class="label" style="grid-template-columns:minmax(0,1fr)">' +
            '<span class="t">' + LC.esc(LC.title(next)) + '</span>' +
            '<span class="m" style="grid-column:1">' + LC.esc(LC.meta(next)) + '</span>' +
          '</span>' +
          '<span class="p-next-cta">Next project</span>' +
        '</span>' +
        LC.media(next.cover, next.tone, 'Image', '', LC.title(next)) +
      '</span>' +
    '</a>';
  LC.playVideos(document.querySelector('.p-next'));

  /* El título fijo se oculta cuando aparece "Next project" */
  var overlay = document.querySelector('.p-overlay');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      overlay.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { rootMargin: '0px 0px -40% 0px' }).observe(document.querySelector('.p-next'));
  }

  /* Porcentaje de scroll */
  var prog = document.querySelector('.p-progress');
  function onScroll() {
    var el = document.documentElement;
    var max = Math.max(1, el.scrollHeight - window.innerHeight);
    prog.textContent = Math.min(100, Math.max(0, Math.round(window.scrollY / max * 100))) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
