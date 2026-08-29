import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, ArrowRight, Sparkles } from 'lucide-react';
import { CitizenProfile } from '../types';

interface LoginModalsProps {
  isCitizenModalOpen: boolean;
  isAdminModalOpen?: boolean;
  onCloseCitizenModal: () => void;
  onCloseAdminModal?: () => void;
  onCitizenLoginSuccess: (customProfile?: Partial<CitizenProfile>) => void;
  onAdminLoginSuccess?: () => void;
}

export const LoginModals: React.FC<LoginModalsProps> = ({
  isCitizenModalOpen,
  onCloseCitizenModal,
  onCitizenLoginSuccess,
}) => {
  // Citizen Form state
  const [canNumber, setCanNumber] = useState('HMW-2026-889410');
  const [selectedWard, setSelectedWard] = useState('Ward 104 - Kondapur & Madhapur');
  const [otp, setOtp] = useState('8894');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onCitizenLoginSuccess({
        canNumber,
        ward: selectedWard,
      });
    }, 600);
  };

  return (
    <>
      {/* Citizen Login Modal */}
      <AnimatePresence>
        {isCitizenModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-700 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Citizen Water Portal</h3>
                    <p className="text-xs text-slate-400">HMWSSB Consumer Switcher</p>
                  </div>
                </div>
                <button
                  onClick={onCloseCitizenModal}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCitizenSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Consumer Account Number (CAN)
                  </label>
                  <input
                    type="text"
                    value={canNumber}
                    onChange={(e) => setCanNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 focus:border-cyan-400 text-sm text-cyan-200 font-mono transition-all outline-none"
                    placeholder="e.g. HMW-2026-889410"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Found on your GHMC water bill or smart meter.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Your Municipal Ward
                  </label>
                  <select
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 focus:border-cyan-400 text-sm text-white transition-all outline-none"
                  >
                    <option value="Ward 104 - Kondapur & Madhapur">Ward 104 - Kondapur & Madhapur</option>
                    <option value="Ward 98 - Jubilee Hills">Ward 98 - Jubilee Hills</option>
                    <option value="Ward 84 - Banjara Hills">Ward 84 - Banjara Hills</option>
                    <option value="Ward 112 - Gachibowli & Financial District">Ward 112 - Gachibowli & Financial District</option>
                    <option value="Ward 65 - Kukatpally & KPHB">Ward 65 - Kukatpally & KPHB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mobile OTP (Mock: 8894)
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 focus:border-cyan-400 text-sm font-mono text-center tracking-widest text-cyan-300 transition-all outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Verifying with HMWSSB...
                    </span>
                  ) : (
                    <>
                      <span>Open Citizen Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 text-xs text-cyan-300 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="leading-relaxed">Demo Mode: 1-click login ready with mock Hyderabad citizen profile data.</span>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
