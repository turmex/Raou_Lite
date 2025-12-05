import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from dist in production, or public in dev
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'public/assets');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Use the original name or a specific name passed in the body
        cb(null, req.body.filename || file.originalname);
    }
});

const upload = multer({ storage: storage });

// API to get content
app.get('/content.json', (req, res) => {
    const contentPath = path.join(__dirname, 'public', 'content.json');
    fs.readFile(contentPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading content.json:', err);
            return res.status(500).json({ error: 'Failed to read content' });
        }
        res.json(JSON.parse(data));
    });
});

// API to save content
app.post('/api/save-content', (req, res) => {
    const contentPath = path.join(__dirname, 'public', 'content.json');
    const newContent = req.body;

    fs.writeFile(contentPath, JSON.stringify(newContent, null, 2), (err) => {
        if (err) {
            console.error('Error saving content.json:', err);
            return res.status(500).json({ error: 'Failed to save content' });
        }
        console.log('Content saved successfully');
        res.json({ success: true });
    });
});

// API to upload image
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log(`Image uploaded: ${req.file.path}`);
    res.json({ success: true, path: `/assets/${req.file.filename}` });
});

// Catch-all for SPA
app.get(/.*/, (req, res) => {
    // If request is for an API, return 404
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }

    // Check if dist/index.html exists (production)
    const distIndex = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(distIndex)) {
        return res.sendFile(distIndex);
    }

    // Fallback to public/index.html (dev) - though Vite usually handles this
    const publicIndex = path.join(__dirname, 'index.html');
    if (fs.existsSync(publicIndex)) {
        return res.sendFile(publicIndex);
    }

    res.status(404).send('Index file not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
