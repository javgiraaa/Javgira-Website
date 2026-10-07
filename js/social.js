import { attachTilt } from "./tilt.js";
import { observe } from "./reveal.js";
export const CONTACTS = {
  linkedin: { href: "https://linkedin.com/in/your-handle", label: "لینکدین", sub: "وصل شوید و پیام بدهید" },
  github: { href: "https://github.com/javgiraaa", label: "گیت‌هاب", sub: "نمونه کارها را ببینید" },
  telegram: { href: "https://t.me/S3dshots", label: "تلگرام", sub: "سریع‌ترین پاسخ" },
  phone: { href: "tel:+98 933 985 9228", display: "+98 933 985 9228", label: "تلفن", sub: "برای تماس بزنید" }
};
const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2a6 6 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.7 3.7 0 0 0-1-2.6c3-.3 6-1.4 6-6a4.6 4.6 0 0 0-1.2-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.6c0 4.6 3 5.7 6 6a3.7 3.7 0 0 0-1 2.6V22"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.9 4.6 2.7 12.1c-.8.3-.8 1.4.1 1.6l4.7 1.4 1.8 5.6c.3.8 1.3.9 1.8.2l2.6-3.1 4.9 3.6c.6.4 1.5.1 1.7-.6l2.4-14.1c.2-1-.8-1.7-1.8-1.1zM8.6 13.2l9.5-6.9c.2-.1.4.1.2.3l-7.8 7.4-.3 3-1.6-3.8z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>'
};
const ORDER = ["linkedin", "github", "telegram", "phone"];
export function initSocial() {
  const grid = document.getElementById("socialGrid");
  if (!grid) return;
  grid.innerHTML = "";
  ORDER.forEach((key, i) => {
    const c = CONTACTS[key], ext = key !== "phone";
    const a = document.createElement("a");
    a.className = "contact-card magnetic reveal-scale"; a.style.setProperty("--d", (i * .08) + "s");
    a.href = c.href;
    if (ext) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.setAttribute("aria-label", c.label + " — " + (key === "phone" ? c.display : c.sub));
    const ic = document.createElement("span"); ic.className = "icon"; ic.innerHTML = ICONS[key];
    const b = document.createElement("b"); b.textContent = c.label;
    const sm = document.createElement("small"); sm.textContent = key === "phone" ? c.display : c.sub;
    if (key === "phone") sm.dir = "ltr";
    a.append(ic, b, sm);
    grid.appendChild(a); attachTilt(a);
  });
  observe(grid);
}
