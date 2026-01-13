import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { RoleSelector } from "@/components/RoleSelector";
import { DashboardCard } from "@/components/DashboardCard";
import { useMetrics } from "@/hooks/use-metrics";
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
      <div className="w-full bg-[#0a111a]">
        <img 
          src={bannerImg} 
          alt="SANRACHNA Header Banner" 
          className="w-full max-w-7xl mx-auto h-auto block"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full pt-12">
        <div className="space-y-4 mb-8 text-center">
          <RoleSelector currentRole={role} onRoleChange={(r) => setRole(r as Role)} />
          <p className="text-xs text-gray-400 font-medium">
            Select a perspective to view insights tailored for different audiences.
          </p>
        </div>

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

        {/* Quick Stats Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white col-span-1 lg:col-span-2 shadow-2xl">
            <h3 className="text-lg font-medium mb-1 text-gray-200">System Status</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm text-green-400 font-bold">OPERATIONAL</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold mb-1">99.98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Uptime (30 Days)</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">12ms</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Latency</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h4 className="text-gray-500 font-medium text-sm">Pending Updates</h4>
              <div className="text-3xl font-bold text-gray-900 mt-2">14,205</div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
              <div className="bg-yellow-500 h-1.5 rounded-full w-[65%]"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h4 className="text-gray-500 font-medium text-sm">Failed Auth (24h)</h4>
              <div className="text-3xl font-bold text-gray-900 mt-2">0.04%</div>
            </div>
            <div className="text-green-600 text-xs font-bold flex items-center mt-4">
              <span className="bg-green-100 px-2 py-1 rounded-full">-12% from avg</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
