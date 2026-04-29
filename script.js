// PRODUCTS DATABASE
const products = [
  {id:1, name:"Elegant Dress", price:120, category:"dress", img:"https://via.placeholder.com/300"},
  {id:2, name:"Luxury Kaftan", price:150, category:"kaftan", img:"https://via.placeholder.com/300"},
  {id:3, name:"Silk Gown", price:200, category:"luxury", img:"https://via.placeholder.com/300"},
  {id:4, name:"Royal Dress", price:180, category:"dress", img:"https://via.placeholder.com/300"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DISPLAY PRODUCTS
function displayProducts(list){
  let container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}
displayProducts(products);

// ADD TO CART
function addToCart(id){
  let item = products.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// CART COUNT
function updateCartCount(){
  document.getElementById("cart-count").innerText = cart.length;
}
updateCartCount();

// FILTER
function filterProducts(cat){
  if(cat==="all") return displayProducts(products);
  let filtered = products.filter(p=>p.category===cat);
  displayProducts(filtered);
}

// SEARCH
document.getElementById("search").addEventListener("input", function(){
  let value = this.value.toLowerCase();
  let filtered = products.filter(p=>p.name.toLowerCase().includes(value));
  displayProducts(filtered);
});

// CART MODAL
function openCart(){
  document.getElementById("cart-modal").style.display="block";
  renderCart();
}

function closeCart(){
  document.getElementById("cart-modal").style.display="none";
}

function renderCart(){
  let box = document.getElementById("cart-items");
  box.innerHTML = "";

  let total = 0;

  cart.forEach((item,i)=>{
    total += item.price;
    box.innerHTML += `
      <p>${item.name} - $${item.price}
      <button onclick="removeItem(${i})">X</button></p>
    `;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

// REMOVE ITEM
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// CHECKOUT
function checkout(){
  document.getElementById("checkout").style.display="block";
}

function closeCheckout(){
  document.getElementById("checkout").style.display="none";
}

function placeOrder(){
  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  closeCheckout();
  closeCart();
}
