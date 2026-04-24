import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { sendContactEmail } from "../lib/mailer.js";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const { name, email, phone, company, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "Zorunlu alanlar eksik." });
    return;
  }

  // DB'ye kaydet
  await db.insert(contactSubmissionsTable).values({
    name,
    email,
    phone: phone ?? null,
    company: company ?? null,
    department: null,
    subject,
    message,
  });

  // E-posta gönder
  try {
    await sendContactEmail({ name, email, phone, company, subject, message });
  } catch (err) {
    console.error("İletişim e-postası gönderilemedi:", err);
  }

  res.status(201).json({ success: true, message: "Mesajınız alındı." });
});

export default router;
