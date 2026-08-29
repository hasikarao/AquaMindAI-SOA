import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import { BarChart3, TrendingUp, Sparkles, Droplets, CheckCircle2, Sliders } from 'lucide-react';
import { UsageDataPoint, CitizenProfile } from '../types';
import { mockDailyUsageData, mockWeeklyUsageData, mockMonthlyUsageData } from '../data/mockData';

interface WaterUsageChartProps {
  profile: CitizenProfile;
}

export const WaterUsageChart: React.FC<WaterUsageChartProps> = ({ profile }) => {
  const [timeframe, setTimeframe] = useState<'today' | 'weekly' | 'monthly'>('weekly');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const getData = () => {
    switch (timeframe) {
      case 'today':
        return mockDailyUsageData;
      case 'monthly':
        return mockMonthlyUsageData;
      case 'weekly':
      default:
        return mockWeeklyUsageData;
    }
  };

  const currentData = getData();

  // Custom tooltip for futuristic styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md text-xs">
          <p className="font-bold text-white mb-1.5 border-b border-slate-800 pb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-cyan-300 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Your Usage:
              </span>
              <strong className="font-mono text-white">{payload[0]?.value} L</strong>
            </p>
            <p className="text-teal-300 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                AI Predicted:
              </span>
              <strong className="font-mono text-white">{payload[1]?.value} L</strong>
            </p>
            <p className="text-slate-400 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Ward Average:
              </span>
              <strong className="font-mono text-slate-300">{payload[2]?.value} L</strong>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-full">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Household Water Consumption Analytics</h3>
            <p className="text-xs text-slate-400">Actual Litres vs AI Demand Forecast vs Ward Benchmark</p>
          </div>
        </div>

        {/* Timeframe & Chart Type Toggle Buttons */}
        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <div className="flex p-1 rounded-2xl glass-inner-card border border-slate-800 text-xs">
            <button
              onClick={() => setTimeframe('today')}
              id="chart-btn-today"
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                timeframe === 'today'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              id="chart-btn-weekly"
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                timeframe === 'weekly'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              id="chart-btn-monthly"
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                timeframe === 'monthly'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Month
            </button>
          </div>

          {/* Toggle Type */}
          <button
            onClick={() => setChartType(chartType === 'area' ? 'bar' : 'area')}
            id="chart-type-toggle"
            className="p-2 rounded-2xl glass-inner-card border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Switch Chart Visualization"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Recharts Graphic Container */}
      <div className="w-full h-72 sm:h-80 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="userGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.4)" vertical={false} />
              <XAxis dataKey="timeLabel" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                formatter={(val) => <span className="text-xs text-slate-400 font-medium">{val}</span>}
              />
              <Area
                type="monotone"
                dataKey="actualLitres"
                name="Your Household"
                stroke="#06B6D4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#userGrad)"
              />
              <Area
                type="monotone"
                dataKey="predictedLitres"
                name="AI Optimized Target"
                stroke="#14B8A6"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#aiGrad)"
              />
              <Area
                type="monotone"
                dataKey="wardAverageLitres"
                name="Ward 104 Benchmark"
                stroke="#475569"
                strokeWidth={1.5}
                fill="transparent"
              />
            </AreaChart>
          ) : (
            <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.4)" vertical={false} />
              <XAxis dataKey="timeLabel" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                formatter={(val) => <span className="text-xs text-slate-400 font-medium">{val}</span>}
              />
              <Bar dataKey="actualLitres" name="Your Household" fill="#06B6D4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="predictedLitres" name="AI Optimized Target" fill="#14B8A6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="wardAverageLitres" name="Ward 104 Benchmark" fill="#334155" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Quota & Water Conservation Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
        <div className="p-3.5 rounded-2xl glass-inner-card">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Monthly Quota Consumed</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-white font-mono">{profile.consumedThisMonthLitres.toLocaleString()} L</span>
            <span className="text-[10px] text-cyan-400 font-semibold">of {profile.monthlyQuotaLitres.toLocaleString()} L</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" 
              style={{ width: `${(profile.consumedThisMonthLitres / profile.monthlyQuotaLitres) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl glass-inner-card">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Eco Conservation Score</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-emerald-400 font-mono">{profile.ecoScore} / 100</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Top 8% in Kondapur</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Qualifies for GHMC 10% Green Rebate
          </p>
        </div>

        <div className="p-3.5 rounded-2xl glass-inner-card flex flex-col justify-between">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">AI Recommendation</span>
          <p className="text-cyan-300 text-[11px] font-medium leading-tight mt-0.5">
            Shift overhead tank pumping to 06:15 AM to benefit from peak line pressure of 2.4 bar.
          </p>
          <span className="text-[10px] text-slate-500 mt-1">Saves ~18 kWh / month</span>
        </div>
      </div>
    </div>
  );
};
