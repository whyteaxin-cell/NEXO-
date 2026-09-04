import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuRjtS4FrCGCuMquVtxSN79mxMlzZ2iEw",
  authDomain: "nexo-e05a1.firebaseapp.com",
  projectId: "nexo-e05a1",
  storageBucket: "nexo-e05a1.firebasestorage.app",
  messagingSenderId: "40667064813",
  appId: "1:40667064813:web:c67c0e0ef01cafae335fe4",
  measurementId: "G-9HYD99CS5C"
}; const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);function showTab(id,btn){document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active')}function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}function demoLogin(){const v=document.getElementById('loginId').value.trim();toast(v?'Demo login ready — backend comes next.':'Enter your email or phone number.')}function demoSignup(){toast('Account creation UI ready — secure OTP backend comes next.')}function otp(){toast('OTP flow UI will be connected to Firebase in the next step.')}