'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Save, Bell, Shield, Database, Mail, Moon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Settings {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  allowRegistration: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  autoBackup: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Studio Dashboard',
    siteUrl: 'https://studio.example.com',
    adminEmail: 'admin@studio.com',
    allowRegistration: true,
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    autoBackup: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof Settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleInputChange = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Settings saved successfully!');
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Settings" 
        subtitle="Configure your dashboard preferences"
      />
      
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        {/* General Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold text-white">General Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site URL
              </label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Allow Registration</h3>
                <p className="text-sm text-gray-400">Allow new users to register</p>
              </div>
              <button
                onClick={() => handleToggle('allowRegistration')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowRegistration ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive email updates</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-400">Receive browser notifications</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Moon className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-400">Use dark theme</p>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Backup & Data</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto Backup</h3>
                <p className="text-sm text-gray-400">Automatic daily backups</p>
              </div>
              <button
                onClick={() => handleToggle('autoBackup')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoBackup ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
