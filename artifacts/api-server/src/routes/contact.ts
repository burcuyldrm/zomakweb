import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.insert(contactSubmissionsTable).values({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    company: parsed.data.company ?? null,
    department: parsed.data.department ?? null,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });

  res.json(SubmitContactResponse.parse({
    success: true,
    message: "Your message has been received. We will get back to you within 24 hours.",
  }));
});

export default router;
