/* =========================================================
   NOVA STORE — script.js
   All interactions are simulated client-side. No backend.
   ========================================================= */
(function(){
  'use strict';

  /* ---------- PRODUCT DATA ---------- */
  const PRODUCTS = [
    { id:'p1',  name:'Aria Wireless Headset',      cat:'Electronics', price:189.00, old:229.00, rating:4.8, reviews:342, img:'https://picsum.photos/id/96/500/500',  desc:'Active noise cancellation, 40-hour battery, and a fold-flat frame that actually survives a backpack.' },
    { id:'p2',  name:'Pulse Mechanical Keyboard',  cat:'Electronics', price:129.00, old:null,   rating:4.6, reviews:210, img:'https://picsum.photos/id/0/500/500',   desc:'Hot-swappable switches, PBT keycaps, and a soft-touch aluminum deck for quiet, precise typing.' },
    { id:'p3',  name:'Orbit Smartwatch',           cat:'Electronics', price:249.00, old:299.00, rating:4.7, reviews:518, img:'https://picsum.photos/id/160/500/500', desc:'Seven-day battery, always-on display, and sleep tracking that doesn\'t need a PhD to read.' },
    { id:'p4',  name:'Halo Desk Lamp',             cat:'Home',        price:64.00,  old:null,   rating:4.5, reviews:96,  img:'https://picsum.photos/id/1078/500/500',desc:'Warm-to-cool dimming with a weighted base that won\'t tip when your cat inevitably jumps up.' },
    { id:'p5',  name:'Nimbus Gaming Mouse',        cat:'Gaming',      price:79.00,  old:99.00,  rating:4.9, reviews:684, img:'https://picsum.photos/id/367/500/500', desc:'26,000 DPI sensor, 58g body, and a paracord cable that glides instead of drags.' },
    { id:'p6',  name:'Vertex Gaming Chair',        cat:'Gaming',      price:349.00, old:null,   rating:4.4, reviews:152, img:'https://picsum.photos/id/1060/500/500',desc:'4D armrests and a lumbar system built for eight-hour raid nights.' },
    { id:'p7',  name:'Drift Canvas Sneakers',      cat:'Fashion',     price:98.00,  old:130.00, rating:4.6, reviews:401, img:'https://picsum.photos/id/103/500/500', desc:'A minimal silhouette in brushed canvas, built on a recycled-rubber sole.' },
    { id:'p8',  name:'Linen Overshirt',            cat:'Fashion',     price:74.00,  old:null,   rating:4.5, reviews:88,  img:'https://picsum.photos/id/1074/500/500',desc:'Stonewashed European linen, cut for layering in every season but deep winter.' },
    { id:'p9',  name:'Studio Ceramic Vase Set',    cat:'Home',        price:56.00,  old:null,   rating:4.7, reviews:143, img:'https://picsum.photos/id/1080/500/500',desc:'Three hand-finished vessels in a matte glaze, each one slightly, deliberately imperfect.' },
    { id:'p10', name:'Wanderer Leather Backpack',  cat:'Accessories', price:159.00, old:189.00, rating:4.8, reviews:276, img:'https://picsum.photos/id/21/500/500',  desc:'Full-grain leather that ages into something better, with a padded 15" laptop sleeve.' },
    { id:'p11', name:'Aura Scented Candle Trio',   cat:'Lifestyle',   price:42.00,  old:null,   rating:4.6, reviews:229, img:'https://picsum.photos/id/117/500/500', desc:'Cedar, fig, and sea salt — soy wax, cotton wick, forty-hour burn each.' },
    { id:'p12', name:'Trailhead Insulated Bottle', cat:'Lifestyle',   price:34.00,  old:44.00,  rating:4.9, reviews:512, img:'https://picsum.photos/id/225/500/500', desc:'Keeps cold 24 hours, hot 12. The lid doubles as a cup, because it should.' },
    { id:'p13', name:'Cadence Bluetooth Speaker',  cat:'Electronics', price:89.00,  old:null,   rating:4.5, reviews:167, img:'https://picsum.photos/id/250/500/500', desc:'Room-filling sound from something the size of a soda can, rated IP67.' },
    { id:'p14', name:'Flux Mechanical Controller', cat:'Gaming',      price:69.00,  old:89.00,  rating:4.7, reviews:203, img:'https://picsum.photos/id/48/500/500',  desc:'Hall-effect sticks that won\'t drift, with swappable back paddles.' },
    { id:'p15', name:'Sable Wool Scarf',           cat:'Accessories', price:48.00,  old:null,   rating:4.4, reviews:71,  img:'https://picsum.photos/id/338/500/500', desc:'Merino wool, woven in a small mill that\'s been at it since 1974.' },
    { id:'p16', name:'Meridian Table Clock',       cat:'Home',        price:52.00,  old:null,   rating:4.6, reviews:59,  img:'https://picsum.photos/id/431/500/500', desc:'A silent sweep movement in a solid walnut case, no ticking, ever.' }
  ];

  const TESTIMONIALS = [
    { name:'Priya Nair',       country:'Singapore',  img:'https://picsum.photos/id/64/100/100',  text:'The Aria headset is the first pair I\'ve kept past the return window in years. Genuinely quiet, genuinely comfortable.' },
    { name:'Marcus Webb',      country:'United States', img:'https://picsum.photos/id/91/100/100', text:'Ordered Thursday, wearing the sneakers Saturday. Sizing chart was spot on, which almost never happens online.' },
    { name:'Elena Rossi',      country:'Italy', img:'https://picsum.photos/id/65/100/100', text:'Returned one lamp because the finish wasn\'t what I expected — got a refund in three days, no argument, no forms.' },
    { name:'Kenji Watanabe',   country:'Japan', img:'https://picsum.photos/id/177/100/100', text:'The gaming chair assembly took twenty minutes and my back has genuinely thanked me every day since.' },
    { name:'Amara Okafor',     country:'Nigeria', img:'https://picsum.photos/id/338/100/100', text:'Support answered a 1am question about my order in under ten minutes. That alone earned my next three purchases.' },
    { name:'Sofia Martins',    country:'Brazil', img:'https://picsum.photos/id/342/100/100', text:'The candle trio smells expensive without being overpowering — my whole apartment finally smells like one thing.' }
  ];

  const FAQS = [
    { q:'How long does shipping take?', a:'Standard shipping arrives in 3–5 business days; express arrives in 1–2. Orders placed before 2pm ship the same day.' },
    { q:'What is your return policy?', a:'You have 30 days from delivery to return any unused item in its original packaging for a full refund.' },
    { q:'Do you ship internationally?', a:'Yes, we ship to over 40 countries. Duties and taxes are calculated at checkout, so there are no surprises on delivery.' },
    { q:'Can I change or cancel my order?', a:'Orders can be changed or cancelled within 1 hour of placing them. After that, our fulfillment team has already started packing.' },
    { q:'Is my payment information secure?', a:'Yes. All payments are processed through an encrypted, PCI-compliant gateway — we never store your full card number.' },
    { q:'Do you offer gift wrapping?', a:'Yes, add gift wrapping at checkout for $4.00, including a handwritten note card.' },
    { q:'How do I track my order?', a:'You\'ll receive a tracking link by email the moment your order ships, and can also check status anytime under My Orders.' },
    { q:'What if an item arrives damaged?', a:'Email us a photo within 48 hours of delivery and we\'ll send a free replacement or refund — no return shipping required.' }
  ];

  const state = {
    cart: JSON.parse(localStorage.getItem('nova_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('nova_wishlist') || '[]'),
    coupon: null,
    shipping: 0,
    activeFilter: 'All',
    searchTerm: ''
  };

  /* Declared here (before first use) to avoid a temporal-dead-zone
     ReferenceError: observeReveal() is called during initial render,
     long before this line used to appear further down the file. */
  let revealObserver;

  /* ---------- UTIL ---------- */
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const money = n => '$' + n.toFixed(2);
  const stars = r => {
    const full = Math.floor(r);
    const half = r % 1 >= 0.4;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(Math.max(0,5 - full - (half?1:0)));
  };
  const findProduct = id => PRODUCTS.find(p => p.id === id);

  function toast(msg, icon='fa-circle-check'){
    const stack = $('#toastStack');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>`;
    stack.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('show'));
    setTimeout(()=>{
      el.classList.remove('show');
      setTimeout(()=> el.remove(), 400);
    }, 3200);
  }

  /* ---------- LOADER ---------- */
  window.addEventListener('load', () => {
    setTimeout(()=> $('#loader').classList.add('hidden'), 500);
  });

  /* ---------- YEAR ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- HEADER SCROLL + NAV ---------- */
  const header = $('#siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
    $('#backToTop').classList.toggle('show', window.scrollY > 500);
  });

  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  $('#backToTop').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ---------- STICKY MOBILE CTA ---------- */
  const stickyCta = $('#stickyCta');
  window.addEventListener('scroll', () => {
    stickyCta.classList.toggle('show', window.scrollY > 700 && window.innerWidth <= 900);
  });

  /* ---------- CHAT FAB ---------- */
  $('#chatFab').addEventListener('click', () => toast('Live chat would open here — this is a static demo.', 'fa-comment-dots'));

  /* ---------- DARK MODE ---------- */
  const darkToggle = $('#darkModeToggle');
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    darkToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('nova_theme', theme);
  }
  applyTheme(localStorage.getItem('nova_theme') || 'light');
  darkToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });

  /* ---------- COOKIE BANNER ---------- */
  const cookieBanner = $('#cookieBanner');
  if (!localStorage.getItem('nova_cookie_choice')){
    setTimeout(()=> cookieBanner.classList.add('show'), 1200);
  }
  $('#cookieAccept').addEventListener('click', () => {
    localStorage.setItem('nova_cookie_choice', 'accepted');
    cookieBanner.classList.remove('show');
  });
  $('#cookieDecline').addEventListener('click', () => {
    localStorage.setItem('nova_cookie_choice', 'declined');
    cookieBanner.classList.remove('show');
  });

  /* ---------- RIPPLE EFFECT ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    btn.classList.remove('rippling');
    void btn.offsetWidth;
    btn.classList.add('rippling');
  });

  /* ---------- BUILD PRODUCT CARD ---------- */
  function buildCard(p){
    const isWished = state.wishlist.includes(p.id);
    return `
    <div class="product-card reveal in-view" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name.toLowerCase()}">
      <div class="product-media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" width="500" height="500">
        ${p.old ? `<span class="product-badge">-${Math.round(100 - (p.price/p.old*100))}%</span>` : ''}
        <button class="fav-btn ${isWished ? 'active':''}" data-fav="${p.id}" aria-label="Add to wishlist">
          <i class="fa-${isWished ? 'solid':'regular'} fa-heart"></i>
        </button>
        <button class="btn btn-primary btn-sm quick-view-btn" data-quickview="${p.id}">Quick View</button>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.cat}</span>
        <span class="product-name">${p.name}</span>
        <div class="product-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</div>
        <div class="product-price-row">
          <span class="price">${money(p.price)}</span>
          ${p.old ? `<span class="price-old">${money(p.old)}</span>` : ''}
        </div>
        <button class="btn btn-outline add-cart-btn" data-add="${p.id}"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
      </div>
    </div>`;
  }

  function renderGrid(){
    const grid = $('#productGrid');
    const term = state.searchTerm.trim().toLowerCase();
    const filtered = PRODUCTS.filter(p =>
      (state.activeFilter === 'All' || p.cat === state.activeFilter) &&
      (!term || p.name.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term))
    );
    grid.innerHTML = filtered.length
      ? filtered.map(buildCard).join('')
      : `<div class="empty-state" style="grid-column:1/-1;"><i class="fa-solid fa-box-open"></i><p>No products match "${state.searchTerm}". Try a different search.</p></div>`;
  }

  function renderCarousel(){
    const track = $('#carouselTrack');
    const trending = [...PRODUCTS].slice(4, 13);
    track.innerHTML = trending.map(buildCard).join('');
  }

  function renderTestimonials(){
    $('#testimonialGrid').innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card reveal">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-person">
          <img src="${t.img}" alt="${t.name}" loading="lazy" width="44" height="44">
          <div><strong>${t.name}</strong><span>${t.country}</span></div>
        </div>
      </div>`).join('');
  }

  function renderFaq(){
    $('#faqAccordion').innerHTML = FAQS.map((f,i) => `
      <div class="accordion-item" data-index="${i}">
        <button class="accordion-q"><span>${f.q}</span><i class="fa-solid fa-plus"></i></button>
        <div class="accordion-a"><p>${f.a}</p></div>
      </div>`).join('');

    $$('.accordion-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const wasOpen = item.classList.contains('open');
        $$('.accordion-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  renderGrid();
  renderCarousel();
  renderTestimonials();
  renderFaq();
  observeReveal();

  /* ---------- FILTER PILLS ---------- */
  $('#filterPills').addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    $$('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.activeFilter = pill.dataset.filter;
    renderGrid();
    observeReveal();
  });

  $$('.category-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      state.activeFilter = card.dataset.filter;
      $$('.pill').forEach(p => p.classList.toggle('active', p.dataset.filter === card.dataset.filter));
      renderGrid();
      observeReveal();
      $('#shop').scrollIntoView({ behavior:'smooth' });
    });
  });

  $('#shopSearch').addEventListener('input', e => {
    state.searchTerm = e.target.value;
    renderGrid();
    observeReveal();
  });

  /* ---------- CAROUSEL NAV ---------- */
  const track = $('#carouselTrack');
  $('#carouselNext').addEventListener('click', () => track.scrollBy({ left: 300, behavior:'smooth' }));
  $('#carouselPrev').addEventListener('click', () => track.scrollBy({ left: -300, behavior:'smooth' }));

  /* ---------- DELEGATED PRODUCT ACTIONS (grid + carousel) ---------- */
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn){ addToCart(addBtn.dataset.add); return; }

    const favBtn = e.target.closest('[data-fav]');
    if (favBtn){ toggleWishlist(favBtn.dataset.fav); return; }

    const qvBtn = e.target.closest('[data-quickview]');
    if (qvBtn){ openQuickView(qvBtn.dataset.quickview); return; }
  });

  /* ---------- CART LOGIC ---------- */
  function persistCart(){ localStorage.setItem('nova_cart', JSON.stringify(state.cart)); }
  function persistWishlist(){ localStorage.setItem('nova_wishlist', JSON.stringify(state.wishlist)); }

  function addToCart(id, qty=1){
    const line = state.cart.find(l => l.id === id);
    if (line) line.qty += qty;
    else state.cart.push({ id, qty });
    persistCart();
    updateBadges();
    renderCart();
    const p = findProduct(id);
    toast(`${p.name} added to cart`, 'fa-bag-shopping');
  }

  function toggleWishlist(id){
    const idx = state.wishlist.indexOf(id);
    if (idx > -1){ state.wishlist.splice(idx,1); }
    else { state.wishlist.push(id); }
    persistWishlist();
    updateBadges();
    $$(`[data-fav="${id}"]`).forEach(btn => {
      const active = state.wishlist.includes(id);
      btn.classList.toggle('active', active);
      btn.innerHTML = `<i class="fa-${active?'solid':'regular'} fa-heart"></i>`;
    });
    renderWishlist();
    const p = findProduct(id);
    toast(state.wishlist.includes(id) ? `${p.name} added to wishlist` : `${p.name} removed from wishlist`, 'fa-heart');
  }

  function updateBadges(){
    const cartCount = state.cart.reduce((s,l)=> s + l.qty, 0);
    const cartBadge = $('#cartCount');
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle('show', cartCount > 0);

    const wishBadge = $('#wishlistCount');
    wishBadge.textContent = state.wishlist.length;
    wishBadge.classList.toggle('show', state.wishlist.length > 0);
  }

  function cartTotals(){
    const subtotal = state.cart.reduce((s,l) => s + findProduct(l.id).price * l.qty, 0);
    let discount = 0;
    if (state.coupon === 'NOVA10') discount = subtotal * 0.10;
    const shipping = subtotal > 0 ? state.shipping : 0;
    const total = Math.max(0, subtotal - discount + shipping);
    return { subtotal, discount, shipping, total };
  }

  function renderCart(){
    const box = $('#cartItems');
    if (!state.cart.length){
      box.innerHTML = `<div class="empty-state"><i class="fa-solid fa-bag-shopping"></i><p>Your cart is empty. Go find something you'll love.</p></div>`;
    } else {
      box.innerHTML = state.cart.map(line => {
        const p = findProduct(line.id);
        return `
        <div class="cart-item" data-line="${line.id}">
          <img src="${p.img}" alt="${p.name}" width="68" height="68">
          <div class="cart-item-info">
            <strong>${p.name}</strong>
            <span>${money(p.price)}</span>
            <div class="cart-item-qty">
              <button data-qty="dec" aria-label="Decrease quantity">−</button>
              <span>${line.qty}</span>
              <button data-qty="inc" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-remove" data-remove aria-label="Remove item"><i class="fa-solid fa-trash"></i></button>
        </div>`;
      }).join('');
    }
    const { subtotal, discount, shipping, total } = cartTotals();
    $('#cartSubtotal').textContent = money(subtotal);
    $('#cartShipping').textContent = money(shipping);
    $('#cartTotal').textContent = money(total);
    const discountLine = $('#discountLine');
    if (discount > 0){
      discountLine.hidden = false;
      $('#cartDiscount').textContent = '-' + money(discount);
    } else discountLine.hidden = true;
  }

  $('#cartItems').addEventListener('click', e => {
    const item = e.target.closest('.cart-item');
    if (!item) return;
    const id = item.dataset.line;
    if (e.target.closest('[data-remove]')){
      state.cart = state.cart.filter(l => l.id !== id);
      toast('Item removed from cart', 'fa-trash');
    } else if (e.target.closest('[data-qty="inc"]')){
      state.cart.find(l => l.id === id).qty++;
    } else if (e.target.closest('[data-qty="dec"]')){
      const line = state.cart.find(l => l.id === id);
      line.qty--;
      if (line.qty <= 0) state.cart = state.cart.filter(l => l.id !== id);
    }
    persistCart();
    updateBadges();
    renderCart();
  });

  function renderWishlist(){
    const box = $('#wishlistItems');
    if (!state.wishlist.length){
      box.innerHTML = `<div class="empty-state"><i class="fa-solid fa-heart"></i><p>Nothing saved yet. Tap the heart on any product to keep it here.</p></div>`;
      return;
    }
    box.innerHTML = state.wishlist.map(id => {
      const p = findProduct(id);
      return `
      <div class="cart-item" data-line="${p.id}">
        <img src="${p.img}" alt="${p.name}" width="68" height="68">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>${money(p.price)}</span>
        </div>
        <button class="cart-remove" data-add-from-wish="${p.id}" aria-label="Move to cart"><i class="fa-solid fa-bag-shopping"></i></button>
      </div>`;
    }).join('');
  }

  $('#wishlistItems').addEventListener('click', e => {
    const btn = e.target.closest('[data-add-from-wish]');
    if (btn){ addToCart(btn.dataset.addFromWish); }
  });

  updateBadges();
  renderCart();
  renderWishlist();

  /* ---------- COUPON + SHIPPING ---------- */
  $('#applyCoupon').addEventListener('click', () => {
    const code = $('#couponInput').value.trim().toUpperCase();
    if (code === 'NOVA10'){
      state.coupon = 'NOVA10';
      toast('Coupon applied — 10% off', 'fa-tag');
    } else {
      state.coupon = null;
      toast('That coupon code isn\'t valid', 'fa-circle-exclamation');
    }
    renderCart();
  });
  $('#shippingSelect').addEventListener('change', e => {
    state.shipping = parseFloat(e.target.value) || 0;
    renderCart();
  });

  /* ---------- QUICK VIEW MODAL ---------- */
  function openQuickView(id){
    const p = findProduct(id);
    $('#quickViewBody').innerHTML = `
      <img src="${p.img}" alt="${p.name}" width="360" height="360">
      <div>
        <span class="qv-cat">${p.cat}</span>
        <h3 class="qv-title">${p.name}</h3>
        <div class="product-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews} reviews)</div>
        <div class="qv-price">${money(p.price)} ${p.old ? `<span class="price-old">${money(p.old)}</span>` : ''}</div>
        <p class="qv-desc">${p.desc}</p>
        <div class="qv-qty">
          <button class="qty-btn" id="qvDec">−</button>
          <span id="qvQty">1</span>
          <button class="qty-btn" id="qvInc">+</button>
        </div>
        <div class="qv-actions">
          <button class="btn btn-primary" id="qvAdd"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
          <button class="btn btn-outline" id="qvFav"><i class="fa-${state.wishlist.includes(p.id)?'solid':'regular'} fa-heart"></i></button>
        </div>
      </div>`;
    let qty = 1;
    $('#qvInc').addEventListener('click', () => { qty++; $('#qvQty').textContent = qty; });
    $('#qvDec').addEventListener('click', () => { if (qty>1){ qty--; $('#qvQty').textContent = qty; } });
    $('#qvAdd').addEventListener('click', () => { addToCart(p.id, qty); closeModal('quickViewModal'); });
    $('#qvFav').addEventListener('click', () => { toggleWishlist(p.id); $('#qvFav').innerHTML = `<i class="fa-${state.wishlist.includes(p.id)?'solid':'regular'} fa-heart"></i>`; });
    openModal('quickViewModal');
  }

  /* ---------- MODAL HELPERS ---------- */
  function openModal(id){ $('#'+id).classList.add('show'); document.body.style.overflow='hidden'; }
  function closeModal(id){ $('#'+id).classList.remove('show'); document.body.style.overflow=''; }
  $$('.modal-close, [data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close || btn.closest('.modal-overlay').id));
  });
  $$('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov.id); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
      $$('.modal-overlay.show').forEach(ov => closeModal(ov.id));
      closeDrawer('cart'); closeDrawer('wishlist');
    }
  });

  /* ---------- SEARCH MODAL ---------- */
  $('#searchBtn').addEventListener('click', () => { openModal('searchModal'); $('#modalSearchInput').focus(); renderSearchResults(''); });
  $('#modalSearchInput').addEventListener('input', e => renderSearchResults(e.target.value));
  function renderSearchResults(term){
    const t = term.trim().toLowerCase();
    const box = $('#searchResults');
    if (!t){ box.innerHTML = `<div class="search-empty">Start typing to search Nova Store…</div>`; return; }
    const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(t) || p.cat.toLowerCase().includes(t));
    box.innerHTML = results.length ? results.map(p => `
      <div class="search-result-item" data-goto="${p.id}">
        <img src="${p.img}" alt="${p.name}" width="48" height="48">
        <div><strong>${p.name}</strong><span>${p.cat} · ${money(p.price)}</span></div>
      </div>`).join('') : `<div class="search-empty">No products found for "${term}"</div>`;
  }
  $('#searchResults').addEventListener('click', e => {
    const item = e.target.closest('[data-goto]');
    if (!item) return;
    closeModal('searchModal');
    state.searchTerm = '';
    $('#shopSearch').value = '';
    state.activeFilter = 'All';
    $$('.pill').forEach(p => p.classList.toggle('active', p.dataset.filter === 'All'));
    renderGrid();
    observeReveal();
    setTimeout(()=> openQuickView(item.dataset.goto), 300);
  });

  /* ---------- DRAWERS ---------- */
  function openDrawer(name){
    $(`#${name}Drawer`).classList.add('open');
    $(`#${name}Overlay`).classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(name){
    $(`#${name}Drawer`).classList.remove('open');
    $(`#${name}Overlay`).classList.remove('show');
    document.body.style.overflow = '';
  }
  $('#cartBtn').addEventListener('click', () => openDrawer('cart'));
  $('#closeCart').addEventListener('click', () => closeDrawer('cart'));
  $('#cartOverlay').addEventListener('click', () => closeDrawer('cart'));
  $('#wishlistBtn').addEventListener('click', () => openDrawer('wishlist'));
  $('#closeWishlist').addEventListener('click', () => closeDrawer('wishlist'));
  $('#wishlistOverlay').addEventListener('click', () => closeDrawer('wishlist'));
  $('#profileBtn').addEventListener('click', () => toast('Account area isn\'t part of this static demo.', 'fa-user'));

  /* ---------- CHECKOUT FLOW ---------- */
  $('#checkoutBtn').addEventListener('click', () => {
    if (!state.cart.length){ toast('Your cart is empty', 'fa-circle-exclamation'); return; }
    closeDrawer('cart');
    const { subtotal, discount, shipping, total } = cartTotals();
    $('#checkoutSummary').innerHTML = `
      <div class="line"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      ${discount>0 ? `<div class="line"><span>Discount</span><span>-${money(discount)}</span></div>` : ''}
      <div class="line"><span>Shipping</span><span>${money(shipping)}</span></div>
      <div class="line total"><span>Total</span><span>${money(total)}</span></div>`;
    openModal('checkoutModal');
  });

  $('#checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    closeModal('checkoutModal');
    const orderNum = 'NV-' + Math.floor(10000 + Math.random()*89999);
    $('#orderNumber').textContent = '#' + orderNum;
    openModal('confirmModal');
    state.cart = [];
    state.coupon = null;
    persistCart();
    updateBadges();
    renderCart();
    e.target.reset();
  });

  /* ---------- NEWSLETTER ---------- */
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#newsletterEmail').value;
    toast(`Subscribed! Look out for something from us at ${email}`, 'fa-envelope-open-text');
    localStorage.setItem('nova_newsletter_dismissed', 'true');
    e.target.reset();
  });

  /* ---------- COUNTDOWN TIMER ---------- */
  const dealEnd = new Date();
  dealEnd.setHours(dealEnd.getHours() + 26, dealEnd.getMinutes() + 45, dealEnd.getSeconds() + 12);
  function tickCountdown(){
    const now = new Date();
    let diff = Math.max(0, dealEnd - now);
    const days = Math.floor(diff / 86400000); diff -= days*86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours*3600000;
    const mins = Math.floor(diff / 60000); diff -= mins*60000;
    const secs = Math.floor(diff / 1000);
    $('#cd-days').textContent = String(days).padStart(2,'0');
    $('#cd-hours').textContent = String(hours).padStart(2,'0');
    $('#cd-mins').textContent = String(mins).padStart(2,'0');
    $('#cd-secs').textContent = String(secs).padStart(2,'0');
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- ANIMATED STAT COUNTERS ---------- */
  function animateCounter(el){
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimal || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now){
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  $$('.stat-number').forEach(el => statObserver.observe(el));

  /* ---------- SCROLL REVEAL ---------- */
  function observeReveal(){
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    $$('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el));
  }

  /* Fail-safe: some tools render the whole page in one shot without ever
     dispatching real scroll/resize events (e.g. full-page screenshot or
     link-preview capture). If that happens the IntersectionObserver above
     never fires and content stays permanently invisible. As a guarantee,
     force every remaining .reveal element visible shortly after load. */
  window.addEventListener('load', () => {
    setTimeout(() => {
      $$('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view'));
    }, 1200);
  });

})();
