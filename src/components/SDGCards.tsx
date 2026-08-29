import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Building2, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  TrendingDown, 
  Waves, 
  Radio, 
  ArrowUpRight 
} from 'lucide-react';

export const SDGCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'sdg6' | 'sdg11'>('all');

  return (
    <section className="py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Global Goals • Local Action
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Aligned with UN Sustainable Development Goals
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            AquaMind AI empowers Hyderabad's urban infrastructure through automated leak mitigation, 
            fair water ration quotas, and climate-resilient reservoir telemetry.
          </p>
        </div>

        {/* SDG 6 & SDG 11 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SDG 6: Clean Water and Sanitation */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden group border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* SDG 6 Header & Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#00AED9] p-2 flex flex-col items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                    <span className="text-[10px] font-black tracking-tighter uppercase leading-none">SDG</span>
                    <span className="text-2xl font-black leading-none">6</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Target 6.1 & 6.4</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Clean Water & Sanitation</h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Universal Equity
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Ensuring safe, affordable, and equal water access for all 150 GHMC municipal wards through automated pressure governance and end-to-end contamination detection.
              </p>

              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-inner-card border border-slate-800">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Acoustic AI Leak Detection</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Identifies micro-fractures in underground pipelines within 3.2 minutes, curbing 42.8 MLD in physical losses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-inner-card border border-slate-800">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Autonomous TDS & Chlorine Guard</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Real-time potability telemetry across Gandipet, Asifnagar, and Moulali treatment plants.</p>
                  </div>
                </div>
              </div>

              {/* Progress metric footer */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-slate-400">Hyderabad NRW Reduction Target:</span>
                <span className="font-mono font-bold text-cyan-300">45% → 12% by 2028</span>
              </div>
            </div>
          </motion.div>

          {/* SDG 11: Sustainable Cities and Communities */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden group border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* SDG 11 Header & Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FD9D24] p-2 flex flex-col items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <span className="text-[10px] font-black tracking-tighter uppercase leading-none">SDG</span>
                    <span className="text-2xl font-black leading-none">11</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Target 11.B & 11.5</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Sustainable Cities & Smart Grids</h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Urban Resilience
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Building climate-resilient water infrastructure that buffers Hyderabad against monsoon flooding while optimizing dry-season reservoir drawdown for 10 million citizens.
              </p>

              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-inner-card border border-slate-800">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Neural Catchment Inflow Modeling</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Hydrological AI forecasts Osmansagar & Himayatsagar runoff 48 hours ahead of heavy rainfall.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl glass-inner-card border border-slate-800">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 mt-0.5">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Equitable Ward Distribution</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Smart flow balancing eliminates tail-end pressure drops in elevated sectors of Jubilee Hills and Kukatpally.</p>
                  </div>
                </div>
              </div>

              {/* Progress metric footer */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-slate-400">Carbon & Energy Optimization:</span>
                <span className="font-mono font-bold text-teal-300">28% Pump kWh Saved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
