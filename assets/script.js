// Sparkles Packaging — shared site behaviour (no build step, no framework)

const WHATSAPP_NUMBER = "2348065617524";

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-whatsapp]");
  if (!trigger) return;
  event.preventDefault();
  openWhatsApp(trigger.getAttribute("data-whatsapp"));
});

(function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
  });
  nav.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = ICON_MENU;
  }));
})();

const ICON_MENU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
const ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

(function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const company = data.get("company") || "Not provided";
    const requirement = data.get("requirement") || "Not provided";
    openWhatsApp(`Hello Sparkles, I would like to speak with the packaging team. Company: ${company}. Requirement: ${requirement}.`);
    document.querySelector("#contact-form-wrap").hidden = true;
    document.querySelector("#contact-success").hidden = false;
  });
})();

(function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) link.classList.add("is-active");
  });
})();

(function initProductPage() {
  const grid = document.querySelector(".modern-products-grid");
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".modern-product-card"));
  if (!cards.length) return;

  const categories = ["All", ...new Set(cards.map((card) => card.querySelector(".product-category")?.textContent.trim()).filter(Boolean))];
  const heading = grid.parentElement?.querySelector(".section-heading");
  if (!heading || heading.querySelector(".product-filters")) return;

  const filters = document.createElement("div");
  filters.className = "product-filters";
  filters.setAttribute("aria-label", "Filter products");
  filters.innerHTML = categories.map((name, i) => `<button type="button" class="product-filter${i === 0 ? " is-active" : ""}" data-filter="${name.replace(/"/g, "&quot;")}">${name}</button>`).join("");
  heading.appendChild(filters);

  const filterCards = (selected) => {
    cards.forEach((card) => {
      const category = card.querySelector(".product-category")?.textContent.trim() || "";
      const show = selected === "All" || category === selected;
      card.hidden = !show;
      if (show) card.classList.remove("is-visible");
      requestAnimationFrame(() => { if (show) card.classList.add("is-visible"); });
    });
  };
  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".product-filter");
    if (!button) return;
    filters.querySelectorAll(".product-filter").forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
    filterCards(button.dataset.filter);
  });

  cards.forEach((card, index) => {
    const cta = card.querySelector(".portfolio-link");
    if (cta) cta.textContent = "Get a Quote →";
    card.classList.add("reveal-card");
    card.style.transitionDelay = `${Math.min(index * 55, 440)}ms`;
  });

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    obs.unobserve(entry.target);
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  cards.forEach((card) => observer.observe(card));
})();

const uiStyle = document.createElement("style");
uiStyle.textContent = `
.wave-divider,.wave-divider-white{display:none!important;height:0!important;margin:0!important}
.hero-band,.inner-hero{border-radius:0!important;clip-path:none!important;mask:none!important}
.product-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:26px auto 0;width:100%}
.product-filter{border:1px solid rgba(12,22,104,.16);background:#fff;color:#0C1668;border-radius:999px;padding:9px 15px;font:700 12px/1.2 Inter,sans-serif;cursor:pointer;transition:all .2s ease}
.product-filter:hover,.product-filter.is-active{background:#0C1668;color:#fff;border-color:#0C1668;transform:translateY(-1px)}
.modern-product-card{position:relative;overflow:hidden;transition:transform .28s cubic-bezier(.2,.75,.25,1),box-shadow .28s ease,border-color .28s ease}
.modern-product-card::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#0C1668,#1B33E0,#F5901F);transform:scaleX(.25);transform-origin:left;transition:transform .3s ease;z-index:2}
.modern-product-card:hover{transform:translateY(-6px);box-shadow:0 18px 38px rgba(12,22,104,.14)}
.modern-product-card:hover::before{transform:scaleX(1)}
.modern-product-card.reveal-card{opacity:0;transform:translateY(22px) scale(.985)}
.modern-product-card.reveal-card.is-visible{opacity:1;transform:translateY(0) scale(1);transition:opacity .55s ease,transform .55s cubic-bezier(.2,.75,.25,1),box-shadow .28s ease,border-color .28s ease}
.modern-product-card.reveal-card.is-visible:hover{transform:translateY(-6px) scale(1)}
.modern-product-card[hidden]{display:none!important}
@media(max-width:720px){
  .container{padding-left:18px;padding-right:18px}
  .product-filters{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding:2px 2px 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .product-filters::-webkit-scrollbar{display:none}
  .product-filter{flex:0 0 auto;padding:9px 13px}
  .modern-products-grid{grid-template-columns:1fr!important;gap:18px!important}
  .modern-product-image{aspect-ratio:16/10!important}
  .modern-product-body{padding:20px!important}
  .modern-product-body h2{font-size:23px!important;line-height:1.15!important}
  .modern-product-body p{font-size:14px!important;line-height:1.55!important}
  .portfolio-link{width:100%;justify-content:center;text-align:center;padding:12px 14px!important}
}
@media(min-width:721px){.modern-products-grid{align-items:stretch}.modern-product-card{height:100%}}
@media(prefers-reduced-motion:reduce){.modern-product-card,.modern-product-card.reveal-card,.modern-product-card.reveal-card.is-visible{opacity:1!important;transform:none!important;transition:none!important}.modern-product-card::before{transition:none!important;transform:scaleX(1)}}
`;
document.head.appendChild(uiStyle);
