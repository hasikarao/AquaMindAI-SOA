import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  ShieldCheck, 
  User, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Waves, 
  Zap, 
  PhoneCall, 
  KeyRound,
  Fingerprint
} from 'lucide-react';
import { CitizenProfile, AppView } from '../types';

interface LoginPageProps {
  onLoginSuccess: (role: 'citizen' | 'admin', profile?: CitizenProfile) => void;
  onNavigateDirect?: (view: AppView) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [authMethod, setAuthMethod] = useState<'can' | 'phone' | 'biometric'>('can');
  const [canNumber, setCanNumber] = useState('HMW-2026-889410');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [password, setPassword] = useState('hydra•secure•2026');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['4', '8', '1', '9']);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const demoCitizen: CitizenProfile = {
    name: 'Arvind Kumar',
    canNumber: 'HMW-2026-889410',
    address: 'Flat 402, Cyber Heights, Sector 2, Kondapur',
    ward: 'Ward 104 - Kondapur & Madhapur',
    wardNumber: 104,
    meterId: 'AM-HYD-9842X',
    connectionType: 'Domestic',
    monthlyQuotaLitres: 20000,
    consumedThisMonthLitres: 12450,
    ecoScore: 92,
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess('citizen', demoCitizen);
      }, 700);
    }, 800);
  };

  const quickFillCitizen = () => {
    setAuthMethod('can');
    setCanNumber('HMW-2026-889410');
    setPassword('••••••••••••');
  };

  return (
    <div id="login-page-root" className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
        
        {/* Left Column: Brand Hero */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          {/* Header badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>GHMC & HMWSSB Citizen Portal</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Hyderabad <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                Citizen Water Portal
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
              Access your daily water supply schedule, report leakages with photo & GPS, track complaints, and book water tankers with real-time ETA.
            </p>
          </div>

          {/* Quick Features Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Water Timing</p>
                <p className="text-[11px] text-slate-400">Live ward countdown</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">Tanker Finder</p>
                <p className="text-[11px] text-slate-400">1-Click emergency booking</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Fill Prompts */}
          <div className="pt-1">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              ⚡ Fast Demo Access (1-Click Fill)
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                id="quick-fill-citizen-btn"
                onClick={quickFillCitizen}
                className="px-3.5 py-2 rounded-xl bg-cyan-950/70 border border-cyan-800/60 hover:border-cyan-500 text-cyan-300 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Login as Arvind Kumar (CAN: 889410)</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Unique Interactive Authentication Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Top glowing ambient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

            {/* Form Title */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Citizen Login</h2>
                  <p className="text-[11px] text-slate-400">Hyderabad Municipal Water Board</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
                Ward 104
              </span>
            </div>

            {/* Auth Sub-methods for Citizens */}
            <div className="flex gap-2 mb-5">
              <button
                type="button"
                id="auth-method-can"
                onClick={() => { setAuthMethod('can'); setOtpSent(false); }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  authMethod === 'can'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                CAN Account No.
              </button>
              <button
                type="button"
                id="auth-method-phone"
                onClick={() => { setAuthMethod('phone'); }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                id="auth-method-biometric"
                onClick={() => { setAuthMethod('biometric'); }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  authMethod === 'biometric'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Biometric ID
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <AnimatePresence mode="wait">
                {authMethod === 'biometric' ? (
                  <motion.div
                    key="biometric-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="py-6 flex flex-col items-center justify-center space-y-3 text-center"
                  >
                    <div 
                      onClick={() => handleLogin()}
                      className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-dashed border-cyan-400 flex items-center justify-center text-cyan-400 hover:scale-105 cursor-pointer transition-transform shadow-lg shadow-cyan-500/20"
                    >
                      <Fingerprint className="w-10 h-10 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-300 font-medium">Touch sensor to verify Aadhaar / WebAuthn token</p>
                    <p className="text-[11px] text-cyan-400">Authenticated for: Arvind Kumar (CAN: 889410)</p>
                  </motion.div>
                ) : authMethod === 'phone' ? (
                  <motion.div
                    key="phone-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Registered Mobile Number
                      </label>
                      <div className="relative">
                        <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <span className="absolute left-9 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">+91</span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="9876543210"
                          className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                      >
                        Send 4-Digit Security OTP
                      </button>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <label className="block text-xs font-medium text-slate-300">Enter OTP Code (Sent via SMS)</label>
                        <div className="flex gap-2 justify-between">
                          {otpCode.map((digit, idx) => (
                            <input
                              key={idx}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => {
                                const newOtp = [...otpCode];
                                newOtp[idx] = e.target.value;
                                setOtpCode(newOtp);
                              }}
                              className="w-12 h-12 text-center text-lg font-bold rounded-xl bg-slate-950 border border-cyan-500/60 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                          ))}
                        </div>
                        <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> OTP Auto-verified from HMWSSB Gateway
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="can-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Consumer Account Number (CAN)
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          id="input-identifier"
                          value={canNumber}
                          onChange={(e) => setCanNumber(e.target.value)}
                          placeholder="e.g. HMW-2026-889410"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Security PIN / Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="password"
                          id="input-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all font-mono"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0" 
                  />
                  <span>Save session on device</span>
                </label>
                <span className="text-cyan-400 font-mono text-[11px]">
                  Ward 104, Kondapur
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                id="btn-login-submit"
                disabled={isLoading || authSuccess}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  authSuccess 
                    ? 'bg-emerald-600 shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/25 active:scale-[0.99]'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : authSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Access Granted! Loading Portal...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Citizen Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Security Token Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit Encrypted Portal
              </span>
              <span className="font-mono text-cyan-400/80">CITIZEN_GATEWAY_SECURE</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
