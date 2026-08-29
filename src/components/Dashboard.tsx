import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Radio, 
  MessageSquareWarning, 
  Truck, 
  Bell, 
  Sparkles, 
  Droplets, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  MapPin,
  Sun,
  CloudSun,
  CloudRain,
  Calendar,
  BellRing,
  Check,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { FloatingAIAssistant } from './FloatingAIAssistant';
import { 
  WeatherData, 
  CitizenProfile, 
  SupplySchedule, 
  ReservoirData, 
  AlertNotification,
  AppView 
} from '../types';
import { mockWeeklyUsageData } from '../data/mockData';

interface DashboardProps {
  weather: WeatherData;
  profile: CitizenProfile;
  schedule: SupplySchedule;
  reservoirs: ReservoirData[];
  alerts: AlertNotification[];
  onOpenAlertsModal?: () => void;
  onNavigate?: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  weather,
  profile,
  schedule,
  alerts,
  onNavigate,
}) => {
  // Live Countdown logic
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 45,
    seconds: 18,
  });
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleAlert = () => {
    setIsAlertSubscribed(!isAlertSubscribed);
    if (!isAlertSubscribed) {
      setToastMessage('WhatsApp & SMS alert set 15 minutes before water release!');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const format2Digits = (num: number) => String(num).padStart(2, '0');

  // Dynamic Time-based Greeting
  const getGreetingInfo = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'Good Morning', icon: Sun, color: 'text-amber-400' };
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', icon: CloudSun, color: 'text-cyan-400' };
    if (hour >= 17 && hour < 21) return { text: 'Good Evening', icon: CloudSun, color: 'text-indigo-300' };
    return { text: 'Good Evening', icon: Sparkles, color: 'text-cyan-300' };
  };

  const greeting = getGreetingInfo();
  const GreetingIcon = greeting.icon;

  // Notification Icon Helpers
  const getNotificationIcon = (severity: string) => {
    switch (severity) {
      case 'urgent':
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getNotificationBadgeClass = (severity: string) => {
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

  // Only latest 3 notifications
  const recentNotifications = alerts.slice(0, 3);

  // Custom Tooltip for Mini Chart
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2.5 rounded-xl bg-slate-950/95 border border-cyan-500/40 shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-white mb-1">{label}</p>
          <p className="text-cyan-300 flex items-center justify-between gap-3">
            <span>Consumed:</span>
            <strong className="font-mono text-white">{payload[0]?.value} L</strong>
          </p>
          <p className="text-emerald-300 flex items-center justify-between gap-3 text-[11px]">
            <span>Target:</span>
            <strong className="font-mono text-slate-300">180 L</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="citizen-dashboard-root" className="space-y-6 pb-16 relative z-10 max-w-6xl mx-auto">
      
      {/* ============================================================ */}
      {/* 1. WELCOME CARD                                             */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-xl"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* Left Column: Greeting, Name, Area, Ward, CAN */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GreetingIcon className={`w-4 h-4 ${greeting.color}`} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {greeting.text}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Namaste, {profile.name}
            </h1>

            {/* Citizen Details Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-inner-card text-cyan-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Kukatpally, Hyderabad
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-inner-card text-slate-300 text-xs font-medium">
                Ward {profile.wardNumber || 118}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-inner-card text-slate-400 font-mono text-xs">
                CAN: <span className="text-slate-200 font-semibold">{profile.canNumber}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Clean Weather Widget */}
          <div className="p-4 sm:p-5 rounded-2xl glass-inner-card border border-slate-800 flex items-center gap-5 w-full sm:w-auto">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <CloudRain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-black text-white">{weather.tempCelsius}°C</span>
                <span className="text-xs font-medium text-slate-400">Hyderabad</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Droplets className="w-3.5 h-3.5" />
                  {weather.humidityPercent}% Humidity
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">
                  {weather.rainChancePercent}% Rain Chance
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 2. NEXT WATER SUPPLY (HERO WIDGET)                          */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-cyan-500/30"
      >
        {/* Glow & Backdrop */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Next Water Supply</h2>
                <p className="text-xs text-slate-400">Kukatpally, Ward 118 • Hyderabad</p>
              </div>
            </div>

            {/* AI Prediction Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>98% On-Time Confidence</span>
            </div>
          </div>

          {/* Center Content: Big Supply Time & Live Digital Countdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Supply Time Display */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Scheduled Release Window
              </span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Today at 06:30 PM
              </div>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                06:30 PM – 08:30 PM (2 Hours Continuous Supply)
              </p>
            </div>

            {/* Large Digital Countdown */}
            <div className="p-4 sm:p-5 rounded-2xl glass-inner-card border border-cyan-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Supply Starting In
              </span>
              <div className="flex items-center gap-2 font-mono">
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {format2Digits(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Hours</span>
                </div>
                <span className="text-2xl font-bold text-slate-600 mb-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {format2Digits(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Minutes</span>
                </div>
                <span className="text-2xl font-bold text-slate-600 mb-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                    {format2Digits(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest mt-0.5">Seconds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar until supply starts */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Pipeline Armed & Ready
              </span>
              <span>75% of cycle elapsed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full shadow-lg shadow-cyan-500/50"
              />
            </div>
          </div>

          {/* Action Row: Remind Me Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleToggleAlert}
              id="citizen-remind-me-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                isAlertSubscribed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isAlertSubscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Reminder Scheduled (15 mins prior)</span>
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4" />
                  <span>Remind Me 15 Mins Before</span>
                </>
              )}
            </button>

            <span className="text-xs text-slate-400">
              Target Pressure: <strong className="text-white">2.35 Bar (Optimal Flow)</strong>
            </span>
          </div>

          {/* Toast feedback */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 3. QUICK ACTIONS (4 GLASS CARDS)                             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Water Schedule */}
        <button
          type="button"
          id="quick-action-schedule"
          onClick={() => onNavigate?.('water-schedule')}
          className="p-5 rounded-3xl glass-panel hover:border-cyan-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white">Water Schedule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Weekly timings & pressure</p>
          </div>
        </button>

        {/* Card 2: Report Leakage */}
        <button
          type="button"
          id="quick-action-leakage"
          onClick={() => onNavigate?.('leakage-reporting')}
          className="p-5 rounded-3xl glass-panel hover:border-blue-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-blue-500/10 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white">Report Leakage</h3>
            <p className="text-xs text-slate-400 mt-0.5">Upload photo & GPS tag</p>
          </div>
        </button>

        {/* Card 3: Complaints */}
        <button
          type="button"
          id="quick-action-complaints"
          onClick={() => onNavigate?.('complaints')}
          className="p-5 rounded-3xl glass-panel hover:border-amber-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-amber-500/10 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white">Complaints</h3>
            <p className="text-xs text-slate-400 mt-0.5">24-Hr SLA grievance status</p>
          </div>
        </button>

        {/* Card 4: Tanker Finder */}
        <button
          type="button"
          id="quick-action-tanker"
          onClick={() => onNavigate?.('tanker-finder')}
          className="p-5 rounded-3xl glass-panel hover:border-emerald-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white">Tanker Finder</h3>
            <p className="text-xs text-slate-400 mt-0.5">1-Click GPS tanker booking</p>
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 4 & 5. WATER USAGE + RECENT NOTIFICATIONS (2 COLS)           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 4. TODAY'S WATER USAGE (Compact Card + Mini Line Chart + AI Limit) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:col-span-7 p-6 sm:p-7 rounded-3xl glass-panel flex flex-col justify-between shadow-xl"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Today's Water Usage</h3>
                  <p className="text-xs text-slate-400">Household smart meter telemetry</p>
                </div>
              </div>

              {/* Eco Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>-21% vs Ward Avg</span>
              </div>
            </div>

            {/* Litres Today & AI Recommended Limit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  Consumed Today
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-white font-mono">142</span>
                  <span className="text-xs text-cyan-400 font-bold">Litres</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  AI Recommended Limit
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-emerald-400 font-mono">180</span>
                  <span className="text-xs text-emerald-400 font-bold">L / Day</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ✨ 38 Litres saved today (Optimal Range)
                </p>
              </div>
            </div>

            {/* Weekly Mini Line Chart */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Past 7 Days Consumption
                </span>
                <span className="text-[11px] text-slate-400">Weekly Total: 3,200 L</span>
              </div>
              <div className="w-full h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockWeeklyUsageData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="citizenUsageGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="timeLabel" stroke="#64748B" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="actualLitres"
                      name="Your Usage"
                      stroke="#06B6D4"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#citizenUsageGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. RECENT NOTIFICATIONS (Latest 3 notifications + View All button) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl glass-panel flex flex-col justify-between shadow-xl"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Recent Notifications</h3>
                  <p className="text-xs text-slate-400">Important alerts for your area</p>
                </div>
              </div>

              {/* View All Button */}
              <button
                onClick={() => onNavigate?.('notifications')}
                id="btn-view-all-notifications"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All ({alerts.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of 3 Notifications */}
            <div className="space-y-3 mt-4">
              {recentNotifications.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onNavigate?.('notifications')}
                  className="p-3.5 rounded-2xl glass-inner-card border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 mt-0.5 shrink-0">
                      {getNotificationIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getNotificationBadgeClass(alert.severity)}`}>
                          {alert.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {alert.timestamp}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1 truncate group-hover:text-cyan-300 transition-colors">
                        {alert.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Footer */}
          <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              HMWSSB Official Advisory
            </span>
            <button
              onClick={() => onNavigate?.('notifications')}
              className="text-cyan-400 hover:underline font-medium text-xs cursor-pointer"
            >
              Configure alerts &rarr;
            </button>
          </div>
        </motion.div>

      </div>

      {/* ============================================================ */}
      {/* 6. FLOATING AQUABOT AI CHATBOT                               */}
      {/* ============================================================ */}
      <FloatingAIAssistant profile={profile} />

    </div>
  );
};
