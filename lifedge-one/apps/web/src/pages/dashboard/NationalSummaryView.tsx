import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, Activity, PieChart as PieChartIcon, TrendingUp, Download } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  LineChart, Line
} from 'recharts';
import { useTheme } from '../../components/ThemeProvider';
import { cn } from '../../lib/utils';

const yearlyFiscalData = [
  { month: 'Jul', revenue: 45, appropriation: 100, allotment: 20, execution: 15 },
  { month: 'Aug', revenue: 52, appropriation: 100, allotment: 45, execution: 30 },
  { month: 'Sep', revenue: 61, appropriation: 100, allotment: 55, execution: 48 },
  { month: 'Oct', revenue: 48, appropriation: 100, allotment: 70, execution: 65 },
  { month: 'Nov', revenue: 59, appropriation: 100, allotment: 85, execution: 75 },
  { month: 'Dec', revenue: 80, appropriation: 100, allotment: 95, execution: 92 },
];

const sectorAllocation = [
  { name: 'Health', budget: 150, spent: 120 },
  { name: 'Education', budget: 200, spent: 180 },
  { name: 'Infrastructure', budget: 350, spent: 210 },
  { name: 'Defense', budget: 120, spent: 110 },
  { name: 'Agriculture', budget: 80, spent: 45 },
];

export default function NationalSummaryView({ currentRole }: { currentRole: string }) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const tooltipBg = isDark ? '#1A1A1A' : '#FFFFFF';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-foreground/[0.02] p-4 rounded-xl border border-border">
        <div>
          <h2 className="text-lg font-medium text-foreground">National Fiscal Summary (FY 2026/27)</h2>
          <p className="text-xs text-muted">Aggregated macroeconomic indicators and budget execution.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Fiscal Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col"
        >
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-gold" /> Revenue vs. Execution Curve
              </h3>
              <p className="text-xs text-muted">Domestic revenue generation mapped against spending.</p>
            </div>
          </div>
          <div className="flex-1 min-h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyFiscalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: isDark ? '#fff' : '#000' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="appropriation" name="Appropriation Ceiling" stroke={isDark ? '#555' : '#ccc'} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="revenue" name="Total Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="allotment" name="Allotments Issued" stroke="#1E4D2B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="execution" name="Actual Execution" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Breakdown Panel */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 flex-1"
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-border pb-2">
              <PieChartIcon className="w-4 h-4 text-brand-green" /> Key Fiscal Ratios
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">Execution vs Allotment</span>
                  <span className="font-medium text-foreground">96.8%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-2">
                  <div className="bg-brand-gold h-2 rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">Revenue vs Projection</span>
                  <span className="font-medium text-foreground">104.2%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-2">
                  <div className="bg-brand-green h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-[10px] text-brand-green mt-1 text-right">+4.2% Surplus</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">Debt Servicing to Revenue</span>
                  <span className="font-medium text-foreground">14.5%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '14.5%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 bg-brand-gold/5 border-brand-gold/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-gold/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-brand-gold" />
              </div>
              <h4 className="text-sm font-medium text-foreground">Available Treasury Balance</h4>
            </div>
            <p className="text-3xl font-serif font-semibold text-foreground">$142.5M</p>
            <p className="text-xs text-brand-green mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% from last week
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sector Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6"
      >
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-foreground">Sector Value Realization</h3>
            <p className="text-xs text-muted">Execution rate by primary government sectors.</p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorAllocation} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
              <RechartsTooltip 
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: isDark ? '#fff' : '#000' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="budget" name="Approved Budget" fill={isDark ? '#333' : '#e5e7eb'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" name="Executed" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}
