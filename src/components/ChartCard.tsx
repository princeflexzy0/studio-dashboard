'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export default function ChartCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  children,
}: ChartCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-500/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
          )}
          <div>
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <p className="text-white text-2xl font-bold mt-1">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`text-sm font-semibold ${changeColors[changeType]}`}>
            {change}
          </div>
        )}
      </div>

      {/* Content/Chart Area */}
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
