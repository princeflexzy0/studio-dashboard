'use client';
import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Upload, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: stats, isLoading } = useQuery(
    'dashboardStats',
    dashboardService.getStats,
    {
      refetchInterval: 30000, // Refresh every 30 seconds
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-400">Here's what's happening with your studio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Total Uploads"
          value={stats?.totalUploads || 0}
          icon={Upload}
          loading={isLoading}
        />
        <StatCard
          title="Pending Requests"
          value={stats?.pendingRequests || 0}
          icon={Clock}
          loading={isLoading}
        />
        <StatCard
          title="Completed"
          value={stats?.completedRequests || 0}
          icon={CheckCircle}
          loading={isLoading}
        />
        <StatCard
          title="Total Revenue"
          value={`₦${stats?.totalRevenue?.toLocaleString() || 0}`}
          icon={BarChart3}
          loading={isLoading}
        />
      </div>

      {/* Rest of dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <p className="text-gray-400">No recent activity</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <p className="text-gray-400">Quick actions coming soon</p>
        </div>
      </div>
    </div>
  );
}
