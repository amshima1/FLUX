// Store Data
const products = [
    { id: 1, name: 'Shadow Oversized Tee', price: 45.00, category: 'streetwear', color: '#1a1a2e' },
    { id: 2, name: 'Gold Chain Necklace', price: 125.00, category: 'accessories', color: '#C9A96E' },
    { id: 3, name: 'Noir Cargo Pants', price: 95.00, category: 'streetwear', color: '#2d2d2d' },
    { id: 4, name: 'Velvet Bomber Jacket', price: 210.00, category: 'luxury', color: '#3d1f4e' },
    { id: 5, name: 'Flux Logo Hoodie', price: 75.00, category: 'streetwear', color: '#0B0B0B' },
    { id: 6, name: 'Crystal Ring Set', price: 55.00, category: 'accessories', color: '#8B7355' },
    { id: 7, name: 'Silk Drape Shirt', price: 180.00, category: 'luxury', color: '#F5F0EB' },
    { id: 8, name: 'Urban Snapback Cap', price: 35.00, category: 'accessories', color: '#333' }
];

let cart = [];
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Initialize Store
document.addEventListener('DOMContentLoaded', () => {
    renderShop();
    lucide.createIcons();
});

function renderShop(filter = 'all') {
    const grid = document.getElementById('shop-grid');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card group cursor-pointer">
            <div class="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-zinc-900" style="background:${p.color}15">
                <div class="flex items-center justify-center h-full opacity-20 font-display text-5xl">${p.name[0]}</div>
                <div class="quick-view absolute bottom-4 left-4 right-4">
                    <button class="w-full py-2 bg-white text-black text-xs font-bold rounded shadow-xl">VIEW PIECE</button>
                </div>
            </div>
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xs font-bold tracking-tighter uppercase">${p.name}</h3>
                    <p class="text-flux-gold font-semibold mt-1">${formatter.format(p.price)}</p>
                </div>
                <button onclick="addToCart(${p.id})" class="text-[10px] border border-white/20 px-2 py-1 hover:border-flux-gold transition">ADD</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    showToast(`Added ${item.name} to bag`);
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    
    countBadge.textContent = totalQty;
    countBadge.classList.toggle('hidden', totalQty === 0);
    
    itemsContainer.innerHTML = cart.map(item => `
        <div class="flex gap-4 mb-6">
            <div class="w-20 h-24 bg-zinc-800 rounded" style="background:${item.color}30"></div>
            <div class="flex-1">
                <div class="flex justify-between">
                    <h4 class="text-xs font-bold uppercase">${item.name}</h4>
                    <button onclick="removeItem(${item.id})" class="opacity-30 hover:opacity-100">×</button>
                </div>
                <p class="text-flux-gold text-sm mt-1">${formatter.format(item.price)}</p>
                <div class="flex items-center gap-4 mt-3">
                    <button onclick="changeQty(${item.id}, -1)" class="opacity-50 text-xl">-</button>
                    <span class="text-xs">${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)" class="opacity-50 text-xl">+</button>
                </div>
            </div>
        </div>
    `).join('');
    
    totalEl.textContent = formatter.format(totalPrice);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    item.qty += delta;
    if (item.qty <= 0) removeItem(id);
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('hidden');
}

function filterProducts(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'border-flux-gold', 'text-flux-gold');
        btn.classList.add('border-white/20');
    });
    event.target.classList.add('active', 'border-flux-gold', 'text-flux-gold');
    renderShop(cat);
}

function toggleDarkMode() {
    document.getElementById('app').classList.toggle('dark-mode');
    document.getElementById('app').classList.toggle('light-mode');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function checkout() {
    alert("Secure Checkout is currently in Demo Mode. Your bag total is: " + document.getElementById('cart-total').textContent);
}
