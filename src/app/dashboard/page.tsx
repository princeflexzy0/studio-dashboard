'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Upload, FileText, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardOverview() {
  const { user } = useAuth();
  
  const { data: stats, isLoading, error, refetch } = useQuery(
    'dashboard-stats',
    dashboardService.getStats,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
        <ErrorState message="Failed to load stats" onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
          {getGreeting()}, {user?.name || 'Admin'}! 👋🏽
        </h1>
        <p className="text-gray-400 text-lg">Here's your studio performance today</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <StatCard title="Total Uploads" value={stats?.total_uploads || 0} icon={Upload} loading={isLoading} />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <StatCard title="Total Creators" value={stats?.total_creators || 0} icon={Users} loading={isLoading} />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <StatCard title="Active Campaigns" value={stats?.active_campaigns || 0} icon={FileText} loading={isLoading} />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">Revenue</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-white">
                {isLoading ? '...' : `$${stats?.revenue_usd?.toLocaleString() || 0}`}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {!isLoading && stats?.graph && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Revenue & Views Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.graph}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="views" stroke="#00D9FF" strokeWidth={3} />
              <Line type="monotone" dataKey="revenue" stroke="#7B2BFF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Quick Upload</h3>
          <p className="text-gray-400 mb-4">Upload new content directly</p>
          <a 
            href="/dashboard/uploads" 
            className="inline-block px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors font-medium"
          >
            Upload File
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Review Requests</h3>
          <p className="text-gray-400 mb-4">Pending approvals</p>
          <a 
            href="/dashboard/requests" 
            className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition-colors font-medium"
          >
            Review Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
