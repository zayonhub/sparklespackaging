/* Sparkles Packaging — shared site behaviour
 * No framework. No build step. One small, maintainable site script.
 */

const WHATSAPP_NUMBER = '2348065617524';
const PRIMARY_NAV = [['index.html','Home'],['products.html','Products'],['services.html','Services'],['about.html','About'],['contact.html','Contact']];
const ICON_MENU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
const ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

function openWhatsApp(message){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');}
function currentPage(){return window.location.pathname.split('/').pop()||'index.html';}

function initNavigation(){
  document.querySelectorAll('.main-nav').forEach(nav=>{
    const mobileCta=nav.querySelector('.mobile-only');
    nav.querySelectorAll('.nav-link').forEach(link=>link.remove());
    const fragment=document.createDocumentFragment();
    PRIMARY_NAV.forEach(([href,label])=>{const link=document.createElement('a');link.className='nav-link';link.href=href;link.textContent=label;if(href===currentPage())link.classList.add('is-active');fragment.appendChild(link);});
    nav.insertBefore(fragment,mobileCta||null);
  });

  document.querySelectorAll('.site-footer').forEach(footer=>{
    const label=[...footer.querySelectorAll('.footer-label')].find(el=>el.textContent.trim().toLowerCase()==='explore');
    const column=label?.parentElement;if(!column)return;
    column.querySelectorAll('a:not(.footer-brand)').forEach(link=>link.remove());
    PRIMARY_NAV.forEach(([href,text])=>{const link=document.createElement('a');link.href=href;link.textContent=text;column.appendChild(link);});
  });

  document.querySelectorAll('.nav-inner').forEach(header=>{
    const toggle=header.querySelector('.menu-toggle'),nav=header.querySelector('.main-nav');
    if(!toggle||!nav||toggle.dataset.bound)return;
    toggle.dataset.bound='true';
    toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.innerHTML=open?ICON_CLOSE:ICON_MENU;});
    nav.addEventListener('click',event=>{if(!event.target.closest('.nav-link'))return;nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.innerHTML=ICON_MENU;});
  });
}

function initWhatsApp(){document.addEventListener('click',event=>{const trigger=event.target.closest('[data-whatsapp]');if(!trigger)return;event.preventDefault();openWhatsApp(trigger.getAttribute('data-whatsapp')||'Hello Sparkles, I would like a packaging quote.');});}
function initContactForm(){const form=document.querySelector('#contact-form');if(!form)return;form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);openWhatsApp(`Hello Sparkles, I would like to speak with the packaging team. Company: ${data.get('company')||'Not provided'}. Requirement: ${data.get('requirement')||'Not provided'}.`);document.querySelector('#contact-form-wrap')?.setAttribute('hidden','');document.querySelector('#contact-success')?.removeAttribute('hidden');});}

function initProducts(){
  const grid=document.querySelector('.modern-products-grid');if(!grid)return;
  const cards=[...grid.querySelectorAll('.modern-product-card')];
  cards.forEach((card,index)=>{const frame=card.querySelector('.modern-product-image');if(frame){const image=document.createElement('img');image.src=`assets/img/products/${String(index+1).padStart(2,'0')}.jpg`;image.alt=card.querySelector('h2')?.textContent.trim()||'Sparkles Packaging product';image.width=900;image.height=600;image.loading=index<2?'eager':'lazy';image.decoding='async';frame.replaceChildren(image);}const cta=card.querySelector('.portfolio-link');if(cta)cta.textContent='Get a Quote →';});
  const heading=grid.parentElement?.querySelector('.section-heading');if(!heading||heading.querySelector('.product-search-wrap'))return;
  const capability=document.createElement('div');capability.className='product-capability-strip';capability.innerHTML='<div><strong>16+ categories</strong><span>Packaging range</span></div><div><strong>Plain + printed</strong><span>Brand-ready options</span></div><div><strong>Bulk supply</strong><span>Commercial quantities</span></div><div><strong>WhatsApp quotes</strong><span>Fast enquiry route</span></div>';heading.parentElement.insertBefore(capability,heading);
  const searchWrap=document.createElement('div');searchWrap.className='product-search-wrap';searchWrap.innerHTML='<input class="product-search" type="search" placeholder="Search products…" aria-label="Search products"><span class="product-search-count"></span>';heading.appendChild(searchWrap);
  const categories=['All',...new Set(cards.map(card=>card.querySelector('.product-category')?.textContent.trim()).filter(Boolean))];
  const filters=document.createElement('div');filters.className='product-filters';filters.setAttribute('aria-label','Product categories');filters.innerHTML=categories.map((category,index)=>`<button type="button" class="product-filter${index===0?' is-active':''}" data-filter="${category.replace(/"/g,'&quot;')}">${category}</button>`).join('');heading.appendChild(filters);
  const apply=()=>{const selected=filters.querySelector('.is-active')?.dataset.filter||'All',query=searchWrap.querySelector('input').value.trim().toLowerCase();let shown=0;cards.forEach(card=>{const category=card.querySelector('.product-category')?.textContent.trim()||'',visible=(selected==='All'||category===selected)&&(!query||card.textContent.toLowerCase().includes(query));card.hidden=!visible;if(visible)shown++;});searchWrap.querySelector('.product-search-count').textContent=`${shown} shown`;};
  filters.addEventListener('click',event=>{const button=event.target.closest('.product-filter');if(!button)return;filters.querySelectorAll('.product-filter').forEach(item=>item.classList.remove('is-active'));button.classList.add('is-active');apply();});
  searchWrap.querySelector('input').addEventListener('input',apply);apply();
  const mobileCta=document.createElement('button');mobileCta.className='product-mobile-cta';mobileCta.type='button';mobileCta.textContent='Get a Packaging Quote';mobileCta.setAttribute('data-whatsapp','Hello Sparkles, I would like a packaging quote. Product: __. Size/specification: __. Quantity: __. Delivery location: __.');document.body.appendChild(mobileCta);
}

