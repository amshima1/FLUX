let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id:1,
    name:"Luxury Red Dress",
    price:120,
    img:"https://images.unsplash.com/photo-1520975922284-9c3b7f2f6c2a?auto=format&fit=crop&w=500&q=80",
    category:"dress"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DISPLAY */
function display(list){
  let box = document.getElementById("product-list");
  box.innerHTML = "";

  list.forEach(p=>{
    box.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="event.stopPropagation(); add(${p.id})">Add</button>
      </div>
    `;
  });
}
display(products);

/* ADD CART */
function add(id){
  let item = products.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* PRODUCT VIEW */
function openProduct(id){
  let p = products.find(x=>x.id===id);

  document.getElementById("product-view").innerHTML = `
    <img src="${p.img}" style="width:100%">
    <h2>${p.name}</h2>
    <h3>$${p.price}</h3>
    <button onclick="add(${p.id})">Add to Cart</button>
  `;

  document.getElementById("product-modal").style.display="block";
}

function closeProduct(){
  document.getElementById("product-modal").style.display="none";
}

/* ADMIN */
function openAdmin(){
  document.getElementById("admin-modal").style.display="block";
}

function closeAdmin(){
  document.getElementById("admin-modal").style.display="none";
}

function addProduct(){
  let newP = {
    id: Date.now(),
    name: name.value,
    price: price.value,
    img: img.value,
    category:"dress"
  };

  products.push(newP);
  localStorage.setItem("products", JSON.stringify(products));
  display(products);
  closeAdmin();
}

/* MENU */
function toggleMenu(){
  document.getElementById("nav-menu").classList.toggle("active");
}

/* FILTER */
function filter(cat){
  if(cat==="all") return display(products);
  display(products.filter(p=>p.category===cat));
}
