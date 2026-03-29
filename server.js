import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, 'dist');

console.log(`Current __dirname: ${__dirname}`);
try {
  const fs = await import('fs');
  if (fs.existsSync(distPath)) {
    console.log(`dist folder found! Contents: ${fs.readdirSync(distPath)}`);
  } else {
    console.error(`dist folder NOT FOUND at ${distPath}`);
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
