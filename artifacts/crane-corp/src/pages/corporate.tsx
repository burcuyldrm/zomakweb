import { motion } from "framer-motion";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Shield, Award, Cog, Globe, Users, Target } from "lucide-react";

const certs = [
  { name: "ISO 9001:2015", desc: "Quality Management System" },
  { name: "CE Mark", desc: "European Conformity" },
  { name: "OSHA Compliance", desc: "Occupational Safety" },
  { name: "TUV Rheinland", desc: "Technical Inspection" },
  { name: "EN 13000", desc: "Mobile Crane Safety Standard" },
  { name: "FEM Standards", desc: "Federation Europeenne de la Manutention" },
];

const timeline = [
  { year: "1988", event: "Company founded with first 5-ton overhead crane production." },
  { year: "1995", event: "Expanded to mobile crane manufacturing. First export to Europe." },
  { year: "2003", event: "ISO 9001 certification achieved. R&D department established." },
  { year: "2010", event: "CR series crawler crane launched. Reached 50-country export milestone." },
  { year: "2018", event: "Digital transformation — IntelliLift IoT monitoring system introduced." },
  { year: "2024", event: "800-ton crawler crane world premiere. Global dealer network of 180+ partners." },
];

export default function Corporate() {
  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0f172a] text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">WHO WE ARE</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4">Corporate</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Over three decades of engineering excellence, building the cranes that build the world.
          </p>
        </div>
      </div>

      {/* Company Intro */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-bold text-primary tracking-widest mb-3">ESTABLISHED 1988</div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6">Engineering Lifting Solutions Since 1988</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CraneCorp Heavy Industries began with a singular vision: to manufacture cranes that combine superior engineering with uncompromising safety. Founded in 1988 by a team of mechanical engineers, we have grown from a regional manufacturer into a globally recognized lifting solutions provider.
                </p>
                <p>
                  Today, our 2.4 million square meter manufacturing complex employs over 3,800 specialists — from structural engineers and metallurgists to software developers and after-sales technicians. Every crane that leaves our facility embodies decades of accumulated expertise.
                </p>
                <p>
                  Our products operate in some of the world's most challenging environments: Arctic oil fields at -50°C, tropical port terminals under 40°C heat, and high-altitude infrastructure projects above 4,000 meters elevation.
                </p>
              </div>
            </motion.div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85"
                alt="CraneCorp Manufacturing Facility"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 hidden lg:block">
                <div className="text-4xl font-black">{stats?.yearsOfExperience ?? 35}+</div>
                <div className="text-sm font-bold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-primary tracking-widest mb-3">OUR FOUNDATION</div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Mission, Vision & Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mission",
                text: "To engineer and manufacture lifting solutions that exceed performance expectations, advancing global infrastructure development through technology, safety, and reliability."
              },
              {
                icon: Globe,
                title: "Vision",
                text: "To be the world's most trusted crane manufacturer — a brand that engineers worldwide specify by name when the lift matters most."
              },
              {
                icon: Shield,
                title: "Values",
                text: "Safety first in every decision. Engineering integrity without compromise. Long-term partnerships over transactional sales. Continuous innovation rooted in real-world feedback."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { label: "Years of Experience", value: `${stats?.yearsOfExperience ?? 35}+` },
              { label: "Products Delivered", value: `${(stats?.productsDelivered ?? 4200).toLocaleString()}+` },
              { label: "Countries Served", value: stats?.countriesServed ?? 48 },
              { label: "Certifications", value: stats?.certifications ?? 12 },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-black mb-2">{s.value}</div>
                <div className="text-sm font-bold text-white/70 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-primary tracking-widest mb-3">OUR JOURNEY</div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Company History</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="text-4xl font-black text-primary mb-2">{item.year}</div>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                  <div className="w-6 h-6 bg-primary rounded-full relative z-10 flex-shrink-0" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#0f172a] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-primary tracking-widest mb-3">QUALITY ASSURED</div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Certifications & Standards</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Every CraneCorp product meets or exceeds the most rigorous international safety and quality standards.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-white/10 p-8 text-center hover:border-primary transition-colors"
              >
                <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="text-xl font-black mb-2">{cert.name}</div>
                <div className="text-sm text-gray-400">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-bold text-primary tracking-widest mb-3">INNOVATION</div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6">Research & Development</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  Our R&D center employs 340+ engineers and researchers dedicated to pushing the boundaries of crane technology. With an annual investment exceeding 8% of revenue, we consistently develop innovations that redefine industry benchmarks.
                </p>
                <p>
                  Current development programs include autonomous lift planning systems, hydrogen-powered crawler cranes, ultra-high-strength steel structural components, and AI-powered predictive maintenance platforms.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Cog, label: "340+ Engineers", sublabel: "in R&D" },
                  { icon: Users, label: "8% Revenue", sublabel: "R&D investment" },
                  { icon: Award, label: "180+ Patents", sublabel: "registered" }
                ].map((item, i) => (
                  <div key={i} className="text-center border border-border p-4">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-black">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=85"
              alt="R&D Lab"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
