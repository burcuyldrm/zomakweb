import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminLayout } from "@/components/layout/admin-layout";
import { WhatsAppButton } from "@/components/whatsapp-button";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Urunler from "@/pages/urunler";
import UrunDetay from "@/pages/urun-detay";
import Referanslar from "@/pages/referanslar";
import Galeri from "@/pages/galeri";
import Teklif from "@/pages/teklif";
import Contact from "@/pages/contact";

import Hakkimizda from "@/pages/kurumsal/hakkimizda";
import KalitePolitikamiz from "@/pages/kurumsal/kalite-politikamiz";
import CevrePolitikamiz from "@/pages/kurumsal/cevre-politikamiz";
import ArgeUrge from "@/pages/kurumsal/arge-urge";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products-admin";
import ProductForm from "@/pages/admin/product-form";
import AdminCategories from "@/pages/admin/categories-admin";
import AdminNews from "@/pages/admin/news-admin";
import AdminMedia from "@/pages/admin/media-admin";
import UrunlerAdmin from "@/pages/admin/urunler-admin";
import KurumsalAdmin from "@/pages/admin/kurumsal-admin";
import GaleriAdmin from "@/pages/admin/galeri-admin";
import ReferanslarAdmin from "@/pages/admin/referanslar-admin";
import TekliflerAdmin from "@/pages/admin/teklifler-admin";
import AyarlarAdmin from "@/pages/admin/ayarlar-admin";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[120px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>

      {/* Kurumsal */}
      <Route path="/kurumsal/hakkimizda">
        <PublicLayout><Hakkimizda /></PublicLayout>
      </Route>
      <Route path="/kurumsal/kalite-politikamiz">
        <PublicLayout><KalitePolitikamiz /></PublicLayout>
      </Route>
      <Route path="/kurumsal/cevre-politikamiz">
        <PublicLayout><CevrePolitikamiz /></PublicLayout>
      </Route>
      <Route path="/kurumsal/arge-urge">
        <PublicLayout><ArgeUrge /></PublicLayout>
      </Route>

      {/* Ürünler */}
      <Route path="/urunler">
        <PublicLayout><Urunler /></PublicLayout>
      </Route>
      <Route path="/urunler/:slug">
        <PublicLayout><UrunDetay /></PublicLayout>
      </Route>

      {/* Other public */}
      <Route path="/referanslar">
        <PublicLayout><Referanslar /></PublicLayout>
      </Route>
      <Route path="/galeri">
        <PublicLayout><Galeri /></PublicLayout>
      </Route>
      <Route path="/teklif">
        <PublicLayout><Teklif /></PublicLayout>
      </Route>
      <Route path="/iletisim">
        <PublicLayout><Contact /></PublicLayout>
      </Route>

      {/* Legacy redirects */}
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/hizmetler">
        <PublicLayout><Urunler /></PublicLayout>
      </Route>

      {/* Admin */}
      <Route path="/admin"><AdminLogin /></Route>
      <Route path="/admin/login"><AdminLogin /></Route>
      <Route path="/admin/dashboard">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/products">
        <AdminLayout><AdminProducts /></AdminLayout>
      </Route>
      <Route path="/admin/products/new">
        <AdminLayout><ProductForm /></AdminLayout>
      </Route>
      <Route path="/admin/products/:slug/edit">
        {() => <AdminLayout><ProductForm /></AdminLayout>}
      </Route>
      <Route path="/admin/categories">
        <AdminLayout><AdminCategories /></AdminLayout>
      </Route>
      <Route path="/admin/news">
        <AdminLayout><AdminNews /></AdminLayout>
      </Route>
      <Route path="/admin/media">
        <AdminLayout><AdminMedia /></AdminLayout>
      </Route>

      {/* Admin — ZOMAK sections */}
      <Route path="/admin/urunler">
        <AdminLayout><UrunlerAdmin /></AdminLayout>
      </Route>
      <Route path="/admin/kurumsal">
        <AdminLayout><KurumsalAdmin /></AdminLayout>
      </Route>
      <Route path="/admin/galeri">
        <AdminLayout><GaleriAdmin /></AdminLayout>
      </Route>
      <Route path="/admin/referanslar">
        <AdminLayout><ReferanslarAdmin /></AdminLayout>
      </Route>
      <Route path="/admin/teklifler">
        <AdminLayout><TekliflerAdmin /></AdminLayout>
      </Route>
      <Route path="/admin/ayarlar">
        <AdminLayout><AyarlarAdmin /></AdminLayout>
      </Route>

      {/* 404 */}
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
