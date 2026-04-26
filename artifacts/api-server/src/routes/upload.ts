import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype);
    if (ok) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const CORNER_RADIUS = 50;

async function roundCornersIfJpeg(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.filename).toLowerCase();
  const isJpeg = ext === ".jpg" || ext === ".jpeg";

  if (!isJpeg) {
    return `/uploads/${file.filename}`;
  }

  const inputPath = file.path;
  const pngFilename = path.basename(file.filename, ext) + ".png";
  const outputPath = path.join(uploadsDir, pngFilename);

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const r = CORNER_RADIUS;

  const mask = Buffer.from(
    `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${r}" ry="${r}"/></svg>`
  );

  await image
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(outputPath);

  fs.unlinkSync(inputPath);

  return `/uploads/${pngFilename}`;
}

const router: IRouter = Router();

router.post("/upload", upload.single("file"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  try {
    const url = await roundCornersIfJpeg(req.file);
    const filename = path.basename(url);
    res.status(201).json({ url, filename, originalName: req.file.originalname, size: req.file.size });
  } catch (err) {
    res.status(500).json({ error: "Image processing failed" });
  }
});

router.post("/upload/multiple", upload.array("files", 20), async (req, res): Promise<void> => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    res.status(400).json({ error: "No files uploaded" });
    return;
  }
  try {
    const urls = await Promise.all(
      files.map(async (f) => {
        const url = await roundCornersIfJpeg(f);
        return { url, filename: path.basename(url) };
      })
    );
    res.status(201).json(urls);
  } catch (err) {
    res.status(500).json({ error: "Image processing failed" });
  }
});

export default router;
