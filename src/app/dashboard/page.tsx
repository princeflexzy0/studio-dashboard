'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Upload, 
  Clock, 
  CheckCircle, 
  DollarSign,
  ArrowRight,
  Video,
  Users,
  Briefcase
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = overview?.stats || {
    totalUploads: 247,
    pendingRequests: 18,
    completed: 156,
    revenue: 125400
  };

  const recentActivity = overview?.recentActivity || [];
  const revenueTrend = overview?.revenueTrend || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome back, Admin User! 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here's what's happening with your studio today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        {[
          {
            label: 'Total Uploads',
            value: stats.totalUploads,
            icon: Upload,
            gradient: 'from-cyan-500 to-blue-600',
            bgGradient: 'from-cyan-500/10 to-blue-600/10'
          },
          {
            label: 'Pending Requests',
            value: stats.pendingRequests,
            icon: Clock,
            gradient: 'from-yellow-500 to-orange-600',
            bgGradient: 'from-yellow-500/10 to-orange-600/10'
          },
          {
            label: 'Completed',
            value: stats.completed,
            icon: CheckCircle,
            gradient: 'from-green-500 to-emerald-600',
            bgGradient: 'from-green-500/10 to-emerald-600/10'
          },
          {
            label: 'Total Revenue',
            value: `$${(stats.revenue / 1000).toFixed(1)}k`,
            icon: DollarSign,
            gradient: 'from-purple-500 to-pink-600',
            bgGradient: 'from-purple-500/10 to-pink-600/10'
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-700 hover:scale-105 transition-transform relative overflow-hidden group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
            <div className="flex items-center justify-between mb-3 relative z-10">
              <stat.icon className={`w-8 h-8 sm:w-10 sm:h-10 text-transparent bg-gradient-to-br ${stat.gradient} bg-clip-text`} />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1 relative z-10">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-white relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              ⚡ Recent Activity
            </h2>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity: any) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-white font-medium">
                      <span className="text-cyan-400">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{activity.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700"
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
            📈 Revenue Trend
          </h2>

          {revenueTrend.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: any) => [`$${value}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#06B6D4', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <span className="text-xs sm:text-sm text-gray-400">Last 5 days</span>
                <span className="text-sm sm:text-base font-bold text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No revenue data</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700"
      >
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Upload Content',
              description: 'Add new videos or media',
              icon: Video,
              gradient: 'from-cyan-500 to-blue-600',
              action: '/dashboard/uploads'
            },
            {
              title: 'View Requests',
              description: `${stats.pendingRequests} pending`,
              icon: Clock,
              gradient: 'from-yellow-500 to-orange-600',
              action: '/dashboard/uploads'
            },
            {
              title: 'Manage Campaigns',
              description: '0 active campaigns',
              icon: Briefcase,
              gradient: 'from-purple-500 to-pink-600',
              action: '/dashboard'
            },
            {
              title: 'View Creators',
              description: '0 active users',
              icon: Users,
              gradient: 'from-green-500 to-emerald-600',
              action: '/dashboard/users'
            }
          ].map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${action.gradient} bg-opacity-10 hover:bg-opacity-20 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all text-left group hover:scale-105`}
            >
              <action.icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-3 text-transparent bg-gradient-to-br ${action.gradient} bg-clip-text`} />
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {action.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
