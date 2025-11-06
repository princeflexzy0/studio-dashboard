export const dynamic = 'force-dynamic';
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion } from 'framer-motion';
import { Search, Check, X, Clock, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function RequestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery('requests', dashboardService.getRequests);

  const approveMutation = useMutation(
    (id: number) => dashboardService.approveRequest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requests');
        toast.success('Request approved successfully!');
      },
      onError: () => {
        toast.error('Failed to approve request');
      }
    }
  );

  const rejectMutation = useMutation(
    (id: number) => dashboardService.rejectRequest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requests');
        toast.success('Request rejected');
      },
      onError: () => {
        toast.error('Failed to reject request');
      }
    }
  );

  const filteredRequests = requests?.filter((request: any) => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-500/30"><Clock className="w-3 h-3" />Pending</span>;
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30"><CheckCircle className="w-3 h-3" />Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium border border-red-500/30"><XCircle className="w-3 h-3" />Rejected</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-700 rounded w-1/3"></div><div className="h-64 bg-gray-700 rounded"></div></div></div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">📋 Content Requests</h1>
        <p className="text-sm sm:text-base text-gray-400">Review and manage content submission requests</p>
      </motion.div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search requests..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStatusFilter('all')} className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>All ({requests?.length || 0})</button>
            <button onClick={() => setStatusFilter('pending')} className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Pending ({requests?.filter((r: any) => r.status === 'pending').length || 0})</button>
            <button onClick={() => setStatusFilter('approved')} className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Approved</button>
            <button onClick={() => setStatusFilter('rejected')} className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Rejected</button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRequests.map((request: any, index: number) => (
                <motion.tr key={request.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.name)}&background=0ea5e9&color=fff`} alt={request.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white">{request.name}</p>
                        <p className="text-xs text-gray-400">{request.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">{request.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {request.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors group">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button onClick={() => approveMutation.mutate(request.id)} disabled={approveMutation.isLoading} className="p-2 hover:bg-green-500/10 rounded-lg transition-colors group">
                            <Check className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                          </button>
                          <button onClick={() => rejectMutation.mutate(request.id)} disabled={rejectMutation.isLoading} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group">
                            <X className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No requests found</p>
        </div>
      )}
    </div>
  );
}
