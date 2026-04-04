export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  usage: string[];
  specs: { label: string; value: string }[];
  status: "published" | "draft";
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface Reference {
  id: string;
  companyName: string;
  sector: string;
  projectTitle: string;
  year: string;
  imageUrl?: string;
}

export interface QuoteRequest {
  id: string;
  adSoyad: string;
  firma: string;
  telefon: string;
  email: string;
  hizmetTuru: string;
  sehir: string;
  aciklama: string;
  status: "yeni" | "incelendi" | "teklif-verildi" | "kapandi";
  createdAt: string;
}

export interface CorporateContent {
  about: string;
  vision: string;
  mission: string;
  values: { title: string; desc: string }[];
  qualityPolicy: string;
  environmentPolicy: string;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  linkedin: string;
  mapEmbedUrl: string;
}
