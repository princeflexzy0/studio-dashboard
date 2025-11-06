'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Lock, Shield, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'Admin User',
    email: 'admin@studio.com',
    notifications: true,
    emailAlerts: true,
    twoFactor: false
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Settings className="w-8 h-8 text-cyan-400" />
          Settings
        </h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-gray-400">Receive push notifications</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Alerts</p>
                <p className="text-sm text-gray-400">Receive email notifications</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailAlerts ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.emailAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactor ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.twoFactor ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
