import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Users, UserCheck, UserMinus, ShieldAlert, TrendingUp, 
  DollarSign, Activity, Fingerprint, Building2, AlertCircle,
  Search, Filter, Download, FileCheck, Layers, PieChart as PieIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../components/ThemeProvider';

const payrollTrends = [
  { name: 'Jul', budget: 70000000, actual: 72500000 },
  { name: 'Aug', budget: 70000000, actual: 71800000 },
  { name: 'Sep', budget: 70000000, actual: 69400000 },
  { name: 'Oct', budget: 70000000, actual: 68100000 },
  { name: 'Nov', budget: 70000000, actual: 67200000 },
  { name: 'Dec', budget: 70000000, actual: 66500000 },
];

const biometricData = [
  { name: 'Verified', value: 92, fill: '#1E4D2B' },
  { name: 'Pending', value: 8, fill: '#D4AF37' }
];

const gradeStats = [
  { grade: 'Professional', count: 12400 },
  { grade: 'Administrative', count: 8500 },
  { grade: 'Technical', count: 5200 },
  { grade: 'Support', count: 3100 },
];

export default function PayrollDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12 pt-8">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Fiscal Integrity / Wage-Bill Control</span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Payroll & Human Resources</h1>
          <p className="text-sm text-muted max-w-2xl font-serif italic text-muted/70 leading-relaxed">
            "Automating civil service biometric verification to eliminate ghost workers, manage establishment controls, and ensure sustainable wage-bill growth."
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> Start Biometric Audit
          </button>
          <button className="px-5 py-2.5 glass-panel border border-border text-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Payroll Handoff File
          </button>
        </div>
      </div>

      {/* Primary KPI Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: 'Total Monthly Wage-Bill', value: '$66.5M', sub: '-5.2% vs Jul Baseline', icon: DollarSign, color: 'text-brand-green' },
          { label: 'Active Headcount', value: '29,200', sub: 'Verified Personnel', icon: Users, color: 'text-blue-500' },
          { label: 'Ghost Workers Removed', value: '1,420', sub: '$2.8M Annualized Savings', icon: UserMinus, color: 'text-brand-gold' },
          { label: 'Verification Alerts', value: '84', sub: 'Requires Immediate Action', icon: ShieldAlert, color: 'text-red-500' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 border-l-4 border-l-brand-gold bg-brand-gold/[0.02] group"
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
              <p className="text-[10px] font-serif italic text-brand-green mt-2 font-bold">{kpi.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Biometric Integrity Status */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 glass-panel p-8 flex flex-col justify-between min-h-[500px]"
        >
          <div>
            <h3 className="text-lg font-serif font-medium text-foreground flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-brand-gold" /> Biometric Verification Core
            </h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted mt-1">Status of Civil Service Clean-up</p>
          </div>
          
          <div className="flex-1 h-[300px] flex items-center justify-center relative">
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <span className="text-4xl font-bold text-foreground">92%</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Verified</span>
             </div>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={biometricData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {biometricData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-foreground/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-brand-green" />
                   <span className="text-[10px] font-bold text-muted uppercase">Verified Personnel</span>
                </div>
                <span className="text-xs font-bold">26,864</span>
             </div>
             <div className="flex justify-between items-center p-3 rounded-xl border border-border bg-foreground/[0.02]">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-brand-gold" />
                   <span className="text-[10px] font-bold text-muted uppercase">Pending Verification</span>
                </div>
                <span className="text-xs font-bold">2,336</span>
             </div>
          </div>
        </motion.div>

        {/* Analytics Grid */}
        <div className="lg:col-span-2 space-y-6">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wage-Bill Trajectory */}
              <div className="glass-panel p-6 border-t-4 border-t-brand-green">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Wage-Bill vs Budget Profile</h3>
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                  </div>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={payrollTrends}>
                        <defs>
                          <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E4D2B" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#1E4D2B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="actual" stroke="#1E4D2B" strokeWidth={3} fill="url(#colorWage)" />
                        <Area type="monotone" dataKey="budget" stroke="#88888840" strokeDasharray="5 5" fillOpacity={0} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] font-serif italic text-muted mt-4 text-center">
                    "Consistent downward trend following the removal of non-verified technical assistants from the central payroll."
                  </p>
              </div>

              {/* Grade Distribution */}
              <div className="glass-panel p-6 border-t-4 border-t-brand-gold">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Personnel Grade Distribution</h3>
                    <Layers className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={gradeStats} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#88888810" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="grade" type="category" width={80} fontSize={9} axisLine={false} tickLine={false} />
                          <Bar dataKey="count" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={20} />
                       </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                     <div className="p-2 bg-foreground/5 rounded text-center">
                        <span className="text-[10px] font-bold text-muted uppercase block">Top Grade</span>
                        <span className="text-xs font-bold text-brand-gold">Professional</span>
                     </div>
                     <div className="p-2 bg-foreground/5 rounded text-center">
                        <span className="text-[10px] font-bold text-muted uppercase block">Vacancies</span>
                        <span className="text-xs font-bold text-brand-green">142</span>
                     </div>
                  </div>
              </div>
           </div>

           {/* Exception & Fraud Detection Center */}
           <div className="glass-panel overflow-hidden">
             <div className="bg-red-500/5 px-6 py-4 flex justify-between items-center border-b border-red-500/20">
                <div className="flex items-center gap-3">
                   <ShieldAlert className="w-5 h-5 text-red-500" />
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-500">Integrity Risk Center</h3>
                </div>
                <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded animate-pulse uppercase">84 Critical Flags</span>
             </div>
             
             <div className="p-4 space-y-3">
                {[
                  { msg: 'Duplicate Bank Account (BBAL-4201)', count: 12, risk: 'High', action: 'Suspend Payment' },
                  { msg: 'Employees Exceeding Retirement Age (65+)', count: 42, risk: 'Medium', action: 'Initiate Pension' },
                  { msg: 'System Anomaly: Overlapping National IDs', count: 8, risk: 'Critical', action: 'Block Record' },
                  { msg: 'Unverified Technical Assistant Contracts', count: 22, risk: 'Low', action: 'Request CS Review' },
                ].map((alert, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-border bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-colors group cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-10 rounded-full",
                          alert.risk === 'Critical' ? "bg-red-600" : alert.risk === 'High' ? "bg-red-500" : "bg-brand-gold"
                        )} />
                        <div>
                           <p className="text-xs font-bold text-foreground">{alert.msg}</p>
                           <p className="text-[10px] text-muted font-serif">Detected in <span className="font-bold underline">{alert.count} records</span> across 4 Ministries.</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted group-hover:text-red-500 transition-colors">{alert.action}</span>
                        <Search className="w-4 h-4 text-muted/40 group-hover:text-foreground transition-colors" />
                     </div>
                  </div>
                ))}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
}
