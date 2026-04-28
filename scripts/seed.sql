-- =============================================================
-- Crane Corp - Veritabanı Seed Dosyası
-- Tüm tabloları oluşturur ve gerçekçi örnek verilerle doldurur.
-- Tekrar çalıştırılabilir: tüm INSERT ifadeleri ON CONFLICT ile
-- idempotent olarak tasarlanmıştır.
-- =============================================================

-- -----------------------------------------------------------
-- 1. TABLO TANIMLARI
-- -----------------------------------------------------------

CREATE TABLE IF NOT EXISTS categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image       TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id                  SERIAL PRIMARY KEY,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  category_id         INTEGER NOT NULL,
  short_description   TEXT NOT NULL DEFAULT '',
  description         TEXT NOT NULL DEFAULT '',
  specs               JSONB NOT NULL DEFAULT '[]',
  cover_image         TEXT NOT NULL DEFAULT '',
  gallery             TEXT[] NOT NULL DEFAULT '{}',
  pdf_url             TEXT,
  status              TEXT NOT NULL DEFAULT 'published',
  featured            BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  capacity            TEXT NOT NULL DEFAULT '',
  usage_areas         TEXT[] NOT NULL DEFAULT '{}',
  optional_equipment  TEXT[] NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  summary    TEXT NOT NULL DEFAULT '',
  content    TEXT NOT NULL DEFAULT '',
  image      TEXT NOT NULL DEFAULT '',
  date       TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media (
  id         SERIAL PRIMARY KEY,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  url        TEXT NOT NULL,
  thumbnail  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  company    TEXT,
  department TEXT,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_references (
  id           SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  sector       TEXT NOT NULL DEFAULT '',
  project      TEXT NOT NULL DEFAULT '',
  location     TEXT NOT NULL DEFAULT '',
  year         TEXT NOT NULL DEFAULT '',
  logo_url     TEXT DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------
-- 2. KATEGORİ VERİLERİ
-- -----------------------------------------------------------

INSERT INTO categories (name, slug, description, image, sort_order) VALUES
(
  'Mobil Vinçler',
  'mobil-vincler',
  'Tekerlekli şase üzerinde hareket edebilen, geniş çalışma kapasitesine sahip mobil vinçler. İnşaat, endüstriyel ve altyapı projelerinde kullanım için idealdir.',
  '/images/categories/mobil-vincler.jpg',
  1
),
(
  'Tower Crane (Kule Vinç)',
  'tower-crane',
  'Yüksek katlı bina ve büyük inşaat projelerinde kullanılan sabit kule tipi vinçler. Uzun kol açıklığı ve yüksek kapasite sunar.',
  '/images/categories/tower-crane.jpg',
  2
),
(
  'Teleskopik Vinçler',
  'teleskopik-vincler',
  'Teleskopik bom sistemi sayesinde dar alanlarda yüksek erişim imkânı sunan vinçler. Esnek kullanım alanı ve taşınabilirlik özellikleriyle öne çıkar.',
  '/images/categories/teleskopik-vincler.jpg',
  3
),
(
  'Paletli Vinçler',
  'paletli-vincler',
  'Palet sistemiyle her türlü arazide yüksek stabiliteli çalışma imkânı sunan ağır hizmet vinçleri. Enerji ve petrokimya projelerinde tercih edilir.',
  '/images/categories/paletli-vincler.jpg',
  4
),
(
  'Liman Vinçleri',
  'liman-vincleri',
  'Liman ve deniz taşımacılığı operasyonları için özel olarak tasarlanmış sabit ve hareketli vinç sistemleri.',
  '/images/categories/liman-vincleri.jpg',
  5
),
(
  'Endüstriyel Vinçler',
  'endustriyel-vincler',
  'Fabrika, depo ve atölye ortamlarında malzeme taşıma ve montaj işlemleri için tasarlanmış köprülü ve sabit vinç sistemleri.',
  '/images/categories/endustriyel-vincler.jpg',
  6
)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------
-- 3. ÜRÜN VERİLERİ
-- category_id, categories.slug üzerinden dinamik olarak alınır
-- -----------------------------------------------------------

-- Mobil Vinçler
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'mobil-vincler'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'CR-25 Mobil Vinç',
    'cr-25-mobil-vinc',
    'Kompakt yapısı ve çevikliğiyle küçük ve orta ölçekli şantiyelerde verimli çalışma sunan 25 tonluk mobil vinç.',
    'CR-25 Mobil Vinç, küçük alanlar ve kentsel şantiyeler için mükemmel bir çözümdür. 25 ton taşıma kapasitesi ve 30 metre bom uzunluğuyla birçok uygulamaya rahatlıkla yanıt verir. Düşük yakıt tüketimi, kompakt ulaşım boyutları ve hızlı kurulum süresi sahaya getirilen en işlevsel araçlar arasında yer almasını sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "25 ton"}, {"label": "Bom Uzunluğu", "value": "30 m"}, {"label": "Kaldırma Yüksekliği", "value": "32 m"}, {"label": "Motor Gücü", "value": "175 HP"}, {"label": "Taşıt Uzunluğu", "value": "11,4 m"}, {"label": "Çalışma Yarıçapı", "value": "3 - 22 m"}, {"label": "Motor", "value": "Euro 5 Dizel"}, {"label": "Counterweight", "value": "4,2 ton"}]',
    '/images/products/cr-25-cover.jpg',
    ARRAY['/images/products/cr-25-1.jpg', '/images/products/cr-25-2.jpg'],
    '25 ton',
    ARRAY['Kentsel inşaat', 'Tesisat ve altyapı', 'Prefabrik montaj', 'Bina yenileme'],
    ARRAY['Kamera sistemi', 'Uzaktan kumanda', 'Yük ölçüm göstergesi'],
    FALSE, 1, 'published'
  ),
  (
    'CR-50 Mobil Vinç',
    'cr-50-mobil-vinc',
    '50 tonluk kaldırma kapasitesiyle orta ölçekli inşaat ve endüstriyel projelere uygun yüksek performanslı mobil vinç.',
    'CR-50 Mobil Vinç, sektörün zorlu koşullarına göre mühendislenmiş, 50 ton taşıma kapasiteli, güvenilir ve ekonomik bir çözümdür. Modern hidrolik sistemi, geniş bom açıklığı ve kompakt gövdesiyle şantiye içi manevra kabiliyeti son derece yüksektir. Euro 5 uyumlu dizel motoru ve gelişmiş yük gözetleme sistemiyle uzun ömürlü ve güvenli çalışma sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "50 ton"}, {"label": "Bom Uzunluğu", "value": "40 m"}, {"label": "Kaldırma Yüksekliği", "value": "42 m"}, {"label": "Motor Gücü", "value": "270 HP"}, {"label": "Taşıt Uzunluğu", "value": "13,2 m"}, {"label": "Çalışma Yarıçapı", "value": "5 - 32 m"}, {"label": "Motor", "value": "Euro 5 Dizel"}, {"label": "Counterweight", "value": "8,5 ton"}]',
    '/images/products/cr-50-cover.jpg',
    ARRAY['/images/products/cr-50-1.jpg', '/images/products/cr-50-2.jpg', '/images/products/cr-50-3.jpg'],
    '50 ton',
    ARRAY['İnşaat şantiyeleri', 'Endüstriyel tesisler', 'Altyapı projeleri', 'Boru hattı montajı'],
    ARRAY['Jib eki (Luffer)', 'Kamera sistemi', 'Enerji izleme paketi', 'Uzaktan izleme modülü'],
    TRUE, 2, 'published'
  ),
  (
    'CR-100 Mobil Vinç',
    'cr-100-mobil-vinc',
    '100 tonluk taşıma kapasitesiyle ağır inşaat ve altyapı projelerinde güvenilir performans sunan büyük mobil vinç.',
    'CR-100 Mobil Vinç, 100 ton taşıma kapasitesi ve 56 metre bom uzunluğuyla büyük ölçekli projelerde fark yaratır. Teleskopik bom sistemi, opsiyonel jib eki ve gelişmiş stabilizasyon bacakları sayesinde dar alanlarda bile yüksek güvenlikte çalışabilir. Gelişmiş elektronik yük yönetim sistemi ve tam otomatik bom açma mekanizması operatör konforunu en üst düzeye taşır.',
    '[{"label": "Maksimum Kapasite", "value": "100 ton"}, {"label": "Bom Uzunluğu", "value": "56 m"}, {"label": "Kaldırma Yüksekliği", "value": "58 m"}, {"label": "Motor Gücü", "value": "400 HP"}, {"label": "Taşıt Uzunluğu", "value": "15,8 m"}, {"label": "Çalışma Yarıçapı", "value": "5 - 48 m"}, {"label": "Motor", "value": "Euro 5 Dizel"}, {"label": "Counterweight", "value": "18 ton"}]',
    '/images/products/cr-100-cover.jpg',
    ARRAY['/images/products/cr-100-1.jpg', '/images/products/cr-100-2.jpg', '/images/products/cr-100-3.jpg'],
    '100 ton',
    ARRAY['Büyük inşaat projeleri', 'Köprü ve viadukt montajı', 'Rüzgar türbini kurulumu', 'Petrokimya tesisleri'],
    ARRAY['Jib eki (Luffer)', 'Superlift sistemi', 'Gece çalışma aydınlatması', 'Telematikal izleme sistemi'],
    TRUE, 3, 'published'
  ),
  (
    'CR-200 Mobil Vinç',
    'cr-200-mobil-vinc',
    '200 ton kapasitesiyle ağır sanayi ve enerji projelerinin vazgeçilmezi olan güçlü mobil vinç.',
    'CR-200 Mobil Vinç, 200 ton taşıma kapasitesi ve 72 metrelik teleskopik bom uzunluğuyla sektörün en zorlu projelerini karşılayacak şekilde tasarlanmıştır. Çok eksenli aks sistemi ve gelişmiş süspansiyon, ağır yüklerde bile üst düzey stabilite sağlar. Enerji santrali, rafine ve petrokimya tesisi gibi büyük ölçekli yapımlarda birincil tercih olmaya devam etmektedir.',
    '[{"label": "Maksimum Kapasite", "value": "200 ton"}, {"label": "Bom Uzunluğu", "value": "72 m"}, {"label": "Kaldırma Yüksekliği", "value": "76 m"}, {"label": "Motor Gücü", "value": "600 HP"}, {"label": "Taşıt Uzunluğu", "value": "19,6 m"}, {"label": "Çalışma Yarıçapı", "value": "5 - 64 m"}, {"label": "Motor", "value": "Euro 5 Dizel"}, {"label": "Counterweight", "value": "40 ton"}]',
    '/images/products/cr-200-cover.jpg',
    ARRAY['/images/products/cr-200-1.jpg', '/images/products/cr-200-2.jpg', '/images/products/cr-200-3.jpg', '/images/products/cr-200-4.jpg'],
    '200 ton',
    ARRAY['Enerji santralleri', 'Petrokimya tesisleri', 'Köprü ve viyadük yapımı', 'Ağır ekipman montajı'],
    ARRAY['Superlift sistemi', 'Jib eki', 'Yardımcı vinç sistemi', 'Gelişmiş izleme paketi', 'Çoklu kamera'],
    TRUE, 4, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- Tower Crane (Kule Vinç)
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'tower-crane'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'TC-5013 Kule Vinç',
    'tc-5013-kule-vinc',
    'Kompakt tasarım ve yüksek verimliliğiyle orta ölçekli projelere uygun 50 metre kollu kule vinç.',
    'TC-5013 Kule Vinç, 50 metre kol uzunluğu ve 5 ton maksimum kaldırma kapasitesiyle orta ve büyük ölçekli inşaat projelerinin ihtiyaçlarına yanıt vermektedir. Modüler kule sistemi sayesinde farklı yüksekliklere kolaylıkla uyarlanabilir. Düşük enerji tüketimi ve uzun ömürlü mekanik bileşenleri ile ekonomik çalışma maliyeti sunar.',
    '[{"label": "Maksimum Kapasite", "value": "5 ton"}, {"label": "Kol Uzunluğu", "value": "50 m"}, {"label": "Uç Kapasite", "value": "1,3 ton"}, {"label": "Kule Yüksekliği (max)", "value": "72 m"}, {"label": "Vinç Motor Gücü", "value": "30 kW"}, {"label": "Döndürme Motor Gücü", "value": "5,5 kW"}, {"label": "Araba Hızı", "value": "0-75 m/dk"}, {"label": "Kaldırma Hızı", "value": "0-100 m/dk"}]',
    '/images/products/tc-5013-cover.jpg',
    ARRAY['/images/products/tc-5013-1.jpg', '/images/products/tc-5013-2.jpg'],
    '5 ton',
    ARRAY['Konut inşaatı', 'Sanayi yapıları', 'Okul ve hastane projeleri'],
    ARRAY['Çarpışma önleme sistemi', 'Anemometre', 'Uzaktan izleme'],
    FALSE, 1, 'published'
  ),
  (
    'TC-6016 Kule Vinç',
    'tc-6016-kule-vinc',
    '60 metre kol uzunluğu ve 8 ton kaldırma kapasitesiyle yüksek katlı bina projelerine özel kule vinç.',
    'TC-6016, 60 metre kol uzunluğu ve uç noktada 1,6 ton, kanca noktasında maksimum 8 ton kaldırma kapasitesiyle büyük ölçekli yüksek katlı bina projelerinde standarttır. Hızlı montaj sistemi, güçlü kabin konforu ve tam dijital yük yönetimi sayesinde operatörler uzun süreli çalışmalarda verimliliklerini korur.',
    '[{"label": "Maksimum Kapasite", "value": "8 ton"}, {"label": "Kol Uzunluğu", "value": "60 m"}, {"label": "Uç Kapasite", "value": "1,6 ton"}, {"label": "Kule Yüksekliği (max)", "value": "90 m"}, {"label": "Vinç Motor Gücü", "value": "45 kW"}, {"label": "Döndürme Motor Gücü", "value": "7,5 kW"}, {"label": "Araba Hızı", "value": "0-90 m/dk"}, {"label": "Kaldırma Hızı", "value": "0-120 m/dk"}]',
    '/images/products/tc-6016-cover.jpg',
    ARRAY['/images/products/tc-6016-1.jpg', '/images/products/tc-6016-2.jpg'],
    '8 ton',
    ARRAY['Yüksek katlı konut projeleri', 'Ticari yapılar', 'Otel ve AVM inşaatı', 'Karma kullanımlı projeler'],
    ARRAY['Uzaktan izleme sistemi', 'Çarpışma önleme sistemi', 'Anemometre', 'Gelişmiş kabin paketi'],
    TRUE, 2, 'published'
  ),
  (
    'TC-8032 Kule Vinç',
    'tc-8032-kule-vinc',
    '80 metre kol uzunluğu ve 12 ton kapasitesiyle mega projelere hitap eden güçlü flat-top kule vinç.',
    'TC-8032, 80 metre kol uzunluğu ve 12 ton kaldırma kapasitesiyle büyük şantiyeler ve mega projelerin vazgeçilmezidir. Düz kol (flat-top) tasarımı, birden fazla vincin aynı alanlarda çakışmadan çalışmasına olanak tanır. Çift frekanslı sürücü sistemi ve akıllı yük yönetimi, enerji verimliliğini maksimize eder.',
    '[{"label": "Maksimum Kapasite", "value": "12 ton"}, {"label": "Kol Uzunluğu", "value": "80 m"}, {"label": "Uç Kapasite", "value": "2,4 ton"}, {"label": "Kule Yüksekliği (max)", "value": "120 m"}, {"label": "Vinç Motor Gücü", "value": "75 kW"}, {"label": "Döndürme Motor Gücü", "value": "11 kW"}, {"label": "Araba Hızı", "value": "0-120 m/dk"}, {"label": "Kaldırma Hızı", "value": "0-160 m/dk"}]',
    '/images/products/tc-8032-cover.jpg',
    ARRAY['/images/products/tc-8032-1.jpg', '/images/products/tc-8032-2.jpg', '/images/products/tc-8032-3.jpg'],
    '12 ton',
    ARRAY['Mega kentsel projeler', 'Alışveriş merkezi yapımı', 'Büyük endüstriyel tesisler', 'Havalimanı ve terminal inşaatı'],
    ARRAY['Anti-çarpışma sistemi', 'Uzaktan yönetim merkezi', 'Çift kamera paketi', 'Gelişmiş enerji izleme'],
    TRUE, 3, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- Teleskopik Vinçler
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'teleskopik-vincler'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'TR-15 Teleskopik Vinç',
    'tr-15-teleskopik-vinc',
    '15 ton kapasiteli hafif sınıf teleskopik vinç; kısıtlı erişimli alanlar ve şehir içi küçük ölçekli uygulamalar için tasarlandı.',
    'TR-15 Teleskopik Vinç, 15 ton kaldırma kapasitesi ve 3 bölümlü kompakt teleskopik bomuyla kentsel alanlarda ve kısıtlı erişimli şantiyelerde yüksek çeviklik sunar. Dar sokaklarda ve çok katlı yapı iç alanlarında kullanılabilen hafif şasisi, kurulum kolaylığı ve düşük yakıt tüketimiyle maliyet avantajı sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "15 ton"}, {"label": "Bom Uzunluğu", "value": "22 m"}, {"label": "Bom Bölüm Sayısı", "value": "3"}, {"label": "Kaldırma Yüksekliği", "value": "24 m"}, {"label": "Motor Gücü", "value": "130 HP"}, {"label": "Çalışma Yarıçapı", "value": "2,5 - 16 m"}, {"label": "Ağırlık", "value": "19 ton"}, {"label": "Motor", "value": "Euro 5 Dizel"}]',
    '/images/products/tr-15-cover.jpg',
    ARRAY['/images/products/tr-15-1.jpg', '/images/products/tr-15-2.jpg'],
    '15 ton',
    ARRAY['Kentsel küçük şantiyeler', 'Tesisat ve mekanik montaj', 'Çatı ve cephe işleri', 'Hafif altyapı çalışmaları'],
    ARRAY['Kamera sistemi', 'Uzaktan kumanda', 'Dar alan stabilizatörleri'],
    FALSE, 1, 'published'
  ),
  (
    'TR-35 Teleskopik Vinç',
    'tr-35-teleskopik-vinc',
    '35 ton kapasiteli, 4 bölümlü teleskopik bom sistemiyle dar alanlarda yüksek erişim sunan çok yönlü vinç.',
    'TR-35 Teleskopik Vinç, 4 bölümlü teleskopik bom ve 35 ton kaldırma kapasitesiyle yapı sektöründe en çok kullanılan modellerden biridir. Kompakt taşıma boyutları ve 360 derece dönüş platformu, kentsel alanlarda ve kısıtlı şantiyelerde üstün operasyonel esneklik sağlar. Yatay ve dikey yük taşımada eşsiz performansıyla prefabrik ve çelik konstrüksiyon montajında tercih edilir.',
    '[{"label": "Maksimum Kapasite", "value": "35 ton"}, {"label": "Bom Uzunluğu", "value": "35 m"}, {"label": "Bom Bölüm Sayısı", "value": "4"}, {"label": "Kaldırma Yüksekliği", "value": "38 m"}, {"label": "Motor Gücü", "value": "220 HP"}, {"label": "Çalışma Yarıçapı", "value": "3 - 28 m"}, {"label": "Ağırlık", "value": "38 ton"}, {"label": "Motor", "value": "Euro 5 Dizel"}]',
    '/images/products/tr-35-cover.jpg',
    ARRAY['/images/products/tr-35-1.jpg', '/images/products/tr-35-2.jpg'],
    '35 ton',
    ARRAY['Prefabrik montaj', 'Çelik konstrüksiyon', 'HVAC ekipman yerleştirme', 'Şehir içi inşaat'],
    ARRAY['Jib eki', 'Kamera sistemi', 'Yük hücresi'],
    FALSE, 2, 'published'
  ),
  (
    'TR-60 Teleskopik Vinç',
    'tr-60-teleskopik-vinc',
    '60 ton kaldırma kapasitesi ve 5 bölümlü teleskopik bomuyla büyük endüstriyel uygulamalar için ideal vinç.',
    'TR-60, 5 bölümlü teleskopik bom ve 60 ton kaldırma kapasitesiyle endüstriyel tesis kurulumu, büyük makine montajı ve altyapı projelerinde kullanılmak üzere tasarlanmıştır. Güçlü hidrolik sistemi, yüksek yük stabilizasyon kabiliyeti ve geniş çalışma yarıçapıyla sahada kalıcı bir çözüm sunar.',
    '[{"label": "Maksimum Kapasite", "value": "60 ton"}, {"label": "Bom Uzunluğu", "value": "48 m"}, {"label": "Bom Bölüm Sayısı", "value": "5"}, {"label": "Kaldırma Yüksekliği", "value": "52 m"}, {"label": "Motor Gücü", "value": "310 HP"}, {"label": "Çalışma Yarıçapı", "value": "3 - 40 m"}, {"label": "Ağırlık", "value": "58 ton"}, {"label": "Motor", "value": "Euro 5 Dizel"}]',
    '/images/products/tr-60-cover.jpg',
    ARRAY['/images/products/tr-60-1.jpg', '/images/products/tr-60-2.jpg', '/images/products/tr-60-3.jpg'],
    '60 ton',
    ARRAY['Endüstriyel tesis kurulumu', 'Büyük makine montajı', 'Boru hattı döşeme', 'Köprü bakım-onarım'],
    ARRAY['Superlift sistemi', 'Uzaktan izleme', 'Aydınlatma paketi'],
    FALSE, 3, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- Paletli Vinçler
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'paletli-vincler'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'PC-160 Paletli Vinç',
    'pc-160-paletli-vinc',
    '160 ton kapasiteli orta sınıf paletli vinç; çeşitli zemin koşullarında güvenilir ve ekonomik kaldırma çözümü.',
    'PC-160 Paletli Vinç, 160 ton kaldırma kapasitesi ve 66 metre ana bom uzunluğuyla endüstriyel tesis kurulumundan büyük altyapı projelerine kadar geniş bir kullanım yelpazesi sunar. Kompakt nakil boyutları ve modüler bom sistemi, PC-160''ı kısa kurulum süreleri gerektiren projelerde de tercih haline getirir.',
    '[{"label": "Maksimum Kapasite", "value": "160 ton"}, {"label": "Ana Bom Uzunluğu", "value": "66 m"}, {"label": "Luffer Jib", "value": "24 m"}, {"label": "Kaldırma Yüksekliği", "value": "84 m"}, {"label": "Motor Gücü", "value": "520 HP"}, {"label": "Palet Genişliği", "value": "7,8 m"}, {"label": "Makine Ağırlığı", "value": "130 ton"}, {"label": "Counterweight", "value": "80 ton"}]',
    '/images/products/pc-160-cover.jpg',
    ARRAY['/images/products/pc-160-1.jpg', '/images/products/pc-160-2.jpg'],
    '160 ton',
    ARRAY['Endüstriyel tesis montajı', 'Köprü ve viyadük', 'Rüzgar türbini kurulumu', 'Büyük ekipman taşıma'],
    ARRAY['Luffer jib sistemi', 'Uzaktan telematikal izleme', 'Yardımcı vinç'],
    FALSE, 1, 'published'
  ),
  (
    'PC-250 Paletli Vinç',
    'pc-250-paletli-vinc',
    '250 ton kapasiteli, her türlü zeminde güçlü kaldırma performansı sunan ağır hizmet paletli vinç.',
    'PC-250 Paletli Vinç, 250 ton kaldırma kapasitesi ve geniş palet tabanıyla zorlu arazi koşullarında eşsiz stabilite sağlar. Modüler konfigürasyonu sayesinde farklı bom kombinasyonlarıyla geniş bir yelpazede kullanıma uygundur. Petrokimya, enerji ve ağır sanayi projelerinde uzun dönem çalışmalar için tasarlanmıştır.',
    '[{"label": "Maksimum Kapasite", "value": "250 ton"}, {"label": "Ana Bom Uzunluğu", "value": "84 m"}, {"label": "Luffer Jib", "value": "36 m"}, {"label": "Kaldırma Yüksekliği", "value": "108 m"}, {"label": "Motor Gücü", "value": "700 HP"}, {"label": "Palet Genişliği", "value": "9,2 m"}, {"label": "Makine Ağırlığı", "value": "190 ton"}, {"label": "Counterweight", "value": "130 ton"}]',
    '/images/products/pc-250-cover.jpg',
    ARRAY['/images/products/pc-250-1.jpg', '/images/products/pc-250-2.jpg', '/images/products/pc-250-3.jpg'],
    '250 ton',
    ARRAY['Petrokimya tesisleri', 'Enerji santralleri', 'Büyük çaplı altyapı', 'Rafine operasyonları'],
    ARRAY['Luffer jib sistemi', 'Superlift', 'Uzaktan telematikal izleme', 'Yardımcı vinç'],
    TRUE, 2, 'published'
  ),
  (
    'PC-400 Paletli Vinç',
    'pc-400-paletli-vinc',
    '400 tonluk devasa taşıma kapasitesiyle mega endüstriyel projelerin güvenilir çözümü olan paletli vinç.',
    'PC-400, 400 ton kaldırma kapasitesi ve 96 metre ana bom uzunluğuyla Türkiye ve bölgesindeki en büyük sanayi projelerinde aktif olarak kullanılmaktadır. Güçlü palet sistemi, gelişmiş karşı ağırlık konfigürasyonu ve akıllı yük yönetim sistemi, zorlu koşullar altında bile güvenli ve verimli çalışma sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "400 ton"}, {"label": "Ana Bom Uzunluğu", "value": "96 m"}, {"label": "Luffer Jib", "value": "54 m"}, {"label": "Kaldırma Yüksekliği", "value": "130 m"}, {"label": "Motor Gücü", "value": "950 HP"}, {"label": "Palet Genişliği", "value": "11,4 m"}, {"label": "Makine Ağırlığı", "value": "280 ton"}, {"label": "Counterweight", "value": "200 ton"}]',
    '/images/products/pc-400-cover.jpg',
    ARRAY['/images/products/pc-400-1.jpg', '/images/products/pc-400-2.jpg', '/images/products/pc-400-3.jpg', '/images/products/pc-400-4.jpg'],
    '400 ton',
    ARRAY['Nükleer ve termik santral', 'Mega köprü projeleri', 'LNG tesisi kurulumu', 'Ağır ekipman yerleştirme'],
    ARRAY['Karşı ağırlık yayma sistemi', 'Superlift', 'Luffer jib', 'Çift vinç konfigürasyonu', 'Tam telematikal izleme'],
    TRUE, 3, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- Liman Vinçleri
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'liman-vincleri'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'HB-25 Liman Hafif Vinci',
    'hb-25-liman-hafif-vinc',
    'Küçük rıhtımlar ve tekne tersaneleri için tasarlanmış kompakt 25 ton kapasiteli liman vinci.',
    'HB-25 Liman Hafif Vinci, 25 ton kaldırma kapasitesi ve deniz ortamına özel korozyona dayanıklı gövdesiyle küçük limanlar, marina alanları ve tekne tersanelerinde malzeme ve ekipman taşıma işlemlerinde kullanılmak üzere tasarlanmıştır. Kompakt yapısı ve çevik manevra kabiliyetiyle dar rıhtım alanlarında etkin çalışma sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "25 ton"}, {"label": "Bom Uzunluğu", "value": "28 m"}, {"label": "Kaldırma Yüksekliği", "value": "30 m"}, {"label": "Motor Gücü", "value": "190 HP"}, {"label": "Direksiyon", "value": "4 tekerlekten"}, {"label": "Tuz Direnci", "value": "Deniz sertifikalı"}, {"label": "Çalışma Yarıçapı", "value": "3 - 20 m"}, {"label": "Hız (yüksüz)", "value": "3 km/s"}]',
    '/images/products/hb-25-cover.jpg',
    ARRAY['/images/products/hb-25-1.jpg', '/images/products/hb-25-2.jpg'],
    '25 ton',
    ARRAY['Küçük limanlar ve marinalar', 'Tekne tersaneleri', 'Balıkçı limanları', 'Deniz altyapı bakımı'],
    ARRAY['Deniz aydınlatma paketi', 'Uzaktan kumanda', 'Kama kanca aparatı'],
    FALSE, 1, 'published'
  ),
  (
    'HB-40 Liman Mobil Vinci',
    'hb-40-liman-mobil-vinc',
    'Liman ve rıhtımlarda yük elleçleme operasyonları için tasarlanmış, 40 tonluk kapasiteli özel liman mobil vinci.',
    'HB-40 Liman Mobil Vinci, kıyı operasyonları ve liman sahalarında konteyner ve ağır yük elleçleme için optimize edilmiştir. Yüksek tuzluluk dirençli kaplamaları, deniz ortamı sertifikasyonu ve güçlü kaldırma performansıyla liman sahalarında tercih edilen birincil ekipmandır. Dört tekerlekten direksiyon özelliği dar liman alanlarında mükemmel manevra kabiliyeti sunar.',
    '[{"label": "Maksimum Kapasite", "value": "40 ton"}, {"label": "Bom Uzunluğu", "value": "38 m"}, {"label": "Kaldırma Yüksekliği", "value": "42 m"}, {"label": "Motor Gücü", "value": "310 HP"}, {"label": "Direksiyon", "value": "4 tekerlekten"}, {"label": "Tuz Direnci", "value": "Deniz sertifikalı"}, {"label": "Çalışma Yarıçapı", "value": "4 - 30 m"}, {"label": "Hız (yüksüz)", "value": "2,5 km/s"}]',
    '/images/products/hb-40-cover.jpg',
    ARRAY['/images/products/hb-40-1.jpg', '/images/products/hb-40-2.jpg'],
    '40 ton',
    ARRAY['Liman yük elleçleme', 'Konteyner operasyonları', 'Gemi bakım-onarım', 'Rıhtım inşaatı'],
    ARRAY['Spreader takımı', 'Hooklift eki', 'Deniz aydınlatma paketi'],
    FALSE, 2, 'published'
  ),
  (
    'HB-80 Liman Mobil Vinci',
    'hb-80-liman-mobil-vinc',
    '80 ton kapasiteli büyük liman vinci; konteyner terminalleri ve bulk kargo elleçleme için güçlü çözüm.',
    'HB-80 Liman Mobil Vinci, 80 ton kaldırma kapasitesi ve 42 metrelik bom uzunluğuyla büyük konteyner terminalleri ve bulk kargo operasyonlarına yönelik tasarlanmıştır. Yüksek tuzluluk ortamı için özel korumalı mekanik bileşenleri, dört tekerlekten tahrik seçeneği ve büyük lastik kapasitesiyle her türlü liman zemininde güvenle çalışır.',
    '[{"label": "Maksimum Kapasite", "value": "80 ton"}, {"label": "Bom Uzunluğu", "value": "42 m"}, {"label": "Kaldırma Yüksekliği", "value": "46 m"}, {"label": "Motor Gücü", "value": "450 HP"}, {"label": "Direksiyon", "value": "4 tekerlekten"}, {"label": "Tuz Direnci", "value": "Deniz sertifikalı"}, {"label": "Çalışma Yarıçapı", "value": "4 - 36 m"}, {"label": "Yük Sınıfı", "value": "ISO Heavy Duty"}]',
    '/images/products/hb-80-cover.jpg',
    ARRAY['/images/products/hb-80-1.jpg', '/images/products/hb-80-2.jpg', '/images/products/hb-80-3.jpg'],
    '80 ton',
    ARRAY['Konteyner terminalleri', 'Bulk kargo elleçleme', 'Deniz platformu kurulumu', 'Gemi inşa ve onarım'],
    ARRAY['Konteyner spreader', 'Buklet kanca', 'Gelişmiş deniz aydınlatma paketi', 'Yük kayıt sistemi'],
    FALSE, 3, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- Endüstriyel Vinçler
INSERT INTO products
  (name, slug, category_id, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
SELECT
  v.name, v.slug,
  (SELECT id FROM categories WHERE slug = 'endustriyel-vincler'),
  v.short_description, v.description, v.specs::jsonb,
  v.cover_image, v.gallery, v.capacity, v.usage_areas,
  v.optional_equipment, v.featured, v.sort_order, v.status
FROM (VALUES
  (
    'KV-5 Konsol Vinç',
    'kv-5-konsol-vinc',
    '5 ton kapasiteli duvar konsollu vinç; iş istasyonları ve montaj hatlarında hızlı yük taşıma için idealdir.',
    'KV-5 Konsol Vinç, 5 ton kaldırma kapasitesi ve 270 derece dönüş açısıyla iş istasyonları, montaj bantları ve depo alanlarında malzeme besleme ve yük taşıma işlemlerini hızlandırmak üzere tasarlanmıştır. Duvara montajlı kompakt yapısı değerli zemin alanını serbest bırakır; manuel veya elektrikli zincirli palanga seçenekleriyle çeşitli iş gereksinimlerine kolaylıkla uyarlanabilir.',
    '[{"label": "Maksimum Kapasite", "value": "5 ton"}, {"label": "Kol Uzunluğu", "value": "Projeye özel (max 8 m)"}, {"label": "Dönüş Açısı", "value": "270°"}, {"label": "Kaldırma Yüksekliği", "value": "Projeye özel (max 10 m)"}, {"label": "Palanga Tipi", "value": "Manuel / Elektrikli"}, {"label": "Montaj", "value": "Duvara / Kolona"}, {"label": "Koruma Sınıfı", "value": "IP54"}, {"label": "Kaldırma Hızı", "value": "6 m/dk"}]',
    '/images/products/kv-5-cover.jpg',
    ARRAY['/images/products/kv-5-1.jpg', '/images/products/kv-5-2.jpg'],
    '5 ton',
    ARRAY['Montaj hatları', 'İş istasyonları', 'Küçük depo alanları', 'Kalıp ve aparat taşıma'],
    ARRAY['Elektrikli palanga', 'Uzaktan kumanda', 'Yük hücresi'],
    FALSE, 1, 'published'
  ),
  (
    'KV-10 Köprülü Vinç',
    'kv-10-kopruzu-vinc',
    'Fabrika ve depolarda malzeme taşıma ve montaj işlemleri için tasarlanmış 10 tonluk köprülü vinç sistemi.',
    'KV-10 Köprülü Vinç, otomasyona uyumlu yapısı ve yüksek dayanımlı çelik konstrüksiyonuyla ağır sanayi ortamlarında verimliliği artırmak için tasarlanmıştır. Frekans invertörlü tahrik sistemi, hassas konumlandırma imkânı ve düşük bakım ihtiyacıyla işletme maliyetlerini minimize eder. Özel ray sistemiyle tesise tam entegrasyon sağlanır.',
    '[{"label": "Maksimum Kapasite", "value": "10 ton"}, {"label": "Açıklık", "value": "Projeye özel (max 32 m)"}, {"label": "Kaldırma Yüksekliği", "value": "Projeye özel (max 18 m)"}, {"label": "Tahrik Sistemi", "value": "Frekans invertörlü"}, {"label": "Koruma Sınıfı", "value": "IP54"}, {"label": "Çalışma Grubu", "value": "FEM 3m - ISO M5"}, {"label": "Kumanda", "value": "Sarkıt + Uzaktan"}, {"label": "Kaldırma Hızı", "value": "3 - 12 m/dk"}]',
    '/images/products/kv-10-cover.jpg',
    ARRAY['/images/products/kv-10-1.jpg', '/images/products/kv-10-2.jpg'],
    '10 ton',
    ARRAY['Otomotiv fabrikaları', 'Çelik üretim tesisleri', 'Depo ve lojistik merkezleri', 'Makine imalat atölyeleri'],
    ARRAY['Otomasyon paketi (PLC)', 'Tartım sistemi', 'Anti-salınım sistemi', 'ATEX sertifikalı versiyon'],
    FALSE, 2, 'published'
  ),
  (
    'KV-32 Köprülü Vinç',
    'kv-32-kopruzu-vinc',
    'Ağır sanayi ve çelik üretim tesisleri için tasarlanmış, 32 ton kapasiteli çift kiriş köprülü vinç.',
    'KV-32 Çift Kiriş Köprülü Vinç, 32 ton kaldırma kapasitesiyle çelik fabrikaları, enerji tesisleri ve büyük üretim hatlarında kullanım için mühendislenmiştir. Çift kiriş tasarımı yüksek rijitlik ve uzun açıklık kapasitesi sunar. Isıya ve korozyona dayanıklı bileşenler ağır sanayi koşullarında uzun ömürlü güvenilir çalışma sağlar.',
    '[{"label": "Maksimum Kapasite", "value": "32 ton"}, {"label": "Açıklık", "value": "Projeye özel (max 40 m)"}, {"label": "Kaldırma Yüksekliği", "value": "Projeye özel (max 24 m)"}, {"label": "Kirişler", "value": "Çift kiriş"}, {"label": "Koruma Sınıfı", "value": "IP55"}, {"label": "Çalışma Grubu", "value": "FEM 4m - ISO M6"}, {"label": "Kumanda", "value": "Kabinli + Uzaktan"}, {"label": "Kaldırma Hızı", "value": "2 - 8 m/dk"}]',
    '/images/products/kv-32-cover.jpg',
    ARRAY['/images/products/kv-32-1.jpg', '/images/products/kv-32-2.jpg', '/images/products/kv-32-3.jpg'],
    '32 ton',
    ARRAY['Çelik üretim fabrikaları', 'Enerji ve güç santralleri', 'Ağır sanayi üretim hatları', 'Gemi inşa tersaneleri'],
    ARRAY['Tam otomasyon entegrasyonu', 'Yük tartım ve kayıt sistemi', 'Kızgın metal önlemleri paketi', 'Çift motor yedekleme'],
    FALSE, 3, 'published'
  )
) AS v(name, slug, short_description, description, specs, cover_image, gallery, capacity, usage_areas, optional_equipment, featured, sort_order, status)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------
-- 4. HABER VERİLERİ
-- -----------------------------------------------------------

INSERT INTO news (title, slug, summary, content, image, date, status) VALUES
(
  'Crane Corp, Avrupa''nın En Büyük Rüzgar Enerjisi Projesinde Yer Aldı',
  'crane-corp-avrupa-ruzgar-enerjisi-projesi',
  'Crane Corp, Avrupa''nın en büyük kıyı açığı rüzgar enerji tesisinin kurulum sürecinde kritik ekipman tedarikçisi olarak seçildi.',
  'Crane Corp, Kuzey Denizi''ndeki 1.200 MW kapasiteli rüzgar enerji santrali projesinde PC-400 Paletli Vinç ve CR-200 Mobil Vinç filomuzla yer alacağını açıkladı. 36 aylık kurulum sürecini kapsayan proje, şirketin uluslararası arenada önemli bir referans olarak yerini alacak. Proje müdürü Ahmet Koçak, "Bu proje hem kapasitemizi hem de teknik bilgi birikimimizi uluslararası ölçekte kanıtlama fırsatı sunuyor" dedi.',
  '/images/news/ruzgar-enerjisi.jpg',
  '2026-03-15',
  'published'
),
(
  'Yeni CR-200 Mobil Vinç Modelimiz Uluslararası Fuar''da Tanıtıldı',
  'cr-200-mobil-vinc-fuar-tanitimi',
  'Crane Corp''un en yeni ürünü CR-200 Mobil Vinç, Bauma 2026 Münih Fuarı''nda Avrupa inşaat sektörüne tanıtıldı.',
  'Dünya''nın en büyük inşaat makineleri fuarı Bauma 2026''da Crane Corp standında sergilenen CR-200 Mobil Vinç, ziyaretçilerden yoğun ilgi gördü. 200 ton kaldırma kapasitesi, 72 metrelik teleskopik bom sistemi ve Euro 5 uyumlu motoru ile dikkat çeken model, fuar süresince 12 farklı ülkeden alıcıyla görüşmelerin yapıldığı açıklandı. Genel Müdür Cengiz Erdoğan, "CR-200, Crane Corp''un teknoloji ve üretim kalitesini dünyaya gösteren en somut kanıtımızdır" ifadelerini kullandı.',
  '/images/news/bauma-2026.jpg',
  '2026-02-28',
  'published'
),
(
  'İstanbul Havalimanı 3. Pist Projesinde Crane Corp İmzası',
  'istanbul-havalimani-3-pist-projesi',
  'İstanbul Havalimanı''nın üçüncü pistine yönelik altyapı çalışmalarında Crane Corp''un tower crane filosu görev alıyor.',
  'Türkiye''nin mega altyapı projeleri arasında yer alan İstanbul Havalimanı 3. Pist projesi kapsamında Crane Corp, 4 adet TC-8032 Flat-Top Kule Vinç tedarik etti. 18 aylık süreçte görev yapacak ekipmanlar, pistin beton döşeme ve yapısal çelik montaj aşamalarında kritik rol üstleniyor. Proje yüklenicisi ile yapılan protokol, Crane Corp''un havalimanı altyapısındaki üçüncü büyük ortaklığı olma özelliği taşıyor.',
  '/images/news/istanbul-havalimani.jpg',
  '2026-01-20',
  'published'
),
(
  'Crane Corp''dan Sürdürülebilir Üretim Hamlesi: Güneş Enerjili Fabrika',
  'crane-corp-gunes-enerjili-fabrika',
  'Crane Corp, Gebze''deki ana üretim tesisini yüzde yüz yenilenebilir enerjiyle çalıştırmaya başladı.',
  'Crane Corp, Gebze Organize Sanayi Bölgesi''ndeki ana üretim tesisine kurduğu 3,6 MW kapasiteli güneş enerjisi santraliyle fabrikasını tamamen yenilenebilir enerjiyle çalıştırmaya başladı. Yaklaşık 12 milyon TL yatırımla hayata geçirilen proje, yıllık 4.800 ton karbondioksit salımını engellemesi öngörülüyor. Çevre ve Sürdürülebilirlik Direktörü Selin Arslan: "2030 yılına kadar tüm tedarik zincirini karbonsuzlaştırmayı hedefliyoruz" dedi.',
  '/images/news/gunes-enerjili-fabrika.jpg',
  '2025-12-05',
  'published'
),
(
  'Türkiye Vinç Sektöründe Rekor Büyüme: Crane Corp En Yüksek Ciroyu Açıkladı',
  'crane-corp-rekor-ciro-2025',
  '2025 yılı sonunda açıklanan finansal sonuçlara göre Crane Corp, son 10 yılın en yüksek cirosuna ulaştı.',
  '2025 yılı mali sonuçlarını açıklayan Crane Corp, geçen yıla kıyasla yüzde 34 artışla 2,1 milyar TL ciro gerçekleştirdi. İhracat gelirlerinin toplam ciroda yüzde 42''ye yükseldiği görülürken, yurt içindeki büyük altyapı projelerinin de bu başarıya önemli katkı sağladığı belirtildi. Yönetim Kurulu Başkanı Orhan Yılmaz, sonuçları değerlendirirken "Ekibimizin özverisi ve müşterilerimizin güveni bu başarının temel yapıtaşlarıdır" dedi.',
  '/images/news/rekor-ciro.jpg',
  '2025-11-18',
  'published'
)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------
-- 5. MEDYA VERİLERİ
-- -----------------------------------------------------------

INSERT INTO media (type, title, url, thumbnail) VALUES
(
  'photo',
  'CR-100 Köprü Montaj Operasyonu - Ankara',
  '/images/media/cr100-kopru-ankara.jpg',
  '/images/media/thumbnails/cr100-kopru-ankara-thumb.jpg'
),
(
  'photo',
  'TC-8032 İstanbul Şantiye Görüntüsü',
  '/images/media/tc8032-istanbul-santiye.jpg',
  '/images/media/thumbnails/tc8032-istanbul-santiye-thumb.jpg'
),
(
  'video',
  'PC-400 Paletli Vinç - Petrokimya Tesis Kurulumu',
  'https://www.youtube.com/watch?v=demo-pc400',
  '/images/media/thumbnails/pc400-petrokimya-thumb.jpg'
),
(
  'photo',
  'CR-200 Bauma 2026 Fuarı Tanıtımı',
  '/images/media/cr200-bauma-fuar.jpg',
  '/images/media/thumbnails/cr200-bauma-fuar-thumb.jpg'
),
(
  'video',
  'Crane Corp Gebze Fabrikası Tanıtım Filmi',
  'https://www.youtube.com/watch?v=demo-fabrika',
  '/images/media/thumbnails/fabrika-tanitim-thumb.jpg'
),
(
  'photo',
  'KV-32 Köprülü Vinç - Çelik Fabrikası Kurulumu',
  '/images/media/kv32-celik-fabrika.jpg',
  '/images/media/thumbnails/kv32-celik-fabrika-thumb.jpg'
),
(
  'video',
  'TC-6016 Kule Vinç - Yüksek Katlı Proje Zaman Atlamalı Kayıt',
  'https://www.youtube.com/watch?v=demo-tc6016',
  '/images/media/thumbnails/tc6016-yuksek-katli-thumb.jpg'
)
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------------
-- 6. REFERANS MÜŞTERİ VERİLERİ
-- -----------------------------------------------------------

INSERT INTO client_references (company_name, sector, project, location, year, logo_url) VALUES
(
  'İnşaat A.Ş.',
  'İnşaat ve Gayrimenkul',
  'Ankara Büyükşehir Belediyesi Yeni Şehir Merkezi Projesi',
  'Ankara, Türkiye',
  '2024',
  '/images/references/insaat-as.png'
),
(
  'BOTAŞ Boru Hatları A.Ş.',
  'Enerji ve Petrokimya',
  'TANAP Doğalgaz Boru Hattı Kompresör İstasyonu Kurulumu',
  'Eskişehir, Türkiye',
  '2023',
  '/images/references/botas.png'
),
(
  'Toroslar Elektrik Dağıtım A.Ş.',
  'Enerji İletim ve Dağıtım',
  'Akdeniz Bölgesi Yüksek Gerilim Hattı Direk Montajı',
  'Mersin, Türkiye',
  '2024',
  '/images/references/toroslar-elektrik.png'
),
(
  'Star Rafineri (SOCAR Turkey)',
  'Petrokimya',
  'İzmir Star Rafineri Ağır Ekipman Montajı - Atmosferik Damıtma Ünitesi',
  'İzmir, Türkiye',
  '2022',
  '/images/references/star-rafineri.png'
),
(
  'Rönesans Holding',
  'İnşaat ve Altyapı',
  'Katar Dünya Kupası Stadyum Altyapı Projeleri',
  'Doha, Katar',
  '2022',
  '/images/references/ronesans-holding.png'
),
(
  'Alsim Alarko Sanayi Tesisleri',
  'Sanayi ve Enerji',
  'Afşin-Elbistan Termik Santral Yenileme Projesi',
  'Kahramanmaraş, Türkiye',
  '2023',
  '/images/references/alsim-alarko.png'
),
(
  'Kalyon İnşaat',
  'İnşaat ve Ulaşım Altyapısı',
  'İstanbul Havalimanı Apron ve Taksi Yolu Genişletme',
  'İstanbul, Türkiye',
  '2025',
  '/images/references/kalyon-insaat.png'
),
(
  'Limak Holding',
  'Enerji ve İnşaat',
  'Çandarlı Limanı İskele ve Konteyner Rıhtımı Yapımı',
  'İzmir, Türkiye',
  '2024',
  '/images/references/limak-holding.png'
)
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------------
-- 7. İLETİŞİM FORMU GÖNDERİLERİ
-- -----------------------------------------------------------

INSERT INTO contact_submissions (name, email, phone, company, department, subject, message) VALUES
(
  'Murat Şahin',
  'murat.sahin@aborayapi.com.tr',
  '+90 212 555 0101',
  'Abora Yapı A.Ş.',
  'Satın Alma',
  'CR-100 Mobil Vinç Fiyat Teklifi',
  'Merhaba, İstanbul Anadolu yakasındaki konut projemizde kullanmak üzere CR-100 Mobil Vinç için fiyat teklifi ve kiralama koşulları hakkında bilgi almak istiyorum. Proje yaklaşık 18 ay sürecek ve vincin tüm dönem boyunca sahada bulunması gerekmektedir.'
),
(
  'Elif Kaya',
  'e.kaya@turkenerjisistemlerim.com',
  '+90 312 444 0202',
  'Türk Enerji Sistemleri Ltd.',
  'Teknik Departman',
  'PC-250 Paletli Vinç Teknik Şartname Talebi',
  'Ankara''daki rüzgar enerjisi kurulum projemiz için PC-250 ve PC-400 modellerin teknik şartname belgelerini ve yük diyagramlarını talep ediyoruz. Ayrıca sahaya yakın servis imkânları hakkında bilgi verilmesini rica ediyoruz.'
),
(
  'Ahmet Demir',
  'ahmet.demir@limanlojistik.com.tr',
  '+90 232 333 0303',
  'Liman Lojistik Hizmetleri A.Ş.',
  'Operasyon',
  'HB-80 Liman Vinci Satın Alma Görüşmesi',
  'İzmir Alsancak Limanı''nda konteyner elleçleme kapasitemizi artırmak amacıyla HB-80 modeli için satın alma süreci başlatmak istiyoruz. Teknik özellikler, teslim süresi ve garanti kapsamı hakkında detaylı bilgi almak üzere bir toplantı talep ediyoruz.'
),
(
  'Zeynep Arslan',
  'z.arslan@kolbasinsaat.com',
  '+90 216 666 0404',
  'Kolbaşı İnşaat Sanayi',
  'Proje Yönetimi',
  'TC-6016 Kule Vinç Kiralama Talebi',
  'Kadıköy''de inşaatı sürmekte olan 28 katlı karma kullanımlı projemizde TC-6016 kule vinç kiralaması için fiyat ve montaj koşullarına ilişkin bilgi almak istiyoruz. Şantiyeye erişim için ön keşif yapılabilir mi?'
),
(
  'Hakan Yıldız',
  'hakan.yildiz@metalsteel.com.tr',
  '+90 262 777 0505',
  'Metal Steel Üretim A.Ş.',
  'Bakım ve Teknik Servis',
  'KV-32 Köprülü Vinç Periyodik Bakım Sözleşmesi',
  'Gebze fabrikamızda 2021 yılında Crane Corp''tan satın aldığımız KV-32 köprülü vinç için yıllık bakım sözleşmesi yenilemek istiyoruz. Ayrıca bir vinç operatörü eğitim programı düzenlenip düzenlenemeyeceğini de öğrenmek istiyoruz.'
),
(
  'Fatma Öztürk',
  'fatma.ozturk@gencenerjiyatirimlari.com',
  '+90 322 888 0606',
  'Genç Enerji Yatırımları A.Ş.',
  'Yatırım ve Planlama',
  'Büyük Çaplı Proje İçin Ekipman Paketi Teklifi',
  'Adana bölgesinde planlanan doğalgaz çevrim santrali projesinde kullanılacak vinç ve kaldırma ekipmanları için kapsamlı bir teklif paketi almak istiyoruz. Proje 24 ay sürecek; ihtiyaç duyulacak ekipman listesini teknik ekibimizle birlikte hazırlayabiliriz.'
)
ON CONFLICT DO NOTHING;
