'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, X, Eye, Download, Trash2, FileVideo } from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadedVideo {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export default function UploadsPage() {
  const [uploads, setUploads] = useState<UploadedVideo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<UploadedVideo | null>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file', { style: { background: '#1F2937', color: '#fff' } });
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      toast.error('File size must be less than 500MB', { style: { background: '#1F2937', color: '#fff' } });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newUpload: UploadedVideo = {
        id: Date.now().toString(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadDate: new Date().toLocaleDateString(),
        thumbnail: reader.result as string,
        duration: '0:00',
        url: reader.result as string,
      };

      setUploads(prev => [newUpload, ...prev]);
      toast.success('Video uploaded successfully!', { style: { background: '#1F2937', color: '#fff' }, icon: '🎥' });
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDelete = (id: string) => {
    setUploads(uploads.filter(upload => upload.id !== id));
    toast.success('Video deleted', { style: { background: '#1F2937', color: '#fff' }, icon: '🗑️' });
  };

  const handleView = (video: UploadedVideo) => {
    setSelectedVideo(video);
  };

  const handleDownload = (video: UploadedVideo) => {
    const link = document.createElement('a');
    link.href = video.url;
    link.download = video.name;
    link.click();
    toast.success('Download started', { style: { background: '#1F2937', color: '#fff' }, icon: '⬇️' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Uploads
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Upload and manage your video content</p>
      </div>

      {/* Upload Area */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: 1.01 }}
        className={`mb-8 p-8 sm:p-12 border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
        }`}
      >
        <div className="text-center">
          <UploadIcon className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white mb-2">Upload Video</h3>
          <p className="text-gray-400 mb-4">Drag and drop your video here, or click to browse</p>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="video-upload"
          />
          <motion.label
            htmlFor="video-upload"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-lg cursor-pointer hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
          >
            Browse Files
          </motion.label>
          <p className="text-xs text-gray-500 mt-3">Supported formats: MP4, AVI, MOV • Max size: 500MB</p>
        </div>
      </motion.div>

      {/* Uploaded Videos */}
      {uploads.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <FileVideo className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No videos uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploads.map((upload, index) => (
            <motion.div
              key={upload.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
            >
              <div className="relative aspect-video bg-gray-900">
                <video
                  src={upload.url}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">{upload.duration}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">{upload.name}</h3>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{upload.size}</span>
                  <span>{upload.uploadDate}</span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleView(upload)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(upload)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(upload.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-white font-semibold truncate flex-1">{selectedVideo.name}</h3>
                <motion.button
                  onClick={() => setSelectedVideo(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all ml-4"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="aspect-video bg-black">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-gray-800/50">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Size: {selectedVideo.size}</span>
                  <span>Uploaded: {selectedVideo.uploadDate}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
