'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { TrendingUp, Users, HardDrive, DollarSign, Activity, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { data: overview, isLoading } = useQuery(
    'dashboard-overview',
    dashboardService.getOverview,
    {
      refetchInterval: 30000,
    }
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = overview?.stats || {};

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          👋 Welcome back to Studio Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here's what's happening with your content today
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Views', value: stats.totalViews?.toLocaleString() || '0', icon: TrendingUp, color: 'cyan', growth: overview?.analytics?.viewsGrowth },
          { label: 'Active Users', value: stats.activeUsers?.toLocaleString() || '0', icon: Users, color: 'blue', growth: overview?.analytics?.usersGrowth },
          { label: 'Storage Used', value: stats.storageUsed || '0 GB', icon: HardDrive, color: 'purple', growth: null },
          { label: 'Revenue', value: `$${stats.revenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', growth: overview?.analytics?.revenueGrowth },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              {stat.growth && (
                <span className="text-xs font-medium text-green-400">{stat.growth}</span>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {overview?.recentActivity?.map((activity: any) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                <img src={activity.avatar} alt={activity.user} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="text-cyan-400">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-4">Top Content</h2>
          <div className="space-y-3">
            {overview?.topContent?.map((content: any) => (
              <div key={content.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                <img src={content.thumbnail} alt={content.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{content.title}</p>
                  <div className="flex gap-4 text-xs text-gray-400 mt-1">
                    <span>{content.views?.toLocaleString()} views</span>
                    <span>{content.likes?.toLocaleString()} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
