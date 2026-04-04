import { useState } from "react";
import { motion } from "framer-motion";
import { useListNews, useListMedia, getListNewsQueryKey, getListMediaQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Download, Image, Newspaper, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaTab = "news" | "videos" | "gallery" | "catalogs";

export default function Media() {
  const [activeTab, setActiveTab] = useState<MediaTab>("news");

  const { data: news, isLoading: newsLoading } = useListNews(
    { status: "published" },
    { query: { queryKey: getListNewsQueryKey({ status: "published" }) } }
  );

  const { data: videos } = useListMedia(
    { type: "video" },
    { query: { queryKey: getListMediaQueryKey({ type: "video" }) } }
  );

  const { data: gallery } = useListMedia(
    { type: "gallery" },
    { query: { queryKey: getListMediaQueryKey({ type: "gallery" }) } }
  );

  const { data: pdfs } = useListMedia(
    { type: "pdf" },
    { query: { queryKey: getListMediaQueryKey({ type: "pdf" }) } }
  );

  const tabs: { key: MediaTab; label: string; icon: typeof Newspaper; count?: number }[] = [
    { key: "news", label: "News", icon: Newspaper, count: news?.length },
    { key: "videos", label: "Videos", icon: Video, count: videos?.length },
    { key: "gallery", label: "Gallery", icon: Image, count: gallery?.length },
    { key: "catalogs", label: "Catalogs", icon: Download, count: pdfs?.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0f172a] text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">PRESS & MEDIA</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4">Media Center</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            News, videos, project galleries, and technical documentation from CraneCorp.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-background sticky top-[104px] md:top-[132px] z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors",
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                data-testid={`tab-${tab.key}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="secondary" className="text-xs">{tab.count}</Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* News Tab */}
        {activeTab === "news" && (
          <div>
            {newsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="aspect-[3/4]" />)}
              </div>
            ) : !news?.length ? (
              <p className="text-muted-foreground text-center py-24">No news available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-card border border-border overflow-hidden hover:border-primary transition-colors"
                    data-testid={`card-news-${article.id}`}
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-primary mb-3">
                        {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                      <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{article.summary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!videos?.length ? (
              <p className="text-muted-foreground col-span-3 text-center py-24">No videos available.</p>
            ) : (
              videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-card border border-border overflow-hidden"
                  data-testid={`card-video-${video.id}`}
                >
                  <div className="aspect-video relative">
                    {video.thumbnail ? (
                      <div className="relative w-full h-full">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold">{video.title}</h3>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!gallery?.length ? (
              <p className="text-muted-foreground col-span-3 text-center py-24">No gallery images available.</p>
            ) : (
              gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
                  data-testid={`card-gallery-${item.id}`}
                >
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-bold">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Catalogs Tab */}
        {activeTab === "catalogs" && (
          <div className="max-w-2xl mx-auto space-y-4">
            {!pdfs?.length ? (
              <p className="text-muted-foreground text-center py-24">No catalogs available.</p>
            ) : (
              pdfs.map((pdf, i) => (
                <motion.div
                  key={pdf.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between p-6 bg-card border border-border hover:border-primary transition-colors"
                  data-testid={`card-pdf-${pdf.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{pdf.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">PDF Document</p>
                    </div>
                  </div>
                  <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-none font-bold">DOWNLOAD</Button>
                  </a>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
