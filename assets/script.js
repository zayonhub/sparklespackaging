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

  const heading = grid.parentElement?.querySelector(".section-heading");
  if (!heading) return;

  // Remove decorative hero waves from the DOM so they cannot reappear via CSS/cache.
  document.querySelectorAll(".wave-divider, .wave-divider-white").forEach((wave) => wave.remove());

  const existingCategories = [...new Set(cards.map((card) => card.querySelector(".product-category")?.textContent.trim()).filter(Boolean))];
  const categories = ["All", ...existingCategories];

  const filters = document.createElement("div");
  filters.className = "product-filters";
  filters.setAttribute("aria-label", "Filter products");
  filters.innerHTML = categories.map((name, i) => `<button type="button" class="product-filter${i === 0 ? " is-active" : ""}" data-filter="${name.replace(/"/g, "&quot;")}">${name}</button>`).join("");
  heading.appendChild(filters);

  const searchWrap = document.createElement("div");
  searchWrap.className = "product-search-wrap";
  searchWrap.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg><input class="product-search" type="search" placeholder="Search products, bags, film, labels…" aria-label="Search products"><span class="product-search-count" aria-live="polite"></span>`;
  heading.appendChild(searchWrap);

  const capability = document.createElement("div");
  capability.className = "product-capability-strip";
  capability.innerHTML = `<div><strong>${cards.length}+</strong><span>Product categories</span></div><div><strong>Plain + printed</strong><span>Brand-ready options</span></div><div><strong>Bulk orders</strong><span>MOQ guidance</span></div><div><strong>Worldwide</strong><span>Delivery coordination</span></div>`;
  heading.insertAdjacentElement("beforebegin", capability);

  const filterCards = (selected, query = "") => {
    let visible = 0;
    const needle = query.trim().toLowerCase();
    cards.forEach((card) => {
      const category = card.querySelector(".product-category")?.textContent.trim() || "";
      const searchable = card.textContent.toLowerCase();
      const show = (selected === "All" || category === selected) && (!needle || searchable.includes(needle));
      card.hidden = !show;
      card.classList.toggle("is-visible", show);
      if (show) visible += 1;
    });
    searchWrap.querySelector(".product-search-count").textContent = `${visible} shown`;
  };

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".product-filter");
    if (!button) return;
    filters.querySelectorAll(".product-filter").forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
    filterCards(button.dataset.filter, searchWrap.querySelector(".product-search").value);
  });

  searchWrap.querySelector(".product-search").addEventListener("input", (event) => {
    const selected = filters.querySelector(".product-filter.is-active")?.dataset.filter || "All";
    filterCards(selected, event.target.value);
  });

  cards.forEach((card, index) => {
    const cta = card.querySelector(".portfolio-link");
    if (cta) cta.textContent = "Get a Quote →";
    card.classList.add("reveal-card");
    card.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
  });

  if (!("IntersectionObserver" in window)) cards.forEach((card) => card.classList.add("is-visible"));
  else {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    cards.forEach((card) => observer.observe(card));
  }

  filterCards("All");
})();

const uiStyle = document.createElement("style");
uiStyle.textContent = `
/* Clean, straight hero edges everywhere. */
.wave-divider,.wave-divider-white{display:none!important;height:0!important;margin:0!important}
.hero-band,.inner-hero{border-radius:0!important;clip-path:none!important;mask:none!important}

