'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Download, Eye, Trash2, Edit, X, FileVideo } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface File {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: string;
  uploader: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetch('/api/admin/library')
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        setLoading(false);
      });
  }, []);

  const handleView = (file: File) => {
    setViewingFile(file);
    toast.success('Opening file preview...');
  };

  const handleDownload = (file: File) => {
    toast.success(`Downloading ${file.name}...`);
    setTimeout(() => {
      toast.success('Download complete!');
    }, 1500);
  };

  const handleEdit = (file: File) => {
    setEditingFile(file);
    setEditTitle(file.name);
  };

  const saveEdit = () => {
    if (!editingFile) return;
    
    setFiles(prev => prev.map(f => 
      f.id === editingFile.id 
        ? { ...f, name: editTitle }
        : f
    ));
    
    toast.success('File updated successfully!');
    setEditingFile(null);
    setEditTitle('');
  };

  const handleDelete = (file: File) => {
    if (confirm(`Are you sure you want to delete "${file.name}"?`)) {
      setFiles(prev => prev.filter(f => f.id !== file.id));
      toast.success('File deleted successfully!');
    }
  };

  const columns: Column[] = [
    {
      key: 'name',
      label: 'File Name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <FileVideo className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-white font-medium">{value}</p>
            <p className="text-gray-400 text-xs">{row.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'size',
      label: 'Size',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      ),
    },
    {
      key: 'uploader',
      label: 'Uploaded By',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      ),
    },
    {
      key: 'uploadDate',
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
            onClick={() => handleView(row)}
            className="group relative p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDownload(row)}
            className="group relative p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleEdit(row)}
            className="group relative p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row)}
            className="group relative p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Library" 
        subtitle="Manage your content library"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <Table
          columns={columns}
          data={filteredFiles}
          isLoading={loading}
          emptyMessage="No files found"
        />
      </div>

      {/* View Modal */}
      {viewingFile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{viewingFile.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span>By {viewingFile.uploader}</span>
                  <span>•</span>
                  <span>{viewingFile.size}</span>
                  <span>•</span>
                  <span>{new Date(viewingFile.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => setViewingFile(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-900/50 rounded-lg p-12 text-center border border-gray-700">
                <FileVideo className="w-24 h-24 mx-auto mb-4 text-cyan-400" />
                <p className="text-white font-medium mb-2">{viewingFile.name}</p>
                <p className="text-gray-500 text-sm">(File preview would load here)</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-between">
              <button
                onClick={() => handleDownload(viewingFile)}
                className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => setViewingFile(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingFile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full animate-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Edit File</h3>
              <button
                onClick={() => setEditingFile(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                File Name
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setEditingFile(null)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
