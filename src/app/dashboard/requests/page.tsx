'use client';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function RequestsPage() {
  const queryClient = useQueryClient();
  const { data: requests, isLoading } = useQuery('requests', dashboardService.getRequests);

  const approveMutation = useMutation(
    (id: string) => dashboardService.approveRequest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requests');
        toast.success('Request approved successfully');
      }
    }
  );

  const rejectMutation = useMutation(
    (id: string) => dashboardService.rejectRequest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requests');
        toast.success('Request rejected');
      }
    }
  );

  if (isLoading) {
    return (
      <div className="p-4 sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

      <div className="space-y-4">
        {requests?.map((request: any, index: number) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">{request.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{request.creator}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{request.date}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    request.status === 'pending' 
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : request.status === 'approved'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => approveMutation.mutate(request.id)}
                    disabled={approveMutation.isLoading}
                    className="flex-1 sm:flex-none px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Approve</span>
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate(request.id)}
                    disabled={rejectMutation.isLoading}
                    className="flex-1 sm:flex-none px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Reject</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
