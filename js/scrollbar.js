export function initScrollbar() {
  const bar = document.getElementById("progressBar");
  const dots = document.getElementById("sectionDots");
  let tick = false;
  const upd = () => {
    tick = false;
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    if (dots) {
      const secs = [...document.querySelectorAll("[data-dot]")];
      let cur = "";
      secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .5) cur = s.dataset.dot; });
      dots.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.dataset.sec === cur));
    }
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener("resize", upd);
  upd();
  if (dots) {
    const secs = document.querySelectorAll("[data-dot]");
    dots.innerHTML = "";
    secs.forEach(s => {
      const a = document.createElement("a");
      a.href = "#" + s.id; a.dataset.sec = s.dataset.dot;
      a.setAttribute("aria-label", s.id);
      dots.appendChild(a);
    });
    upd();
  }
}
