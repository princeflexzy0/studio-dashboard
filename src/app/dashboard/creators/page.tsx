'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Shield, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Creator {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
  uploads: number;
}

const mockCreators: Creator[] = [
  { id: 1, name: 'John Doe', email: 'john@test.com', role: 'creator', status: 'active', joinedDate: '2025-01-15', uploads: 24 },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com', role: 'editor', status: 'active', joinedDate: '2025-02-20', uploads: 18 },
  { id: 3, name: 'Mike Johnson', email: 'mike@test.com', role: 'creator', status: 'pending', joinedDate: '2025-10-01', uploads: 0 },
  { id: 4, name: 'Sarah Williams', email: 'sarah@test.com', role: 'creator', status: 'active', joinedDate: '2025-03-10', uploads: 32 },
  { id: 5, name: 'Tom Brown', email: 'tom@test.com', role: 'creator', status: 'suspended', joinedDate: '2024-12-05', uploads: 12 },
];

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setCreators(mockCreators);
  }, []);

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || creator.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <Shield className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Creators & Users
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage platform users and contributors</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search creators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  {creator.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    {creator.name}
                    {getRoleIcon(creator.role)}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    {creator.email}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-400">{creator.uploads}</p>
                  <p className="text-xs text-gray-500">Uploads</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">{new Date(creator.joinedDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-gray-500">Joined</p>
                </div>
                <span className={`px-3 py-1 rounded-full border text-xs font-medium uppercase ${getStatusColor(creator.status)}`}>
                  {creator.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <p className="text-gray-400">No creators found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
