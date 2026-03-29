import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, DollarSign, Activity, ArrowRight, MapPin, Building2, Calendar, 
  Handshake, PieChart as PieIcon, TrendingUp, Filter, Search, Download,
  Layers, Info, ShieldCheck, CheckCircle2, X
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend, ComposedChart, Line
} from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';
import { Loader2 } from 'lucide-react';
import LiberiaInteractiveMap from '../../components/LiberiaInteractiveMap';

const defaultAidBySector = [
  { name: 'Health & Nutri.', value: 45000000, color: '#1E4D2B' },
  { name: 'Education', value: 35000000, color: '#D4AF37' },
  { name: 'Infrastructure', value: 125000000, color: '#3b82f6' },
  { name: 'Governance', value: 15000000, color: '#8b5cf6' },
  { name: 'Agriculture', value: 25000000, color: '#f97316' },
];

export default function AidManagementDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [donorYield, setDonorYield] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDonor, setFilterDonor] = useState<string | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch Analytical Data from Warehouse API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [yieldRes, activitiesRes] = await Promise.all([
          fetch('/api/aid/analytics/donor-yield'),
          fetch('/api/aid/activities')
        ]);

        if (yieldRes.ok) setDonorYield(await yieldRes.json());
        else setDonorYield([
          { name: 'World Bank', committed: 120, disbursed: 85 },
          { name: 'USAID', committed: 95, disbursed: 90 },
          { name: 'EU', committed: 150, disbursed: 65 },
          { name: 'AfDB', committed: 80, disbursed: 45 },
          { name: 'UN Agencies', committed: 60, disbursed: 58 },
        ]);

        if (activitiesRes.ok) setActivities(await activitiesRes.json());
        else setActivities([
          { name: 'Water for Liberia Phase 2', donor: 'USAID', sector: 'WASH', modality: 'On-Budget', budget: 12.5, status: 'On Track' },
          { name: 'Rural Electrification Expansion', donor: 'European Union', sector: 'Energy', modality: 'Direct Implementation', budget: 22.0, status: 'Delayed' },
          { name: 'National Health Support', donor: 'World Bank', sector: 'Health', modality: 'Pooled Fund', budget: 45.0, status: 'On Track' },
          { name: 'Fisheries Development Proj.', donor: 'AfDB', sector: 'Agriculture', modality: 'On-Budget', budget: 8.5, status: 'Planning' },
          { name: 'School Feeding Initiative', donor: 'WFP', sector: 'Education', modality: 'In-Kind', budget: 4.2, status: 'On Track' },
        ]);
      } catch (err) {
        console.error("Aid Data Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredActivities = useMemo(() => {
    if (!filterDonor) return activities;
    return activities.filter(a => a.donor.toLowerCase().includes(filterDonor.toLowerCase()));
  }, [activities, filterDonor]);

  const handleNewAgreement = () => {
    showNotification("Initiating Sovereign Aid Agreement Workflow...", "info");
  };

  const handleIATIExport = () => {
    showNotification("Generating IATI-Standard XML Export... (Portfolio Snapshot)");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8 relative">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Development Planning / ODA Oversight</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Aid Management & Transparency</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Ensuring Official Development Assistance (ODA) aligns with national priorities through IATI-standard tracking, commitment yield analysis, and off-budget visibility."
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleNewAgreement}
            className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2"
          >
            <Handshake className="w-4 h-4" /> New Donor Agreement
          </button>
          <button 
            onClick={handleIATIExport}
            className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> IATI Export (XML)
          </button>
        </div>
      </div>

      {/* Strategic Portfolio Strip */}
      <div className="glass-panel p-6 border-l-4 border-l-brand-gold bg-brand-gold/[0.02]">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
               <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" /> Donor Commitment Yield (YTD)
               </h3>
               <p className="text-[10px] text-muted font-serif mt-1">Measuring actual disbursement vs. legal commitments</p>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                  <div className="group cursor-help" title="Percentage of committed funds actually disbursed">
                    <span className="text-2xl font-bold text-foreground">78%</span>
                    <span className="text-[9px] font-bold text-brand-green uppercase block tracking-wider">Absorption Rate</span>
                  </div>
                  <div className="group cursor-help" title="Aid delivered directly to projects outside treasury">
                    <span className="text-2xl font-bold text-foreground">$124M</span>
                    <span className="text-[9px] font-bold text-orange-500 uppercase block tracking-wider">Off-Budget Pipeline</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">15</span>
                    <span className="text-[9px] font-bold text-muted uppercase block tracking-wider">Active Donors</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-foreground">84</span>
                    <span className="text-[9px] font-bold text-muted uppercase block tracking-wider">Ongoing Activities</span>
                  </div>
               </div>
            </div>
            
            <div className="w-full md:w-[200px] h-[80px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{v:30}, {v:45}, {v:35}, {v:60}, {v:55}, {v:78}]}>
                     <Area type="monotone" dataKey="v" stroke="#D4AF37" fill="#D4AF3720" strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Primary KPI Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: 'Total Aid Portfolio', value: '$450.5M', sub: 'Committed ODA', icon: DollarSign, color: 'text-blue-500' },
          { label: 'Disbursed Impact', value: '$125.2M', sub: 'Verified Transfers', icon: Activity, color: 'text-brand-green' },
          { label: 'Off-Budget Footprint', value: '$84.5M', sub: 'Direct Implementation', icon: Globe, color: 'text-brand-gold' },
          { label: 'Reports Pending', value: '12', sub: 'Due by Quarter End', icon: Calendar, color: 'text-red-500' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border-t-4 border-t-foreground/5 group cursor-pointer hover:border-t-brand-gold transition-all"
            onClick={() => showNotification(`Deep-diving into ${kpi.label}...`, "info")}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-brand-gold transition-colors">
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <Info className="w-4 h-4 text-muted/20" />
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
        
        {/* Donor Impact Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-panel p-8"
        >
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="text-lg font-serif font-medium text-foreground">Donor Commitment vs. Intake</h3>
                <p className="text-[10px] font-black tracking-widest text-muted uppercase mt-1">Yield Analysis per Multi-lateral Partner ($M)</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[9px] font-bold text-muted uppercase">
                   <div className="w-2 h-2 rounded-full bg-brand-gold" /> Committed
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-muted uppercase">
                   <div className="w-2 h-2 rounded-full bg-brand-green" /> Disbursed
                </div>
             </div>
          </div>
          
           <div className="h-[350px] relative">
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-sm">
                  <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                </div>
              )}
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={donorYield} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888810" vertical={false} />
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar 
                      dataKey="committed" 
                      fill="#D4AF3740" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40} 
                      onClick={(data) => {
                        setFilterDonor(data.name);
                        showNotification(`Filtering Portfolio: ${data.name}`, 'info');
                      }} 
                      className="cursor-pointer" 
                    />
                    <Bar 
                      dataKey="disbursed" 
                      fill="#1E4D2B" 
                      radius={[4, 4, 0, 0]} 
                      barSize={40} 
                      onClick={(data) => {
                        setFilterDonor(data.name);
                        showNotification(`Filtering Portfolio: ${data.name}`, 'info');
                      }} 
                      className="cursor-pointer" 
                    />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </motion.div>

        {/* Sectoral Allocation */}
        <div className="lg:col-span-1 glass-panel p-8 flex flex-col justify-between">
           <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-3 mb-6">
                <MapPin className="w-4 h-4 text-brand-gold" /> Geographic Aid Footprint
              </h3>
              <div className="h-[300px] relative mt-4 border border-border bg-foreground/5 rounded-2xl overflow-hidden p-6 shadow-inner ring-1 ring-white/10 group">
                  <LiberiaInteractiveMap 
                    data={{ "Montserrado": 120, "Nimba": 85, "Lofa": 64, "Grand Bassa": 42 }} 
                    dataLabel="ODA Intake"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-background/90 backdrop-blur-md border border-brand-gold/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-gold ring-1 ring-brand-gold/20 shadow-lg">
                      Live Geographic Feed
                    </div>
                  </div>
              </div>
           </div>
                      <div className="space-y-3 mt-6">
               {defaultAidBySector.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border bg-foreground/[0.01] hover:bg-foreground/[0.03] cursor-pointer transition-all" onClick={() => showNotification(`Sector Detail: ${item.name}`, 'info')}>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[10px] font-bold text-muted uppercase">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">${(item.value / 1000000).toFixed(0)}M</span>
                 </div>
               ))}
            </div>
        </div>

      </div>

      {/* Aid Activity Registry */}
      <div className="glass-panel overflow-hidden">
        <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-foreground/[0.01]">
           <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-brand-gold" /> Strategic Aid Activity Matrix
           </h3>
            <div className="flex gap-4">
               {filterDonor && (
                 <button 
                   onClick={() => setFilterDonor(null)}
                   className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-gold/10 text-brand-gold text-[9px] font-black uppercase tracking-widest border border-brand-gold/20"
                 >
                   Donor: {filterDonor} <X className="w-2.5 h-2.5" />
                 </button>
               )}
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                  <input className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand-gold w-64" placeholder="Filter by Donor, Sector or County..." />
               </div>
               <button 
                 onClick={() => showNotification("Opening Discovery Filter...", "info")}
                 className="p-2 border border-border rounded-lg text-muted hover:text-foreground transition-all"
               >
                 <Filter className="w-4 h-4" />
               </button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted uppercase bg-foreground/5 font-black tracking-widest">
                 <tr>
                    <th className="px-8 py-4">Activity Name</th>
                    <th className="px-6 py-4">Primary Donor</th>
                    <th className="px-6 py-4">Sector / Area</th>
                    <th className="px-6 py-4">Modality</th>
                    <th className="px-6 py-4 text-right">Commitment</th>
                    <th className="px-8 py-4 text-center">Action</th>
                 </tr>
              </thead>
               <tbody className="divide-y divide-border/30">
                  {filteredActivities.length > 0 ? filteredActivities.map((activity, i) => (
                    <tr key={i} className="hover:bg-foreground/[0.02] transition-colors group cursor-pointer text-xs" onClick={() => setSelectedActivity(activity)}>
                       <td className="px-8 py-4 font-bold text-foreground">{activity.name}</td>
                       <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-brand-gold/10 flex items-center justify-center font-bold text-brand-gold text-[10px]">
                             {activity.donor[0]}
                          </div>
                          {activity.donor}
                       </td>
                       <td className="px-6 py-4 font-serif italic text-muted">{activity.sector}</td>
                       <td className="px-6 py-4">
                          <span className={cn(
                            "text-[9px] font-black uppercase px-2 py-0.5 rounded",
                            activity.modality === 'On-Budget' ? "bg-brand-green/10 text-brand-green" : "bg-foreground/5 text-muted"
                          )}>{activity.modality}</span>
                       </td>
                       <td className="px-6 py-4 text-right font-bold text-foreground">${activity.budget}M</td>
                       <td className="px-8 py-4 text-center">
                           <button className="p-2 text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all">
                              <ArrowRight className="w-4 h-4" />
                           </button>
                       </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-8 py-12 text-center text-muted italic font-serif">
                        No aid activities matching current filters.
                      </td>
                    </tr>
                  )}
               </tbody>
           </table>
        </div>
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-background/80 backdrop-blur-sm"
               onClick={() => setSelectedActivity(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-panel w-full max-w-lg p-8 shadow-2xl overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4">
                 <button onClick={() => setSelectedActivity(null)} className="p-2 text-muted hover:text-foreground"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="space-y-6">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Activity Profile</span>
                    <h2 className="text-2xl font-serif font-medium text-foreground mt-1">{selectedActivity.name}</h2>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <p className="text-[10px] uppercase font-black text-muted tracking-widest">Primary Donor</p>
                       <p className="text-sm font-bold text-foreground mt-1">{selectedActivity.donor}</p>
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-black text-muted tracking-widest">Commitment</p>
                       <p className="text-sm font-bold text-brand-green mt-1">${selectedActivity.budget}M USD</p>
                    </div>
                 </div>
                 
                 <div className="p-4 rounded-xl bg-foreground/5 border border-border">
                    <p className="text-xs text-muted leading-relaxed italic font-serif">
                       "Detailed disbursement schedule for FY 2026/27 includes target infrastructure completion in Lofa and Nimba counties."
                    </p>
                 </div>
                 
                 <button className="w-full py-3 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest" onClick={() => setSelectedActivity(null)}>
                    Close Profile
                 </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={cn(
               "fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl border-l-4 flex items-center gap-4",
               notification.type === 'success' ? "glass-panel border-l-brand-green" : "glass-panel border-l-brand-gold"
            )}
          >
             <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                notification.type === 'success' ? "bg-brand-green/20" : "bg-brand-gold/20"
             )}>
                <Activity className={cn("w-4 h-4", notification.type === 'success' ? "text-brand-green" : "text-brand-gold")} />
             </div>
             <p className="text-sm font-bold text-foreground">{notification.message}</p>
             <button onClick={() => setNotification(null)} className="ml-4 p-1 text-muted hover:text-foreground"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
