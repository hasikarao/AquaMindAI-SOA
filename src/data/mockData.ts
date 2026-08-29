import { ReservoirData, SupplySchedule, UsageDataPoint, AlertNotification, WeatherData, CitizenProfile } from '../types';

export const mockCitizenProfile: CitizenProfile = {
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

export const mockSupplySchedule: SupplySchedule = {
  wardName: 'Kondapur & HITEC City Zone',
  wardNumber: 104,
  area: 'Sector 2 & Cyber Corridor',
  nextSupplyTime: new Date(Date.now() + 2 * 3600 * 1000 + 42 * 60 * 1000 + 35 * 1000).toISOString(),
  targetDurationMinutes: 120,
  expectedVolumeLitres: 850,
  expectedPressureBar: 2.35,
  waterQualityTDS: 135, // PPM
  waterQualityPH: 7.3,
  chlorinePPM: 0.8,
  pipelineStatus: 'Ready',
  aiConfidencePercentage: 96.4,
};

export const mockReservoirs: ReservoirData[] = [
  {
    id: 'res-1',
    name: 'Osmansagar (Gandipet)',
    location: 'West Hyderabad, Ranga Reddy',
    currentLevelFeet: 1787.8,
    fullTankLevelFeet: 1790.0,
    capacityTMC: 3.90,
    currentStorageTMC: 3.65,
    percentage: 93.6,
    inflowCusecs: 1450,
    outflowCusecs: 420,
    status: 'Normal',
  },
  {
    id: 'res-2',
    name: 'Himayatsagar',
    location: 'Rajendranagar, Hyderabad',
    currentLevelFeet: 1761.4,
    fullTankLevelFeet: 1763.5,
    capacityTMC: 2.96,
    currentStorageTMC: 2.72,
    percentage: 91.9,
    inflowCusecs: 980,
    outflowCusecs: 310,
    status: 'Normal',
  },
  {
    id: 'res-3',
    name: 'Singur Dam',
    location: 'Sangareddy, Medak',
    currentLevelFeet: 521.6,
    fullTankLevelFeet: 523.6,
    capacityTMC: 29.91,
    currentStorageTMC: 24.80,
    percentage: 82.9,
    inflowCusecs: 4200,
    outflowCusecs: 1150,
    status: 'Surge Alert',
  },
  {
    id: 'res-4',
    name: 'Manjeera Reservoir',
    location: 'Patancheru / Sangareddy',
    currentLevelFeet: 1648.2,
    fullTankLevelFeet: 1651.0,
    capacityTMC: 1.50,
    currentStorageTMC: 1.28,
    percentage: 85.3,
    inflowCusecs: 640,
    outflowCusecs: 220,
    status: 'Normal',
  },
];

export const mockWeather: WeatherData = {
  city: 'Hyderabad',
  location: 'Telangana, India (GHMC Area)',
  tempCelsius: 31.5,
  condition: 'Partly Cloudy with Monsoon Breezes',
  humidityPercent: 64,
  windSpeedKmh: 14,
  rainChancePercent: 38,
  uvIndex: 6,
  groundwaterRechargeIndex: 'High (84%)',
  forecastDay: 'Intermittent Showers Expected (18:00)',
};

export const mockDailyUsageData: UsageDataPoint[] = [
  { timeLabel: '06:00', actualLitres: 140, predictedLitres: 130, wardAverageLitres: 155 },
  { timeLabel: '08:00', actualLitres: 280, predictedLitres: 260, wardAverageLitres: 310 },
  { timeLabel: '10:00', actualLitres: 110, predictedLitres: 125, wardAverageLitres: 145 },
  { timeLabel: '12:00', actualLitres: 85, predictedLitres: 90, wardAverageLitres: 105 },
  { timeLabel: '14:00', actualLitres: 60, predictedLitres: 75, wardAverageLitres: 80 },
  { timeLabel: '16:00', actualLitres: 95, predictedLitres: 90, wardAverageLitres: 110 },
  { timeLabel: '18:00', actualLitres: 210, predictedLitres: 200, wardAverageLitres: 240 },
  { timeLabel: '20:00', actualLitres: 190, predictedLitres: 185, wardAverageLitres: 215 },
  { timeLabel: '22:00', actualLitres: 80, predictedLitres: 70, wardAverageLitres: 90 },
];

export const mockWeeklyUsageData: UsageDataPoint[] = [
  { timeLabel: 'Mon', actualLitres: 420, predictedLitres: 410, wardAverageLitres: 480 },
  { timeLabel: 'Tue', actualLitres: 390, predictedLitres: 400, wardAverageLitres: 460 },
  { timeLabel: 'Wed', actualLitres: 450, predictedLitres: 430, wardAverageLitres: 495 },
  { timeLabel: 'Thu', actualLitres: 380, predictedLitres: 395, wardAverageLitres: 440 },
  { timeLabel: 'Fri', actualLitres: 460, predictedLitres: 440, wardAverageLitres: 510 },
  { timeLabel: 'Sat', actualLitres: 580, predictedLitres: 550, wardAverageLitres: 630 },
  { timeLabel: 'Sun', actualLitres: 520, predictedLitres: 510, wardAverageLitres: 590 },
];

export const mockMonthlyUsageData: UsageDataPoint[] = [
  { timeLabel: 'Week 1', actualLitres: 2850, predictedLitres: 2900, wardAverageLitres: 3400 },
  { timeLabel: 'Week 2', actualLitres: 3100, predictedLitres: 3050, wardAverageLitres: 3550 },
  { timeLabel: 'Week 3', actualLitres: 2940, predictedLitres: 3000, wardAverageLitres: 3380 },
  { timeLabel: 'Week 4 (Current)', actualLitres: 3560, predictedLitres: 3400, wardAverageLitres: 3920 },
];

export const mockAlerts: AlertNotification[] = [
  {
    id: 'alt-1',
    title: 'Automated Pressure Modulation Active',
    description: 'AquaMind AI reduced pump surge by 14% across Kondapur feeder line to prevent pipeline stress.',
    timestamp: '12 mins ago',
    severity: 'success',
    category: 'Pipeline',
    read: false,
    affectedArea: 'Ward 104, Feeder B',
  },
  {
    id: 'alt-2',
    title: 'Water Purity Index Certified (TDS 135)',
    description: 'HMWSSB central sensor telemetry confirmed Grade-A potability at Gandipet water treatment outlet.',
    timestamp: '45 mins ago',
    severity: 'info',
    category: 'Quality',
    read: false,
    affectedArea: 'All Western Hyderabad',
  },
  {
    id: 'alt-3',
    title: 'Osmansagar Inflow Spike (1,450 Cusecs)',
    description: 'Monsoon catchment inflow increased by 22%. AI allocation engine re-balancing feeder storage.',
    timestamp: '2 hours ago',
    severity: 'warning',
    category: 'Reservoir',
    read: false,
    affectedArea: 'Gandipet Reservoir Catchment',
  },
  {
    id: 'alt-4',
    title: 'Scheduled Sub-Pipeline Maintenance',
    description: 'Routine acoustic sensor calibration in Madhapur 100ft road between 01:00 AM - 03:00 AM. No supply disruption.',
    timestamp: '5 hours ago',
    severity: 'info',
    category: 'Pipeline',
    read: true,
    affectedArea: 'Madhapur 100ft Junction',
  },
];

export const initialChatMessages = [
  {
    id: 'msg-1',
    sender: 'bot' as const,
    text: 'Namaste Arvind! I am AquaBot, your Hyderabad Smart Water Assistant powered by AquaMind AI. How can I assist your household today?',
    timestamp: 'Just now',
    suggestions: [
      'When is my next water supply in Kondapur?',
      'Check current Osmansagar & Himayatsagar levels',
      'How does AquaMind AI optimize water pressure?',
      'Report a pipeline leakage on Madhapur main road',
    ],
  },
];

// ---------------- PIPELINE LEAK INCIDENTS & ACOUSTIC DATA ----------------

export const mockPipelineLeaks = [
  {
    id: 'leak-001',
    pipeSegmentCode: 'JUB-TRK-402',
    dmaZone: 'DMA-098 (Jubilee Hills Elevation)',
    landmark: 'Road No. 36 near Metro Pillar 1408',
    coordinates: { lat: 17.4312, lng: 78.4074 },
    pipeMaterial: 'Cast Iron' as const,
    diameterMm: 450,
    depthMeters: 1.8,
    leakType: 'Joint Failure' as const,
    estimatedLossLPS: 18.4,
    estimatedLossMLD: 1.59,
    pressureDropDeltaBar: 0.42,
    acousticFrequencyHz: 340,
    confidenceScore: 94,
    timeDetected: '14 mins ago',
    status: 'Crew Dispatched' as const,
    assignedCrew: {
      id: 'CREW-WEST-04',
      teamLead: 'R. Suresh (Sr. Pipeline Specialist)',
      vanNumber: 'TS-09-EA-8842',
      etaMinutes: 12,
      contact: '+91 98490 23145',
    },
  },
  {
    id: 'leak-002',
    pipeSegmentCode: 'KUK-IND-118',
    dmaZone: 'DMA-114 (Kukatpally Housing Board)',
    landmark: 'KPHB Phase 3, 5th Cross Feeder',
    coordinates: { lat: 17.4934, lng: 78.3982 },
    pipeMaterial: 'Ductile Iron (DI)' as const,
    diameterMm: 300,
    depthMeters: 1.4,
    leakType: 'Micro-Fracture' as const,
    estimatedLossLPS: 6.2,
    estimatedLossMLD: 0.53,
    pressureDropDeltaBar: 0.18,
    acousticFrequencyHz: 620,
    confidenceScore: 88,
    timeDetected: '42 mins ago',
    status: 'Identified' as const,
    assignedCrew: {
      id: 'CREW-NORTH-02',
      teamLead: 'Md. Farooq (Acoustic Surveyor)',
      vanNumber: 'TS-08-UG-5510',
      etaMinutes: 28,
      contact: '+91 97011 88932',
    },
  },
  {
    id: 'leak-003',
    pipeSegmentCode: 'CHR-OLD-064',
    dmaZone: 'DMA-045 (Charminar Heritage Feeder)',
    landmark: 'Laad Bazaar Main Ring Main',
    coordinates: { lat: 17.3616, lng: 78.4747 },
    pipeMaterial: 'Prestressed Concrete' as const,
    diameterMm: 600,
    depthMeters: 2.3,
    leakType: 'Circumferential Crack' as const,
    estimatedLossLPS: 2.1,
    estimatedLossMLD: 0.18,
    pressureDropDeltaBar: 0.08,
    acousticFrequencyHz: 180,
    confidenceScore: 76,
    timeDetected: '2 hours ago',
    status: 'Isolating Valve' as const,
  },
];

export const mockAcousticSpectrum = [
  { frequencyHz: 50, baselineDecibels: 22, activeDecibels: 24, isAnomaly: false },
  { frequencyHz: 100, baselineDecibels: 28, activeDecibels: 31, isAnomaly: false },
  { frequencyHz: 180, baselineDecibels: 32, activeDecibels: 36, isAnomaly: false },
  { frequencyHz: 250, baselineDecibels: 35, activeDecibels: 48, isAnomaly: false },
  { frequencyHz: 340, baselineDecibels: 38, activeDecibels: 86, isAnomaly: true }, // Resonant leak spike
  { frequencyHz: 420, baselineDecibels: 36, activeDecibels: 72, isAnomaly: true },
  { frequencyHz: 500, baselineDecibels: 30, activeDecibels: 42, isAnomaly: false },
  { frequencyHz: 620, baselineDecibels: 26, activeDecibels: 68, isAnomaly: true }, // Secondary micro fracture
  { frequencyHz: 750, baselineDecibels: 22, activeDecibels: 29, isAnomaly: false },
  { frequencyHz: 900, baselineDecibels: 18, activeDecibels: 21, isAnomaly: false },
];

// ---------------- DECISION SUPPORT SCENARIOS ----------------

export const mockDSSScenarios = [
  {
    id: 'dss-scen-1',
    title: 'Peak Summer Demand Surge in Cyber Corridor',
    category: 'Drought Surge' as const,
    severity: 'Critical' as const,
    summary: 'Predicted +28% demand spike across HITEC City, Gachibowli, and Kondapur (DMA-104 & DMA-105) over the next 72 hours due to high ambient temperature (39.5°C).',
    parameters: {
      deficitSurgeMLD: 38.5,
      affectedPopulation: '1.45 Million Citizens',
      affectedDMAs: ['DMA-104 (Kondapur)', 'DMA-105 (Gachibowli)', 'DMA-108 (Madhapur)'],
      riskFactor: 'Tail-end pressure collapse in elevated apartment clusters.',
    },
    recommendations: [
      {
        actionTitle: 'Engage Singur Dam Auxiliary Pumping Stage 2',
        description: 'Increase auxiliary discharge from Singur by 450 Cusecs during non-peak electrical tariff hours (23:00 - 05:00).',
        impactWaterSavedMLD: 24.0,
        impactEnergyKwh: -18500,
        equityImpactScore: '+14% Hydraulic Uniformity',
        recommendedValveAdjustment: 'Open Feeder Valve VLV-SINGUR-02 by +18%',
      },
      {
        actionTitle: 'Autonomous PRV Modulation in Low-Lying DMAs',
        description: 'Throttle pressure in low-lying Kukatpally and Miyapur from 2.8 bar to 2.2 bar to redirect hydraulic head upward.',
        impactWaterSavedMLD: 14.5,
        impactEnergyKwh: 6400,
        equityImpactScore: 'Zero dry taps reported at peak hours',
        recommendedValveAdjustment: 'Throttle PRV-KUK-01 by -15%',
      },
    ],
    simulationOutcome: {
      waterSavedTotalMLD: 38.5,
      costReductionINR: 485000,
      citizenSatisfactionEst: 96,
      co2EmissionsSavedKg: 12400,
    },
  },
  {
    id: 'dss-scen-2',
    title: 'Monsoon Catchment Inflow Maximization',
    category: 'Monsoon Catchment' as const,
    severity: 'Advisory' as const,
    summary: 'Osmansagar and Himayatsagar catchment basins receiving 2,430 Cusecs combined inflow. Opportunity to replenish groundwater and buffer summer reserves.',
    parameters: {
      deficitSurgeMLD: -65.0, // Surplus
      affectedPopulation: 'All Hyderabad Zones',
      affectedDMAs: ['Gandipet Master Grid', 'Asifnagar Treatment Ring'],
      riskFactor: 'Prevent urban runoff wastage into Musi River.',
    },
    recommendations: [
      {
        actionTitle: 'Divert Surplus to Hyderabad Lakes Grid via Interlink Canals',
        description: 'Route 600 Cusecs to Durgam Cheruvu, Neknampur, and Fox Sagar to charge urban aquifers.',
        impactWaterSavedMLD: 52.0,
        impactEnergyKwh: 12000,
        equityImpactScore: 'Long-term groundwater recharge +4.2 ft',
        recommendedValveAdjustment: 'Open Interlink Gates G-01 through G-04',
      },
    ],
    simulationOutcome: {
      waterSavedTotalMLD: 52.0,
      costReductionINR: 820000,
      citizenSatisfactionEst: 98,
      co2EmissionsSavedKg: 19800,
    },
  },
  {
    id: 'dss-scen-3',
    title: 'Asifnagar 1200mm Master Feeder Trunk Line Outage',
    category: 'Infrastructure Outage' as const,
    severity: 'Critical' as const,
    summary: 'Acoustic sensors detected severe structural vibration on 1200mm PSC line near Mehdipatnam junction requiring immediate emergency isolation.',
    parameters: {
      deficitSurgeMLD: 82.0,
      affectedPopulation: '680,000 Citizens',
      affectedDMAs: ['DMA-045 (Charminar)', 'DMA-052 (Mehdipatnam)', 'DMA-061 (Banjara Hills)'],
      riskFactor: 'High risk of catastrophic road cave-in and clean water inundation.',
    },
    recommendations: [
      {
        actionTitle: 'Instant Dynamic Bypass via Krishna Phase-3 Ring Main',
        description: 'Re-route 75 MLD via Eastern Ring Main booster pumps while isolating the 1200mm segment.',
        impactWaterSavedMLD: 75.0,
        impactEnergyKwh: -8200,
        equityImpactScore: '92% supply continuity preserved',
        recommendedValveAdjustment: 'Isolate ISO-ASI-1200; Open BYPASS-KRI-3',
      },
      {
        actionTitle: 'Deploy 45 Emergency Electric Water Tankers on Geofenced Routes',
        description: 'Automate tanker dispatch to high-density lanes in Old City through citizen CAN priority queue.',
        impactWaterSavedMLD: 7.0,
        impactEnergyKwh: 0,
        equityImpactScore: 'Critical care hospitals prioritized at 100%',
        recommendedValveAdjustment: 'N/A - Logistics Dispatch',
      },
    ],
    simulationOutcome: {
      waterSavedTotalMLD: 82.0,
      costReductionINR: 1250000,
      citizenSatisfactionEst: 91,
      co2EmissionsSavedKg: 34000,
    },
  },
];

// ---------------- CITIZEN GRIEVANCE & TANKER DATA ----------------

export const mockCitizenGrievances = [
  {
    id: 'GRV-2026-8812',
    canNumber: 'HMW-2026-889410',
    citizenName: 'Arvind Kumar',
    category: 'Low Pressure' as const,
    landmark: 'Sector 2, Cyber Heights, Kondapur',
    dma: 'DMA-104',
    description: 'Reduced pressure during 06:00 AM supply window on 4th floor. Pressure gauge read 1.2 bar.',
    timestamp: 'Yesterday, 07:15 PM',
    status: 'Field Crew Active' as const,
    slaHoursRemaining: 4,
  },
  {
    id: 'GRV-2026-8790',
    canNumber: 'HMW-2026-773412',
    citizenName: 'Deepa Reddy',
    category: 'Street Pipeline Burst' as const,
    landmark: 'Opposite Inorbit Mall Outer Ring Feeder',
    dma: 'DMA-108',
    description: 'Clean drinking water gushing from road joint onto pedestrian sidewalk.',
    timestamp: 'Today, 08:30 AM',
    status: 'Under Investigation' as const,
    slaHoursRemaining: 2,
  },
  {
    id: 'GRV-2026-8650',
    canNumber: 'HMW-2026-554210',
    citizenName: 'K. Venkatesh',
    category: 'Dirty / Turbid Water' as const,
    landmark: 'Banjara Hills Rd 12',
    dma: 'DMA-098',
    description: 'Slight brownish tint during initial 5 minutes of morning supply. TDS measured 280.',
    timestamp: '2 days ago',
    status: 'Resolved' as const,
    slaHoursRemaining: 0,
  },
];

export const mockTankerBookings = [
  {
    id: 'TNK-HYD-9941',
    canNumber: 'HMW-2026-889410',
    wardName: 'Ward 104 - Kondapur',
    litres: 5000,
    bookingTime: 'Today, 09:15 AM',
    scheduledDelivery: 'Today, 11:30 AM',
    status: 'Arriving' as const,
    driverName: 'Mohan Rao',
    vehicleNumber: 'TS-09-UB-4290',
    driverPhone: '+91 94401 28934',
    liveLocation: 'Kondapur RTO Junction (800m away)',
    etaMinutes: 7,
  },
  {
    id: 'TNK-HYD-9812',
    canNumber: 'HMW-2026-889410',
    wardName: 'Ward 104 - Kondapur',
    litres: 5000,
    bookingTime: '18 Aug 2026',
    scheduledDelivery: '18 Aug 2026, 14:00',
    status: 'Delivered' as const,
    driverName: 'P. Balakrishna',
    vehicleNumber: 'TS-09-UA-1102',
    driverPhone: '+91 98480 33219',
    liveLocation: 'Delivered & Digitally Signed',
    etaMinutes: 0,
  },
];

