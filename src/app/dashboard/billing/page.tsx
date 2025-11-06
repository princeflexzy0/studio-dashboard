'use client';

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  Download,
  Crown,
  Check,
  X,
  Lock,
  Zap,
  Star,
  Sparkles
} from 'lucide-react';
import { useQuery } from 'react-query';
import { dashboardService } from '@/services/dashboard.service';
import toast from 'react-hot-toast';

export default function BillingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: billingData, isLoading } = useQuery(
    'billing',
    dashboardService.getBillingInfo,
    {
      refetchInterval: 30000,
    }
  );

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowUpgradeModal(true);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('🎉 Payment successful! Plan upgraded.', {
      duration: 4000,
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
    setShowUpgradeModal(false);
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const creditPercentage = billingData 
    ? (billingData.creditsUsed / billingData.totalCredits) * 100 
    : 0;
  const isLowCredit = creditPercentage > 80;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
        <p className="text-sm sm:text-base text-gray-400">Manage your subscription and billing</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        {[
          { label: 'Current Plan', value: billingData?.currentPlan || 'Free', icon: Crown, gradient: 'from-yellow-400 to-orange-500' },
          { label: 'Monthly Spend', value: `$${billingData?.monthlySpend || 0}`, icon: TrendingUp, gradient: 'from-blue-400 to-cyan-500' },
          { label: 'Credits Left', value: `${billingData?.totalCredits - billingData?.creditsUsed || 0}`, icon: CreditCard, gradient: 'from-purple-400 to-pink-500' },
          { label: 'Next Billing', value: billingData?.nextBillingDate || 'N/A', icon: Calendar, gradient: 'from-green-400 to-emerald-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 relative overflow-hidden group hover:scale-105 transition-transform"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            <div className="flex items-center justify-between mb-2 relative z-10">
              <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-1 relative z-10">{stat.label}</p>
            <p className="text-lg sm:text-2xl font-bold text-white relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Low Credit Warning */}
      {isLowCredit && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 border-2 border-orange-500/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 animate-pulse"></div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 relative z-10">
            <div className="flex items-center gap-3 flex-1">
              <AlertCircle className="w-6 h-6 text-orange-400 animate-pulse flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 flex items-center gap-2">
                  ⚠️ Low Credit Warning
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  You've used {creditPercentage.toFixed(0)}% of your credits. Upgrade now to keep creating! 🚀
                </p>
              </div>
            </div>
            <button
              onClick={() => handleUpgrade('professional')}
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all text-sm sm:text-base whitespace-nowrap flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Upgrade Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Credit Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">Credit Usage</h2>
          <span className="text-xs sm:text-sm text-gray-400">
            {billingData?.creditsUsed || 0} / {billingData?.totalCredits || 0} credits used
          </span>
        </div>
        
        <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${creditPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`absolute top-0 left-0 h-full rounded-full ${
              isLowCredit 
                ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500' 
                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
            }`}
          />
        </div>
      </motion.div>

      {/* Subscription Plans */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Subscription Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              id: 'starter',
              name: 'Starter',
              price: 29,
              credits: 200,
              features: ['200 Credits/month', 'Basic Support', 'Single User', 'Email Notifications'],
              gradient: 'from-gray-600 to-gray-700',
              buttonGradient: 'from-gray-600 to-gray-700',
              icon: Star,
              recommended: false
            },
            {
              id: 'professional',
              name: 'Professional',
              price: 79,
              credits: 500,
              features: ['500 Credits/month', 'Priority Support', 'Up to 5 Users', 'Advanced Analytics', 'API Access'],
              gradient: 'from-cyan-500 to-blue-600',
              buttonGradient: 'from-cyan-500 via-blue-500 to-purple-600',
              icon: Zap,
              recommended: true
            },
            {
              id: 'enterprise',
              name: 'Enterprise',
              price: 199,
              credits: 2000,
              features: ['2000 Credits/month', '24/7 Support', 'Unlimited Users', 'Custom Integrations', 'Dedicated Manager'],
              gradient: 'from-purple-500 to-pink-600',
              buttonGradient: 'from-purple-500 via-pink-500 to-red-600',
              icon: Sparkles,
              recommended: false
            }
          ].map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 border-2 ${
                plan.recommended 
                  ? 'border-cyan-500 shadow-xl shadow-cyan-500/20' 
                  : 'border-gray-700'
              } hover:scale-105 transition-transform`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </motion.div>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-2xl`}></div>

              <div className="text-center mb-4 sm:mb-6 relative z-10">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${plan.price}</span>
                  <span className="text-sm sm:text-base text-gray-400">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">{plan.credits} credits included</p>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 relative z-10">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                    <Check className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br ${plan.gradient} rounded-full p-0.5 text-white flex-shrink-0 mt-0.5`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                className={`w-full py-3 sm:py-3.5 rounded-xl font-bold transition-all text-sm sm:text-base shadow-lg relative z-10 ${
                  plan.recommended
                    ? `bg-gradient-to-r ${plan.buttonGradient} text-white hover:shadow-cyan-500/50`
                    : `bg-gradient-to-r ${plan.buttonGradient} text-white hover:shadow-gray-500/30`
                }`}
              >
                {billingData?.currentPlan === plan.name ? '✓ Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">Transaction History</h2>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg transition-all text-sm sm:text-base w-fit">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Type</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {billingData?.transactions?.map((transaction: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-800/50">
                    <td className="px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-3 sm:py-4 text-xs sm:text-sm text-white">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'subscription' 
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-semibold text-white">
                      ${transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/30 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">🚀 Upgrade Plan</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-cyan-300">
                  🔒 Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isProcessing ? '⏳ Processing...' : '✨ Confirm Payment'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
