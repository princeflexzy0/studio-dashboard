'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, User, Eye, X, Calendar, Video } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Request {
  id: string;
  title: string;
  creator: string;
  type: string;
  status: string;
  submittedDate: string;
  description: string;
  videoUrl?: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([
    { id: 'REQ001', title: 'Product Launch Video', creator: 'Yuki Tanaka', type: 'Video', status: 'pending', submittedDate: '2024-11-05', description: 'High-quality promotional video for new product line featuring modern aesthetics and dynamic transitions.' },
    { id: 'REQ002', title: 'Brand Story Campaign', creator: 'Sofia Rodriguez', type: 'Campaign', status: 'pending', submittedDate: '2024-11-04', description: 'Multi-platform brand narrative campaign showcasing company values and mission.' },
    { id: 'REQ003', title: 'Social Media Content Pack', creator: 'Kwame Mensah', type: 'Content', status: 'pending', submittedDate: '2024-11-03', description: 'Collection of 20 social media posts optimized for Instagram, TikTok, and Twitter.' },
    { id: 'REQ004', title: 'Tutorial Series', creator: 'Priya Sharma', type: 'Video', status: 'approved', submittedDate: '2024-11-02', description: 'Educational video series covering product features and best practices.' },
    { id: 'REQ005', title: 'Event Coverage', creator: 'Marcus Washington', type: 'Video', status: 'rejected', submittedDate: '2024-11-01', description: 'Professional coverage of corporate event with interviews and highlights.' },
  ]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleApproveClick = (request: Request) => {
    setSelectedRequest(request);
    setShowDetailsModal(false);
    setShowApproveModal(true);
  };

  const handleRejectClick = (request: Request) => {
    setSelectedRequest(request);
    setRejectReason('');
    setShowDetailsModal(false);
    setShowRejectModal(true);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      setRequests(prev => prev.map(r => 
        r.id === selectedRequest.id ? { ...r, status: 'approved' } : r
      ));
      toast.success(`Request "${selectedRequest.title}" approved!`);
      setShowApproveModal(false);
      setSelectedRequest(null);
    }
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRequest) {
      setRequests(prev => prev.map(r => 
        r.id === selectedRequest.id ? { ...r, status: 'rejected' } : r
      ));
      toast.error(`Request "${selectedRequest.title}" rejected`);
      setShowRejectModal(false);
      setSelectedRequest(null);
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <FileText className="w-8 h-8 text-cyan-400" />
          Content Requests
        </h1>
        <p className="text-gray-400">Review and manage content approval requests</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6">
          <Clock className="w-8 h-8 text-yellow-400 mb-3" />
          <p className="text-gray-400 text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-6">
          <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
          <p className="text-gray-400 text-sm mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-400">{approvedCount}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6">
          <XCircle className="w-8 h-8 text-red-400 mb-3" />
          <p className="text-gray-400 text-sm mb-1">Rejected</p>
          <p className="text-3xl font-bold text-red-400">{requests.length - pendingCount - approvedCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{request.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{request.creator}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>{request.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{request.submittedDate}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{request.description}</p>
              </div>
              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => handleViewDetails(request)}
                  className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  title="View details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                {request.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApproveClick(request)}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRejectClick(request)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Reject"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      <AnimatePresence>
        {showDetailsModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Request Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-400">Request ID</label>
                  <p className="text-white font-semibold">{selectedRequest.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">Title</label>
                  <p className="text-white font-semibold text-xl">{selectedRequest.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Creator</label>
                    <p className="text-white font-semibold">{selectedRequest.creator}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Type</label>
                    <p className="text-white font-semibold">{selectedRequest.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Status</label>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedRequest.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      selectedRequest.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedRequest.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Submitted</label>
                    <p className="text-white font-semibold">{selectedRequest.submittedDate}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <p className="text-white mt-2 leading-relaxed">{selectedRequest.description}</p>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleRejectClick(selectedRequest)}
                      className="flex-1 px-6 py-3 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveClick(selectedRequest)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* APPROVE MODAL */}
      <AnimatePresence>
        {showApproveModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowApproveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Approve Request?</h2>
                <p className="text-gray-400">
                  Are you sure you want to approve "{selectedRequest.title}" by {selectedRequest.creator}?
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REJECT MODAL */}
      <AnimatePresence>
        {showRejectModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRejectModal(false)}
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
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Reject Request?</h2>
                <p className="text-gray-400 mb-4">
                  Please provide a reason for rejecting "{selectedRequest.title}"
                </p>
              </div>

              <form onSubmit={handleReject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rejection Reason
                  </label>
                  <textarea
                    required
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
                    placeholder="Explain why this request is being rejected..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Reject
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
