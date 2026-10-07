export function initParallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const blob = document.getElementById("heroBlob");
  const card = document.getElementById("processCard");
  const fill = document.getElementById("processFill");
  if (fill && card && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { card.style.setProperty("--fill", 1); io.disconnect(); }
    }), { threshold: .35 });
    io.observe(card);
  } else if (fill) { fill.style.transform = "scaleY(1)"; }
  if (!blob) return;
  let tick = false;
  const upd = () => {
    tick = false;
    const y = scrollY;
    if (y < innerHeight * 1.2) blob.style.transform = "translate3d(0," + (y * .08).toFixed(1) + "px,0)";
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
}
