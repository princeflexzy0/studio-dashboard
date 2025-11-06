'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Upload, Users, TrendingUp, DollarSign, Eye, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockAnalyticsData = [
  { date: 'Nov 1', revenue: 450, views: 320 },
  { date: 'Nov 2', revenue: 580, views: 410 },
  { date: 'Nov 3', revenue: 520, views: 380 },
  { date: 'Nov 4', revenue: 720, views: 520 },
  { date: 'Nov 5', revenue: 780, views: 610 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    { label: 'Total Uploads', value: '856', icon: Upload, color: 'from-cyan-500 to-blue-500', iconColor: 'text-cyan-400' },
    { label: 'Total Creators', value: '124', icon: Users, color: 'from-purple-500 to-pink-500', iconColor: 'text-purple-400' },
    { label: 'Active Campaigns', value: '14', icon: TrendingUp, color: 'from-green-500 to-emerald-500', iconColor: 'text-green-400' },
    { label: 'Revenue', value: '$4,800', icon: DollarSign, color: 'from-yellow-500 to-orange-500', iconColor: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          {getGreeting()}, {user?.name}!
          <span className="text-4xl sm:text-5xl filter grayscale-0">👋</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Here&apos;s your studio performance today</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 bg-gradient-to-br ${stat.color} bg-opacity-20 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Revenue & Views Analytics</h2>
            <p className="text-sm text-gray-400">Last 5 days performance</p>
          </div>
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockAnalyticsData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#a855f7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue ($)"
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
              name="Views"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'New video uploaded', time: '2 minutes ago', icon: Upload, color: 'text-cyan-400' },
            { action: 'Campaign "Summer Promo" reached 1K views', time: '1 hour ago', icon: Eye, color: 'text-purple-400' },
            { action: '3 new creator requests', time: '3 hours ago', icon: Users, color: 'text-green-400' },
            { action: 'Revenue milestone: $5,000', time: '5 hours ago', icon: DollarSign, color: 'text-yellow-400' },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all cursor-pointer"
              >
                <div className={`p-2 bg-gray-700/50 rounded-lg ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
