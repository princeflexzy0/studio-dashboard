'use client';

import { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Upload Complete',
      message: 'Your video "Summer Campaign" has been uploaded successfully',
      time: '5m ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Campaign Ending Soon',
      message: 'Your "Spring Sale" campaign ends in 2 days',
      time: '1h ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Creator Joined',
      message: 'Sarah Johnson has joined your team',
      time: '3h ago',
      read: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Invoice #1234 has been paid',
      time: '1d ago',
      read: true
    },
    {
      id: 5,
      type: 'error',
      title: 'Upload Failed',
      message: 'Video upload failed due to file size limit',
      time: '2d ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 hover:bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/30 hover:bg-yellow-500/10';
      case 'error':
        return 'border-red-500/30 hover:bg-red-500/10';
      default:
        return 'border-blue-500/30 hover:bg-blue-500/10';
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Notification bell clicked!', showNotifications);
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={handleToggle}
        type="button"
        className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 pointer-events-none" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse shadow-lg shadow-red-500/50 pointer-events-none">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-[9999]"
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-900/50">
                <div>
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="px-3 py-1 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No notifications yet</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`
                          relative p-3 rounded-lg border transition-all duration-300 cursor-pointer
                          ${notification.read 
                            ? 'bg-gray-900/30 border-gray-700 opacity-60' 
                            : `bg-gray-900/50 ${getColorClasses(notification.type)}`
                          }
                        `}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-white text-sm font-medium">
                                {notification.title}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNotification(notification.id);
                                }}
                                className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-700 bg-gray-900/50">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      console.log('View all notifications');
                    }}
                    className="w-full py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
