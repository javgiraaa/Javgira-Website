export function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { track.style.animation = "none"; return; }
  let last = scrollY, tick = false;
  addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      tick = false;
      const y = scrollY, dir = y > last ? 1 : -1; last = y;
      track.style.animationDirection = dir >= 0 ? "normal" : "reverse";
    });
  }, { passive: true });
}
