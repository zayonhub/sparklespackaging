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

// mobile nav toggle
(function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? ICON_CLOSE : ICON_MENU;
  });
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = ICON_MENU;
    });
  });
})();

const ICON_MENU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
const ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

// contact form -> whatsapp handoff
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

// mark active nav link
(function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });
})();

// Product-page upgrade + global hero cleanup.
(function initUiPolish() {
  const style = document.createElement("style");
  style.id = "sparkles-ui-polish";
  style.textContent = `
    /* Remove decorative hero waves from the rendered UI everywhere. */
    .wave-divider,
    .wave-divider-white { display:none !important; height:0 !important; margin:0 !important; }
    .hero-band,
    .inner-hero { border-radius:0 !important; clip-path:none !important; mask:none !important; }

    /* Refined product cards. */
    .modern-product-card {
      position:relative;
      overflow:hidden;
      transform:translateY(0);
      transition:transform .28s cubic-bezier(.2,.75,.25,1), box-shadow .28s ease, border-color .28s ease;
      will-change:transform;
    }
    .modern-product-card::before {
      content:"";
      position:absolute;
      left:0; right:0; top:0; height:3px;
      background:linear-gradient(90deg,#0C1668,#1B33E0,#F5901F);
      transform:scaleX(.22);
      transform-origin:left;
      transition:transform .3s ease;
      z-index:3;
    }
    .modern-product-card:hover {
      transform:translateY(-7px);
      box-shadow:0 22px 46px rgba(12,22,104,.15);
      border-color:rgba(27,51,224,.24);
    }
    .modern-product-card:hover::before { transform:scaleX(1); }
    .modern-product-image { position:relative; background:#fff; }
    .modern-product-image::after {
      content:"";
      position:absolute; inset:0;
      background:linear-gradient(180deg,transparent 55%,rgba(12,22,104,.08));
      pointer-events:none;
    }
    .modern-product-body { min-height:250px; padding:25px 24px 24px; }
    .modern-product-body h2 { font-size:24px; line-height:1.15; margin:7px 0 11px; }
    .modern-product-body p { color:#6B5D4F; font-size:14.5px; }
    .modern-product-body p + p { margin-top:10px; }
    .product-category { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; }
    .modern-product-body .portfolio-link { margin-top:auto; padding-top:17px; font-weight:800; }

    /* Product catalogue toolbar. */
    .product-catalog-tools {
      margin:0 auto 44px;
      padding:22px;
      border:1px solid rgba(27,20,14,.1);
      border-radius:22px;
      background:linear-gradient(135deg,#fff 0%,#fffaf0 100%);
      box-shadow:0 12px 30px rgba(27,20,14,.06);
    }
    .product-tools-top { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-bottom:18px; }
    .product-tools-title { font-family:var(--display); font-weight:800; font-size:18px; }
    .product-tools-count { font-size:12.5px; font-weight:700; color:var(--ink-soft); white-space:nowrap; }
    .product-search-wrap { position:relative; margin-bottom:17px; }
    .product-search-wrap svg { position:absolute; left:16px; top:50%; transform:translateY(-50%); color:var(--ink-soft); pointer-events:none; }
    .product-search {
      width:100%; border:1.5px solid rgba(27,20,14,.12); border-radius:999px; background:#fff;
      padding:13px 18px 13px 45px; font:500 14px var(--body); color:var(--ink); outline:none;
    }
    .product-search:focus { border-color:var(--blue); box-shadow:0 0 0 4px rgba(27,51,224,.08); }
    .product-filter-row { display:flex; flex-wrap:wrap; gap:9px; }
    .product-filter {
      border:1px solid rgba(27,20,14,.12); background:#fff; color:var(--ink-soft);
      border-radius:999px; padding:9px 14px; font:700 12.5px var(--body); transition:all .18s ease;
    }
    .product-filter:hover { border-color:var(--blue); color:var(--blue-deep); transform:translateY(-1px); }
    .product-filter.is-active { background:var(--blue-deep); color:#fff; border-color:var(--blue-deep); }
    .product-empty { display:none; text-align:center; padding:50px 20px; border:1px dashed rgba(27,20,14,.18); border-radius:20px; color:var(--ink-soft); }
    .product-empty.is-visible { display:block; }
    .product-empty strong { display:block; color:var(--ink); font-family:var(--display); font-size:20px; margin-bottom:6px; }

    /* Product proof strip. */
    .product-proof-strip { background:var(--blue-deep); color:#fff; }
    .product-proof-grid { display:grid; grid-template-columns:repeat(4,1fr); }
    .product-proof-item { padding:23px 22px; border-right:1px solid rgba(255,255,255,.12); }
    .product-proof-item:last-child { border-right:0; }
    .product-proof-item strong { display:block; font:800 18px var(--display); }
    .product-proof-item span { display:block; margin-top:3px; font-size:12px; color:rgba(255,255,255,.65); }

    .modern-product-card.is-filtered-out { display:none; }
    .modern-product-card.reveal-card { opacity:0; transform:translateY(22px) scale(.985); }
    .modern-product-card.reveal-card.is-visible { opacity:1; transform:translateY(0) scale(1); transition:opacity .55s ease, transform .55s cubic-bezier(.2,.75,.25,1), box-shadow .28s ease, border-color .28s ease; }
    .modern-product-card.reveal-card.is-visible:hover { transform:translateY(-7px) scale(1); }

    @media (max-width:860px) {
      .product-proof-grid { grid-template-columns:repeat(2,1fr); }
      .product-proof-item:nth-child(2) { border-right:0; }
      .product-proof-item:nth-child(-n+2) { border-bottom:1px solid rgba(255,255,255,.12); }
    }
    @media (max-width:600px) {
      .product-catalog-tools { padding:17px; border-radius:18px; margin-bottom:32px; }
      .product-tools-top { align-items:flex-start; flex-direction:column; gap:5px; }
      .product-filter-row { flex-wrap:nowrap; overflow-x:auto; padding-bottom:4px; scrollbar-width:none; }
      .product-filter-row::-webkit-scrollbar { display:none; }
      .product-filter { flex:0 0 auto; }
      .product-proof-grid { grid-template-columns:1fr 1fr; }
      .product-proof-item { padding:18px 15px; }
      .product-proof-item strong { font-size:16px; }
      .product-proof-item span { font-size:11px; }
      .modern-product-body { min-height:230px; padding:21px 20px 20px; }
      .modern-product-body h2 { font-size:21px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .modern-product-card,
      .modern-product-card.reveal-card,
      .modern-product-card.reveal-card.is-visible,
      .product-filter { opacity:1 !important; transform:none !important; transition:none !important; }
      .modern-product-card::before { transition:none !important; transform:scaleX(1); }
    }
  `;
  document.head.appendChild(style);

  // Remove the actual decorative wave nodes from the DOM, not just visually hide them.
  document.querySelectorAll(".wave-divider, .wave-divider-white").forEach((wave) => wave.remove());

  const cards = Array.from(document.querySelectorAll(".modern-products-grid .modern-product-card"));
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.classList.add("reveal-card");
    card.style.transitionDelay = `${Math.min(index * 45, 360)}ms`;
  });

  const reveal = (card) => card.classList.add("is-visible");
  if (!("IntersectionObserver" in window)) cards.forEach(reveal);
  else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        obs.unobserve(entry.target);
      });
    }, { rootMargin:"0px 0px -8% 0px", threshold:0.08 });
    cards.forEach((card) => observer.observe(card));
  }

  // Only add the catalogue controls on the Products page.
  const showcase = document.querySelector(".products-showcase");
  const grid = document.querySelector(".modern-products-grid");
  if (!showcase || !grid) return;

  const tools = document.createElement("div");
  tools.className = "product-catalog-tools";
  tools.innerHTML = `
    <div class="product-tools-top">
      <div class="product-tools-title">Find the right packaging</div>
      <div class="product-tools-count" aria-live="polite"></div>
    </div>
    <div class="product-search-wrap">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>
      <input class="product-search" type="search" placeholder="Search products, bags, film, labels…" aria-label="Search products">
    </div>
    <div class="product-filter-row" role="group" aria-label="Filter products">
      <button class="product-filter is-active" type="button" data-filter="all">All products</button>
      <button class="product-filter" type="button" data-filter="sacks">Sacks &amp; bulk</button>
      <button class="product-filter" type="button" data-filter="nylon">Nylon &amp; bags</button>
      <button class="product-filter" type="button" data-filter="film">Film &amp; flexible</button>
      <button class="product-filter" type="button" data-filter="branding">Labels &amp; branding</button>
      <button class="product-filter" type="button" data-filter="protection">Protection &amp; shipping</button>
      <button class="product-filter" type="button" data-filter="custom">Custom</button>
    </div>`;

  const heading = showcase.querySelector(".section-heading");
  if (heading) heading.insertAdjacentElement("afterend", tools);
  else showcase.querySelector(".container")?.prepend(tools);

  const empty = document.createElement("div");
  empty.className = "product-empty";
  empty.innerHTML = `<strong>No matching products</strong><span>Try another search or choose a different category.</span>`;
  grid.insertAdjacentElement("afterend", empty);

  // Add a concise proof strip above the catalogue.
  const proof = document.createElement("section");
  proof.className = "product-proof-strip";
  proof.setAttribute("aria-label", "Sparkles product capabilities");
  proof.innerHTML = `<div class="container product-proof-grid">
    <div class="product-proof-item"><strong>16+ categories</strong><span>Packaging options</span></div>
    <div class="product-proof-item"><strong>Plain + printed</strong><span>Brand-ready supply</span></div>
    <div class="product-proof-item"><strong>Bulk orders</strong><span>MOQ guidance</span></div>
    <div class="product-proof-item"><strong>Worldwide</strong><span>Delivery coordination</span></div>
  </div>`;
  showcase.parentNode.insertBefore(proof, showcase);

  const count = tools.querySelector(".product-tools-count");
  const search = tools.querySelector(".product-search");
  const filters = Array.from(tools.querySelectorAll(".product-filter"));
  let activeFilter = "all";

  function groupForCard(card) {
    const text = (card.querySelector(".product-category")?.textContent || "").toLowerCase();
    const title = (card.querySelector("h2")?.textContent || "").toLowerCase();
    const combined = `${text} ${title}`;
    if (/woven|laminated|bulk/.test(combined)) return "sacks";
    if (/water|nylon|pouch|carrier|singlet|ziplock/.test(combined)) return "nylon";
    if (/film|bopp|flexible/.test(combined)) return "film";
    if (/label|sticker|seal|branding/.test(combined)) return "branding";
    if (/courier|stretch|bubble|tissue|shipping|protection/.test(combined)) return "protection";
    if (/custom|sourcing/.test(combined)) return "custom";
    return "custom";
  }

  cards.forEach((card) => { card.dataset.productGroup = groupForCard(card); });

  function applyFilters() {
    const query = (search.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const haystack = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === "all" || card.dataset.productGroup === activeFilter;
      const matchesSearch = !query || haystack.includes(query);
      const show = matchesFilter && matchesSearch;
      card.classList.toggle("is-filtered-out", !show);
      if (show) visible += 1;
    });
    count.textContent = `${visible} product${visible === 1 ? "" : "s"} shown`;
    empty.classList.toggle("is-visible", visible === 0);
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => item.classList.toggle("is-active", item === button));
      applyFilters();
    });
  });
  search.addEventListener("input", applyFilters);
  applyFilters();
})();
