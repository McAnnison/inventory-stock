import React, { useState } from 'react';
import { Target, Zap, TrendingDown, AlertTriangle, CheckCircle2, Sparkles, BellRing } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const performanceData = [
  { time: '08:00', accuracy: 91 },
  { time: '10:00', accuracy: 92 },
  { time: '12:00', accuracy: 94.2 },
  { time: '14:00', accuracy: 93.8 },
  { time: '16:00', accuracy: 95 },
];

export const Dashboard = () => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchInsights = async () => {
    setLoadingAI(true);
    setInsights(null);
    try {
      const res = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inventoryData: { activeAisles: 4, missingItems: ['Bread Loaf', 'Soda Can'], detectionAccuracy: '94.2%' }
        })
      });
      const data = await res.json();
      setInsights(data.text);
    } catch (e) {
      setInsights("Failed to connect to AI server. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      
      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<Target className="w-5 h-5 text-emerald-600" />}
          title="Detection Accuracy"
          value="94.2%"
          subtitle="YOLOv8s mAP"
          color="bg-emerald-100"
          trendColor="text-emerald-500"
        />
        <StatCard 
          icon={<Zap className="w-5 h-5 text-amber-600" />}
          title="Inference Speed"
          value="85ms"
          subtitle="Edge Device"
          color="bg-amber-100"
          trendColor="text-blue-500"
        />
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-slate-500" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Operational Impact</h2>
          </div>
          <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded uppercase">-80% Time</span>
        </div>
        <p className="text-xs text-slate-500 mb-4 font-medium">Reduction in manual cycle-count time across active aisles.</p>
        
        <div className="h-32 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', padding: '4px 8px' }}
                labelStyle={{ color: '#64748b', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorAcc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-800 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-bold uppercase tracking-tighter">Gemini AI Assistant</h2>
          </div>
          <button 
            onClick={fetchInsights}
            disabled={loadingAI}
            className="text-[10px] font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded uppercase transition-colors disabled:opacity-50"
          >
            {loadingAI ? 'Analyzing...' : 'Generate Insights'}
          </button>
        </div>
        
        <div className="text-xs text-slate-400 min-h-[40px]">
          {loadingAI ? (
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Processing shelf telemetry data...</span>
            </div>
          ) : insights ? (
            <div className="text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">{insights}</div>
          ) : (
            <p>Ready to analyze real-time inventory anomalies and suggest restocking actions.</p>
          )}
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
            <BellRing className="w-3 h-3" /> System Events
          </h3>
        </div>
        <div className="space-y-2">
          <AlertItem 
            type="warning"
            title="Missing Item Detected"
            message="Aisle 4: 'Bread Loaf' planogram mismatch."
            time="10m ago"
          />
          <AlertItem 
            type="success"
            title="Sync Complete"
            message="Offline data pushed to global cluster."
            time="1h ago"
          />
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, color, trendColor }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
    <div className="flex justify-between items-start mb-2">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight pr-2">{title}</div>
      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-end justify-between mt-auto">
      <span className="text-2xl font-black text-slate-900">{value}</span>
      <span className={`text-[10px] font-bold mb-1 ${trendColor}`}>{subtitle}</span>
    </div>
  </div>
);

const AlertItem = ({ type, title, message, time }: any) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start space-x-3 hover:bg-slate-50 transition-colors">
    <div className={`mt-0.5 ${type === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
      {type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{title}</h4>
        <span className="text-[10px] font-mono text-slate-400">{time}</span>
      </div>
      <p className="text-[11px] text-slate-600 leading-snug">{message}</p>
    </div>
  </div>
);
