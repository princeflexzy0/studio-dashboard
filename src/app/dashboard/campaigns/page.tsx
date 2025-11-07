'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Plus, Target, Eye, X, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Campaign {
  id: string;
  title: string;
  budget: number;
  spent: number;
  status: string;
  impressions: number;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignBudget, setNewCampaignBudget] = useState('');

  useEffect(() => {
    fetch('/api/admin/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (campaign: Campaign) => {
    setViewingCampaign(campaign);
    toast.success(`Opening ${campaign.title} details...`);
  };

  const handleCreateCampaign = () => {
    if (!newCampaignTitle || !newCampaignBudget) {
      toast.error('Please fill in all fields');
      return;
    }

    const newCampaign: Campaign = {
      id: `CAMP-${campaigns.length + 1}`,
      title: newCampaignTitle,
      budget: parseInt(newCampaignBudget),
      spent: 0,
      status: 'pending',
      impressions: 0
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    toast.success(`Campaign "${newCampaignTitle}" created successfully!`);
    
    setNewCampaignTitle('');
    setNewCampaignBudget('');
    setShowNewModal(false);
  };

  const columns: Column[] = [
    {
      key: 'title',
      label: 'Campaign',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'impressions',
      label: 'Impressions',
      render: (value) => (
        <span className="text-cyan-400 font-semibold">{value.toLocaleString()}</span>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (value, row) => (
        <div>
          <p className="text-green-400 font-semibold">${value}</p>
          <p className="text-gray-500 text-xs">Spent: ${row.spent}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button 
          onClick={() => handleViewDetails(row)}
          className="px-3 py-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      ),
    },
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Campaigns" 
        subtitle="Manage marketing campaigns and track performance"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50"
          >
            <Plus className="w-5 h-5" />
            <span>New Campaign</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
            <p className="text-gray-400 text-sm mb-2">Total Campaigns</p>
            <p className="text-white text-3xl font-bold">{campaigns.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <p className="text-gray-400 text-sm mb-2">Active</p>
            <p className="text-green-400 text-3xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <p className="text-gray-400 text-sm mb-2">Total Budget</p>
            <p className="text-cyan-400 text-3xl font-bold">${totalBudget}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <p className="text-gray-400 text-sm mb-2">Total Spent</p>
            <p className="text-purple-400 text-3xl font-bold">${totalSpent}</p>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredCampaigns}
          isLoading={loading}
          emptyMessage="No campaigns found"
        />
      </div>

      {/* View Campaign Modal */}
      {viewingCampaign && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{viewingCampaign.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{viewingCampaign.id}</p>
              </div>
              <button
                onClick={() => setViewingCampaign(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-sm">Budget</p>
                  </div>
                  <p className="text-white text-2xl font-bold">${viewingCampaign.budget}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <p className="text-sm">Spent</p>
                  </div>
                  <p className="text-white text-2xl font-bold">${viewingCampaign.spent}</p>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Impressions</p>
                <p className="text-white text-2xl font-bold">{viewingCampaign.impressions.toLocaleString()}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Status</p>
                <StatusBadge status={viewingCampaign.status} />
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => setViewingCampaign(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Create New Campaign</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={newCampaignTitle}
                  onChange={(e) => setNewCampaignTitle(e.target.value)}
                  placeholder="Summer Sale 2024"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Budget ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={newCampaignBudget}
                    onChange={(e) => setNewCampaignBudget(e.target.value)}
                    placeholder="5000"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
