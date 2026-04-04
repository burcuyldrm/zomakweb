import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
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
      setLocation("/admin/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-2xl font-black text-white mb-2">
            <div className="w-9 h-9 bg-primary flex items-center justify-center">
              <span className="text-white text-xl font-black">C</span>
            </div>
            CRANE<span className="text-primary">CORP</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Admin Portal</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-black text-white text-lg">Admin Login</h1>
              <p className="text-gray-400 text-xs">Secure portal access</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-admin-login">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-bold text-xs tracking-wider">EMAIL ADDRESS</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500 rounded-none"
                        placeholder="admin@cranecorp.com"
                        type="email"
                        {...field}
                        data-testid="input-email"
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
                    <FormLabel className="text-gray-300 font-bold text-xs tracking-wider">PASSWORD</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500 rounded-none pr-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          data-testid="input-password"
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
                className="w-full h-12 font-bold rounded-none mt-2"
                disabled={loading}
                data-testid="button-login"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Demo: any email and password works
          </p>
        </div>
      </div>
    </div>
  );
}
