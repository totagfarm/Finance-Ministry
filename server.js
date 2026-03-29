import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Resolve the root distribution folder for verified assets
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// standard SPA Catch-all route
// Ensures all client-side routes (finance, procurement, aid) are correctly served
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`Statutory Error: Deployment artifacts not found at ${indexPath}`);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[Statutory Server] Imperial Gateway established on port ${port}`);
});
