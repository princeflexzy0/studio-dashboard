'use client';

import { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock, User, Calendar, Eye, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';

interface Request {
  id: string;
  title: string;
  creator: string;
  type: string;
  status: string;
  submittedDate: string;
  description: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/requests');
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
      setLoading(false);
    }
  };

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    toast.success('Request approved successfully');
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    toast.error('Request rejected');
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      approved: 'bg-green-500/10 text-green-400 border-green-500/30',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
    }[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/30';

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles} capitalize`}>
        {status}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="Content Requests" subtitle="Review and approve submissions" />
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
      <Header title="Content Requests" subtitle="Review and manage content submissions" />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">
                {requests.filter(r => r.status === 'pending').length}
              </h3>
            </div>
            <p className="text-yellow-400 font-medium">Pending</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">
                {requests.filter(r => r.status === 'approved').length}
              </h3>
            </div>
            <p className="text-green-400 font-medium">Approved</p>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">
                {requests.filter(r => r.status === 'rejected').length}
              </h3>
            </div>
            <p className="text-red-400 font-medium">Rejected</p>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {getStatusIcon(request.status)}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">{request.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{request.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {request.creator}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.submittedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {request.type}
                    </span>
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-medium rounded-lg transition-colors border border-green-500/30"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-colors border border-red-500/30"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No requests found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 border border-gray-700 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Title</label>
                  <p className="text-white font-medium text-lg">{selectedRequest.title}</p>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">Description</label>
                  <p className="text-white leading-relaxed">{selectedRequest.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Creator</label>
                    <p className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedRequest.creator}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Type</label>
                    <p className="text-white flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {selectedRequest.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Submitted Date</label>
                    <p className="text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Status</label>
                    <div>{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Request
                    </button>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      className="flex-1 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors border border-red-500/30 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Request
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
