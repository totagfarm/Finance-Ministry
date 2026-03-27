import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Activity, AlertTriangle, ArrowRight, CheckCircle, Clock, TrendingUp, TrendingDown, Building2, Globe, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockDebtComposition = [
  { name: 'External Debt', value: 1200000000, color: '#1E4D2B' },
  { name: 'Domestic Debt', value: 450000000, color: '#D4AF37' },
];

const mockMaturityProfile = [
  { name: '2026', external: 120, domestic: 45 },
  { name: '2027', external: 150, domestic: 60 },
  { name: '2028', external: 180, domestic: 55 },
  { name: '2029', external: 200, domestic: 40 },
  { name: '2030', external: 190, domestic: 30 },
];

export default function DebtPortfolioDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Debt Portfolio Dashboard</h1>
          <p className="text-sm text-muted mt-1">Monitor debt stock, service calendar, and fiscal risk</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Debt Stock', value: '$1.65B', trend: '45% of GDP', icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'External Debt', value: '$1.20B', trend: '72% of Total', icon: Globe, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Domestic Debt', value: '$450M', trend: '28% of Total', icon: Building2, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Debt Service Due (30d)', value: '$12.5M', trend: '3 Payments Pending', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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
        {/* Debt Composition */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-gold" /> Composition
            </h3>
          </div>
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
                >
                  {mockDebtComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-foreground">$1.65B</span>
              <span className="text-xs text-muted">Total Stock</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {mockDebtComposition.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="text-sm font-medium text-foreground">${(item.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Maturity Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-gold" /> Maturity Profile (Next 5 Years)
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> External</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Domestic</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockMaturityProfile} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}M`} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#222' : '#f5f5f5' }}
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${value}M`, '']}
                />
                <Bar dataKey="external" stackId="a" fill="#1E4D2B" radius={[0, 0, 4, 4]} />
                <Bar dataKey="domestic" stackId="a" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Debt Service Calendar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-gold" /> Upcoming Debt Service (30 Days)
          </h3>
          <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
            Full Calendar <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Creditor</th>
                <th className="px-4 py-3 font-medium">Instrument</th>
                <th className="px-4 py-3 font-medium text-right">Principal</th>
                <th className="px-4 py-3 font-medium text-right">Interest</th>
                <th className="px-4 py-3 font-medium text-right">Total Due</th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                { date: 'Oct 28, 2026', creditor: 'World Bank (IDA)', inst: 'IDA-5678', principal: 1500000, interest: 250000, status: 'Pending' },
                { date: 'Nov 05, 2026', creditor: 'African Development Bank', inst: 'AfDB-9012', principal: 800000, interest: 120000, status: 'Processing' },
                { date: 'Nov 15, 2026', creditor: 'Domestic Bond Series A', inst: 'BOND-2021-A', principal: 5000000, interest: 450000, status: 'Scheduled' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted" /> {row.date}
                  </td>
                  <td className="px-4 py-3 text-foreground">{row.creditor}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{row.inst}</td>
                  <td className="px-4 py-3 text-right text-foreground">${row.principal.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-muted">${row.interest.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-bold text-foreground">${(row.principal + row.interest).toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block",
                      row.status === 'Pending' ? "bg-orange-500/20 text-orange-500" :
                      row.status === 'Processing' ? "bg-blue-500/20 text-blue-500" :
                      "bg-brand-green/20 text-brand-green"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
