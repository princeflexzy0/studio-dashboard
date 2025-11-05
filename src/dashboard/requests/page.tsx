'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { TableSkeleton } from '@/components/dashboard/LoadingStates';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Check, X, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const statusConfig = {
  pending: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock },
  approved: { color: 'text-green-500', bg: 'bg-green-500/10', icon: Check },
  rejected: { color: 'text-red-500', bg: 'bg-red-500/10', icon: X },
};

export default function RequestsPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const { data: requests, isLoading, error } = useQuery(
    'requests',
    dashboardService.getRequests
  );

  const updateMutation = useMutation(
    ({ id, action }: { id: string; action: 'approve' | 'reject' }) =>
      dashboardService.updateRequestStatus(id, action),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requests');
        toast.success('Request updated successfully');
      },
      onError: () => {
        toast.error('Failed to update request');
      },
    }
  );

  const filteredRequests = requests?.filter((req) =>
    filter === 'all' ? true : req.status === filter
  );

  if (error) {
    return <ErrorState message="Failed to load requests" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Content Requests</h1>
          <p className="text-gray-400">Manage and review submission requests</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-[#0A0A0A] border border-[#1a1a1a] rounded-lg p-1">
          {['all', 'pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                filter === tab
                  ? 'bg-[#00D9FF] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : filteredRequests?.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400">No requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {filteredRequests?.map((request, index) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  
                  return (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-[#1a1a1a] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{request.name}</p>
                          <p className="text-sm text-gray-400">by {request.submittedBy}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 capitalize">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[request.status].bg} ${statusConfig[request.status].color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateMutation.mutate({ id: request.id, action: 'approve' })}
                              disabled={updateMutation.isLoading}
                              className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateMutation.mutate({ id: request.id, action: 'reject' })}
                              disabled={updateMutation.isLoading}
                              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}