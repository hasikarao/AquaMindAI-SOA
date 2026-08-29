import React from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  Bell, 
  User, 
  LayoutDashboard, 
  Clock, 
  Radio, 
  MessageSquareWarning, 
  Truck, 
  Network, 
  Sliders, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { CitizenProfile, AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onOpenCitizenLogin: () => void;
  citizenProfile: CitizenProfile;
  unreadAlertsCount: number;
  onOpenAlertsModal?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenCitizenLogin,
  citizenProfile,
  unreadAlertsCount,
  onLogout,
}) => {
  const navItems: Array<{ id: AppView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'water-schedule', label: 'Water Schedule', icon: Clock },
    { id: 'leakage-reporting', label: 'Report Leakage', icon: Radio },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'tanker-finder', label: 'Tanker Finder', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* Top Citizen Ticker */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-slate-900/50 border-b border-white/5 text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Municipal Water Grid:</span> <span className="text-emerald-400 font-semibold">ACTIVE</span>
          </span>
          <span className="text-slate-700">|</span>
          <span>Water Quality: <span className="text-emerald-400 font-medium">100% Safe Drinking Water</span></span>
          <span className="text-slate-700">|</span>
          <span>Helpline: <span className="text-cyan-400 font-mono font-medium">155313 (Toll Free)</span></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase tracking-wider">
            Citizen Portal
          </span>
          <span className="text-slate-400 font-medium text-[10px]">Ward 104 • Kondapur & Madhapur</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          id="brand-logo-button"
        >
          <div className="w-9 h-9 rounded-2xl bg-cyan-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-all">
            <Droplets className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black tracking-tight text-white uppercase italic">
                AquaMind
              </span>
              <span className="text-xs font-black text-cyan-400 font-mono uppercase">
                AI
              </span>
            </div>
            <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-semibold leading-none">
              Smart Water Grid Platform
            </p>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                id={`nav-${item.id}-btn`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.id === 'notifications' && unreadAlertsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center -ml-0.5">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Medium Screen Horizontal Scroll Nav */}
        <nav className="flex xl:hidden items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800 overflow-x-auto max-w-[260px] sm:max-w-[420px] md:max-w-[500px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
                {item.id === 'notifications' && unreadAlertsCount > 0 && (
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Elements */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Notification Quick Bell */}
          <button
            onClick={() => setCurrentView('notifications')}
            id="header-notification-btn"
            className="relative p-2 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-all cursor-pointer"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* User Profile avatar or quick portal triggers */}
          <div className="flex items-center gap-2 pl-1">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white leading-tight">{citizenProfile.name}</p>
              <p className="text-[10px] text-cyan-400 font-mono font-medium">{citizenProfile.ward.split(' - ')[0]}</p>
            </div>
            <div 
              onClick={onOpenCitizenLogin}
              className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400/30 flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)] shrink-0"
              title="Switch Consumer Profile / Re-login"
              id="user-profile-avatar-btn"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                title="Log Out"
                id="btn-logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

