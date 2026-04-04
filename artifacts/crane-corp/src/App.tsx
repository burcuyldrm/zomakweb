import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdminLayout } from "@/components/layout/admin-layout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Corporate from "@/pages/corporate";
import Media from "@/pages/media";
import Contact from "@/pages/contact";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProducts from "@/pages/admin/products-admin";
import ProductForm from "@/pages/admin/product-form";
import AdminCategories from "@/pages/admin/categories-admin";
import AdminNews from "@/pages/admin/news-admin";
import AdminMedia from "@/pages/admin/media-admin";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[104px] md:pt-[132px]">{children}</main>
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/products">
        <PublicLayout><Products /></PublicLayout>
      </Route>
      <Route path="/products/:slug">
        {(params) => <PublicLayout><ProductDetail /></PublicLayout>}
      </Route>
      <Route path="/corporate">
        <PublicLayout><Corporate /></PublicLayout>
      </Route>
      <Route path="/media">
        <PublicLayout><Media /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <AdminLogin />
      </Route>
      <Route path="/admin/login">
        <AdminLogin />
      </Route>
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
        {(params) => <AdminLayout><ProductForm /></AdminLayout>}
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

      {/* 404 */}
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
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
