import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Resolve the root distribution folder
const distPath = path.join(__dirname, 'dist');

console.log(`[Statutory Server] Serving from: ${distPath}`);

// Verify directory existence
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(`[Statutory Server] Dist folder found. Contents: ${files.length} items`);
} else {
  console.error(`[Statutory Server] CRITICAL: Dist missing at ${distPath}`);
  console.log(`[Statutory Server] ROOT listing: ${fs.readdirSync(__dirname)}`);
}

app.use(express.static(distPath));

// Catch-all route for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Statutory Error: Production artifacts missing.');
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[Statutory Server] Imperial Gateway established on port ${port}`);
});
