import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug log to verify environment variables are loading
console.log("Vite Env Check - Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("Vite Env Check - Storage Bucket:", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);

// Catch empty env vars early
const missingVars = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error(`Firebase Config Error: The following keys are missing from your .env file: ${missingVars.join(", ")}`);
}

// Ensure storageBucket is present in the config to register the service
const finalConfig = {
  ...firebaseConfig,
  storageBucket: firebaseConfig.storageBucket || "pithub-test-kd.firebasestorage.app"
};

const app = initializeApp(finalConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// // Only initialize storage if the bucket is defined to avoid "Service storage not available"
// console.log("storageBucket:", JSON.stringify(firebaseConfig.storageBucket));
// // const storage = firebaseConfig.storageBucket ? getStorage(app) : null;
// const storage = getStorage(app, "gs://pithub-test-kd.firebasestorage.app");

export { db, storage };