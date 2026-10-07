export function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (header) {
    let tick = false;
    const upd = () => { header.classList.toggle("scrolled", scrollY > 12); tick = false; };
    addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }
  if (!toggle || !links) return;
  const close = () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "منو"; };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "بستن" : "منو";
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  addEventListener("resize", () => { if (innerWidth > 760) close(); });
  initScrollSpy(links);
}

function initScrollSpy(links) {
  if (!links || !("IntersectionObserver" in window)) return;
  const map = new Map();
  links.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href") || "";
    const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
    const page = (a.dataset && a.dataset.nav) || "";
    if (hash) map.set(hash, a);
    else if (page === "home" && (href.endsWith("index.html") || href === "./")) map.set("__home", a);
  });
  const setActive = key => links.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href") || "";
    const h = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
    const isHome = key === "__home" && (a.dataset.nav === "home" || href.endsWith("index.html"));
    a.classList.toggle("active", h === key || isHome);
  });
  // Highlight current page for non-hash links (e.g. projects.html)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (path === "projects.html" || document.body.dataset.page === "projects") {
    const p = links.querySelector('[data-nav="projects"]');
    if (p && !location.hash) p.classList.add("active");
  } else if (!location.hash) {
    const h = links.querySelector('[data-nav="home"]');
    if (h && document.body.dataset.page === "home") h.classList.add("active");
  }
  const secs = [...document.querySelectorAll("section[id]")];
  if (!secs.length) return;
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const id = en.target.id;
    if (map.has(id)) setActive(id);
  }), { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
  secs.forEach(s => io.observe(s));
}
