'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Video, 
  Image, 
  File, 
  Download, 
  Trash2, 
  Eye, 
  Upload, 
  X, 
  Calendar, 
  User, 
  FileType 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';

interface LibraryFile {
  id: string;
  title: string;
  uploader: string;
  date: string;
  status: string;
  type: string;
  size: string;
  description: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<LibraryFile | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/admin/library');
      const data = await response.json();
      setFiles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching library files:', error);
      toast.error('Failed to load library files');
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    toast.success('File deleted successfully');
    setSelectedFile(null);
  };

  const handleDownload = (file: LibraryFile) => {
    toast.success(`Downloading ${file.title}...`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-12 h-12 text-purple-400" />;
      case 'image':
        return <Image className="w-12 h-12 text-blue-400" />;
      case 'document':
        return <File className="w-12 h-12 text-green-400" />;
      default:
        return <FileType className="w-12 h-12 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="Library" subtitle="Manage your media files" />
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header title="Library" subtitle="Manage your media files and documents" />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center"
          >
            <Upload className="w-5 h-5" />
            Upload File
          </button>
        </div>

        {/* File Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              <div className="flex items-center justify-center mb-4">
                {getFileIcon(file.type)}
              </div>
              
              <h3 className="text-white font-semibold mb-2 truncate" title={file.title}>
                {file.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  {file.uploader}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(file.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-400">
                  {file.size}
                </div>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(file.status)}`}>
                {file.status}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No files found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* File Details Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">File Details</h2>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center py-8 bg-gray-900/50 rounded-xl">
                  {getFileIcon(selectedFile.type)}
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Title</label>
                  <p className="text-white font-medium">{selectedFile.title}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm">Description</label>
                  <p className="text-white">{selectedFile.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Uploader</label>
                    <p className="text-white">{selectedFile.uploader}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Upload Date</label>
                    <p className="text-white">{new Date(selectedFile.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">File Size</label>
                    <p className="text-white">{selectedFile.size}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedFile.status)}`}>
                      {selectedFile.status}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFile.id)}
                    className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-red-500/30"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upload File</h2>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">Video, Image, or Document files</p>
              </div>

              <button
                onClick={() => {
                  toast.success('Upload feature coming soon!');
                  setIsUploadModalOpen(false);
                }}
                className="w-full mt-6 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
              >
                Upload
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
