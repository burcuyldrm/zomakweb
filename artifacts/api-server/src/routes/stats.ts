import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [productCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(productsTable);

  const [categoryCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categoriesTable);

  res.json(GetStatsResponse.parse({
    yearsOfExperience: 35,
    productsDelivered: 4200,
    countriesServed: 48,
    certifications: 12,
    productCount: productCount?.count ?? 0,
    categoryCount: categoryCount?.count ?? 0,
  }));
});

export default router;
