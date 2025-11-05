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

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-gray-400">Dashboard Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Uploads" value={stats?.uploads || 0} icon={Upload} loading={isLoading} />
        <StatCard title="Pending Requests" value={stats?.requests || 0} icon={FileText} loading={isLoading} />
        <StatCard title="Active Users" value={stats?.users || 0} icon={Users} loading={isLoading} />
      </div>
    </div>
  );
}
