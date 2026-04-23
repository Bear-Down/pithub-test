import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase"; // Import db from firebase.js

export function useVideos() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Create a query to get recent files from Firestore
		const filesQuery = query(
			collection(db, "files"),
			orderBy("createdAt", "desc"), // Order by creation time, newest first
			limit(10) // Limit to the 10 most recent files
		);

		const unsubscribe = onSnapshot(filesQuery, 
			(snapshot) => {
				const fetchedFiles = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setVideos(fetchedFiles); // Renamed "setVideos" to "setFiles"
				setLoading(false);
			}, 
			(err) => {
				console.error("Error fetching recent files from Firestore:", err);
				setError(err.message);
				setLoading(false);
			}
		);

		return () => unsubscribe(); // Cleanup the listener
	}, []);

	return { videos, loading, error };
}