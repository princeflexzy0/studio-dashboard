'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, UserPlus, Eye, X, Mail, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
  const [viewingCreator, setViewingCreator] = useState<Creator | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCreatorName, setNewCreatorName] = useState('');
  const [newCreatorEmail, setNewCreatorEmail] = useState('');

  useEffect(() => {
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

  const handleViewProfile = (creator: Creator) => {
    setViewingCreator(creator);
    toast.success(`Opening ${creator.name}'s profile...`);
  };

  const handleAddCreator = () => {
    if (!newCreatorName || !newCreatorEmail) {
      toast.error('Please fill in all fields');
      return;
    }

    const newCreator: Creator = {
      id: creators.length + 1,
      name: newCreatorName,
      email: newCreatorEmail,
      uploads: 0,
      status: 'pending',
      joined: new Date().toISOString().split('T')[0]
    };

    setCreators(prev => [newCreator, ...prev]);
    toast.success(`${newCreatorName} added successfully!`);
    
    setNewCreatorName('');
    setNewCreatorEmail('');
    setShowAddModal(false);
  };

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
      render: (_, row) => (
        <button 
          onClick={() => handleViewProfile(row)}
          className="px-3 py-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
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
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Creator</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <p className="text-gray-400 text-sm mb-2">Total Creators</p>
            <p className="text-white text-3xl font-bold">{creators.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <p className="text-gray-400 text-sm mb-2">Active Creators</p>
            <p className="text-green-400 text-3xl font-bold">
              {creators.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
            <p className="text-gray-400 text-sm mb-2">Pending Approval</p>
            <p className="text-yellow-400 text-3xl font-bold">
              {creators.filter(c => c.status === 'pending').length}
            </p>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredCreators}
          isLoading={loading}
          emptyMessage="No creators found"
        />
      </div>

      {/* View Profile Modal */}
      {viewingCreator && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {viewingCreator.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{viewingCreator.name}</h3>
                  <p className="text-gray-400">{viewingCreator.email}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingCreator(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-1">Total Uploads</p>
                  <p className="text-white text-2xl font-bold">{viewingCreator.uploads}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <StatusBadge status={viewingCreator.status} />
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">Joined</p>
                </div>
                <p className="text-white">{new Date(viewingCreator.joined).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => setViewingCreator(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Creator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Add New Creator</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Creator Name
                </label>
                <input
                  type="text"
                  value={newCreatorName}
                  onChange={(e) => setNewCreatorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={newCreatorEmail}
                    onChange={(e) => setNewCreatorEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCreator}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Creator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
