'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, TrendingUp, DollarSign, Calendar, Download, AlertCircle, CheckCircle, Package, Zap, Crown, Plus, X, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Plan {
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
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

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('Professional');
  const [creditsUsed] = useState(287);
  const [totalCredits] = useState(500);
  const [billingCycle] = useState('Monthly');
  const [nextBillingDate] = useState('Dec 5, 2024');
  
  const [transactions] = useState<Transaction[]>([
    { id: 'TXN001', date: '2024-11-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
    { id: 'TXN002', date: '2024-11-01', description: 'Credit top-up', amount: 25, status: 'completed' },
    { id: 'TXN003', date: '2024-10-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
    { id: 'TXN004', date: '2024-10-15', description: 'Credit top-up', amount: 50, status: 'completed' }
  ]);

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const creditPercentage = (creditsUsed / totalCredits) * 100;
  const remainingCredits = totalCredits - creditsUsed;

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment method added successfully!');
    setShowAddCardModal(false);
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
  };

  const handleUpgradePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan.name);
      toast.success(`Successfully upgraded to ${selectedPlan.name} plan!`);
      setShowUpgradeModal(false);
    }
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleDownloadInvoice = (transactionId: string) => {
    toast.success(`Downloading invoice for ${transactionId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Billing & Subscription
          </h1>
          <p className="text-gray-400">Manage your subscription and payment methods</p>
        </motion.div>

        {/* Current Plan & Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Current Plan: {currentPlan}</h3>
                <p className="text-gray-400 text-sm">
                  {billingCycle} billing • Next payment on {nextBillingDate}
                </p>
              </div>
              <Crown className="w-8 h-8 text-yellow-400" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Credits Used</span>
                  <span className="text-white font-semibold">
                    {creditsUsed} / {totalCredits}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {remainingCredits} credits remaining
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <CreditCard className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Payment Method</h3>
            <p className="text-gray-400 text-sm mb-4">•••• •••• •••• 4242</p>
            <button
              onClick={() => setShowAddCardModal(true)}
              className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Card
            </button>
          </div>
        </div>

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border ${
                  plan.popular ? 'border-cyan-500' : 'border-gray-700'
                } hover:border-cyan-500/50 transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  {plan.name === 'Starter' && <Package className="w-12 h-12 text-cyan-400 mx-auto mb-3" />}
                  {plan.name === 'Professional' && <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-3" />}
                  {plan.name === 'Enterprise' && <Crown className="w-12 h-12 text-cyan-400 mx-auto mb-3" />}
                  
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">A${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-sm text-gray-400">{plan.credits} credits/month</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgradePlan(plan)}
                  disabled={currentPlan === plan.name}
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${
                    currentPlan === plan.name
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'
                  }`}
                >
                  {currentPlan === plan.name ? 'Current Plan' : 'Upgrade'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Transaction History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">Transaction ID</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">Description</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 text-cyan-400 font-mono text-sm">{transaction.id}</td>
                    <td className="p-4 text-gray-300">{transaction.date}</td>
                    <td className="p-4 text-white">{transaction.description}</td>
                    <td className="p-4 text-white font-semibold">A${transaction.amount}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                        {transaction.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewTransaction(transaction)}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="View details"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(transaction.id)}
                          className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                          title="Download invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD CARD MODAL */}
      <AnimatePresence>
        {showAddCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Add Payment Method</h2>
                <button
                  onClick={() => setShowAddCardModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-400">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCardModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add Card
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPGRADE PLAN MODAL */}
      <AnimatePresence>
        {showUpgradeModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Upgrade to {selectedPlan.name}?</h2>
                <p className="text-gray-400">
                  You'll be charged A${selectedPlan.price}/month starting from your next billing cycle
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-3">Plan includes:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpgrade}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Confirm Upgrade
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSACTION DETAILS MODAL */}
      <AnimatePresence>
        {showTransactionModal && selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTransactionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="text-white font-mono">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-white">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Description</span>
                  <span className="text-white">{selectedTransaction.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-white font-semibold text-xl">A${selectedTransaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                    {selectedTransaction.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDownloadInvoice(selectedTransaction.id)}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
