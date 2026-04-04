import { Router, type IRouter } from "express";
import { eq, and, desc } from "drizzle-orm";
import { db, newsTable } from "@workspace/db";
import {
  ListNewsQueryParams,
  CreateNewsBody,
  UpdateNewsBody,
  GetNewsParams,
  UpdateNewsParams,
  DeleteNewsParams,
  ListNewsResponse,
  GetNewsResponse,
  UpdateNewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/news", async (req, res): Promise<void> => {
  const params = ListNewsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.status) {
    conditions.push(eq(newsTable.status, params.data.status));
  }

  let query = db
    .select()
    .from(newsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(newsTable.date));

  const results = params.data.limit
    ? await query.limit(params.data.limit)
    : await query;

  const mapped = results.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }));
  res.json(ListNewsResponse.parse(mapped));
});

router.post("/news", async (req, res): Promise<void> => {
  const parsed = CreateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [article] = await db.insert(newsTable).values(parsed.data).returning();
  res.status(201).json(GetNewsResponse.parse({ ...article, createdAt: article.createdAt.toISOString() }));
});

router.get("/news/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = GetNewsParams.safeParse({ slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [article] = await db.select().from(newsTable).where(eq(newsTable.slug, params.data.slug));
  if (!article) {
    res.status(404).json({ error: "News article not found" });
    return;
  }

  res.json(GetNewsResponse.parse({ ...article, createdAt: article.createdAt.toISOString() }));
});

router.put("/news/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = UpdateNewsParams.safeParse({ slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [article] = await db
    .update(newsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(newsTable.slug, params.data.slug))
    .returning();

  if (!article) {
    res.status(404).json({ error: "News article not found" });
    return;
  }

  res.json(UpdateNewsResponse.parse({ ...article, createdAt: article.createdAt.toISOString() }));
});

router.delete("/news/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = DeleteNewsParams.safeParse({ slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(newsTable).where(eq(newsTable.slug, params.data.slug));
  res.sendStatus(204);
});

export default router;
