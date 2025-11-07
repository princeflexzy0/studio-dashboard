'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, UserPlus } from 'lucide-react';

interface Creator {
  id: number;
  name: string;
  email: string;
  uploads: number;
  status: string;
  joined: string;
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch from API
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setCreators(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching creators:', error);
        setLoading(false);
      });
  }, []);

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Creator',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {value.charAt(0)}
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'uploads',
      label: 'Uploads',
      render: (value) => (
        <span className="text-cyan-400 font-semibold">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'joined',
      label: 'Join Date',
      render: (value) => (
        <span className="text-gray-300">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
          View Profile
        </button>
      ),
    },
  ];

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Creators" 
        subtitle="Manage and monitor content creators"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search creators by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all">
            <UserPlus className="w-5 h-5" />
            <span>Add Creator</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Creators</p>
            <p className="text-white text-3xl font-bold">{creators.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Active Creators</p>
            <p className="text-green-400 text-3xl font-bold">
              {creators.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Pending Approval</p>
            <p className="text-yellow-400 text-3xl font-bold">
              {creators.filter(c => c.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Creators Table */}
        <Table
          columns={columns}
          data={filteredCreators}
          isLoading={loading}
          emptyMessage="No creators found"
        />
      </div>
    </div>
  );
}
