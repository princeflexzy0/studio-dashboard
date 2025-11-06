'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Save,
  Upload,
  MapPin,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userLocation, setUserLocation] = useState<any>(null);
  const [profileImage, setProfileImage] = useState('https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff');
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@studio.com',
    phone: '+1 (555) 000-0000',
    bio: 'Platform Administrator'
  });

  const [notifications, setNotifications] = useState({
    emailNotifs: true,
    pushNotifs: true,
    smsNotifs: false,
    weeklyReport: true
  });

  // Fetch user's IP and location
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserLocation({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone
        });
      })
      .catch(err => console.error('Failed to fetch location:', err));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Manage your account preferences and security
        </p>
      </motion.div>

      {/* Location Info Banner */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Connected from: {userLocation.city}, {userLocation.region}, {userLocation.country}
              </p>
              <p className="text-xs text-gray-400">
                IP: {userLocation.ip} • Timezone: {userLocation.timezone}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

              {/* Profile Picture */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-700">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full ring-4 ring-gray-700"
                />
                <div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors cursor-pointer font-medium">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF • Max 2MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-400">Receive notifications via this channel</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [key]: !value})}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        value ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                <Save className="w-5 h-5" />
                Save Preferences
              </button>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  <Shield className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
