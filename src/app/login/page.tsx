'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

const loginAccounts = [
  {
    id: 1,
    email: 'admin@test.com',
    password: 'Test@123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'john@test.com',
    password: 'Test@123',
    name: 'John Doe',
    role: 'creator',
  },
  {
    id: 3,
    email: 'jane@test.com',
    password: 'Test@123',
    name: 'Jane Smith',
    role: 'editor',
  },
  {
    id: 4,
    email: 'princeflexzy@test.com',
    password: 'Test@123',
    name: 'PRINCEFLEXZY',
    role: 'admin',
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Find matching account
    const account = loginAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    setTimeout(() => {
      if (account) {
        login({
          id: account.id.toString(),
          name: account.name,
          email: account.email,
          role: account.role,
        });
        toast.success(`Welcome back, ${account.name}!`, {
          style: { background: '#1F2937', color: '#fff' },
          icon: '👋',
        });
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials. Try one of the demo accounts!', {
          style: { background: '#1F2937', color: '#fff' },
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (account: typeof loginAccounts[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: account.id.toString(),
        name: account.name,
        email: account.email,
        role: account.role,
      });
      toast.success(`Welcome back, ${account.name}!`, {
        style: { background: '#1F2937', color: '#fff' },
        icon: '👋',
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to access your studio dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Quick Login Options */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Quick Demo Login</h2>
            <p className="text-gray-400">Click any account below to sign in instantly</p>
          </div>

          {loginAccounts.map((account, index) => (
            <motion.button
              key={account.id}
              onClick={() => handleQuickLogin(account)}
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {account.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{account.name}</h3>
                  <p className="text-gray-400 text-sm">{account.email}</p>
                </div>
                <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30">
                  {account.role}
                </div>
              </div>
            </motion.button>
          ))}

          <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Password for all accounts:</strong> Test@123
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
