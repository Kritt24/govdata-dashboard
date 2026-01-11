import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useMetric } from "@/hooks/use-metrics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Download, Share2, Filter, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function MetricDetail() {
  const [match, params] = useRoute("/metrics/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: metric, isLoading, error } = useMetric(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (error || !metric) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Metric not found</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const chartData = metric.data as any[];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white border-gray-200 hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-serif font-bold text-gray-900">{metric.title}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-100">
                  Live Data
                </span>
              </div>
              <p className="text-gray-500 mt-1">Detailed analysis and historical trend visualization</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white text-gray-700 border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" className="gap-2 bg-white text-gray-700 border-gray-200 hover:bg-gray-50">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2 p-6 border-gray-200 shadow-md bg-white rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Trend Analysis</h3>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-primary"></div>
                 <span className="text-xs text-gray-500">Current Period</span>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar 
                    dataKey="value" 
                    name="Volume" 
                    fill="hsl(216, 90%, 45%)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Key Metrics Side Panel */}
          <div className="space-y-6">
            <Card className="p-6 border-gray-200 shadow-md bg-white rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-400" />
                Key Insights
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total Volume (YTD)</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(metric.value * 12.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div className="bg-primary h-1.5 rounded-full w-[85%]"></div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Growth Rate</div>
                  <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
                    +{metric.trend}% 
                    <span className="text-xs font-normal text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">vs last month</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Peak Activity</div>
                  <div className="text-lg font-semibold text-gray-900">Monday, 10:00 AM</div>
                </div>
              </div>
            </Card>

            {/* Secondary Chart */}
            <Card className="p-6 border-gray-200 shadow-md bg-white rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-4">Historical Context</h3>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(25, 95%, 53%)" 
                      strokeWidth={3} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-8">
          <Card className="border-gray-200 shadow-md bg-white rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800">Raw Data Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 font-medium">Period</th>
                    <th className="px-6 py-4 font-medium">Metric Value</th>
                    <th className="px-6 py-4 font-medium">Variance</th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {chartData.map((item: any, i: number) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-gray-600">{item.value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className={item.value > 3000 ? "text-green-600" : "text-gray-500"}>
                          {item.value > 3000 ? "+" : ""}{((item.value / 5000) * 10).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
}
