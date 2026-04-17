import { Link } from "react-router-dom";

type Product = {
  slug: string;
  title: string;
  groupTitle: string;
  image: string;
};

type CategoryPageProps = {
  categoryTitle: string;
  categorySlug: string;
  products: Product[];
  productImages: Record<string, string>;
};

export default function CategoryPage({
  categoryTitle,
  categorySlug,
  products,
  productImages,
}: CategoryPageProps) {
  const sidebarItems = [
    "Sepetli Platformlar",
    "Vinç Grubu",
    "İtfaiye Araçları",
    "Çevre Araçları",
    "Römork",
    "Havalimanı Ekipmanları",
  ];

  return (
    <section className="bg-[#f3f3f3] py-12">
      <div className="mx-auto w-full max-w-[1064px] px-4">
        <div className="mb-10 text-center">
          <h1 className="text-[34px] font-bold tracking-[0.35em] text-[#7a0c0c]">
            ÜRÜNLER
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-[calc(100%-420px)]">
            <div className="mb-6">
              <h2 className="text-[28px] font-semibold text-[#3c3c3c]">
                {categoryTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  to={`/urunler/${categorySlug}/${product.slug}`}
                  className="group relative block min-h-[320px] overflow-hidden rounded-[22px]"
                >
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#d8d8d8] to-[#f3f3f3] transition-all duration-500 group-hover:bg-[#ffd842]" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex h-[136px] flex-col justify-end px-6 pb-8 pt-6">
                      <span className="text-[16px] font-light text-[#535353]">
                        {product.title}
                      </span>

                      <h3 className="mt-1 text-[28px] leading-none font-semibold text-[#3c3c3c] transition-colors duration-300 group-hover:text-[#1f1f1f]">
                        {product.groupTitle}
                      </h3>

                      <span className="relative top-[-6px] mt-6 block h-[8px] w-[62px] rounded-full bg-[#3c3c3c]" />
                    </div>

                    <div className="mt-[40px] flex min-h-[150px] items-center justify-center px-6 pb-8">
                      <img
                        src={productImages[product.slug] ?? product.image}
                        alt={product.title}
                        className="max-h-[140px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="w-full lg:ml-10 lg:w-[380px]">
            <div className="overflow-hidden rounded-[10px] bg-white shadow-sm">
              <div className="bg-[#d9d9d9] px-5 py-4 text-[15px] font-semibold text-[#666]">
                Kategoriler
              </div>

              <div className="divide-y divide-[#e4e4e4]">
                {sidebarItems.map((item) => (
                  <button
                    key={item}
                    className="flex w-full items-center px-5 py-4 text-left text-[15px] text-[#6a6a6a] transition-colors duration-300 hover:bg-[#f6f6f6] hover:text-[#8B1A1A]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[10px] bg-[#1f1f1f]">
              <div className="flex min-h-[170px] items-center justify-center px-4 py-6 text-center text-white">
                Tanıtım Filmi Alanı
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[10px] bg-[#d71920] p-5 text-white">
              <div className="text-[22px] font-bold">E-Katalog</div>
              <p className="mt-2 text-sm text-white/90">
                Kataloğu incelemek için tıklayın.
              </p>
              <button className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#d71920]">
                İncele
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
