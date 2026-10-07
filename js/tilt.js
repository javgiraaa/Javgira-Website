const rm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => matchMedia("(pointer: fine)").matches;
export function attachTilt(card) {
  if (rm() || !fine()) return;
  let raf = null;
  card.addEventListener("pointermove", e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = "perspective(900px) rotateY(" + (x * 4).toFixed(2) + "deg) rotateX(" + (-y * 4).toFixed(2) + "deg) translateY(-4px)";
    });
  }, { passive: true });
  card.addEventListener("pointerleave", () => { if (raf) cancelAnimationFrame(raf); raf = null; card.style.transform = ""; });
}
