import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe5CyJ3mKEfbujBLD17V85pJWW3UNWFvk",
  authDomain: "pithub-test-kd.firebaseapp.com",
  projectId: "pithub-test-kd",
  storageBucket: "pithub-test-kd.firebasestorage.app",
  messagingSenderId: "829590117117",
  appId: "1:829590117117:web:ca4b8fbaa8426dee1ebc94"
};

// Catch empty env vars early
const missingVars = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.warn(`Firebase Config Warning: Missing from .env: ${missingVars.join(", ")}`);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "lewisu.edu"
});
export { db, storage, auth, provider};