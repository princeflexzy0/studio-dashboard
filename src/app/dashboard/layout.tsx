'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Upload,
  Megaphone,
  Monitor,
  Settings,
  Menu,
  X,
  Film,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Creators', href: '/dashboard/creators', icon: Users },
  { name: 'Uploads', href: '/dashboard/uploads', icon: Upload },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
  { name: 'System', href: '/dashboard/system', icon: Monitor },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-hidden
        `}
      >
        {/* Header Section */}
        <div className="flex-shrink-0 border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white leading-none">Studio</h1>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Section - Scrollable if needed */}
        <nav className="flex-1 overflow-y-auto px-2 sm:px-3 py-4 sm:py-6">
          <div className="space-y-0.5 sm:space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg
                    text-xs sm:text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/5'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg w-full
                text-xs sm:text-sm font-medium text-gray-400 hover:text-red-400 
                hover:bg-red-500/5 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer Section - Pinned to Bottom */}
        <div className="flex-shrink-0 border-t border-gray-800 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-gray-500 font-medium">v1.0.0</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500">© 2024</span>
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-600 font-medium">Online</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors p-1 -ml-1"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white">Studio Dashboard</span>
            </div>
            <div className="w-6 sm:w-7" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
