'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Upload, Users, Settings, Menu, X, CreditCard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserProvider, useUser } from '@/contexts/UserContext';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Uploads', path: '/dashboard/uploads', icon: Upload },
  { name: 'Users', path: '/dashboard/users', icon: Users },
  { name: 'Billing', path: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">📸 Studio</h1>
          <div className="flex items-center gap-2">
            <img src={profile.avatar} alt={profile.name} className="w-8 h-8 rounded-full ring-2 ring-cyan-500" />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween' }} className="fixed top-0 left-0 bottom-0 w-64 bg-gray-900 z-50 lg:hidden border-r border-gray-700 overflow-y-auto">
              <div className="p-4 border-b border-gray-700">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">📸 Studio</h1>
              </div>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link key={item.path} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">📸 Studio Dashboard</h1>
          <div className="flex items-center gap-3 mt-4 p-3 bg-gray-800/50 rounded-lg">
            <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full ring-2 ring-cyan-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile.name}</p>
              <p className="text-xs text-gray-400 truncate">{profile.email}</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-4">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      <div className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
<UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
