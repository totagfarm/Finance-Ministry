import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  DollarSign, ArrowRight, TrendingUp, Download, PieChart, 
  Activity, Building2, Banknote, ShieldCheck, Map as MapIcon,
  Users, Search, Filter, AlertCircle, FileCheck, Layers, Globe
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, Tooltip
} from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';
import LiberiaInteractiveMap from '../../components/LiberiaInteractiveMap';
import { COUNTY_REVENUE_DATA, SECTOR_PERFORMANCE, calculateFilingCompliance } from './revenue/TaxComplianceEngine';

const mockRevenueTrends = [
  { name: 'Jul', target: 45000000, actual: 42000000 },
  { name: 'Aug', target: 45000000, actual: 48000000 },
  { name: 'Sep', target: 45000000, actual: 51000000 },
  { name: 'Oct', target: 45000000, actual: 47000000 },
  { name: 'Nov', target: 45000000, actual: 49000000 },
  { name: 'Dec', target: 45000000, actual: 55000000 },
];

export default function RevenueDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const complianceRate = useMemo(() => calculateFilingCompliance(8200, 10500), []);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Header & Intelligence Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-green" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green">Strategic Intelligence / Revenue Core</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Revenue Intelligence & Compliance</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Consolidating multi-vector revenue streams from the LRA and M&As to provide real-time fiscal oversight, regional collection intelligence, and predictive compliance modeling."
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/app/finance/revenue/log"
            className="px-5 py-2.5 bg-brand-green text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-green/90 shadow-[0_4px_20px_rgba(30,77,43,0.3)] transition-all flex items-center gap-2"
          >
            <Banknote className="w-4 h-4" /> Log Current Receipt
          </Link>
          <button className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Global Intelligence Export
          </button>
        </div>
      </div>

      {/* Primary KPI Command Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: 'Fiscal YTD Collection', value: '$292.0M', sub: '+$22.0M vs Target', icon: DollarSign, trend: 'up', color: 'text-brand-green' },
          { label: 'LRA Filing Compliance', value: `${complianceRate}%`, sub: '10,500 Registered Entities', icon: FileCheck, trend: 'up', color: 'text-blue-500' },
          { label: 'Audit Yield Discovery', value: '$18.4M', sub: 'From High-Risk Audits', icon: Search, trend: 'up', color: 'text-brand-gold' },
          { label: 'Total Arrears Balance', value: '$45.2M', sub: 'Pending Settlement', icon: AlertCircle, trend: 'down', color: 'text-red-500' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border-l-4 border-l-brand-green bg-brand-green/[0.02] group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-brand-green transition-colors">
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <span className={cn("text-[10px] font-black px-2 py-1 rounded-full", 
                kpi.trend === 'up' ? "bg-brand-green/20 text-brand-green" : "bg-red-500/20 text-red-500"
              )}>
                {kpi.trend === 'up' ? '+12.4%' : '-2.1%'}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight mb-1">{kpi.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">{kpi.label}</p>
              <p className="text-[10px] font-serif italic text-muted mt-2">{kpi.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Regional Intelligence (The Map) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 glass-panel p-8 flex flex-col min-h-[600px]"
        >
          <div className="mb-6">
             <h3 className="text-lg font-serif font-medium text-foreground flex items-center gap-3">
               <Globe className="w-5 h-5 text-brand-gold" /> Regional Collection Performance
             </h3>
             <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Choropleth Distribution by County ($M)</p>
          </div>
          
          <div className="flex-1 w-full bg-foreground/[0.02] rounded-3xl border border-border/50 p-4 relative overflow-hidden group">
            <LiberiaInteractiveMap 
              data={COUNTY_REVENUE_DATA} 
              dataLabel="Revenue" 
              colorScale={(v) => v > 100 ? '#1E4D2B' : v > 20 ? '#D4AF37' : '#88888820'}
            />
            
            {/* Map Legend overlay */}
            <div className="absolute left-6 bottom-6 space-y-2 pointer-events-none">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-brand-green" />
                 <span className="text-[9px] font-bold text-muted uppercase">High Yield (&gt;$100M)</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-brand-gold" />
                 <span className="text-[9px] font-bold text-muted uppercase">Median ($20M-$100M)</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-foreground/10" />
                 <span className="text-[9px] font-bold text-muted uppercase">Emerging (&lt;$20M)</span>
               </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/20 flex items-center gap-4">
            <Activity className="w-5 h-5 text-brand-gold shrink-0" />
            <p className="text-[10px] text-muted leading-relaxed font-serif">
              <span className="font-bold text-foreground italic">Insight:</span> "Montserrado and Nimba account for 78% of total tax revenue. Mining sector expansions in Grand Cape Mount are driving 14% YoY regional growth."
            </p>
          </div>
        </motion.div>

        {/* Central Analytics: Performance & Sectors */}
        <div className="lg:col-span-2 space-y-6">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Trajectory */}
              <div className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Actual vs Target (H1)</h3>
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockRevenueTrends}>
                        <defs>
                          <linearGradient id="colorActualRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E4D2B" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#1E4D2B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#00000090', border: 'none', borderRadius: '12px', backdropFilter: 'blur(10px)', color: '#fff', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="actual" stroke="#1E4D2B" strokeWidth={3} fill="url(#colorActualRev)" />
                        <Area type="monotone" dataKey="target" stroke="#D4AF37" strokeDasharray="4 4" fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              {/* Sectoral Revenue Mix */}
              <div className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Sectoral Yield Gap ($M)</h3>
                    <Filter className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={SECTOR_PERFORMANCE} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#88888810" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="sector" type="category" width={100} fontSize={9} axisLine={false} tickLine={false} tick={{fill: '#888888'}} />
                        <RechartsTooltip />
                        <Bar dataKey="actual" radius={[0, 4, 4, 0]} barSize={12}>
                          {SECTOR_PERFORMANCE.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.gap > 0 ? '#D4AF37' : '#1E4D2B'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
              </div>
           </div>

           {/* Tax Compliance Deep Dive */}
           <div className="glass-panel overflow-hidden border-t-0">
             <div className="bg-foreground/[0.03] px-6 py-4 flex justify-between items-center border-b border-border">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Tax Compliance Intel Registry</h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-brand-green" />
                     <span className="text-[9px] font-bold text-muted uppercase">Compliant</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-500" />
                     <span className="text-[9px] font-bold text-muted uppercase">At Risk</span>
                   </div>
                </div>
             </div>
             
             <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Corporate Income Tax (CIT)', rate: 76, color: 'text-brand-green' },
                  { label: 'Personal Income Tax (PIT)', rate: 89, color: 'text-blue-500' },
                  { label: 'Goods & Services Tax (GST)', rate: 64, color: 'text-brand-gold' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center p-6 rounded-2xl border border-border bg-foreground/[0.01]">
                     <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                        <svg className="w-full h-full -rotate-90">
                           <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-foreground/5" />
                           <circle 
                            cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" 
                            strokeDasharray={226} 
                            strokeDashoffset={226 * (1 - stat.rate / 100)} 
                            className={stat.color} 
                           />
                        </svg>
                        <span className="absolute text-sm font-black">{stat.rate}%</span>
                     </div>
                     <span className="text-[9px] font-bold text-center uppercase tracking-widest text-muted">{stat.label}</span>
                     <span className="text-[10px] font-serif italic text-muted mt-1 underline cursor-pointer">View Non-Filers</span>
                  </div>
                ))}
             </div>

             <div className="px-6 pb-6 pt-2">
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                         <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-foreground uppercase tracking-widest">Audit Yield Warning</p>
                         <p className="text-[10px] text-muted font-serif">Sector: <span className="text-red-500 font-bold italic">Agriculture</span>. Variance of 32% detected vs Benchmark.</p>
                      </div>
                   </div>
                   <button className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-red-600 transition-colors">
                      Initiate Audit
                   </button>
                </div>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
