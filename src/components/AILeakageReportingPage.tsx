import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Send, 
  Radio, 
  Clock, 
  Check, 
  Info,
  Droplets,
  ShieldCheck,
  PhoneCall,
  Navigation
} from 'lucide-react';

interface CrowdsourceReport {
  id: string;
  location: string;
  landmark: string;
  leakSeverity: 'Small Leak' | 'Medium Leak' | 'Major Pipe Burst';
  estimatedLossLitresPerHour: number;
  reportedTime: string;
  status: 'Verified by HMWSSB' | 'Repair Team Assigned' | 'Resolved';
  ticketNumber: string;
  photoAttached?: boolean;
}

export function AILeakageReportingPage() {
  // Citizen report state
  const [locationName, setLocationName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [leakSeverity, setLeakSeverity] = useState<'Small Leak' | 'Medium Leak' | 'Major Pipe Burst'>('Medium Leak');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<CrowdsourceReport | null>(null);

  // Recent crowdsourced reports
  const [recentReports, setRecentReports] = useState<CrowdsourceReport[]>([
    {
      id: 'CR-9041',
      location: 'Road No. 36, Near Jubilee Hills Checkpost',
      landmark: 'Opposite Metro Pillar 1042',
      leakSeverity: 'Major Pipe Burst',
      estimatedLossLitresPerHour: 4200,
      reportedTime: '15 mins ago',
      status: 'Repair Team Assigned',
      ticketNumber: 'HMWSSB-LEAK-2026-9041',
      photoAttached: true
    },
    {
      id: 'CR-9038',
      location: 'HITEC City Phase 2, Mindspace Circle',
      landmark: 'Near Building 9 Sump Feeder',
      leakSeverity: 'Medium Leak',
      estimatedLossLitresPerHour: 1800,
      reportedTime: '45 mins ago',
      status: 'Verified by HMWSSB',
      ticketNumber: 'HMWSSB-LEAK-2026-9038',
      photoAttached: true
    },
    {
      id: 'CR-9032',
      location: 'Kondapur Main Road, Near RTA Office',
      landmark: 'Near drainage junction',
      leakSeverity: 'Small Leak',
      estimatedLossLitresPerHour: 450,
      reportedTime: '2 hours ago',
      status: 'Resolved',
      ticketNumber: 'HMWSSB-LEAK-2026-9032',
      photoAttached: false
    }
  ]);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: CrowdsourceReport = {
        id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
        location: locationName,
        landmark: landmark || 'Geotagged via Citizen Portal GPS',
        leakSeverity: leakSeverity,
        estimatedLossLitresPerHour: leakSeverity === 'Major Pipe Burst' ? 3800 : leakSeverity === 'Medium Leak' ? 1600 : 400,
        reportedTime: 'Just now',
        status: 'Verified by HMWSSB',
        ticketNumber: `HMWSSB-LEAK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        photoAttached: photoSelected
      };

      setRecentReports([newTicket, ...recentReports]);
      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setLocationName('');
      setLandmark('');
      setDescription('');
      setPhotoSelected(false);
    }, 1000);
  };

  const handleUseCurrentLocation = () => {
    setLocationName('Flat 402, Cyber Heights, Sector 2, Kondapur');
    setLandmark('Near HDFC Bank ATM Junction');
  };

  return (
    <div id="ai-leakage-reporting-page" className="space-y-6 pb-12 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5" />
              <span>HMWSSB Citizen Leakage Response</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Report Water Leakage
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Help prevent clean water wastage in your locality. Report broken pipes or leaking main lines for rapid municipal repair.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Target Response Time: <strong className="text-white">&lt; 45 Mins</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Reporting Form, Right Recent Community Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Reporting Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl glass-panel shadow-xl border border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Submit Leak Details
              </h2>
              <span className="text-xs text-slate-400">All fields with * are required</span>
            </div>

            {submittedTicket && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 space-y-2 text-xs"
              >
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Leak Incident Successfully Registered!</span>
                </div>
                <p className="text-slate-200">
                  Ticket ID: <span className="font-mono text-emerald-300 font-bold">{submittedTicket.ticketNumber}</span> has been routed to the local zonal repair team.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
              
              {/* Location Input with GPS Autofill */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-300">
                    Location / Street Address *
                  </label>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Use My Current Location</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Road No. 36, Near Jubilee Hills Checkpost"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Landmark */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Nearby Landmark / Pillar / Building
                </label>
                <input
                  type="text"
                  placeholder="e.g. Opposite Metro Pillar 1042 or near Cyber Gateway"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none transition-colors"
                />
              </div>

              {/* Leak Severity Selection */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Estimated Leak Severity *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'Small Leak', label: 'Small Seepage', desc: 'Trickle or damp road', color: 'border-blue-500/40 text-blue-300' },
                    { id: 'Medium Leak', label: 'Medium Leak', desc: 'Visible puddle / stream', color: 'border-amber-500/40 text-amber-300' },
                    { id: 'Major Pipe Burst', label: 'Major Burst', desc: 'High pressure fountain', color: 'border-red-500/40 text-red-300' },
                  ].map((sev) => (
                    <button
                      key={sev.id}
                      type="button"
                      onClick={() => setLeakSeverity(sev.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        leakSeverity === sev.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-xs">{sev.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{sev.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Water overflowing into sidewalk, clean potable water running continuously since 1 hour."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Photo Upload Attachment Simulation */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Attach Photo of Leakage (Optional)
                </label>
                <div
                  onClick={() => setPhotoSelected(!photoSelected)}
                  className={`p-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-3 cursor-pointer transition-all ${
                    photoSelected
                      ? 'bg-cyan-950/30 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-semibold">
                    {photoSelected ? '✓ Leakage_Photo_IMG_2026.jpg attached' : 'Click to take photo or upload image'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-submit-leak-report"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Registering Report with HMWSSB...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Leakage Report</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right: Recent Reports in Your Locality (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-6 rounded-3xl glass-panel shadow-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Recent Area Reports</h3>
                <p className="text-[11px] text-slate-400">Live community tracker for Ward 104</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold">
                3 Active
              </span>
            </div>

            <div className="space-y-3">
              {recentReports.map((report) => (
                <div 
                  key={report.id}
                  className="p-3.5 rounded-2xl glass-inner-card border border-slate-800/80 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-cyan-400 font-bold">
                      {report.ticketNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      report.status === 'Resolved'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : report.status === 'Repair Team Assigned'
                          ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  <p className="font-bold text-white leading-tight">
                    {report.location}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {report.landmark}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Severity: <strong className="text-slate-200">{report.leakSeverity}</strong></span>
                    <span>{report.reportedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24x7 Leakage Helpline Card */}
          <div className="p-5 rounded-3xl bg-cyan-950/30 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Urgent Burst Main Emergency Helpline</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If water is flooding into houses or creating dangerous street hazards, call the emergency control room immediately:
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs font-mono">
                155313
              </span>
              <span className="text-[11px] text-slate-400">Toll Free 24x7 Response</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
