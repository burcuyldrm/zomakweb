import nodemailer from "nodemailer";

const RECIPIENT = "info@zomak.com.tr";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mail.zomak.com.tr",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER ?? "info@zomak.com.tr",
      pass: process.env.SMTP_PASS ?? "",
    },
    tls: { rejectUnauthorized: false },
  });
}

export interface QuoteEmailData {
  adSoyad: string;
  firma?: string;
  telefon: string;
  email: string;
  hizmetTuru: string;
  sehir: string;
  aciklama: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export async function sendQuoteEmail(data: QuoteEmailData) {
  const transporter = createTransport();
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden">
      <div style="background:#8B1A1A;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;letter-spacing:1px">YENİ TEKLİF TALEBİ</h1>
        <p style="color:#ffffff99;margin:6px 0 0;font-size:13px">ZOMAK Vinç Platform ve Makina Sanayi</p>
      </div>
      <div style="padding:32px;background:#fff">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;width:40%">Ad Soyad</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.adSoyad}</td></tr>
          ${data.firma ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Firma</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.firma}</td></tr>` : ""}
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Telefon</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px"><a href="tel:${data.telefon}" style="color:#8B1A1A">${data.telefon}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">E-posta</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px"><a href="mailto:${data.email}" style="color:#8B1A1A">${data.email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Ürün / Hizmet</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.hizmetTuru}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Şehir / Lokasyon</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.sehir}</td></tr>
        </table>
        <div style="margin-top:24px">
          <div style="font-size:12px;color:#666;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">İş Açıklaması</div>
          <div style="background:#f9f9f9;border-left:3px solid #8B1A1A;padding:16px;border-radius:0 4px 4px 0;font-size:14px;color:#333;line-height:1.6">${data.aciklama.replace(/\n/g, "<br>")}</div>
        </div>
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;font-size:12px;color:#aaa;text-align:center">
          Bu e-posta ZOMAK web sitesi teklif formu aracılığıyla gönderilmiştir.
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"ZOMAK Web" <${process.env.SMTP_USER ?? "info@zomak.com.tr"}>`,
    to: RECIPIENT,
    replyTo: data.email,
    subject: `[TEKLİF] ${data.hizmetTuru} — ${data.adSoyad}${data.firma ? ` / ${data.firma}` : ""}`,
    html,
  });
}

export async function sendContactEmail(data: ContactEmailData) {
  const transporter = createTransport();
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden">
      <div style="background:#8B1A1A;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;letter-spacing:1px">YENİ İLETİŞİM MESAJI</h1>
        <p style="color:#ffffff99;margin:6px 0 0;font-size:13px">ZOMAK Vinç Platform ve Makina Sanayi</p>
      </div>
      <div style="padding:32px;background:#fff">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px;width:40%">Ad Soyad</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">E-posta</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px"><a href="mailto:${data.email}" style="color:#8B1A1A">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Telefon</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Firma</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.company}</td></tr>` : ""}
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#666;font-size:13px">Konu</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:14px">${data.subject}</td></tr>
        </table>
        <div style="margin-top:24px">
          <div style="font-size:12px;color:#666;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Mesaj</div>
          <div style="background:#f9f9f9;border-left:3px solid #8B1A1A;padding:16px;border-radius:0 4px 4px 0;font-size:14px;color:#333;line-height:1.6">${data.message.replace(/\n/g, "<br>")}</div>
        </div>
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;font-size:12px;color:#aaa;text-align:center">
          Bu e-posta ZOMAK web sitesi iletişim formu aracılığıyla gönderilmiştir.
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"ZOMAK Web" <${process.env.SMTP_USER ?? "info@zomak.com.tr"}>`,
    to: RECIPIENT,
    replyTo: data.email,
    subject: `[İLETİŞİM] ${data.subject} — ${data.name}`,
    html,
  });
}
