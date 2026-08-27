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

// UI polish: remove decorative hero waves globally and ease product/service cards into view.
(function initUiPolish() {
  const style = document.createElement("style");
  style.id = "sparkles-ui-polish";
  style.textContent = `
    /* Clean, straight hero edges across the entire site. */
    .wave-divider,
    .wave-divider-white { display:none !important; height:0 !important; margin:0 !important; }
    .hero-band,
    .inner-hero { border-radius:0 !important; clip-path:none !important; mask:none !important; }

    /* Product/service cards: polished lift + soft blue accent. */
    .modern-product-card {
      position:relative;
      transform:translateY(0);
      transition:transform .28s cubic-bezier(.2,.75,.25,1), box-shadow .28s ease, border-color .28s ease;
      will-change:transform;
    }
    .modern-product-card::before {
      content:"";
      position:absolute;
      left:0;
      right:0;
      top:0;
      height:3px;
      background:linear-gradient(90deg,#0C1668,#1B33E0,#F5901F);
      transform:scaleX(.25);
      transform-origin:left;
      transition:transform .3s ease;
      z-index:2;
    }
    .modern-product-card:hover {
      transform:translateY(-6px);
      box-shadow:0 18px 38px rgba(12,22,104,.14);
    }
    .modern-product-card:hover::before { transform:scaleX(1); }

    .modern-product-card.reveal-card {
      opacity:0;
      transform:translateY(22px) scale(.985);
    }
    .modern-product-card.reveal-card.is-visible {
      opacity:1;
      transform:translateY(0) scale(1);
      transition:opacity .55s ease, transform .55s cubic-bezier(.2,.75,.25,1), box-shadow .28s ease, border-color .28s ease;
    }
    .modern-product-card.reveal-card.is-visible:hover { transform:translateY(-6px) scale(1); }

    @media (prefers-reduced-motion: reduce) {
      .modern-product-card,
      .modern-product-card.reveal-card,
      .modern-product-card.reveal-card.is-visible { opacity:1 !important; transform:none !important; transition:none !important; }
      .modern-product-card::before { transition:none !important; transform:scaleX(1); }
    }
  `;
  document.head.appendChild(style);

  const cards = Array.from(document.querySelectorAll(".modern-products-grid .modern-product-card"));
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.classList.add("reveal-card");
    card.style.transitionDelay = `${Math.min(index * 55, 440)}ms`;
  });

  const reveal = (card) => card.classList.add("is-visible");

  if (!("IntersectionObserver" in window)) {
    cards.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      obs.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  cards.forEach((card) => observer.observe(card));
})();
