const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export function observe(scope) {
  const els = (scope || document).querySelectorAll(".reveal:not(.visible),.reveal-scale:not(.visible)");
  if (!els.length) return;
  if (reduceMotion() || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  els.forEach(e => io.observe(e));
}
export function initReveal() {
  observe(document);
}
