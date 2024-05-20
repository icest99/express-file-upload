import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 5000;

// multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Upload endpoint
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(422).json({ error: 'Please select a file' });
  }

  const uploadedFile = req.file;
  const fileName = uploadedFile.originalname;
  const fileSize = `${(uploadedFile.size / (1024 * 1024)).toFixed(2)}MB`;
  const fileExtension = path.extname(fileName).substring(1);

  res.status(200).json({
    fileName,
    size: fileSize,
    extension: fileExtension
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
