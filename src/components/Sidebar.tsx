'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Megaphone, 
  Settings, 
  Server,
  X,
  FolderOpen,
  UserCog,
  FileText,
  CreditCard,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ]
  },
  {
    title: 'Content Management',
    items: [
      { icon: Users, label: 'Creators', path: '/dashboard/creators' },
      { icon: Upload, label: 'Uploads', path: '/dashboard/uploads' },
      { icon: FolderOpen, label: 'Library', path: '/dashboard/library' },
      { icon: FileText, label: 'Requests', path: '/dashboard/requests' },
    ]
  },
  {
    title: 'Business',
    items: [
      { icon: Megaphone, label: 'Campaigns', path: '/dashboard/campaigns' },
      { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
    ]
  },
  {
    title: 'Administration',
    items: [
      { icon: UserCog, label: 'Team Users', path: '/dashboard/users' },
      { icon: Server, label: 'System', path: '/dashboard/system' },
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ]
  }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          left-0 top-0 
          h-full w-64 
          bg-gray-900 border-r border-gray-800 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          z-50 lg:z-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Studio</h1>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer - Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-gray-400 hover:text-red-400 hover:bg-red-500/10
              transition-all duration-200 border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
          
          <div className="mt-4 px-3">
            <p className="text-gray-500 text-xs">v1.0.0 • © 2024</p>
          </div>
        </div>
      </aside>
    </>
  );
}
