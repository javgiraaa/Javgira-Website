const FA = { "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹" };
const faDigits = s => String(s).replace(/[0-9]/g, d => FA[d]);
function finalText(el) {
  const n = faDigits(el.dataset.counter || "0");
  return el.dataset.suffix ? n + el.dataset.suffix : n;
}
export function initCounters() {
  const els = document.querySelectorAll("[data-counter]");
  if (!els.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    els.forEach(el => { el.textContent = finalText(el); });
    return;
  }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target; io.unobserve(el);
    const target = parseInt(el.dataset.counter, 10) || 0, t0 = performance.now(), dur = 900;
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3), v = Math.round(target * e);
      el.textContent = el.dataset.suffix ? faDigits(v) + el.dataset.suffix : faDigits(v);
      if (p < 1) requestAnimationFrame(step); else el.textContent = finalText(el);
    })(t0);
  }), { threshold: .6 });
  els.forEach(el => io.observe(el));
}
