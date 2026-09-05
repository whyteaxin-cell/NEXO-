// NEXO Firebase Authentication

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAOT3xWRyDd_aQ1_DmfEaK6D8k51okD80",
  authDomain: "nexo-e05a1.firebaseapp.com",
  projectId: "nexo-e05a1",
  storageBucket: "nexo-e05a1.firebasestorage.app",
  messagingSenderId: "40667064813",
  appId: "1:40667064813:web:c67c0e0ef01cafae335fe4"
};


// Start Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Toast message
function toast(message) {
  const box = document.getElementById("toast");

  if (box) {
    box.textContent = message;
    box.classList.add("show");

    setTimeout(() => {
      box.classList.remove("show");
    }, 3000);
  } else {
    alert(message);
  }
}


// Tab switching
window.showTab = function(tabName, button) {

  document.querySelectorAll(".panel").forEach(panel => {
    panel.hidden = true;
  });

  const selected = document.getElementById(tabName);

  if (selected) {
    selected.hidden = false;
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }
};


// Email / Password Login
window.demoLogin = async function() {

  const emailOrPhone = document.getElementById("loginId")?.value.trim();
  const password = document.getElementById("loginPass")?.value;

  if (!emailOrPhone || !password) {
    toast("Enter your email and password");
    return;
  }

  // Firebase Email/Password login
  if (!emailOrPhone.includes("@")) {
    toast("For now, please use your email address");
    return;
  }

  try {

    const result = await signInWithEmailAndPassword(
      auth,
      emailOrPhone,
      password
    );

    toast("Welcome back, " + (result.user.displayName || "to NEXO") + " 🎉");

  } catch (error) {

    console.error(error);

    if (error.code === "auth/invalid-credential") {
      toast("Wrong email or password");
    } else if (error.code === "auth/user-not-found") {
      toast("Account not found");
    } else if (error.code === "auth/too-many-requests") {
      toast("Too many attempts. Try again later.");
    } else {
      toast("Login failed. Please try again.");
    }
  }
};


// Create account
window.demoSignup = async function() {

  const inputs = document.querySelectorAll("#signup input");

  const name = inputs[0]?.value.trim();
  const username = inputs[1]?.value.trim();
  const email = inputs[2]?.value.trim();

  if (!name || !username || !email) {
    toast("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    toast("Enter a valid email address");
    return;
  }

  // Ask for password
  const password = prompt(
    "Create a password (minimum 6 characters):"
  );

  if (!password || password.length < 6) {
    toast("Password must be at least 6 characters");
    return;
  }

  try {

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name
    });

    toast("NEXO account created successfully 🎉");

  } catch (error) {

    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      toast("This email already has an account");
    } else if (error.code === "auth/invalid-email") {
      toast("Invalid email address");
    } else if (error.code === "auth/weak-password") {
      toast("Password is too weak");
    } else {
      toast("Account creation failed");
    }
  }
};


// Google Login
window.googleLogin = async function() {

  try {

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const user = result.user;

    toast(
      "Welcome to NEXO, " +
      (user.displayName || "friend") +
      " 🎉"
    );

    console.log("Google user:", user);

  } catch (error) {

    console.error(error);

    if (error.code === "auth/popup-closed-by-user") {
      toast("Google login cancelled");
    } else if (error.code === "auth/popup-blocked") {
      toast("Please allow popups for NEXO");
    } else {
    console.error("Google Login Error:", error);
    toast("Google Login Error: " + error.code);
}
  }
};


// Add Google button automatically
function addGoogleButton() {

  const loginPanel = document.getElementById("login");

  if (!loginPanel) return;

  if (document.getElementById("googleLoginBtn")) return;

  const button = document.createElement("button");

  button.id = "googleLoginBtn";
  button.className = "secondary";
  button.textContent = "Continue with Google";

  button.onclick = window.googleLogin;

  loginPanel.appendChild(button);
}


// Check login state
onAuthStateChanged(auth, user => {

  if (user) {

    console.log("Logged in:", user.email);

  } else {

    console.log("No user logged in");

  }
});


// Logout function
window.logout = async function() {

  try {

    await signOut(auth);

    toast("Logged out successfully");

  } catch (error) {

    console.error(error);
    toast("Logout failed");

  }
};


// Start
document.addEventListener("DOMContentLoaded", () => {

  addGoogleButton();

});