'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Upload, FileText, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
  const { user } = useAuth();
  
  const { data: stats, isLoading, error, refetch } = useQuery(
    'dashboard-stats',
    dashboardService.getStats
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (error) {
    return <ErrorState message="Failed to load stats" onRetry={() => refetch()} />;
  }

  const quickActions = [
    {
      title: 'Upload Content',
      description: 'Add new files to your studio',
      icon: Upload,
      gradient: 'from-cyan-500 via-blue-500 to-purple-600',
      action: '/dashboard/uploads'
    },
    {
      title: 'Review Requests',
      description: `${stats?.requests || 0} pending approvals`,
      icon: CheckCircle,
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      action: '/dashboard/requests'
    },
    {
      title: 'Recent Activity',
      description: 'View latest uploads & changes',
      icon: Clock,
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      action: '#'
    },
    {
      title: 'Performance',
      description: 'Analytics & insights',
      icon: TrendingUp,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
          {getGreeting()}, {user?.name || 'Princeflexzy'}! 👋
        </h1>
        <p className="text-gray-400 text-lg">Here's your studio performance today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard 
            title="Total Uploads" 
            value={stats?.uploads || 0} 
            icon={Upload} 
            loading={isLoading}
            trend={{ value: 12, isPositive: true }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard 
            title="Pending Requests" 
            value={stats?.requests || 0} 
            icon={FileText} 
            loading={isLoading}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard 
            title="Active Users" 
            value={stats?.users || 0} 
            icon={Users} 
            loading={isLoading}
            trend={{ value: 5, isPositive: true }}
          />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                   style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              />
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">New file uploaded</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
