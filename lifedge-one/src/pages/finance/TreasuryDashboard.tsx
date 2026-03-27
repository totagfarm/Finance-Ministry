import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Activity, AlertTriangle, ArrowRight, CheckCircle, Clock, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockCashForecast = [
  { name: 'Mon', inflow: 4000, outflow: 2400 },
  { name: 'Tue', inflow: 3000, outflow: 1398 },
  { name: 'Wed', inflow: 2000, outflow: 9800 },
  { name: 'Thu', inflow: 2780, outflow: 3908 },
  { name: 'Fri', inflow: 1890, outflow: 4800 },
  { name: 'Sat', inflow: 2390, outflow: 3800 },
  { name: 'Sun', inflow: 3490, outflow: 4300 },
];

export default function TreasuryDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Treasury Dashboard</h1>
          <p className="text-sm text-muted mt-1">Monitor liquidity, cash forecasts, and payment execution</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" /> Run Cash Plan
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Cash on Hand', value: '$125.4M', trend: '+2.4% vs Last Week', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Pending Batches', value: '$42.1M', trend: '15 Batches Awaiting Release', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Failed Transfers', value: '12', trend: '$1.2M Value', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Unreconciled Lines', value: '458', trend: 'Requires Action', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
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
        {/* Cash Forecast Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-gold" /> 7-Day Liquidity Forecast
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> Inflows</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Outflows</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCashForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#222' : '#f5f5f5' }}
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="inflow" fill="#1E4D2B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Arrears Watchlist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" /> Arrears Watchlist
            </h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {[
              { inst: 'Ministry of Public Works', amount: 4500000, days: 45, type: 'Vendor Payments' },
              { inst: 'Ministry of Health', amount: 1200000, days: 30, type: 'Medical Supplies' },
              { inst: 'Ministry of Education', amount: 850000, days: 60, type: 'Contractor Fees' },
              { inst: 'Ministry of Agriculture', amount: 320000, days: 15, type: 'Subsidies' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-foreground line-clamp-1">{item.inst}</span>
                  <span className="text-sm font-bold text-orange-500">${(item.amount / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {item.type}
                  </span>
                  <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.days} Days
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
