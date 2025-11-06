'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Camera, Mail, Phone, MapPin, Lock, Eye, EyeOff, Save, Check, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

type TabType = 'profile' | 'notifications' | 'security';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  uploadComplete: boolean;
  requestUpdates: boolean;
  campaignAlerts: boolean;
  weeklyReport: boolean;
}

export default function SettingsPage() {
  // Always call useAuth - never conditionally
  const { user, updateUser, updateProfilePicture } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@studio.com',
    phone: '+234 812 345 6789',
    location: 'Lagos, Nigeria',
    bio: 'Studio administrator managing content and operations'
  });

  // Update profile from user data when available
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    uploadComplete: true,
    requestUpdates: true,
    campaignAlerts: false,
    weeklyReport: true
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'security' as TabType, label: 'Security', icon: Shield }
  ];

  const handleSave = () => {
    if (updateUser) {
      updateUser({ name: profile.name, email: profile.email });
    }
    setSaved(true);
    toast.success('Settings saved successfully!', {
      style: { background: '#1F2937', color: '#fff' },
    });
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB', {
          style: { background: '#1F2937', color: '#fff' },
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file', {
          style: { background: '#1F2937', color: '#fff' },
        });
        return;
      }

      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (updateProfilePicture) {
          updateProfilePicture(imageUrl);
        }
        setUploading(false);
        toast.success('Profile picture updated!', {
          style: { background: '#1F2937', color: '#fff' },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-400">Manage your account preferences and security</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all relative ${
                activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-700">
              <div className="relative">
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                <p className="text-gray-400 mb-2">{profile.email}</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <Upload className="w-4 h-4" />
                  Upload new picture
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">General</h3>
                <div className="space-y-4">
                  <NotificationToggle
                    label="Email Notifications"
                    description="Receive updates via email"
                    enabled={notifications.emailNotifications}
                    onToggle={() => toggleNotification('emailNotifications')}
                  />
                  <NotificationToggle
                    label="Push Notifications"
                    description="Receive push notifications in browser"
                    enabled={notifications.pushNotifications}
                    onToggle={() => toggleNotification('pushNotifications')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
                <div className="space-y-4">
                  <NotificationToggle
                    label="Upload Complete"
                    description="Notify when video uploads finish processing"
                    enabled={notifications.uploadComplete}
                    onToggle={() => toggleNotification('uploadComplete')}
                  />
                  <NotificationToggle
                    label="Request Updates"
                    description="Notify when requests are approved or rejected"
                    enabled={notifications.requestUpdates}
                    onToggle={() => toggleNotification('requestUpdates')}
                  />
                  <NotificationToggle
                    label="Campaign Alerts"
                    description="Notify about campaign performance"
                    enabled={notifications.campaignAlerts}
                    onToggle={() => toggleNotification('campaignAlerts')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Reports</h3>
                <div className="space-y-4">
                  <NotificationToggle
                    label="Weekly Report"
                    description="Receive weekly analytics summary"
                    enabled={notifications.weeklyReport}
                    onToggle={() => toggleNotification('weeklyReport')}
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {saved ? 'Saved!' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors pr-12"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors pr-12"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Update Password
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      security.twoFactorEnabled ? 'bg-cyan-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        security.twoFactorEnabled ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function NotificationToggle({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition-colors ${enabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
      >
        <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-7' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
