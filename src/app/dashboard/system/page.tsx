'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Database, Zap, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemMetric {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  icon: any;
}

const mockMetrics: SystemMetric[] = [
  { name: 'API Server', status: 'operational', uptime: 99.9, responseTime: 45, icon: Server },
  { name: 'Database', status: 'operational', uptime: 99.8, responseTime: 12, icon: Database },
  { name: 'CDN', status: 'operational', uptime: 100, responseTime: 8, icon: Zap },
  { name: 'Automation Queue', status: 'operational', uptime: 98.5, responseTime: 120, icon: Activity },
];

const generateChartData = () => {
  const data = [];
  const baseValue = 95;
  for (let i = 0; i < 30; i++) {
    const variance = Math.sin(i / 3) * 2 + Math.random() * 2;
    data.push({
      day: `Day ${i + 1}`,
      uptime: Math.max(90, Math.min(100, baseValue + variance)),
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  return data;
};

export default function SystemHealthPage() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [lastCheck, setLastCheck] = useState<string>('');
  const [chartData] = useState(generateChartData());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMetrics(mockMetrics);
    setLastCheck(new Date().toLocaleString());
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'degraded': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'down': return 'text-red-400 bg-red-500/20 border-red-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5" />;
      case 'degraded': return <AlertTriangle className="w-5 h-5" />;
      case 'down': return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const overallStatus = metrics.every(m => m.status === 'operational') ? 'operational' : 'degraded';
  const avgUptime = (metrics.reduce((sum, m) => sum + m.uptime, 0) / metrics.length).toFixed(2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-cyan-500/50 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-cyan-400 font-bold text-sm">{payload[0].value.toFixed(2)}%</p>
          <p className="text-gray-400 text-xs">{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          System Health
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Monitor platform infrastructure and performance</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 p-6 rounded-xl border ${getStatusColor(overallStatus)} flex flex-col sm:flex-row items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-4">
          {getStatusIcon(overallStatus)}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold capitalize">{overallStatus}</h2>
            <p className="text-sm opacity-80">All systems running smoothly</p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <div className="text-3xl font-bold text-green-400">{avgUptime}%</div>
          <p className="text-sm opacity-80">Average Uptime</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 mb-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          30-Day Uptime Performance
        </h2>
        
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 280}>
          <AreaChart data={chartData} margin={{ top: 10, right: isMobile ? 5 : 10, left: isMobile ? -20 : -10, bottom: 0 }}>
            <defs>
              <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af" 
              fontSize={isMobile ? 9 : 11}
              tickLine={false}
              interval={isMobile ? 6 : 4}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={isMobile ? 9 : 11}
              domain={[90, 100]}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              width={isMobile ? 35 : 45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uptime"
              stroke="#10b981"
              strokeWidth={isMobile ? 2 : 3}
              fillOpacity={1}
              fill="url(#uptimeGradient)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">System Uptime</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>•</span>
            <span>Last 30 days</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{metric.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium uppercase mt-1 ${getStatusColor(metric.status)}`}>
                      {getStatusIcon(metric.status)}
                      {metric.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Uptime</span>
                    <span className="text-green-400 font-semibold text-lg">{metric.uptime}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.uptime}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                  <span className="text-gray-400 text-sm">Response Time</span>
                  <span className="text-cyan-400 font-semibold text-lg">{metric.responseTime}ms</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
