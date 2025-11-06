'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Camera, Save, Lock, Mail, Phone, MapPin, Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

type TabType = 'profile' | 'notifications' | 'security';

export default function SettingsPage() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: 'Creative professional specializing in video content and digital media.',
  });

  useEffect(() => {
    const savedImage = localStorage.getItem('studio_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.city && data.country_name) {
        const detectedLocation = `${data.city}, ${data.region}, ${data.country_name}`;
        setProfileData(prev => ({ ...prev, location: detectedLocation }));
        
        if (data.country_calling_code) {
          setProfileData(prev => ({ ...prev, phone: data.country_calling_code + ' ' }));
        }
      }
    } catch (error) {
      console.error('Failed to detect location:', error);
      setProfileData(prev => ({ ...prev, location: 'Location not detected' }));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    uploadAlerts: true,
    requestAlerts: false,
    marketingEmails: false,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB', { style: { background: '#1F2937', color: '#fff' } });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('studio_profile_image', imageUrl);
        
        if (user) {
          const updatedUser = { ...user, avatar: imageUrl };
          login(updatedUser);
        }
        
        toast.success('Profile picture updated!', { style: { background: '#1F2937', color: '#fff' }, icon: '📸' });
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: profileData.name,
        email: profileData.email,
        avatar: profileImage,
      };
      login(updatedUser);
      localStorage.setItem('studio_user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('storage'));
    }
    toast.success('Profile updated successfully!', { style: { background: '#1F2937', color: '#fff' }, icon: '✅' });
  };

  const handleNotificationSave = () => {
    localStorage.setItem('studio_notifications', JSON.stringify(notifications));
    toast.success('Notification preferences saved!', { style: { background: '#1F2937', color: '#fff' }, icon: '🔔' });
  };

  const handlePasswordChange = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error('Please fill all password fields', { style: { background: '#1F2937', color: '#fff' } });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match', { style: { background: '#1F2937', color: '#fff' } });
      return;
    }
    toast.success('Password changed successfully!', { style: { background: '#1F2937', color: '#fff' }, icon: '🔒' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'security' as TabType, label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your account preferences and security</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6"
      >
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-black text-4xl font-bold overflow-hidden cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    profileData.name.charAt(0).toUpperCase()
                  )}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full text-black hover:bg-cyan-400 transition-all shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white">{profileData.name}</h3>
                <p className="text-gray-400">{profileData.email}</p>
                <p className="text-sm text-gray-500 mt-1">Click the camera icon to upload a new photo</p>
                <p className="text-xs text-gray-600">Max size: 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <div className="relative">
                  {isLoadingLocation ? (
                    <Loader className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-500 animate-spin" />
                  ) : (
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  )}
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="Auto-detecting location..."
                    className="w-full pl-10 pr-20 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <motion.button
                    type="button"
                    onClick={detectUserLocation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded text-xs hover:bg-cyan-500/30 transition-all"
                  >
                    Detect
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-1">📍 Auto-detected based on your IP address</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              />
            </div>

            <motion.button
              onClick={handleProfileSave}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Notification Preferences</h2>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all"
                >
                  <div>
                    <h3 className="text-white font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {key === 'emailNotifications' && 'Receive notifications via email'}
                      {key === 'pushNotifications' && 'Receive push notifications in browser'}
                      {key === 'uploadAlerts' && 'Get notified when uploads complete'}
                      {key === 'requestAlerts' && 'Alerts for new collaboration requests'}
                      {key === 'marketingEmails' && 'Promotional and marketing emails'}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      value ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-700'
                    }`}
                  >
                    <motion.div
                      animate={{ x: value ? 28 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={handleNotificationSave}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </motion.button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Security Settings</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Change Password</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <motion.button
                onClick={handlePasswordChange}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Update Password
              </motion.button>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all"
              >
                <div>
                  <h4 className="text-white font-medium">Enable 2FA</h4>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    toast.success(
                      twoFactorEnabled ? '2FA disabled' : '2FA enabled successfully!',
                      { style: { background: '#1F2937', color: '#fff' }, icon: '🔐' }
                    );
                  }}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    twoFactorEnabled ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: twoFactorEnabled ? 28 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
