'use client';

import { useQuery } from 'react-query';
import { Activity, Database, HardDrive, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemHealthPage() {
  const { data: health, isLoading } = useQuery('health', async () => {
    const res = await fetch('/api/system/health');
    return res.json();
  }, { refetchInterval: 5000 });

  const services = health?.services ? Object.entries(health.services) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-3">
          System Health
        </h1>
        <p className="text-gray-400">Monitor platform infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-green-500" />
            <p className="text-gray-400 text-sm">Status</p>
          </div>
          <p className="text-2xl font-bold text-white capitalize">{health?.status || 'Loading'}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-yellow-500" />
            <p className="text-gray-400 text-sm">Uptime</p>
          </div>
          <p className="text-2xl font-bold text-white">{health?.uptime_hours || 0}h</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-cyan-500" />
            <p className="text-gray-400 text-sm">Queue</p>
          </div>
          <p className="text-2xl font-bold text-white capitalize">{health?.queue_status || 'N/A'}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-8 h-8 text-purple-500" />
            <p className="text-gray-400 text-sm">Last Check</p>
          </div>
          <p className="text-sm font-medium text-white">
            {health?.last_check ? new Date(health.last_check).toLocaleTimeString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Service Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(([service, status]: [string, any], i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                {status === 'healthy' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                )}
                <span className="text-white font-medium capitalize">{service}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === 'healthy' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
