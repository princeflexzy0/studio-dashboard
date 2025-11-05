'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  loading?: boolean;
}

export const StatCard = ({ title, value, icon: Icon, trend, loading }: StatCardProps) => {
  if (loading) {
    return (
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-[#1a1a1a] rounded w-1/2 mb-4" />
        <div className="h-8 bg-[#1a1a1a] rounded w-3/4" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#00D9FF] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <Icon className="w-5 h-5 text-[#00D9FF]" />
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        
        {trend && (
          <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </motion.div>
  );
};
