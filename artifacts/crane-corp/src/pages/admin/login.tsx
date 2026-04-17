import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import logoImg from "@assets/ZOMAKLOGO_1775573024840.png";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(1, "Şifre zorunludur"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(_values: LoginValues) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation("/admin/urunler");
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <img
            src={logoImg as unknown as string}
            alt="ZOMAK"
            className="h-12 w-auto object-contain mx-auto mb-4 brightness-0 invert"
          />
          <p className="text-gray-400 text-sm mt-2 tracking-widest uppercase text-[11px]">
            Yönetim Paneli
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-8 rounded-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#8B1A1A]/20 flex items-center justify-center rounded-sm">
              <Lock className="w-5 h-5 text-[#B3201D]" />
            </div>
            <div>
              <h1 className="font-black text-white text-lg">Giriş Yap</h1>
              <p className="text-gray-400 text-xs">Yönetim paneline erişim</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-bold text-xs tracking-wider">E-POSTA</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500 rounded-sm"
                        placeholder="admin@zomak.com.tr"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-bold text-xs tracking-wider">ŞİFRE</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500 rounded-sm pr-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-12 font-bold rounded-sm mt-2 bg-[#8B1A1A] hover:bg-[#A52020] text-white"
                disabled={loading}
              >
                {loading ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
