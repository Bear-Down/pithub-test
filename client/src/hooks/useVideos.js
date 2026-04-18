import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const storageRef = ref(storage, "/");
        const result = await listAll(storageRef);
        const fileData = await Promise.all(
          result.items.map(async (item) => ({
            name: item.name,
            url: await getDownloadURL(item),
          }))
        );
        setVideos(fileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return { videos, loading, error };
}