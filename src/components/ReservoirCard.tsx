import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, ArrowDownRight, ArrowUpRight, AlertTriangle, CheckCircle, MapPin, Layers, Info } from 'lucide-react';
import { ReservoirData } from '../types';

interface ReservoirCardProps {
  reservoirs: ReservoirData[];
}

export const ReservoirCard: React.FC<ReservoirCardProps> = ({ reservoirs }) => {
  const [selectedId, setSelectedId] = useState<string>(reservoirs[0].id);

  const activeReservoir = reservoirs.find((r) => r.id === selectedId) || reservoirs[0];

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
      {/* Header with Reservoir Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">City Water Storage Reservoirs</h3>
            <p className="text-xs text-slate-400">Live Storage Levels & Capacity</p>
          </div>
        </div>

        {/* Quick Tabs for Reservoirs */}
        <div className="flex flex-wrap gap-1 p-1 rounded-2xl glass-inner-card border border-slate-800">
          {reservoirs.map((res) => (
            <button
              key={res.id}
              onClick={() => setSelectedId(res.id)}
              id={`tab-reservoir-${res.id}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedId === res.id
                  ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {res.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual: Liquid Level Column & Telemetry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        {/* Left: Interactive Animated Liquid Reservoir Tank (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl glass-inner-card">
          <div className="relative w-28 h-48 sm:w-32 sm:h-52 rounded-2xl border-2 border-slate-700 bg-slate-950 overflow-hidden shadow-inner flex flex-col justify-end">
            {/* Level Ruler Markings */}
            <div className="absolute inset-y-0 right-1.5 flex flex-col justify-between py-2 text-[9px] font-mono text-slate-500 pointer-events-none select-none z-20">
              <span>FTL 100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Liquid Fill with Dynamic Wave Animation */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${activeReservoir.percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full relative bg-gradient-to-t from-blue-700 via-cyan-600 to-cyan-400 overflow-hidden"
            >
              {/* Wave Surface effect */}
              <div className="absolute -top-3 left-0 w-[200%] h-6 opacity-80 animate-water-wave">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-cyan-200">
                  <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
                </svg>
              </div>
              <div className="absolute -top-2 left-0 w-[200%] h-5 opacity-60 animate-water-wave-slow">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-white">
                  <path d="M0,0 C200,60 400,-20 600,40 C800,100 1000,20 1200,50 L1200,120 L0,120 Z" />
                </svg>
              </div>
            </motion.div>

            {/* Float Overlay Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-mono">
                {activeReservoir.percentage}%
              </span>
              <span className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider drop-shadow">
                Capacity
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-white mt-3 text-center">{activeReservoir.name}</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {activeReservoir.location}
          </span>
        </div>

        {/* Right: Telemetry Grid & Inflow/Outflow Balance (8 cols) */}
        <div className="md:col-span-8 space-y-4">
          {/* Status & FTL Comparison */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl glass-inner-card">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Water Level</span>
              <div className="text-lg sm:text-xl font-extrabold text-white font-mono mt-0.5">
                {activeReservoir.currentLevelFeet} <span className="text-xs text-cyan-400 font-normal">ft</span>
              </div>
              <span className="text-[10px] text-slate-500">FTL: {activeReservoir.fullTankLevelFeet} ft</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-inner-card">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Live Storage</span>
              <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono mt-0.5">
                {activeReservoir.currentStorageTMC} <span className="text-xs text-cyan-400 font-normal">TMC</span>
              </div>
              <span className="text-[10px] text-slate-500">Total Cap: {activeReservoir.capacityTMC} TMC</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl glass-inner-card flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Catchment Status</span>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  activeReservoir.status === 'Surge Alert'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {activeReservoir.status === 'Surge Alert' ? (
                    <AlertTriangle className="w-3 h-3" />
                  ) : (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {activeReservoir.status}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Hydraulic gates steady</span>
            </div>
          </div>

          {/* Inflow vs Outflow Rate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl glass-inner-card border border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                  Monsoon Inflow Rate
                </span>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  {activeReservoir.inflowCusecs.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Cusecs</span>
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                +
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-inner-card border border-cyan-500/20 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  Municipal Outflow Dispatch
                </span>
                <p className="text-xl font-bold text-white font-mono mt-1">
                  {activeReservoir.outflowCusecs.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Cusecs</span>
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold">
                -
              </div>
            </div>
          </div>

          {/* Mini Insights Banner */}
          <div className="p-3 rounded-2xl glass-inner-card border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Sufficient storage to supply Hyderabad metropolitan area for <strong className="text-white">280+ days</strong>.</span>
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:inline font-mono">HMWSSB Dam Division</span>
          </div>
        </div>
      </div>
    </div>
  );
};
