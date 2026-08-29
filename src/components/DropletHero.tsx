import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Layers, 
  Activity, 
  Gauge, 
  MapPin, 
  CheckCircle2, 
  Zap,
  TrendingDown
} from 'lucide-react';

interface DropletHeroProps {
  onEnterCitizenDashboard: () => void;
  onOpenAdminLogin?: () => void;
  onOpenCitizenLoginModal: () => void;
}

export const DropletHero: React.FC<DropletHeroProps> = ({
  onEnterCitizenDashboard,
  onOpenCitizenLoginModal,
}) => {
  const [activeRipple, setActiveRipple] = useState(0);
  const [simulatedPressure, setSimulatedPressure] = useState(2.35);
  const [recoveredWater, setRecoveredWater] = useState(42.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPressure((prev) => +(prev + (Math.random() * 0.08 - 0.04)).toFixed(2));
      setRecoveredWater((prev) => +(prev + 0.01).toFixed(2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDropletClick = () => {
    setActiveRipple((prev) => prev + 1);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Cyber Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Banner Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-white">Smart Water Grid Management Platform</span>
            <span className="text-cyan-500">|</span>
            <span className="text-cyan-300/90 hidden sm:inline">GHMC & HMWSSB Hyderabad</span>
          </div>
        </motion.div>

        {/* Hero Grid: Left Content, Right Interactive Droplet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Autonomous Urban Water Grid Engine
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Intelligent Water Distribution for{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent underline decoration-cyan-500/30">
                  Hyderabad City
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                AquaMind AI transforms municipal supply through predictive neural dispatch, 
                acoustic pipeline leak detection, and real-time reservoir balancing for <span className="text-cyan-300 font-semibold">Osmansagar, Himayatsagar & Singur</span> networks.
              </p>
            </div>

            {/* Metric Highlights Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-2">
              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Non-Revenue Water</span>
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">{recoveredWater} <span className="text-xs text-cyan-400 font-normal">MLD</span></div>
                <p className="text-[10px] text-emerald-400 mt-0.5">↓ 34% NRW Loss</p>
              </div>

              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">AI Inflow Accuracy</span>
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">96.4%</div>
                <p className="text-[10px] text-cyan-300 mt-0.5">Neural Forecast</p>
              </div>

              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Grid Balance</span>
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">{simulatedPressure} <span className="text-xs text-cyan-400 font-normal">bar</span></div>
                <p className="text-[10px] text-emerald-400 mt-0.5">● Stable Flow</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEnterCitizenDashboard}
                id="hero-citizen-dashboard-btn"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Enter Citizen Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={onOpenCitizenLoginModal}
                id="hero-citizen-account-btn"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-inner-card hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Switch Consumer Account</span>
              </button>
            </div>

            {/* Citizen verification shortcut */}
            <p className="text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Hyderabad Water Board Citizen Portal • 24x7 Support (155313)</span>
            </p>
          </motion.div>

          {/* Right Column: 3D-Styled Animated Water Droplet Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Concentric Pulsing Cyber Target Rings */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center select-none">
              <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-dashed border-cyan-400/25 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-blue-500/20" />
              <div className="absolute inset-24 rounded-full bg-cyan-500/5 backdrop-blur-sm" />

              {/* Clickable Animated Water Droplet Centerpiece */}
              <motion.div
                onClick={handleDropletClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="relative z-20 cursor-pointer flex flex-col items-center justify-center group"
                id="interactive-water-droplet"
                title="Click to trigger water grid pressure pulse"
              >
                {/* Outer Glow Halo */}
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-b from-cyan-400/30 to-blue-600/30 blur-2xl group-hover:blur-3xl transition-all" />

                {/* Layered Water Droplet SVG */}
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 100 140" 
                    className="w-full h-full drop-shadow-[0_0_25px_rgba(6,182,212,0.7)]"
                  >
                    <defs>
                      <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#06B6D4" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#0284C7" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#082F49" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="innerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="dropletClip">
                        <path d="M50 5 C50 5 15 65 15 95 C15 115 30 135 50 135 C70 135 85 115 85 95 C85 65 50 5 50 5 Z" />
                      </clipPath>
                    </defs>

                    {/* Droplet Outline & Base Body */}
                    <path
                      d="M50 5 C50 5 15 65 15 95 C15 115 30 135 50 135 C70 135 85 115 85 95 C85 65 50 5 50 5 Z"
                      fill="url(#dropletGradient)"
                      stroke="#67E8F9"
                      strokeWidth="1.5"
                    />

                    {/* Animated Liquid Wave Inside Droplet */}
                    <g clipPath="url(#dropletClip)">
                      <rect x="0" y="0" width="100" height="140" fill="#0C4A6E" opacity="0.4" />
                      
                      {/* Water Wave Layer 1 */}
                      <path
                        d="M -50 75 Q -25 65 0 75 T 50 75 T 100 75 T 150 75 L 150 140 L -50 140 Z"
                        fill="#06B6D4"
                        opacity="0.6"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          from="0,0"
                          to="50,0"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Water Wave Layer 2 */}
                      <path
                        d="M -50 82 Q -25 90 0 82 T 50 82 T 100 82 T 150 82 L 150 140 L -50 140 Z"
                        fill="#38BDF8"
                        opacity="0.8"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          from="0,0"
                          to="-50,0"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Hydro-Particles Bubble float */}
                      <circle cx="40" cy="110" r="2.5" fill="#E0F2FE" opacity="0.8">
                        <animate attributeName="cy" from="125" to="70" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.9;0" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="60" cy="100" r="1.8" fill="#E0F2FE" opacity="0.8">
                        <animate attributeName="cy" from="130" to="75" dur="3.1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="3.1s" repeatCount="indefinite" />
                      </circle>
                    </g>

                    {/* Specular Highlight Gloss */}
                    <path
                      d="M 35 30 C 25 50 22 75 25 95"
                      stroke="url(#innerGlow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>

                  {/* Micro-Label Over Droplet */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-12">
                    <Droplets className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="text-[11px] font-extrabold text-white tracking-widest uppercase mt-1 drop-shadow">
                      H₂O AI
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-cyan-300 font-mono mt-2 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Click to Test Pulse ⚡
                </span>
              </motion.div>

              {/* Orbiting Telemetry Pills */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-0 sm:-left-4 z-30 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Gandipet Catchment</p>
                  <p className="text-xs font-bold text-cyan-300">93.6% FTL Full</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-4 right-0 sm:-right-4 z-30 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  <Gauge className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">TDS Potability</p>
                  <p className="text-xs font-bold text-emerald-400">135 PPM (Optimal)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
