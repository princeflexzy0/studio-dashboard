'use client';

import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { FolderOpen, Video, Image, File, Download, Trash2, Eye } from 'lucide-react';

export default function LibraryPage() {
  const { data: uploads, isLoading } = useQuery('uploads', dashboardService.getUploads);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getFileIcon = (status: string) => {
    if (status === 'video') return Video;
    if (status === 'image') return Image;
    return File;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <FolderOpen className="w-8 h-8 text-cyan-400" />
          Content Library
        </h1>
        <p className="text-gray-400">Browse and manage your uploaded content</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads?.map((upload: any, index: number) => {
          const FileIcon = getFileIcon(upload.status);
          return (
            <motion.div
              key={upload.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all overflow-hidden group"
            >
              <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                <FileIcon className="w-16 h-16 text-cyan-400" />
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 truncate">{upload.title}</h3>
                <p className="text-sm text-gray-400 mb-3">Uploaded by {upload.uploader}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{upload.date}</span>
                  <span className={`px-2 py-1 rounded ${
                    upload.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {upload.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
