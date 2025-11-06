'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Upload, Settings, LogOut, Users, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Creators', href: '/dashboard/creators', icon: Users },
  { name: 'Requests', href: '/dashboard/requests', icon: FileText },
  { name: 'Uploads', href: '/dashboard/uploads', icon: Upload },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: TrendingUp },
  { name: 'System Health', href: '/dashboard/system', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00D9FF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#7B2BFF] bg-clip-text text-transparent mb-8">
          Studio Admin
        </h1>
        
        <div className="mb-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30 mb-3"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-3">
              <span className="text-white font-bold text-lg">{user?.name?.charAt(0) || 'A'}</span>
            </div>
          )}
          <p className="text-white font-medium">{user?.name || 'Admin User'}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
        </div>

        <nav className="space-y-1 flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={() => { 
            logout(); 
            router.push('/login'); 
          }} 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
