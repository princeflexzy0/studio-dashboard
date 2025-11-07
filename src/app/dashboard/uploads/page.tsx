'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Download, Eye, Upload, X, FileVideo, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Upload {
  id: number;
  title: string;
  creator: string;
  status: string;
  date: string;
  size: string;
  type: string;
}

export default function UploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);
  const [viewingUpload, setViewingUpload] = useState<Upload | null>(null);

  useEffect(() => {
    fetch('/api/admin/uploads')
      .then(res => res.json())
      .then(data => {
        setUploads(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching uploads:', error);
        setLoading(false);
      });
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (previewFile) {
        URL.revokeObjectURL(previewFile.url);
      }
    };
  }, [previewFile]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} file(s) selected`);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} file(s) added`);
    }
  };

  // Remove selected file
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    toast.success('File removed');
  };

  // Preview selected file before upload
  const handlePreviewSelected = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewFile({ file, url });
  };

  // View uploaded file from table
  const handleViewUpload = (upload: Upload) => {
    setViewingUpload(upload);
  };

  // Close preview modal
  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
      setPreviewFile(null);
    }
    setViewingUpload(null);
  };

  // Mock upload function
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);
    
    // Simulate upload with progress
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock: Add uploaded files to the list
    const newUploads = selectedFiles.map((file, index) => ({
      id: uploads.length + index + 1,
      title: file.name.replace(/\.[^/.]+$/, ''),
      creator: 'Admin User',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type || 'video/mp4'
    }));

    setUploads(prev => [...newUploads, ...prev]);
    setSelectedFiles([]);
    setUploading(false);
    toast.success(`${newUploads.length} file(s) uploaded successfully!`);
  };

  const columns: Column[] = [
    {
      key: 'title',
      label: 'Title',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
            <FileVideo className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'creator',
      label: 'Creator',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      ),
    },
    {
      key: 'size',
      label: 'Size',
      render: (value) => (
        <span className="text-cyan-400 font-medium">{value}</span>
      ),
    },
    {
      key: 'date',
      label: 'Upload Date',
      render: (value) => (
        <span className="text-gray-300">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleViewUpload(row)}
            className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-700 rounded-lg transition-colors"
            title="View file"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => toast.success('Downloading...')}
            className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-lg transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filteredUploads = uploads.filter(upload =>
    upload.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    upload.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Uploads" 
        subtitle="Upload and manage your content"
      />
      
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Upload Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            Upload New Content
          </h2>

          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging 
                ? 'border-cyan-500 bg-cyan-500/10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-cyan-400" />
              </div>
              
              <div>
                <p className="text-white font-medium mb-1">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-gray-400 text-sm">
                  Supports: MP4, MOV, AVI, JPG, PNG (Max 500MB)
                </p>
              </div>

              <input
                type="file"
                multiple
                accept="video/*,image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg cursor-pointer transition-all"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Selected Files List */}
          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Selected Files ({selectedFiles.length})
              </h3>
              
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">{file.name}</p>
                      <p className="text-gray-400 text-xs">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreviewSelected(file)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload {selectedFiles.length} File(s)
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search uploads by title or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Uploads</p>
            <p className="text-white text-3xl font-bold">{uploads.length}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Approved</p>
            <p className="text-green-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'approved').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Pending Review</p>
            <p className="text-yellow-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Rejected</p>
            <p className="text-red-400 text-3xl font-bold">
              {uploads.filter(u => u.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Uploads Table */}
        <Table
          columns={columns}
          data={filteredUploads}
          isLoading={loading}
          emptyMessage="No uploads found"
        />
      </div>

      {/* Preview Modal - For Selected Files Before Upload */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{previewFile.file.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {(previewFile.file.size / (1024 * 1024)).toFixed(2)} MB • {previewFile.file.type}
                </p>
              </div>
              <button
                onClick={closePreview}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              {previewFile.file.type.startsWith('video/') ? (
                <video
                  src={previewFile.url}
                  controls
                  className="w-full rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              ) : previewFile.file.type.startsWith('image/') ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.file.name}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <FileVideo className="w-16 h-16 mx-auto mb-4" />
                  <p>Preview not available for this file type</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button
                onClick={closePreview}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal - For Uploaded Files in Table */}
      {viewingUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{viewingUpload.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span>By {viewingUpload.creator}</span>
                  <span>•</span>
                  <span>{viewingUpload.size}</span>
                  <span>•</span>
                  <span>{new Date(viewingUpload.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <StatusBadge status={viewingUpload.status} />
                </div>
              </div>
              <button
                onClick={closePreview}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <div className="bg-gray-900/50 rounded-lg p-12 text-center border border-gray-700">
                <FileVideo className="w-24 h-24 mx-auto mb-4 text-purple-400" />
                <p className="text-gray-400 mb-2">Video Preview</p>
                <p className="text-white font-medium">{viewingUpload.title}</p>
                <p className="text-gray-500 text-sm mt-4">
                  (Mock preview - actual video would load here in production)
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-700 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => toast.success('Downloading...')}
                  className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <button
                onClick={closePreview}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
