import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { DollarSign, ArrowRight, TrendingUp, Download, PieChart, Activity, Building2, Banknote } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium text-brand-green uppercase tracking-wider">Module 11 / Revenue Intelligence</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Revenue Collection Dashboard</h1>
          <p className="text-sm text-muted mt-1">Real-time tracking of LRA Taxes and Ministry Non-Tax Income against Fiscal Targets</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/finance/revenue/log"
            className="px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium hover:bg-brand-green/90 shadow-[0_4px_15px_rgba(30,77,43,0.3)] transition-all flex items-center gap-2"
          >
            <Banknote className="w-4 h-4" /> Log Revenue
          </Link>
          <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'YTD Total Collected', value: '$292.0M', target: '$270.0M Target', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Tax Revenue (LRA)', value: '$240.5M', target: '82% of Total', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Non-Tax Rev (Ministries)', value: '$51.5M', target: '18% of Total', icon: Building2, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Variance to Target', value: '+$22.0M', target: 'Surplus', icon: Activity, color: 'text-brand-green', bg: 'bg-brand-green/10' },
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
              <p className="text-xs font-medium text-brand-green mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance vs Target Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-green" /> Actual vs Target Trajectory (FY26 H2)
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> Actual Collected</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Monthly Target</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E4D2B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1E4D2B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000000}M`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                />
                <Area type="monotone" dataKey="target" stroke="#D4AF37" strokeDasharray="5 5" fillOpacity={0} />
                <Area type="monotone" dataKey="actual" stroke="#1E4D2B" fillOpacity={1} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Non-Tax Generators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-gold" /> Top Non-Tax Generators
            </h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              All MACs <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { inst: 'Ministry of Transport', amount: 15400000, type: 'Vehicle Registration' },
              { inst: 'Ministry of Commerce', amount: 12200000, type: 'Business Registry' },
              { inst: 'Ministry of Lands, Mines', amount: 9800000, type: 'Mining Licenses' },
              { inst: 'Immigration Services', amount: 4500000, type: 'Visa Fees' },
              { inst: 'Forestry Authority (FDA)', amount: 2100000, type: 'Logging Concessions' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border/50 bg-foreground/[0.02] hover:bg-foreground/5 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-foreground line-clamp-1">{item.inst}</span>
                  <span className="text-sm font-bold text-brand-gold">${(item.amount / 1000000).toFixed(1)}M</span>
                </div>
                <p className="text-xs text-muted flex items-start gap-1 mt-1">
                  {item.type}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
