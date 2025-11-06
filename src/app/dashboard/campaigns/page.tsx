'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, TrendingUp, Users, DollarSign, Calendar, Play, Pause, Edit, Trash2, Plus, LucideIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Campaign {
  id: number;
  name: string;
  status: string;
  budget: string;
  spent: string;
  reach: string;
  conversions: number;
  startDate: string;
  endDate: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Promo 2024', status: 'active', budget: 'A$75,000', spent: 'A$48,000', reach: '1.2M', conversions: 8420, startDate: '2024-06-01', endDate: '2024-08-31' },
    { id: 2, name: 'Product Launch', status: 'active', budget: 'A$112,500', spent: 'A$67,500', reach: '2.1M', conversions: 15230, startDate: '2024-07-15', endDate: '2024-09-30' },
    { id: 3, name: 'Brand Awareness', status: 'paused', budget: 'A$45,000', spent: 'A$27,000', reach: '850K', conversions: 4120, startDate: '2024-05-01', endDate: '2024-07-31' },
    { id: 4, name: 'Holiday Special', status: 'scheduled', budget: 'A$135,000', spent: 'A$0', reach: '0', conversions: 0, startDate: '2024-12-01', endDate: '2025-01-15' },
    { id: 5, name: 'Flash Sale Campaign', status: 'completed', budget: 'A$30,000', spent: 'A$29,250', reach: '650K', conversions: 5840, startDate: '2024-04-01', endDate: '2024-04-30' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    startDate: '',
    endDate: ''
  });

  const handleNewCampaign = () => {
    setEditingCampaign(null);
    setFormData({ name: '', budget: '', startDate: '', endDate: '' });
    setShowModal(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      budget: campaign.budget.replace('A$', '').replace(',', ''),
      startDate: campaign.startDate,
      endDate: campaign.endDate
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, name: formData.name, budget: `A$${Number(formData.budget).toLocaleString()}`, startDate: formData.startDate, endDate: formData.endDate }
          : c
      ));
      toast.success(`Campaign "${formData.name}" updated!`);
    } else {
      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        name: formData.name,
        status: 'scheduled',
        budget: `A$${Number(formData.budget).toLocaleString()}`,
        spent: 'A$0',
        reach: '0',
        conversions: 0,
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      setCampaigns(prev => [...prev, newCampaign]);
      toast.success(`Campaign "${formData.name}" created!`);
    }
    
    setShowModal(false);
  };

  const handleToggleStatus = (id: number, currentStatus: string, name: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast.success(`Campaign "${name}" ${newStatus === 'active' ? 'resumed' : 'paused'}`);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      toast.success(`Campaign "${name}" deleted`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Campaigns
          </h1>
          <p className="text-gray-400">Manage your marketing campaigns</p>
        </div>
        <button 
          onClick={handleNewCampaign}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Briefcase} label="Active Campaigns" value={campaigns.filter(c => c.status === 'active').length.toString()} color="cyan" />
        <StatCard icon={DollarSign} label="Total Budget" value="A$397.5K" color="green" />
        <StatCard icon={Users} label="Total Reach" value="4.8M" color="blue" />
        <StatCard icon={TrendingUp} label="Conversions" value="33.6K" color="purple" />
      </div>

      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                    campaign.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {campaign.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Budget</p>
                    <p className="text-white font-semibold">{campaign.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Spent</p>
                    <p className="text-white font-semibold">{campaign.spent}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Reach</p>
                    <p className="text-white font-semibold">{campaign.reach}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Conversions</p>
                    <p className="text-white font-semibold">{campaign.conversions.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{campaign.startDate} - {campaign.endDate}</span>
                </div>
              </div>
              <div className="flex lg:flex-col gap-2">
                <button 
                  onClick={() => handleEdit(campaign)}
                  className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  title="Edit campaign"
                >
                  <Edit className="w-5 h-5" />
                </button>
                {campaign.status === 'active' ? (
                  <button 
                    onClick={() => handleToggleStatus(campaign.id, campaign.status, campaign.name)}
                    className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                    title="Pause campaign"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                ) : campaign.status === 'paused' ? (
                  <button 
                    onClick={() => handleToggleStatus(campaign.id, campaign.status, campaign.name)}
                    className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                    title="Resume campaign"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                ) : null}
                <button 
                  onClick={() => handleDelete(campaign.id, campaign.name)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  title="Delete campaign"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CAMPAIGN MODAL */}
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
                <h2 className="text-2xl font-bold text-white">
                  {editingCampaign ? 'Edit Campaign' : 'New Campaign'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="e.g., Summer Promo 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget (AUD)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="75000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
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
                    {editingCampaign ? 'Update' : 'Create'}
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
