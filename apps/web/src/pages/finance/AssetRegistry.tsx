import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, Car, AlertTriangle, ArrowRight, CheckCircle, 
  Building2, Laptop, HardHat, FileText, Search, Filter, 
  Download, Archive, Truck, Tag, ChevronDown, Activity, Trash2
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, 
  Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const assetComposition = [
  { name: 'Government Buildings', value: 850000000, color: '#1E4D2B' },
  { name: 'Vehicle Fleet', value: 45000000, color: '#D4AF37' },
  { name: 'IT Infrastructure', value: 12000000, color: '#3b82f6' },
  { name: 'Heavy Machinery', value: 38000000, color: '#f97316' },
];

const lifecycleDistribution = [
  { status: 'New (0-3 yrs)', count: 1240 },
  { status: 'Mid-life (3-7 yrs)', count: 2150 },
  { status: 'End-life (7+ yrs)', count: 825 },
];

export default function AssetRegistry() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [filterType, setFilterType] = useState<'All' | 'Fleet' | 'Real Estate' | 'IT'>('All');

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Module 13 / Fixed Asset Registry</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">National Asset Management</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Lifecycle tracking, depreciation scheduling, and custody management for all sovereign physical assets to ensure operational readiness and non-tax revenue generation."
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2">
            <Tag className="w-4 h-4" /> Register New Asset
          </button>
          <button className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Download QR Tags
          </button>
        </div>
      </div>

      {/* Primary KPI Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Capital Assets', value: '$945.0M', sub: 'Net Book Value', icon: Building2, color: 'text-brand-green' },
          { label: 'Registered Vehicles', value: '4,215', sub: 'State-Owned Fleet', icon: Truck, color: 'text-blue-500' },
          { label: 'Auction Eligibility', value: '112', sub: 'Assets Ready for Disposal', icon: Trash2, color: 'text-brand-gold' },
          { label: 'Maintenance Risk', value: 'Critical', sub: 'High-Wear IT Cluster', icon: AlertTriangle, color: 'text-red-500' },
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
        
        {/* Registry Composition */}
        <div className="lg:col-span-1 glass-panel p-8">
           <h3 className="text-lg font-serif font-medium text-foreground flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-brand-gold" /> Asset Portfolio Mix
           </h3>
           <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={assetComposition}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {assetComposition.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-foreground">$945M</span>
                 <span className="text-[9px] font-black text-muted uppercase tracking-widest">Total Value</span>
              </div>
           </div>
           
           <div className="space-y-3 mt-6">
              {assetComposition.map((item, idx) => (
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

        {/* Global Asset Registry Grid */}
        <div className="lg:col-span-2 space-y-6">
           
           <div className="glass-panel overflow-hidden flex flex-col h-full min-h-[600px]">
              <div className="px-8 py-6 border-b border-border bg-foreground/[0.01]">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                       <h3 className="text-lg font-serif font-medium text-foreground">Global Registry Matrix</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Real-time Custody & Valuation Tracking</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <button className="p-2 border border-border rounded-lg text-muted hover:text-foreground transition-colors"><Search className="w-4 h-4" /></button>
                       <button className="p-2 border border-border rounded-lg text-muted hover:text-foreground transition-colors"><Filter className="w-4 h-4" /></button>
                       <div className="h-4 w-px bg-border mx-2" />
                       <div className="flex bg-foreground/5 rounded-lg p-1 border border-border">
                          {['All', 'Fleet', 'IT'].map(tab => (
                            <button 
                               key={tab}
                               onClick={() => setFilterType(tab as any)}
                               className={cn(
                                 "px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                                 filterType === tab ? "bg-brand-gold text-brand-dark shadow-sm" : "text-muted hover:text-foreground"
                               )}
                            >
                               {tab}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-[10px] text-muted uppercase bg-foreground/[0.02] font-black tracking-widest sticky top-0 bg-background/95 backdrop-blur z-20">
                       <tr>
                          <th className="px-8 py-4">Asset Tag</th>
                          <th className="px-6 py-4">Description</th>
                          <th className="px-6 py-4">Custody (MAC)</th>
                          <th className="px-6 py-4">Status / Condition</th>
                          <th className="px-6 py-4 text-right">Net Book Value</th>
                          <th className="px-8 py-4 text-center">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                       {[
                         { tag: 'GOL-V-0044', desc: 'Toyota LandCruiser V8', mac: 'MFDP (Exec)', status: 'Excellent', val: 82000, risk: 'Low' },
                         { tag: 'GOL-V-1092', desc: 'Ford Ranger XLT', mac: 'Min. Agriculture', status: 'Maintenance Due', val: 32000, risk: 'Medium' },
                         { tag: 'GOL-IT-099', desc: 'HP ProLiant Server Stack', mac: 'LRA Data Center', status: 'End-of-Life', val: 12000, risk: 'Critical' },
                         { tag: 'GOL-R-012', desc: 'Ministerial Complex', mac: 'General Services Agency', status: 'Excellent', val: 45000000, risk: 'Low' },
                         { tag: 'GOL-V-0012', desc: 'Nissan Patrol', mac: 'Min. Defense', status: 'Auction Eligible', val: 4500, risk: 'Disposal' },
                         { tag: 'GOL-H-502', desc: 'CAT Grader D6', mac: 'Public Works', status: 'Fair', val: 125000, risk: 'High' },
                       ].map((asset, i) => (
                         <tr key={asset.tag} className="hover:bg-foreground/[0.02] transition-colors group cursor-pointer text-xs">
                            <td className="px-8 py-4 font-mono text-brand-gold font-bold">{asset.tag}</td>
                            <td className="px-6 py-4 font-bold text-foreground">{asset.desc}</td>
                            <td className="px-6 py-4 font-serif italic text-muted">{asset.mac}</td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    asset.status === 'Auction Eligible' ? "bg-red-500" : 
                                    asset.status === 'End-of-Life' ? "bg-orange-500" :
                                    "bg-brand-green"
                                  )} />
                                  <span className={cn(
                                    "font-bold uppercase text-[9px] tracking-widest",
                                    asset.status === 'Auction Eligible' ? "text-red-500" : "text-muted"
                                  )}>{asset.status}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right font-medium">${asset.val.toLocaleString()}</td>
                            <td className="px-8 py-4 text-center">
                               {asset.status === 'Auction Eligible' ? (
                                 <button className="px-3 py-1 bg-red-500 text-white rounded font-black text-[9px] uppercase tracking-widest hover:bg-red-600 transition-colors">
                                    Initiate Auction
                                 </button>
                               ) : (
                                 <button className="p-2 text-muted hover:text-brand-gold transition-colors">
                                    <FileText className="w-4 h-4" />
                                 </button>
                               )}
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="px-8 py-4 border-t border-border bg-foreground/[0.01] flex justify-between items-center">
                 <p className="text-[10px] text-muted font-serif italic">Total assets in registry: 47,820 | Showing 6 of 6 filtered</p>
                 <div className="flex gap-2">
                    <button className="p-1.5 border border-border rounded text-muted hover:text-foreground disabled:opacity-30" disabled><ArrowRight className="w-3.5 h-3.5 rotate-180" /></button>
                    <button className="p-1.5 border border-border rounded text-muted hover:text-foreground"><ArrowRight className="w-3.5 h-3.5" /></button>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
