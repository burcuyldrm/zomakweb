import { Router, type IRouter } from "express";
import { eq, and, sql } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  CreateProductBody,
  UpdateProductBody,
  GetProductParams,
  UpdateProductParams,
  DeleteProductParams,
  ListProductsResponse,
  GetProductResponse,
  UpdateProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function enrichProduct(product: typeof productsTable.$inferSelect) {
  const [cat] = await db
    .select({ name: categoriesTable.name })
    .from(categoriesTable)
    .where(eq(categoriesTable.id, product.categoryId));

  return {
    ...product,
    categoryName: cat?.name ?? "",
    pdfUrl: product.pdfUrl ?? null,
    specs: (product.specs as { key: string; value: string }[]) ?? [],
    gallery: product.gallery ?? [],
    usageAreas: product.usageAreas ?? [],
    optionalEquipment: product.optionalEquipment ?? [],
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(and(eq(productsTable.featured, true), eq(productsTable.status, "published")))
    .orderBy(productsTable.sortOrder)
    .limit(6);

  const enriched = await Promise.all(products.map(enrichProduct));
  res.json(enriched);
});

router.get("/products", async (req, res): Promise<void> => {
  const params = ListProductsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [];
  if (params.data.categoryId) {
    conditions.push(eq(productsTable.categoryId, params.data.categoryId));
  }
  if (params.data.status) {
    conditions.push(eq(productsTable.status, params.data.status));
  }
  if (params.data.featured !== undefined) {
    conditions.push(eq(productsTable.featured, params.data.featured));
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(productsTable.sortOrder);

  const enriched = await Promise.all(products.map(enrichProduct));
  res.json(ListProductsResponse.parse(enriched));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db.insert(productsTable).values({
    ...parsed.data,
    specs: parsed.data.specs as object,
  }).returning();

  const enriched = await enrichProduct(product);
  res.status(201).json(GetProductResponse.parse(enriched));
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, rawSlug));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const enriched = await enrichProduct(product);
  res.json(GetProductResponse.parse(enriched));
});

router.put("/products/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const params = UpdateProductParams.safeParse({ slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = { ...parsed.data, updatedAt: new Date() };
  if (parsed.data.specs) {
    updateData.specs = parsed.data.specs as object;
  }

  const [product] = await db
    .update(productsTable)
    .set(updateData)
    .where(eq(productsTable.slug, rawSlug))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const enriched = await enrichProduct(product);
  res.json(UpdateProductResponse.parse(enriched));
});

router.delete("/products/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const params = DeleteProductParams.safeParse({ slug: rawSlug });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db.delete(productsTable).where(eq(productsTable.slug, params.data.slug));
  res.sendStatus(204);
});

export default router;
