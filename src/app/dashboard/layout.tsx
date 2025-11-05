'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Upload, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Requests', href: '/dashboard/requests', icon: FileText },
  { name: 'Uploads', href: '/dashboard/uploads', icon: Upload },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00D9FF]" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-[#0A0A0A] border-r border-[#1a1a1a] p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#7B2BFF] bg-clip-text text-transparent mb-8">Studio</h1>
        
        <div className="mb-8 p-4 bg-[#1a1a1a] rounded-lg">
          <p className="text-white font-medium">{user.name}</p>
          <p className="text-xs text-gray-400 capitalize">{user.role}</p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <button onClick={() => { logout(); router.push('/'); }} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-red-500/10 transition-all mt-8">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
