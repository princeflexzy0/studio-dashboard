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

  const playSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVqzn77BhGgU7k9n0yX8pBSh+zPLaizsIGGS56+mgUBELTKXh8bllHAU2jdXzzn0oBSp6y/HZiToIGWi76+mjURALSqPg8bplHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8bllHAU2jdXzzn0oBSh6y/HZiToIGWi76+mjURALSqPg8bllHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8bllHAU2jdXzzn0oBSh6y/HZiToIGWi76+mjURALSqPg8bllHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8bllHAU2jdXzzn0oBSh6y/HZiToIGWi76+mjURALSqPg8bllHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8bllHAU2jdXzzn0oBSh6y/HZiToIGWi76+mjURALSqPg8bllHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8bllHAU2jdXzzn0oBSh6y/HZiToIGWi76+mjURALSqPg8bllHAU3jNTzzn0pBSl6y/HaizsIGGS56+mjUhALSqPg8Q==');
      audio.volume = 0.5;
      audio.play().catch(() => console.log('Audio blocked by browser'));
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleBellClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      playSound();
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
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

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-cyan-500/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-white mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
