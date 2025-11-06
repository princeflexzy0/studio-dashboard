'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Video, TrendingUp, DollarSign, Mail, MapPin, Star, Plus, LucideIcon, UserCheck, UserX, MessageSquare, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  videos: number;
  views: string;
  earnings: string;
  rating: number;
  status: string;
  avatar: string;
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([
    { id: 1, name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com', phone: '+81 90 1234 5678', location: 'Tokyo, Japan', videos: 45, views: '2.3M', earnings: '$67,500', rating: 4.8, status: 'active', avatar: 'YT' },
    { id: 2, name: 'Sofia Rodriguez', email: 'sofia.r@example.com', phone: '+34 612 345 678', location: 'Barcelona, Spain', videos: 32, views: '1.8M', earnings: '$57,000', rating: 4.6, status: 'active', avatar: 'SR' },
    { id: 3, name: 'Kwame Mensah', email: 'kwame.m@example.com', phone: '+233 24 123 4567', location: 'Accra, Ghana', videos: 58, views: '3.1M', earnings: '$93,000', rating: 4.9, status: 'active', avatar: 'KM' },
    { id: 4, name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 43210', location: 'Mumbai, India', videos: 28, views: '1.2M', earnings: '$43,500', rating: 4.5, status: 'pending', avatar: 'PS' },
    { id: 5, name: 'Liam O\'Connor', email: 'liam.oconnor@example.com', phone: '+61 412 345 678', location: 'Sydney, Australia', videos: 41, views: '2.0M', earnings: '$61,500', rating: 4.7, status: 'active', avatar: 'LO' },
    { id: 6, name: 'Fatima Al-Rashid', email: 'fatima.ar@example.com', phone: '+971 50 123 4567', location: 'Dubai, UAE', videos: 52, views: '2.7M', earnings: '$81,000', rating: 4.8, status: 'active', avatar: 'FA' },
    { id: 7, name: 'Marcus Washington', email: 'marcus.w@example.com', phone: '+1 917 555 0123', location: 'New York, USA', videos: 38, views: '1.9M', earnings: '$57,000', rating: 4.6, status: 'active', avatar: 'MW' },
    { id: 8, name: 'Chen Wei', email: 'chen.wei@example.com', phone: '+86 138 0013 8000', location: 'Shanghai, China', videos: 47, views: '2.4M', earnings: '$72,000', rating: 4.9, status: 'active', avatar: 'CW' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [message, setMessage] = useState('');

  const handleAddCreator = () => {
    setFormData({ name: '', email: '', phone: '', location: '' });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const newCreator: Creator = {
      id: creators.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      videos: 0,
      views: '0',
      earnings: '$0',
      rating: 0,
      status: 'pending',
      avatar: initials
    };
    
    setCreators(prev => [...prev, newCreator]);
    toast.success(`Creator "${formData.name}" added successfully!`);
    setShowModal(false);
  };

  const handleMessage = (creator: Creator) => {
    setSelectedCreator(creator);
    setMessage('');
    setShowMessageModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Message sent to ${selectedCreator?.name}!`);
    setShowMessageModal(false);
  };

  const handleApprove = (id: number, name: string) => {
    setCreators(prev => prev.map(c => c.id === id ? { ...c, status: 'active' } : c));
    toast.success(`${name} approved and activated!`);
  };

  const handleSuspend = (id: number, name: string) => {
    if (confirm(`Are you sure you want to suspend ${name}?`)) {
      setCreators(prev => prev.map(c => c.id === id ? { ...c, status: 'suspended' } : c));
      toast.error(`${name} has been suspended`);
    }
  };

  const totalVideos = creators.reduce((sum, c) => sum + c.videos, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Content Creators
          </h1>
          <p className="text-gray-400">Manage your global content creator network</p>
        </div>
        <button 
          onClick={handleAddCreator}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Creator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Creators" value={creators.length.toString()} color="cyan" />
        <StatCard icon={Video} label="Total Videos" value={totalVideos.toString()} color="purple" />
        <StatCard icon={TrendingUp} label="Total Views" value="17.4M" color="blue" />
        <StatCard icon={DollarSign} label="Total Earnings" value="$532.5K" color="green" />
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
                    creator.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                    creator.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
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

              <div className="flex md:flex-col gap-2">
                <button 
                  onClick={() => handleMessage(creator)}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  title="Send message"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                {creator.status === 'pending' ? (
                  <button 
                    onClick={() => handleApprove(creator.id, creator.name)}
                    className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    title="Approve creator"
                  >
                    <UserCheck className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleSuspend(creator.id, creator.name)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    title="Suspend creator"
                  >
                    <UserX className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADD CREATOR MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Creator</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="London, UK"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add Creator
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MESSAGE MODAL */}
      <AnimatePresence>
        {showMessageModal && selectedCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Message {selectedCreator.name}</h2>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
