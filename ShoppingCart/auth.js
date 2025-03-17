import { auth, db } from "./firebase.js";
import { ref, get, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
// ✅ Login Functionality
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const errorMsg = document.getElementById("error-msg");

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                if (email === "admin@gmail.com") {
                    alert("✅ Admin login successful!");
                    window.location.href = "admin.html"; // Redirect admin
                } else {
                    // Check if the user exists in the database
                    const usersRef = ref(db, "users/" + user.uid);
                    const snapshot = await get(usersRef);

                    if (snapshot.exists()) {
                        alert("✅ User login successful!");
                        window.location.href = "shop.html"; // Redirect user
                    } else {
                        errorMsg.textContent = "❌ User not found!";
                    }
                }
            } catch (error) {
                errorMsg.textContent = "🔥 Login failed:User credentials are incorrect ";
            }
        });
    }
});
// ✅ Logout Functionality
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async function () {
            try {
                await signOut(auth);
                localStorage.clear();
                sessionStorage.clear();
                alert("✅ Logged Out Successfully!");
                window.location.href = "login.html"; // Redirect to login
            } catch (error) {
                console.error("Logout Error:", error.message);
                alert("❌ Logout failed. Please try again.");
            }
        });
    }
});
// ✅ Signup Functionality
document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signup-btn");

    if (signupBtn) {
        signupBtn.addEventListener("click", async () => {
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const errorMsg = document.getElementById("signup-error-msg");

            if (!username || !email || !password) {
                errorMsg.textContent = "⚠️ All fields are required!";
                return;
            }

            try {
                // ✅ Create user in Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // ✅ Store user details in Firebase Database
                await set(ref(db, `users/${user.uid}`), {
                    username: username,
                    email: email
                });

                alert("✅ Signup successful! Redirecting to login...");
                window.location.href = "login.html"; // Redirect to login page
            } catch (error) {
                errorMsg.textContent = "🔥 Signup failed: " + error.message;
            }
        });
    }
});