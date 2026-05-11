import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, productsTable, categoriesTable, contactSubmissionsTable, referencesTable } from "@workspace/db";
const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [[productCount], [categoryCount], [referenceCount], [quoteCount]] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(productsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(categoriesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(referencesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(contactSubmissionsTable),
  ]);

  res.json({
    yearsOfExperience: 35,
    productsDelivered: 4200,
    countriesServed: 48,
    certifications: 12,
    productCount: productCount?.count ?? 0,
    categoryCount: categoryCount?.count ?? 0,
    referenceCount: referenceCount?.count ?? 0,
    quoteCount: quoteCount?.count ?? 0,
  });
});

export default router;
