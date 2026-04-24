interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <div className="relative bg-[#111111] overflow-hidden" style={{ minHeight: "100px" }}>
      {/* Dekoratif arka plan deseni */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Sağ taraf dekoratif şerit */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20" />
      <div className="absolute right-1 top-0 bottom-0 w-[3px] bg-white/10" />

      <div className="relative container mx-auto px-4 md:px-8 pt-12 pb-8">
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
