import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "..", "crane-corp", "public", "uploads");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch {
  // read-only filesystem (e.g. Vercel serverless) — uploads disabled
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

async function applyRoundedCorners(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.filename).toLowerCase();
  const base = path.basename(file.filename, ext);
  const outputFilename = `${base}.png`;
  const inputPath = file.path;
  const outputPath = path.join(uploadsDir, outputFilename);

  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const mask = Buffer.from(
    `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}"/></svg>`
  );

  // Write to a temp file first to avoid read/write conflict on same path (PNG input)
  const tmpPath = inputPath + ".rnd";
  await image
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(tmpPath);

  fs.renameSync(tmpPath, outputPath);
  if (inputPath !== outputPath) fs.unlinkSync(inputPath);

  return `/uploads/${outputFilename}`;
}

async function roundCornersIfJpeg(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.filename).toLowerCase();
  const isJpeg = ext === ".jpg" || ext === ".jpeg";
  if (!isJpeg) return `/uploads/${file.filename}`;
  return applyRoundedCorners(file);
}

const router: IRouter = Router();

router.post("/upload", upload.single("file"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  try {
    const rounded = req.query.rounded === "true";
    const url = rounded
      ? await applyRoundedCorners(req.file)
      : await roundCornersIfJpeg(req.file);
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
