export interface Product {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  usage: string[];
  specs?: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    slug: "mobil-katlanir-vinc",
    title: "Mobil Katlanır Vinç",
    shortDesc: "Kompakt yapısı ve yüksek kapasitesiyle dar alanlarda üstün kaldırma performansı.",
    description:
      "Katlanır kollu vinçlerimiz, geniş bir bom uzunluğu yelpazesi ve yüksek kaldırma kapasitesi sunarak her ölçekteki projede güvenilir çözümler üretmektedir. Kompakt tasarımı sayesinde sınırlı manevra alanına sahip şantiyelerde, sanayi tesislerinde ve kentsel projelerde kolaylıkla konuşlandırılabilmektedir. Uzaktan kumanda desteği ve hızlı kurulum özellikleri, operasyonel verimliliği en üst düzeye taşımaktadır.",
    usage: [
      "İnşaat şantiyeleri ve yapı projeleri",
      "Sanayi tesisi kurulum ve bakımı",
      "Liman ve depo operasyonları",
      "Enerji santrali projeleri",
      "Maden işletmeleri",
    ],
    specs: [
      { label: "Tip", value: "Mobil Katlanır Vinç" },
      { label: "Kapasite", value: "60 ton/metre (ZV060)" },
      { label: "Bom Uzunluğu", value: "27 metre" },
      { label: "Kontrol", value: "Uzaktan kumanda" },
      { label: "Menşei", value: "Türkiye" },
    ],
  },
  {
    slug: "hidrolik-gozluklu-kurtarici",
    title: "Hidrolik Gözlüklü Kurtarıcı",
    shortDesc: "Ağır araç kurtarma operasyonlarında güvenilir ve etkin hidrolik sistem.",
    description:
      "Gözlüklü hidrolik kurtarıcı sistemlerimiz, ağır taşıtların ve araçların güvenli biçimde kurtarılmasını sağlamak üzere tasarlanmıştır. Uzun kollu gözlük mekanizması, kritik açılarda bile yüksek kaldırma kapasitesi sunmakta; zorlu arazi koşullarında ve dar bölgelerde etkin çalışma imkânı sağlamaktadır. Güçlü hidrolik sistemi ve sağlam çelik yapısıyla uzun ömürlü kullanım için optimize edilmiştir.",
    usage: [
      "Yol kurtarma ve güzergah açma",
      "Ağır taşıt ve TIR kurtarma",
      "Kaza sonrası araç tahliyesi",
      "Otoyol acil müdahale",
    ],
    specs: [
      { label: "Tip", value: "Hidrolik Gözlüklü Kurtarıcı" },
      { label: "Uygulama", value: "Ağır araç kurtarma" },
      { label: "Sistem", value: "Hidrolik" },
      { label: "Menşei", value: "Türkiye" },
    ],
  },
  {
    slug: "hidrolik-kurtarici",
    title: "Hidrolik Kurtarıcı",
    shortDesc: "TIR, otobüs ve ağır iş makinesi kurtarma için özel tasarım sistemler.",
    description:
      "Standart hidrolik kurtarıcılarımız; TIR, otobüs, kamyon ve ağır iş makinelerinin zorlu koşullarda kurtarılması için özel olarak mühendislenmiştir. Sağlam yapısı ve yüksek kapasitesiyle en ağır yükleri bile güvenli şekilde taşıyabilen sistemlerimiz, uzun vadeli dayanıklılık ve minimum bakım maliyeti sunmaktadır.",
    usage: [
      "Ağır nakliye araçları kurtarma",
      "Otoyol ve şehir içi müdahale",
      "Dağlık ve sarp arazi operasyonları",
      "Off-road kurtarma hizmetleri",
    ],
    specs: [
      { label: "Tip", value: "Hidrolik Kurtarıcı" },
      { label: "Uygulama", value: "Ağır taşıt kurtarma" },
      { label: "Sistem", value: "Hidrolik" },
      { label: "Menşei", value: "Türkiye" },
    ],
  },
  {
    slug: "ozel-hidrolik-makineler",
    title: "Özel Hidrolik Makineler",
    shortDesc: "Standart çözümlerin yetersiz kaldığı projelere özel tasarım ve üretim.",
    description:
      "Müşteri ihtiyaçlarına özel tasarlanan hidrolik makine sistemlerimiz, standart ekipmanların karşılayamadığı projelere yönelik mühendislik çözümleri sunar. Deneyimli tasarım ekibimiz, her projeyi baştan değerlendirerek kapasitesini, boyutunu, güç sistemini ve çalışma koşullarını bütünüyle optimize etmektedir. Prototipten seri üretime kadar tüm süreç ZOMAK bünyesinde yönetilmektedir.",
    usage: [
      "Özel sanayi ve altyapı projeleri",
      "Enerji sektörü kurulumları",
      "Maden makineleri ve ekipmanları",
      "Liman ve kargo yükleme sistemleri",
    ],
    specs: [
      { label: "Tip", value: "Özel Tasarım" },
      { label: "Uygulama", value: "Projeye özel" },
      { label: "Üretim", value: "Prototip & Seri" },
      { label: "Menşei", value: "Türkiye" },
    ],
  },
  {
    slug: "sepetli-platform",
    title: "Sepetli Platform",
    shortDesc: "Yüksekte çalışma gerektiren operasyonlar için güvenli ve konforlu platform.",
    description:
      "İzoleli ve izolasyonsuz sepetli platformlarımız, yüksekte gerçekleştirilen her türlü bakım, kurulum ve operasyon için uygun alternatif çözümler sunar. Elektrik şebekeleri, ağaç budama, bina cephe bakımı, aydınlatma kurulumu ve sinyal tesisi gibi alanlarda çalışanların güvenliğini ön planda tutarak etkin bir çalışma ortamı sağlar.",
    usage: [
      "Elektrik şebekesi bakım ve kurulum",
      "Ağaç budama ve kentsel yeşil alan",
      "Bina cephe ve çatı bakımı",
      "Aydınlatma direkleri kurulumu",
      "Telekomünikasyon sinyal tesisi",
    ],
    specs: [
      { label: "Tip", value: "Sepetli Platform" },
      { label: "Uygulama", value: "Yüksekte çalışma" },
      { label: "İzolasyon", value: "Seçenekli" },
      { label: "Menşei", value: "Türkiye" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
