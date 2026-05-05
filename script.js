function shopNow() {
  alert("Shop page coming soon!");
}

function customOrder() {
  alert("Custom order feature coming soon!");
}

function order(product) {
  alert("You selected: " + product);
}

function toggleMenu() {
  const nav = document.getElementById("nav");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}
