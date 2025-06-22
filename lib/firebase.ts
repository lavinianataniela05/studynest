// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBcycfXAOdH1m-WufFpBGX3Sy26jnPm6XU",
//   authDomain: "studynest-d43f6.firebaseapp.com",
//   projectId: "studynest-d43f6",
//   storageBucket: "studynest-d43f6.firebasestorage.app",
//   messagingSenderId: "458776922303",
//   appId: "1:458776922303:web:0a28e9b49c29fabb179e0a",
//   measurementId: "G-BP6LTV3W3P"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// / export { analytics };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcycfXAOdH1m-WufFpBGX3Sy26jnPm6XU",
  authDomain: "studynest-d43f6.firebaseapp.com",
  projectId: "studynest-d43f6",
  storageBucket: "studynest-d43f6.firebasestorage.app",
  messagingSenderId: "458776922303",
  appId: "1:458776922303:web:0a28e9b49c29fabb179e0a",
  measurementId: "G-BP6LTV3W3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };