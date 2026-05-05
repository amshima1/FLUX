// Product Data
const products = [
  { id: 1, name: 'Shadow Oversized Tee', price: 15000, category: 'streetwear', color: '#1a1a2e' },
  { id: 2, name: 'Gold Chain Necklace', price: 8500, category: 'accessories', color: '#C9A96E' },
  { id: 3, name: 'Noir Cargo Pants', price: 22000, category: 'streetwear', color: '#2d2d2d' },
  { id: 4, name: 'Velvet Bomber Jacket', price: 45000, category: 'luxury', color: '#3d1f4e' },
  { id: 5, name: 'Flux Logo Hoodie', price: 18000, category: 'streetwear', color: '#0B0B0B' },
  { id: 6, name: 'Crystal Ring Set', price: 12000, category: 'accessories', color: '#8B7355' },
  { id: 7, name: 'Silk Drape Shirt', price: 35000, category: 'luxury', color: '#F5F0EB' },
  { id: 8, name: 'Urban Snapback Cap', price: 6500, category: 'accessories', color: '#333' },
];

let cart = [];
let wishlist = [];
let isDark = true;
let currentFilter = 'all';

// Initialize
window.onload = () => {
    renderFeatured();
    renderShop();
    renderArrivals();
    updateCartUI();
};

function renderProductCard(p) {
    const inWishlist = wishlist.includes(p.id);
    return `
        <div class="product-card" onclick="openProductModal(${p.id})">
            <div class="product-visual" style="background:${p.color}">
                <span>${p.name.charAt(0)}</span>
            </div>
            <h3>${p.name}</h3>
            <div class="flex-between">
                <span class="gold-text">₦${p.price.toLocaleString()}</span>
                <button onclick="event.stopPropagation(); addToCart(${p.id})" class="btn-primary" style="padding: 5px 15px;">ADD</button>
            </div>
        </div>
    `;
}

function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = products.slice(0, 4).map(p => renderProductCard(p)).join('');
}

function renderShop(filter = 'all', search = '') {
    const grid = document.getElementById('shop-grid');
    let filtered = products;
    if (filter !== 'all') filtered = filtered.filter(p => p.category === filter);
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    
    grid.innerHTML = filtered.length ? filtered.map(p => renderProductCard(p)).join('') : '<p>No products found</p>';
}

function renderArrivals() {
    const slider = document.getElementById('arrivals-slider');
    slider.innerHTML = products.slice(0, 6).map(p => `
        <div class="slider-item" style="min-width: 250px;">
            ${renderProductCard(p)}
        </div>
    `).join('');
}

// Cart Logic
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });
    updateCartUI();
    showToast('Added to cart ✓');
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countEl = document.getElementById('cart-count');
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);

    const itemsEl = document.getElementById('cart-items');
    if (cart.length === 0) {
        itemsEl.innerHTML = '<p style="text-align:center; opacity:0.5; padding-top:50px;">Empty cart</p>';
    } else {
        itemsEl.innerHTML = cart.map(item => {
            const p = products.find(prod => prod.id === item.id);
            return `<div class="flex-between" style="margin-bottom:20px;">
                <span>${p.name} (x${item.qty})</span>
                <span>₦${(p.price * item.qty).toLocaleString()}</span>
            </div>`;
        }).join('');
    }

    const total = cart.reduce((sum, item) => {
        const p = products.find(prod => prod.id === item.id);
        return sum + (p.price * item.qty);
    }, 0);
    document.getElementById('cart-total').textContent = '₦' + total.toLocaleString();
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('hidden');
}

function toggleDarkMode() {
    isDark = !isDark;
    document.body.classList.toggle('light-mode', !isDark);
    document.body.classList.toggle('dark-mode', isDark);
}

function filterProducts(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderShop(cat, document.getElementById('search-input').value);
}

function searchProducts() {
    renderShop(currentFilter, document.getElementById('search-input').value);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.transform = 'translateX(0)';
    setTimeout(() => { t.style.transform = 'translateX(200%)'; }, 2000);
}

function scrollSlider(dir) {
    const slider = document.getElementById('arrivals-slider');
    slider.scrollBy({ left: dir * 300, behavior: 'smooth' });
}

function openProductModal(id) {
    const p = products.find(prod => prod.id === id);
    const modal = document.getElementById('product-modal');
    document.getElementById('product-detail').innerHTML = `
        <div class="flex-row">
            <div style="flex:1; height:300px; background:${p.color}; display:flex; align-items:center; justify-content:center; font-size:5rem;">${p.name.charAt(0)}</div>
            <div style="flex:1">
                <h2>${p.name}</h2>
                <p class="gold-text">₦${p.price.toLocaleString()}</p>
                <p style="margin:20px 0; opacity:0.7;">Premium quality clothing.</p>
                <button onclick="addToCart(${p.id})" class="btn-primary">ADD TO CART</button>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}
