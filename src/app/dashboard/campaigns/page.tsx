'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Plus, Calendar, Target } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  brand: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: string;
  participants: number;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call - dummy data for campaigns
    setTimeout(() => {
      setCampaigns([
        {
          id: 1,
          name: 'Summer Sale 2024',
          brand: 'FashionCo',
          status: 'active',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          budget: '$50,000',
          participants: 25
        },
        {
          id: 2,
          name: 'Back to School',
          brand: 'TechGear',
          status: 'active',
          startDate: '2024-08-01',
          endDate: '2024-09-30',
          budget: '$35,000',
          participants: 18
        },
        {
          id: 3,
          name: 'Holiday Special',
          brand: 'GiftWorld',
          status: 'pending',
          startDate: '2024-12-01',
          endDate: '2024-12-31',
          budget: '$75,000',
          participants: 0
        },
        {
          id: 4,
          name: 'Spring Collection',
          brand: 'StyleHub',
          status: 'completed',
          startDate: '2024-03-01',
          endDate: '2024-05-31',
          budget: '$45,000',
          participants: 32
        },
        {
          id: 5,
          name: 'Fitness Challenge',
          brand: 'HealthPlus',
          status: 'active',
          startDate: '2024-10-01',
          endDate: '2024-11-30',
          budget: '$28,000',
          participants: 15
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Campaign',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.brand}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'participants',
      label: 'Participants',
      render: (value) => (
        <span className="text-cyan-400 font-semibold">{value}</span>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (value) => (
        <span className="text-green-400 font-semibold">{value}</span>
      ),
    },
    {
      key: 'startDate',
      label: 'Duration',
      render: (value, row) => (
        <div className="text-gray-300 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(value).toLocaleDateString()}</span>
          </div>
          <div className="text-gray-500 text-xs">
            to {new Date(row.endDate).toLocaleDateString()}
          </div>
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
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              placeholder="Search campaigns by name or brand..."
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
            <p className="text-gray-400 text-sm mb-2">Pending</p>
            <p className="text-yellow-400 text-3xl font-bold">
              {campaigns.filter(c => c.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Budget</p>
            <p className="text-cyan-400 text-3xl font-bold">
              ${campaigns.reduce((sum, c) => sum + parseInt(c.budget.replace(/[$,]/g, '')), 0).toLocaleString()}
            </p>
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
