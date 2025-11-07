'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { 
  Server, 
  Database, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu
} from 'lucide-react';

interface SystemHealth {
  status: string;
  uptime_hours: number;
  queue_status: string;
  last_check: string;
  services: {
    database: string;
    storage: string;
    api: string;
    automation: string;
  };
}

export default function SystemPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from API
    fetch('/api/system/health')
      .then(res => res.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching system health:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="System" subtitle="Monitor system health and performance" />
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'healthy' || status === 'operational' 
      ? 'text-green-400' 
      : status === 'stable'
      ? 'text-cyan-400'
      : 'text-red-400';
  };

  const getStatusIcon = (status: string) => {
    return status === 'healthy' || status === 'operational' || status === 'stable'
      ? <CheckCircle className="w-5 h-5 text-green-400" />
      : <AlertCircle className="w-5 h-5 text-red-400" />;
  };

  const services = [
    {
      name: 'Database',
      status: health?.services?.database || 'unknown',
      icon: Database,
      color: 'blue'
    },
    {
      name: 'Storage',
      status: health?.services?.storage || 'unknown',
      icon: HardDrive,
      color: 'purple'
    },
    {
      name: 'API',
      status: health?.services?.api || 'unknown',
      icon: Server,
      color: 'cyan'
    },
    {
      name: 'Automation',
      status: health?.services?.automation || 'unknown',
      icon: Cpu,
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="System Health" 
        subtitle="Monitor system status and services"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Overall Status */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon(health?.status || '')}
              <div>
                <h2 className="text-2xl font-bold text-white">System Status</h2>
                <p className={`text-lg font-semibold capitalize ${getStatusColor(health?.status || '')}`}>
                  {health?.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Last Check</p>
              <p className="text-white font-medium">
                {health?.last_check ? new Date(health.last_check).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Uptime</h3>
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {health?.uptime_hours || 0} hours
            </p>
            <p className="text-sm text-gray-400">
              {health?.uptime_hours ? Math.floor(health.uptime_hours / 24) : 0} days
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Queue Status</h3>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <p className={`text-3xl font-bold capitalize ${getStatusColor(health?.queue_status || '')}`}>
              {health?.queue_status}
            </p>
            <p className="text-sm text-gray-400">Processing normally</p>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const colorClasses = {
                blue: 'bg-blue-500/10 border-blue-500/30',
                purple: 'bg-purple-500/10 border-purple-500/30',
                cyan: 'bg-cyan-500/10 border-cyan-500/30',
                green: 'bg-green-500/10 border-green-500/30',
              }[service.color];

              return (
                <div 
                  key={service.name}
                  className={`${colorClasses} border rounded-xl p-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-white" />
                    {getStatusIcon(service.status)}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{service.name}</h4>
                  <p className={`text-sm font-medium capitalize ${getStatusColor(service.status)}`}>
                    {service.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}
