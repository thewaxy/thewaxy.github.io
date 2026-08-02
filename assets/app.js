(function () {
  "use strict";

  var products = [
    { id: "linen-pack", name: "Linen Starter Pack", cat: "home", price: 1290, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80", tags: ["best seller", "bundle"], desc: "Soft home textile set with towels, throw and scent cards." },
    { id: "desk-kit", name: "Focus Desk Kit", cat: "office", price: 870, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", tags: ["office", "gift"], desc: "Desk mat, brass clip, weekly pad and cable tidy for calm workdays." },
    { id: "brew-box", name: "Brew Box", cat: "kitchen", price: 640, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80", tags: ["coffee", "new"], desc: "Filter coffee sampler, ceramic dripper and tasting notebook." },
    { id: "travel-pouch", name: "Travel Pouch Duo", cat: "travel", price: 520, img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80", tags: ["travel", "compact"], desc: "Two weatherproof pouches for chargers, cosmetics or mini kits." },
    { id: "care-candle", name: "Care Candle Trio", cat: "home", price: 450, img: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=80", tags: ["wellness"], desc: "Three soy candles built around cedar, bergamot and basil." },
    { id: "launch-box", name: "Launch Box", cat: "office", price: 1490, img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80", tags: ["team", "premium"], desc: "Welcome kit for new hires with notes, mug, snack and setup cards." }
  ];

  var cartKey = "workzy_test_cart_v1";
  var tokenKey = "workzy_test_token";

  function money(value) { return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function readCart() {
    try { return JSON.parse(localStorage.getItem(cartKey) || "{}"); } catch (e) { return {}; }
  }
  function writeCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
  }
  function addToCart(id, qty) {
    var cart = readCart();
    cart[id] = (cart[id] || 0) + (qty || 1);
    writeCart(cart);
    toast("Sepete eklendi: " + (findProduct(id).name || id));
    if (window.Workzy && window.Workzy.track) window.Workzy.track("test_add_to_cart", { product_url: location.href, product_title: id, count: cart[id] });
  }
  function findProduct(id) { return products.filter(function (p) { return p.id === id; })[0] || products[0]; }
  function cartItems() {
    var cart = readCart();
    return Object.keys(cart).map(function (id) {
      var p = findProduct(id);
      return Object.assign({}, p, { qty: cart[id] });
    });
  }
  function totals() {
    var subtotal = cartItems().reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    var shipping = subtotal > 1500 || subtotal === 0 ? 0 : 89;
    var discount = subtotal > 2500 ? Math.round(subtotal * .12) : 0;
    return { subtotal: subtotal, shipping: shipping, discount: discount, total: subtotal + shipping - discount };
  }
  function updateCartCount() {
    var count = cartItems().reduce(function (sum, item) { return sum + item.qty; }, 0);
    qsa("[data-cart-count]").forEach(function (el) { el.textContent = count; });
  }
  function toast(message) {
    var el = qs("[data-toast]");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function tokenFromUrl() {
    var params = new URLSearchParams(location.search);
    var token = params.get("token") || "";
    if (token) localStorage.setItem(tokenKey, token);
    if (token) return token;
    var existingScript = qs('script[src*="/api/v1/wz.js"][src*="token="], script[src*="../api/v1/wz.js"][src*="token="]');
    if (existingScript) {
      try {
        token = new URL(existingScript.src, location.href).searchParams.get("token") || "";
        if (token) localStorage.setItem(tokenKey, token);
      } catch (e) {}
    }
    return token || localStorage.getItem(tokenKey) || "";
  }
  function preserveTokenLinks(token) {
    if (!token) return;
    qsa("a[href$='.html'], a[href*='.html?']").forEach(function (a) {
      var url = new URL(a.getAttribute("href"), location.href);
      if (!url.searchParams.get("token")) url.searchParams.set("token", token);
      a.href = url.pathname.split("/").pop() + url.search;
    });
  }
  function bootWorkzy() {
    var token = tokenFromUrl();
    preserveTokenLinks(token);
    var banner = qs("[data-token-banner]");
    if (!token && banner) banner.classList.add("show");
    if (!token) return;
    window.Workzy = window.Workzy || {};
    window.Workzy.siteToken = token;
  }

  function productCard(p) {
    return '<article class="card product" data-category="' + p.cat + '" data-product-id="' + p.id + '">' +
      '<a href="product.html?id=' + p.id + '"><img class="product-img" src="' + p.img + '" alt="' + p.name + '"></a>' +
      '<div class="card-body"><div>' + p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("") + '</div>' +
      '<h3><a href="product.html?id=' + p.id + '">' + p.name + '</a></h3><p class="muted">' + p.desc + '</p>' +
      '<div class="summary-row"><span class="price">' + money(p.price) + '</span><button class="btn primary" data-add="' + p.id + '">Sepete ekle</button></div></div></article>';
  }
  function renderCatalog() {
    var root = qs("[data-products]");
    if (!root) return;
    var search = (qs("[data-search]") || {}).value || "";
    var cat = (qs("[data-category]") || {}).value || "all";
    var sort = (qs("[data-sort]") || {}).value || "popular";
    var list = products.filter(function (p) {
      return (cat === "all" || p.cat === cat) && (p.name + " " + p.desc + " " + p.tags.join(" ")).toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
    if (sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    if (sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    root.innerHTML = list.map(productCard).join("") || '<div class="notice">Sonuc yok. Filtreyi genisletmeyi dene.</div>';
  }
  function renderProduct() {
    var root = qs("[data-product-detail]");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id") || "linen-pack";
    var p = findProduct(id);
    document.title = p.name + " | Northstar Test Shop";
    root.innerHTML = '<div class="hero-media"><img src="' + p.img + '" alt="' + p.name + '"><div class="floating-receipt"><div><strong>Urun sinyali</strong><br><span class="muted">Workzy icin product view, add cart ve scroll testi.</span></div><button class="btn primary" data-add="' + p.id + '">Sepete ekle</button></div></div>' +
      '<div><p class="eyebrow">' + p.cat + '</p><h1>' + p.name + '</h1><p class="lead">' + p.desc + ' Bu sayfa urun detay metni, varyant secimi, favori butonu ve stok uyarisi ile takip davranisini test eder.</p>' +
      '<p class="price">' + money(p.price) + '</p><div class="field"><label>Varyant</label><select data-workzy-track><option>Natural</option><option>Graphite</option><option>Terracotta</option></select></div>' +
      '<div class="field"><label>Adet</label><input class="input" type="number" min="1" value="1" data-qty></div><button class="btn primary" data-add-with-qty="' + p.id + '">Sepete ekle</button> <button class="btn ghost" data-open-modal="stockModal">Stok bildirimi</button></div>';
  }
  function renderCart() {
    var root = qs("[data-cart]");
    if (!root) return;
    var items = cartItems();
    if (!items.length) {
      root.innerHTML = '<div class="notice">Sepet bos. Katalogdan birkac urun ekleyerek test akisini baslat.</div>';
    } else {
      root.innerHTML = items.map(function (item) {
        return '<div class="cart-line"><img src="' + item.img + '" alt="' + item.name + '"><div><h3>' + item.name + '</h3><div class="qty"><button data-dec="' + item.id + '">-</button><strong>' + item.qty + '</strong><button data-inc="' + item.id + '">+</button><button class="btn ghost" data-remove="' + item.id + '">Sil</button></div></div><div class="price">' + money(item.price * item.qty) + '</div></div>';
      }).join("");
    }
    renderSummary();
  }
  function renderSummary() {
    var root = qs("[data-summary]");
    if (!root) return;
    var t = totals();
    root.innerHTML = '<div class="summary-row"><span>Ara toplam</span><strong>' + money(t.subtotal) + '</strong></div>' +
      '<div class="summary-row"><span>Kargo</span><strong>' + money(t.shipping) + '</strong></div>' +
      '<div class="summary-row"><span>Indirim</span><strong>-' + money(t.discount) + '</strong></div>' +
      '<div class="summary-row total"><span>Toplam</span><span>' + money(t.total) + '</span></div>';
  }
  function renderSuccess() {
    var root = qs("[data-order-total]");
    if (root) root.textContent = money(totals().total || 1290);
  }
  function wireEvents() {
    document.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add]");
      var addQty = e.target.closest("[data-add-with-qty]");
      var inc = e.target.closest("[data-inc]");
      var dec = e.target.closest("[data-dec]");
      var rem = e.target.closest("[data-remove]");
      var modal = e.target.closest("[data-open-modal]");
      var close = e.target.closest("[data-close-modal]");
      if (add) addToCart(add.getAttribute("data-add"), 1);
      if (addQty) addToCart(addQty.getAttribute("data-add-with-qty"), parseInt((qs("[data-qty]") || {}).value || "1", 10));
      if (inc || dec || rem) {
        var id = (inc || dec || rem).getAttribute(inc ? "data-inc" : dec ? "data-dec" : "data-remove");
        var cart = readCart();
        if (inc) cart[id] = (cart[id] || 0) + 1;
        if (dec) cart[id] = Math.max(0, (cart[id] || 0) - 1);
        if (rem) cart[id] = 0;
        if (!cart[id]) delete cart[id];
        writeCart(cart);
        renderCart();
      }
      if (modal) qs("#" + modal.getAttribute("data-open-modal")).classList.add("open");
      if (close) close.closest(".modal").classList.remove("open");
      if (e.target.closest("[data-rage]")) toast("Hizli tiklama sinyali icin bu butona art arda basabilirsin.");
    });
    ["input", "change"].forEach(function (evt) {
      document.addEventListener(evt, function (e) {
        if (e.target.matches("[data-search], [data-category], [data-sort]")) renderCatalog();
      });
    });
    qsa("form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        if (form.matches("[data-checkout-form]")) {
          e.preventDefault();
          toast("Odeme basarili. Siparis onay sayfasina yonlendiriliyorsun.");
          setTimeout(function () { location.href = "success.html?order=NS-" + Date.now().toString().slice(-6); }, 650);
          return;
        }
        e.preventDefault();
        toast("Form gonderildi. Test icin tesekkurler.");
      });
    });
    var tokenForm = qs("[data-token-form]");
    if (tokenForm) {
      tokenForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var value = qs("[data-token-input]").value.trim();
        if (!value) return;
        localStorage.setItem(tokenKey, value);
        location.search = "?token=" + encodeURIComponent(value);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    bootWorkzy();
    updateCartCount();
    renderCatalog();
    renderProduct();
    renderCart();
    renderSummary();
    renderSuccess();
    wireEvents();
  });
})();
