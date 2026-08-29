import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Phone, 
  Droplets, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Bell, 
  Edit3, 
  Save, 
  Sparkles, 
  CreditCard, 
  Award, 
  Check, 
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CitizenProfile, AppView } from '../types';

interface ProfilePageProps {
  profile: CitizenProfile;
  onUpdateProfile?: (updated: Partial<CitizenProfile>) => void;
  onNavigate?: (view: AppView) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [email, setEmail] = useState('arvind.kumar@hyderabad.in');
  const [address, setAddress] = useState(profile.address);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const remainingQuota = Math.max(0, profile.monthlyQuotaLitres - profile.consumedThisMonthLitres);
  const quotaPercent = Math.min(100, Math.round((profile.consumedThisMonthLitres / profile.monthlyQuotaLitres) * 100));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdateProfile?.({
      name,
      address,
    });
    setToastMessage('✅ Profile updated successfully!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div id="profile-page-root" className="space-y-6 pb-16 max-w-6xl mx-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-950/95 border border-cyan-500/50 text-cyan-200 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <User className="w-3.5 h-3.5" />
              <span>HMWSSB Consumer Account</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Citizen Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Manage your water connection details, contact preferences, and monthly 20,000L free water allowance quota.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            id="btn-edit-profile-toggle"
            className="px-4 py-2.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-center cursor-pointer shadow-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Details'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Profile Card, Right Quota & Connection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Account Profile Details (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-6 shadow-xl border border-slate-800">
            
            {/* User Avatar & Headline */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex-shrink-0">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
                  <User className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white">{name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    Active Consumer
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  CAN No: <span className="text-cyan-300 font-bold">{profile.canNumber}</span>
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Consumer Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-colors ${
                      isEditing
                        ? 'bg-slate-900 border-cyan-500/50 text-white focus:border-cyan-400 outline-none'
                        : 'bg-slate-950/60 border-slate-800 text-slate-200 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Registered Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-colors ${
                      isEditing
                        ? 'bg-slate-900 border-cyan-500/50 text-white focus:border-cyan-400 outline-none'
                        : 'bg-slate-950/60 border-slate-800 text-slate-200 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-colors ${
                      isEditing
                        ? 'bg-slate-900 border-cyan-500/50 text-white focus:border-cyan-400 outline-none'
                        : 'bg-slate-950/60 border-slate-800 text-slate-200 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Municipal Ward & Zone
                  </label>
                  <input
                    type="text"
                    value={profile.ward}
                    disabled
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs cursor-not-allowed font-medium"
                  />
                </div>

              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">
                  Registered Supply Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-xs transition-colors resize-none ${
                    isEditing
                      ? 'bg-slate-900 border-cyan-500/50 text-white focus:border-cyan-400 outline-none'
                      : 'bg-slate-950/60 border-slate-800 text-slate-200 cursor-not-allowed'
                  }`}
                  required
                />
              </div>

              {isEditing && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    id="btn-save-profile"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>

            {/* Communication Preferences */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-cyan-400" />
                Notification & Alert Preferences
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">WhatsApp Alerts</p>
                    <p className="text-[10px] text-slate-400">15 mins before water supply</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappNotifications}
                    onChange={(e) => setWhatsappNotifications(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer rounded"
                  />
                </div>

                <div className="p-3.5 rounded-2xl glass-inner-card border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">SMS Notifications</p>
                    <p className="text-[10px] text-slate-400">Grievance & billing updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: 20,000L Free Water Scheme & Connection (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 20,000L Free Drinking Water Scheme */}
          <div className="p-6 rounded-3xl glass-panel space-y-5 shadow-xl border border-cyan-500/30 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Free Water Scheme</h3>
                  <p className="text-[11px] text-slate-400">HMWSSB 20,000L Monthly Subsidy</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                100% Eligible
              </span>
            </div>

            {/* Progress bar for monthly quota */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Consumed This Month</span>
                <span className="text-white font-bold font-mono">
                  {profile.consumedThisMonthLitres.toLocaleString()} / {profile.monthlyQuotaLitres.toLocaleString()} L
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${quotaPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{quotaPercent}% Used</span>
                <span className="text-cyan-300 font-semibold">{remainingQuota.toLocaleString()} Litres Remaining Free</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 space-y-1">
              <p className="text-xs font-bold text-cyan-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero Bill Guarantee
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                As long as consumption stays under 20,000L per month, your municipal water bill is ₹0.
              </p>
            </div>
          </div>

          {/* Meter & Connection Information */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 shadow-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Droplets className="w-4 h-4 text-cyan-400" />
              Connection & Meter Details
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Connection Category</span>
                <span className="text-white font-bold">{profile.connectionType} Domestic</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Smart Meter ID</span>
                <span className="text-cyan-300 font-bold font-mono">{profile.meterId}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Water Conservation Score</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {profile.ecoScore}/100 (Top 10%)
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate?.('complaints')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Request Meter Inspection</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
