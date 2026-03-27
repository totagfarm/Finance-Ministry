import React from 'react';
import { motion } from 'motion/react';
import { FileText, DollarSign, Activity, AlertTriangle, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockExecutionData = [
  { name: 'Jan', commitments: 4000, obligations: 2400, invoices: 2400 },
  { name: 'Feb', commitments: 3000, obligations: 1398, invoices: 2210 },
  { name: 'Mar', commitments: 2000, obligations: 9800, invoices: 2290 },
  { name: 'Apr', commitments: 2780, obligations: 3908, invoices: 2000 },
  { name: 'May', commitments: 1890, obligations: 4800, invoices: 2181 },
  { name: 'Jun', commitments: 2390, obligations: 3800, invoices: 2500 },
  { name: 'Jul', commitments: 3490, obligations: 4300, invoices: 2100 },
];

export default function ExecutionOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Execution Overview</h1>
          <p className="text-sm text-muted mt-1">Monitor commitments, obligations, and invoices across all funding sources</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
            <option>All Fund Sources</option>
            <option>GoL Consolidated Fund</option>
            <option>Donor Grants</option>
          </select>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Commitments Raised', value: '$45.2M', trend: '124 Active', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Obligations Pending', value: '$12.8M', trend: '45 Awaiting Approval', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Invoices Pending', value: '$8.4M', trend: '32 Ready for Payment', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Blocked Transactions', value: '$1.2M', trend: '7 Exceptions', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-light text-foreground mb-1">{kpi.value}</h3>
              <p className="text-sm font-medium text-muted">{kpi.label}</p>
              <p className="text-xs text-muted mt-2">{kpi.trend}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Execution Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-gold" /> Execution Trend
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Commitments</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Obligations</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> Invoices</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockExecutionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommitments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorObligations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E4D2B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E4D2B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="commitments" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCommitments)" />
                <Area type="monotone" dataKey="obligations" stroke="#f97316" fillOpacity={1} fill="url(#colorObligations)" />
                <Area type="monotone" dataKey="invoices" stroke="#1E4D2B" fillOpacity={1} fill="url(#colorInvoices)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Blocked Transactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Blocked Transactions
            </h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {[
              { id: 'INV-2026-089', inst: 'Ministry of Health', amount: 150000, reason: 'Insufficient Allotment Balance' },
              { id: 'OBL-2026-112', inst: 'Ministry of Education', amount: 45000, reason: 'Missing Procurement Plan Link' },
              { id: 'COM-2026-045', inst: 'Ministry of Public Works', amount: 250000, reason: 'Vendor Tax Clearance Expired' },
              { id: 'INV-2026-092', inst: 'Ministry of Agriculture', amount: 12000, reason: 'Duplicate Invoice Number' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-foreground">{item.id}</span>
                  <span className="text-sm font-bold text-foreground">${item.amount.toLocaleString()}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-1">{item.inst}</h4>
                <p className="text-xs text-red-500 flex items-start gap-1 mt-2">
                  <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {item.reason}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
