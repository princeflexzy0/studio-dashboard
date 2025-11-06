'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Video, TrendingUp, DollarSign, Mail, MapPin, Star, Plus, LucideIcon } from 'lucide-react';

export default function CreatorsPage() {
  const creators = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 801 234 5678', location: 'Lagos', videos: 45, views: '2.3M', earnings: '₦450,000', rating: 4.8, status: 'active', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', phone: '+234 802 345 6789', location: 'Abuja', videos: 32, views: '1.8M', earnings: '₦380,000', rating: 4.6, status: 'active', avatar: 'MC' },
    { id: 3, name: 'Aisha Ibrahim', email: 'aisha@example.com', phone: '+234 803 456 7890', location: 'Kano', videos: 58, views: '3.1M', earnings: '₦620,000', rating: 4.9, status: 'active', avatar: 'AI' },
    { id: 4, name: 'David Okafor', email: 'david@example.com', phone: '+234 804 567 8901', location: 'Enugu', videos: 28, views: '1.2M', earnings: '₦290,000', rating: 4.5, status: 'pending', avatar: 'DO' },
    { id: 5, name: 'Linda Martinez', email: 'linda@example.com', phone: '+234 805 678 9012', location: 'Port Harcourt', videos: 41, views: '2.0M', earnings: '₦410,000', rating: 4.7, status: 'active', avatar: 'LM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Content Creators
          </h1>
          <p className="text-gray-400">Manage your content creator network</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Creator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Creators" value="5" color="cyan" />
        <StatCard icon={Video} label="Total Videos" value="204" color="purple" />
        <StatCard icon={TrendingUp} label="Total Views" value="10.4M" color="blue" />
        <StatCard icon={DollarSign} label="Total Earnings" value="₦2.15M" color="green" />
      </div>

      <div className="grid gap-4">
        {creators.map((creator) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {creator.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{creator.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{creator.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    creator.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {creator.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Videos</p>
                  <p className="text-white font-semibold">{creator.videos}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Views</p>
                  <p className="text-white font-semibold">{creator.views}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Earnings</p>
                  <p className="text-green-400 font-semibold">{creator.earnings}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{creator.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{creator.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: LucideIcon; label: string; value: string; color: 'cyan' | 'green' | 'blue' | 'purple' }) {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50',
    green: 'from-green-500/20 to-green-600/20 border-green-500/50',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/50',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/50',
  };
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-xl p-6 border`}>
      <Icon className="w-8 h-8 text-cyan-400 mb-3" />
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
