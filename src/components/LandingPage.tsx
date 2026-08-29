import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Waves, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Layers, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { DropletHero } from './DropletHero';
import { SDGCards } from './SDGCards';

interface LandingPageProps {
  onEnterCitizenDashboard: () => void;
  onOpenAdminLogin: () => void;
  onOpenCitizenLoginModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterCitizenDashboard,
  onOpenAdminLogin,
  onOpenCitizenLoginModal,
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Animated Water Droplet Hero */}
      <DropletHero
        onEnterCitizenDashboard={onEnterCitizenDashboard}
        onOpenAdminLogin={onOpenAdminLogin}
        onOpenCitizenLoginModal={onOpenCitizenLoginModal}
      />

      {/* 2. UN SDG 6 & SDG 11 Feature Cards */}
      <SDGCards />

      {/* 3. Smart Grid Hyderabad Architectural Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden border border-cyan-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Cpu className="w-3.5 h-3.5" />
                Hyderabad Metropolitan Smart Water Engine
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                How AquaMind AI Solves Water Inequality
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Designed to eliminate the disparity between high-pressure IT corridors and water-stressed neighborhoods across Hyderabad.
              </p>
            </div>

            {/* 3 Architectural Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Equal Distribution Engine</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Predicts demand curves for 150 GHMC wards and balances municipal distribution to ensure fair pressure across all neighborhoods.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Acoustic Leak Pinpointing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  IoT acoustic vibration sensors flag underground hairline cracks within 3.2 minutes, curbing 42.8 MLD in non-revenue water (NRW) losses.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-white">Citizen Transparency Portal</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gives households live release countdown timers, real-time TDS purity indices, Dial-a-Tanker tracking, and automated conservation rebates.
                </p>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tested against historical HMWSSB telemetry for Kondapur, Madhapur, & Jubilee Hills.</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnterCitizenDashboard}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Interactive Citizen Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 text-center text-xs text-slate-500 space-y-2">
        <p className="font-semibold text-slate-400">
          AquaMind AI • Smart Water Grid Management System
        </p>
        <p>
          Data for Greater Hyderabad Municipal Corporation (GHMC) & Hyderabad Metropolitan Water Supply and Sewerage Board (HMWSSB).
        </p>
      </footer>
    </div>
  );
};
