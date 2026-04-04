import { useGetStats, useListNews, useListProducts, getGetStatsQueryKey, getListProductsQueryKey, getListNewsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Package, Newspaper, Image, Tag, TrendingUp, Eye, Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });
  const { data: recentProducts } = useListProducts({ status: "published" }, { query: { queryKey: getListProductsQueryKey({ status: "published" }) } });
  const { data: recentNews } = useListNews({ limit: 3 }, { query: { queryKey: getListNewsQueryKey({ limit: 3 }) } });

  const statCards = [
    { label: "Total Products", value: stats?.productCount ?? 0, icon: Package, href: "/admin/products", color: "text-blue-400" },
    { label: "Categories", value: stats?.categoryCount ?? 0, icon: Tag, href: "/admin/categories", color: "text-green-400" },
    { label: "News Articles", value: recentNews?.length ?? 0, icon: Newspaper, href: "/admin/news", color: "text-yellow-400" },
    { label: "Countries Served", value: stats?.countriesServed ?? 0, icon: TrendingUp, href: "#", color: "text-primary" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back. Here is your overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card, i) => (
          <Link key={i} href={card.href}>
            <div className="bg-slate-800 border border-slate-700 p-6 hover:border-primary transition-colors cursor-pointer" data-testid={`stat-card-${i}`}>
              <div className="flex items-center justify-between mb-4">
                <card.icon className={`w-6 h-6 ${card.color}`} />
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-3xl font-black text-white">{card.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-800 border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-white">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Add New Product", href: "/admin/products/new", icon: Package },
              { label: "Manage Categories", href: "/admin/categories", icon: Tag },
              { label: "Publish News Article", href: "/admin/news", icon: Newspaper },
              { label: "Upload Media", href: "/admin/media", icon: Image },
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer">
                  <action.icon className="w-4 h-4 text-primary" />
                  <span className="text-white text-sm font-bold">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-white">Company Stats</h2>
            <Settings className="w-4 h-4 text-slate-400" />
          </div>
          {!stats ? (
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-8 bg-slate-700" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Years of Experience", value: `${stats.yearsOfExperience}+` },
                { label: "Products Delivered", value: stats.productsDelivered.toLocaleString() + "+" },
                { label: "Countries Served", value: stats.countriesServed },
                { label: "Certifications", value: stats.certifications },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-700">
                  <span className="text-slate-300 text-sm">{row.label}</span>
                  <span className="text-primary font-black">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-slate-800 border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-white">Recent Products</h2>
          <Link href="/admin/products">
            <span className="text-primary text-sm font-bold hover:underline cursor-pointer">View All</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-400 font-bold">Product</th>
                <th className="text-left py-2 px-3 text-slate-400 font-bold">Category</th>
                <th className="text-left py-2 px-3 text-slate-400 font-bold">Capacity</th>
                <th className="text-left py-2 px-3 text-slate-400 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts?.slice(0, 5).map((p) => (
                <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                  <td className="py-3 px-3 text-white font-bold">{p.name}</td>
                  <td className="py-3 px-3 text-slate-300">{p.categoryName}</td>
                  <td className="py-3 px-3 text-slate-300">{p.capacity}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs font-bold px-2 py-1 ${p.status === "published" ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"}`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
