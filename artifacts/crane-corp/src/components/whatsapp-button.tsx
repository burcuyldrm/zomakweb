import { MessageCircle } from "lucide-react";

const WA_MESSAGE = encodeURIComponent(
  "Merhaba, ZOMAK'tan vinç/platform hizmeti için teklif almak istiyorum."
);
const WA_URL = `https://wa.me/905411290102?text=${WA_MESSAGE}`;

export function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-3 shadow-xl transition-all duration-300 group"
      style={{ borderRadius: "2px" }}
    >
      <MessageCircle className="w-6 h-6 flex-shrink-0" />
      <span className="text-sm font-bold hidden group-hover:inline whitespace-nowrap">
        WhatsApp ile Yaz
      </span>
    </a>
  );
}
