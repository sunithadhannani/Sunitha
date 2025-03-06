// ✅ Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    signOut
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get,  
    update, 
    remove 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgQ6UOPN4Lrs3BYZuEa4GTFPxSBiIZk6I",
    authDomain: "crudfirebase-f9371.firebaseapp.com",
    databaseURL: "https://crudfirebase-f9371-default-rtdb.firebaseio.com/",
    projectId: "crudfirebase-f9371",
    storageBucket: "crudfirebase-f9371.appspot.com",
    messagingSenderId: "198250032871",
    appId: "1:198250032871:web:f04eb65856883f5650bc42",
    measurementId: "G-BH2WZND4YQ"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ✅ Ensure session persists during page reload
setPersistence(auth, browserSessionPersistence).catch((error) => {
    console.error("⚠️ Persistence Error:", error.message);
});

// ✅ User Signup Function
export async function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const mobile = document.getElementById("signup-mobile").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

    // Validate input
    if (!name || !email || !mobile || !password) {
        alert("⚠️ All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
    }

    try {
        // ✅ Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ User Created: ", user);

        // ✅ Store user details (excluding password for security)
        await set(ref(db, `users/${user.uid}`), {
            name: name,
            email: email,
            mobile: mobile
        });

        alert("✅ Signup successful! Redirecting to login...");
        window.location.href = "login.html";
    } catch (error) {
        console.error("❌ Signup Error: ", error.message);
        alert(`❌ Signup Failed: ${error.message}`);
    }
}

// ✅ User Login Function
export async function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        alert("⚠️ Please enter both email and password!");
        return;
    }

    try {
        // ✅ Sign in user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ Login successful: ", user);
        alert("✅ Login successful!");

        // Redirect to user details page
        window.location.href = "userDetails.html";
    } catch (error) {
        console.error("❌ Login Error: ", error.code, error.message);
        alert(`❌ Login Failed: ${error.message}`);
    }
}

// ✅ Logout Function
export async function logout() {
    try {
        await signOut(auth);
        alert("✅ Successfully logged out!");
        window.location.href = "login.html";
    } catch (error) {
        console.error("❌ Logout Error: ", error.message);
    }
}

// ✅ Export Firebase instances and utilities
export { auth, db, ref, get, update, remove };
