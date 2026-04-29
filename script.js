const products = [
  {
    id:1,
    name:"Elegant Red Dress",
    price:120,
    category:"dress",
    type:"image",
    img:"https://images.unsplash.com/photo-1520975922284-9c3b7f2f6c2a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id:2,
    name:"Luxury Kaftan Video",
    price:150,
    category:"kaftan",
    type:"video",
    video:"https://cdn.pixabay.com/video/2023/03/27/157114-812445321_large.mp4"
  },
  {
    id:3,
    name:"Silk Evening Gown",
    price:200,
    category:"luxury",
    type:"image",
    img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id:4,
    name:"Runway Fashion Video",
    price:180,
    category:"luxury",
    type:"video",
    video:"https://cdn.pixabay.com/video/2022/10/26/136065-764462223_large.mp4"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DISPLAY PRODUCTS */
function displayProducts(list){
  let box = document.getElementById("product-list");
  box.innerHTML = "";

  list.forEach(p=>{
    let media = "";

    if(p.type === "video"){
      media = `<video autoplay muted loop playsinline>
                <source src="${p.video}" type="video/mp4">
               </video>`;
    } else {
      media = `<img src="${p.img}">`;
    }

    box.innerHTML += `
      <div class="card">
        ${media}
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}
displayProducts(products);

/* CART */
function addToCart(id){
  let item = products.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  document.getElementById("cart-count").innerText = cart.length;
}
updateCart();

/* FILTER */
function filterProducts(cat){
  if(cat==="all") return displayProducts(products);
  displayProducts(products.filter(p=>p.category===cat));
}

/* SEARCH */
document.getElementById("search").addEventListener("input", function(){
  let v = this.value.toLowerCase();
  displayProducts(products.filter(p=>p.name.toLowerCase().includes(v)));
});

/* MENU */
function toggleMenu(){
  document.getElementById("nav-menu").classList.toggle("active");
}

/* CART UI */
function openCart(){
  document.getElementById("cart-modal").style.display="block";
  renderCart();
}

function closeCart(){
  document.getElementById("cart-modal").style.display="none";
}

function renderCart(){
  let box = document.getElementById("cart-items");
  let total = 0;
  box.innerHTML = "";

  cart.forEach((item,i)=>{
    total += item.price;
    box.innerHTML += `
      <p>${item.name} - $${item.price}
      <button onclick="removeItem(${i})">X</button></p>
    `;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  renderCart();
}

/* CHECKOUT */
function checkout(){
  document.getElementById("checkout-modal").style.display="block";
}

function closeCheckout(){
  document.getElementById("checkout-modal").style.display="none";
}

function placeOrder(){
  alert("Order placed successfully!");
  cart = [];
  localStorage.clear();
  updateCart();
  closeCart();
  closeCheckout();
}
