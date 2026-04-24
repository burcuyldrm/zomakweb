interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <div className="relative bg-[#111111] overflow-hidden" style={{ minHeight: "100px" }}>
      <div className="relative container mx-auto px-4 md:px-8 pt-18 pb-12">
        <div className="text-[10px] font-bold text-white/60 tracking-[0.25em] uppercase mb-3">
          {label}
        </div>
        <h1 className="text-3xl md:text-[44px] font-black text-white leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/70 text-sm mt-3 max-w-2xl leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
