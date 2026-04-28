# ZOMAK Backend Teknik Analizi

> **Not:** Bu projede backend zaten mevcut — `artifacts/api-server/` klasöründe Express + Drizzle ORM + PostgreSQL stack'i ile çalışmaktadır.  
> Aşağıdaki analiz, mevcut sistemin tam dökümüdür.

---

## [API_ENDPOINTLERI]

Tüm endpointler `/api/` prefix'i ile çalışır. Örnek: `GET /api/products`

### 🔵 Sağlık Kontrolü
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/health` | Sunucu durumu |

**Response:**
```json
{ "status": "ok" }
```

---

### 📦 Kategoriler (`/api/categories`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/categories` | Tüm kategorileri listele |
| GET | `/api/categories/:slug` | Tekil kategori |
| GET | `/api/categories/:slug/models` | Kategoriye ait ürünler |
| POST | `/api/categories` | Yeni kategori oluştur |
| PUT | `/api/categories/:id` | Kategori güncelle |
| DELETE | `/api/categories/:id` | Kategori sil |

**GET /api/categories — Response:**
```json
[
  {
    "id": 1,
    "name": "Mobil Katlanır Vinç",
    "slug": "mobil-katlanir-vinc",
    "description": "...",
    "image": "/products/zv-030/zv_030_cover.png",
    "sortOrder": 1,
    "productCount": 6,
    "createdAt": "2026-04-17T...",
    "updatedAt": "2026-04-17T..."
  }
]
```

**POST /api/categories — Body:**
```json
{
  "name": "string",
  "slug": "string",
  "description": "string",
  "image": "string",
  "sortOrder": 0
}
```

---

### 🏗️ Ürünler (`/api/products`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/products` | Tüm ürünleri listele |
| GET | `/api/products/featured` | Öne çıkan ürünler |
| GET | `/api/products/:slug` | Tekil ürün detayı |
| POST | `/api/products` | Yeni ürün oluştur |
| PUT | `/api/products/:slug` | Ürün güncelle |
| DELETE | `/api/products/:slug` | Ürün sil |

**Query String (GET /api/products):**
```
?categoryId=1          → Kategoriye göre filtrele
?status=published      → Yayın durumuna göre (published | draft)
?featured=true         → Sadece öne çıkanlar
```

**GET /api/products/:slug — Response:**
```json
{
  "id": 19,
  "name": "ZV-060",
  "slug": "zv-060",
  "categoryId": 1,
  "categoryName": "Mobil Katlanır Vinç",
  "shortDescription": "string",
  "description": "string",
  "capacity": "300 ton",
  "specs": [
    { "key": "Kaldırma Kapasitesi", "value": "..." },
    { "key": "Çalışma Basıncı (Bar)", "value": "..." }
  ],
  "coverImage": "/products/zv-060/zv_060_cover_rounded.png",
  "gallery": [
    "/products/zv-060/zv_060_1.jpeg",
    "/products/zv-060/zv_060_2.jpeg"
  ],
  "pdfUrl": "/products/zv-060/zv_060_teknik_diyagram.pdf",
  "status": "published",
  "featured": false,
  "sortOrder": 2,
  "usageAreas": ["string"],
  "optionalEquipment": ["string"],
  "createdAt": "2026-04-17T...",
  "updatedAt": "2026-04-17T..."
}
```

**POST/PUT /api/products — Body:**
```json
{
  "name": "string",
  "slug": "string",
  "categoryId": 1,
  "shortDescription": "string",
  "description": "string",
  "capacity": "string",
  "specs": [{ "key": "string", "value": "string" }],
  "coverImage": "string",
  "gallery": ["string"],
  "pdfUrl": "string | null",
  "status": "published | draft",
  "featured": false,
  "sortOrder": 0,
  "usageAreas": ["string"],
  "optionalEquipment": ["string"]
}
```

---

### 📰 Haberler (`/api/news`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/news` | Tüm haberler |
| GET | `/api/news/:slug` | Tekil haber |
| POST | `/api/news` | Yeni haber |
| PUT | `/api/news/:slug` | Haber güncelle |
| DELETE | `/api/news/:slug` | Haber sil |

**Query String (GET /api/news):**
```
?status=published
?limit=5
```

**POST/PUT Body:**
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string",
  "image": "string",
  "date": "2026-04-17",
  "status": "published | draft"
}
```

---

### 🖼️ Medya (`/api/media`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/media` | Tüm medya |
| POST | `/api/media` | Yeni medya kaydı |
| DELETE | `/api/media/:id` | Medya sil |

**Query String:**
```
?type=photo | video
```

**POST Body:**
```json
{
  "type": "photo | video",
  "title": "string",
  "url": "string",
  "thumbnail": "string | null"
}
```

---

### 🤝 Referanslar (`/api/references`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/references` | Tüm referanslar |
| POST | `/api/references` | Yeni referans |
| PUT | `/api/references/:id` | Referans güncelle |
| DELETE | `/api/references/:id` | Referans sil |

