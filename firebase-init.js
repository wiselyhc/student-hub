// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEdSKTgVM3F_cycWFN5aoWiaHYhkvRoCA",
  authDomain: "decent-glazing-475914-p3.firebaseapp.com",
  projectId: "decent-glazing-475914-p3",
  storageBucket: "decent-glazing-475914-p3.firebasestorage.app",
  messagingSenderId: "922901182665",
  appId: "1:922901182665:web:83bec99021f51874fd3518",
  measurementId: "G-6C5PW0JVTM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore services globally available
// Your other scripts (like in index.html) can now use 'auth' and 'db'
const auth = firebase.auth();
const db = firebase.firestore();