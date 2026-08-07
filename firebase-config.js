/* ============================================
   FIREBASE CONFIG
   ============================================
   Replace the values below with YOUR OWN config
   from Firebase Console > Project Settings > General
   > Your apps > SDK setup and configuration.
   ============================================ */

const firebaseConfig = {
    apiKey: "AIzaSyDOCAbC123dEf456GhI789jklMn0",
    authDomain: "Cyber-app.firebase.com,firebase.com.",
    projectId: "programmer-cyber-app",
    storageBucket: "programmer-cyber-app.appspot.com",
    messagingSenderId: "612091317777",
    appId: "1:61209131:web:p6r1o2g0r9a1m3m1e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
