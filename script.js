const products = [
  { id: 1, name: "Oversized Tee", price: 49 },
  { id: 2, name: "Luxury Hoodie", price: 89 },
  { id: 3, name: "Street Jacket", price: 149 },
];

let cart = [];

// Render products
function renderProducts() {
  const container = document.getElementById("products");

  container.innerHTML = products.map(p => `
    <div class="bg-gray-800 p-6 rounded">
      <h3 class="text-xl">${p.name}</h3>
      <p class="text-yellow-500">$${p.price}</p>
      <button onclick="addToCart(${p.id})" class="mt-4 bg-yellow-500 px-4 py-2 text-black">Add</button>
    </div>
  `).join("");
}

// Add to cart
function addToCart(id) {
  const item = cart.find(c => c.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  updateCart();
}

// Update cart
function updateCart() {
  const container = document.getElementById("cart-items");

  container.innerHTML = cart.map(c => {
    const p = products.find(pr => pr.id === c.id);
    return `<div>${p.name} x${c.qty}</div>`;
  }).join("");

  const total = cart.reduce((sum, c) => {
    const p = products.find(pr => pr.id === c.id);
    return sum + p.price * c.qty;
  }, 0);

  document.getElementById("total").textContent = total;
}

// Toggle cart
function toggleCart() {
  const cartEl = document.getElementById("cart");
  cartEl.classList.toggle("hidden");
}

// Scroll
function scrollToShop() {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

// Stripe Checkout
async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const formattedCart = cart.map(c => {
    const p = products.find(pr => pr.id === c.id);
    return {
      name: p.name,
      price: p.price,
      qty: c.qty
    };
  });

  const res = await fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart: formattedCart })
  });

  const data = await res.json();
  window.location.href = data.url;
}

// Init
renderProducts();
