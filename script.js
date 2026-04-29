const products = [
  { id: 1, name: "Luxury Jacket", price: 25000, image: "https://images.unsplash.com/photo-1544441893-675973e31985" },
  { id: 2, name: "Casual Outfit", price: 18000, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 3, name: "Street Wear", price: 15000, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* NAV */
const toggle = document.querySelector(".menu-toggle");
if (toggle) {
  toggle.onclick = () => {
    document.getElementById("nav").classList.toggle("active");
  };
}

/* DISPLAY PRODUCTS */
function displayProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;

  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.image}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p>₦${p.price}</p>
        </div>
      </div>
    `;
  });
}

/* PRODUCT PAGE */
function openProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

function loadProductPage() {
  const id = localStorage.getItem("selectedProduct");
  if (!id) return;

  const product = products.find(p => p.id == id);

  document.getElementById("p-img").src = product.image;
  document.getElementById("p-name").innerText = product.name;
  document.getElementById("p-price").innerText = "₦" + product.price;

  const related = document.getElementById("related");
  products.forEach(p => {
    if (p.id != id) {
      related.innerHTML += `
        <div class="card" onclick="openProduct(${p.id})">
          <img src="${p.image}">
          <p>${p.name}</p>
        </div>
      `;
    }
  });
}

function addToCartFromPage() {
  const id = localStorage.getItem("selectedProduct");
  addToCart(parseInt(id));
}

/* CART */
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) item.qty++;
  else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CHECKOUT */
function loadCheckout() {
  const totalEl = document.getElementById("checkout-total");
  if (!totalEl) return;

  let total = 0;
  cart.forEach(item => total += item.price * item.qty);
  totalEl.innerText = total;
}

const form = document.getElementById("checkout-form");
if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
  };
}

/* INIT */
displayProducts();
loadProductPage();
loadCheckout();
