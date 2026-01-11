import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  value: number;
  trend: number;
  chartData: any[];
  color: string;
  onClick: () => void;
  insight?: string;
}

export function DashboardCard({ title, value, trend, chartData, color, onClick, insight }: DashboardCardProps) {
  const isPositive = trend >= 0;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="group relative overflow-hidden bg-white border border-gray-100 hover:border-primary/30 transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mt-2 leading-tight">
                {value.toLocaleString('en-IN')}
              </h3>
              {insight && (
                <p className="text-xs text-gray-400 mt-2 font-medium italic line-clamp-1">
                  "{insight}"
                </p>
              )}
            </div>
            <div className={cn(
              "flex items-center px-2.5 py-1 rounded-full text-xs font-bold",
              isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {Math.abs(trend)}%
            </div>
          </div>

          <div className="h-[120px] w-full -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1a1a1a', fontWeight: 600 }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill={`url(#gradient-${title})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View detailed report</span>
            <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent group-hover:via-primary transition-all duration-500" />
      </Card>
    </motion.div>
  );
}
