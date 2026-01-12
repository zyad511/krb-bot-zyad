import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);

    const api = `https://rscripts.net/api/v2/scripts?page=1&orderBy=date&sort=desc`;
    const response = await fetch(api);
    const data = await response.json();

    const results = data.scripts.filter(s =>
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(q.toLowerCase()))
    );

    res.json(results.slice(0, 15));
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 KRB Site running on ${PORT}`);
});
