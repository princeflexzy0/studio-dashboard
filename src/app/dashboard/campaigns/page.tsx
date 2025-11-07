'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Plus, Target } from 'lucide-react';

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

  useEffect(() => {
    // Fetch from API
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
      render: () => (
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
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
        {/* Search and Filters */}
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
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg text-white font-semibold transition-all">
            <Plus className="w-5 h-5" />
            <span>New Campaign</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Campaigns</p>
            <p className="text-white text-3xl font-bold">{campaigns.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Active</p>
            <p className="text-green-400 text-3xl font-bold">
              {campaigns.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Budget</p>
            <p className="text-cyan-400 text-3xl font-bold">${totalBudget}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Spent</p>
            <p className="text-purple-400 text-3xl font-bold">${totalSpent}</p>
          </div>
        </div>

        {/* Campaigns Table */}
        <Table
          columns={columns}
          data={filteredCampaigns}
          isLoading={loading}
          emptyMessage="No campaigns found"
        />
      </div>
    </div>
  );
}
