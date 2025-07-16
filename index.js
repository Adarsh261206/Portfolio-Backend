import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });

  // Save to client folder (use __dirname for correct path)
  const clientDir = path.join(__dirname, 'client');
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir);
  }
  const timestamp = Date.now();
  const filename = `contact_${timestamp}.json`;
  const filePath = path.join(clientDir, filename);
  const data = { name, email, message, timestamp };
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error saving contact info:', err);
      return res.status(500).json({ success: false, message: 'Failed to save contact info.' });
    }
    res.json({ success: true, message: 'Contact form received and saved!' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 