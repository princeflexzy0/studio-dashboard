'use client';
import { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, Clock, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  read: boolean;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Upload Complete',
      message: 'Your video "Product Demo" has finished processing',
      time: '5 min ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Request Approved',
      message: 'John Doe\'s upload request has been approved',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Low Credits',
      message: 'You have only 213 credits remaining',
      time: '2 hours ago',
      type: 'warning',
      read: false
    },
    {
      id: 4,
      title: 'New Campaign',
      message: 'Winter Sale campaign is now active',
      time: '3 hours ago',
      type: 'info',
      read: true
    }
  ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for notification sound
    audioRef.current = new Audio('data:audio/wav;base64,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');
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      playSound();
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default: return <Upload className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/50';
      default: return 'bg-cyan-500/20 border-cyan-500/50';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-96 max-w-[calc(100vw-2rem)] bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="text-white font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700/30 transition-colors ${
                        !notif.read ? 'bg-cyan-500/5' : ''
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${getColor(notif.type)}`}>
                          {getIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-white font-medium text-sm">{notif.title}</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notif.id);
                              }}
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-500 text-xs">{notif.time}</span>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-cyan-500 rounded-full ml-auto"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
