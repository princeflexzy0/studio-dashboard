'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  loading?: boolean;
}

export function StatCard({ title, value, icon: Icon, loading }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <span className="text-gray-400 text-xs sm:text-sm font-medium">{title}</span>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {loading ? '...' : value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
