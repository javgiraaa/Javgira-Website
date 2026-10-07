import { attachTilt } from "./tilt.js";
import { observe } from "./reveal.js";
const LOADING = "در حال بارگذاری پروژه‌ها…";
const EMPTY = "به‌زودی سایت‌های تازه اینجا منتشر می‌شود.";
const LOAD_ERROR = "بارگذاری نشد. پوشه را سرو کنید (npx serve .) و تازه‌سازی کنید.";
const VISIT = "مشاهده";
async function render() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.setAttribute("aria-busy", "true");
  grid.innerHTML = '<div class="spinner" role="status" aria-label="در حال بارگذاری"></div>'
    + Array.from({ length: 6 }).map(() => '<div class="skeleton-card" aria-hidden="true">'
    + '<div class="sk title"></div><div class="sk line"></div><div class="sk line short"></div>'
    + '<div class="sk tags"><i></i><i></i><i></i></div></div>').join("");
  const t0 = performance.now();
  try {
    const res = await fetch("./data/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("load");
    const arr = await res.json();
    const wait = Math.max(0, 450 - (performance.now() - t0));
    if (wait) await new Promise(r => setTimeout(r, wait));
    if (!Array.isArray(arr) || !arr.length) { grid.innerHTML = '<p class="status-line">' + EMPTY + "</p>"; return; }
    grid.innerHTML = "";
    arr.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "project-card reveal-scale";
      card.style.setProperty("--d", Math.min(i * .08, .4) + "s");
      const h = document.createElement("h3"); h.textContent = p.name || p.id;
      const meta = document.createElement("div"); meta.className = "meta"; meta.textContent = p.meta || "";
      const d = document.createElement("p"); d.textContent = p.description || "";
      const tags = document.createElement("div"); tags.className = "tags";
      (p.tags || []).forEach(x => { const s = document.createElement("span"); s.className = "tag"; s.textContent = x; tags.appendChild(s); });
      const foot = document.createElement("div"); foot.className = "foot";
      const yr = document.createElement("span"); yr.className = "year"; yr.textContent = p.year || "";
      const a = document.createElement("a"); a.className = "visit"; a.href = p.url || "#";
      a.target = "_blank"; a.rel = "noopener noreferrer";
      a.textContent = VISIT + " ←"; a.setAttribute("aria-label", h.textContent);
      foot.append(yr, a);
      card.append(h, meta, d, tags, foot);
      grid.appendChild(card); attachTilt(card);
    });
    grid.removeAttribute("aria-busy");
    observe(grid);
  } catch { grid.innerHTML = '<p class="status-line">' + LOAD_ERROR + "</p>"; grid.removeAttribute("aria-busy"); }
}
export function initProjects() {
  if (!document.getElementById("projectGrid")) return;
  render();
}
