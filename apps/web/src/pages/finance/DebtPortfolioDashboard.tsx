import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, Activity, AlertTriangle, ArrowRight, CheckCircle, 
  Clock, TrendingUp, TrendingDown, Building2, Globe, FileText,
  ShieldCheck, Calculator, Landmark, Layers, Briefcase, ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend,
  ComposedChart, Line
} from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockDebtComposition = [
  { name: 'Multilateral (WB/IMF/AfDB)', value: 850000000, color: '#1E4D2B' },
  { name: 'Bilateral (China/Exim)', value: 350000000, color: '#D4AF37' },
  { name: 'Domestic (Treasury Bonds)', value: 450000000, color: '#3b82f6' },
];

const mockMaturityProfile = [
  { name: '2026', multilateral: 80, bilateral: 40, domestic: 45 },
  { name: '2027', multilateral: 90, bilateral: 60, domestic: 60 },
  { name: '2028', multilateral: 110, bilateral: 70, domestic: 55 },
  { name: '2029', multilateral: 130, bilateral: 70, domestic: 40 },
  { name: '2030', multilateral: 120, bilateral: 70, domestic: 30 },
];

export default function DebtPortfolioDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [interestShock, setInterestShock] = useState(0);
  const [activeTab, setActiveTab] = useState<'composition' | 'service' | 'risk'>('composition');

  // Logic for Debt Sustainability Metric
  const debtToGdp = 45.2; // Simulated
  const eowasLimit = 60;

  // Logic for Interest Shock Impact
  const baseService = 12.5; // Monthly $M
  const shockImpact = useMemo(() => {
    return (baseService * (1 + (interestShock * 0.15))).toFixed(2);
  }, [interestShock]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Module 09 / Public Debt Management</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Sovereign Debt Portfolio</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Monitoring sovereign solvency, managing the external debt stock, and optimizing the amortization calendar to ensure intergenerational fiscal equity."
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2">
            <Calculator className="w-4 h-4" /> New Disbursement
          </button>
          <button className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" /> Debt Sustainability (DSA)
          </button>
        </div>
      </div>

      {/* Sustainability Intelligence Strip */}
      <div className="glass-panel p-6 border-l-4 border-l-brand-green bg-brand-green/[0.02]">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 space-y-4 w-full">
               <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-brand-green" /> Debt Sustainability Threshold
                    </h3>
                    <p className="text-xs text-muted font-serif">Monitoring vs. ECOWAS 60% GDP Ceiling</p>
                  </div>
                  <span className="text-2xl font-bold text-foreground">{debtToGdp}% <span className="text-xs text-muted font-normal uppercase">of GDP</span></span>
               </div>
               <div className="h-3 w-full bg-foreground/5 rounded-full overflow-hidden relative border border-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(debtToGdp / eowasLimit) * 100}%` }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-green to-brand-green-dark shadow-[0_0_10px_rgba(30,77,43,0.5)]"
                  />
                  <div className="absolute inset-y-0 right-[40%] w-0.5 bg-red-500/50 dashed-line" /> {/* 60% Marker */}
                  <span className="absolute top-4 right-[40%] text-[8px] font-black text-red-500 uppercase">Ceiling (60%)</span>
               </div>
            </div>
            
            <div className="w-px h-12 bg-border hidden md:block" />

            <div className="flex items-center gap-6">
               <div className="text-center">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">Solvency Risk</p>
                  <p className="text-xs font-bold text-brand-green uppercase mt-1">Sustainable</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">Credit Rating</p>
                  <p className="text-xs font-bold text-foreground mt-1">B (Stable)</p>
               </div>
            </div>
         </div>
      </div>

      {/* KPI Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Debt Stock', value: '$1.65B', sub: 'Mixed Sovereign Portfolio', icon: Landmark, color: 'text-blue-500' },
          { label: 'External Composition', value: '72%', sub: '$1.2B Foreign Owed', icon: Globe, color: 'text-brand-green' },
          { label: 'Debt Service Due (30d)', value: `$${shockImpact}M`, sub: 'Projected with Shock', icon: Clock, color: 'text-brand-gold' },
          { label: 'Contingent Liabilities', value: '$124M', sub: 'SOE Guarantee Exposure', icon: AlertTriangle, color: 'text-orange-500' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border-t-4 border-t-brand-gold/20 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-brand-gold transition-colors">
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <Activity className="w-4 h-4 text-muted/20" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight mb-1">{kpi.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted">{kpi.label}</p>
              <p className="text-[10px] font-serif italic text-muted/70 mt-2">{kpi.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Composition & Shock Simulator */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* composition */}
          <div className="glass-panel p-8">
            <h3 className="text-lg font-serif font-medium text-foreground flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-brand-gold" /> Creditor Composition
            </h3>
            <div className="h-[250px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockDebtComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {mockDebtComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold text-foreground">$1.65B</span>
                  <span className="text-[9px] font-black text-muted uppercase tracking-widest">Total Stock</span>
               </div>
            </div>
            
            <div className="space-y-3 mt-6">
               {mockDebtComposition.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border bg-foreground/[0.02]">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[10px] font-bold text-muted uppercase">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">${(item.value / 1000000).toFixed(0)}M</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Shock Simulator */}
          <div className="glass-panel p-6 border-t-4 border-t-orange-500 bg-orange-500/[0.02]">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Interest Rate Shock</h3>
                   <p className="text-[10px] text-muted font-serif">Projecting Variable Rate Impact</p>
                </div>
                <TrendingUp className="w-5 h-5 text-orange-500" />
             </div>
             
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-muted">LIBOR/SOFR Shock (%)</span>
                      <span className="text-xs font-bold text-orange-500">+{interestShock}%</span>
                   </div>
                   <input 
                      type="range" 
                      min="0" 
                      max="5" 
                      step="0.5" 
                      value={interestShock}
                      onChange={(e) => setInterestShock(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                   />
                </div>
                
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                   <p className="text-[10px] font-black uppercase text-muted tracking-widest">Est. Debt Service Increase</p>
                   <p className="text-2xl font-bold text-orange-500 mt-1">+${((baseService * interestShock * 0.15)).toFixed(1)}M <span className="text-xs font-normal">/ month</span></p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Maturity Profile & Calendar */}
        <div className="lg:col-span-2 space-y-6">
           
           <div className="glass-panel p-8">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-lg font-serif font-medium text-foreground">Sovereign Maturity Pipeline</h3>
                    <p className="text-[10px] font-black tracking-widest text-muted uppercase mt-1">Principal Amortization Profile</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-brand-green" />
                       <span className="text-[9px] font-bold text-muted uppercase">Multilateral</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-brand-gold" />
                       <span className="text-[9px] font-bold text-muted uppercase">Bilateral</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-[9px] font-bold text-muted uppercase">Domestic</span>
                    </div>
                 </div>
              </div>
              
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockMaturityProfile}>
                       <CartesianGrid strokeDasharray="3 3" stroke="#88888810" vertical={false} />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                       <YAxis axisLine={false} tickLine={false} fontSize={10} tickFormatter={(v) => `$${v}M`} />
                       <Tooltip cursor={{ fill: 'transparent' }} />
                       <Bar dataKey="multilateral" stackId="a" fill="#1E4D2B" radius={[0, 0, 0, 0]} barSize={40} />
                       <Bar dataKey="bilateral" stackId="a" fill="#D4AF37" />
                       <Bar dataKey="domestic" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Upcoming Service Calendar */}
           <div className="glass-panel overflow-hidden">
             <div className="px-8 py-4 border-b border-border flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-3">
                   <Clock className="w-4 h-4 text-brand-gold" /> Service Calendar (H1 2026)
                </h3>
                <button className="text-[10px] font-black text-brand-gold uppercase hover:underline">Full Amortization Schedule</button>
             </div>
             
             <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                   <thead className="text-[10px] text-muted uppercase bg-foreground/5 font-black tracking-widest">
                      <tr>
                         <th className="px-8 py-3">Due Date</th>
                         <th className="px-6 py-3">Creditor</th>
                         <th className="px-6 py-3">Principal</th>
                         <th className="px-6 py-3">Interest / Fees</th>
                         <th className="px-6 py-3 text-right">Total Payable</th>
                         <th className="px-8 py-3 text-center">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border/30">
                      {[
                        { date: 'Oct 28', cred: 'World Bank (IDA)', princ: 1.5, int: 0.25, status: 'Pending' },
                        { date: 'Nov 05', cred: 'AfDB (FAD)', princ: 0.8, int: 0.12, status: 'Instruction Sent' },
                        { date: 'Nov 12', cred: 'CBL (Refi-Bond)', princ: 5.0, int: 0.45, status: 'Scheduled' },
                        { date: 'Dec 02', cred: 'China EXIM Bank', princ: 2.2, int: 0.18, status: 'Pending' },
                      ].map((pay, i) => (
                        <tr key={i} className="hover:bg-foreground/[0.02] transition-colors group cursor-pointer text-xs font-medium">
                           <td className="px-8 py-4 text-foreground flex items-center gap-3 font-bold">
                              <CalendarIcon className="w-3.5 h-3.5 text-muted group-hover:text-brand-gold transition-colors" /> {pay.date}
                           </td>
                           <td className="px-6 py-4">{pay.cred}</td>
                           <td className="px-6 py-4 text-muted">${pay.princ}M</td>
                           <td className="px-6 py-4 text-muted">${pay.int}M</td>
                           <td className="px-6 py-4 text-right font-bold text-foreground">${(pay.princ + pay.int).toFixed(2)}M</td>
                           <td className="px-8 py-4 text-center">
                              <span className={cn(
                                "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                                pay.status === 'Pending' ? "bg-red-500/10 text-red-500" :
                                pay.status === 'Scheduled' ? "bg-blue-500/10 text-blue-500" :
                                "bg-brand-green/10 text-brand-green"
                              )}>{pay.status}</span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
         <line x1="16" y1="2" x2="16" y2="6"></line>
         <line x1="8" y1="2" x2="8" y2="6"></line>
         <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
   );
}
