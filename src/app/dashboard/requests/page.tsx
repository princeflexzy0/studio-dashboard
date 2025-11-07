'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table, { Column, StatusBadge } from '@/components/Table';
import { Search, Filter, Check, X as XIcon, Eye, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Request {
  id: number;
  title: string;
  creator: string;
  status: string;
  submittedDate: string;
  type: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingRequest, setViewingRequest] = useState<Request | null>(null);

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
        setLoading(false);
      });
  }, []);

  // Approve request
  const handleApprove = (request: Request) => {
    setRequests(prev => prev.map(r => 
      r.id === request.id 
        ? { ...r, status: 'approved' }
        : r
    ));
    toast.success(`"${request.title}" approved successfully!`);
  };

  // Reject request
  const handleReject = (request: Request) => {
    if (confirm(`Are you sure you want to reject "${request.title}"?`)) {
      setRequests(prev => prev.map(r => 
        r.id === request.id 
          ? { ...r, status: 'rejected' }
          : r
      ));
      toast.error(`"${request.title}" rejected`);
    }
  };

  // View request details
  const handleView = (request: Request) => {
    setViewingRequest(request);
  };

  const columns: Column[] = [
    {
      key: 'title',
      label: 'Request Title',
      render: (value, row) => (
        <div>
          <p className="text-white font-medium">{value}</p>
          <p className="text-gray-400 text-xs">{row.type}</p>
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
      key: 'submittedDate',
      label: 'Submitted',
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
            className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-gray-700 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status === 'pending' && (
            <>
              <button 
                onClick={() => handleApprove(row)}
                className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-lg transition-colors"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleReject(row)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors"
                title="Reject"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const filteredRequests = requests.filter(request =>
    request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <Header 
        title="Requests" 
        subtitle="Review and manage content requests"
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <p className="text-gray-400 text-sm">Pending Review</p>
            </div>
            <p className="text-yellow-400 text-3xl font-bold">
              {requests.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Check className="w-5 h-5 text-green-400" />
              <p className="text-gray-400 text-sm">Approved</p>
            </div>
            <p className="text-green-400 text-3xl font-bold">
              {requests.filter(r => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-2">
              <XIcon className="w-5 h-5 text-red-400" />
              <p className="text-gray-400 text-sm">Rejected</p>
            </div>
            <p className="text-red-400 text-3xl font-bold">
              {requests.filter(r => r.status === 'rejected').length}
            </p>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredRequests}
          isLoading={loading}
          emptyMessage="No requests found"
        />
      </div>

      {/* View Modal */}
      {viewingRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{viewingRequest.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span>By {viewingRequest.creator}</span>
                  <span>•</span>
                  <span>{new Date(viewingRequest.submittedDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <StatusBadge status={viewingRequest.status} />
                </div>
              </div>
              <button
                onClick={() => setViewingRequest(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Request Type</label>
                  <p className="text-white mt-1">{viewingRequest.type}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <p className="text-white mt-1">This is a mock request description. In production, this would contain the actual request details and any additional information provided by the creator.</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-between">
              {viewingRequest.status === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleApprove(viewingRequest);
                      setViewingRequest(null);
                    }}
                    className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(viewingRequest);
                      setViewingRequest(null);
                    }}
                    className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <XIcon className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <button
                onClick={() => setViewingRequest(null)}
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
