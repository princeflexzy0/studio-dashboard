'use client';
'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Upload, FileText, Users } from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuth();
  
  const { data: stats, isLoading, error, refetch } = useQuery(
    'dashboard-stats',
    dashboardService.getStats,
    { refetchInterval: 30000 }
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (error) {
    return <ErrorState message="Failed to load dashboard stats" onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-gray-400">Here is what is happening with your studio today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Uploads"
          value={stats?.uploads || 0}
          icon={Upload}
          loading={isLoading}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Requests"
          value={stats?.requests || 0}
          icon={FileText}
          loading={isLoading}
        />
        <StatCard
          title="Active Users"
          value={stats?.users || 0}
          icon={Users}
          loading={isLoading}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#00D9FF]/10 to-[#7B2BFF]/10 border border-[#00D9FF]/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Quick Upload</h3>
          <p className="text-gray-400 mb-4">Upload new content directly from here</p>
          <button className="px-4 py-2 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00b8d4] transition-colors">
            Upload File
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#7B2BFF]/10 to-[#FF006E]/10 border border-[#7B2BFF]/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-2">Review Requests</h3>
          <p className="text-gray-400 mb-4">{stats?.requests || 0} requests waiting for review</p>
          <button className="px-4 py-2 bg-[#7B2BFF] text-white rounded-lg hover:bg-[#6a25e6] transition-colors">
            Review Now
          </button>
        </div>
      </div>
    </div>
  );
}
