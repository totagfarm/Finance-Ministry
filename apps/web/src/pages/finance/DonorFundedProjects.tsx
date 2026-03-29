import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, Globe, Activity, BarChart3, Clock, 
  ArrowRight, Filter, Download, ShieldCheck, 
  Building2, Briefcase, ChevronRight, FileSpreadsheet,
  PieChart as PieIcon, Layers, Info, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockProjectData = [
  { id: 'DFP-WB-01', name: 'Rural Electrification (WB)', budget: 22.5, spent: 14.2, status: 'Active', donor: 'World Bank' },
  { id: 'DFP-USAID-04', name: 'Health Systems Strengthening', budget: 15.0, spent: 12.8, status: 'Active', donor: 'USAID' },
  { id: 'DFP-AFDB-09', name: 'Coastal Bridge Infrastructure', budget: 45.0, spent: 8.5, status: 'On-Track', donor: 'AfDB' },
  { id: 'DFP-EU-12', name: 'Public Sector Reform', budget: 8.2, spent: 7.9, status: 'Closing', donor: 'EU' },
];

const mockFinancialFlow = [
  { month: 'Jul', disbursement: 4.2, execution: 3.8 },
  { month: 'Aug', disbursement: 5.5, execution: 4.1 },
  { month: 'Sep', disbursement: 3.8, execution: 4.9 },
  { month: 'Oct', disbursement: 6.2, execution: 5.2 },
  { month: 'Nov', disbursement: 4.9, execution: 5.8 },
  { month: 'Dec', disbursement: 7.1, execution: 6.1 },
];

