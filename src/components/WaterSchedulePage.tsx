import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Droplets, 
  MapPin, 
  Bell, 
  BellRing,
  CheckCircle2, 
  AlertTriangle,
  Info,
  Calendar, 
  Check, 
  ShieldCheck, 
  Radio, 
  MessageSquareWarning, 
  Truck, 
  ChevronRight,
  Sparkles,
  Gauge,
  HelpCircle,
  Search
} from 'lucide-react';
import { SupplySchedule, CitizenProfile, AppView } from '../types';

interface WaterSchedulePageProps {
  currentSchedule?: SupplySchedule;
  profile?: CitizenProfile;
  onNavigate?: (view: AppView) => void;
}

interface AreaScheduleData {
  id: string;
  name: string;
  ward: string;
  zone: string;
  todaySupplyTime: string;
  supplyWindow: string;
  duration: string;
  status: 'On Time' | 'Active Now' | 'Delayed' | 'Completed' | 'Scheduled';
  pressure: 'Good' | 'Medium' | 'Low';
  quality: 'Safe to Use' | 'Under Testing';
  frequency: string;
  weeklySchedule: {
    day: string;
    date: string;
    time: string;
    duration: string;
    status: 'Completed' | 'Today' | 'Scheduled' | 'Off-Day';
    pressure: 'Good' | 'Medium' | 'Low' | '-';
  }[];
  notices: {
    id: string;
    type: 'info' | 'maintenance' | 'advisory';
    title: string;
    description: string;
    date: string;
  }[];
}

