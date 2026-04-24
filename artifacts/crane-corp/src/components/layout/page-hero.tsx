interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <div className="relative bg-[#111111] overflow-hidden">
      <div className="relative container mx-auto px-4 md:px-8 py-17 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/70 text-sm mt-4 max-w-2xl leading-relaxed font-medium md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
