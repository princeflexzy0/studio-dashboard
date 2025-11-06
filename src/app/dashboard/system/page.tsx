'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Database, Zap, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

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

export default function SystemHealthPage() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [lastCheck, setLastCheck] = useState<string>('');

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

      {/* Uptime History (Placeholder) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">30-Day Uptime History</h3>
        <div className="flex gap-1 h-20 items-end">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-green-500 to-cyan-500 rounded-t"
              style={{ height: `${Math.random() * 40 + 60}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </motion.div>
    </div>
  );
}