const areaSchedules: Record<string, AreaScheduleData> = {
  'kondapur': {
    id: 'kondapur',
    name: 'Kondapur & Madhapur',
    ward: 'Ward 104',
    zone: 'Serilingampally Zone, Hyderabad',
    todaySupplyTime: 'Today at 06:30 PM',
    supplyWindow: '06:30 PM – 08:30 PM',
    duration: '2 Hours (Continuous Flow)',
    status: 'On Time',
    pressure: 'Good',
    quality: 'Safe to Use',
    frequency: 'Alternate Days (Mon, Wed, Fri, Sun)',
    weeklySchedule: [
      { day: 'Monday', date: '25 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Tuesday', date: '26 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Wednesday', date: '27 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Today', pressure: 'Good' },
      { day: 'Thursday', date: '28 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Friday', date: '29 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Saturday', date: '30 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Sunday', date: '31 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Scheduled', pressure: 'Good' },
    ],
    notices: [
      {
        id: 'n1',
        type: 'info',
        title: 'Normal Water Supply in Effect',
        description: 'All feeder lines from Osmansagar are operating smoothly with optimal pressure. No disruptions expected today.',
        date: 'Today, 08:00 AM'
      },
      {
        id: 'n2',
        type: 'maintenance',
        title: 'Routine Night Pipeline Inspection',
        description: 'Scheduled maintenance will be conducted between 02:00 AM - 04:00 AM on Thursday. Regular day supply will NOT be affected.',
        date: 'Yesterday'
      },
      {
        id: 'n3',
        type: 'advisory',
        title: 'Emergency Water Tanker Assistance Available',
        description: 'Residents experiencing any sudden localized pressure drop can request rapid water tanker delivery through the portal.',
        date: '2 days ago'
      }
    ]
  },
  'kukatpally': {
    id: 'kukatpally',
    name: 'Kukatpally Housing Board',
    ward: 'Ward 118',
    zone: 'Kukatpally Zone, Hyderabad',
    todaySupplyTime: 'Today at 06:30 PM',
    supplyWindow: '06:30 PM – 08:30 PM',
    duration: '2 Hours (Continuous Flow)',
    status: 'On Time',
    pressure: 'Good',
    quality: 'Safe to Use',
    frequency: 'Alternate Days (Mon, Wed, Fri, Sun)',
    weeklySchedule: [
      { day: 'Monday', date: '25 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Tuesday', date: '26 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Wednesday', date: '27 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Today', pressure: 'Good' },
      { day: 'Thursday', date: '28 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Friday', date: '29 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Saturday', date: '30 Aug', time: 'No Supply Scheduled', duration: '0 Hours', status: 'Off-Day', pressure: '-' },
      { day: 'Sunday', date: '31 Aug', time: '06:30 PM – 08:30 PM', duration: '2 Hours', status: 'Scheduled', pressure: 'Good' },
    ],
    notices: [
      {
        id: 'nk1',
        type: 'info',
        title: 'Manjeera Supply Line Active',
        description: 'Water pressure in Sector 1 & Sector 2 is restored to full optimal flow after valve tuning.',
        date: 'Today, 09:30 AM'
      },
      {
        id: 'nk2',
        type: 'advisory',
        title: 'Rainwater Conservation Advisory',
        description: 'Residents are encouraged to check rooftop rainwater harvesting filters following recent rains in Kukatpally.',
        date: '2 days ago'
      }
    ]
  },
  'gachibowli': {
    id: 'gachibowli',
    name: 'Gachibowli & Financial District',
    ward: 'Ward 105',
    zone: 'Serilingampally Zone, Hyderabad',
    todaySupplyTime: 'Tomorrow at 06:00 AM',
    supplyWindow: '06:00 AM – 07:30 AM',
    duration: '1.5 Hours',
    status: 'Scheduled',
    pressure: 'Good',
    quality: 'Safe to Use',
    frequency: 'Daily Morning',
    weeklySchedule: [
      { day: 'Monday', date: '25 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Tuesday', date: '26 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Wednesday', date: '27 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Today', pressure: 'Good' },
      { day: 'Thursday', date: '28 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Friday', date: '29 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Saturday', date: '30 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Sunday', date: '31 Aug', time: '06:00 AM – 07:30 AM', duration: '1.5 Hours', status: 'Scheduled', pressure: 'Good' },
    ],
    notices: [
      {
        id: 'ng1',
        type: 'info',
        title: 'Daily Morning Supply Stable',
        description: 'Morning schedule is running on time across all blocks in Financial District.',
        date: 'Today, 06:00 AM'
      }
    ]
  },
  'jubilee-hills': {
    id: 'jubilee-hills',
    name: 'Jubilee Hills & Film Nagar',
    ward: 'Ward 95',
    zone: 'Khairatabad Zone, Hyderabad',
    todaySupplyTime: 'Active Now (Ends in 45 min)',
    supplyWindow: '05:00 PM – 07:30 PM',
    duration: '2.5 Hours',
    status: 'Active Now',
    pressure: 'Good',
    quality: 'Safe to Use',
    frequency: 'Daily (Morning & Evening)',
    weeklySchedule: [
      { day: 'Monday', date: '25 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Tuesday', date: '26 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Completed', pressure: 'Good' },
      { day: 'Wednesday', date: '27 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Today', pressure: 'Good' },
      { day: 'Thursday', date: '28 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Friday', date: '29 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Saturday', date: '30 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Scheduled', pressure: 'Good' },
      { day: 'Sunday', date: '31 Aug', time: '05:00 PM – 07:30 PM', duration: '2.5 Hours', status: 'Scheduled', pressure: 'Good' },
    ],
    notices: [
      {
        id: 'nj1',
        type: 'info',
        title: 'Active Supply in Progress',
        description: 'Road No. 36 and Road No. 45 pipelines are actively releasing water.',
        date: 'Today, 05:15 PM'
      }
    ]
  }
};

