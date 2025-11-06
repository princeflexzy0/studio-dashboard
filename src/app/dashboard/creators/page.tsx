'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Video, TrendingUp, DollarSign, Mail, MapPin, Star, Plus, LucideIcon } from 'lucide-react';

export default function CreatorsPage() {
  const creators = [
    { id: 1, name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com', phone: '+81 90 1234 5678', location: 'Tokyo, Japan', videos: 45, views: '2.3M', earnings: 'A$67,500', rating: 4.8, status: 'active', avatar: 'YT' },
    { id: 2, name: 'Sofia Rodriguez', email: 'sofia.r@example.com', phone: '+34 612 345 678', location: 'Barcelona, Spain', videos: 32, views: '1.8M', earnings: 'A$57,000', rating: 4.6, status: 'active', avatar: 'SR' },
    { id: 3, name: 'Kwame Mensah', email: 'kwame.m@example.com', phone: '+233 24 123 4567', location: 'Accra, Ghana', videos: 58, views: '3.1M', earnings: 'A$93,000', rating: 4.9, status: 'active', avatar: 'KM' },
    { id: 4, name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 43210', location: 'Mumbai, India', videos: 28, views: '1.2M', earnings: 'A$43,500', rating: 4.5, status: 'pending', avatar: 'PS' },
    { id: 5, name: 'Liam O\'Connor', email: 'liam.oconnor@example.com', phone: '+61 412 345 678', location: 'Sydney, Australia', videos: 41, views: '2.0M', earnings: 'A$61,500', rating: 4.7, status: 'active', avatar: 'LO' },
    { id: 6, name: 'Fatima Al-Rashid', email: 'fatima.ar@example.com', phone: '+971 50 123 4567', location: 'Dubai, UAE', videos: 52, views: '2.7M', earnings: 'A$81,000', rating: 4.8, status: 'active', avatar: 'FA' },
    { id: 7, name: 'Marcus Washington', email: 'marcus.w@example.com', phone: '+1 917 555 0123', location: 'New York, USA', videos: 38, views: '1.9M', earnings: 'A$57,000', rating: 4.6, status: 'active', avatar: 'MW' },
    { id: 8, name: 'Chen Wei', email: 'chen.wei@example.com', phone: '+86 138 0013 8000', location: 'Shanghai, China', videos: 47, views: '2.4M', earnings: 'A$72,000', rating: 4.9, status: 'active', avatar: 'CW' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Content Creators
          </h1>
          <p className="text-gray-400">Manage your global content creator network</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Creator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Creators" value="8" color="cyan" />
        <StatCard icon={Video} label="Total Videos" value="341" color="purple" />
        <StatCard icon={TrendingUp} label="Total Views" value="17.4M" color="blue" />
        <StatCard icon={DollarSign} label="Total Earnings" value="A$532.5K" color="green" />
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
