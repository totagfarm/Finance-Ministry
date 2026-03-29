import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
let distPath = path.join(__dirname, 'apps/web/dist');

// Fallback to root dist if apps/web/dist is not found
if (!fs.existsSync(distPath)) {
  distPath = path.join(__dirname, 'dist');
}

console.log(`Current __dirname: ${__dirname}`);
try {
  if (fs.existsSync(distPath)) {
    console.log(`dist folder found at ${distPath}! Contents: ${fs.readdirSync(distPath)}`);
  } else {
    console.error(`dist folder NOT FOUND at ANY known location`);
    console.log(`Root contents: ${fs.readdirSync(__dirname)}`);
  }
} catch (e) {
  console.error(`Error checking paths: ${e.message}`);
}

app.use(express.static(distPath));

app.get('*', (req, res) => {
  const fs = path.join(distPath, 'index.html');
  res.sendFile(fs);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
