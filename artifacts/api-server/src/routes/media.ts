import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { eq } from "drizzle-orm";
import { db, mediaTable } from "@workspace/db";
import {
  ListMediaQueryParams,
  CreateMediaBody,
  DeleteMediaParams,
  ListMediaResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Multer konfigürasyonu: frontend'in public/uploads klasörüne kaydet
const uploadDir = path.join(process.cwd(), "../../crane-corp/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/media", async (req, res): Promise<void> => {
  const params = ListMediaQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const items = params.data.type
    ? await db.select().from(mediaTable).where(eq(mediaTable.type, params.data.type))
    : await db.select().from(mediaTable);

  const mapped = items.map((m) => ({ ...m, thumbnail: m.thumbnail ?? null, createdAt: m.createdAt.toISOString() }));
  res.json(ListMediaResponse.parse(mapped));
});

router.post("/media", async (req, res): Promise<void> => {
  const parsed = CreateMediaBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [item] = await db.insert(mediaTable).values(parsed.data).returning();
  res.status(201).json({ ...item, thumbnail: item.thumbnail ?? null, createdAt: item.createdAt.toISOString() });
});

router.delete("/media/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteMediaParams.safeParse({ id: rawId });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(mediaTable).where(eq(mediaTable.id, params.data.id));
  res.sendStatus(204);
});

// Upload endpoint: tek dosya yükleme
router.post("/upload", upload.single("file"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  // Dosya yolunu döndür
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
