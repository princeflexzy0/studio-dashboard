'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { User, Bell, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  const { data: profile, isLoading } = useQuery('profile', dashboardService.getProfile);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  });

  const profileMutation = useMutation(dashboardService.updateProfile, {
    onSuccess: () => {
      toast.success('Profile updated!', {
        style: { background: '#1F2937', color: '#fff' },
      });
    },
  });

  const notificationsMutation = useMutation(dashboardService.updateNotifications, {
    onSuccess: () => {
      toast.success('Notifications updated!', {
        style: { background: '#1F2937', color: '#fff' },
      });
    },
  });

  const securityMutation = useMutation(dashboardService.updateSecurity, {
    onSuccess: () => {
      toast.success('Security settings updated!', {
        style: { background: '#1F2937', color: '#fff' },
      });
      setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' });
    },
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Tabs */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Princeflexzy"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="admin@studio.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  onClick={() => profileMutation.mutate(profileData)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.email ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.email ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Browser push notifications</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.push ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.push ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Weekly Report</p>
                    <p className="text-sm text-gray-400">Receive weekly summary emails</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, weekly: !notifications.weekly })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.weekly ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.weekly ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
                <button
                  onClick={() => notificationsMutation.mutate(notifications)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add extra security layer</p>
                  </div>
                  <button
                    onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      security.twoFactor ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        security.twoFactor ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
                <button
                  onClick={() => securityMutation.mutate(security)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Update Security
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
