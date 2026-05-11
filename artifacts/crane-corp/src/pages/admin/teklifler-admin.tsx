import { useState } from "react";
import { Eye, X, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  department: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

function parseMessage(message: string): { sehir: string; aciklama: string } {
  const lines = message.split("\n\n");
  const sehir = (lines[0] ?? "").replace("Şehir: ", "").trim();
  const aciklama = lines.slice(1).join("\n\n").trim();
  return { sehir, aciklama };
}

function formatId(id: number): string {
  return `TKL-${id.toString().padStart(3, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR");
}

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
  yeni: { label: "Yeni", bg: "bg-blue-100", color: "text-blue-700" },
  incelendi: { label: "İncelendi", bg: "bg-amber-100", color: "text-amber-700" },
  "teklif-verildi": { label: "Teklif Verildi", bg: "bg-emerald-100", color: "text-emerald-700" },
  kapandi: { label: "Kapatıldı", bg: "bg-gray-100", color: "text-gray-600" },
};

async function fetchQuotes(): Promise<Quote[]> {
  const r = await fetch("/api/quotes");
  if (!r.ok) throw new Error("Yüklenemedi");
  return r.json();
}

export default function TekliflerAdmin() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Quote | null>(null);

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });

  const deleteQuote = useMutation({
    mutationFn: async (id: number) => {
      const r = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
      if (!r.ok && r.status !== 204) throw new Error("Silinemedi");
    },
    onSuccess: (_: void, id: number) => {
      queryClient.setQueryData<Quote[]>(["quotes"], (prev) => prev?.filter((q) => q.id !== id) ?? []);
      setSelected((prev) => (prev?.id === id ? null : prev));
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const r = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!r.ok) throw new Error("Güncellenemedi");
      return r.json();
    },
    onSuccess: (updated: Quote) => {
      queryClient.setQueryData<Quote[]>(["quotes"], (prev) =>
        prev?.map((q) => (q.id === updated.id ? updated : q)) ?? []
      );
      setSelected((prev) => (prev?.id === updated.id ? updated : prev));
    },
  });

  const newCount = quotes.filter((q) => q.status === "yeni").length;

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-900">Teklif Talepleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          {isLoading ? "Yükleniyor..." : `${newCount} yeni talep bekliyor · toplam ${quotes.length}`}
        </p>
      </div>

      <div className={`grid ${selected ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-5`}>
        {/* Tablo */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">ID</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Talep Eden</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs hidden md:table-cell">Hizmet</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Durum</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs hidden md:table-cell">Tarih</th>
                <th className="py-3 px-4 text-gray-500 font-semibold text-xs text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(4).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td colSpan={6} className="p-4"><Skeleton className="h-7" /></td>
                    </tr>
                  ))
                : quotes.map((q) => {
                    const st = statusMap[q.status] ?? statusMap.yeni;
                    return (
                      <tr
                        key={q.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          selected?.id === q.id ? "bg-red-50 border-l-2 border-l-[#8B1A1A]" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{formatId(q.id)}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-gray-900 text-sm">{q.name}</div>
                          {q.company && <div className="text-xs text-gray-400">{q.company}</div>}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 text-xs hidden md:table-cell">{q.department}</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${st.bg} ${st.color}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 text-xs hidden md:table-cell">{formatDate(q.createdAt)}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelected(selected?.id === q.id ? null : q)}
                              className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${q.name}" adlı teklif talebini silmek istediğinizden emin misiniz?`))
                                  deleteQuote.mutate(q.id);
                              }}
                              disabled={deleteQuote.isPending}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {!isLoading && quotes.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">Henüz teklif talebi bulunmuyor.</div>
          )}
        </div>

        {/* Detay paneli */}
        {selected && (() => {
          const { sehir, aciklama } = parseMessage(selected.message);
          return (
            <div className="bg-white border border-gray-200 rounded-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">{formatId(selected.id)}</div>
                  <h3 className="font-black text-gray-900">{selected.name}</h3>
                  {selected.company && <p className="text-sm text-gray-500">{selected.company}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-sm">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { label: "Telefon", value: selected.phone },
                  { label: "E-posta", value: selected.email },
                  { label: "Hizmet", value: selected.department },
                  { label: "Şehir", value: sehir },
                  { label: "Tarih", value: formatDate(selected.createdAt) },
                ].map((row) => row.value ? (
                  <div key={row.label} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">{row.label}</span>
                    <span className="text-sm font-semibold text-gray-800">{row.value}</span>
                  </div>
                ) : null)}
              </div>

              {aciklama && (
                <div className="mb-5">
                  <div className="text-xs font-semibold text-gray-400 mb-2">İş Açıklaması</div>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-sm">{aciklama}</p>
                </div>
              )}

              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2">Durumu Güncelle</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusMap).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus.mutate({ id: selected.id, status: key })}
                      disabled={updateStatus.isPending}
                      className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-all border ${
                        selected.status === key
                          ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
