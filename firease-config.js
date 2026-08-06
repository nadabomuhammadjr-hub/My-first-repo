/* ============================================
   FIREBASE CONFIG
   ============================================
   Replace the values below with YOUR OWN config
   from Firebase Console > Project Settings > General
   > Your apps > SDK setup and configuration.
   ============================================ */

const firebaseConfig = {
    apiKey: "1PRO3322",
    authDomain: "Cyber-app.firebaseapp.com",
    projectId: "programmer-cyber-app",
    storageBucket: "programmer-cyber-security.appspot.com",
    messagingSenderId: "2348164002794",
    appId: "8jn8ad6+fp%t2Wt"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
