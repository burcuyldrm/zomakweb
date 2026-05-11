import { Link } from "wouter";
import { Package, Star, FileText, TrendingUp, Plus, Eye, Clock, CheckCircle, AlertCircle, Image } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  productCount: number;
  categoryCount: number;
  referenceCount: number;
  quoteCount: number;
}

interface Quote {
  id: number;
  name: string;
  company: string | null;
  department: string | null;
  message: string;
  status: string;
  createdAt: string;
}

function parseCity(message: string): string {
  return (message.split("\n\n")[0] ?? "").replace("Şehir: ", "").trim();
}

function formatId(id: number): string {
  return `TKL-${id.toString().padStart(3, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR");
}

const statusBadge = (s: string) => {
  if (s === "yeni") return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-sm"><AlertCircle className="w-3 h-3" />Yeni</span>;
  if (s === "incelendi") return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-sm"><Clock className="w-3 h-3" />İncelendi</span>;
  if (s === "teklif-verildi") return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-sm"><CheckCircle className="w-3 h-3" />Teklif Verildi</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm">{s}</span>;
};

const quickActions = [
  { label: "Yeni Ürün Ekle", href: "/admin/urunler/yeni", icon: Package },
  { label: "Galeri Güncelle", href: "/admin/galeri", icon: Image },
  { label: "Teklifleri İncele", href: "/admin/teklifler", icon: FileText },
  { label: "Referans Ekle", href: "/admin/referanslar", icon: Star },
];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetch("/api/stats").then((r) => r.json()),
  });

  const { data: allQuotes, isLoading: quotesLoading } = useQuery<Quote[]>({
    queryKey: ["quotes"],
    queryFn: () => fetch("/api/quotes").then((r) => r.json()),
  });

  const newQuoteCount = allQuotes?.filter((q) => q.status === "yeni").length ?? 0;
  const recentQuotes = (allQuotes ?? []).slice(0, 5);

  const statCards = [
    { label: "Ürünler", value: stats?.productCount, icon: Package, href: "/admin/urunler", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Referanslar", value: stats?.referenceCount, icon: Star, href: "/admin/referanslar", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Kategoriler", value: stats?.categoryCount, icon: Image, href: "/admin/kategoriler", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Yeni Teklifler", value: newQuoteCount, icon: FileText, href: "/admin/teklifler", color: "text-[#8B1A1A]", bg: "bg-red-50" },
  ];

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">ZOMAK yönetim paneline hoş geldiniz.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {statCards.map((c, i) => (
          <Link key={i} href={c.href}>
            <div className="bg-white border border-gray-200 p-5 hover:border-[#8B1A1A] hover:shadow-sm transition-all cursor-pointer rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-sm ${c.bg} flex items-center justify-center`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <Eye className="w-4 h-4 text-gray-300" />
              </div>
              {statsLoading || (c.label === "Yeni Teklifler" && quotesLoading) ? (
                <Skeleton className="h-9 w-12 mb-1" />
              ) : (
                <div className="text-3xl font-black text-gray-900">{c.value ?? 0}</div>
              )}
              <div className="text-xs font-semibold text-gray-400 mt-1">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        {/* Hızlı İşlemler */}
        <div className="bg-white border border-gray-200 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">Hızlı İşlemler</h2>
            <TrendingUp className="w-4 h-4 text-gray-300" />
          </div>
          <div className="space-y-2">
            {quickActions.map((a, i) => (
              <Link key={i} href={a.href}>
                <div className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#8B1A1A] hover:text-white rounded-sm transition-all cursor-pointer group">
                  <a.icon className="w-4 h-4 text-[#8B1A1A] group-hover:text-white" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-white">{a.label}</span>
                  <Plus className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover:text-white/70" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Şirket Özeti */}
        <div className="bg-white border border-gray-200 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">Şirket Özeti</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: "Ürün Grubu", value: statsLoading ? "—" : `${stats?.categoryCount ?? 0} Kategori` },
              { label: "Aktif Referans", value: statsLoading ? "—" : `${stats?.referenceCount ?? 0} Firma` },
              { label: "Toplam Ürün", value: statsLoading ? "—" : `${stats?.productCount ?? 0} Model` },
              { label: "Telefon", value: "0541 129 01 02" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-sm">
                <span className="text-sm text-gray-500 font-medium">{r.label}</span>
                <span className="text-sm font-bold text-gray-800">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Son Teklif Talepleri */}
      <div className="bg-white border border-gray-200 rounded-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-gray-900">Son Teklif Talepleri</h2>
          <Link href="/admin/teklifler">
            <span className="text-sm font-semibold text-[#8B1A1A] hover:underline cursor-pointer">Tümünü Gör →</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs">ID</th>
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs">Ad Soyad</th>
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs hidden md:table-cell">Hizmet</th>
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs hidden md:table-cell">Şehir</th>
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs">Durum</th>
                <th className="text-left py-2 px-3 text-gray-400 font-semibold text-xs hidden lg:table-cell">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {quotesLoading
                ? Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td colSpan={6} className="py-3 px-3"><Skeleton className="h-5" /></td>
                    </tr>
                  ))
                : recentQuotes.length === 0
                ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">Henüz teklif talebi yok.</td>
                    </tr>
                  )
                : recentQuotes.map((q) => (
                    <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 text-gray-400 font-mono text-xs">{formatId(q.id)}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{q.name}</div>
                        {q.company && <div className="text-xs text-gray-400">{q.company}</div>}
                      </td>
                      <td className="py-3 px-3 text-gray-600 hidden md:table-cell">{q.department}</td>
                      <td className="py-3 px-3 text-gray-600 hidden md:table-cell">{parseCity(q.message)}</td>
                      <td className="py-3 px-3">{statusBadge(q.status)}</td>
                      <td className="py-3 px-3 text-gray-400 text-xs hidden lg:table-cell">{formatDate(q.createdAt)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
