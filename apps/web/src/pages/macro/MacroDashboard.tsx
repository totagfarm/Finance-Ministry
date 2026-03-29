import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, TrendingDown, ShieldCheck, Activity, Globe, 
  BarChart3, PieChart as PieChartIcon, Zap, AlertTriangle, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Info,
  Box, Database, Landmark, Percent, DollarSign, BarChart as BarChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell,
  ReferenceArea, ReferenceLine
} from 'recharts';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { MACRO_HISTORY, calculateFiscalImpact } from './MacroModelingLogic';

const COLORS = ['#D4AF37', '#3B82F6', '#10B981', '#EF4444'];

export default function MacroDashboard() {
  const [activeScenario, setActiveScenario] = useState<'base' | 'commodity' | 'inflation'>('base');
  const [shockIntensity, setShockIntensity] = useState(2); // 1-5 scale

  const impact = useMemo(() => {
    return calculateFiscalImpact(5.2, shockIntensity, activeScenario === 'base' ? 'none' : activeScenario);
  }, [activeScenario, shockIntensity]);

  const projectionData = useMemo(() => {
    return [
      ...MACRO_HISTORY,
      { 
        year: '2026(P)', 
        gdp_growth: impact.adjustedGrowth, 
        revenue_projection: impact.projectedRevenue / 1000000,
        type: 'projection'
      },
      { 
        year: '2027(P)', 
        gdp_growth: impact.adjustedGrowth + 0.5, 
        revenue_projection: (impact.projectedRevenue * 1.05) / 1000000,
        type: 'projection'
      }
    ];
  }, [impact]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Header & Strategic Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Macro-Fiscal Framework / MTFF 26-30</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Macro-Economic Modeling</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Modeling the structural transition of the Liberian economy through triangulated forecasting, fiscal anchor sustainability, and multi-vector shock simulation."
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="glass-panel px-5 py-3 border-l-4 border-l-brand-green bg-brand-green/[0.03]">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">Stability Index</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">A-</span>
                <span className="text-[10px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-black">STABLE</span>
              </div>
           </div>
           <div className="glass-panel px-5 py-3 border-l-4 border-l-blue-500 bg-blue-500/[0.03]">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">Fiscal Deficit</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground font-mono">{(impact.projectedDeficit / 10000000).toFixed(1)}%</span>
                <TrendingDown className="w-4 h-4 text-brand-green" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        
        {/* Left Control Panel: Scenario Modeling */}
        <div className="lg:col-span-1 space-y-6">
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 border-t-4 border-t-brand-gold bg-brand-gold/[0.02]"
           >
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-gold" /> Shock Simulator
              </h3>
              
              <div className="space-y-6">
                 <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-3 block">Simulation Vector</label>
                   <div className="grid grid-cols-1 gap-2">
                     {[
                       { id: 'base', label: 'Base Case (Policy)', icon: Activity, color: 'text-blue-500' },
                       { id: 'commodity', label: 'Commodity Shock', icon: Zap, color: 'text-brand-gold' },
                       { id: 'inflation', label: 'Inflation Spike', icon: TrendingUp, color: 'text-red-500' }
                     ].map((scenario) => (
                       <button
                        key={scenario.id}
                        onClick={() => setActiveScenario(scenario.id as any)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3",
                          activeScenario === scenario.id 
                            ? "bg-foreground/5 border-border shadow-inner" 
                            : "border-transparent hover:bg-foreground/[0.03]"
                        )}
                       >
                         <scenario.icon className={cn("w-4 h-4", scenario.color)} />
                         <span className="text-xs font-bold text-foreground font-serif">{scenario.label}</span>
                         {activeScenario === scenario.id && <ChevronRight className="w-3 h-3 ml-auto text-muted" />}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted">Shock Intensity</label>
                      <span className="text-xs font-mono font-bold text-brand-gold">Level {shockIntensity}.0</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="0.5" 
                      value={shockIntensity}
                      onChange={(e) => setShockIntensity(Number(e.target.value))}
                      className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                    />
                    <p className="text-[10px] text-muted font-serif italic leading-relaxed">
                      "Adjust intensity to simulate multi-sigma deviations in gold/rubber export values."
                    </p>
                 </div>
              </div>
           </motion.div>

           <div className="glass-panel p-6 bg-blue-500/[0.02]">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
               <Database className="w-4 h-4" /> Global Comps
             </h3>
             <div className="space-y-3">
               {[
                 { label: 'Iron Ore (FE)', price: '104.2', trend: 'down' },
                 { label: 'Rubber (L-12)', price: '1,540', trend: 'up' },
                 { label: 'Gold (Oz)', price: '2,654', trend: 'up' }
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center p-2 rounded border border-border bg-background">
                    <span className="text-[9px] text-muted font-bold uppercase">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-black text-foreground">${item.price}</span>
                      {item.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5 text-brand-green" /> : <TrendingDown className="w-2.5 h-2.5 text-red-500" />}
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Center: MTF Projections */}
        <div className="lg:col-span-3 space-y-6">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 min-h-[500px] flex flex-col"
           >
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h2 className="text-2xl font-serif font-medium text-foreground tracking-tight">Medium-Term Growth Projections</h2>
                    <p className="text-xs text-muted uppercase tracking-widest mt-2 font-bold flex items-center gap-2">
                      Real GDP Trend & Revenue Forecast <Info className="w-3 h-3" />
                    </p>
                 </div>
                 <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">Growth (%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-gold" />
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">Revenue (M)</span>
                    </div>
                 </div>
              </div>

              <div className="w-full h-[450px] mt-4 relative">
                <ResponsiveContainer width="100%" height="100%" key={activeScenario}>
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#888888' }} 
                      dy={10}
                    />
                    <YAxis 
                      yAxisId="left" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#888888' }} 
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#D4AF37' }} 
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#00000090', border: 'none', borderRadius: '12px', backdropFilter: 'blur(10px)', color: '#fff' }}
                      itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="gdp_growth" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorGdp)" 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="revenue_projection" 
                      stroke="#D4AF37" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#D4AF37', strokeWidth: 2, stroke: '#fff' }}
                    />
                    <ReferenceLine 
                      x="2025" 
                      stroke="#888888" 
                      strokeDasharray="5 5"
                      label={{ position: 'top', value: 'MTFF Projections', fontSize: 10, fontWeight: 700, fill: '#888888' }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="glass-panel p-6 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-brand-gold" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Fiscal Anchor Target</h4>
                 <p className="text-xl font-bold text-foreground">35% Debt-to-GDP</p>
                 <div className="mt-4 w-full bg-foreground/5 h-1.5 rounded-full">
                    <div className="w-[85%] h-full bg-brand-gold" />
                 </div>
                 <p className="mt-2 text-[10px] text-brand-gold font-bold">Reserving 15% Headroom</p>
              </div>

              <div className="glass-panel p-6 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-500" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Primary Balance Impact</h4>
                 <p className={cn("text-xl font-bold font-mono", impact.projectedDeficit < 0 ? "text-red-500" : "text-brand-green")}>
                   {(impact.projectedDeficit / 1000000).toFixed(1)} M
                 </p>
                 <div className="mt-4 flex gap-1 justify-center">
                   {[...Array(5)].map((_, i) => (
                    <div key={i} className={cn("w-6 h-1 rounded", i < 3 ? 'bg-blue-500' : 'bg-foreground/10')} />
                   ))}
                 </div>
                 <p className="mt-2 text-[10px] text-blue-500 font-bold uppercase tracking-widest">Sustainability: {impact.debtSustainability}</p>
              </div>

              <div className="glass-panel p-6 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-brand-green" />
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Tax Buoyancy</h4>
                 <p className="text-xl font-bold text-foreground">1.14 Ratio</p>
                 <p className="mt-2 text-[10px] text-muted italic font-serif">"Every 1% GDP growth creates 1.14% revenue gain."</p>
              </div>
           </div>

           {/* MTFF Aggregate Table */}
           <div className="glass-panel overflow-hidden border-t-0">
             <div className="bg-foreground/[0.03] px-6 py-4 flex justify-between items-center border-b border-border">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">MTFF Aggregate Summary (Million USD)</h3>
                <Link to="/app/macro/scenarios" className="text-[10px] text-blue-500 font-bold hover:underline">Advanced Modeling Logic <ArrowUpRight className="w-3 h-3 inline" /></Link>
             </div>
             <table className="w-full text-left">
               <thead className="bg-foreground/[0.01] border-b border-border">
                 <tr>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted">Broad Aggregates</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-right">2024 Actual</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted text-right">2025 Est</th>
                   <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-blue-500 text-right font-black">2026 Forecast</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                 {[
                   { label: 'Total Revenue & Grants', a: 735.4, e: 768.2, f: (impact.projectedRevenue / 1000000).toFixed(1) },
                   { label: 'Tax Revenue', a: 610.2, e: 645.1, f: ((impact.projectedRevenue * 0.8) / 1000000).toFixed(1) },
                   { label: 'Grand Expenditures', a: 780.4, e: 812.5, f: '920.0' },
                   { label: 'Compensation of Employees', a: 310.4, e: 320.0, f: '335.0' },
                   { label: 'Fiscal Balance (Deficit)', a: -45.0, e: -44.3, f: (impact.projectedDeficit / 1000000).toFixed(1) },
                 ].map((row, idx) => (
                   <tr key={idx} className="hover:bg-foreground/[0.01] transition-colors group">
                     <td className="px-6 py-4 text-xs font-serif font-medium text-foreground capitalize">{row.label}</td>
                     <td className="px-6 py-4 text-xs font-mono text-muted text-right">${row.a}</td>
                     <td className="px-6 py-4 text-xs font-mono text-muted text-right">${row.e}</td>
                     <td className={cn(
                       "px-6 py-4 text-xs font-mono font-black text-right shadow-inner transition-colors",
                       Number(row.f) < 0 
                        ? "text-red-500 bg-red-500/5" 
                        : "text-blue-500 bg-blue-500/5"
                     )}>
                       {Number(row.f) < 0 ? `(${Math.abs(Number(row.f))})` : row.f}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

        </div>
      </div>
    </div>
  );
}
