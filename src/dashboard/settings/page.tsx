'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

type TabType = 'profile' | 'notifications' | 'security';

export default function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const { data: profile, isLoading } = useQuery(
    'user-profile',
    dashboardService.getProfile
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1a1a1a]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#00D9FF] text-[#00D9FF]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && <ProfileTab profile={profile} isLoading={isLoading} />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'security' && <SecurityTab />}
      </motion.div>
    </div>
  );
}

// Profile Tab Component
function ProfileTab({ profile, isLoading }: any) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    bio: profile?.bio || '',
  });

  const updateMutation = useMutation(
    () => dashboardService.updateProfile(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-profile');
        toast.success('Profile updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update profile');
      },
    }
  );

  if (isLoading) {
    return (
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-10 bg-[#1a1a1a] rounded" />
          <div className="h-10 bg-[#1a1a1a] rounded" />
          <div className="h-24 bg-[#1a1a1a] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation.mutate();
        }}
        className="space-y-6"
      >
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#7B2BFF] flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {formData.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
          >
            Change Avatar
          </button>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00b8d4] transition-colors disabled:opacity-50 font-medium"
        >
          <Save className="w-5 h-5" />
          {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

// Notifications Tab Component
function NotificationsTab() {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    updates: true,
    requests: true,
    uploads: true,
  });

  const updateMutation = useMutation(
    () => dashboardService.updateNotifications(settings),
    {
      onSuccess: () => {
        toast.success('Notification preferences updated!');
      },
      onError: () => {
        toast.error('Failed to update preferences');
      },
    }
  );

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 max-w-2xl space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Notification Preferences
        </h3>
        <p className="text-gray-400">
          Choose how you want to receive updates
        </p>
      </div>

      {/* Email Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
        <div>
          <h4 className="text-white font-medium">Email Notifications</h4>
          <p className="text-sm text-gray-400">Receive updates via email</p>
        </div>
        <button
          onClick={() => toggleSetting('email')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.email ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              settings.email ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
        <div>
          <h4 className="text-white font-medium">Push Notifications</h4>
          <p className="text-sm text-gray-400">Browser push notifications</p>
        </div>
        <button
          onClick={() => toggleSetting('push')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.push ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              settings.push ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Updates */}
      <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
        <div>
          <h4 className="text-white font-medium">Product Updates</h4>
          <p className="text-sm text-gray-400">New features and improvements</p>
        </div>
        <button
          onClick={() => toggleSetting('updates')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.updates ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              settings.updates ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Request Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
        <div>
          <h4 className="text-white font-medium">Request Updates</h4>
          <p className="text-sm text-gray-400">New content requests</p>
        </div>
        <button
          onClick={() => toggleSetting('requests')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.requests ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              settings.requests ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Upload Notifications */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h4 className="text-white font-medium">Upload Status</h4>
          <p className="text-sm text-gray-400">File upload completion</p>
        </div>
        <button
          onClick={() => toggleSetting('uploads')}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            settings.uploads ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              settings.uploads ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={() => updateMutation.mutate()}
        disabled={updateMutation.isLoading}
        className="w-full px-6 py-3 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00b8d4] transition-colors disabled:opacity-50 font-medium"
      >
        {updateMutation.isLoading ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  );
}

// Security Tab Component
function SecurityTab() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const updatePasswordMutation = useMutation(
    () => dashboardService.updateSecurity({ ...passwordData, type: 'password' }),
    {
      onSuccess: () => {
        toast.success('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      },
      onError: () => {
        toast.error('Failed to update password');
      },
    }
  );

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    updatePasswordMutation.mutate();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Change Password */}
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updatePasswordMutation.isLoading}
            className="w-full px-6 py-3 bg-[#00D9FF] text-black rounded-lg hover:bg-[#00b8d4] transition-colors disabled:opacity-50 font-medium"
          >
            {updatePasswordMutation.isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              twoFactorEnabled ? 'bg-[#00D9FF]' : 'bg-[#1a1a1a]'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                twoFactorEnabled ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-[#00D9FF]/10 border border-[#00D9FF]/20 rounded-lg">
            <p className="text-sm text-[#00D9FF]">
              Two-factor authentication is enabled. You'll receive a code via email when logging in.
            </p>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Active Sessions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
            <div>
              <p className="text-white font-medium">Chrome on MacOS</p>
              <p className="text-sm text-gray-400">Lagos, Nigeria • Current session</p>
            </div>
            <span className="text-xs text-green-500 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}