export default function DonorFundedProjects() {
  const { theme } = useTheme();
  const [selectedDonor, setSelectedDonor] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">IFMIS / Silo 08 / Donor-Funded Projects</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">DFP Financial Administration</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Direct financial oversight of externally-financed projects, integrating donor disbursements with the unified GOL financial reporting framework."
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Disbursement Log
          </button>
          <button className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Donor IATI Report
          </button>
        </div>
      </div>

      {/* Financial Health Ribbon */}
      <div className="glass-panel p-6 border-l-4 border-l-brand-green bg-brand-green/[0.02]">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 space-y-4 w-full">
               <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-brand-green" /> Portfolio Execution Yield
                    </h3>
                    <p className="text-xs text-muted font-serif">Actual Disbursement vs. Budgetary Allotment (All Fund Sources)</p>
                  </div>
                  <span className="text-2xl font-bold text-foreground">64.5% <span className="text-xs text-muted font-normal uppercase">Absorbed</span></span>
               </div>
               <div className="h-3 w-full bg-foreground/5 rounded-full overflow-hidden relative border border-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "64.5%" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-green to-brand-green-dark shadow-[0_0_10px_rgba(30,77,43,0.3)]"
                  />
               </div>
            </div>
            
            <div className="w-px h-12 bg-border hidden md:block" />

            <div className="flex items-center gap-6">
               <div className="text-center">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">Active Projects</p>
                  <p className="text-xs font-bold text-foreground mt-1">15 Integrated</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest">Donor Compliance</p>
                  <p className="text-xs font-bold text-brand-green uppercase mt-1 text-[9px]">High Confidence</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Portfolio Budget', value: '$450.2M', icon: Briefcase, color: 'text-blue-500' },
          { label: 'YTD Disbursements', value: '$124.5M', icon: DollarSign, color: 'text-brand-green' },
          { label: 'Project Expenditures', value: '$84.2M', icon: Activity, color: 'text-brand-gold' },
          { label: 'Uncommitted Balance', value: '$241.5M', icon: Clock, color: 'text-muted' }
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border-t-4 border-t-foreground/5 group hover:border-t-brand-gold transition-all cursor-crosshair"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="p-2.5 rounded-xl bg-background border border-border group-hover:border-brand-gold transition-colors">
                  <kpi.icon className={cn("w-5 h-5", kpi.color)} />
               </div>
               <Info className="w-4 h-4 text-muted/20" />
            </div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight mb-1">{kpi.value}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Financial Flow Chart */}
        <div className="lg:col-span-2 glass-panel p-8">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <h3 className="text-lg font-serif font-medium text-foreground">Financial Flow Trends</h3>
                 <p className="text-[10px] font-black tracking-widest text-muted uppercase mt-1">Disbursement vs. Actual Expenditure ($M)</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-[9px] font-bold text-muted uppercase">
                    <div className="w-2.5 h-2.5 rounded bg-brand-gold" /> Disbursement
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-bold text-muted uppercase">
                    <div className="w-2.5 h-2.5 rounded bg-blue-500" /> Expenditure
                 </div>
              </div>
           </div>
           
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={mockFinancialFlow}>
                    <defs>
                      <linearGradient id="colorDis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#88888810" vertical={false} />
                    <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="disbursement" stroke="#D4AF37" fillOpacity={1} fill="url(#colorDis)" strokeWidth={2} />
                    <Area type="monotone" dataKey="execution" stroke="#3b82f6" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Right: Funding Source Pie */}
        <div className="lg:col-span-1 glass-panel p-8">
           <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2 mb-8">
              <PieIcon className="w-4 h-4 text-brand-gold" /> Creditor Contribution
           </h3>
           <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={[
                        { name: 'World Bank', value: 45, color: '#1E4D2B' },
                        { name: 'USAID', value: 25, color: '#D4AF37' },
                        { name: 'EU', value: 20, color: '#3b82f6' },
                        { name: 'Other', value: 10, color: '#888888' },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                       {[
                        { name: 'WB', color: '#1E4D2B' },
                        { name: 'USAID', color: '#D4AF37' },
                        { name: 'EU', color: '#3b82f6' },
                        { name: 'Other', color: '#888888' },
                       ].map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-2xl font-bold text-foreground">15</p>
                 <p className="text-[10px] font-black text-muted uppercase tracking-widest text-center">Active<br/>Grants</p>
              </div>
           </div>
           
           <div className="space-y-4 mt-8">
              <button 
                className="w-full flex justify-between items-center p-4 rounded-2xl border border-brand-gold/10 bg-brand-gold/5 group hover:bg-brand-gold/10 transition-all font-bold"
              >
                 <span className="text-xs text-brand-gold uppercase tracking-widest">Generate Quarterly Review</span>
                 <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

      </div>

      {/* Project Finance Registry */}
      <div className="glass-panel overflow-hidden">
         <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-foreground/[0.01]">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-3">
               <Layers className="w-4 h-4 text-brand-gold" /> DFP Financial Registry (Active Projects)
            </h3>
            <div className="flex gap-4">
              <div className="relative">
                 <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                 <select className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-brand-gold appearance-none min-w-[150px]">
                    <option>All Donors</option>
                    <option>World Bank</option>
                    <option>USAID</option>
                    <option>AfDB</option>
                 </select>
              </div>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-[10px] text-muted uppercase bg-foreground/5 font-black tracking-widest">
                  <tr>
                     <th className="px-8 py-4">Project ID / Name</th>
                     <th className="px-6 py-4">Direct Donor</th>
                     <th className="px-6 py-4 text-right">Commitment</th>
                     <th className="px-6 py-4 text-right">Actual Spent</th>
                     <th className="px-6 py-4 text-center">Execution %</th>
                     <th className="px-8 py-4 text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {mockProjectData.map((project, i) => (
                    <tr key={i} className="hover:bg-foreground/[0.02] transition-colors group cursor-pointer text-xs">
                       <td className="px-8 py-4">
                          <p className="font-black text-[10px] text-brand-gold mb-1">{project.id}</p>
                          <p className="font-bold text-foreground">{project.name}</p>
                       </td>
                       <td className="px-6 py-4">{project.donor}</td>
                       <td className="px-6 py-4 text-right font-bold text-foreground">${project.budget}M</td>
                       <td className="px-6 py-4 text-right font-bold text-brand-green">${project.spent}M</td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3 justify-center">
                             <div className="w-20 h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-brand-gold" 
                                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                                />
                             </div>
                             <span className="text-[10px] font-bold text-muted">{Math.round((project.spent / project.budget) * 100)}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-4 text-center">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shadow-sm",
                            project.status === 'Active' ? "bg-brand-green/10 text-brand-green" : 
                            project.status === 'Closing' ? "bg-orange-500/10 text-orange-500" :
                            "bg-blue-500/10 text-blue-500"
                          )}>{project.status}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
