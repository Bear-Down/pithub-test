import { fetchStorageFiles } from "./storage.js";

const listElement = document.getElementById("file-list");
const statusElement = document.getElementById("status");

async function init() {
  if (!listElement || !statusElement) return;

  try {
    const files = await fetchStorageFiles();
    statusElement.style.display = "none";

    if (files.length === 0) {
      listElement.innerHTML = "<li>No files found.</li>";
      return;
    }

    listElement.innerHTML = files
      .map(
        (file) => `
      <li class="file-item"><a href="${file.url}" target="_blank" class="file-link">${file.name}</a></li>
    `
      )
      .join("");
  } catch (err) {
    statusElement.textContent = "Error loading files: " + err.message;
    statusElement.style.color = "red";
  }
}

init();