// 제주여라 입점 제안서 — 슬라이드 이동, 진입 모션, 숫자 카운트업
(() => {
  const root = document.documentElement;
  const slides = [...document.querySelectorAll('.slide')];
  const isStatic = root.classList.contains('static');
  const still = isStatic || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  let cur = 0;

  $('total').textContent = pad(slides.length);
  const dots = slides.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `${i + 1}. ${s.getAttribute('aria-label')}`);
    b.title = s.getAttribute('aria-label');
    b.addEventListener('click', () => go(i));
    $('dots').append(b);
    return b;
  });

  const fmt = (el, v) => { el.textContent = (+el.dataset.dec ? v.toFixed(+el.dataset.dec) : Math.round(v)); };
  const timers = new WeakMap();
  function count(el, run) {
    cancelAnimationFrame(timers.get(el));
    const end = parseFloat(el.dataset.count);
    if (!run || still) return fmt(el, end);
    const t0 = performance.now(), dur = 1500, delay = 450;
    fmt(el, 0);
    const tick = t => {
      const p = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
      fmt(el, end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) timers.set(el, requestAnimationFrame(tick));
    };
    timers.set(el, requestAnimationFrame(tick));
  }

  function setCurrent(i) {
    cur = i;
    $('cur').textContent = pad(i + 1);
    $('progressBar').style.transform = `scaleX(${(i + 1) / slides.length})`;
    dots.forEach((d, j) => d.toggleAttribute('aria-current', j === i));
    root.dataset.ui = slides[i].dataset.ui || 'dark';
    history.replaceState(null, '', `#${i + 1}`);
  }

  function enter(s, on) {
    if (s.classList.contains('in') === on) return;
    s.classList.toggle('in', on);
    s.querySelectorAll('[data-count]').forEach(el => count(el, on));
  }

  if (still) {
    slides.forEach(s => enter(s, true));
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      const i = slides.indexOf(e.target);
      if (!still) enter(e.target, e.intersectionRatio >= .45);
      if (e.intersectionRatio >= .45) setCurrent(i);
    }
  }, { threshold: [0, .45, .9] });
  slides.forEach(s => io.observe(s));

  function go(i, instant) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: instant || still ? 'auto' : 'smooth', block: 'start' });
  }
  $('prev').addEventListener('click', () => go(cur - 1));
  $('next').addEventListener('click', () => go(cur + 1));
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(k)) { e.preventDefault(); go(cur + 1); }
    else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(k)) { e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
  });

  const start = parseInt(location.hash.slice(1), 10);
  if (start > 1 && start <= slides.length) go(start - 1, true);

  // 표지·마무리 슬라이드: 포인터를 따라 살짝 움직이는 시차 효과
  if (!still && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      root.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3));
      root.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3));
    }, { passive: true });
  }

  // 인쇄(PDF 저장) 시에는 모든 슬라이드를 완성 상태로
  addEventListener('beforeprint', () => slides.forEach(s => {
    s.classList.add('in');
    s.querySelectorAll('[data-count]').forEach(el => count(el, false));
  }));
})();
