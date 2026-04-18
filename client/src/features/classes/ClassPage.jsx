import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../lib/firebase';
import { doc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';

const ClassPage = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [classData, setClassData] = useState(null);
  const [uploading, setUploading] = useState(false);

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
        const storageRef = ref(storage, `classes/${classId}/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        
        // 2. Get the public Download URL
        const downloadURL = await getDownloadURL(uploadResult.ref);
        
        // 3. Save Metadata to Firestore
        const fileData = {
          name: file.name,
          url: downloadURL,
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
                <a href={file.url} target="_blank" rel="noreferrer" className="file-link">
                  {file.name}
                </a>
                <span className="file-type" style={{ fontSize: '0.8rem', color: '#888' }}>
                  {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                </span>
              </li>
            ))
          ) : (
            <li className="file-item">
              <span className="file-link">No content uploaded yet for this class.</span>
            </li>
          )}
        </ul>
      </section>

      <div className="status">
        <p>Class ID: {classId}</p>
      </div>
    </div>
  );
};

export default ClassPage;