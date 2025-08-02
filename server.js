import express from 'express';             
const app = express();

const PORT = 5500;
const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY || '7py-p15q80GaspUWksKqXQ-eJWqvb7OB_mFo-b9Ol4U';

app.use(express.static('public'));
app.use(express.json());

app.get('/api/overfishing-images', async (_, res) => {
  try {
    const u = `https://api.unsplash.com/search/photos?query=overfishing&per_page=5&client_id=${UNSPLASH_ACCESS_KEY}`;
    const r = await fetch(u);
    if (!r.ok) throw new Error(r.status);
    res.json(await r.json());
  } catch (e) {
    console.error('Unsplash overfishing ✖', e);
    res.status(500).json({ error: 'Failed to fetch overfishing images' });
  }
});

app.get('/api/pollution-images', async (_, res) => {
  try {
    const u = `https://api.unsplash.com/search/photos?query=marine+pollution&per_page=5&client_id=${UNSPLASH_ACCESS_KEY}`;
    const r = await fetch(u);
    if (!r.ok) throw new Error(r.status);
    res.json(await r.json());
  } catch (e) {
    console.error('Unsplash pollution ✖', e);
    res.status(500).json({ error: 'Failed to fetch pollution images' });
  }
});

app.get('/api/species-sightings', async (req, res) => {
  const { from, to } = req.query;
  const start = Number(from);
  const end = Number(to);
  if (isNaN(start) || isNaN(end) || start > end) {
    return res.status(400).json({ error: 'Invalid year range' });
  }

  try {
    const counts = {};
    for (let year = start; year <= end; year++) {
      /* query one calendar year at a time */
      const url = `https://api.obis.org/v3/occurrence?startdate=${year}-01-01&enddate=${year}-12-31&size=0`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      counts[year] = d.total ?? 0;
    }
    res.json(counts);
  } catch (e) {
    console.error('OBIS ✖', e);
    res.status(500).json({ error: 'Failed to fetch OBIS data' });
  }
});

app.listen(PORT, () => console.log(`🌊  http://localhost:${PORT}`));