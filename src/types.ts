export type AppView = 
  | 'login'
  | 'dashboard'
  | 'water-schedule'
  | 'leakage-reporting'
  | 'complaints'
  | 'tanker-finder'
  | 'notifications'
  | 'profile';

export interface ReservoirData {
  id: string;
  name: string;
  location: string;
  currentLevelFeet: number;
  fullTankLevelFeet: number;
  capacityTMC: number;
  currentStorageTMC: number;
  percentage: number;
  inflowCusecs: number;
  outflowCusecs: number;
  status: 'Normal' | 'Surge Alert' | 'Low Inflow';
}

export interface SupplySchedule {
  wardName: string;
  wardNumber: number;
  area: string;
  nextSupplyTime: string; // ISO or formatted
  targetDurationMinutes: number;
  expectedVolumeLitres: number;
  expectedPressureBar: number;
  waterQualityTDS: number;
  waterQualityPH: number;
  chlorinePPM: number;
  pipelineStatus: 'Ready' | 'Active' | 'Scheduled Maintenance';
  aiConfidencePercentage: number;
}

export interface UsageDataPoint {
  timeLabel: string;
  actualLitres: number;
  predictedLitres: number;
  wardAverageLitres: number;
}

export interface AlertNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'urgent' | 'success';
  category: 'Pipeline' | 'Quality' | 'Reservoir' | 'Weather' | 'Billing';
  read: boolean;
  affectedArea?: string;
}

export interface WeatherData {
  city: string;
  location: string;
  tempCelsius: number;
  condition: string;
  humidityPercent: number;
  windSpeedKmh: number;
  rainChancePercent: number;
  uvIndex: number;
  groundwaterRechargeIndex: string;
  forecastDay: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: string;
  metricBadge?: {
    label: string;
    value: string;
  };
}

export interface CitizenProfile {
  name: string;
  canNumber: string; // Consumer Account Number (HMWSSB style)
  address: string;
  ward: string;
  wardNumber: number;
  meterId: string;
  connectionType: 'Domestic' | 'Commercial' | 'Community';
  monthlyQuotaLitres: number;
  consumedThisMonthLitres: number;
  ecoScore: number; // 0 - 100
}

// ---------------- LEAK DETECTION & ACOUSTIC TELEMETRY TYPES ----------------

export interface PipelineSegmentLeak {
  id: string;
  pipeSegmentCode: string;
  dmaZone: string;
  landmark: string;
  coordinates: { lat: number; lng: number };
  pipeMaterial: 'Ductile Iron (DI)' | 'Cast Iron' | 'HDPE' | 'Prestressed Concrete';
  diameterMm: number;
  depthMeters: number;
  leakType: 'Micro-Fracture' | 'Circumferential Crack' | 'Joint Failure' | 'Major Rupture';
  estimatedLossLPS: number; // Litres per second
  estimatedLossMLD: number; // Million Litres per Day
  pressureDropDeltaBar: number;
  acousticFrequencyHz: number;
  confidenceScore: number; // 0 - 100%
  timeDetected: string;
  status: 'Identified' | 'Crew Dispatched' | 'Isolating Valve' | 'Repaired';
  assignedCrew?: {
    id: string;
    teamLead: string;
    vanNumber: string;
    etaMinutes: number;
    contact: string;
  };
}

export interface AcousticSpectrumPoint {
  frequencyHz: number;
  baselineDecibels: number;
  activeDecibels: number;
  isAnomaly: boolean;
}

// ---------------- AI DECISION SUPPORT SYSTEM (DSS) TYPES ----------------

export interface DSSScenario {
  id: string;
  title: string;
  category: 'Drought Surge' | 'Infrastructure Outage' | 'Monsoon Catchment' | 'Hydraulic Equity';
  severity: 'Critical' | 'Elevated' | 'Advisory';
  summary: string;
  parameters: {
    deficitSurgeMLD: number;
    affectedPopulation: string;
    affectedDMAs: string[];
    riskFactor: string;
  };
  recommendations: {
    actionTitle: string;
    description: string;
    impactWaterSavedMLD: number;
    impactEnergyKwh: number;
    equityImpactScore: string;
    recommendedValveAdjustment: string;
  }[];
  simulationOutcome: {
    waterSavedTotalMLD: number;
    costReductionINR: number;
    citizenSatisfactionEst: number; // %
    co2EmissionsSavedKg: number;
  };
}

// ---------------- CITIZEN GRIEVANCE & TANKER TYPES ----------------

export interface CitizenGrievance {
  id: string;
  canNumber: string;
  citizenName: string;
  category: 'Low Pressure' | 'Dirty / Turbid Water' | 'Street Pipeline Burst' | 'Meter Malfunction';
  landmark: string;
  dma: string;
  description: string;
  timestamp: string;
  status: 'Logged' | 'Under Investigation' | 'Field Crew Active' | 'Resolved';
  slaHoursRemaining: number;
}

export interface TankerBooking {
  id: string;
  canNumber: string;
  wardName: string;
  litres: number;
  bookingTime: string;
  scheduledDelivery: string;
  status: 'Confirmed' | 'Dispatched' | 'Arriving' | 'Delivered';
  driverName: string;
  vehicleNumber: string;
  driverPhone: string;
  liveLocation: string;
  etaMinutes: number;
}

