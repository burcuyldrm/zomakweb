import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, mediaTable } from "@workspace/db";
import {
  ListMediaQueryParams,
  CreateMediaBody,
  DeleteMediaParams,
  ListMediaResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

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

export default router;