**Response/Body:**
```json
{
  "id": 1,
  "companyName": "Pekgöz Vinç",
  "sector": "Vinç ve Kurtarıcı Hizmetleri",
  "project": "Hidrolik Kurtarıcı Teslimi",
  "location": "İzmir",
  "year": "2024",
  "logoUrl": ""
}
```

---

### 📩 Teklif Talebi (`/api/quotes`)
| Metod | URL | Açıklama |
|---|---|---|
| POST | `/api/quotes` | Teklif formu gönder |

**POST Body:**
```json
{
  "adSoyad": "string",       // zorunlu
  "firma": "string",          // opsiyonel
  "telefon": "string",        // zorunlu
  "email": "string",          // zorunlu
  "hizmetTuru": "string",     // zorunlu
  "sehir": "string",          // zorunlu
  "aciklama": "string"        // zorunlu
}
```

---

### 📬 İletişim Formu (`/api/contact`)
| Metod | URL | Açıklama |
|---|---|---|
| POST | `/api/contact` | İletişim formu gönder |

**POST Body:**
```json
{
  "name": "string",       // zorunlu
  "email": "string",      // zorunlu
  "phone": "string",      // opsiyonel
  "company": "string",    // opsiyonel
  "subject": "string",    // zorunlu
  "message": "string"     // zorunlu
}
```

---

### 📊 İstatistikler (`/api/stats`)
| Metod | URL | Açıklama |
|---|---|---|
| GET | `/api/stats` | Site istatistikleri |

**Response:**
```json
{
  "yearsOfExperience": 35,
  "productsDelivered": 4200,
  "countriesServed": 48,
  "certifications": 12,
  "productCount": 13,
  "categoryCount": 4
}
```

---

### 📤 Dosya Yükleme (`/api/upload`)
| Metod | URL | Açıklama |
|---|---|---|
| POST | `/api/upload` | Tekil dosya yükle |
| POST | `/api/upload/multiple` | Çoklu dosya yükle |

- **Format:** `multipart/form-data`, field adı: `file` (tekli) / `files` (çoklu)
- **Sınır:** 20MB / dosya, max 20 dosya
- **Desteklenen:** jpeg, jpg, png, gif, webp, svg
- **Özel davranış:** JPEG/JPG yüklendiğinde **otomatik** olarak 50px köşe yuvarlama uygulanır ve PNG olarak kaydedilir
- **Response:** `{ "url": "/uploads/dosya.png", "filename": "...", "originalName": "...", "size": 12345 }`

---

## [VERI_FORMATLARI]

### Specs (Teknik Özellikler) — JSONB
```json
[
  { "key": "Kaldırma Kapasitesi", "value": "6.000 kg" },
  { "key": "Çalışma Basıncı (Bar)", "value": "350" },
  { "key": "Kule Dönüş Açısı", "value": "400°" }
]
```

### Gallery (Galeri) — text[]
```json
[
  "/products/zv-060/zv_060_1.jpeg",
  "/products/zv-060/zv_060_2.jpeg"
]
```

### UsageAreas / OptionalEquipment — text[]
```json
["İnşaat", "Liman", "Sanayi"]
```

---

## [TABLOLAR]

### `categories`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| name | text | NOT NULL |
| slug | text | NOT NULL, UNIQUE |
| description | text | NOT NULL, DEFAULT '' |
| image | text | NOT NULL, DEFAULT '' |
| sort_order | integer | NOT NULL, DEFAULT 0 |
| created_at | timestamptz | NOT NULL, DEFAULT now() |
| updated_at | timestamptz | NOT NULL, DEFAULT now() |

### `products`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| name | text | NOT NULL |
| slug | text | NOT NULL, UNIQUE |
| category_id | integer | NOT NULL, FK → categories.id |
| short_description | text | NOT NULL, DEFAULT '' |
| description | text | NOT NULL, DEFAULT '' |
| specs | jsonb | NOT NULL, DEFAULT [] |
| cover_image | text | NOT NULL, DEFAULT '' |
| gallery | text[] | NOT NULL, DEFAULT [] |
| pdf_url | text | NULL |
| status | text | NOT NULL, DEFAULT 'published' |
| featured | boolean | NOT NULL, DEFAULT false |
| sort_order | integer | NOT NULL, DEFAULT 0 |
| capacity | text | NOT NULL, DEFAULT '' |
| usage_areas | text[] | NOT NULL, DEFAULT [] |
| optional_equipment | text[] | NOT NULL, DEFAULT [] |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

### `news`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| title | text | NOT NULL |
| slug | text | NOT NULL, UNIQUE |
| summary | text | NOT NULL, DEFAULT '' |
| content | text | NOT NULL, DEFAULT '' |
| image | text | NOT NULL, DEFAULT '' |
| date | text | NOT NULL |
| status | text | NOT NULL, DEFAULT 'published' |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

### `media`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| type | text | NOT NULL ('photo' \| 'video') |
| title | text | NOT NULL |
| url | text | NOT NULL |
| thumbnail | text | NULL |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

### `client_references`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| company_name | text | NOT NULL |
| sector | text | NOT NULL, DEFAULT '' |
| project | text | NOT NULL, DEFAULT '' |
| location | text | NOT NULL, DEFAULT '' |
| year | text | NOT NULL, DEFAULT '' |
| logo_url | text | DEFAULT '' |
| created_at | timestamptz | NOT NULL |
| updated_at | timestamptz | NOT NULL |

