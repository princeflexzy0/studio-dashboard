'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Eye, Target, Play, Pause } from 'lucide-react';
import toast from 'react-hot-toast';

interface Campaign {
  id: string;
  title: string;
  budget: number;
  spent: number;
  views: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  { id: 'CMP001', title: 'Summer Music Festival Promo', budget: 500, spent: 320, views: 45000, clicks: 2300, status: 'active', startDate: '2025-10-01', endDate: '2025-12-01' },
  { id: 'CMP002', title: 'New Album Launch', budget: 800, spent: 800, views: 78000, clicks: 4200, status: 'completed', startDate: '2025-09-15', endDate: '2025-10-31' },
  { id: 'CMP003', title: 'Artist Spotlight Series', budget: 300, spent: 150, views: 22000, clicks: 1100, status: 'paused', startDate: '2025-10-20', endDate: '2025-11-20' },
  { id: 'CMP004', title: 'Holiday Special Campaign', budget: 1000, spent: 420, views: 52000, clicks: 3100, status: 'active', startDate: '2025-11-01', endDate: '2025-12-25' },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(camp => {
      if (camp.id === id) {
        const newStatus = camp.status === 'active' ? 'paused' : 'active';
        toast.success(`Campaign ${newStatus}!`, { style: { background: '#1F2937', color: '#fff' } });
        return { ...camp, status: newStatus as 'active' | 'paused' };
      }
      return camp;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const calculateProgress = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalViews = campaigns.reduce((sum, c) => sum + c.views, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Campaign Tracker
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Monitor and manage your advertising campaigns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">${totalBudget}</p>
          <p className="text-xs sm:text-sm text-gray-400">Total Budget</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">${totalSpent}</p>
          <p className="text-xs sm:text-sm text-gray-400">Total Spent</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-gray-400">Total Views</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">{totalClicks.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-gray-400">Total Clicks</p>
        </motion.div>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold text-lg">{campaign.title}</h3>
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium uppercase ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Campaign ID: {campaign.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>

              {campaign.status !== 'completed' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleCampaignStatus(campaign.id)}
                  className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    campaign.status === 'active' 
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30' 
                      : 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30'
                  }`}
                >
                  {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {campaign.status === 'active' ? 'Pause' : 'Resume'}
                </motion.button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Budget Progress</span>
                <span className="text-cyan-400 font-semibold">${campaign.spent} / ${campaign.budget}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress(campaign.spent, campaign.budget)}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Budget</p>
                <p className="text-lg font-bold text-green-400">${campaign.budget}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Spent</p>
                <p className="text-lg font-bold text-cyan-400">${campaign.spent}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Views</p>
                <p className="text-lg font-bold text-purple-400">{campaign.views.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Clicks</p>
                <p className="text-lg font-bold text-orange-400">{campaign.clicks.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
