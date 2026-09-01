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

const ICON_MENU =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
const ICON_CLOSE =
  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

(function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
  });
  nav.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = ICON_MENU;
    })
  );
})();

(function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const company = data.get("company") || "Not provided";
    const requirement = data.get("requirement") || "Not provided";
    openWhatsApp(
      `Hello Sparkles, I would like to speak with the packaging team. Company: ${company}. Requirement: ${requirement}.`
    );
    document.querySelector("#contact-form-wrap").hidden = true;
    document.querySelector("#contact-success").hidden = false;
  });
})();

(function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html"))
      link.classList.add("is-active");
  });
})();

(function siteUpgrade() {
  const style = document.createElement("style");
  style.textContent = `
.wave-divider,.wave-divider-white{display:none!important;height:0!important;margin:0!important}
.hero-band,.inner-hero{border-radius:0!important;clip-path:none!important;mask:none!important}

.product-capability-strip{
  display:grid;grid-template-columns:repeat(4,1fr);
  max-width:900px;width:100%;margin:0 auto 40px;
  background:#0A1258;color:#fff;border-radius:20px;overflow:hidden;
  box-shadow:0 14px 32px rgba(12,22,104,.14)
}
.product-capability-strip>div{padding:18px 20px;border-right:1px solid rgba(255,255,255,.12)}
.product-capability-strip>div:last-child{border-right:0}
.product-capability-strip strong{display:block;font:800 16px Manrope,sans-serif}
.product-capability-strip span{display:block;margin-top:4px;font:500 11px Inter,sans-serif;color:rgba(255,255,255,.68)}

.product-toolbar{
  display:flex;flex-direction:column;align-items:center;gap:16px;
  width:100%;max-width:900px;margin:0 auto 36px
}
.product-search-wrap{
  position:relative;display:flex;align-items:center;
  width:100%;max-width:680px;margin:0 auto
}
.product-search-wrap>svg{position:absolute;left:16px;color:#6B5D4F;pointer-events:none}
.product-search{
  width:100%;border:1.5px solid rgba(12,22,104,.14);border-radius:999px;
  background:#fff;padding:13px 90px 13px 46px;font:500 14px Inter,sans-serif;outline:none;
  box-shadow:0 4px 16px rgba(12,22,104,.06)
}
.product-search:focus{border-color:#1B33E0;box-shadow:0 0 0 4px rgba(27,51,224,.08)}
.product-search-count{position:absolute;right:18px;font-size:11px;font-weight:700;color:#6B5D4F}

.product-filters{
  display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%
}
.product-filter{
  border:1px solid rgba(12,22,104,.14);background:#fff;color:#0C1668;
  border-radius:999px;padding:9px 14px;font:700 12px/1.2 Inter,sans-serif;cursor:pointer;
  transition:background .15s ease,color .15s ease,border-color .15s ease
}
.product-filter:hover,.product-filter.is-active{background:#0C1668;color:#fff;border-color:#0C1668}

.modern-product-card{
  position:relative;overflow:hidden;background:#fff;
  border:1px solid rgba(12,22,104,.08);border-radius:24px;
  box-shadow:0 8px 28px rgba(12,22,104,.07);
  transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease
}
.modern-product-card:hover{
  transform:translateY(-6px);
  box-shadow:0 18px 40px rgba(12,22,104,.14)
}
.modern-product-card::before{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:linear-gradient(90deg,#0C1668,#1B33E0,#F5901F);z-index:3
}
.modern-product-image{
  position:relative;aspect-ratio:3/2!important;overflow:hidden!important;background:#f4f7ff!important
}
.modern-product-image>img{
  width:100%!important;height:100%!important;object-fit:cover!important;
  object-position:center!important;display:block!important;transition:transform .5s ease
}
.modern-product-card:hover .modern-product-image>img{transform:scale(1.03)}
.modern-product-body{
  min-height:240px!important;padding:22px 22px 24px!important;
  display:flex;flex-direction:column
}
.modern-product-body h2{font-size:20px!important;margin:6px 0 10px!important;letter-spacing:-.02em}
.modern-product-body p{font-size:14px!important;color:#6B5D4F;line-height:1.55;margin:0 0 8px}
.modern-product-body .portfolio-link{
  margin-top:auto;color:#0C1668!important;font-weight:800!important;
  background:none;border:none;padding:0;cursor:pointer;font:inherit;text-align:left
}
.product-category{letter-spacing:.04em;color:#0C1668;font-size:11px;font-weight:700;text-transform:uppercase}

/* Smooth scroll fade-in — opacity only, no scale (avoids jerk) */
.modern-product-card.reveal-card{
  opacity:0;
  transform:translateY(20px);
  transition:none
}
.modern-product-card.reveal-card.is-visible{
  opacity:1;
  transform:translateY(0);
  transition:opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)
}
.modern-product-card.reveal-card.is-visible:hover{transform:translateY(-6px)}

.product-mobile-cta{display:none}

@media(max-width:860px){
  .product-capability-strip{grid-template-columns:repeat(2,1fr)}
  .product-capability-strip>div:nth-child(2){border-right:0}
  .product-capability-strip>div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.12)}
}
@media(max-width:720px){
  .container{padding-left:18px;padding-right:18px}
  .product-filters{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding:2px 2px 7px}
  .product-filters::-webkit-scrollbar{display:none}
  .product-filter{flex:0 0 auto}
  .product-capability-strip{border-radius:16px;margin-bottom:28px}
  .product-capability-strip>div{padding:14px 12px}
  .product-capability-strip strong{font-size:14px}
  .product-capability-strip span{font-size:10px}
  .modern-products-grid{grid-template-columns:1fr!important;gap:16px!important}
  .modern-product-image{aspect-ratio:16/10!important}
  .modern-product-body{min-height:200px!important;padding:18px!important}
  .modern-product-body h2{font-size:19px!important}
  .portfolio-link{width:100%;text-align:center;padding:12px!important}
  .product-mobile-cta{
    display:flex;position:fixed;left:14px;right:14px;bottom:14px;z-index:45;
    justify-content:center;background:#F5901F;color:#fff;border:0;border-radius:999px;
    padding:14px 20px;font-weight:800;font-size:15px;box-shadow:0 12px 30px rgba(12,22,104,.22)
  }
  body{padding-bottom:72px}
  .site-footer{padding-bottom:10px!important}
}
@media(prefers-reduced-motion:reduce){
  .modern-product-card,.modern-product-card.reveal-card,.modern-product-card.reveal-card.is-visible,
  .modern-product-image>img{
    transition:none!important;transform:none!important;opacity:1!important
  }
}
`;
  document.head.appendChild(style);

  const grid = document.querySelector(".modern-products-grid");
  if (!grid) return;

  const cards = [...grid.querySelectorAll(".modern-product-card")];
  cards.forEach((card, i) => {
    const frame = card.querySelector(".modern-product-image");
    if (frame && !frame.querySelector("img")) {
      const img = document.createElement("img");
      img.src = `assets/img/products/${String(i + 1).padStart(2, "0")}.jpg`;
      img.alt = card.querySelector("h2")?.textContent.trim() || "Sparkles Packaging product";
      img.width = 900;
      img.height = 600;
      img.loading = i < 2 ? "eager" : "lazy";
      img.decoding = "async";
      if (i === 0) img.fetchPriority = "high";
      frame.replaceChildren(img);
    }
    const cta = card.querySelector(".portfolio-link");
    if (cta) cta.textContent = "Get a Quote →";
    card.classList.add("reveal-card");
  });

  const heading = grid.parentElement.querySelector(".section-heading");
  if (heading) {
    const capability = document.createElement("div");
    capability.className = "product-capability-strip";
    capability.innerHTML = `
      <div><strong>16 categories</strong><span>Packaging range</span></div>
      <div><strong>Plain + printed</strong><span>Brand-ready options</span></div>
      <div><strong>Bulk orders</strong><span>MOQ guidance</span></div>
      <div><strong>Get a quote</strong><span>Fast WhatsApp route</span></div>`;
    heading.parentElement.insertBefore(capability, heading);

    const toolbar = document.createElement("div");
    toolbar.className = "product-toolbar";

    const search = document.createElement("div");
    search.className = "product-search-wrap";
    search.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>
      <input class="product-search" type="search" placeholder="Search products…" aria-label="Search products">
      <span class="product-search-count"></span>`;

    const categories = [
      "All",
      ...new Set(
        cards
          .map((c) => c.querySelector(".product-category")?.textContent.trim())
          .filter(Boolean)
      ),
    ];
    const filters = document.createElement("div");
    filters.className = "product-filters";
    filters.setAttribute("aria-label", "Product categories");
    filters.innerHTML = categories
      .map(
        (x, i) =>
          `<button type="button" class="product-filter${i === 0 ? " is-active" : ""}" data-filter="${x.replace(/"/g, "&quot;")}">${x}</button>`
      )
      .join("");

    toolbar.appendChild(search);
    toolbar.appendChild(filters);
    heading.parentElement.insertBefore(toolbar, grid);

    const apply = () => {
      const selected = filters.querySelector(".is-active")?.dataset.filter || "All";
      const q = search.querySelector("input").value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((c) => {
        const cat = c.querySelector(".product-category")?.textContent.trim() || "";
        const text = c.textContent.toLowerCase();
        const ok =
          (selected === "All" || cat === selected) && (!q || text.includes(q));
        c.hidden = !ok;
        if (ok) shown++;
      });
      search.querySelector(".product-search-count").textContent = `${shown} shown`;
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      filters.querySelectorAll("button").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      apply();
    });
    search.querySelector("input").addEventListener("input", apply);
    apply();
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.12 }
    );
    cards.forEach((c) => observer.observe(c));
  } else {
    cards.forEach((c) => c.classList.add("is-visible"));
  }

  const sticky = document.createElement("button");
  sticky.className = "product-mobile-cta";
  sticky.type = "button";
  sticky.textContent = "Get a Quote";
  sticky.setAttribute(
    "data-whatsapp",
    "Hello Sparkles, I would like a packaging quote. Product: __. Size/specification: __. Quantity: __. Delivery location: __."
  );
  document.body.appendChild(sticky);
})();
