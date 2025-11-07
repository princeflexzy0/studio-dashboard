'use client';

import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Calendar, Download, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface BillingStats {
  currentBalance: number;
  nextBillingDate: string;
  monthlySpend: number;
  lastPayment: number;
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<BillingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/admin/billing');
      const data = await response.json();
      setInvoices(data.invoices);
      setStats(data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching billing data:', error);
      toast.error('Failed to load billing data');
      setLoading(false);
    }
  };

  const handleDownload = (invoice: Invoice) => {
    toast.success(`Downloading invoice ${invoice.id}...`);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-500/10 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      overdue: 'bg-red-500/10 text-red-400 border-red-500/30',
    }[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/30';

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles} capitalize`}>
        {status}
      </span>
    );
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header title="Billing & Payments" subtitle="Manage invoices and payments" />
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
      <Header title="Billing & Payments" subtitle="Manage your invoices and payment history" />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-8 h-8 text-cyan-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Current Balance</p>
              <h3 className="text-3xl font-bold text-white">
                ${stats.currentBalance.toLocaleString()}
              </h3>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <CreditCard className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Last Payment</p>
              <h3 className="text-3xl font-bold text-white">
                ${stats.lastPayment.toLocaleString()}
              </h3>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Monthly Spend</p>
              <h3 className="text-3xl font-bold text-white">
                ${stats.monthlySpend.toLocaleString()}
              </h3>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Next Billing</p>
              <h3 className="text-xl font-bold text-white">
                {new Date(stats.nextBillingDate).toLocaleDateString()}
              </h3>
            </div>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Payment Method</h2>
            <button
              onClick={() => toast.success('Payment method update coming soon!')}
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-medium rounded-lg transition-colors border border-cyan-500/30"
            >
              Update
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Visa ending in 4242</p>
              <p className="text-gray-400 text-sm">Expires 12/2025</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search invoices..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-cyan-400 font-mono text-sm">{invoice.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white">{invoice.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">
                        ${invoice.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDownload(invoice)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-20">
            <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No invoices found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
