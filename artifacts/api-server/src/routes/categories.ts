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

function slugify(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


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

  const fixed = {
  ...parsed.data,
  slug: slugify(parsed.data.name),
};

const [cat] = await db.insert(categoriesTable).values(fixed).returning();

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
    .set({
  ...parsed.data,
  slug: slugify(parsed.data.name),
  updatedAt: new Date(),
})

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

router.patch("/categories/:id", async (req, res): Promise<void> => {
  const params = UpdateCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  // Partial update için sadece gönderilen alanları güncelle
  const updateData: Partial<typeof parsed.data> = {};
  if (req.body.name !== undefined) {
    updateData.name = req.body.name;
    updateData.slug = slugify(req.body.name);
  }
  if (req.body.description !== undefined) updateData.description = req.body.description;
  if (req.body.image !== undefined) updateData.image = req.body.image;
  if (req.body.sortOrder !== undefined) updateData.sortOrder = req.body.sortOrder;
  updateData.updatedAt = new Date();

  const [cat] = await db
    .update(categoriesTable)
    .set(updateData)
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

  // Sadece istenen alanları döndür
  res.json({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image || null,
    sortOrder: cat.sortOrder,
  });
});

export default router;
