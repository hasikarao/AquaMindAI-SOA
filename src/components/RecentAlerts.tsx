import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ShieldAlert, 
  Filter, 
  MapPin, 
  Clock, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { AlertNotification } from '../types';

interface RecentAlertsProps {
  alerts: AlertNotification[];
  onDismissAlert?: (id: string) => void;
  onMarkAllRead?: () => void;
}

export const RecentAlerts: React.FC<RecentAlertsProps> = ({ 
  alerts, 
  onDismissAlert, 
  onMarkAllRead 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const categories = ['All', 'Pipeline', 'Quality', 'Reservoir'];

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedCategory === 'All') return true;
    return alert.category === selectedCategory;
  });

  const toggleRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'urgent':
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'urgent':
      case 'warning':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'success':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
      default:
        return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300';
    }
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Water Alerts & Notices</h3>
            <p className="text-xs text-slate-400">Official HMWSSB Citizen Updates</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1 p-1 rounded-2xl glass-inner-card border border-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`filter-alert-${cat}`}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-3 pt-4 max-h-[380px] overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredAlerts.map((alert) => {
            const isRead = readIds.has(alert.id) || alert.read;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-2xl transition-all border ${
                  isRead
                    ? 'glass-inner-card opacity-60 border-slate-800 text-slate-400'
                    : 'glass-inner-card border-slate-700/80 hover:border-cyan-500/40 text-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-0.5 shrink-0">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getSeverityBadge(alert.severity)}`}>
                          {alert.category}
                        </span>
                        <h4 className={`text-xs font-bold ${isRead ? 'text-slate-400' : 'text-white'}`}>
                          {alert.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {alert.description}
                      </p>

                      <div className="flex items-center gap-3 mt-2.5 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {alert.timestamp}
                        </span>
                        {alert.affectedArea && (
                          <span className="flex items-center gap-1 text-cyan-400 font-medium">
                            <MapPin className="w-3 h-3" />
                            {alert.affectedArea}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRead(alert.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors shrink-0"
                    title={isRead ? 'Mark as Unread' : 'Acknowledge Notice'}
                  >
                    <Check className={`w-3.5 h-3.5 ${isRead ? 'text-emerald-400' : 'text-slate-500'}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="pt-3.5 mt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Auto-synced with Hyderabad Municipal Jal Board
        </span>
        <button
          onClick={() => {
            const allIds = new Set(alerts.map((a) => a.id));
            setReadIds(allIds);
          }}
          className="text-xs text-cyan-400 hover:underline cursor-pointer font-medium"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