### `contact_submissions`
| Kolon | Tip | Kısıt |
|---|---|---|
| id | serial | PRIMARY KEY |
| name | text | NOT NULL |
| email | text | NOT NULL |
| phone | text | NULL |
| company | text | NULL |
| department | text | NULL |
| subject | text | NOT NULL |
| message | text | NOT NULL |
| created_at | timestamptz | NOT NULL |

**İlişkiler:**
- `products.category_id` → `categories.id` (many-to-one)

---

## [ENV_VARIABLES]

### API Server (`artifacts/api-server/`)
| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL bağlantı URL'i |
| `PORT` | ✅ | Sunucu portu (varsayılan: 8080) |
| `SMTP_HOST` | ⚠️ | E-posta sunucusu (teklif/iletişim maili için) |
| `SMTP_PORT` | ⚠️ | SMTP portu |
| `SMTP_USER` | ⚠️ | SMTP kullanıcı adı |
| `SMTP_PASS` | ⚠️ | SMTP şifresi |
| `SMTP_FROM` | ⚠️ | Gönderen e-posta adresi |
| `CONTACT_EMAIL` | ⚠️ | Teklif/iletişim formlarının gideceği e-posta |

### Frontend (`artifacts/crane-corp/`)
| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `BASE_PATH` | ✅ | Vite base path (örn: `/`) |
| `PORT` | ✅ | Vite dev server portu |
| `VITE_API_URL` | ✅ | API sunucusu base URL (örn: `http://localhost:8080`) |

---

## [KLASOR_YAPISI]

```
artifacts/
├── api-server/                  ← Backend (Express + Drizzle)
│   ├── src/
│   │   ├── app.ts               ← Express kurulumu, CORS, middleware
│   │   ├── index.ts             ← Sunucu başlatma, PORT dinleme
│   │   ├── routes/
│   │   │   ├── index.ts         ← Tüm route'ları birleştirir
│   │   │   ├── categories.ts
│   │   │   ├── products.ts
│   │   │   ├── news.ts
│   │   │   ├── media.ts
│   │   │   ├── references.ts
│   │   │   ├── quotes.ts
│   │   │   ├── contact.ts
│   │   │   ├── stats.ts
│   │   │   ├── upload.ts        ← Dosya yükleme + otomatik PNG köşe yuvarlama
│   │   │   └── health.ts
│   │   └── lib/
│   │       ├── logger.ts        ← Pino logger
│   │       └── mailer.ts        ← Nodemailer (SMTP)
│   └── uploads/                 ← Admin'den yüklenen dosyalar
│
├── crane-corp/                  ← Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/               ← Sayfalar
│   │   ├── components/          ← Ortak bileşenler
│   │   └── lib/                 ← API client, yardımcılar
│   └── public/
│       └── products/            ← Statik ürün görselleri + PDF'ler
│           ├── zv-060/
│           ├── zk-g300/
│           └── ...
│
lib/
├── db/                          ← Drizzle ORM şema + DB bağlantısı
│   └── src/schema/
│       ├── categories.ts
│       ├── products.ts
│       ├── news.ts
│       ├── media.ts
│       ├── references.ts
│       └── contact_submissions.ts
└── api-zod/                     ← Zod validasyon şemaları (orval ile üretilmiş)
    └── src/generated/api.ts
```

---

## [UYARILAR]

1. **SMTP ayarları eksik olabilir** — Teklif ve iletişim formları e-posta gönderir. `SMTP_*` env değişkenleri tanımlanmamışsa form kayıt olur ama mail atılmaz (sessiz hata).

2. **`/uploads/` klasörü geçicidir** — Admin'den yüklenen dosyalar `artifacts/api-server/uploads/` klasörüne kaydedilir. Bu dizin deployment'ta sıfırlanabilir. Kalıcı dosyalar için object storage kullanılmalı.

3. **Statik ürün görselleri frontend'de** — Mevcut ürün görselleri (`/products/zv-060/...` vb.) `artifacts/crane-corp/public/` içinde; API'dan gelen URL'ler bu statik dosyalara işaret ediyor. Backend ayrı sunucuda çalışırsa bu dosyaların da erişilebilir olması gerekir.

4. **`category_id` FK ilişkisi uygulanmıyor** — Drizzle şemasında FK tanımı yok, bu yüzden olmayan bir kategoriye ürün eklenebilir. Gerekirse Drizzle ile FK constraint eklenebilir.

5. **Slug benzersizliği** — Hem `products` hem `news` tablolarında `slug` UNIQUE kısıtlıdır. Admin'den aynı slug ile kayıt oluşturmaya çalışırken hata alınır.

6. **Sharp (görsel işleme) native modül** — `upload.ts` içindeki JPEG → PNG dönüşümü için `sharp` kullanılıyor. Farklı bir sunucuya taşınırken `sharp`'ın o platforma göre yeniden derlenmesi gerekebilir (`npm rebuild sharp`).
