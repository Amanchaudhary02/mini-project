import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// In-memory "database"
let files = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send("Notes backend running 🚀");
});

// Upload notes
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const { title, description, subject, semester, course, type } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = {
      id: files.length + 1,
      title,
      description,
      subject,
      semester,
      course,
      type,
      fileUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      uploadedAt: new Date().toISOString(),
      downloads: 0,
    };

    files.unshift(newFile);
    res.json({ message: "Uploaded successfully", file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all notes
app.get("/api/files", (req, res) => {
  res.json(files);
});

// Increase download count
app.post("/api/files/:id/download", (req, res) => {
  const id = parseInt(req.params.id);
  const file = files.find((f) => f.id === id);
  if (!file) return res.status(404).json({ message: "File not found" });
  file.downloads += 1;
  res.json({ message: "Download counted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
