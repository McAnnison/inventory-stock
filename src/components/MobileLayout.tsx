import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Scan, ShoppingCart, Settings, CloudOff, RefreshCw, Wifi } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const MobileLayout = () => {
  const { isSyncing, lastSync } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/scan': return 'Shelf Auditor';
      case '/pos': return 'Smart POS';
      case '/settings': return 'Settings';
      default: return 'Stock Pulse';
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Device Simulator Container */}
      <div className="relative w-full sm:max-w-md sm:h-[850px] sm:my-auto bg-white sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* Status Bar */}
        <div className="bg-slate-900 text-white px-6 pt-3 pb-2 flex justify-between items-center text-[10px] font-mono z-20">
          <span>09:41:00</span>
          <div className="flex items-center space-x-2">
            {isSyncing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <div className="flex space-x-1 items-end h-3">
              <div className="w-1 h-1.5 bg-white rounded-sm" />
              <div className="w-1 h-2 bg-white rounded-sm" />
              <div className="w-1 h-2.5 bg-white rounded-sm" />
              <div className="w-1 h-3 bg-white/50 rounded-sm" />
            </div>
            <div className="w-5 h-2.5 border border-white/50 rounded-sm p-[1px]">
              <div className="bg-white h-full w-[80%] rounded-sm" />
            </div>
          </div>
        </div>

        {/* App Header */}
        <header className="bg-white border-b border-slate-200 text-slate-800 px-6 py-4 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">{getPageTitle()}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("w-1.5 h-1.5 rounded-full", isSyncing ? "bg-amber-400 animate-pulse" : "bg-emerald-500")}></span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {isSyncing ? 'Syncing...' : lastSync ? `Synced ${lastSync.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'Offline Mode'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center border border-blue-500 shadow-sm">
              <span className="font-bold text-xs text-white">SP</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-20 pb-safe">
          <NavItem to="/" icon={<Home />} label="Home" />
          <NavItem to="/scan" icon={<Scan />} label="Scan" />
          <NavItem to="/pos" icon={<ShoppingCart />} label="POS" />
          <NavItem to="/settings" icon={<Settings />} label="Settings" />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center justify-center space-y-1 w-16 transition-colors duration-200",
        isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
      )}
    >
      {({ isActive }) => (
        <>
          <div className={cn(
            "p-1.5 rounded-md transition-all duration-300",
            isActive ? "bg-slate-800 text-white" : ""
          )}>
            {React.cloneElement(icon as React.ReactElement, {
              className: cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")
            })}
          </div>
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest transition-all duration-300",
            isActive ? "text-white" : ""
          )}>{label}</span>
        </>
      )}
    </NavLink>
  );
};
