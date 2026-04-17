export interface ProductModel {
  slug: string;
  code: string;
  title: string;
  shortDesc: string;
  description: string;
  image?: string;
  images?: string[];
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
        image: "/images/products/zk-105.png",
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
        image: "/images/products/zk-150.png",
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
    slug: "kurtarici",
    title: "Kurtarıcı",
    shortDesc: "Kurtarıcı ürün grubumuzu inceleyin.",
    description:
      "Kurtarıcı ürün grubumuz, araç kurtarma ve çekici uygulamalarına yönelik model seçenekleri sunar.",
    usage: [
      "Yol yardım hizmetleri",
      "Araç taşıma ve kurtarma",
      "Servis ve saha operasyonları",
    ],
    specs: [
      { label: "Kategori", value: "Kurtarıcı" },
      { label: "Model Sayısı", value: "3" },
      { label: "Seri", value: "ZK" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zk-a25",
        code: "ZK-A25",
        title: "ZK-A25",
        shortDesc: "Kurtarıcı modeli.",
        description: "ZK-A25 kurtarıcı modelidir.",
        image: "/images/products/zk-a25.jpg",
        specs: [
          { label: "Model", value: "ZK-A25" },
          { label: "Kategori", value: "Kurtarıcı" },
        ],
      },
      {
        slug: "zk-g100",
        code: "ZK-G100",
        title: "ZK-G100",
        shortDesc: "Kurtarıcı modeli.",
        description: "ZK-G100 kurtarıcı modelidir.",
        image: "/images/products/zk-g100-1.jpeg",
        images: [
          "/images/products/zk-g100-1.jpeg",
          "/images/products/zk-g100-2.jpeg",
          "/images/products/zk-g100-3.jpeg",
        ],
        specs: [
          { label: "Model", value: "ZK-G100" },
          { label: "Kategori", value: "Kurtarıcı" },
        ],
      },
      {
        slug: "zk-g300",
        code: "ZK-G300",
        title: "ZK-G300",
        shortDesc: "Kurtarıcı modeli.",
        description: "ZK-G300 kurtarıcı modelidir.",
        image: "/images/products/zk-g300-1.jpeg",
        images: [
          "/images/products/zk-g300-1.jpeg",
          "/images/products/zk-g300-2.jpeg",
          "/images/products/zk-g300-3.jpeg",
          "/images/products/zk-g300-4.jpeg",
          "/images/products/zk-g300-5.jpeg",
          "/images/products/zk-g300-6.jpeg",
          "/images/products/zk-g300-7.jpeg",
          "/images/products/zk-g300-8.jpeg",
          "/images/products/zk-g300-9.jpeg",
        ],
        specs: [
          { label: "Model", value: "ZK-G300" },
          { label: "Kategori", value: "Kurtarıcı" },
        ],
      },
    ],
  },
  {
    slug: "kayar-kasa",
    title: "Kayar Kasa",
    shortDesc: "Kayar kasa ürün grubumuzu inceleyin.",
    description:
      "Kayar kasa ürün grubumuz, pratik kullanım ve taşıma çözümleri için model seçenekleri sunar.",
    usage: [
      "Araç üstü taşıma sistemleri",
      "Lojistik uygulamaları",
      "Saha ve servis çözümleri",
    ],
    specs: [
      { label: "Kategori", value: "Kayar Kasa" },
      { label: "Model Sayısı", value: "2" },
      { label: "Seri", value: "ZK-S" },
      { label: "Menşei", value: "Türkiye" },
    ],
    models: [
      {
        slug: "zk-s15",
        code: "ZK-S15",
        title: "ZK-S15",
        shortDesc: "Kayar kasa modeli.",
        description: "ZK-S15 kayar kasa modelidir.",
        image: "/images/products/zk-s15.jpg",
        specs: [
          { label: "Model", value: "ZK-S15" },
          { label: "Kategori", value: "Kayar Kasa" },
        ],
      },
      {
        slug: "zk-s25",
        code: "ZK-S25",
        title: "ZK-S25",
        shortDesc: "Kayar kasa modeli.",
        description: "ZK-S25 kayar kasa modelidir.",
        specs: [
          { label: "Model", value: "ZK-S25" },
          { label: "Kategori", value: "Kayar Kasa" },
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
