'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChartCard from '@/components/ChartCard';
import { Users, Upload, Megaphone, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalCreators: number;
  totalUploads: number;
  activeCampaigns: number;
  revenue: string;
  creatorsChange: string;
  uploadsChange: string;
  campaignsChange: string;
  revenueChange: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with real API later
    setTimeout(() => {
      setStats({
        totalCreators: 1234,
        totalUploads: 5678,
        activeCampaigns: 42,
        revenue: '$125,430',
        creatorsChange: '+12%',
        uploadsChange: '+23%',
        campaignsChange: '+5%',
        revenueChange: '+18%',
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="Dashboard" subtitle="Welcome back! Here's what's happening." />
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
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening." />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ChartCard
            title="Total Creators"
            value={stats?.totalCreators.toLocaleString() || '0'}
            change={stats?.creatorsChange}
            changeType="positive"
            icon={Users}
          />
          
          <ChartCard
            title="Total Uploads"
            value={stats?.totalUploads.toLocaleString() || '0'}
            change={stats?.uploadsChange}
            changeType="positive"
            icon={Upload}
          />
          
          <ChartCard
            title="Active Campaigns"
            value={stats?.activeCampaigns || '0'}
            change={stats?.campaignsChange}
            changeType="positive"
            icon={Megaphone}
          />
          
          <ChartCard
            title="Revenue"
            value={stats?.revenue || '$0'}
            change={stats?.revenueChange}
            changeType="positive"
            icon={DollarSign}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {[
                { action: 'New upload approved', user: 'Sarah Johnson', time: '5 min ago' },
                { action: 'Campaign launched', user: 'Mike Chen', time: '1 hour ago' },
                { action: 'Creator joined', user: 'Emma Wilson', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-white">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Top Performers</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', uploads: 45, badge: '🏆' },
                { name: 'Mike Chen', uploads: 38, badge: '🥈' },
                { name: 'Emma Wilson', uploads: 32, badge: '🥉' },
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{performer.badge}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{performer.name}</p>
                      <p className="text-gray-400 text-xs">{performer.uploads} uploads</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
