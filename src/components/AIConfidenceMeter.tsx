import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, Info, CheckCircle2, Shield, TrendingUp } from 'lucide-react';

interface AIConfidenceMeterProps {
  confidencePercentage: number;
}

export const AIConfidenceMeter: React.FC<AIConfidenceMeterProps> = ({ confidencePercentage = 96.4 }) => {
  const [showInfo, setShowInfo] = useState(false);

  // SVG Circular Gauge Math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidencePercentage / 100) * circumference;

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Dispatch Confidence</h3>
            <p className="text-[10px] text-slate-400">Neural Hydraulic Forecast</p>
          </div>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          id="ai-confidence-info-toggle"
          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 transition-colors"
          title="Explain Neural Confidence Weights"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Main Circular Gauge & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-4">
        {/* SVG Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(51, 65, 85, 0.4)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Dynamic Animated Gradient Progress Ring */}
            <defs>
              <linearGradient id="cyanProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#cyanProgressGrad)"
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-white font-mono tracking-tight">
              {confidencePercentage}%
            </span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Optimal
            </span>
          </div>
        </div>

        {/* Neural Decision Factors */}
        <div className="space-y-2 text-xs w-full sm:w-auto">
          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl glass-inner-card">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
              <Activity className="w-3 h-3 text-cyan-400" />
              Pressure Stability
            </span>
            <span className="font-mono font-bold text-cyan-300">99.2%</span>
          </div>

          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl glass-inner-card">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3 h-3 text-teal-400" />
              Runoff Model
            </span>
            <span className="font-mono font-bold text-teal-300">97.8%</span>
          </div>

          <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl glass-inner-card">
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium">
              <Shield className="w-3 h-3 text-blue-400" />
              Anomaly Shield
            </span>
            <span className="font-mono font-bold text-blue-300">95.1%</span>
          </div>
        </div>
      </div>

      {/* Bottom explanation snippet */}
      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
          <Zap className="w-3 h-3 text-cyan-400" />
          Autonomous Zero-Spike Tuning
        </span>
        <span className="text-slate-500 text-[10px] uppercase font-mono">Synced 30s ago</span>
      </div>

      {/* Expandable info card */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-[11px] text-slate-300 space-y-1"
        >
          <p className="font-semibold text-cyan-300">How does AquaMind AI calculate confidence?</p>
          <p className="text-slate-300 leading-relaxed">
            Our predictive model fuses weather rainfall radar over Musi-Godavari catchments, 
            water flow levels at Gandipet, and historical consumption patterns for your ward.
          </p>
        </motion.div>
      )}
    </div>
  );
};