export const WaterSchedulePage: React.FC<WaterSchedulePageProps> = ({
  onNavigate,
}) => {
  const [selectedAreaKey, setSelectedAreaKey] = useState<string>('kondapur');
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 42,
    seconds: 15,
  });

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
        return { hours: 2, minutes: 42, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num: number) => String(num).padStart(2, '0');

  const currentArea = areaSchedules[selectedAreaKey] || areaSchedules['kondapur'];

  const handleToggleAlert = () => {
    const nextState = !isAlertSubscribed;
    setIsAlertSubscribed(nextState);
    if (nextState) {
      setToastMessage('✅ WhatsApp & SMS alert set 15 minutes before water supply starts!');
    } else {
      setToastMessage('Alerts paused for this area.');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getStatusBadge = (status: AreaScheduleData['status'] | string) => {
    switch (status) {
      case 'On Time':
        return {
          label: 'On Time',
          className: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400'
        };
      case 'Active Now':
        return {
          label: 'Active Now',
          className: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 animate-pulse',
          dot: 'bg-cyan-400 animate-ping'
        };
      case 'Delayed':
        return {
          label: 'Delayed',
          className: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400'
        };
      case 'Completed':
        return {
          label: 'Completed',
          className: 'bg-slate-800/80 border-slate-700 text-slate-400',
          dot: 'bg-slate-500'
        };
      case 'Off-Day':
        return {
          label: 'Off Day',
          className: 'bg-slate-900 border-slate-800 text-slate-500',
          dot: 'bg-slate-600'
        };
      default:
        return {
          label: 'Scheduled',
          className: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
          dot: 'bg-blue-400'
        };
    }
  };

  const statusBadgeInfo = getStatusBadge(currentArea.status);

  return (
    <div id="water-schedule-page-root" className="space-y-6 pb-16 max-w-6xl mx-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-950/95 border border-cyan-500/50 text-cyan-200 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2"
          >
            <BellRing className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Area Selector */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>HMWSSB Water Release Timings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Water Schedule
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Check water supply timings, pressure conditions, quality status, and weekly release schedules for your area.
            </p>
          </div>

          {/* Area Selector Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Select Area:
            </span>
            <select
              id="area-schedule-selector"
              value={selectedAreaKey}
              onChange={(e) => setSelectedAreaKey(e.target.value)}
              className="py-2.5 px-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-white text-xs sm:text-sm font-semibold focus:border-cyan-400 outline-none shadow-md cursor-pointer"
            >
              <option value="kondapur">Kondapur & Madhapur (Ward 104)</option>
              <option value="kukatpally">Kukatpally Housing Board (Ward 118)</option>
              <option value="gachibowli">Gachibowli & Financial Dist (Ward 105)</option>
              <option value="jubilee-hills">Jubilee Hills & Film Nagar (Ward 95)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. HERO CARD: TODAY'S WATER SUPPLY TIME & LIVE COUNTDOWN    */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-cyan-500/30"
      >
        {/* Glow & Ambient elements */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          
          {/* Header Row: Area, Ward & Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white">{currentArea.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-300 text-xs font-semibold border border-slate-800">
                    {currentArea.ward}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {currentArea.zone}
                </p>
              </div>
            </div>

            {/* Status Badge: On Time / Active / Delayed */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm ${statusBadgeInfo.className}`}>
              <span className={`w-2 h-2 rounded-full ${statusBadgeInfo.dot}`} />
              <span>{statusBadgeInfo.label}</span>
            </div>
          </div>

          {/* Center Content: Scheduled Supply Time + Big Digital Countdown Clock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Supply Time & Duration */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Today's Water Supply Time
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentArea.todaySupplyTime}
              </div>
              <div className="p-3 rounded-2xl glass-inner-card border border-slate-800 inline-block">
                <p className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Window: <strong className="text-white">{currentArea.supplyWindow}</strong></span>
                  <span className="text-slate-500">•</span>
                  <span>Duration: <strong className="text-emerald-300">{currentArea.duration}</strong></span>
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Frequency: <span className="text-slate-200 font-medium">{currentArea.frequency}</span>
              </p>
            </div>

            {/* Digital Countdown Box */}
            <div className="p-5 rounded-2xl glass-inner-card border border-cyan-500/25 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                Water Release Starting In
              </span>
              <div className="flex items-center gap-2 font-mono">
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {format2Digits(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Hours</span>
                </div>
                <span className="text-2xl font-bold text-slate-600 mb-4">:</span>
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {format2Digits(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Minutes</span>
                </div>
                <span className="text-2xl font-bold text-slate-600 mb-4">:</span>
                <div className="flex flex-col items-center min-w-[56px]">
                  <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                    {format2Digits(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-widest mt-0.5">Seconds</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row: Remind Me & Confirmation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            <button
              onClick={handleToggleAlert}
              id="water-schedule-remind-btn"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                isAlertSubscribed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isAlertSubscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Reminder Scheduled (15 mins before release)</span>
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4" />
                  <span>Notify Me 15 Mins Before</span>
                </>
              )}
            </button>

            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified by HMWSSB City Distribution Team
            </span>
          </div>

        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 2. FOUR SIMPLE SUMMARY CARDS                                */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Supply Duration */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel flex flex-col justify-between shadow-lg border border-slate-800/80"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Supply Duration
            </span>
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono">
              2 Hours
            </div>
            <p className="text-xs text-cyan-300 font-medium mt-1">
              06:30 PM – 08:30 PM Continuous
            </p>
          </div>
        </motion.div>

        {/* Card 2: Water Pressure */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel flex flex-col justify-between shadow-lg border border-slate-800/80"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Water Pressure
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-400">
                Good
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Optimal Flow
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adequate for sumps & overhead tanks
            </p>
          </div>
        </motion.div>

        {/* Card 3: Water Quality */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel flex flex-col justify-between shadow-lg border border-slate-800/80"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Water Quality
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-blue-300">
                Safe to Use
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                100% Tested
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Potable & certified safe for drinking
            </p>
          </div>
        </motion.div>

        {/* Card 4: Next Notification */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl glass-panel flex flex-col justify-between shadow-lg border border-slate-800/80"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Next Notification
            </span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono">
              Alert Active
            </div>
            <p className="text-xs text-slate-400 mt-1">
              WhatsApp & SMS 15 mins prior
            </p>
          </div>
        </motion.div>

      </div>

      {/* ============================================================ */}
      {/* 3. WEEKLY WATER SCHEDULE TIMELINE                            */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-5 shadow-xl border border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Weekly Water Schedule
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              7-day timetable of water release windows and daily status
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Today's active slot</span>
          </div>
        </div>

        {/* Timeline Grid: 7 Days */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {currentArea.weeklySchedule.map((item) => {
            const isToday = item.status === 'Today';
            const isCompleted = item.status === 'Completed';
            const isOffDay = item.status === 'Off-Day';

            return (
              <div
                key={item.day}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                  isToday
                    ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500'
                    : isCompleted
                      ? 'bg-slate-950/60 border-slate-800/80 opacity-80'
                      : isOffDay
                        ? 'bg-slate-950/40 border-slate-900 text-slate-500'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Subtle top indicator for today */}
                {isToday && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {item.day}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className={`text-xs font-bold ${isOffDay ? 'text-slate-500' : 'text-white'}`}>
                      {item.time}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.duration}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isToday
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : isCompleted
                        ? 'bg-slate-800 text-slate-400'
                        : isOffDay
                          ? 'bg-slate-900 text-slate-600'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.status === 'Today' ? 'Today (Active)' : item.status}
                  </span>

                  {!isOffDay && (
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Pressure: Good
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. AREA NOTICES SECTION                                      */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-4 shadow-xl border border-slate-800">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Area Notices & Advisories</h3>
              <p className="text-xs text-slate-400">Important civic updates for {currentArea.name}</p>
            </div>
          </div>

          <span className="text-xs text-slate-500">Updated today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentArea.notices.map((notice) => (
            <div
              key={notice.id}
              className="p-4 rounded-2xl glass-inner-card border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    notice.type === 'maintenance'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : notice.type === 'advisory'
                        ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {notice.type === 'maintenance' ? 'Maintenance' : notice.type === 'advisory' ? 'Advisory' : 'Notice'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{notice.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white pt-1">{notice.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>HMWSSB Official Notification</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. QUICK ACTIONS                                             */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Quick Actions
          </h3>
          <span className="text-xs text-slate-500">Citizen Service Tools</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Action 1: Report Leakage */}
          <button
            type="button"
            id="schedule-action-leakage"
            onClick={() => onNavigate?.('leakage-reporting')}
            className="p-5 rounded-3xl glass-panel hover:border-cyan-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Radio className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-bold text-white">Report Leakage</h4>
              <p className="text-xs text-slate-400 mt-0.5">Upload photo & GPS tag</p>
            </div>
          </button>

          {/* Action 2: Raise Complaint */}
          <button
            type="button"
            id="schedule-action-complaints"
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
              <h4 className="text-sm font-bold text-white">Raise Complaint</h4>
              <p className="text-xs text-slate-400 mt-0.5">24-Hr SLA grievance status</p>
            </div>
          </button>

          {/* Action 3: Find Water Tanker */}
          <button
            type="button"
            id="schedule-action-tanker"
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
              <h4 className="text-sm font-bold text-white">Find Water Tanker</h4>
              <p className="text-xs text-slate-400 mt-0.5">1-Click GPS booking</p>
            </div>
          </button>

          {/* Action 4: Manage Notifications */}
          <button
            type="button"
            id="schedule-action-notifications"
            onClick={() => onNavigate?.('notifications')}
            className="p-5 rounded-3xl glass-panel hover:border-blue-500/60 transition-all text-left group flex flex-col justify-between shadow-lg hover:shadow-blue-500/10 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-bold text-white">Manage Notifications</h4>
              <p className="text-xs text-slate-400 mt-0.5">Configure SMS & WhatsApp</p>
            </div>
          </button>

        </div>
      </div>

    </div>
  );
};
