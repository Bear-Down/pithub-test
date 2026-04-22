import { auth, provider } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const allowedDomain = "lewisu.edu";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email || !user.email.endsWith(`@${allowedDomain}`)) {
        alert("Only @lewisu.edu emails allowed");
        await signOut(auth);
        return;
      }

      console.log("Logged in:", user.email);

      // redirect
      navigate("/classes");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
}