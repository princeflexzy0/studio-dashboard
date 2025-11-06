'use client';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Zap, Server, Database, Globe, AlertCircle, CheckCircle } from 'lucide-react';

export default function SystemPage() {
  const systemMetrics = {
    cpu: { usage: 45, status: 'healthy', cores: 8 },
    memory: { usage: 62, total: '32GB', used: '19.8GB', status: 'healthy' },
    storage: { usage: 38, total: '2TB', used: '760GB', status: 'healthy' },
    network: { inbound: '125 Mbps', outbound: '89 Mbps', status: 'healthy' },
    database: { connections: 143, queries: '2.4K/min', status: 'healthy' },
    uptime: '45 days 12 hours',
  };

  const services = [
    { name: 'API Server', status: 'running', uptime: '99.98%', response: '45ms' },
    { name: 'Database', status: 'running', uptime: '99.99%', response: '12ms' },
    { name: 'CDN', status: 'running', uptime: '99.95%', response: '28ms' },
    { name: 'Storage Service', status: 'running', uptime: '99.97%', response: '35ms' },
    { name: 'Email Service', status: 'running', uptime: '99.92%', response: '120ms' },
  ];

  const recentLogs = [
    { time: '17:45:23', level: 'info', message: 'Video processing completed: video_1234.mp4' },
    { time: '17:42:15', level: 'info', message: 'New user registration: user@example.com' },
    { time: '17:38:47', level: 'warning', message: 'High CPU usage detected: 78%' },
    { time: '17:35:12', level: 'info', message: 'Database backup completed successfully' },
    { time: '17:30:05', level: 'error', message: 'Failed payment attempt: transaction_5678' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          System Status
        </h1>
        <p className="text-gray-400">Monitor system health and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard icon={Cpu} label="CPU Usage" value={`${systemMetrics.cpu.usage}%`} subtitle={`${systemMetrics.cpu.cores} cores`} status={systemMetrics.cpu.status} color="cyan" />
        <MetricCard icon={HardDrive} label="Memory" value={systemMetrics.memory.used} subtitle={`of ${systemMetrics.memory.total}`} status={systemMetrics.memory.status} color="purple" />
        <MetricCard icon={Database} label="Storage" value={systemMetrics.storage.used} subtitle={`of ${systemMetrics.storage.total}`} status={systemMetrics.storage.status} color="blue" />
        <MetricCard icon={Globe} label="Network In" value={systemMetrics.network.inbound} subtitle={`Out: ${systemMetrics.network.outbound}`} status={systemMetrics.network.status} color="green" />
        <MetricCard icon={Server} label="Database" value={`${systemMetrics.database.connections} conn`} subtitle={`${systemMetrics.database.queries} queries/min`} status={systemMetrics.database.status} color="orange" />
        <MetricCard icon={Zap} label="Uptime" value={systemMetrics.uptime} subtitle="System running" status="healthy" color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            Services
          </h2>
          <div className="space-y-3">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">{service.name}</p>
                    <p className="text-sm text-gray-400">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    {service.status.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">{service.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-cyan-400" />
            Recent Logs
          </h2>
          <div className="space-y-2">
            {recentLogs.map((log, idx) => (
              <div key={idx} className="p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    log.level === 'error' ? 'bg-red-500/20 text-red-400' :
                    log.level === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {log.level.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs mb-1">{log.time}</p>
                    <p className="text-white text-sm">{log.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtitle, status, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className={`w-8 h-8 text-${color}-400`} />
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {status === 'healthy' ? '●' : '✕'}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </motion.div>
  );
}
