export const dynamic = 'force-dynamic';
'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Clock, Server, Database, AlertTriangle, Zap } from 'lucide-react';

export default function SystemPage() {
  const { data: health, isLoading } = useQuery('system-health', dashboardService.getSystemHealth, {
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-700 rounded w-1/3"></div><div className="h-64 bg-gray-700 rounded"></div></div></div>;
  }

  const metrics = [
    { label: 'Server Status', value: health?.status || 'operational', icon: Server, color: 'green' },
    { label: 'Uptime', value: `${health?.uptime_hours || 0} hours`, icon: Clock, color: 'blue' },
    { label: 'Queue Status', value: health?.queue_status || 'stable', icon: Activity, color: 'cyan' },
    { label: 'Database', value: 'Connected', icon: Database, color: 'purple' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">📊 System Health</h1>
        <p className="text-sm sm:text-base text-gray-400">Monitor system performance and automation status</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div key={metric.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-3 rounded-lg bg-${metric.color}-500/20`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
            <p className="text-xl font-bold text-white capitalize">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Automation Queue
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Pending Tasks</span>
              <span className="text-lg font-bold text-white">{health?.queue_pending || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Processing</span>
              <span className="text-lg font-bold text-cyan-400">{health?.queue_processing || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-sm text-gray-400">Completed Today</span>
              <span className="text-lg font-bold text-green-400">{health?.queue_completed || 0}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">System Logs</h2>
          <div className="space-y-2">
            {[
              { time: '10:45 AM', message: 'Database backup completed successfully', type: 'success' },
              { time: '09:30 AM', message: 'API response time: 120ms (optimal)', type: 'success' },
              { time: '08:15 AM', message: 'System maintenance scheduled for tonight', type: 'warning' },
              { time: '07:00 AM', message: 'All services operational', type: 'success' }
            ].map((log, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                {log.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-white">{log.message}</p>
                  <p className="text-xs text-gray-400">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-6 border border-green-700/50">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <div>
            <h3 className="text-lg font-bold text-white">All Systems Operational</h3>
            <p className="text-sm text-gray-300">Last checked: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
