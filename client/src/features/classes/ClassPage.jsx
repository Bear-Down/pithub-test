import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../lib/firebase';
import { doc, collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal';

const ClassPage = () => {
	const { classId } = useParams();
	const { user } = useAuth();
	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);
	const [classData, setClassData] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(null);

	// 1. Listen for the specific class document metadata
	useEffect(() => {
		if (!classId) return;

		const docRef = doc(db, 'classes', classId);
		const unsubscribe = onSnapshot(docRef, (docSnap) => {
		if (docSnap.exists()) {
			setClassData(docSnap.data());
		} else {
			console.error("No such class document found!");
			setClassData({ name: "Class Not Found" });
		}
		});

		return () => unsubscribe();
	}, [classId]);

	// 2. Listen for files in real-time from Firestore
	useEffect(() => {
		if (!classId) return;

		// Query files collection where classId matches the current route
		const q = query(
		collection(db, 'files'),
		where('classId', '==', classId)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
		const fetchedFiles = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
		setFiles(fetchedFiles);
		});

		return () => unsubscribe();
	}, [classId]);

	const handleAddClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
		try {
			setUploading(true);
			
			// 1. Upload raw file to Firebase Storage
			const storagePath = `classes/${classId}/${Date.now()}_${file.name}`;
			const storageRef = ref(storage, storagePath);
			const uploadResult = await uploadBytes(storageRef, file);
			
			// 2. Get the public Download URL
			const downloadURL = await getDownloadURL(uploadResult.ref);
			
			// 3. Save Metadata to Firestore
			const fileData = {
			name: file.name,
			url: downloadURL,
			storagePath: storagePath,
			classId: classId,
			ownerId: user?.uid || 'dev_user_789', // Fallback to mock ID
			type: file.type,
			createdAt: serverTimestamp()
			};

			await addDoc(collection(db, 'files'), fileData);

			console.log("File successfully uploaded and indexed!");
		} catch (error) {
			console.error("Firebase Upload Error:", error.code, error.message);
			if (error.code === 'storage/unauthorized') {
			alert("Permission Denied: Update your Firebase Storage Rules in the console.");
			} else {
			alert(`Upload failed: ${error.message}`);
			}
		} finally {
			setUploading(false);
			// Reset input so the same file can be selected again if deleted
			event.target.value = null;
		}
		}
	};

	const handleDeleteFile = async (file) => {
		try {
			// 1. Delete from Firebase Storage
			// Fallback to URL if storagePath isn't present in legacy documents
			const storageRef = file.storagePath ? ref(storage, file.storagePath) : ref(storage, file.url);
			await deleteObject(storageRef);
		} catch (error) {
			// If storage deletion fails (e.g. file missing), we still want to clean up the Firestore record
			console.warn("Storage deletion error (file may not exist):", error.message);
		}

		try {
			// 2. Delete Metadata from Firestore
			const fileRef = doc(db, 'files', file.id);
			await deleteDoc(fileRef);
			console.log("File metadata successfully removed!");
		} catch (error) {
			console.error("Firestore Deletion Error:", error);
			alert(`Failed to remove file record: ${error.message}`);
		}
	};

	return (
		<div className="container class-page">
		{/* Hidden input to handle file selection */}
		<input 
			type="file" 
			ref={fileInputRef} 
			style={{ display: 'none' }} 
			onChange={handleFileChange}
			accept="video/*,.pdf,.doc,.docx,.xls,.xlsx"
		/>

		<div className="class-page-header">
			<h1>{classData ? classData.name : 'Loading...'}</h1>
			<button className="add-content-btn" onClick={handleAddClick} disabled={uploading}>
			{uploading ? 'Uploading...' : '+ Add Video / Document'}
			</button>
		</div>

		<section className="class-content">
			<h2>Class Files & Videos</h2>
			<ul className="file-list">
			{files.length > 0 ? (
				files.map((file) => (
				<li key={file.id} className="file-item">
					<div className="file-info" style={{ flex: 1 }}>
						<a href={file.url} target="_blank" rel="noreferrer" className="file-link">
						{file.name}
						</a>
						<span className="file-type" style={{ fontSize: '0.8rem', color: '#888', marginLeft: '10px' }}>
						{file.type.split('/')[1]?.toUpperCase() || 'FILE'}
						</span>
					</div>
					{user?.uid === file.ownerId && (
						<button 
							className="delete-file-btn" 
							onClick={() => setConfirmDelete(file)}
							style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}
						>
							Delete
						</button>
					)}
				</li>
				))
			) : (
				<li className="file-item">
				<span className="file-link">No content uploaded yet for this class.</span>
				</li>
			)}
			</ul>
		</section>

		<ConfirmationModal 
			isOpen={!!confirmDelete}
			title="Remove File?"
			message={
				<>
					Are you sure you want to delete <strong>{confirmDelete?.name}</strong>? 
					This will permanently remove the file from PitHub.
				</>
			}
			confirmText="Confirm Delete"
			onConfirm={() => {
				handleDeleteFile(confirmDelete);
				setConfirmDelete(null);
			}}
			onCancel={() => setConfirmDelete(null)}
		/>

		<div className="status">
			<p>Class ID: {classId}</p>
		</div>
		</div>
	);
};

export default ClassPage;