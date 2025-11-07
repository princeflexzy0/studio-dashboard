'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Download, Eye } from 'lucide-react';

interface Upload {
  id: number;
  title: string;
  creator: string;
  status: string;
  date: string;
  size: string;
  type: string;
}

export default function UploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch from our API endpoint we created in Task 1
    fetch('/api/admin/uploads')
      .then(res => res.json())
      .then(data => {
        setUploads(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching uploads:', error);
        setLoading(false);
      });
  }, []);

  const columns: Column[] = [
    {
      key: 'title',
      label: 'Title',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'creator',
      label: 'Creator',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      ),
    },
    {
      key: 'size',
      label: 'Size',
      render: (value) => (
        <span className="text-cyan-400 font-medium">{value}</span>
      ),
    },
    {
      key: 'date',
      label: 'Upload Date',
      render: (value) => (
        <span className="text-gray-300">{new Date(value).toLocaleDateString()}</span>
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
        <div className="flex items-center gap-2">
          <button className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-700 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filteredUploads = uploads.filter(upload =>
    upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    upload.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Uploads" 
        subtitle="Manage and review content uploads"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search uploads by title or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Uploads</p>
            <p className="text-white text-3xl font-bold">{uploads.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Approved</p>
            <p className="text-green-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'approved').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Pending Review</p>
            <p className="text-yellow-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Rejected</p>
            <p className="text-red-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Uploads Table */}
        <Table
          columns={columns}
          data={filteredUploads}
          isLoading={loading}
          emptyMessage="No uploads found"
        />
      </div>
    </div>
  );
}
