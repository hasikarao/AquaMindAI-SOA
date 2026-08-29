import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Droplet, 
  Truck, 
  Award, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  Navigation, 
  Clock, 
  MapPin, 
  Send, 
  TrendingDown, 
  Sparkles, 
  Activity 
} from 'lucide-react';
import { mockCitizenGrievances, mockTankerBookings } from '../data/mockData';
import { CitizenProfile, CitizenGrievance, TankerBooking } from '../types';

interface CitizenEngagementHubProps {
  profile: CitizenProfile;
}

export const CitizenEngagementHub: React.FC<CitizenEngagementHubProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'tanker' | 'grievance' | 'smartmeter' | 'leaderboard'>('smartmeter');
  const [tankers, setTankers] = useState<TankerBooking[]>(mockTankerBookings);
  const [grievances, setGrievances] = useState<CitizenGrievance[]>(mockCitizenGrievances);
  
  // New Grievance form
  const [category, setCategory] = useState<'Low Pressure' | 'Dirty / Turbid Water' | 'Street Pipeline Burst' | 'Meter Malfunction'>('Low Pressure');
  const [landmark, setLandmark] = useState('');
  const [description, setDescription] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  // New Tanker booking form
  const [tankerLitres, setTankerLitres] = useState(5000);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookTanker = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: TankerBooking = {
      id: `TNK-HYD-${Math.floor(Math.random() * 9000 + 1000)}`,
      canNumber: profile.canNumber,
      wardName: profile.ward,
      litres: tankerLitres,
      bookingTime: 'Just now',
      scheduledDelivery: 'Today, within 45 mins',
      status: 'Confirmed',
      driverName: 'R. Koteshwar Rao',
      vehicleNumber: 'TS-09-UB-8812',
      driverPhone: '+91 98480 99124',
      liveLocation: 'Madhapur Tanker Filling Hub',
      etaMinutes: 45,
    };

    setTankers([newBooking, ...tankers]);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const handleFileGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newG: CitizenGrievance = {
      id: `GRV-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      canNumber: profile.canNumber,
      citizenName: profile.name,
      category,
      landmark: landmark || profile.address,
      dma: 'DMA-104',
      description,
      timestamp: 'Just now',
      status: 'Logged',
      slaHoursRemaining: 6,
    };

    setGrievances([newG, ...grievances]);
    setSubmittedFeedback(true);
    setLandmark('');
    setDescription('');
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  const leaderboardWards = [
    { rank: 1, name: 'Ward 104 - Kondapur & Madhapur', score: 96, savedLitres: '4.2 MLD', households: '38,400', badge: 'Diamond Saver' },
    { rank: 2, name: 'Ward 105 - Gachibowli Financial Dist', score: 94, savedLitres: '3.8 MLD', households: '32,100', badge: 'Gold Conservator' },
    { rank: 3, name: 'Ward 98 - Jubilee Hills & Banjara', score: 89, savedLitres: '3.1 MLD', households: '24,500', badge: 'Silver Hero' },
    { rank: 4, name: 'Ward 114 - Kukatpally Industrial', score: 85, savedLitres: '2.9 MLD', households: '45,200', badge: 'Green Pioneer' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl glass-panel relative overflow-hidden border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Citizen Transparency Gateway
              </span>
              <span className="text-xs text-slate-400">CAN: {profile.canNumber}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
              Citizen Engagement & Water Stewardship Hub
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Empowering consumers with micro-leak detection at home, automated municipal grievance resolution, live GPS tanker dispatch, and community conservation rewards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl glass-inner-card border border-emerald-500/30 text-right">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                Household Eco-Score
              </span>
              <div className="flex items-baseline justify-end gap-1 mt-0.5">
                <span className="text-2xl font-black font-mono text-emerald-400">{profile.ecoScore}</span>
                <span className="text-xs font-bold text-slate-400">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('smartmeter')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'smartmeter'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Smart Meter & Micro-Leak Alert
        </button>
        <button
          onClick={() => setActiveTab('tanker')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'tanker'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          Emergency Water Tanker (GPS)
        </button>
        <button
          onClick={() => setActiveTab('grievance')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'grievance'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Grievance Redressal ({grievances.length})
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'leaderboard'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Conservation Leaderboard
        </button>
      </div>

      {/* Tab Content: Smart Meter Micro-Leak */}
      {activeTab === 'smartmeter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Ultrasonic IoT Smart Meter Telemetry
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Meter ID: {profile.meterId} • Ward 104 Sector 2</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                Flow Rate: 0.00 LPS (Idle)
              </span>
            </div>

            {/* Micro-leak Diagnostic Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Household Integrity: Zero Continuous Dribble Detected</h4>
                  <p className="text-[11px] text-emerald-300">
                    No slow seepage detected during nocturnal baseline monitoring (02:00 - 04:00 AM).
                  </p>
                </div>
              </div>
            </div>

            {/* Quota Progress */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Monthly Free Quota Consumption</span>
                <span className="font-mono text-cyan-300 font-bold">
                  {profile.consumedThisMonthLitres.toLocaleString()} / {profile.monthlyQuotaLitres.toLocaleString()} Litres ({Math.round((profile.consumedThisMonthLitres / profile.monthlyQuotaLitres) * 100)}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${(profile.consumedThisMonthLitres / profile.monthlyQuotaLitres) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Under GHMC 20,000L Free Drinking Water Scheme: <strong>7,550 Litres</strong> remaining for billing cycle.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Water Saving Tips for Your Household
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block">Aerator Tap Retrofit</span>
                <p className="text-slate-400 text-[11px]">
                  Installing 3L/min aerator nozzles on kitchen faucets can save an estimated 1,400 Litres this month.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block">Overhead Tank Sensor Auto-Cutoff</span>
                <p className="text-slate-400 text-[11px]">
                  Connecting an IoT float switch prevents roof overflow spills during morning high-pressure cycles.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Water Tanker */}
      {activeTab === 'tanker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                Book Emergency Electric Water Tanker
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Municipal subsidised delivery via HMWSSB Dial-a-Tanker</p>
            </div>

            {bookingSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tanker booked! Dispatched from Madhapur filling station with live GPS.</span>
              </div>
            )}

            <form onSubmit={handleBookTanker} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tanker Capacity Required
                </label>
                <select
                  value={tankerLitres}
                  onChange={(e) => setTankerLitres(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:border-cyan-400 outline-none transition-all"
                >
                  <option value={5000}>5,000 Litres (Subsidized Domestic - ₹500)</option>
                  <option value={10000}>10,000 Litres (Apartment / Community - ₹1,000)</option>
                  <option value={20000}>20,000 Litres (Commercial Commercial - ₹2,200)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Delivery Address & Sump Location
                </label>
                <input
                  type="text"
                  readOnly
                  value={profile.address}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
              >
                <Truck className="w-4 h-4" />
                Confirm Instant Dispatch
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 px-1">
              <Navigation className="w-4 h-4 text-cyan-400" />
              Active & Past Tanker Bookings
            </h3>

            {tankers.map((t) => (
              <div key={t.id} className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{t.id}</span>
                    <span className="text-white font-semibold">{t.litres.toLocaleString()} Litres</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'Arriving'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                      : t.status === 'Confirmed'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {t.status} {t.etaMinutes > 0 && `(ETA ${t.etaMinutes}m)`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 pt-1">
                  <div>
                    <span>Driver: <strong className="text-slate-200">{t.driverName}</strong> ({t.vehicleNumber})</span>
                  </div>
                  <div>
                    <span>Live GPS: <strong className="text-cyan-300">{t.liveLocation}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Grievances */}
      {activeTab === 'grievance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Register Municipal Grievance
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated SLA tracking & SMS updates</p>
            </div>

            {submittedFeedback && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Grievance ticket created! Field engineer assigned with 6-hour SLA.</span>
              </div>
            )}

            <form onSubmit={handleFileGrievance} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:border-cyan-400 outline-none transition-all"
                >
                  <option value="Low Pressure">Low Pressure at Tap</option>
                  <option value="Dirty / Turbid Water">Dirty / Turbid Water</option>
                  <option value="Street Pipeline Burst">Street Pipeline Burst</option>
                  <option value="Meter Malfunction">Meter Malfunction / Reading Error</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Street / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Sector 2 Main Road"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:border-cyan-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Please describe the water issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:border-cyan-400 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Grievance Ticket
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 px-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              Ticket Resolution Progress
            </h3>

            {grievances.map((g) => (
              <div key={g.id} className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{g.id}</span>
                    <span className="text-white font-semibold">{g.category}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    g.status === 'Resolved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : g.status === 'Field Crew Active'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {g.status}
                  </span>
                </div>

                <p className="text-slate-300">{g.description}</p>

                <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800 font-mono">
                  <span>Logged: {g.timestamp}</span>
                  {g.slaHoursRemaining > 0 ? (
                    <span className="text-cyan-400">SLA Remaining: {g.slaHoursRemaining} hrs</span>
                  ) : (
                    <span className="text-emerald-400">Closed within SLA</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Hyderabad Municipal Conservation Leaderboard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Ranked by monthly water saved & community leak reporting speed</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Your Ward: #1 in Cyberabad
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboardWards.map((w) => (
              <div key={w.rank} className="p-4 rounded-2xl glass-inner-card border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    w.rank === 1 ? 'bg-amber-500 text-slate-950' :
                    w.rank === 2 ? 'bg-slate-300 text-slate-950' :
                    w.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{w.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-white">{w.name}</h4>
                    <span className="text-[11px] text-slate-400">{w.households} Participating Households</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-300 block">{w.savedLitres} Saved</span>
                  <span className="text-[10px] text-amber-400 font-semibold">{w.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
