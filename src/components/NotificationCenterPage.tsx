import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  Info, 
  ShieldAlert, 
  Droplets, 
  Sparkles, 
  Search, 
  Trash2, 
  ArrowRight, 
  Smartphone, 
  MessageSquare, 
  Check, 
  Clock
} from 'lucide-react';
import { AlertNotification, AppView } from '../types';

interface NotificationCenterPageProps {
  onNavigate?: (view: AppView) => void;
}

const initialNotifications: AlertNotification[] = [
  {
    id: 'notif-1',
    title: 'Ward 104 Evening Supply Scheduled (18:30)',
    description: 'Water supply will start at 18:30 IST. Target duration 120 mins with standard domestic pressure.',
    timestamp: '15 mins ago',
    severity: 'info',
    category: 'Pipeline',
    read: false,
    affectedArea: 'Kondapur & Madhapur Sector 2'
  },
  {
    id: 'notif-2',
    title: 'Water Potability Certified - Safe TDS (135 PPM)',
    description: 'Microbiological and chemical tests from Osmansagar feeder confirm optimal potability standards.',
    timestamp: '1 hour ago',
    severity: 'success',
    category: 'Quality',
    read: false,
    affectedArea: 'West Hyderabad Zone'
  },
  {
    id: 'notif-3',
    title: 'Acoustic Leak Alert on Trunk Feeder #4',
    description: 'AI Hydrophone sensor detected high-frequency pipe vibration. Flow loss ~420 L/hr. Rapid repair unit assigned.',
    timestamp: '2 hours ago',
    severity: 'urgent',
    category: 'Pipeline',
    read: false,
    affectedArea: 'Jubilee Hills Road No. 36'
  },
  {
    id: 'notif-4',
    title: 'Monthly 20,000L Free Water Quota Alert',
    description: 'You have consumed 12,450L (62% of your monthly free municipal entitlement). 7,550L remaining until Sep 1st.',
    timestamp: 'Yesterday',
    severity: 'info',
    category: 'Billing',
    read: true,
    affectedArea: 'Domestic Meter AM-HYD-9842X'
  },
  {
    id: 'notif-5',
    title: 'Singur Dam Inflow Surge Notice',
    description: 'Catchment rainfall increased reservoir inflow. Reservoir spillway gates opened safely to regulate water levels.',
    timestamp: 'Yesterday',
    severity: 'warning',
    category: 'Reservoir',
    read: true,
    affectedArea: 'Singur Reservoir Catchment'
  },
  {
    id: 'notif-6',
    title: 'Tanker Delivery TS 09 EA 4820 Dispatched',
    description: 'Your requested 10,000L emergency potable tanker is currently in transit. Driver: Mohammed Ismail.',
    timestamp: '3 days ago',
    severity: 'info',
    category: 'Pipeline',
    read: true,
    affectedArea: 'Cyber Heights'
  }
];

export function NotificationCenterPage({ onNavigate }: NotificationCenterPageProps) {
  const [notifications, setNotifications] = useState<AlertNotification[]>(initialNotifications);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Notification Preferences
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markSingleAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const categories = ['All', 'Urgent', 'Pipeline', 'Quality', 'Reservoir', 'Billing'];

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notif.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (notif.affectedArea && notif.affectedArea.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'All') return matchesSearch;
    if (activeCategory === 'Urgent') return matchesSearch && (notif.severity === 'urgent' || notif.severity === 'warning');
    return matchesSearch && notif.category === activeCategory;
  });

  const getSeverityIcon = (severity: AlertNotification['severity']) => {
    switch (severity) {
      case 'urgent':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'success':
        return <Droplets className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div id="notification-center-page" className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Bell className="w-3.5 h-3.5" />
              <span>Unified Civic Notification Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Notification & Emergency Alert Center
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Stay updated on water release timings, reservoir levels, potability index changes, and active pipeline maintenance across your DMA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                type="button"
                id="btn-mark-all-read"
                onClick={markAllAsRead}
                className="py-2.5 px-4 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-500 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark All as Read ({unreadCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Feed & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Notification Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Search & Category Pills */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search alerts by keyword, ward, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    activeCategory === cat
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Notifications */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400 space-y-2">
                <Bell className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="font-semibold text-slate-300">No notifications found</p>
                <p className="text-xs">You're all caught up with municipal water alerts.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  layout
                  className={`p-4 rounded-2xl border transition-all ${
                    !notif.read
                      ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                      : 'bg-slate-900/50 border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0 mt-0.5">
                      {getSeverityIcon(notif.severity)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{notif.title}</h3>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {notif.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{notif.description}</p>

                      {notif.affectedArea && (
                        <p className="text-[11px] text-cyan-400/90 font-medium pt-1">
                          Area: {notif.affectedArea}
                        </p>
                      )}

                      {/* Quick Actions Row */}
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <div className="flex gap-2">
                          {notif.category === 'Pipeline' && onNavigate && (
                            <button
                              type="button"
                              onClick={() => onNavigate('water-schedule')}
                              className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                            >
                              <span>Check Schedule</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {notif.category === 'Quality' && onNavigate && (
                            <button
                              type="button"
                              onClick={() => onNavigate('dashboard')}
                              className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] font-semibold"
                            >
                              <span>View Potability</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          {!notif.read && (
                            <button
                              type="button"
                              onClick={() => markSingleAsRead(notif.id)}
                              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Mark read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteNotification(notif.id)}
                            className="text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </div>

        {/* Right Column: Alert Subscriptions & Delivery Preferences (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 sticky top-20">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-800">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              Delivery Channels & Subscriptions
            </h3>

            <div className="space-y-3">
              {/* WhatsApp Alert Toggle */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-200">WhatsApp Alert Bot</p>
                  <p className="text-[10px] text-slate-400">30-min supply countdown ping</p>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* SMS Dispatch Toggle */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-200">SMS Gateway</p>
                  <p className="text-[10px] text-slate-400">Emergency burst & burst alerts</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* In-App Push Toggle */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-200">Push Notifications</p>
                  <p className="text-[10px] text-slate-400">Water quality changes & bills</p>
                </div>
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Real-time Alert Engine Card */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                REAL_TIME_DISPATCHER
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Automated notification engine guarantees instant SMS & app message delivery across 150 municipal wards for supply changes and emergencies.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
