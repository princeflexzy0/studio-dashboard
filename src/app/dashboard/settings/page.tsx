'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Save, Bell, Shield, Database, Mail, Moon, Globe, Lock, CheckCircle } from 'lucide-react';
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
  twoFactorAuth: boolean;
  maintenanceMode: boolean;
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
    twoFactorAuth: false,
    maintenanceMode: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (key: keyof Settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
      setHasChanges(true);
      toast.success(`${key.replace(/([A-Z])/g, ' $1').trim()} ${!settings[key] ? 'enabled' : 'disabled'}`);
    }
  };

  const handleInputChange = (key: keyof Settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Settings saved successfully!');
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        siteName: 'Studio Dashboard',
        siteUrl: 'https://studio.example.com',
        adminEmail: 'admin@studio.com',
        allowRegistration: true,
        emailNotifications: true,
        pushNotifications: false,
        darkMode: true,
        autoBackup: true,
        twoFactorAuth: false,
        maintenanceMode: false,
      });
      setHasChanges(false);
      toast.success('Settings reset to default!');
    }
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 hover:scale-110 ${
        enabled 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50' 
          : 'bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Settings" 
        subtitle="Configure system preferences and options"
      />
      
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        
        {/* General Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 hover:border-cyan-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
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
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
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
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Allow User Registration</p>
                <p className="text-gray-400 text-sm mt-1">Enable new users to register accounts</p>
              </div>
              <ToggleSwitch 
                enabled={settings.allowRegistration} 
                onChange={() => handleToggle('allowRegistration')} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm mt-1">Require 2FA for all admin accounts</p>
              </div>
              <ToggleSwitch 
                enabled={settings.twoFactorAuth} 
                onChange={() => handleToggle('twoFactorAuth')} 
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm mt-1">Receive email alerts for important events</p>
              </div>
              <ToggleSwitch 
                enabled={settings.emailNotifications} 
                onChange={() => handleToggle('emailNotifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm mt-1">Get browser push notifications</p>
              </div>
              <ToggleSwitch 
                enabled={settings.pushNotifications} 
                onChange={() => handleToggle('pushNotifications')} 
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6 hover:border-blue-500/50 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">System</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Auto Backup</p>
                <p className="text-gray-400 text-sm mt-1">Automatically backup data daily</p>
              </div>
              <ToggleSwitch 
                enabled={settings.autoBackup} 
                onChange={() => handleToggle('autoBackup')} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-gray-400 text-sm mt-1">Use dark theme interface</p>
              </div>
              <ToggleSwitch 
                enabled={settings.darkMode} 
                onChange={() => handleToggle('darkMode')} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-white font-medium">Maintenance Mode</p>
                  <p className="text-gray-400 text-sm mt-1">Put site in maintenance mode</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={settings.maintenanceMode} 
                onChange={() => handleToggle('maintenanceMode')} 
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {hasChanges ? 'Save Changes' : 'All Saved'}
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Reset to Default
          </button>
        </div>

        {hasChanges && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-yellow-400" />
            <p className="text-yellow-400 text-sm">You have unsaved changes</p>
          </div>
        )}
      </div>
    </div>
  );
}
