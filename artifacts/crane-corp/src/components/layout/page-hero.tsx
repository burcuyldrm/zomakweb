interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <div
      className="relative bg-[#f7f7f7] border-t border-b border-gray-200 flex items-center"
      style={{ minHeight: "130px" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="text-[11px] font-bold text-[#8B1A1A] tracking-widest mb-2">{label}</div>
        <h1 className="text-3xl md:text-[42px] font-black text-gray-900 leading-tight">{title}</h1>
        {description && (
          <p className="text-gray-500 text-sm mt-2 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
