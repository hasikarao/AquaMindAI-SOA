import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Send, 
  UserCheck, 
  Search, 
  MapPin, 
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CitizenProfile } from '../types';

export interface ComplaintTicket {
  id: string;
  category: 'Low Water Pressure' | 'Water Contamination' | 'Pipeline Leakage' | 'Water Meter Issue' | 'Delayed Water Supply' | 'Billing Query';
  description: string;
  address: string;
  area: string;
  filedDate: string;
  expectedResolution: string;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Resolved';
  assignedSupport: {
    name: string;
    role: string;
    phone: string;
  };
  updates: {
    time: string;
    message: string;
    by: string;
  }[];
}

interface ComplaintsPageProps {
  profile?: CitizenProfile;
}

const initialComplaints: ComplaintTicket[] = [
  {
    id: 'CMP-7841',
    category: 'Low Water Pressure',
    description: 'Water pressure is very low during the evening supply cycle in Sector 2.',
    address: 'Flat 402, Cyber Heights, Sector 2',
    area: 'Kukatpally, Hyderabad',
    filedDate: 'Yesterday, 07:30 PM',
    expectedResolution: 'Today by 07:30 PM (Within 24 Hours)',
    status: 'In Progress',
    assignedSupport: {
      name: 'K. Rajendra Prasad',
      role: 'Ward Water Officer',
      phone: '+91 94408 12345'
    },
    updates: [
      { time: 'Yesterday 07:35 PM', message: 'Complaint received and verified in system.', by: 'Support Desk' },
      { time: 'Today 09:15 AM', message: 'Assigned to Ward Water Officer for on-site inspection.', by: 'K. Rajendra Prasad' },
      { time: 'Today 02:20 PM', message: 'Repair team assigned to inspect and clean the feeder line valve.', by: 'Ward Office' }
    ]
  },
  {
    id: 'CMP-6912',
    category: 'Water Contamination',
    description: 'Slight discoloration noticed in the drinking water supply line.',
    address: 'Plot 88, Cyber Hills Main Road',
    area: 'Madhapur, Hyderabad',
    filedDate: '2 days ago',
    expectedResolution: 'Resolved',
    status: 'Resolved',
    assignedSupport: {
      name: 'Dr. M. Sravani',
      role: 'Water Quality Inspector',
      phone: '+91 94408 67890'
    },
    updates: [
      { time: '2 days ago 08:30 AM', message: 'Water sample collected for quality test.', by: 'Dr. M. Sravani' },
      { time: 'Yesterday 02:00 PM', message: 'Water pipeline flushed and chlorine levels rebalanced.', by: 'Quality Team' },
      { time: 'Yesterday 04:30 PM', message: 'Water quality verified potability safe. Issue resolved.', by: 'Support Desk' }
    ]
  },
  {
    id: 'CMP-5420',
    category: 'Pipeline Leakage',
    description: 'Continuous water seepage observed along the roadside near the gate.',
    address: 'Near Pillar 1042, Main Road',
    area: 'Jubilee Hills, Hyderabad',
    filedDate: 'Today, 08:15 AM',
    expectedResolution: 'Today by 08:15 PM (Within 12 Hours)',
    status: 'Assigned',
    assignedSupport: {
      name: 'P. Venkat Reddy',
      role: 'Field Inspection Lead',
      phone: '+91 94408 34567'
    },
    updates: [
      { time: 'Today 08:15 AM', message: 'Complaint registered via Citizen Portal.', by: 'Support Desk' },
      { time: 'Today 09:00 AM', message: 'Assigned to local field inspection team.', by: 'P. Venkat Reddy' }
    ]
  },
  {
    id: 'CMP-4109',
    category: 'Water Meter Issue',
    description: 'Digital display on the water meter is unresponsive.',
    address: 'House 12-4, Green Avenue',
    area: 'Kondapur, Hyderabad',
    filedDate: 'Today, 11:30 AM',
    expectedResolution: 'Tomorrow by 11:30 AM',
    status: 'Pending',
    assignedSupport: {
      name: 'Helpdesk Support',
      role: 'Meter Service Unit',
      phone: '040-23442844'
    },
    updates: [
      { time: 'Today 11:30 AM', message: 'Complaint submitted. Awaiting officer assignment.', by: 'Support Desk' }
    ]
  }
];

