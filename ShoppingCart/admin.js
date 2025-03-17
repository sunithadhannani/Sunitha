import { storage, db, ref, set, push, remove, get, update } from "./firebase.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

document.addEventListener("DOMContentLoaded", function () {
    const addProductBtn = document.getElementById("addProductBtn");
    const nameInput = document.getElementById("productName");
    const priceInput = document.getElementById("productPrice");
    const descInput = document.getElementById("productDescription");
    const quantityInput = document.getElementById("productQuantity");
    const imageInput = document.getElementById("productImage");
    const productList = document.getElementById("productList");

    let editingProductId = null;

    addProductBtn.addEventListener("click", async function () {
        await addOrUpdateProduct();
    });

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    async function addOrUpdateProduct() {
        const name = nameInput.value.trim();
        const price = parseFloat(priceInput.value.trim());
        const description = descInput.value.trim();
        const quantity = parseInt(quantityInput.value.trim());

        if (!name || isNaN(price) || !description || isNaN(quantity) || quantity <= 0) {
            alert("❌ Please fill all fields correctly!");
            return;
        }

        let imageUrl = "";
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            imageUrl = await convertToBase64(file);  // Convert image to Base64
        } else {
            // Default Base64 placeholder image (transparent 1x1 pixel)
            imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88hIAAFcA5TFlDQQAAAAASUVORK5CYII=";
        }

        const snapshot = await get(ref(db, "products"));
        let productExists = false;
        let existingProductKey = null;
        let existingQuantity = 0;
        let existingImageUrl = "";

        if (snapshot.exists()) {
            const products = snapshot.val();
            Object.keys(products).forEach((key) => {
                if (products[key].name === name) {
                    productExists = true;
                    existingProductKey = key;
                    existingQuantity = parseInt(products[key].quantity);
                    existingImageUrl = products[key].imageUrl;
                }
            });
        }

        if (editingProductId) {
            await update(ref(db, `products/${editingProductId}`), { name, price, description, quantity, imageUrl });
            alert("✅ Product updated!");
            addProductBtn.innerText = "Add Product";
            editingProductId = null;
        } else if (productExists) {
            // If product exists, update only quantity but keep the original image
            await update(ref(db, `products/${existingProductKey}`), { 
                quantity: existingQuantity + quantity, 
                imageUrl: existingImageUrl || imageUrl 
            });
            alert("✅ Quantity updated!");
        } else {
            const newProductRef = push(ref(db, "products"));
            await set(newProductRef, { name, price, description, quantity, imageUrl });
            alert("✅ Product added!");
        }

        // Clear input fields
        nameInput.value = "";
        priceInput.value = "";
        descInput.value = "";
        quantityInput.value = "";
        imageInput.value = null;  // Correct way to clear file input

        loadProducts();
    }

    async function loadProducts() {
    productList.innerHTML = "";
    const snapshot = await get(ref(db, "products"));

    if (snapshot.exists()) {
        const products = snapshot.val();
        Object.keys(products).forEach((key) => {
            const product = products[key];

            // Add MIME type prefix if it's a Base64 string
            let imageUrl = product.imageUrl || "";
            if (imageUrl.startsWith("/9j/") || imageUrl.startsWith("iVBOR")) {
                imageUrl = `data:image/png;base64,${imageUrl}`;
            }

            const productDiv = document.createElement("div");
            productDiv.className = "product-card";
            productDiv.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}" style="width: 100px; height: 100px;">
                <p><strong>${product.name}</strong> - ₹${product.price}</p>
                <p>${product.description}</p>
                <p>📦 Stock: ${product.quantity}</p>
                <button onclick="editProduct('${key}', '${product.name}', ${product.price}, '${product.description}', ${product.quantity})">✏️ Edit</button>
                <button onclick="deleteProduct('${key}')">🗑️ Delete</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>No products found.</p>";
    }
}


    window.editProduct = function (id, name, price, description, quantity) {
        nameInput.value = name;
        priceInput.value = price;
        descInput.value = description;
        quantityInput.value = quantity;
        editingProductId = id;
        addProductBtn.innerText = "Update Product";
    };

    window.deleteProduct = async function (id) {
        if (confirm("⚠️ Are you sure you want to delete this product?")) {
            await remove(ref(db, `products/${id}`));
            alert("🗑️ Product deleted!");
            loadProducts();
        }
    };

    loadProducts();
});
