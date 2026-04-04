import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetProduct, useCreateProduct, useUpdateProduct, useListCategories, getGetProductQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens"),
  categoryId: z.coerce.number().min(1, "Select a category"),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  capacity: z.string().min(1),
  coverImage: z.string().url("Must be a valid URL"),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  sortOrder: z.coerce.number().default(0),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm() {
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = !!slug;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories } = useListCategories();
  const { data: product } = useGetProduct(slug ?? "", {
    query: { enabled: isEdit, queryKey: getGetProductQueryKey(slug ?? "") }
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "", slug: "", categoryId: 0, shortDescription: "", description: "",
      capacity: "", coverImage: "", status: "published", featured: false, sortOrder: 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        capacity: product.capacity,
        coverImage: product.coverImage,
        status: product.status as "published" | "draft",
        featured: product.featured,
        sortOrder: product.sortOrder,
      });
    }
  }, [product, form]);

  function onSubmit(values: ProductFormValues) {
    if (isEdit) {
      updateProduct.mutate(
        { slug: slug!, data: { ...values, specs: [], gallery: [], usageAreas: [], optionalEquipment: [] } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
            toast({ title: "Product updated successfully" });
            setLocation("/admin/products");
          },
          onError: () => toast({ title: "Error", description: "Update failed.", variant: "destructive" }),
        }
      );
    } else {
      createProduct.mutate(
        {
          data: {
            ...values,
            specs: [],
            gallery: [],
            usageAreas: [],
            optionalEquipment: [],
            pdfUrl: null,
          }
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
            toast({ title: "Product created successfully" });
            setLocation("/admin/products");
          },
          onError: () => toast({ title: "Error", description: "Creation failed.", variant: "destructive" }),
        }
      );
    }
  }

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">{isEdit ? "Edit Product" : "Add New Product"}</h1>
          <p className="text-slate-400 mt-1">{isEdit ? `Editing: ${product?.name}` : "Create a new product listing"}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-product">
          <div className="bg-slate-800 border border-slate-700 p-6 space-y-5">
            <h2 className="font-black text-white uppercase text-sm tracking-wider mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">PRODUCT NAME *</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-700 border-slate-600 text-white rounded-none" {...field} data-testid="input-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">SLUG (URL) *</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-700 border-slate-600 text-white rounded-none" placeholder="my-product-name" {...field} data-testid="input-slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">CATEGORY *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white rounded-none" data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="capacity" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">CAPACITY *</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-700 border-slate-600 text-white rounded-none" placeholder="e.g. 100 tons" {...field} data-testid="input-capacity" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="shortDescription" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">SHORT DESCRIPTION *</FormLabel>
                <FormControl>
                  <Textarea className="bg-slate-700 border-slate-600 text-white rounded-none min-h-[80px] resize-none" {...field} data-testid="textarea-short-desc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">FULL DESCRIPTION *</FormLabel>
                <FormControl>
                  <Textarea className="bg-slate-700 border-slate-600 text-white rounded-none min-h-[140px] resize-none" {...field} data-testid="textarea-desc" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="coverImage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">COVER IMAGE URL *</FormLabel>
                <FormControl>
                  <Input className="bg-slate-700 border-slate-600 text-white rounded-none" placeholder="https://..." {...field} data-testid="input-cover-image" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="bg-slate-800 border border-slate-700 p-6 space-y-5">
            <h2 className="font-black text-white uppercase text-sm tracking-wider mb-4">Publishing Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">STATUS</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white rounded-none" data-testid="select-status">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="sortOrder" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">SORT ORDER</FormLabel>
                  <FormControl>
                    <Input className="bg-slate-700 border-slate-600 text-white rounded-none" type="number" {...field} data-testid="input-sort-order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="featured" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 font-bold text-xs tracking-wider">FEATURED</FormLabel>
                  <div className="flex items-center gap-3 mt-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="switch-featured"
                      />
                    </FormControl>
                    <span className="text-slate-300 text-sm">{field.value ? "Yes" : "No"}</span>
                  </div>
                </FormItem>
              )} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" className="font-bold px-8" disabled={isPending} data-testid="button-save">
              {isPending ? "SAVING..." : isEdit ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
            </Button>
            <Link href="/admin/products">
              <Button type="button" variant="outline" className="font-bold border-slate-600 text-slate-300 hover:bg-slate-700">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
