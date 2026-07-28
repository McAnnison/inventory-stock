import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ScanLine, Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('mensahanni98@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-10 text-center border-b border-slate-800">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mb-4">
              <ScanLine className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">CORE_OS // PULSE</h1>
            <p className="text-slate-400 mt-1 text-[10px] uppercase tracking-widest font-bold">
              Edge Vision Analytics
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-6">Access Terminal</h2>
          
          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded text-xs font-medium mb-4 border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">User Registry</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auth Token</label>
                <a href="#" className="text-[10px] text-blue-600 font-bold uppercase hover:underline">Reset</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded text-xs font-bold uppercase tracking-wider mt-8 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between text-[10px] font-mono text-slate-400">
            <span>v4.2.0-STABLE</span>
            <span>ENV: PROD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
