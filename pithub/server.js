import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

// Single Page Application (SPA) Catch-all
app.get('*', (req, res) => {
  // If the request contains a dot (e.g., .js, .html, .png) and reached here,
  // it means express.static didn't find it in the dist folder.
  // We should return a 404 instead of serving index.html to avoid confusing behavior.
  if (req.path.includes('.')) {
    res.status(404).send('Not Found');
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.get("/ping", (req, res) => {
    console.log("Ping Request Received");
    res.json("PitHub Server is up and running");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
