import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, contactSubmissionsTable } from "@workspace/db";
import { sendQuoteEmail } from "../lib/mailer.js";

const router: IRouter = Router();

router.get("/quotes", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(contactSubmissionsTable)
    .orderBy(desc(contactSubmissionsTable.createdAt));
  res.json(rows);
});

router.post("/quotes", async (req, res): Promise<void> => {
  const { adSoyad, firma, telefon, email, hizmetTuru, sehir, aciklama } = req.body ?? {};

  if (!adSoyad || !telefon || !email || !hizmetTuru || !sehir || !aciklama) {
    res.status(400).json({ error: "Zorunlu alanlar eksik." });
    return;
  }

  await db.insert(contactSubmissionsTable).values({
    name: adSoyad,
    email,
    phone: telefon,
    company: firma ?? null,
    department: hizmetTuru,
    subject: `Teklif Talebi: ${hizmetTuru}`,
    message: `Şehir: ${sehir}\n\n${aciklama}`,
  });

  try {
    await sendQuoteEmail({ adSoyad, firma, telefon, email, hizmetTuru, sehir, aciklama });
  } catch (err) {
    console.error("E-posta gönderilemedi:", err);
  }

  res.status(201).json({ success: true, message: "Teklif talebiniz alındı." });
});

router.delete("/quotes/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz ID" }); return; }
  await db.delete(contactSubmissionsTable).where(eq(contactSubmissionsTable.id, id));
  res.sendStatus(204);
});

router.patch("/quotes/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz ID" }); return; }

  const { status } = req.body ?? {};
  if (!status) { res.status(400).json({ error: "status zorunludur" }); return; }

  const [row] = await db
    .update(contactSubmissionsTable)
    .set({ status })
    .where(eq(contactSubmissionsTable.id, id))
    .returning();

  if (!row) { res.status(404).json({ error: "Kayıt bulunamadı" }); return; }
  res.json(row);
});

export default router;
