import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initProjects } from "./projects.js";
import { initSocial } from "./social.js";
import { initMagnetic } from "./magnetic.js";
import { initScrollbar } from "./scrollbar.js";
import { initCounters } from "./counters.js";
import { initParallax } from "./parallax.js";
import { initMarquee } from "./marquee.js";
import { initBackTop } from "./backtop.js";
import { initRipple } from "./ripple.js";
import { attachTilt } from "./tilt.js";
initNav(); initReveal(); initProjects(); initSocial();
initMagnetic(); initScrollbar(); initMarquee(); initCounters(); initParallax();
initBackTop(); initRipple();
document.querySelectorAll(".value-card,.timeline-card,.terminal-window").forEach(c => attachTilt(c));
if (document.startViewTransition) {
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href$=".html"]');
    if (!a || e.metaKey || e.ctrlKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    document.startViewTransition(() => { location.href = a.href; });
  });
}
