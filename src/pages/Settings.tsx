import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Database, Bell, Shield, RefreshCw } from 'lucide-react';

export const Settings = () => {
  const { user, logout, isSyncing, lastSync, triggerSync } = useAuth();

  return (
    <div className="p-4 space-y-6 pb-24 h-full bg-slate-100">
      
      {/* Profile Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
        <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-white text-sm font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">{user?.name || 'User'}</h2>
          <p className="text-[11px] text-slate-500">{user?.email || 'user@example.com'}</p>
          <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Sync Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2 text-slate-700">
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-tight">Sync Status</span>
          </div>
          <button 
            onClick={triggerSync}
            disabled={isSyncing}
            className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded font-bold uppercase active:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
        <div className="p-3 text-[11px] text-slate-500 flex justify-between font-mono bg-white">
          <span>LAST_SYNC</span>
          <span className="font-medium text-slate-900">
            {lastSync ? lastSync.toLocaleString() : 'Never'}
          </span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        <SettingsItem icon={<Database className="w-4 h-4" />} label="Data Management" />
        <SettingsItem icon={<Bell className="w-4 h-4" />} label="Alerts & Notifications" />
        <SettingsItem icon={<Shield className="w-4 h-4" />} label="Privacy & Security" />
      </div>

      {/* Logout */}
      <button 
        onClick={logout}
        className="w-full bg-white p-3 rounded-xl shadow-sm border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-tight flex items-center justify-center space-x-2 hover:bg-slate-50 active:bg-slate-100 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </button>

      <div className="text-center text-xs text-slate-400 mt-8">
        <p>Stock Pulse App v1.0.0</p>
        <p>University of Ghana</p>
      </div>

    </div>
  );
};

const SettingsItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100">
    <div className="flex items-center space-x-3 text-slate-700">
      <div className="text-slate-500">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-tight">{label}</span>
    </div>
    <div className="text-slate-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);
