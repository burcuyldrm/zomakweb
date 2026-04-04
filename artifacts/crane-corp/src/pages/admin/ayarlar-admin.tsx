import { useState } from "react";
import { Save, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const sections = [
  {
    title: "Genel Bilgiler",
    fields: [
      { key: "companyName", label: "Şirket Adı", type: "text", value: "Zomak Vinç Platform ve Makina Sanayi" },
      { key: "slogan", label: "Slogan", type: "text", value: "Zirveye Odaklan" },
    ],
  },
  {
    title: "İletişim",
    fields: [
      { key: "phone", label: "Telefon", type: "tel", value: "0541 129 01 02" },
      { key: "email", label: "E-posta", type: "email", value: "info@zomak.com.tr" },
      { key: "whatsapp", label: "WhatsApp (uluslararası)", type: "text", value: "+905411290102" },
    ],
  },
  {
    title: "Adres",
    fields: [
      { key: "address", label: "Adres", type: "textarea", value: "Atatürk Mahallesi 4. Cadde No:54 Oğlananası-Menderes / İzmir" },
      { key: "mapEmbed", label: "Google Maps Embed URL", type: "text", value: "https://maps.google.com/..." },
    ],
  },
  {
    title: "Sosyal Medya",
    fields: [
      { key: "linkedin", label: "LinkedIn URL", type: "text", value: "https://linkedin.com/company/zomak" },
      { key: "website", label: "Web Sitesi", type: "text", value: "https://zomak.com.tr" },
    ],
  },
];

export default function AyarlarAdmin() {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(sections.flatMap(s => s.fields.map(f => [f.key, f.value])))
  );

  function handleSave() {
    toast({ title: "Kaydedildi", description: "Site ayarları güncellendi. (Demo)" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Ayarlar</h1>
          <p className="text-gray-500 text-sm mt-1">Site genelindeki bilgileri buradan düzenleyin.</p>
        </div>
        <Button onClick={handleSave} className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
          <Save className="w-4 h-4 mr-2" /> Kaydet
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white border border-gray-200 rounded-sm">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#8B1A1A]" />
              <h2 className="font-black text-gray-800 text-sm">{section.title}</h2>
            </div>
            <div className="p-5 space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 tracking-wide">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                      rows={3}
                      className="resize-none rounded-sm border-gray-200 text-sm"
                    />
                  ) : (
                    <Input
                      type={field.type}
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="rounded-sm border-gray-200 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer save */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none px-8">
          <Save className="w-4 h-4 mr-2" /> Tüm Ayarları Kaydet
        </Button>
      </div>
    </div>
  );
}
