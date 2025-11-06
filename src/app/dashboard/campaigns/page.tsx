'use client';

import { useQuery } from 'react-query';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useQuery('campaigns', async () => {
    const res = await fetch('/api/admin/campaigns');
    return res.json();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
          Campaign Tracker
        </h1>
        <p className="text-gray-400">Monitor advertising campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Budget</p>
          <p className="text-3xl font-bold text-white">
            ${campaigns?.reduce((sum: number, c: any) => sum + c.budget, 0) || 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-white">
            ${campaigns?.reduce((sum: number, c: any) => sum + c.spent, 0) || 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Active Campaigns</p>
          <p className="text-3xl font-bold text-white">
            {campaigns?.filter((c: any) => c.status === 'active').length || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns?.map((campaign: any, i: number) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{campaign.title}</h3>
                <p className="text-sm text-gray-400">{campaign.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'active' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Budget</span>
                <span className="text-white font-semibold">${campaign.budget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Spent</span>
                <span className="text-white font-semibold">${campaign.spent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Impressions</span>
                <span className="text-white font-semibold">{campaign.impressions.toLocaleString()}</span>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
              />
            </div>

            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
              {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {campaign.status === 'active' ? 'Pause Campaign' : 'Resume Campaign'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
