'use client';

import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New upload request from Sarah Johnson', time: '5 minutes ago', read: false },
    { id: 2, message: 'Campaign "Summer Sale" completed successfully', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled for tonight', time: '2 hours ago', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleBellClick}
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {unreadCount}
            </motion.span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-[998]" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Notification Panel - Slide from RIGHT */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-l border-gray-700 z-[999] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/95">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-cyan-500/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white mb-1 break-words leading-relaxed">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No notifications</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
