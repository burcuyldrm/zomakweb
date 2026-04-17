import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, categoriesTable, productsTable } from "@workspace/db";
import {
  CreateCategoryBody,
  UpdateCategoryBody,
  UpdateCategoryParams,
  DeleteCategoryParams,
  ListCategoriesResponse,
  UpdateCategoryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const cats = await db.select().from(categoriesTable).orderBy(categoriesTable.sortOrder);
  
  const withCounts = await Promise.all(
    cats.map(async (cat) => {
      const [row] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(productsTable)
        .where(eq(productsTable.categoryId, cat.id));
      return { ...cat, productCount: row?.count ?? 0 };
    })
  );

  res.json(ListCategoriesResponse.parse(withCounts));
});

router.post("/categories", async (req, res): Promise<void> => {
  const parsed = CreateCategoryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [cat] = await db.insert(categoriesTable).values(parsed.data).returning();
  res.status(201).json(UpdateCategoryResponse.parse({ ...cat, productCount: 0 }));
});

router.put("/categories/:id", async (req, res): Promise<void> => {
  const params = UpdateCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateCategoryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [cat] = await db
    .update(categoriesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(categoriesTable.id, params.data.id))
    .returning();

  if (!cat) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productsTable)
    .where(eq(productsTable.categoryId, cat.id));

  res.json(UpdateCategoryResponse.parse({ ...cat, productCount: row?.count ?? 0 }));
});

router.delete("/categories/:id", async (req, res): Promise<void> => {
  const params = DeleteCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(categoriesTable).where(eq(categoriesTable.id, params.data.id));
  res.sendStatus(204);
});

router.get("/categories/:slug/models", async (req, res): Promise<void> => {
  const slug = req.params.slug as string;
  const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));
  if (!cat) {
    res.status(404).json({ error: "Category not found" });
    return;
  }
  const models = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.categoryId, cat.id))
    .orderBy(productsTable.sortOrder);
  res.json(models);
});

router.get("/categories/:slug", async (req, res): Promise<void> => {
  const slug = req.params.slug as string;
  const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));
  if (!cat) {
    res.status(404).json({ error: "Category not found" });
    return;
  }
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productsTable)
    .where(eq(productsTable.categoryId, cat.id));
  res.json({ ...cat, productCount: row?.count ?? 0 });
});

export default router;
