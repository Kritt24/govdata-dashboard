import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Lightbulb, HelpCircle, FileText, BarChart3, PieChart, Database, Clock, Server } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart as RePieChart, Pie, Cell 
} from 'recharts';
import { api, buildUrl } from "@shared/routes";
import { motion } from "framer-motion";
import type { Metric } from "@shared/schema";
import { useRoleStore } from "@/hooks/use-role";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function MetricDetail() {
  const { id } = useParams();
  const { role } = useRoleStore();
  
  const { data: metric, isLoading } = useQuery<Metric>({
    queryKey: [buildUrl(api.metrics.get.path, { id: id! })],
  });

  const isCitizen = role === "Citizen";
  const isAdmin = role === "Admin (Demo)";
  const isOfficial = role === "Government Official";

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-8 animate-pulse">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-80 w-full rounded-2xl" />
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!metric) return (
    <Layout>
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Metric not found</h2>
        <Link href="/">
          <a className="text-primary hover:underline">Back to Dashboard</a>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mb-8">
        <Link href="/">
          <a className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </a>
        </Link>
        <h1 className="text-4xl font-serif font-bold text-gray-900">{metric.title}</h1>
      </div>

      <div className="grid gap-8">
        {/* Key Question Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-l-4 border-l-blue-600 bg-blue-50/30 overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 py-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl">Key Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 font-medium italic">
                "{metric.keyQuestion}"
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-4 h-4 text-primary" />
                Distribution Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metric.data as any[]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="w-4 h-4 text-primary" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={metric.data as any[]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(metric.data as any[]).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights & Policy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {(metric.insights as string[]).map((insight, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold border border-amber-100">
                      {idx + 1}
                    </span>
                    <p>{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {!isCitizen && (
            <Card className="bg-gray-900 text-white overflow-hidden border-0 shadow-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-gray-800 rounded-lg text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="text-white">Policy Implications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {metric.policyImplications}
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Recommended Action</p>
                  <p className="text-sm mt-1 text-primary italic font-medium">
                    "Prioritize infrastructure expansion in regions showing higher than average biometric update failure rates."
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <Database className="w-5 h-5" />
                </div>
                <CardTitle>Admin Metadata & Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Source Cluster</p>
                      <p className="text-sm font-medium">UIDAI-PROD-SOUTH-01</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Last Sync</p>
                      <p className="text-sm font-medium">{metric.lastUpdated ? new Date(metric.lastUpdated).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Record Count</p>
                      <p className="text-sm font-medium">1,240,582 records processed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
