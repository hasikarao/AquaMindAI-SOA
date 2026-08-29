import React from 'react';
import { motion } from 'motion/react';
import { 
  CloudRain, 
  Sun, 
  Droplets, 
  Wind, 
  Compass, 
  MapPin, 
  Sparkles, 
  Clock, 
  CloudSun 
} from 'lucide-react';
import { WeatherData, CitizenProfile } from '../types';

interface WeatherWidgetProps {
  weather: WeatherData;
  profile: CitizenProfile;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, profile }) => {
  // Time-based greeting calculation
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: 'Subhodayam / Good Morning', icon: Sun, color: 'text-amber-400' };
    if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', icon: CloudSun, color: 'text-cyan-400' };
    if (hour >= 17 && hour < 21) return { text: 'Good Evening', icon: CloudSun, color: 'text-indigo-300' };
    return { text: 'Good Night', icon: Sparkles, color: 'text-blue-400' };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden">
      {/* Background Weather Atmosphere Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Time-based Personalized Citizen Greeting */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GreetingIcon className={`w-3.5 h-3.5 ${greeting.color}`} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              {greeting.text}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono font-medium">
              <Clock className="w-3 h-3 text-slate-500" />
              {timeFormatted}, {dateFormatted}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Namaste, {profile.name}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-inner-card text-cyan-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {profile.ward}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl glass-inner-card text-slate-400 font-mono text-[11px]">
              CAN: <span className="text-slate-200">{profile.canNumber}</span>
            </span>
          </div>
        </div>

        {/* Right: Weather & Hyderabad Microclimate Indicator */}
        <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl glass-inner-card flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Temperature & Condition */}
          <div className="flex items-center gap-4">
            <div className="relative p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <CloudRain className="w-8 h-8 text-cyan-400" />
              <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-black text-white">{weather.tempCelsius}°</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">C • Hyderabad</span>
              </div>
              <p className="text-xs text-cyan-400 font-medium">{weather.condition}</p>
            </div>
          </div>

          {/* Microclimate Details */}
          <div className="grid grid-cols-2 gap-4 text-xs w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-700/60 pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-medium">Humidity & Rain</span>
              <span className="font-mono font-bold text-white flex items-center gap-1 mt-0.5">
                <Droplets className="w-3 h-3 text-cyan-400" />
                {weather.humidityPercent}% ({weather.rainChancePercent}% Rain)
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-medium">Recharge Index</span>
              <span className="font-mono font-bold text-emerald-400 mt-0.5 block">
                {weather.groundwaterRechargeIndex}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
