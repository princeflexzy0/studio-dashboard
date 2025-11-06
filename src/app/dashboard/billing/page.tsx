'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, DollarSign, CheckCircle, XCircle, Calendar, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('basic');
  
  const { data: billing, isLoading } = useQuery('billing', dashboardService.getBilling);
  const { data: paymentMethods } = useQuery('payment-methods', dashboardService.getPaymentMethods);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      features: ['5 Projects', '10 GB Storage', 'Basic Support', '1 User'],
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      features: ['50 Projects', '100 GB Storage', 'Priority Support', '5 Users', 'Advanced Analytics'],
      color: 'from-cyan-500 to-blue-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      features: ['Unlimited Projects', '1 TB Storage', '24/7 Support', 'Unlimited Users', 'Custom Integration', 'Dedicated Manager'],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setTimeout(() => {
      setCurrentPlan(selectedPlan!);
      toast.success(`Upgraded to ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
      setShowPaymentModal(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-700 rounded-xl"></div>
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
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-cyan-400" />
          Billing & Plans
        </h1>
        <p className="text-gray-400">Manage your subscription and payment methods</p>
      </motion.div>

      {/* Current Plan Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl p-6 mb-8 border border-cyan-500/30"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Current Plan: {plans.find(p => p.id === currentPlan)?.name}</h2>
            <p className="text-gray-300">Next billing date: November 30, 2025</p>
          </div>
          <div className="text-3xl font-bold text-cyan-400">
            ${plans.find(p => p.id === currentPlan)?.price}/mo
          </div>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-to-br ${plan.color} rounded-xl p-6 text-white ${
              plan.id === currentPlan ? 'ring-4 ring-yellow-400' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
            )}
            {plan.id === currentPlan && (
              <div className="absolute -top-3 right-4 bg-green-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                CURRENT
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold mb-6">
              ${plan.price}<span className="text-lg font-normal">/mo</span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={plan.id === currentPlan}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                plan.id === currentPlan
                  ? 'bg-white/20 cursor-not-allowed'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {plan.id === currentPlan ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Payment Methods</h2>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods?.map((method: any) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-center gap-4">
                <CreditCard className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-white font-medium capitalize">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-400">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Default
                  </span>
                )}
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 sm:p-8 max-w-md w-full border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Confirm Upgrade</h2>
              <p className="text-gray-300 mb-6">
                Upgrade to <span className="text-cyan-400 font-bold">{plans.find(p => p.id === selectedPlan)?.name}</span> plan for <span className="text-2xl font-bold text-white">${plans.find(p => p.id === selectedPlan)?.price}/mo</span>
              </p>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Payment Method</p>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-cyan-400" />
                  <span className="text-white">Visa •••• 4242</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Pay Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
