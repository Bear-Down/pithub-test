import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser && firebaseUser.email.endsWith("@lewisu.edu")) {
				setUser(firebaseUser);
			} else {
                // If they sign in with a non-Lewis account, force sign out immediately
                if (firebaseUser) signOut(auth);
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const logout = () => signOut(auth);

	const loginWithGoogle = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, logout, loginWithGoogle }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
