'use client';

'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { DollarSign, Eye, Play, Pause, MoreVertical, Plus } from 'lucide-react';

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useQuery('campaigns', dashboardService.getCampaigns);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (isLoading) {
    return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-700 rounded w-1/3"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-64 bg-gray-700 rounded"></div>)}</div></div></div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">📈 Campaigns</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage your advertising campaigns</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
            <Plus className="w-5 h-5" />
            New Campaign
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns?.map((campaign: any, index: number) => (
          <motion.div key={campaign.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{campaign.title}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full border ${getStatusColor(campaign.status)}`}>{campaign.status}</span>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs">Budget</span>
                </div>
                <p className="text-xl font-bold text-white">${campaign.budget}</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">Views</span>
                </div>
                <p className="text-xl font-bold text-white">{campaign.views || '0'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors font-medium">
                {campaign.status === 'active' ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Resume</>}
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">View Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
