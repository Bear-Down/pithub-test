import React, { useState, useEffect } from 'react';
import ClassCard from './ClassCard';
import { useAuth } from '../../context/AuthContext';
import VideoList from '../videos/VideoList';
import '../../styles/style.css';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, addDoc, where, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ClassList = () => {
	const { user } = useAuth();
	const [classes, setClasses] = useState([]);

	// Fetch classes from Firestore
	useEffect(() => {
		if (!user?.uid) return;

		// Filter query so users only see classes where they are the owner
		const q = query(
			collection(db, 'classes'), 
			where('ownerId', '==', user.uid)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
		const fetchedClasses = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
		setClasses(fetchedClasses);
		});
		return () => unsubscribe();
	}, [user?.uid]);

	const handleCreateClass = async () => {
		const name = prompt("Enter class name:");
		if (name) {
			await addDoc(collection(db, 'classes'), {
				name: name,
				ownerId: user.uid,
				createdAt: serverTimestamp()
			});
		}
	};

	const handleEditClass = async (classData) => {
		const newName = prompt("Edit class name:", classData.name);
		if (newName && newName !== classData.name) {
			try {
				const classRef = doc(db, 'classes', classData.id);
				await updateDoc(classRef, { name: newName });
			} catch (error) {
				console.error("Error updating class:", error);
			}
		}
	};

	const handleDeleteClass = async (id) => {
		if (window.confirm("Are you sure you want to delete this class?")) {
			try {
				await deleteDoc(doc(db, 'classes', id));
			} catch (error) {
				console.error("Error deleting class:", error);
			}
		}
	};

	return (
		<div className="home-wrapper">
			{/* Top Section: Recent Files/Videos */}
			<div className="container">
				<h1>Recent Uploads</h1>
				<VideoList />
			</div>

			{/* Bottom Section: Horizontal Classes Grid */}
			<div className="classes-section">
				<div className="classes-header">
				<h2>Your Classes</h2>
				<button onClick={handleCreateClass}>+ Create Class</button>
				</div>
				{classes.length > 0 ? (
				<div className="classes-horizontal-scroll">
					{classes.map((item) => (
					<ClassCard 
						key={item.id} 
						classData={item} 
						onEdit={handleEditClass}
						onDelete={handleDeleteClass}
					/>
					))}
				</div>
				) : (
				<div className="status">
					<p>No classes created yet. Click the button above to get started!</p>
				</div>
				)}
			</div>
		</div>
	);
};

export default ClassList;