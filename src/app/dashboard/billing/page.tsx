'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, TrendingUp, DollarSign, Calendar, Download, AlertCircle, CheckCircle, Package, Zap, Crown, Plus, X, Lock } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 29,
    credits: 100,
    features: ['100 upload credits/month', 'Basic analytics', 'Email support', '5GB storage']
  },
  {
    name: 'Professional',
    price: 79,
    credits: 500,
    popular: true,
    features: ['500 upload credits/month', 'Advanced analytics', 'Priority support', '50GB storage', 'Custom branding']
  },
  {
    name: 'Enterprise',
    price: 199,
    credits: 2000,
    features: ['2000 upload credits/month', 'Full analytics suite', '24/7 support', 'Unlimited storage', 'API access', 'Dedicated manager']
  }
];

const transactions = [
  { id: 'TXN001', date: '2024-11-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
  { id: 'TXN002', date: '2024-11-01', description: 'Credit top-up', amount: 25, status: 'completed' },
  { id: 'TXN003', date: '2024-10-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
  { id: 'TXN004', date: '2024-10-15', description: 'Credit top-up', amount: 50, status: 'completed' }
];

export default function BillingPage() {
  const [currentPlan] = useState('Professional');
  const [creditsUsed] = useState(287);
  const [totalCredits] = useState(500);
  const [billingCycle] = useState('Monthly');
  const [nextBillingDate] = useState('Dec 5, 2024');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const creditPercentage = (creditsUsed / totalCredits) * 100;
  const remainingCredits = totalCredits - creditsUsed;

  const handleAddCard = () => {
    // Simulate adding card
    setTimeout(() => {
      setShowAddCardModal(false);
      setCardNumber('');
      setCardName('');
      setExpiryDate('');
      setCvv('');
      alert('Card added successfully!');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Billing & Subscription
        </h1>
        <p className="text-gray-400">Manage your credits, plan, and payment history</p>
      </div>

      {/* Current Plan & Credits - Optimized Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">Current Plan</h2>
            </div>
            <span className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full border border-purple-500/50">
              ACTIVE
            </span>
          </div>
          <div className="mb-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{currentPlan}</h3>
            <p className="text-gray-400 text-sm">{billingCycle} billing</p>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl sm:text-4xl font-bold text-white">${plans.find(p => p.name === currentPlan)?.price}</span>
            <span className="text-gray-400 text-sm">/month</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Next billing date</span>
              <span className="text-white font-semibold">{nextBillingDate}</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base">
            Upgrade Plan
          </button>
        </motion.div>

        {/* Credit Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-semibold text-white">Credit Usage</h2>
          </div>
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-bold text-white">{creditsUsed}</span>
              <span className="text-gray-400 text-sm">/ {totalCredits}</span>
            </div>
            <p className="text-sm text-gray-400">Credits used this month</p>
          </div>
          <div className="mb-4">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${creditPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full rounded-full ${creditPercentage > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-gray-400">Remaining credits</span>
            <span className={`font-semibold ${remainingCredits < 100 ? 'text-orange-400' : 'text-green-400'}`}>
              {remainingCredits}
            </span>
          </div>
          {creditPercentage > 80 && (
            <div className="flex items-start gap-2 p-2 sm:p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-400">Running low on credits! Consider upgrading.</p>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-base sm:text-lg font-semibold text-white">This Month</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Total Spent</p>
                  <p className="text-gray-400 text-xs">Last 30 days</p>
                </div>
              </div>
              <span className="text-xl font-bold text-white">$79</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Credits Purchased</p>
                  <p className="text-gray-400 text-xs">Top-ups</p>
                </div>
              </div>
              <span className="text-xl font-bold text-white">75</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Available Plans - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border rounded-xl p-4 sm:p-6 ${
                plan.popular 
                  ? 'border-cyan-500/50 ring-2 ring-cyan-500/20' 
                  : 'border-gray-700/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 sm:px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <div className="mb-4 sm:mb-6">
                <span className="text-cyan-400 font-semibold text-base sm:text-lg">{plan.credits} credits</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full font-semibold py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                  currentPlan === plan.name
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'
                }`}
                disabled={currentPlan === plan.name}
              >
                {currentPlan === plan.name ? 'Current Plan' : 'Select Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Transaction History - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Transaction History</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddCardModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        
        {/* Mobile: Card view, Desktop: Table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Transaction ID</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Description</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold text-sm">Amount</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-cyan-400 font-mono text-sm">{txn.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300 text-sm">{txn.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white text-sm">{txn.description}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-white font-semibold text-sm">${txn.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/50">
                        {txn.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {transactions.map((txn) => (
            <div key={txn.id} className="bg-gray-700/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-mono text-sm">{txn.id}</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/50">
                  {txn.status.toUpperCase()}
                </span>
              </div>
              <p className="text-white text-sm font-medium">{txn.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{txn.date}</span>
                <span className="text-white font-bold">${txn.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCardModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setShowAddCardModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 sm:p-8 max-w-md w-full border border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Add Payment Card</h2>
                  <button 
                    onClick={() => setShowAddCardModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-cyan-400">Your payment information is encrypted and secure</p>
                  </div>

                  <button
                    onClick={handleAddCard}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Add Card
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
