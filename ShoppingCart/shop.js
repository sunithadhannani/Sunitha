import { db, ref, get, set, push, remove, update } from "./firebase.js";

// Load Products for Users
async function loadShopProducts() {
    const productList = document.getElementById("productList");
    if (!productList) {
        console.error("🚨 Element with ID 'productList' not found!");
        return;
    }
    productList.innerHTML = "";

    const snapshot = await get(ref(db, "products"));
    if (snapshot.exists()) {
        const products = snapshot.val();
        Object.keys(products).forEach((key) => {
            const product = products[key];

            const productDiv = document.createElement("div");
            productDiv.id = `product-${key}`;

            productDiv.innerHTML = `
                <img src="${product.imageUrl}" style="width: 100px; height: 100px;">
                <p><strong>${product.name}</strong> - ₹${product.price}</p>
                <p>${product.description}</p>
                <p>📦 Available Stock: ${product.quantity}</p>
                <button onclick="addToCart('${key}', '${product.name}', ${product.price}, ${product.quantity}, '${product.imageUrl}')">🛒 Add to Cart</button>
                <button onclick="purchaseProduct('${key}', '${product.name}', ${product.price}, 1, '${product.imageUrl}')">💳 Purchase</button>
            `;

            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>No products found.</p>";
    }
}

// ✅ Add to Cart
window.addToCart = async function (id, name, price, stock, imageUrl) {
    const cartSnapshot = await get(ref(db, "cart"));
    let cartItemKey = null;
    let existingQuantity = 0;

    if (cartSnapshot.exists()) {
        const cartItems = cartSnapshot.val();
        Object.keys(cartItems).forEach((key) => {
            if (cartItems[key].id === id) {
                cartItemKey = key;
                existingQuantity = cartItems[key].quantity;
            }
        });
    }

    if (cartItemKey) {
        await update(ref(db, `cart/${cartItemKey}`), { quantity: existingQuantity + 1 });
    } else {
        const cartRef = push(ref(db, "cart"));
        await set(cartRef, { id, name, price, quantity: 1, imageUrl });
    }

    alert("🛒 Product added to cart!");
    updateCartDisplay(); // ✅ Update cart UI after adding
};

// ✅ Purchase Product
window.purchaseProduct = async function (id, name, price) {
    const productRef = ref(db, `products/${id}`);
    const productSnapshot = await get(productRef);

    if (!productSnapshot.exists()) {
        alert("❌ Product not found!");
        return;
    }

    const product = productSnapshot.val();

    if (product.quantity <= 0) {
        alert("❌ Out of stock!");
        return;
    }

    await push(ref(db, "purchases"), { id, name, price, quantity: 1, date: new Date().toISOString(), imageUrl: product.imageUrl });

    // Reduce stock after purchase
    await update(productRef, { quantity: product.quantity - 1 });

    alert("💳 Purchase successful!");
    loadShopProducts(); // ✅ Refresh product list
};

// ✅ Remove Item from Cart
window.removeFromCart = async function (id) {
    await remove(ref(db, `cart/${id}`));
    alert("🗑️ Removed from Cart!");
    updateCartDisplay();
};

// ✅ Update Cart Display
async function updateCartDisplay() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    const cartSnapshot = await get(ref(db, "cart"));
    if (!cartSnapshot.exists()) {
        cartList.innerHTML = "<p>🛒 Cart is empty.</p>";
        return;
    }

    const cart = cartSnapshot.val();
    Object.keys(cart).forEach((key) => {
        const item = cart[key];
        cartList.innerHTML += `
            <div style="border: 1px solid #ddd; padding: 10px; margin: 10px; border-radius: 5px;">
                <img src="${item.imageUrl}" style="width: 50px; height: 50px;">
                <p><strong>${item.name}</strong> - ₹${item.price} (x${item.quantity})</p>
                <button onclick="removeFromCart('${key}')">❌ Remove</button>
                <button onclick="purchaseProduct('${key}', '${item.name}', ${item.price}, ${item.quantity}, '${item.imageUrl}')">💳 Purchase</button>
            </div>
        `;
    });
}

//✅ Prevent Checkout if Cart is Empty
document.getElementById("checkoutBtn").addEventListener("click", async function () {
    const cartSnapshot = await get(ref(db, "cart"));
    if (!cartSnapshot.exists()) {
        alert("❌ Your cart is empty!");
        return;
    }

    alert("✅ Proceeding to Checkout...");
});

// ✅ Load Shop Products and Cart on Page Load
document.addEventListener("DOMContentLoaded", function () {
    loadShopProducts();
    updateCartDisplay();
});