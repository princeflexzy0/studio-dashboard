'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash2, Eye, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm'];

export default function UploadsPage() {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const { data: uploads, isLoading } = useQuery('uploads', dashboardService.getUploads);

  const uploadMutation = useMutation(
    (file: File) => dashboardService.uploadFile(file, setUploadProgress),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('uploads');
        toast.success('File uploaded successfully!');
        setUploadProgress(0);
      },
      onError: () => {
        toast.error('Upload failed. Please try again.');
        setUploadProgress(0);
      },
    }
  );

  const deleteMutation = useMutation(
    (id: string) => dashboardService.deleteFile(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('uploads');
        toast.success('File deleted');
        setDeleteModalId(null);
      },
      onError: () => {
        toast.error('Failed to delete file');
      },
    }
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      
      if (!file) return;

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('Only MP4 and WebM files are allowed');
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size must be less than 200MB');
        return;
      }

      uploadMutation.mutate(file);
    },
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
    },
    maxFiles: 1,
    disabled: uploadMutation.isLoading,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Upload Center</h1>
        <p className="text-gray-400">Upload and manage your video content</p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragActive
            ? 'border-[#00D9FF] bg-[#00D9FF]/5'
            : 'border-[#1a1a1a] hover:border-[#00D9FF]/50 bg-[#0A0A0A]'
        } ${uploadMutation.isLoading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        
        <Upload className="w-12 h-12 text-[#00D9FF] mx-auto mb-4" />
        
        {uploadMutation.isLoading ? (
          <div className="space-y-4">
            <p className="text-white font-medium">Uploading...</p>
            <div className="w-full max-w-md mx-auto h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00D9FF] to-[#7B2BFF]"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(uploadProgress)}%</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop your file here' : 'Drag & drop your video'}
            </h3>
            <p className="text-gray-400 mb-4">or click to browse</p>
            <p className="text-sm text-gray-500">
              MP4 or WebM • Max 200MB
            </p>
          </>
        )}
      </div>

      {/* Upload Library */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Library</h2>
          <span className="text-gray-400">{uploads?.length || 0} files</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-[#1a1a1a] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : uploads?.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No files uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploads?.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#00D9FF] transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-[#1a1a1a] relative group">
                  {file.thumbnail ? (
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-2 bg-[#00D9FF] rounded-lg hover:bg-[#00b8d4] transition-colors">
                      <Eye className="w-5 h-5 text-black" />
                    </button>
                    <button
                      onClick={() => setDeleteModalId(file.id)}
                      className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium truncate mb-2">
                    {file.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteModalId(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-2">Delete File?</h3>
              <p className="text-gray-400 mb-6">
                This action cannot be undone. The file will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModalId(null)}
                  className="flex-1 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deleteModalId)}
                  disabled={deleteMutation.isLoading}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}