function initHomepage(){
  if(!document.querySelector('.hero-band'))return;
  const copy=document.querySelector('.home-hero-copy');
  if(copy){const heading=copy.querySelector('h1'),lede=copy.querySelector('.hero-lede'),proof=copy.querySelector('.home-hero-proof'),primary=copy.querySelector('.button-primary'),secondary=copy.querySelector('.button-quiet');if(heading)heading.innerHTML='Packaging that protects your product — <span class="signal-word" style="color:#F5901F">and sells your brand.</span>';if(lede)lede.textContent='From woven and laminated sacks to nylon bags, pouches, flexible film, labels and custom packaging, Sparkles helps businesses source, brand and move the packaging they need.';if(proof)proof.innerHTML='<strong>Plain or printed.</strong> Commercial quantities. Clear specifications. Reliable packaging support from order to delivery.';if(primary){primary.innerHTML='Get a Packaging Quote <span style="margin-left:8px">→</span>';primary.setAttribute('data-whatsapp','Hello Sparkles, I would like a packaging quote. Product: __. Size/specification: __. Quantity: __. Delivery location: __.');}if(secondary){secondary.textContent='Explore Products →';secondary.href='products.html';}}
  const trust=document.querySelector('.home-trust-strip');if(trust){[['16+','Packaging categories'],['Plain + printed','Custom branding'],['Bulk supply','Commercial quantities'],['Nigeria + beyond','Delivery coordination']].forEach((value,index)=>{const item=trust.querySelectorAll('.home-trust-grid > div')[index];if(item){item.querySelector('strong').textContent=value[0];item.querySelector('span').textContent=value[1];}});}
  document.querySelectorAll('.home-video-mosaic .video-tile').forEach((tile,index)=>tile.classList.toggle('is-supporting-video',index>0));
}

function addPolish(){const style=document.createElement('style');style.textContent=`
.home-video-mosaic .video-primary{min-height:clamp(420px,58vw,680px)}.home-video-mosaic .video-primary video{width:100%;height:100%;min-height:inherit;object-fit:cover}.home-video-mosaic .video-stack{display:grid;grid-template-rows:1fr 1fr;gap:14px}.product-capability-strip{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto 32px;background:#0C1668;color:#fff;border-radius:20px;overflow:hidden;box-shadow:0 14px 32px rgba(12,22,104,.14)}.product-capability-strip>div{padding:17px 19px;border-right:1px solid rgba(255,255,255,.12)}.product-capability-strip>div:last-child{border-right:0}.product-capability-strip strong{display:block;font:800 15px Manrope,sans-serif}.product-capability-strip span{display:block;margin-top:4px;font:500 11px Inter,sans-serif;color:rgba(255,255,255,.7)}.product-search-wrap{position:relative;max-width:680px;margin:14px auto 0}.product-search{width:100%;box-sizing:border-box;border:1px solid rgba(12,22,104,.16);border-radius:999px;background:#fff;padding:13px 90px 13px 18px;font:500 14px Inter,sans-serif;outline:none}.product-search:focus{border-color:#1B33E0;box-shadow:0 0 0 4px rgba(27,51,224,.08)}.product-search-count{position:absolute;right:18px;top:50%;transform:translateY(-50%);font:700 11px Inter,sans-serif;color:#6B5D4F}.product-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:14px auto 4px}.product-filter{border:1px solid rgba(12,22,104,.16);background:#fff;color:#0C1668;border-radius:999px;padding:9px 14px;font:700 12px/1.2 Inter,sans-serif;cursor:pointer}.product-filter:hover,.product-filter.is-active{background:#0C1668;color:#fff;border-color:#0C1668}.modern-product-image{aspect-ratio:3/2!important;overflow:hidden!important;background:#f4f7ff!important}.modern-product-image img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important}.product-mobile-cta{display:none}
@media(max-width:860px){.product-capability-strip{grid-template-columns:repeat(2,1fr)}.product-capability-strip>div:nth-child(2){border-right:0}}
@media(max-width:720px){.home-video-mosaic .video-primary{min-height:360px}.home-video-mosaic .video-stack{display:none}.product-filters{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding:3px 2px 8px}.product-filters::-webkit-scrollbar{display:none}.product-filter{flex:0 0 auto}.product-mobile-cta{display:flex;position:fixed;left:14px;right:14px;bottom:14px;z-index:45;justify-content:center;background:#F5901F;color:#fff;border:0;border-radius:999px;padding:14px 20px;font-weight:800;font-size:15px;box-shadow:0 12px 30px rgba(12,22,104,.22)}body{padding-bottom:72px}.site-footer{padding-bottom:10px!important}}
@media(prefers-reduced-motion:reduce){.modern-product-card{transition:none!important}}
`;document.head.appendChild(style);}

function init(){initNavigation();initWhatsApp();initContactForm();initProducts();initHomepage();addPolish();}
document.addEventListener('DOMContentLoaded',init);
