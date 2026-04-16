import { useState, useEffect } from "react";

const palette = {
  cream: "#FAF8F4",
  sand: "#F0EBE1",
  tan: "#D9CEBB",
  warmGray: "#8C8278",
  charcoal: "#2C2520",
  espresso: "#1A1210",
  terracotta: "#C45E3A",
  rust: "#9E3A1E",
  sage: "#6B8C6B",
  muted: "#A09890",
};

const products = [
  { id: 1, name: "Linen Overshirt", price: 128, originalPrice: 160, category: "Tops", tag: "Sale", rating: 4.8, reviews: 124, color: "#C8B89A", img: "👕", image: "/images/products/product_1.png" },
  { id: 2, name: "Merino Crewneck", price: 196, originalPrice: null, category: "Tops", tag: "New", rating: 4.9, reviews: 89, color: "#8B9E8B", img: "🧶", image: "/images/products/product_2.png" },
  { id: 3, name: "Canvas Trousers", price: 154, originalPrice: null, category: "Bottoms", tag: null, rating: 4.7, reviews: 201, color: "#A89880", img: "👖", image: "/images/products/product_3.png" },
  { id: 4, name: "Suede Derby Shoe", price: 248, originalPrice: 310, category: "Footwear", tag: "Sale", rating: 4.6, reviews: 67, color: "#8B7355", img: "👞", image: "/images/products/product_4.png" },
  { id: 5, name: "Cotton Waffle Tee", price: 72, originalPrice: null, category: "Tops", tag: null, rating: 4.5, reviews: 312, color: "#D4C4B0", img: "👔", image: "/images/products/product_5.png" },
  { id: 6, name: "Wool Blend Coat", price: 395, originalPrice: null, category: "Outerwear", tag: "New", rating: 4.9, reviews: 44, color: "#6B6558", img: "🧥", image: "/images/products/product_6.png" },
  { id: 7, name: "Ribbed Beanie", price: 48, originalPrice: null, category: "Accessories", tag: null, rating: 4.8, reviews: 178, color: "#9E8B7A", img: "🧢", image: "/images/products/product_7.png" },
  { id: 8, name: "Leather Belt", price: 86, originalPrice: 110, category: "Accessories", tag: "Sale", rating: 4.7, reviews: 93, color: "#7A5C40", img: "👜", image: "/images/products/product_8.png" },
];

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #FAF8F4; font-family: 'DM Sans', sans-serif; color: #2C2520; }

  .app { min-height: 100vh; background: #FAF8F4; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(250,248,244,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid #D9CEBB;
    padding: 0 2rem; display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 22px; letter-spacing: -0.5px; color: #2C2520; }
  .nav-logo span { color: #C45E3A; font-style: italic; }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { font-size: 13px; font-weight: 400; color: #8C8278; text-decoration: none; letter-spacing: 0.5px; text-transform: uppercase; transition: color 0.2s; cursor: pointer; }
  .nav-links a:hover { color: #2C2520; }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .nav-icon { background: none; border: none; cursor: pointer; color: #2C2520; font-size: 18px; padding: 6px; border-radius: 6px; transition: background 0.15s; }
  .nav-icon:hover { background: #F0EBE1; }
  .cart-badge { position: relative; }
  .badge { position: absolute; top: -4px; right: -4px; background: #C45E3A; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; font-weight: 500; display: flex; align-items: center; justify-content: center; }

  /* HERO */
  .hero {
    padding: 5rem 2rem 4rem;
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  }
  .hero-eyebrow { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px; color: #C45E3A; margin-bottom: 1rem; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; color: #1A1210; margin-bottom: 1.25rem; }
  .hero-title em { font-style: italic; color: #C45E3A; }
  .hero-sub { font-size: 15px; font-weight: 300; color: #8C8278; line-height: 1.7; max-width: 380px; margin-bottom: 2rem; }
  .hero-actions { display: flex; gap: 1rem; align-items: center; }
  .btn-primary { background: #2C2520; color: #FAF8F4; border: none; padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
  .btn-primary:hover { background: #1A1210; }
  .btn-secondary { background: none; color: #2C2520; border: 1px solid #D9CEBB; padding: 14px 28px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
  .btn-secondary:hover { border-color: #8C8278; }
  .hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .hero-card {
    background: #F0EBE1; border-radius: 12px; padding: 1.5rem; aspect-ratio: 1;
    display: flex; flex-direction: column; justify-content: flex-end;
    position: relative; overflow: hidden;
  }
  .hero-card img {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 1; opacity: 0.9; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hero-card:hover img { transform: scale(1.08); }
  .hero-card.tall { grid-row: span 2; aspect-ratio: auto; }
  
  .hero-card-content { position: relative; z-index: 2; pointer-events: none; }
  .hero-card-label {
    font-size: 10px; color: #5C554F; text-transform: uppercase; letter-spacing: 1px;
    background: rgba(250,248,244,0.85); display: inline-block; padding: 4px 10px; 
    border-radius: 4px; backdrop-filter: blur(4px);
  }
  .hero-card-name {
    font-family: 'Playfair Display', serif; font-size: 18px; color: #1A1210; margin-top: 6px;
    background: rgba(250,248,244,0.85); padding: 4px 10px; width: fit-content; 
    border-radius: 4px; backdrop-filter: blur(4px);
  }
  .hero-card-icon { display: none; }

  /* STATS */
  .stats { border-top: 1px solid #D9CEBB; border-bottom: 1px solid #D9CEBB; padding: 1.5rem 2rem; display: flex; justify-content: center; gap: 4rem; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 28px; color: #2C2520; }
  .stat-label { font-size: 11px; color: #A09890; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

  /* SHOP */
  .shop { max-width: 1280px; margin: 0 auto; padding: 4rem 2rem; }
  .shop-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; }
  .shop-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #1A1210; }
  .shop-count { font-size: 13px; color: #A09890; }

  .filter-bar { display: flex; gap: 8px; margin-bottom: 2.5rem; overflow-x: auto; padding-bottom: 4px; }
  .filter-btn { background: none; border: 1px solid #D9CEBB; padding: 8px 18px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #8C8278; cursor: pointer; white-space: nowrap; transition: all 0.18s; }
  .filter-btn:hover { border-color: #8C8278; color: #2C2520; }
  .filter-btn.active { background: #2C2520; border-color: #2C2520; color: #FAF8F4; }

  .sort-select { background: #F0EBE1; border: 1px solid #D9CEBB; border-radius: 6px; padding: 8px 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #2C2520; cursor: pointer; outline: none; }

  /* PRODUCT GRID */
  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem; }

  .product-card { cursor: pointer; }
  .product-image {
    border-radius: 10px; aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1rem; background: #F0EBE1;
  }
  .product-image img {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.6s ease;
  }
  .product-card:hover .product-image img { transform: scale(1.1); }
  .product-emoji { font-size: 4rem; z-index: 1; }
  
  .product-tag {
    position: absolute; top: 12px; left: 12px;
    font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;
    padding: 4px 10px; border-radius: 4px; z-index: 3;
  }
  .tag-sale { background: #C45E3A; color: white; }
  .tag-new { background: #6B8C6B; color: white; }
  .wishlist-btn {
    position: absolute; top: 10px; right: 10px;
    background: rgba(250,248,244,0.85); border: none; border-radius: 50%;
    width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 15px; transition: background 0.15s;
  }
  .wishlist-btn:hover { background: white; }
  .product-meta { display: flex; justify-content: space-between; align-items: flex-start; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 16px; color: #2C2520; margin-bottom: 4px; }
  .product-cat { font-size: 12px; color: #A09890; text-transform: uppercase; letter-spacing: 0.5px; }
  .product-rating { font-size: 12px; color: #A09890; }
  .product-rating span { color: #C45E3A; }
  .product-price { display: flex; gap: 8px; align-items: baseline; margin-top: 6px; }
  .price-main { font-size: 15px; font-weight: 500; color: #2C2520; }
  .price-original { font-size: 13px; color: #A09890; text-decoration: line-through; }
  .add-to-cart {
    width: 100%; margin-top: 12px; background: none; border: 1px solid #D9CEBB;
    padding: 10px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 13px;
    font-weight: 500; color: #2C2520; cursor: pointer; transition: all 0.18s; letter-spacing: 0.3px;
  }
  .add-to-cart:hover { background: #2C2520; color: #FAF8F4; border-color: #2C2520; }

  /* CART DRAWER */
  .cart-overlay { position: fixed; inset: 0; background: rgba(26,18,16,0.4); z-index: 200; opacity: 0; animation: fadeIn 0.2s forwards; }
  .cart-drawer {
    position: fixed; right: 0; top: 0; bottom: 0; width: 400px; max-width: 95vw;
    background: #FAF8F4; z-index: 201; display: flex; flex-direction: column;
    transform: translateX(100%); animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
    border-left: 1px solid #D9CEBB;
  }
  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes slideIn { to { transform: translateX(0); } }
  .cart-head { padding: 1.5rem; border-bottom: 1px solid #D9CEBB; display: flex; justify-content: space-between; align-items: center; }
  .cart-head-title { font-family: 'Playfair Display', serif; font-size: 20px; }
  .close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #8C8278; padding: 4px; line-height: 1; }
  .cart-items { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .cart-item { display: flex; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #F0EBE1; }
  .cart-item-img {
    width: 72px; height: 90px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 2rem; flex-shrink: 0; overflow: hidden; position: relative;
  }
  .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-family: 'Playfair Display', serif; font-size: 14px; color: #2C2520; margin-bottom: 4px; }
  .cart-item-price { font-size: 14px; font-weight: 500; color: #2C2520; }
  .cart-item-remove { background: none; border: none; color: #A09890; cursor: pointer; font-size: 18px; padding: 0; }
  .cart-item-remove:hover { color: #C45E3A; }
  .qty-control { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .qty-btn { background: #F0EBE1; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; color: #2C2520; }
  .qty-num { font-size: 13px; font-weight: 500; min-width: 20px; text-align: center; }
  .cart-footer { padding: 1.5rem; border-top: 1px solid #D9CEBB; }
  .cart-subtotal { display: flex; justify-content: space-between; margin-bottom: 1rem; }
  .cart-subtotal-label { font-size: 13px; color: #8C8278; text-transform: uppercase; letter-spacing: 0.5px; }
  .cart-subtotal-val { font-family: 'Playfair Display', serif; font-size: 22px; color: #2C2520; }
  .checkout-btn { width: 100%; background: #C45E3A; color: white; border: none; padding: 16px; border-radius: 6px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .checkout-btn:hover { background: #9E3A1E; }
  .empty-cart { text-align: center; padding: 3rem 1rem; color: #A09890; }
  .empty-cart-icon { font-size: 3rem; margin-bottom: 1rem; }

  /* TOAST */
  .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #2C2520; color: #FAF8F4; padding: 12px 24px; border-radius: 100px; font-size: 13px; font-weight: 500; z-index: 300; animation: toastIn 0.3s ease; white-space: nowrap; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* FOOTER */
  .footer { background: #2C2520; color: #A09890; padding: 3rem 2rem 2rem; margin-top: 4rem; }
  .footer-grid { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
  .footer-brand { font-family: 'Playfair Display', serif; font-size: 20px; color: #FAF8F4; margin-bottom: 0.75rem; }
  .footer-sub { font-size: 13px; line-height: 1.7; max-width: 220px; }
  .footer-heading { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #FAF8F4; margin-bottom: 1rem; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { font-size: 13px; color: #8C8278; text-decoration: none; cursor: pointer; transition: color 0.15s; }
  .footer-links a:hover { color: #FAF8F4; }
  .footer-bottom { max-width: 1280px; margin: 0 auto; border-top: 1px solid #3D342F; padding-top: 1.5rem; display: flex; justify-content: space-between; font-size: 12px; }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .stats { gap: 2rem; flex-wrap: wrap; }
  }
  @media (max-width: 600px) {
    .nav-links { display: none; }
    .shop-header { flex-direction: column; gap: 1rem; align-items: flex-start; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.qty + delta;
      return newQty < 1 ? null : { ...i, qty: newQty };
    }).filter(Boolean));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = products.filter(p => activeCategory === "All" || p.category === activeCategory);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Maré<span>ux</span></div>
          <ul className="nav-links">
            <li><a>New In</a></li>
            <li><a>Men</a></li>
            <li><a>Women</a></li>
            <li><a>Accessories</a></li>
            <li><a>Sale</a></li>
          </ul>
          <div className="nav-right">
            <button className="nav-icon">🔍</button>
            <button className="nav-icon">👤</button>
            <button className="nav-icon cart-badge" onClick={() => setCartOpen(true)}>
              🛒
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section>
          <div className="hero">
            <div>
              <p className="hero-eyebrow">Spring / Summer 2025</p>
              <h1 className="hero-title">Dressed for<br /><em>every chapter</em><br />of the day.</h1>
              <p className="hero-sub">
                Considered basics, refined silhouettes, and pieces that outlast the moment.
                Built to wear, made to last.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
                  Shop Collection
                </button>
                <button className="btn-secondary">Explore Lookbook</button>
              </div>
            </div>
            <div className="hero-visual">
              {[
                { icon: "🧥", label: "Outerwear", name: "Wool Coat", bg: "#E8E2D8", tall: true, image: "/images/hero/wool_coat.png" },
                { icon: "👟", label: "Footwear", name: "Canvas Runner", bg: "#D8E2D8", image: "/images/hero/canvas_runner.png" },
                { icon: "🧶", label: "Knitwear", name: "Merino Crew", bg: "#E2D8D0", image: "/images/hero/merino_crew.png" },
              ].map((c, i) => (
                <div key={i} className={`hero-card ${c.tall ? 'tall' : ''}`} style={{ background: c.bg }}>
                  {c.image && <img src={c.image} alt={c.name} />}
                  <div className="hero-card-content">
                    <span className="hero-card-icon">{c.icon}</span>
                    <span className="hero-card-label">{c.label}</span>
                    <div className="hero-card-name">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats">
          {[["12k+", "Happy Customers"], ["340+", "Curated Styles"], ["100%", "Ethical Sourcing"], ["Free", "Returns Always"]].map(([n, l]) => (
            <div className="stat" key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* SHOP */}
        <section id="shop" className="shop">
          <div className="shop-header">
            <div>
              <h2 className="shop-title">The Collection</h2>
              <p className="shop-count">{sorted.length} styles</p>
            </div>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="filter-bar">
            {categories.map(cat => (
              <button key={cat} className={`filter-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {sorted.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image" style={{ background: product.color + "33" }}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <span className="product-emoji">{product.img}</span>
                  )}
                  {product.tag && (
                    <span className={`product-tag tag-${product.tag.toLowerCase()}`}>{product.tag}</span>
                  )}
                  <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="product-meta">
                  <div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-cat">{product.category}</div>
                  </div>
                  <div className="product-rating">
                    <span>★</span> {product.rating}
                    <div style={{ fontSize: 11, marginTop: 2 }}>{product.reviews} reviews</div>
                  </div>
                </div>
                <div className="product-price">
                  <span className="price-main">${product.price}</span>
                  {product.originalPrice && <span className="price-original">${product.originalPrice}</span>}
                </div>
                <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Bag</button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Maréux</div>
              <p className="footer-sub">Timeless clothing for considered living. Ethically made, beautifully designed.</p>
            </div>
            {[
              ["Shop", ["New Arrivals", "Men", "Women", "Accessories", "Sale"]],
              ["Company", ["About Us", "Sustainability", "Careers", "Press"]],
              ["Help", ["Sizing Guide", "Shipping", "Returns", "Contact"]],
            ].map(([heading, links]) => (
              <div key={heading}>
                <p className="footer-heading">{heading}</p>
                <ul className="footer-links">
                  {links.map(l => <li key={l}><a>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2025 Maréux. All rights reserved.</span>
            <span>Privacy · Terms · Cookies</span>
          </div>
        </footer>

        {/* CART DRAWER */}
        {cartOpen && (
          <>
            <div className="cart-overlay" onClick={() => setCartOpen(false)} />
            <aside className="cart-drawer">
              <div className="cart-head">
                <div className="cart-head-title">Your Bag {cartCount > 0 && `(${cartCount})`}</div>
                <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
              </div>
              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="empty-cart">
                    <div className="empty-cart-icon">🛍️</div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, marginBottom: 8 }}>Your bag is empty</p>
                    <p style={{ fontSize: 13, color: "#A09890" }}>Add something beautiful</p>
                  </div>
                ) : cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img" style={{ background: item.color + "33" }}>
                      {item.image ? <img src={item.image} alt={item.name} /> : item.img}
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">${item.price}</div>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-subtotal">
                    <span className="cart-subtotal-label">Subtotal</span>
                    <span className="cart-subtotal-val">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout →</button>
                </div>
              )}
            </aside>
          </>
        )}

        {/* TOAST */}
        {toast && <div className="toast">✓ {toast}</div>}
      </div>
    </>
  );
}
