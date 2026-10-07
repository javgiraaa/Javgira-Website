export function initRipple() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.addEventListener("pointerdown", e => {
    const btn = e.target.closest(".btn, .contact-card, #backTop");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 1.1;
    const s = document.createElement("span");
    s.className = "btn-ripple";
    s.style.width = s.style.height = size + "px";
    const x = (e.clientX || r.left + r.width / 2) - r.left - size / 2;
    const y = (e.clientY || r.top + r.height / 2) - r.top - size / 2;
    s.style.left = x + "px";
    s.style.top = y + "px";
    const cs = getComputedStyle(btn);
    if (cs.position === "static") btn.style.position = "relative";
    if (cs.overflow !== "hidden") btn.style.overflow = "hidden";
    btn.appendChild(s);
    s.addEventListener("animationend", () => s.remove(), { once: true });
    setTimeout(() => s.remove(), 700);
  }, { passive: true });
}

// Generic form-error helper (no form on site yet — ready for future use).
export function shakeOnError(el) {
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  el.addEventListener("animationend", () => el.classList.remove("shake"), { once: true });
}
