// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPexx14XI0jVr1dl7Mi0fZMPH64tKV_Gg",
  authDomain: "single-page-crud-app.firebaseapp.com",
  projectId: "single-page-crud-app",
  storageBucket: "single-page-crud-app.firebasestorage.app",
  messagingSenderId: "755446518302",
  appId: "1:755446518302:web:9ffd831fac4eff5083d40f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;