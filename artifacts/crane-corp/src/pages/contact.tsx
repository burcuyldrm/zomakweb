import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  department: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const departments = [
  { value: "sales", label: "Sales & Quotations" },
  { value: "technical", label: "Technical Support" },
  { value: "aftersales", label: "After-Sales Service" },
  { value: "parts", label: "Spare Parts" },
  { value: "dealer", label: "Dealer Inquiries" },
  { value: "general", label: "General Inquiries" },
];

const offices = [
  {
    city: "Headquarters — New York",
    address: "123 Industrial Way, Heavy Machinery District, NY 10001",
    phone: "+1 (800) 555-CRANE",
    email: "hq@cranecorp.com",
    hours: "Mon–Fri: 8:00–18:00 EST",
  },
  {
    city: "European Office — Frankfurt",
    address: "Industriestraße 45, 60329 Frankfurt am Main, Germany",
    phone: "+49 69 1234 5678",
    email: "europe@cranecorp.com",
    hours: "Mon–Fri: 8:00–17:00 CET",
  },
  {
    city: "Asia Pacific — Singapore",
    address: "18 Tuas South Avenue 2, Singapore 637022",
    phone: "+65 6123 4567",
    email: "apac@cranecorp.com",
    hours: "Mon–Fri: 9:00–18:00 SGT",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      department: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    submitContact.mutate(
      {
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone ?? null,
          company: values.company ?? null,
          department: values.department ?? null,
          subject: values.subject,
          message: values.message,
        },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setSubmitted(true);
            toast({ title: "Message sent!", description: data.message });
          }
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0f172a] text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">GET IN TOUCH</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Our sales engineers and technical specialists are ready to discuss your lifting requirements.
          </p>
        </div>
      </div>

      {/* Offices */}
      <section className="py-16 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-black text-lg mb-4 text-primary">{office.city}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{office.address}</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{office.phone}</span>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{office.email}</span>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{office.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <div className="text-xs font-bold text-primary tracking-widest mb-3">SEND A MESSAGE</div>
              <h2 className="text-3xl font-black uppercase mb-8">Request Information</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2 text-green-800">Message Sent!</h3>
                  <p className="text-green-700">Our team will respond within 24 business hours.</p>
                  <Button className="mt-6" onClick={() => { setSubmitted(false); form.reset(); }}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs tracking-wider">FULL NAME *</FormLabel>
                            <FormControl>
                              <Input className="rounded-none" placeholder="John Smith" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs tracking-wider">EMAIL ADDRESS *</FormLabel>
                            <FormControl>
                              <Input className="rounded-none" type="email" placeholder="john@company.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs tracking-wider">PHONE</FormLabel>
                            <FormControl>
                              <Input className="rounded-none" placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs tracking-wider">COMPANY</FormLabel>
                            <FormControl>
                              <Input className="rounded-none" placeholder="Your Company Ltd." {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs tracking-wider">DEPARTMENT</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none" data-testid="select-department">
                                <SelectValue placeholder="Select department..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((d) => (
                                <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs tracking-wider">SUBJECT *</FormLabel>
                          <FormControl>
                            <Input className="rounded-none" placeholder="e.g. Quotation for 100T Mobile Crane" {...field} data-testid="input-subject" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs tracking-wider">MESSAGE *</FormLabel>
                          <FormControl>
                            <Textarea
                              className="rounded-none min-h-[140px] resize-none"
                              placeholder="Describe your project requirements, lifting capacity needed, work environment, timeline..."
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-14 font-bold text-base rounded-none"
                      disabled={submitContact.isPending}
                      data-testid="button-submit"
                    >
                      {submitContact.isPending ? "SENDING..." : "SEND MESSAGE"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Map Placeholder + Info */}
            <div className="space-y-8">
              <div>
                <div className="text-xs font-bold text-primary tracking-widest mb-3">HEADQUARTERS</div>
                <h2 className="text-3xl font-black uppercase mb-6">Find Us</h2>
              </div>
              
              {/* Map Placeholder */}
              <div className="aspect-[4/3] bg-muted border border-border flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-bold text-lg">CraneCorp Headquarters</p>
                  <p className="text-muted-foreground text-sm">123 Industrial Way, NY 10001</p>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="space-y-4">
                <h3 className="font-black uppercase text-lg flex items-center gap-3">
                  <span className="w-6 h-1 bg-primary inline-block" /> Department Contacts
                </h3>
                {[
                  { dept: "Sales & Quotations", phone: "+1 (800) 555-7263", email: "sales@cranecorp.com" },
                  { dept: "Technical Support", phone: "+1 (800) 555-8324", email: "support@cranecorp.com" },
                  { dept: "After-Sales", phone: "+1 (800) 555-2783", email: "service@cranecorp.com" },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 border border-border">
                    <div>
                      <div className="font-bold text-sm">{d.dept}</div>
                      <div className="text-xs text-muted-foreground">{d.email}</div>
                    </div>
                    <a href={`tel:${d.phone}`} className="text-primary font-bold text-sm hover:underline">
                      {d.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
