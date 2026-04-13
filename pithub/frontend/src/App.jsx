import { useEffect, useState } from "react";
import { fetchStorageFiles } from "../backend/storage.js";
import './App.css'

export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStorageFiles()
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>PitHub Storage Files</h1>
      {loading && <p>Loading files...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && files.length === 0 && <p>No files found.</p>}
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}