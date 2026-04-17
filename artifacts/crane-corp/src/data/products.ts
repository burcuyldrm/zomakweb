export interface ProductModel {
  slug: string;
  code: string;
  title: string;
  shortDesc: string;
  description: string;
  image?: string;
  specs?: { label: string; value: string }[];
}

export interface Product {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  usage: string[];
  specs?: { label: string; value: string }[];
  models: ProductModel[];
}

export const products: Product[] = [
  {
    slug: "mobil-katlanir-vinc",
    title: "Mobil Katlanır Vinç",
    shortDesc: "Mobil katlanır vinç ürün grubumuzu inceleyin.",
    description:
      "Mobil katlanır vinç ürün grubumuz, farklı saha ve kaldırma ihtiyaçlarına uygun model seçenekleri sunar.",
    usage: [
      "İnşaat ve şantiye çalışmaları",
      "Sanayi ve tesis uygulamaları",
      "Ağır yük kaldırma operasyonları",
      "Saha ve mobil hizmet çözümleri",
    ],
    specs: [
      { label: "Kategori", value: "Mobil Katlanır Vinç" },
      { label: "Model Sayısı", value: "6" },
      { label: "Seri", value: "ZV" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zv-030",
        code: "ZV-030",
        title: "ZV-030",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-030 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-030" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
      {
        slug: "zv-060",
        code: "ZV-060",
        title: "ZV-060",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-060 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-060" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
      {
        slug: "zv-105",
        code: "ZV-105",
        title: "ZV-105",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-105 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-105" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
      {
        slug: "zv-150",
        code: "ZV-150",
        title: "ZV-150",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-150 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-150" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
      {
        slug: "zv-225",
        code: "ZV-225",
        title: "ZV-225",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-225 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-225" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
      {
        slug: "zv-300",
        code: "ZV-300",
        title: "ZV-300",
        shortDesc: "Mobil katlanır vinç modeli.",
        description: "ZV-300 mobil katlanır vinç modelidir.",
        specs: [
          { label: "Model", value: "ZV-300" },
          { label: "Kategori", value: "Mobil Katlanır Vinç" },
        ],
      },
    ],
  },
  {
    slug: "hidrolik-gozluklu-kurtarici",
    title: "Hidrolik Gözlüklü Kurtarıcı",
    shortDesc: "Hidrolik gözlüklü kurtarıcı ürün grubumuzu inceleyin.",
    description:
      "Hidrolik gözlüklü kurtarıcı ürün grubumuz, araç kurtarma ve taşıma operasyonları için geliştirilmiş model seçenekleri sunar.",
    usage: [
      "Yol yardım hizmetleri",
      "Araç taşıma operasyonları",
      "Kurtarma ve çekici uygulamaları",
    ],
    specs: [
      { label: "Kategori", value: "Hidrolik Gözlüklü Kurtarıcı" },
      { label: "Model Sayısı", value: "1" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zgk-001",
        code: "ZGK-001",
        title: "ZGK-001",
        shortDesc: "Hidrolik gözlüklü kurtarıcı modeli.",
        description: "ZGK-001 hidrolik gözlüklü kurtarıcı modelidir.",
        specs: [
          { label: "Model", value: "ZGK-001" },
          { label: "Kategori", value: "Hidrolik Gözlüklü Kurtarıcı" },
        ],
      },
    ],
  },
  {
    slug: "hidrolik-kurtarici",
    title: "Hidrolik Kurtarıcı",
    shortDesc: "Hidrolik kurtarıcı ürün grubumuzu inceleyin.",
    description:
      "Hidrolik kurtarıcı ürün grubumuz, ağır hizmet kurtarma ve çekici uygulamaları için uygun model seçenekleri sunar.",
    usage: [
      "Ağır araç kurtarma",
      "Yol yardım ve çekici hizmetleri",
      "Servis ve saha operasyonları",
    ],
    specs: [
      { label: "Kategori", value: "Hidrolik Kurtarıcı" },
      { label: "Model Sayısı", value: "1" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zk-001",
        code: "ZK-001",
        title: "ZK-001",
        shortDesc: "Hidrolik kurtarıcı modeli.",
        description: "ZK-001 hidrolik kurtarıcı modelidir.",
        specs: [
          { label: "Model", value: "ZK-001" },
          { label: "Kategori", value: "Hidrolik Kurtarıcı" },
        ],
      },
    ],
  },
  {
    slug: "ozel-hidrolik-makineler",
    title: "Özel Hidrolik Makineler",
    shortDesc: "Özel hidrolik makineler ürün grubumuzu inceleyin.",
    description:
      "Özel hidrolik makineler kategorimiz projeye özel çözümler için ayrılmıştır.",
    usage: [
      "Projeye özel makine tasarımları",
      "Özel üretim hidrolik sistemler",
      "Kurumsal mühendislik çözümleri",
    ],
    specs: [
      { label: "Kategori", value: "Özel Hidrolik Makineler" },
      { label: "Model Sayısı", value: "0" },
      { label: "Durum", value: "Projeye Özel" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [],
  },
  {
    slug: "sepetli-platform",
    title: "Sepetli Platform",
    shortDesc: "Sepetli platform ürün grubumuzu inceleyin.",
    description:
      "Sepetli platform ürün grubumuz, yüksekte güvenli çalışma için geliştirilmiş model seçenekleri sunar.",
    usage: [
      "Yüksekte çalışma operasyonları",
      "Bakım ve montaj işleri",
      "Saha ve servis uygulamaları",
    ],
    specs: [
      { label: "Kategori", value: "Sepetli Platform" },
      { label: "Model Sayısı", value: "1" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zp-001",
        code: "ZP-001",
        title: "ZP-001",
        shortDesc: "Sepetli platform modeli.",
        description: "ZP-001 sepetli platform modelidir.",
        specs: [
          { label: "Model", value: "ZP-001" },
          { label: "Kategori", value: "Sepetli Platform" },
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getModelBySlugs(productSlug: string, modelSlug: string) {
  const product = products.find((p) => p.slug === productSlug);
  if (!product) return undefined;

  const model = product.models.find((m) => m.slug === modelSlug);
  if (!model) return undefined;

  return { product, model };
}
