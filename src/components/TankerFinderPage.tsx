import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Droplets, 
  Search, 
  ShieldCheck, 
  Check, 
  Calendar,
  ChevronRight,
  Headphones,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';
import { CitizenProfile } from '../types';

interface TankerVehicle {
  id: string;
  capacityLitres: number;
  status: 'Available Now' | 'On the Way' | 'Preparing for Delivery';
  currentDistanceKm: number;
  etaMinutes: number;
  currentLocationName: string;
  driverName: string;
  driverPhone: string;
  stationName: string;
}

interface TankerStation {
  id: string;
  name: string;
  location: string;
  waitingTimeMins: number;
  availableTankers: number;
}

interface TankerFinderPageProps {
  profile?: CitizenProfile;
}

const mockTankersList: TankerVehicle[] = [
  {
    id: 't1',
    capacityLitres: 10000,
    status: 'On the Way',
    currentDistanceKm: 1.8,
    etaMinutes: 14,
    currentLocationName: 'Near HITEC City / Cyber Gateway',
    driverName: 'Mohammed Ismail',
    driverPhone: '+91 98490 54321',
    stationName: 'Kondapur Water Station'
  },
  {
    id: 't2',
    capacityLitres: 5000,
    status: 'Available Now',
    currentDistanceKm: 2.4,
    etaMinutes: 20,
    currentLocationName: 'Near Kondapur Main Road',
    driverName: 'S. Narsing Rao',
    driverPhone: '+91 98490 88219',
    stationName: 'Kondapur Water Station'
  },
  {
    id: 't3',
    capacityLitres: 20000,
    status: 'Preparing for Delivery',
    currentDistanceKm: 4.5,
    etaMinutes: 35,
    currentLocationName: 'Near Inorbit Mall, Madhapur',
    driverName: 'P. Venkatesh',
    driverPhone: '+91 98490 11928',
    stationName: 'Madhapur Water Station'
  },
  {
    id: 't4',
    capacityLitres: 10000,
    status: 'Available Now',
    currentDistanceKm: 3.1,
    etaMinutes: 25,
    currentLocationName: 'Near Gachibowli Stadium',
    driverName: 'B. Krishnaiah',
    driverPhone: '+91 98490 77312',
    stationName: 'Jubilee Hills Water Station'
  }
];

const mockStationsList: TankerStation[] = [
  {
    id: 'st-1',
    name: 'Kondapur Water Station',
    location: 'Sector 2, Beside Sub-division Office',
    waitingTimeMins: 12,
    availableTankers: 14
  },
  {
    id: 'st-2',
    name: 'Madhapur Water Station',
    location: 'Near Image Hospitals Lane, HITEC City',
    waitingTimeMins: 18,
    availableTankers: 18
  },
  {
    id: 'st-3',
    name: 'Jubilee Hills Water Station',
    location: 'Road No. 36 Pump House',
    waitingTimeMins: 8,
    availableTankers: 10
  }
];

