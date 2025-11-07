'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Upload,
  TrendingUp,
  DollarSign,
  Activity,
  Award,
  Bell,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  total_creators: number;
  total_uploads: number;
  active_campaigns: number;
  revenue_usd: number;
  graph: Array<{ date: string; views: number; revenue: number }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from API
    fetch('/api/admin/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      });
  }, []);

  const recentActivity = [
    {
      title: 'New upload approved',
      user: 'Sarah Johnson',
      time: '5 min ago',
    },
    {
      title: 'Campaign launched',
      user: 'Mike Chen',
      time: '1 hour ago',
    },
    {
      title: 'Creator joined',
      user: 'Emma Wilson',
      time: '2 hours ago',
    },
    {
      title: 'Upload pending review',
      user: 'Alex Turner',
      time: '3 hours ago',
    },
    {
      title: 'Campaign completed',
      user: 'Lisa Park',
      time: '5 hours ago',
    },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', uploads: 45, icon: '🏆' },
    { name: 'Mike Chen', uploads: 38, icon: '🥈' },
    { name: 'Emma Wilson', uploads: 32, icon: '🥉' },
    { name: 'Alex Turner', uploads: 28, icon: '⭐' },
    { name: 'Lisa Park', uploads: 25, icon: '⭐' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Creators',
      value: stats?.total_creators.toLocaleString() || '0',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      name: 'Total Uploads',
      value: stats?.total_uploads.toLocaleString() || '0',
      change: '+23%',
      icon: Upload,
      color: 'green',
    },
    {
      name: 'Active Campaigns',
      value: stats?.active_campaigns.toString() || '0',
      change: '+5%',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      name: 'Revenue',
      value: `$${stats?.revenue_usd.toLocaleString() || '0'}`,
      change: '+18%',
      icon: DollarSign,
      color: 'cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-cyan-400">Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 
              rounded-lg transition-colors border border-gray-700">
              <Bell className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Notifications</span>
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center 
                justify-center font-bold">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content - Flex grow to fill space */}
      <div className="flex-1 px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-500/10 text-blue-400',
                green: 'bg-green-500/10 text-green-400',
                purple: 'bg-purple-500/10 text-purple-400',
                cyan: 'bg-cyan-500/10 text-cyan-400',
              }[stat.color];

              return (
                <div
                  key={stat.name}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 
                    hover:border-gray-700 transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm font-medium mb-2">{stat.name}</p>
                      <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-green-400 text-sm font-semibold">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Section */}
          {stats?.graph && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Activity Overview</h2>
                  <p className="text-gray-400 text-sm">Views and revenue over time</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.graph}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    dot={{ fill: '#06B6D4' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Activity Section */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
            
            {/* Recent Activity */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg 
                        hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h2 className="text-xl font-semibold">Top Performers</h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {topPerformers.map((performer, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg 
                        hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-3xl">{performer.icon}</div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{performer.name}</p>
                        <p className="text-gray-400 text-sm">{performer.uploads} uploads</p>
                      </div>
                      <div className="text-cyan-400 font-bold text-lg">#{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
