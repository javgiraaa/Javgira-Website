export function initBackTop() {
  let btn = document.getElementById("backTop");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "backTop";
    btn.type = "button";
    btn.setAttribute("aria-label", "بازگشت به بالا");
    btn.textContent = "↑";
    document.body.appendChild(btn);
  }
  const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tick = false;
  const upd = () => {
    tick = false;
    btn.classList.toggle("show", scrollY > 600);
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
  btn.addEventListener("click", () => {
    if (reduce()) { scrollTo(0, 0); return; }
    scrollTo({ top: 0, behavior: "smooth" });
  });
}