export function ComplaintsPage({ profile }: ComplaintsPageProps) {
  const [tickets, setTickets] = useState<ComplaintTicket[]>(initialComplaints);
  const [selectedTicket, setSelectedTicket] = useState<ComplaintTicket>(initialComplaints[0]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  // New complaint form state
  const [newCategory, setNewCategory] = useState<ComplaintTicket['category']>('Low Water Pressure');
  const [newDescription, setNewDescription] = useState('');
  const [newAddress, setNewAddress] = useState(profile?.address || 'Flat 402, Cyber Heights, Sector 2');
  const [newArea, setNewArea] = useState('Kukatpally, Hyderabad');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDescription) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newTicket: ComplaintTicket = {
        id: `CMP-${randomNum}`,
        category: newCategory,
        description: newDescription,
        address: newAddress,
        area: newArea,
        filedDate: 'Just now',
        expectedResolution: 'Within 24 Hours',
        status: 'Pending',
        assignedSupport: {
          name: 'Helpdesk Support',
          role: 'Ward Water Officer',
          phone: '040-23442844'
        },
        updates: [
          { time: 'Just now', message: 'Complaint submitted. Assigned for review.', by: 'Support Desk' }
        ]
      };

      setTickets([newTicket, ...tickets]);
      setSelectedTicket(newTicket);
      setIsSubmitting(false);
      setShowNewModal(false);
      setNewDescription('');
    }, 800);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' 
      ? true 
      : filterStatus === 'Active' 
        ? ticket.status !== 'Resolved' 
        : ticket.status === 'Resolved';
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: ComplaintTicket['status']) => {
    switch (status) {
      case 'Pending':
        return {
          label: 'Pending',
          classes: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        };
      case 'Assigned':
        return {
          label: 'Assigned',
          classes: 'bg-blue-500/15 text-blue-300 border-blue-500/30'
        };
      case 'In Progress':
        return {
          label: 'Repair Team Assigned',
          classes: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
        };
      case 'Resolved':
        return {
          label: 'Resolved',
          classes: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        };
    }
  };

  const pipelineSteps = [
    { key: 'Pending', label: 'Submitted' },
    { key: 'Assigned', label: 'Assigned' },
    { key: 'In Progress', label: 'Repair in Progress' },
    { key: 'Resolved', label: 'Completed' }
  ];

  const getStepIndex = (status: ComplaintTicket['status']) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Assigned': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
    }
  };

  return (
    <div id="complaints-page" className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Track your water complaints</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Complaints
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Raise a complaint about water supply, leakage, pressure, or water quality and track its status.
            </p>
          </div>

          <button
            type="button"
            id="btn-lodge-complaint"
            onClick={() => setShowNewModal(true)}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all self-start sm:self-center flex-shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Complaint</span>
          </button>
        </div>
      </div>

      {/* Main Layout: 3-4 Complaint Cards List & Selected Complaint Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Complaint Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              {(['All', 'Active', 'Resolved'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFilterStatus(filter)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    filterStatus === filter
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Complaint Cards */}
          <div className="space-y-3">
            {filteredTickets.map((ticket) => {
              const isSelected = selectedTicket?.id === ticket.id;
              const badge = getStatusBadge(ticket.status);

              return (
                <motion.div
                  key={ticket.id}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/70 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          Complaint ID: {ticket.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badge.classes}`}>
                          {badge.label}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                        {ticket.category}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {ticket.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Submitted: {ticket.filedDate}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-cyan-300/90 font-medium">
                    Expected Resolution: {ticket.expectedResolution}
                  </div>
                </motion.div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
                No complaints found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Complaint Detail Dossier (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {selectedTicket ? (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl sticky top-20">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-cyan-400">
                      Complaint ID: {selectedTicket.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(selectedTicket.status).classes}`}>
                      {getStatusBadge(selectedTicket.status).label}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">{selectedTicket.category}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> 
                    {selectedTicket.address}, {selectedTicket.area}
                  </p>
                </div>
              </div>

              {/* Complaint Status Pipeline */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider text-slate-400 font-bold">Complaint Status</span>
                  <span className="text-cyan-400 font-medium">
                    {getStatusBadge(selectedTicket.status).label}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {pipelineSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(selectedTicket.status);
                    const isPassed = currentIdx >= idx;
                    const isCurrent = currentIdx === idx;

                    return (
                      <div key={step.key} className="space-y-1.5 text-center">
                        <div className={`h-2 rounded-full transition-all ${
                          isPassed ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-sm shadow-cyan-500/50' : 'bg-slate-800'
                        }`} />
                        <span className={`text-[10px] block leading-tight font-medium ${
                          isCurrent ? 'text-cyan-300 font-bold' : isPassed ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description & Expected Time Info */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                <div className="text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-200">Issue: </span>
                  {selectedTicket.description}
                </div>
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Submitted: <strong className="text-slate-300">{selectedTicket.filedDate}</strong></span>
                  <span className="text-cyan-300 font-medium">{selectedTicket.expectedResolution}</span>
                </div>
              </div>

              {/* Assigned Support / Officer Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{selectedTicket.assignedSupport.name}</p>
                    <p className="text-[11px] text-slate-400">{selectedTicket.assignedSupport.role}</p>
                  </div>
                </div>

                <a
                  href={`tel:${selectedTicket.assignedSupport.phone}`}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                </a>
              </div>

              {/* Complaint Updates Feed */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Complaint Updates
                </p>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedTicket.updates.map((update, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-cyan-400">{update.by}</span>
                        <span>{update.time}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
              Select a complaint to view details
            </div>
          )}
        </div>

      </div>

      {/* Modal: New Complaint */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  New Complaint
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="text-slate-400 hover:text-white text-sm cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Complaint Type</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                  >
                    <option value="Low Water Pressure">Low Water Pressure</option>
                    <option value="Water Contamination">Water Contamination / Quality</option>
                    <option value="Pipeline Leakage">Pipeline Leakage</option>
                    <option value="Water Meter Issue">Water Meter Issue</option>
                    <option value="Delayed Water Supply">Delayed Water Supply</option>
                    <option value="Billing Query">Billing Query</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Your Area</label>
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="e.g., Kukatpally, Hyderabad"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Address / Street</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Complaint Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the issue in simple words..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-cyan-500 outline-none resize-none"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-slate-300">
                  ⚡ Your complaint will be assigned to the local water support team within minutes.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
