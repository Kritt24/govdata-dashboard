import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { RoleSelector } from "@/components/RoleSelector";
import { DashboardCard } from "@/components/DashboardCard";
import { useMetrics } from "@/hooks/use-metrics";
import { Globe, Map as MapIcon, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useRoleStore, type Role } from "@/hooks/use-role";

import bannerImg from "@assets/WhatsApp_Image_2026-01-12_at_9.57.12_PM_1768295798079.jpeg";

export default function Dashboard() {
  const { role, setRole } = useRoleStore();
  const [, setLocation] = useLocation();
  const { data: metrics, isLoading, error } = useMetrics();

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-8">
          <div className="h-12 w-64 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl bg-gray-200/50" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load metrics</h2>
          <p className="text-gray-500 max-w-md">There was an issue connecting to the secure analytics server. Please try again later.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full bg-[#0a111a] relative z-10">
        <img 
          src={bannerImg} 
          alt="SANRACHNA Header Banner" 
          className="w-full max-w-7xl mx-auto h-auto block"
        />
      </div>

      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              Welcome to Sanrachna
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-normal text-justify">
              <p>
                Sanrachna is a data-driven platform that visualizes Aadhaar enrolment and identity updates across India. It brings together insights on enrolment, demographics, and biometric updates to show how identity data evolves across regions and population groups.
              </p>
              <p>
                The platform enables exploration of trends across states and districts, helping identify patterns, coverage gaps, and areas requiring administrative attention through intuitive maps and charts.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
              <p className="text-primary font-serif italic text-xl tracking-tight">
                Discover patterns. Understand change. Plan better — with Sanrachna.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full pt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics?.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <DashboardCard
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                chartData={metric.data as any[]}
                insight={
                  index === 0 ? "Higher enrolment growth observed in urban districts." :
                  index === 1 ? "Increased mobile updates noted in rural sectors." :
                  "Stable authentication success rates across all regions."
                }
                color={
                  index === 0 ? "hsl(216, 80%, 40%)" : 
                  index === 1 ? "hsl(216, 20%, 60%)" : 
                  "hsl(216, 40%, 30%)"
                }
                onClick={() => setLocation(`/metrics/${metric.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* National Aadhaar Coverage Map Section */}
        <div className="mt-12 w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              National Aadhaar Coverage Map
            </h3>
            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100 dark:border-blue-800">
              Future Visualization
            </div>
          </div>
          <div className="w-full h-[400px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shadow-sm">
              <Globe className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-serif italic text-lg">
              Interactive India Map — Coming Soon
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm text-center px-6">
              Geographic distribution of Aadhaar saturation and enrolment patterns will be visualized here in the next phase.
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-2xl p-6 text-white col-span-1 lg:col-span-4 shadow-2xl">
            <h3 className="text-lg font-medium mb-1 text-gray-200">System Status</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm text-green-400 font-bold">OPERATIONAL</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold mb-1">99.98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Uptime (30 Days)</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">12ms</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Latency</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">14,205</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Pending Updates</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">0.04%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Failed Auth (24h)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