/* Product page catalogue controls. */
.product-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:24px auto 0;width:100%}
.product-filter{border:1px solid rgba(12,22,104,.16);background:#fff;color:#0C1668;border-radius:999px;padding:9px 15px;font:700 12px/1.2 Inter,sans-serif;cursor:pointer;transition:all .2s ease}
.product-filter:hover,.product-filter.is-active{background:#0C1668;color:#fff;border-color:#0C1668;transform:translateY(-1px)}
.product-search-wrap{position:relative;display:flex;align-items:center;max-width:680px;margin:16px auto 0}
.product-search-wrap>svg{position:absolute;left:16px;color:#6B5D4F;pointer-events:none}
.product-search{width:100%;border:1px solid rgba(12,22,104,.16);border-radius:999px;background:#fff;padding:13px 100px 13px 45px;font:500 14px Inter,sans-serif;color:#1B140E;outline:none;box-shadow:0 8px 20px rgba(12,22,104,.05)}
.product-search:focus{border-color:#1B33E0;box-shadow:0 0 0 4px rgba(27,51,224,.08)}
.product-search-count{position:absolute;right:16px;font:700 11px Inter,sans-serif;color:#6B5D4F;pointer-events:none}
.product-capability-strip{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto 38px;background:#0C1668;color:#fff;border-radius:20px;overflow:hidden;box-shadow:0 14px 32px rgba(12,22,104,.14)}
.product-capability-strip>div{padding:18px 20px;border-right:1px solid rgba(255,255,255,.12)}
.product-capability-strip>div:last-child{border-right:0}
.product-capability-strip strong{display:block;font:800 17px Manrope,sans-serif}
.product-capability-strip span{display:block;margin-top:2px;font:500 11px Inter,sans-serif;color:rgba(255,255,255,.65)}

/* Premium card treatment. */
.modern-product-card{position:relative;overflow:hidden;transition:transform .28s cubic-bezier(.2,.75,.25,1),box-shadow .28s ease,border-color .28s ease}
.modern-product-card::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:linear-gradient(90deg,#0C1668,#1B33E0,#F5901F);transform:scaleX(.25);transform-origin:left;transition:transform .3s ease;z-index:2}
.modern-product-card:hover{transform:translateY(-7px);box-shadow:0 22px 46px rgba(12,22,104,.15);border-color:rgba(27,51,224,.24)}
.modern-product-card:hover::before{transform:scaleX(1)}
.modern-product-image{position:relative}
.modern-product-image::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(12,22,104,.08));pointer-events:none}
.modern-product-body{min-height:250px;padding:25px 24px 24px}
.modern-product-body h2{font-size:24px;line-height:1.15;margin:7px 0 11px}
.modern-product-body p{color:#6B5D4F;font-size:14.5px}
.modern-product-body p+p{margin-top:10px}
.product-category{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.modern-product-body .portfolio-link{margin-top:auto;padding-top:17px;font-weight:800}
.modern-product-card[hidden]{display:none!important}
.modern-product-card.reveal-card{opacity:0;transform:translateY(22px) scale(.985)}
.modern-product-card.reveal-card.is-visible{opacity:1;transform:translateY(0) scale(1);transition:opacity .55s ease,transform .55s cubic-bezier(.2,.75,.25,1),box-shadow .28s ease,border-color .28s ease}
.modern-product-card.reveal-card.is-visible:hover{transform:translateY(-7px) scale(1)}

@media(max-width:860px){
  .product-capability-strip{grid-template-columns:repeat(2,1fr)}
  .product-capability-strip>div:nth-child(2){border-right:0}
  .product-capability-strip>div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.12)}
}
@media(max-width:720px){
  .container{padding-left:18px;padding-right:18px}
  .product-filters{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding:2px 2px 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .product-filters::-webkit-scrollbar{display:none}
  .product-filter{flex:0 0 auto;padding:9px 13px}
  .product-search-wrap{margin-top:13px}
  .product-capability-strip{border-radius:16px;margin-bottom:30px}
  .product-capability-strip>div{padding:16px 14px}
  .product-capability-strip strong{font-size:15px}
  .product-capability-strip span{font-size:10px}
  .modern-products-grid{grid-template-columns:1fr!important;gap:18px!important}
  .modern-product-image{aspect-ratio:16/10!important}
  .modern-product-body{min-height:230px;padding:21px 20px 20px}
  .modern-product-body h2{font-size:21px}
  .modern-product-body p{font-size:14px;line-height:1.55}
  .portfolio-link{width:100%;justify-content:center;text-align:center;padding:12px 14px!important}
}
@media(prefers-reduced-motion:reduce){.modern-product-card,.modern-product-card.reveal-card,.modern-product-card.reveal-card.is-visible,.product-filter{opacity:1!important;transform:none!important;transition:none!important}.modern-product-card::before{transition:none!important;transform:scaleX(1)}}
`;
document.head.appendChild(uiStyle);
