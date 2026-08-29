import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Droplets, 
  Gauge, 
  ShieldCheck, 
  Bell, 
  BellRing, 
  Sparkles, 
  Zap, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { SupplySchedule } from '../types';

interface SupplyCountdownCardProps {
  schedule: SupplySchedule;
}

export const SupplyCountdownCard: React.FC<SupplyCountdownCardProps> = ({ schedule }) => {
  // Live Countdown logic
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 42,
    seconds: 35,
  });
  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
        return { hours: 2, minutes: 45, seconds: 0 }; // Loop for demo
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleAlert = () => {
    setIsAlertEnabled(!isAlertEnabled);
    if (!isAlertEnabled) {
      setAlertMessage('Automated SMS & WhatsApp alert scheduled 15 mins before release!');
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  const format2Digits = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
      {/* Top Banner & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Next Water Supply Release</h3>
            <p className="text-xs text-slate-400">{schedule.wardName} • {schedule.area}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            On Schedule
          </span>
        </div>
      </div>

      {/* Main Countdown Visual Block */}
      <div className="py-6 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          Release Commencing In
        </span>

        {/* 3-Part Digital Clock Display */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl glass-inner-card flex items-center justify-center shadow-lg border border-white/5">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white">
                {format2Digits(timeLeft.hours)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 font-sans font-semibold uppercase tracking-wider">Hours</span>
          </div>

          <span className="text-2xl sm:text-3xl font-bold text-slate-600 mb-6">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl glass-inner-card flex items-center justify-center shadow-lg border border-white/5">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white">
                {format2Digits(timeLeft.minutes)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 font-sans font-semibold uppercase tracking-wider">Minutes</span>
          </div>

          <span className="text-2xl sm:text-3xl font-bold text-slate-600 mb-6">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl glass-inner-card flex items-center justify-center shadow-lg border border-cyan-500/20">
              <span className="text-3xl sm:text-4xl font-mono font-black text-cyan-400">
                {format2Digits(timeLeft.seconds)}
              </span>
            </div>
            <span className="text-[10px] text-cyan-400 mt-2 font-sans font-semibold uppercase tracking-wider">Seconds</span>
          </div>
        </div>

        {/* Expected Supply Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-6 pt-5 border-t border-slate-800 text-left">
          <div className="p-3.5 rounded-2xl glass-inner-card">
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Est. Volume</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono">{schedule.expectedVolumeLitres} <span className="text-xs text-cyan-400 font-normal">Litres</span></span>
          </div>

          <div className="p-3.5 rounded-2xl glass-inner-card">
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Line Pressure</span>
            <span className="text-base sm:text-lg font-bold text-cyan-400 font-mono flex items-center gap-1">
              <Gauge className="w-4 h-4 text-cyan-400" />
              {schedule.expectedPressureBar} bar
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-inner-card">
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Water TDS</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              {schedule.waterQualityTDS} PPM
            </span>
          </div>

          <div className="p-3.5 rounded-2xl glass-inner-card">
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">pH Level</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono">{schedule.waterQualityPH} pH</span>
          </div>
        </div>

        {/* Notification toggle button */}
        <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleToggleAlert}
            id="countdown-alert-toggle-btn"
            className={`w-full sm:w-auto px-4 py-2 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAlertEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'glass-inner-card hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {isAlertEnabled ? (
              <>
                <BellRing className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>Alerts Armed for This Release</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-cyan-400" />
                <span>Notify me 15 mins before release</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-slate-400">
            Duration: <span className="text-slate-200 font-semibold">{schedule.targetDurationMinutes} mins continuous</span>
          </span>
        </div>

        {/* Dynamic Toast Feedback */}
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{alertMessage}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