export function TankerFinderPage({ profile }: TankerFinderPageProps) {
  const [tankers, setTankers] = useState<TankerVehicle[]>(mockTankersList);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCapacityFilter, setSelectedCapacityFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active delivery tracker state
  const [activeDelivery, setActiveDelivery] = useState<TankerVehicle | null>(mockTankersList[0]);
  const [liveEta, setLiveEta] = useState(14);

  // Booking modal form state
  const [bookingCapacity, setBookingCapacity] = useState<number>(10000);
  const [deliveryAddress, setDeliveryAddress] = useState(profile?.address || 'Flat 402, Cyber Heights, Sector 2, Kondapur');
  const [selectedStation, setSelectedStation] = useState<string>('Kondapur Water Station');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live ETA simulation decrement
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEta((prev) => (prev > 1 ? prev - 1 : 14));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBookingModal = (capacity?: number, station?: string) => {
    if (capacity) setBookingCapacity(capacity);
    if (station) setSelectedStation(station);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: TankerVehicle = {
        id: `t-${Date.now()}`,
        capacityLitres: bookingCapacity,
        status: 'On the Way',
        currentDistanceKm: 2.1,
        etaMinutes: 18,
        currentLocationName: `Dispatched from ${selectedStation}`,
        driverName: 'Ramesh Goud',
        driverPhone: '+91 98490 66291',
        stationName: selectedStation
      };

      setTankers([newOrder, ...tankers]);
      setActiveDelivery(newOrder);
      setLiveEta(18);
      setIsSubmitting(false);
      setShowBookingModal(false);
      setToastMessage('🎉 Tanker booked successfully! Driver is on the way.');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1000);
  };

  const getStatusBadge = (status: TankerVehicle['status']) => {
    switch (status) {
      case 'Available Now':
        return {
          label: 'Available Now',
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400'
        };
      case 'On the Way':
        return {
          label: 'On the Way',
          bg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 animate-pulse',
          dot: 'bg-cyan-400 animate-ping'
        };
      case 'Preparing for Delivery':
        return {
          label: 'Preparing for Delivery',
          bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-400'
        };
    }
  };

  const filteredTankers = tankers.filter((t) => {
    const matchesCapacity = selectedCapacityFilter === 'all' || t.capacityLitres === selectedCapacityFilter;
    const matchesSearch = 
      t.currentLocationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.stationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${t.capacityLitres}`.includes(searchQuery);
    return matchesCapacity && matchesSearch;
  });

  return (
    <div id="tanker-finder-page-root" className="space-y-6 pb-16 max-w-6xl mx-auto">
      
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

      {/* Top Banner / Hero */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Truck className="w-3.5 h-3.5" />
              <span>Nearby Water Tankers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Book a Water Tanker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Find and book government-certified drinking water tankers directly to your doorstep. Track live delivery in real time.
            </p>
          </div>

          <button
            type="button"
            id="btn-book-emergency-tanker-top"
            onClick={() => handleOpenBookingModal()}
            className="py-3 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all self-start md:self-center flex-shrink-0 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Book Emergency Tanker</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. LIVE DELIVERY TRACKER (If active delivery exists)         */}
      {/* ============================================================ */}
      {activeDelivery && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-cyan-500/40"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            
            {/* Header row: Live Delivery Title & Countdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                  <Truck className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold animate-pulse border border-cyan-500/30">
                      Live Delivery
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {activeDelivery.capacityLitres.toLocaleString()}L Drinking Water
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    Tanker On the Way
                  </h3>
                </div>
              </div>

              {/* Countdown badge */}
              <div className="p-3.5 px-5 rounded-2xl glass-inner-card border border-cyan-500/30 flex items-center gap-3 self-start sm:self-auto">
                <Clock className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Estimated Time
                  </span>
                  <span className="text-lg sm:text-xl font-black font-mono text-cyan-300">
                    Arriving in {liveEta} Mins
                  </span>
                </div>
              </div>
            </div>

            {/* Tracker Details Grid: Current Location, Water Quality, Call Driver */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1. Current Location */}
              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Location</span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {activeDelivery.currentLocationName}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {activeDelivery.currentDistanceKm} km from your doorstep
                  </p>
                </div>
              </div>

              {/* 2. Water Quality */}
              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Water Quality</span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-400">
                    Safe Drinking Water
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Municipal certified & tested
                  </p>
                </div>
              </div>

              {/* 3. Driver & Call Driver Button */}
              <div className="p-4 rounded-2xl glass-inner-card border border-slate-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Driver</span>
                  <p className="text-xs sm:text-sm font-bold text-white">{activeDelivery.driverName}</p>
                  <p className="text-[11px] text-slate-400">Station: {activeDelivery.stationName.split(' ')[0]}</p>
                </div>
                <a
                  href={`tel:${activeDelivery.driverPhone}`}
                  id="btn-call-tanker-driver"
                  className="py-2.5 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Driver</span>
                </a>
              </div>

            </div>

            {/* Delivery Progress Milestones */}
            <div className="pt-2">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { label: 'Booked', done: true },
                  { label: 'Water Filled', done: true },
                  { label: 'On the Way', done: true, current: true },
                  { label: 'Arrived', done: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-full flex items-center">
                      <div className={`h-1 flex-1 ${idx === 0 ? 'opacity-0' : step.done ? 'bg-cyan-500' : 'bg-slate-800'}`} />
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.current 
                          ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20' 
                          : step.done 
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                            : 'bg-slate-800 text-slate-500'
                      }`}>
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <div className={`h-1 flex-1 ${idx === 3 ? 'opacity-0' : step.done && !step.current ? 'bg-cyan-500' : 'bg-slate-800'}`} />
                    </div>
                    <span className={`text-[10px] sm:text-xs mt-1.5 font-medium ${step.current ? 'text-cyan-300 font-bold' : step.done ? 'text-slate-300' : 'text-slate-500'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      )}

      {/* ============================================================ */}
      {/* 3. MAIN SECTION: NEARBY WATER TANKERS & STATIONS             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Nearby Water Tankers (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-cyan-400" />
                Nearby Water Tankers
              </h2>
              <p className="text-xs text-slate-400">Available tankers within your ward and locality</p>
            </div>

            {/* Filter by capacity */}
            <div className="flex items-center gap-1.5">
              {[
                { label: 'All', val: 'all' },
                { label: '5,000L', val: 5000 },
                { label: '10,000L', val: 10000 },
                { label: '20,000L', val: 20000 },
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => setSelectedCapacityFilter(pill.val as any)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCapacityFilter === pill.val
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by area or station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-slate-500 w-full"
            />
          </div>

          {/* Tanker Cards List */}
          <div className="space-y-3">
            {filteredTankers.map((tanker) => {
              const statusBadge = getStatusBadge(tanker.status);

              return (
                <motion.div
                  key={tanker.id}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-3xl glass-panel border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Tanker Info & Capacity */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {tanker.capacityLitres.toLocaleString()}L Tanker
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {tanker.currentLocationName}
                        </p>
                      </div>
                    </div>

                    {/* Distance & ETA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-850">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Distance & ETA</span>
                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-cyan-300">
                          {tanker.currentDistanceKm} km
                        </span>
                        <span className="text-xs text-slate-400 ml-1">
                          (~{tanker.etaMinutes} mins)
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Badges & Book Button Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                    
                    {/* Water Quality Badge: Safe Drinking Water */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Safe Drinking Water</span>
                    </div>

                    {/* Book Tanker Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenBookingModal(tanker.capacityLitres, tanker.stationName)}
                      className="py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Book Tanker</span>
                    </button>

                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Right: Nearby Tanker Stations & Helpline (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Nearby Tanker Stations */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Nearby Tanker Stations
                </h3>
                <p className="text-xs text-slate-400">Current Waiting Time</p>
              </div>
              <span className="text-[10px] text-slate-500">Live Status</span>
            </div>

            <div className="space-y-3">
              {mockStationsList.map((station) => (
                <div
                  key={station.id}
                  className="p-4 rounded-2xl glass-inner-card border border-slate-800/80 hover:border-cyan-500/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {station.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {station.location}
                      </p>
                    </div>

                    {/* Waiting time badge */}
                    <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold font-mono whitespace-nowrap">
                      {station.waitingTimeMins} mins wait
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>{station.availableTankers}</strong> Tankers Available
                    </span>

                    {/* Book from this station button */}
                    <button
                      type="button"
                      onClick={() => handleOpenBookingModal(10000, station.name)}
                      className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Book from this station
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Helpline Card */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 shadow-xl border border-cyan-500/30 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">24/7 Water Helpline</h3>
                <p className="text-xs text-slate-400">Instant emergency tanker assistance</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Need immediate water support for hospital, elderly citizen, or community emergency? Call the official municipal water helpline.
            </p>

            <a
              href="tel:155313"
              id="btn-call-water-helpline"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 font-bold text-slate-950" />
              <span>Call Water Helpline (155313)</span>
            </a>

            <div className="text-center">
              <span className="text-[10px] text-slate-400">
                Toll Free • 20,000L Free Monthly Household Allowance
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL: BOOK WATER TANKER                                     */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-7 rounded-3xl glass-panel border border-slate-700 shadow-2xl space-y-5 bg-slate-950/95"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Book a Water Tanker
                    </h3>
                    <p className="text-xs text-slate-400">
                      Delivered to your home sump
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs">
                
                {/* Tanker Capacity Selection */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-2">
                    Select Tanker Capacity
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { cap: 5000, label: '5,000 Litres', desc: 'Small Home' },
                      { cap: 10000, label: '10,000 Litres', desc: 'Standard Family' },
                      { cap: 20000, label: '20,000 Litres', desc: 'Apartment Building' },
                    ].map((item) => (
                      <button
                        key={item.cap}
                        type="button"
                        onClick={() => setBookingCapacity(item.cap)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          bookingCapacity === item.cap
                            ? 'bg-slate-900 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-white">{item.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Station */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Select Tanker Station
                  </label>
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-400 outline-none cursor-pointer"
                  >
                    <option value="Kondapur Water Station">Kondapur Water Station (~12 min wait)</option>
                    <option value="Madhapur Water Station">Madhapur Water Station (~18 min wait)</option>
                    <option value="Jubilee Hills Water Station">Jubilee Hills Water Station (~8 min wait)</option>
                  </select>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Delivery Sump Address
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-400 outline-none"
                    placeholder="Enter full flat / house address..."
                    required
                  />
                </div>

                {/* Water Guarantee Note */}
                <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-2.5 text-[11px] text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>
                    100% Safe Drinking Water • Subsidized municipal tariff applied.
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? 'Booking Tanker...' : 'Confirm Tanker Order'}
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
