'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Shield, Save, Camera, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, login } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { data: profile, isLoading } = useQuery('profile', dashboardService.getProfile);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    avatar: user?.avatar || null,
  });

  // Update user in real-time when name changes
  useEffect(() => {
    if (profileData.name && user) {
      login({ ...user, name: profileData.name });
    }
  }, [profileData.name]);

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

  // Play click sound
  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,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');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file', {
          style: { background: '#1F2937', color: '#fff' },
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB', {
          style: { background: '#1F2937', color: '#fff' },
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setProfileData({ ...profileData, avatar: avatarUrl });
        
        if (user) {
          login({ ...user, avatar: avatarUrl });
        }

        playClickSound();
        toast.success('Profile picture updated!', {
          style: { background: '#1F2937', color: '#fff' },
          icon: '📸',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    playClickSound();

    // Update auth context immediately
    if (user) {
      login({ 
        ...user, 
        name: profileData.name, 
        email: profileData.email,
        avatar: profileData.avatar 
      });
    }

    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile saved successfully!', {
        style: { background: '#1F2937', color: '#fff' },
        icon: '✅',
      });
    }, 800);
  };

  const handleSaveNotifications = () => {
    setIsSaving(true);
    playClickSound();
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Notification preferences saved!', {
        style: { background: '#1F2937', color: '#fff' },
        icon: '🔔',
      });
    }, 800);
  };

  const handleSaveSecurity = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error('Passwords do not match!', {
        style: { background: '#1F2937', color: '#fff' },
      });
      return;
    }

    setIsSaving(true);
    playClickSound();
    
    setTimeout(() => {
      setIsSaving(false);
      setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Security settings updated!', {
        style: { background: '#1F2937', color: '#fff' },
        icon: '🔒',
      });
    }, 800);
  };

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

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-4">Profile Picture</label>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/30"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center border-2 border-cyan-500/30">
                        <span className="text-white font-bold text-3xl">
                          {(profileData.name || user?.name || 'A').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playClickSound();
                        fileInputRef.current?.click();
                      }}
                      className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        playClickSound();
                        fileInputRef.current?.click();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all mb-2 shadow-lg hover:shadow-cyan-500/20"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </motion.button>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4 max-w-xl">
                {[
                  { key: 'email', title: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', title: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'weekly', title: 'Weekly Report', desc: 'Receive weekly summary emails' },
                ].map((item) => (
                  <motion.div
                    key={item.key}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
                  >
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        playClickSound();
                        setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] });
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? 'bg-cyan-500' : 'bg-gray-700'
                      }`}
                    >
                      <motion.div
                        animate={{
                          x: notifications[item.key as keyof typeof notifications] ? 24 : 4,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </motion.div>
                ))}
                
                <motion.button
                  onClick={handleSaveNotifications}
                  disabled={isSaving}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </>
                  )}
                </motion.button>
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
                >
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add extra security layer</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playClickSound();
                      setSecurity({ ...security, twoFactor: !security.twoFactor });
                    }}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      security.twoFactor ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <motion.div
                      animate={{ x: security.twoFactor ? 24 : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                    />
                  </motion.button>
                </motion.div>
                
                <motion.button
                  onClick={handleSaveSecurity}
                  disabled={isSaving}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Security
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
