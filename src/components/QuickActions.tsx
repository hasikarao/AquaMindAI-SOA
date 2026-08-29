import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  AlertOctagon, 
  Truck, 
  TestTube2, 
  Award, 
  X, 
  CheckCircle2, 
  MapPin, 
  Camera, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  Droplet 
} from 'lucide-react';
import { CitizenProfile } from '../types';

interface QuickActionsProps {
  profile: CitizenProfile;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ profile }) => {
  const [activeModal, setActiveModal] = useState<'leak' | 'tanker' | 'test' | 'pledge' | null>(null);

  // Leak state
  const [leakLocation, setLeakLocation] = useState('100 Feet Road, Near Madhapur Metro Pillar 12');
  const [leakSeverity, setLeakSeverity] = useState('Medium Gush (Surface Spill)');
  const [leakDescription, setLeakDescription] = useState('Continuous clean water flow from underground joint valve near crossroad.');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [leakSubmitted, setLeakSubmitted] = useState(false);

  // Tanker state
  const [tankerCapacity, setTankerCapacity] = useState('5,000 Litres (Standard Domestic)');
  const [deliverySlot, setDeliverySlot] = useState('Today • 04:00 PM - 06:00 PM');
  const [tankerBooked, setTankerBooked] = useState(false);

  // Test kit state
  const [testKitBooked, setTestKitBooked] = useState(false);

  // Pledge state
  const [pledgeTaken, setPledgeTaken] = useState(false);

  const handleReportLeak = (e: React.FormEvent) => {
    e.preventDefault();
    setLeakSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setLeakSubmitted(false);
      setActiveModal(null);
    }, 2800);
  };

  const handleBookTanker = (e: React.FormEvent) => {
    e.preventDefault();
    setTankerBooked(true);
    setTimeout(() => {
      setTankerBooked(false);
      setActiveModal(null);
    }, 2800);
  };

  const handleBookTestKit = (e: React.FormEvent) => {
    e.preventDefault();
    setTestKitBooked(true);
    setTimeout(() => {
      setTestKitBooked(false);
      setActiveModal(null);
    }, 2500);
  };

  const handleTakePledge = () => {
    setPledgeTaken(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#06B6D4', '#38BDF8', '#10B981', '#F59E0B'],
    });
  };

  return (
    <>
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Citizen Quick Actions</h3>
              <p className="text-xs text-slate-400">Interactive Hyderabad Water Utilities & Services</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
            Avg. Dispatch: 18m
          </span>
        </div>

        {/* 4 Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
          {/* Action 1: Report Leak */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('leak')}
            id="quick-action-report-leak"
            className="p-4.5 rounded-2xl glass-inner-card hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 text-left transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-rose-400 uppercase bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
                AI Tagged
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
              Report Pipeline Leak
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              Upload location and details for rapid repair team dispatch.
            </p>
          </motion.button>

          {/* Action 2: Dial a Tanker */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('tanker')}
            id="quick-action-dial-tanker"
            className="p-4.5 rounded-2xl glass-inner-card hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-cyan-300 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                HMWSSB
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              Request Water Tanker
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              Instant online booking with GPS driver tracker and subsidized CAN rate.
            </p>
          </motion.button>

          {/* Action 3: Quality Test Kit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('test')}
            id="quick-action-test-kit"
            className="p-4.5 rounded-2xl glass-inner-card hover:bg-slate-800/80 border border-slate-800 hover:border-teal-500/40 text-left transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                <TestTube2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-teal-300 uppercase bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                Free Kit
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
              Water Quality Test
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              Order free doorstep TDS, pH, and bacterial test strip by Jal Mitra.
            </p>
          </motion.button>

          {/* Action 4: Conservation Pledge */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('pledge')}
            id="quick-action-conservation-pledge"
            className="p-4.5 rounded-2xl glass-inner-card hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-left transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                +10 EcoScore
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              Jal Samrakshak Pledge
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              Join 45,000+ Hyderabad households pledging water efficiency certificate.
            </p>
          </motion.button>
        </div>
      </div>

      {/* MODAL 1: REPORT LEAK */}
      <AnimatePresence>
        {activeModal === 'leak' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Report Water Pipeline Leak</h3>
                    <p className="text-xs text-slate-400">Dispatches local HMWSSB repair unit</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {leakSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Incident Logged: #HYD-LK-8942</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your report has been received and sent to the local maintenance division. A repair team has been notified.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportLeak} className="space-y-4 pt-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">
                      Hyderabad Location / Landmark (GPS Synced)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={leakLocation}
                        onChange={(e) => setLeakLocation(e.target.value)}
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white outline-none focus:border-cyan-400 transition-colors"
                      />
                      <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Leak Intensity</label>
                      <select
                        value={leakSeverity}
                        onChange={(e) => setLeakSeverity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white outline-none focus:border-cyan-400"
                      >
                        <option value="Minor Dripping / Seepage">Minor Dripping / Seepage</option>
                        <option value="Medium Gush (Surface Spill)">Medium Gush (Surface Spill)</option>
                        <option value="Severe Main Pipeline Burst">Severe Main Pipeline Burst</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Upload Photo (Simulated)</label>
                      <button
                        type="button"
                        onClick={() => setHasPhoto(!hasPhoto)}
                        className={`w-full py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-1.5 transition-all ${
                          hasPhoto
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        {hasPhoto ? 'Photo Attached ✓' : 'Attach Photo'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Notes for Repair Team</label>
                    <textarea
                      rows={2}
                      value={leakDescription}
                      onChange={(e) => setLeakDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-2xl bg-slate-950/80 border border-slate-700 text-white outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Dispatch Emergency Acoustic Squad</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: TANKER BOOKING */}
      <AnimatePresence>
        {activeModal === 'tanker' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">HMWSSB Dial-a-Tanker FastTrack</h3>
                    <p className="text-xs text-slate-400">Delivered directly to {profile.address}</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {tankerBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 mx-auto flex items-center justify-center">
                    <Truck className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Tanker Dispatched: #TK-HYD-5021</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Driver: <strong>Ramesh V. (TS-09-UB-4491)</strong> • Scheduled Arrival: Today at 04:30 PM.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTanker} className="space-y-4 pt-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Tanker Capacity</label>
                    <select
                      value={tankerCapacity}
                      onChange={(e) => setTankerCapacity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="5,000 Litres (Standard Domestic)">5,000 Litres (Domestic Subsidized ₹500)</option>
                      <option value="10,000 Litres (Apartment / High Density)">10,000 Litres (Commercial / Multi-Unit ₹900)</option>
                      <option value="20,000 Litres (Emergency Bulk)">20,000 Litres (Bulk Feeder ₹1600)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Delivery Time Slot</label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="Today • 04:00 PM - 06:00 PM">Today • 04:00 PM - 06:00 PM (Express Slot)</option>
                      <option value="Today • 07:00 PM - 09:00 PM">Today • 07:00 PM - 09:00 PM</option>
                      <option value="Tomorrow • 06:00 AM - 08:00 AM">Tomorrow • 06:00 AM - 08:00 AM (Early Morning)</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 text-slate-300 flex items-center justify-between">
                    <span className="text-slate-400">Subsidized CAN Billing:</span>
                    <span className="font-mono font-bold text-cyan-300">Auto-billed to {profile.canNumber}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Confirm Tanker Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: QUALITY TEST KIT */}
      <AnimatePresence>
        {activeModal === 'test' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <TestTube2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Free Water Potability Test Kit</h3>
                    <p className="text-xs text-slate-400">Doorstep Jal Mitra volunteer delivery</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {testKitBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Test Kit Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    A Kondapur Jal Mitra volunteer will deliver the 5-in-1 chemical analysis strip to {profile.address} tomorrow morning.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTestKit} className="space-y-4 pt-4 text-xs">
                  <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 space-y-2">
                    <p className="font-semibold text-white">What does the AquaMind Kit Test?</p>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      <li>Total Dissolved Solids (TDS PPM)</li>
                      <li>pH Alkalinity (Optimal 6.5 - 8.5)</li>
                      <li>Free Residual Chlorine Content</li>
                      <li>Bacterial Contamination Turbidity</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Request Free Doorstep Test Kit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: JAL SAMRAKSHAK PLEDGE */}
      <AnimatePresence>
        {activeModal === 'pledge' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Hyderabad Jal Samrakshak Pledge</h3>
                    <p className="text-xs text-slate-400">Hyderabad Smart Water Conservation Initiative</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-4 space-y-4 text-xs">
                {/* Official Digital Certificate Preview */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 text-center relative overflow-hidden shadow-xl">
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-amber-400 uppercase border border-amber-500/30 px-2 py-0.5 rounded">
                    HYD-2026-CERT
                  </div>
                  <Droplet className="w-8 h-8 text-cyan-400 mx-auto mb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                    Certificate of Water Stewardship
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">{profile.name}</h3>
                  <p className="text-slate-300 text-[11px] mt-1 max-w-xs mx-auto">
                    Recognized for conserving water in <strong className="text-cyan-300">{profile.ward}</strong> and maintaining an EcoScore of {profile.ecoScore}/100.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>HMWSSB Hyderabad</span>
                    <span>AquaMind AI Verified</span>
                  </div>
                </div>

                {!pledgeTaken ? (
                  <button
                    onClick={handleTakePledge}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer text-sm transition-all"
                  >
                    <span>I Pledge to Save 50L Daily & Claim Badge</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-semibold">
                    ✓ Pledge Registered! +10 EcoScore credited to your CAN account.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
