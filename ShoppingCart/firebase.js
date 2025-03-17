import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set, push, update, remove, get } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyDn3MJPU_45ng0Na1RHHh91w3HgVX5rlKc",
    authDomain: "shoppingcart-bdb3f.firebaseapp.com",
    databaseURL: "https://shoppingcart-bdb3f-default-rtdb.firebaseio.com",
    projectId: "shoppingcart-bdb3f",
    storageBucket: "shoppingcart-bdb3f.appspot.com",
    messagingSenderId: "140532921126",
    appId: "1:140532921126:web:803e904eb63005dbdc87e7"
};

// ✅ Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Export Services
export { db, ref, set, push, update, remove, get, auth, signInWithEmailAndPassword, storage };

export { signOut, onAuthStateChanged };