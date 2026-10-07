export function initMagnetic() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(pointer: fine)").matches) return;
  const els = document.querySelectorAll(".magnetic,.nav-links a,.contact-card");
  els.forEach(el => {
    let raf = null;
    el.addEventListener("pointermove", e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy), max = 70;
        if (d < max) {
          const k = (1 - d / max) * 4;
          el.style.transform = "translate(" + (dx / (d || 1) * k).toFixed(1) + "px," + (dy / (d || 1) * k).toFixed(1) + "px)";
        }
      });
    }, { passive: true });
    el.addEventListener("pointerleave", () => { if (raf) cancelAnimationFrame(raf); raf = null; el.style.transform = ""; });
  });
}
