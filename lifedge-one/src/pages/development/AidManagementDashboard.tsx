import React from 'react';
import { motion } from 'motion/react';
import { Globe, DollarSign, Activity, ArrowRight, MapPin, Building2, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockAidBySector = [
  { name: 'Health', value: 45000000, color: '#1E4D2B' },
  { name: 'Education', value: 35000000, color: '#D4AF37' },
  { name: 'Infrastructure', value: 85000000, color: '#3b82f6' },
  { name: 'Agriculture', value: 25000000, color: '#f97316' },
  { name: 'Governance', value: 15000000, color: '#8b5cf6' },
];

const mockDisbursements = [
  { name: 'Q1', planned: 25000000, actual: 22000000 },
  { name: 'Q2', planned: 30000000, actual: 28000000 },
  { name: 'Q3', planned: 45000000, actual: 15000000 },
  { name: 'Q4', planned: 50000000, actual: 0 },
];

export default function AidManagementDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Aid Management Dashboard</h1>
          <p className="text-sm text-muted mt-1">Monitor donor commitments, disbursements, and sector allocations</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
            <option>All Donors</option>
            <option>World Bank</option>
            <option>USAID</option>
            <option>European Union</option>
          </select>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Committed Aid', value: '$450.5M', trend: 'Active Portfolio', icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Disbursed YTD', value: '$125.2M', trend: '28% of Committed', icon: Activity, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Active Projects', value: '84', trend: 'Across 15 Counties', icon: Globe, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Reports Due (30d)', value: '12', trend: '3 Overdue', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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
        {/* Aid by Sector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-gold" /> Aid by Sector
            </h3>
          </div>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAidBySector}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockAidBySector.map((entry, index) => (
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
              <span className="text-2xl font-bold text-foreground">$205M</span>
              <span className="text-xs text-muted">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {mockAidBySector.map((item, idx) => (
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

        {/* Planned vs Actual Disbursements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brand-gold" /> Planned vs Actual Disbursements
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Planned</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> Actual</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDisbursements} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000000}M`} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#222' : '#f5f5f5' }}
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                />
                <Bar dataKey="planned" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#1E4D2B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
