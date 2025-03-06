import { auth, db} from "./firebase.js"; // ✅ Keep only auth & db from Firebase
import { 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { 
    ref, get,update,remove
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// ✅ Fetch user details when authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("✅ User logged in:", user.uid);
        await fetchUserDetails();
    } else {
        console.warn("⚠️ No user logged in. Redirecting...");
        window.location.href = "login.html";
    }
});

// ✅ Fetch User Details from Realtime Database
async function fetchUserDetails() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert("No user logged in. Redirecting to login...");
            window.location.href = "login.html";
            return;
        }

        console.log("📌 Fetching user data from Realtime Database:", user.uid);

        const userRef = ref(db, "users/" + user.uid); // ✅ Use Realtime DB reference
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("userName").textContent = userData.name || "N/A";
            document.getElementById("userEmail").textContent = userData.email || "N/A";
            document.getElementById("userMobile").textContent = userData.mobile || "N/A";
            document.getElementById("userPassword").value = "******"; // Mask password
        } else {
            alert("❌ User data not found.");
        }
    } catch (error) {
        console.error("🔥 Error Fetching User Data:", error.message);
    }
}

// Function to open edit modal and pre-fill user details
window.openEditModal = function () {
    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";

    // Pre-fill modal with current values
    document.getElementById("edit-name").value = document.getElementById("userName").textContent;
    document.getElementById("edit-mobile").value = document.getElementById("userMobile").textContent;
};

// Function to close edit modal
window.closeEditModal = function () {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
};


// ✅ Logout Function
window.logout = async function () {
    try {
        await signOut(auth);
        alert("✅ Logged out successfully!");
        window.location.href = "login.html";
    } catch (error) {
        console.error("❌ Logout Error:", error.message);
    }
};


// ✅ Reset Password Function
window.resetPassword = async function () {
    const user = auth.currentUser;
    if (!user || !user.email) {
        alert("❌ No user logged in or email not found.");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, user.email);
        alert("📩 Password reset link sent to your email!");
    } catch (error) {
        console.error("❌ Error sending reset email:", error.message);
        alert("❌ Error: " + error.message);
    }
};


window.editUser = async function () {
    const user = auth.currentUser;
    if (!user) return;

    // Get new values from modal
    const newName = document.getElementById("edit-name").value.trim();
    const newMobile = document.getElementById("edit-mobile").value.trim();

    if (!newName || !newMobile) {
        alert("⚠️ Please enter valid details!");
        return;
    }

    try {
        const userRef = ref(db, "users/" + user.uid);
        await update(userRef, { name: newName, mobile: newMobile });

        alert("✅ User details updated!");
        closeEditModal();
        fetchUserDetails();
    } catch (error) {
        console.error("❌ Error updating user:", error.message);
    }
};

window.deleteUser = async function () {
    const user = auth.currentUser;
    if (!user) return;

    if (!confirm("⚠️ Are you sure you want to delete your account?")) return;

    try {
        const userRef = ref(db, "users/" + user.uid);
        await remove(userRef); // ✅ Use remove() for Realtime Database

        await user.delete(); // Delete user from Firebase Authentication
        alert("✅ Account deleted!");
        window.location.href = "signup.html";
    } catch (error) {
        console.error("❌ Error deleting user:", error.message);
        alert("❌ Error deleting user: " + error.message);
    }
};