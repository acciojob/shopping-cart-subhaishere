// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart data
const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cartData.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(cartItem);
    total += item.price;
  });

  const totalItem = document.createElement("li");
  totalItem.textContent = `Total: $${total}`;
  cartList.appendChild(totalItem);
}

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find((product) => product.id === productId);
  cartData.push(productToAdd);
  sessionStorage.setItem("cart", JSON.stringify(cartData));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const index = cartData.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartData.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cartData));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cartData.length = 0;
  sessionStorage.removeItem("cart");
  renderCart();
}

// Add event listener for product list
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

// Add event listener for clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();