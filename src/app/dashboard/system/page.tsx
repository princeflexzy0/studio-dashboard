'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChartCard from '@/components/ChartCard';
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: string;
  activeUsers: number;
  apiCalls: number;
}

interface SystemLog {
  id: number;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export default function SystemPage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - dummy system data
    setTimeout(() => {
      setMetrics({
        cpuUsage: 45,
        memoryUsage: 62,
        diskUsage: 73,
        uptime: '15 days, 4 hours',
        activeUsers: 1234,
        apiCalls: 45678
      });

      setLogs([
        { id: 1, timestamp: '2024-11-07 10:30:00', level: 'success', message: 'Database backup completed successfully' },
        { id: 2, timestamp: '2024-11-07 10:15:22', level: 'info', message: 'New user registration: sarah@example.com' },
        { id: 3, timestamp: '2024-11-07 09:45:33', level: 'warning', message: 'High CPU usage detected (85%)' },
        { id: 4, timestamp: '2024-11-07 09:30:15', level: 'info', message: 'Campaign "Summer Sale" started' },
        { id: 5, timestamp: '2024-11-07 09:00:00', level: 'success', message: 'System health check passed' },
        { id: 6, timestamp: '2024-11-07 08:45:12', level: 'error', message: 'Failed upload attempt from IP 192.168.1.100' },
        { id: 7, timestamp: '2024-11-07 08:30:45', level: 'info', message: 'Cache cleared automatically' },
        { id: 8, timestamp: '2024-11-07 08:00:00', level: 'success', message: 'Scheduled maintenance completed' },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default: return <Activity className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'success': return 'border-l-green-500 bg-green-500/5';
      case 'error': return 'border-l-red-500 bg-red-500/5';
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5';
      default: return 'border-l-cyan-500 bg-cyan-500/5';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="System" subtitle="Monitor system health and performance" />
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="System" 
        subtitle="Monitor system health and performance"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* System Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ChartCard
            title="CPU Usage"
            value={`${metrics?.cpuUsage}%`}
            change={metrics?.cpuUsage && metrics.cpuUsage > 80 ? 'High' : 'Normal'}
            changeType={metrics?.cpuUsage && metrics.cpuUsage > 80 ? 'negative' : 'positive'}
            icon={Cpu}
          >
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics?.cpuUsage}%` }}
                />
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Memory Usage"
            value={`${metrics?.memoryUsage}%`}
            change={metrics?.memoryUsage && metrics.memoryUsage > 80 ? 'High' : 'Normal'}
            changeType={metrics?.memoryUsage && metrics.memoryUsage > 80 ? 'negative' : 'positive'}
            icon={Database}
          >
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics?.memoryUsage}%` }}
                />
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="Disk Usage"
            value={`${metrics?.diskUsage}%`}
            change={metrics?.diskUsage && metrics.diskUsage > 80 ? 'High' : 'Normal'}
            changeType={metrics?.diskUsage && metrics.diskUsage > 80 ? 'negative' : 'positive'}
            icon={HardDrive}
          >
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics?.diskUsage}%` }}
                />
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="System Uptime"
            value={metrics?.uptime || '0 days'}
            icon={Clock}
          >
            <div className="mt-2 text-xs text-green-400 font-medium">
              ✓ All systems operational
            </div>
          </ChartCard>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Active Users</h3>
              <Server className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{metrics?.activeUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Currently online</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">API Calls (24h)</h3>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{metrics?.apiCalls.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Last 24 hours</p>
          </div>
        </div>

        {/* System Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">System Logs</h3>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              View All Logs
            </button>
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${getLogColor(log.level)} transition-all hover:bg-opacity-80`}
              >
                <div className="mt-0.5">
                  {getLogIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{log.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
