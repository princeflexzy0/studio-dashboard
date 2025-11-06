'use client';
import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Upload, Clock, CheckCircle, TrendingUp, Users, Plus, FileText, ArrowRight, Activity } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const { data: stats, isLoading } = useQuery(
    'dashboardStats',
    dashboardService.getStats,
    {
      refetchInterval: 30000,
    }
  );

  const quickActions = [
    {
      title: 'Upload Content',
      description: 'Add new videos or media',
      icon: Upload,
      color: 'from-cyan-500 to-blue-500',
      onClick: () => router.push('/dashboard/uploads')
    },
    {
      title: 'View Requests',
      description: `${stats?.pendingRequests || 0} pending`,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      onClick: () => router.push('/dashboard/requests')
    },
    {
      title: 'Manage Campaigns',
      description: `${stats?.totalCampaigns || 0} active campaigns`,
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      onClick: () => router.push('/dashboard/campaigns')
    },
    {
      title: 'View Creators',
      description: `${stats?.activeUsers || 0} active users`,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      onClick: () => router.push('/dashboard/creators')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </span>{' '}
          <span className="inline-block">👋</span>
        </h1>
        <p className="text-gray-400">Here's what's happening with your studio today.</p>
      </div>

      {/* Stats Grid */}
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
          value={stats?.totalRevenue || 0}
          icon={BarChart3}
          loading={isLoading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity - 2 columns */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Recent Activity
            </h2>
            <button 
              onClick={() => router.push('/dashboard/system')}
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity: any) => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-lg hover:from-gray-700/50 hover:to-gray-800/50 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {activity.user?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{activity.action}</p>
                    <p className="text-gray-400 text-xs">
                      <span className="text-cyan-400">{activity.user}</span> • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No recent activity</p>
          )}
        </div>

        {/* Revenue Trend - 1 column */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Revenue Trend
          </h2>
          {isLoading ? (
            <div className="animate-pulse h-48 bg-gray-700/30 rounded-lg"></div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats?.graph || []}>
                <XAxis dataKey="date" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-400">Last 5 days</span>
            <span className="text-green-400 font-semibold">+12.5%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-4 border border-gray-600 hover:border-cyan-500/50 transition-all hover:scale-105 active:scale-95"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-gray-400 text-xs">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
