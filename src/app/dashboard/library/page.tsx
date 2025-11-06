'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Video, Image, File, Download, Trash2, Eye, Upload, X, Calendar, User, FileType } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FileItem {
  id: string;
  title: string;
  uploader: string;
  date: string;
  status: string;
  type: 'video' | 'image' | 'document';
  size: string;
  description: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: 'FILE001', title: 'Product Launch Video.mp4', uploader: 'Yuki Tanaka', date: '2024-11-05', status: 'active', type: 'video', size: '45.2 MB', description: 'High-quality promotional video for new product line' },
    { id: 'FILE002', title: 'Brand Assets Collection.zip', uploader: 'Sofia Rodriguez', date: '2024-11-04', status: 'active', type: 'document', size: '128.5 MB', description: 'Complete brand assets including logos and guidelines' },
    { id: 'FILE003', title: 'Campaign Banner.png', uploader: 'Kwame Mensah', date: '2024-11-03', status: 'active', type: 'image', size: '2.8 MB', description: 'Main banner image for summer campaign' },
    { id: 'FILE004', title: 'Tutorial Series Part 1.mp4', uploader: 'Priya Sharma', date: '2024-11-02', status: 'processing', type: 'video', size: '89.3 MB', description: 'First episode of product tutorial series' },
    { id: 'FILE005', title: 'Social Media Pack.zip', uploader: 'Liam O\'Connor', date: '2024-11-01', status: 'active', type: 'document', size: '15.7 MB', description: 'Social media content pack for Q4' },
    { id: 'FILE006', title: 'Event Photos.jpg', uploader: 'Marcus Washington', date: '2024-10-30', status: 'active', type: 'image', size: '5.1 MB', description: 'Professional photos from corporate event' },
  ]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleView = (file: FileItem) => {
    setSelectedFile(file);
    setShowViewModal(true);
  };

  const handleDownload = (file: FileItem) => {
    toast.success(`Downloading ${file.title}...`);
    // Simulate download
    setTimeout(() => {
      toast.success(`${file.title} downloaded successfully!`);
    }, 1500);
  };

  const handleDeleteClick = (file: FileItem) => {
    setSelectedFile(file);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      setFiles(prev => prev.filter(f => f.id !== selectedFile.id));
      toast.success(`${selectedFile.title} deleted successfully`);
      setShowDeleteModal(false);
      setSelectedFile(null);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadFile) {
      const fileType = uploadFile.type.startsWith('video/') ? 'video' : 
                       uploadFile.type.startsWith('image/') ? 'image' : 'document';
      
      const newFile: FileItem = {
        id: `FILE${String(files.length + 1).padStart(3, '0')}`,
        title: uploadTitle || uploadFile.name,
        uploader: 'Current User',
        date: new Date().toISOString().split('T')[0],
        status: 'processing',
        type: fileType,
        size: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
        description: 'Recently uploaded file'
      };
      
      setFiles(prev => [newFile, ...prev]);
      toast.success(`${uploadTitle || uploadFile.name} uploaded successfully!`);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadFile(null);
    }
  };

  const getFileIcon = (type: string) => {
    if (type === 'video') return Video;
    if (type === 'image') return Image;
    return File;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <FolderOpen className="w-8 h-8 text-cyan-400" />
              Content Library
            </h1>
            <p className="text-gray-400">Browse and manage your uploaded content</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload New File
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all overflow-hidden group"
            >
              <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                <FileIcon className="w-16 h-16 text-cyan-400" />
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 truncate">{file.title}</h3>
                <p className="text-sm text-gray-400 mb-3">Uploaded by {file.uploader}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{file.date}</span>
                  <span className={`px-2 py-1 rounded ${
                    file.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {file.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleView(file)}
                    className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => handleDownload(file)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(file)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* VIEW FILE MODAL */}
      <AnimatePresence>
        {showViewModal && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">File Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="aspect-video bg-gray-800/50 rounded-xl flex items-center justify-center mb-6">
                  {(() => {
                    const FileIcon = getFileIcon(selectedFile.type);
                    return <FileIcon className="w-24 h-24 text-cyan-400" />;
                  })()}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">File Name</label>
                  <p className="text-white font-semibold text-xl mt-1">{selectedFile.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Uploader
                    </label>
                    <p className="text-white font-semibold mt-1">{selectedFile.uploader}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <FileType className="w-4 h-4" />
                      Type
                    </label>
                    <p className="text-white font-semibold mt-1 capitalize">{selectedFile.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Upload Date
                    </label>
                    <p className="text-white font-semibold mt-1">{selectedFile.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">File Size</label>
                    <p className="text-white font-semibold mt-1">{selectedFile.size}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedFile.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {selectedFile.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <p className="text-white mt-2 leading-relaxed">{selectedFile.description}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="flex-1 px-6 py-3 bg-cyan-500/20 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleDeleteClick(selectedFile);
                    }}
                    className="flex-1 px-6 py-3 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
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

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteModal && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Delete File?</h2>
                <p className="text-gray-400">
                  Are you sure you want to delete "{selectedFile.title}"? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPLOAD FILE MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Upload New File</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    File Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="My awesome file"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: Video, Image, Documents
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
