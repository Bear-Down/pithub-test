import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js"; // Correctly references local backend config

/**
 * Fetches file metadata and download URLs from Firebase Storage.
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function fetchStorageFiles() {
  try {
    const storageRef = ref(storage, "/");
    const result = await listAll(storageRef);

    return await Promise.all(
      result.items.map(async (item) => ({
        name: item.name,
        url: await getDownloadURL(item),
      }))
    );
  } catch (error) {
    console.error("Firebase Storage Error:", error);
    throw error;
  }
}