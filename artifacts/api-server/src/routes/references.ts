import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, referencesTable, insertReferenceSchema } from "@workspace/db";

const router: IRouter = Router();

router.get("/references", async (_req, res): Promise<void> => {
  const rows = await db.select().from(referencesTable).orderBy(referencesTable.createdAt);
  res.json(rows.map(r => ({ ...r, logoUrl: r.logoUrl ?? "" })));
});

router.post("/references", async (req, res): Promise<void> => {
  const parsed = insertReferenceSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: String(parsed.error) }); return; }
  const [row] = await db.insert(referencesTable).values(parsed.data).returning();
  res.status(201).json({ ...row, logoUrl: row.logoUrl ?? "" });
});

router.put("/references/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = insertReferenceSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: String(parsed.error) }); return; }
  const [row] = await db.update(referencesTable).set({ ...parsed.data, updatedAt: new Date() }).where(eq(referencesTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...row, logoUrl: row.logoUrl ?? "" });
});

router.delete("/references/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(referencesTable).where(eq(referencesTable.id, id));
  res.sendStatus(204);
});

export default router;
