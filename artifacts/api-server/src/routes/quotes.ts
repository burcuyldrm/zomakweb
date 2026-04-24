import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { sendQuoteEmail } from "../lib/mailer.js";

const router: IRouter = Router();

router.post("/quotes", async (req, res): Promise<void> => {
  const { adSoyad, firma, telefon, email, hizmetTuru, sehir, aciklama } = req.body ?? {};

  if (!adSoyad || !telefon || !email || !hizmetTuru || !sehir || !aciklama) {
    res.status(400).json({ error: "Zorunlu alanlar eksik." });
    return;
  }

  // DB'ye kaydet
  await db.insert(contactSubmissionsTable).values({
    name: adSoyad,
    email,
    phone: telefon,
    company: firma ?? null,
    department: hizmetTuru,
    subject: `Teklif Talebi: ${hizmetTuru}`,
    message: `Şehir: ${sehir}\n\n${aciklama}`,
  });

  // E-posta gönder
  try {
    await sendQuoteEmail({ adSoyad, firma, telefon, email, hizmetTuru, sehir, aciklama });
  } catch (err) {
    console.error("E-posta gönderilemedi:", err);
  }

  res.status(201).json({ success: true, message: "Teklif talebiniz alındı." });
});

export default router;
