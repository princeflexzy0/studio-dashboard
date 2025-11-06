'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Database, Zap, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

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

// Generate realistic chart data
const generateChartData = () => {
  const data = [];
  const baseValue = 95;
  for (let i = 0; i < 90; i++) {
    const variance = Math.sin(i / 5) * 2 + Math.random() * 3;
    data.push({
      value: Math.max(85, Math.min(100, baseValue + variance)),
      timestamp: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  return data;
};

export default function SystemHealthPage() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [lastCheck, setLastCheck] = useState<string>('');
  const [chartData] = useState(generateChartData());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMetrics(mockMetrics);
    setLastCheck(new Date().toLocaleString());
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

  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          System Health
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Monitor platform infrastructure and performance</p>
      </div>

      {/* Overall Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 p-6 rounded-xl border ${getStatusColor(overallStatus)} flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          {getStatusIcon(overallStatus)}
          <div>
            <h2 className="text-2xl font-bold capitalize">{overallStatus}</h2>
            <p className="text-sm opacity-80">All systems running smoothly</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{avgUptime}%</p>
          <p className="text-sm opacity-80">Avg Uptime</p>
        </div>
      </motion.div>

      {/* Last Check */}
      <div className="mb-6 flex items-center gap-2 text-gray-400 text-sm">
        <Clock className="w-4 h-4" />
        <span>Last checked: {lastCheck}</span>
      </div>

      {/* Professional Crypto-Style Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              90-Day Uptime Performance
            </h3>
            <p className="text-sm text-gray-400 mt-1">Real-time system availability tracking</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-400">{avgUptime}%</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-64 sm:h-80">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-gray-800/50"
                style={{ bottom: `${percent}%` }}
              >
                <span className="absolute -left-12 -top-2 text-xs text-gray-600">{85 + (percent * 0.15)}%</span>
              </div>
            ))}
          </div>

          {/* Chart Area with Gradient */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            
            {/* Area Fill */}
            <path
              d={`M 0 ${100 - ((chartData[0].value - minValue) / (maxValue - minValue)) * 100}% ${chartData.map((d, i) => 
                `L ${(i / (chartData.length - 1)) * 100}% ${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}%`
              ).join(' ')} L 100% 100% L 0 100% Z`}
              fill="url(#chartGradient)"
            />
            
            {/* Line */}
            <path
              d={`M 0 ${100 - ((chartData[0].value - minValue) / (maxValue - minValue)) * 100}% ${chartData.map((d, i) => 
                `L ${(i / (chartData.length - 1)) * 100}% ${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}%`
              ).join(' ')}`}
              fill="none"
              stroke="rgb(34, 211, 238)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Interactive Dots */}
          <div className="absolute inset-0">
            {chartData.map((d, i) => {
              const x = (i / (chartData.length - 1)) * 100;
              const y = 100 - ((d.value - minValue) / (maxValue - minValue)) * 100;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 2 }}
                >
                  <div className="w-full h-full bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-cyan-500/50 rounded-lg px-3 py-2 whitespace-nowrap"
                    >
                      <p className="text-cyan-400 font-bold text-sm">{d.value.toFixed(2)}%</p>
                      <p className="text-gray-400 text-xs">{d.timestamp}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex justify-between text-xs text-gray-500 mt-4 pl-12">
          <span>{chartData[0].timestamp}</span>
          <span>{chartData[Math.floor(chartData.length / 2)].timestamp}</span>
          <span>{chartData[chartData.length - 1].timestamp}</span>
        </div>
      </motion.div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Uptime</span>
                  <span className="text-green-400 font-semibold">{metric.uptime}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.uptime}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-sm">Response Time</span>
                  <span className="text-cyan-400 font-semibold">{metric.responseTime}ms</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
