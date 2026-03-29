import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Resolve the distribution folder path
// In our mono-repo, Vite builds into apps/web/dist
let distPath = path.join(__dirname, 'apps/web/dist');

// Fallback to root dist if apps/web/dist is not found
if (!fs.existsSync(distPath)) {
  distPath = path.join(__dirname, 'dist');
}

console.log(`[Statutory Server] Serving from: ${distPath}`);

// Log availability for monitoring
if (fs.existsSync(distPath)) {
  console.log(`[Statutory Server] Dist verified. Files: ${fs.readdirSync(distPath).length}`);
} else {
  console.error(`[Statutory Server] CRITICAL: Dist missing at ${distPath}`);
}

app.use(express.static(distPath));

// Standard SPA Catch-all
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Statutory Error: Deployment artifacts not found.');
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[Statutory Server] Imperial Command Center active on port ${port}`);
});
