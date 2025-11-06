'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Request {
  id: number;
  name: string;
  email: string;
  type: string;
  message: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockRequests: Request[] = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', type: 'Collaboration', message: 'Would like to collaborate on music video', date: '2025-11-05', status: 'pending' },
  { id: 2, name: 'Bob Martin', email: 'bob@example.com', type: 'Content Request', message: 'Requesting access to video library', date: '2025-11-04', status: 'pending' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', type: 'Partnership', message: 'Business partnership proposal', date: '2025-11-03', status: 'approved' },
  { id: 4, name: 'David Lee', email: 'david@example.com', type: 'Feature Request', message: 'Suggestion for new feature', date: '2025-11-02', status: 'rejected' },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    setRequests(mockRequests);
  }, []);

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Request approved!', { style: { background: '#1F2937', color: '#fff' }, icon: '✅' });
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
    toast.success('Request rejected', { style: { background: '#1F2937', color: '#fff' }, icon: '❌' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full text-xs font-medium uppercase flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full text-xs font-medium uppercase flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-full text-xs font-medium uppercase flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Requests
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage collaboration and content requests</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-semibold text-lg">{request.name}</h3>
                  {getStatusBadge(request.status)}
                </div>
                <p className="text-sm text-gray-400 mb-1">{request.email}</p>
                <p className="text-gray-300 mb-2">{request.message}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">{request.type}</span>
                  <span>{new Date(request.date).toLocaleDateString()}</span>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApprove(request.id)}
                    className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReject(request.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
