import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, CheckCircle, AlertCircle, Clock, FileText, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockSubmissionData = [
  { name: 'Health', submitted: 85, pending: 15 },
  { name: 'Education', submitted: 90, pending: 10 },
  { name: 'Infrastructure', submitted: 60, pending: 40 },
  { name: 'Agriculture', submitted: 75, pending: 25 },
  { name: 'Defense', submitted: 100, pending: 0 },
];

const mockCeilingUtilization = [
  { name: 'Q1', utilized: 25, ceiling: 25 },
  { name: 'Q2', utilized: 45, ceiling: 50 },
  { name: 'Q3', utilized: 70, ceiling: 75 },
  { name: 'Q4', utilized: 95, ceiling: 100 },
];

export default function BudgetCycleDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Budget Cycle Dashboard</h1>
          <p className="text-sm text-muted mt-1">FY 2026/27 Formulation & Hearings</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            Active Cycle: Hearings
          </span>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Ceiling', value: '$3.2B', trend: '+5% vs FY25', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Submissions Received', value: '42 / 56', trend: '75% Complete', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Unresolved Comments', value: '128', trend: 'Requires Action', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Days to Deadline', value: '14', trend: 'Legislative Submission', icon: Clock, color: 'text-red-500', bg: 'bg-red-500/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Completion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif">Submission Completion by Sector</h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSubmissionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} horizontal={false} />
                <XAxis type="number" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#222' : '#f5f5f5' }}
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                />
                <Bar dataKey="submitted" stackId="a" fill="#1E4D2B" radius={[0, 0, 0, 0]} name="Submitted (%)" />
                <Bar dataKey="pending" stackId="a" fill={isDark ? '#333' : '#e5e5e5'} radius={[0, 4, 4, 0]} name="Pending (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Ceiling Utilization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif">Ceiling Utilization Trend</h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCeilingUtilization} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                />
                <Line type="monotone" dataKey="ceiling" stroke="#D4AF37" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Ceiling Target" />
                <Line type="monotone" dataKey="utilized" stroke="#1E4D2B" strokeWidth={3} dot={{ r: 4, fill: '#1E4D2B', strokeWidth: 2, stroke: isDark ? '#1A1A1A' : '#fff' }} activeDot={{ r: 6 }} name="Actual Requested" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Hearing Schedule */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-foreground font-serif">Upcoming Hearings</h3>
          <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
            Full Schedule <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Date & Time</th>
                <th className="px-4 py-3 font-medium">Institution</th>
                <th className="px-4 py-3 font-medium">Committee</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Oct 24, 09:00 AM', inst: 'Ministry of Health', comm: 'Social Services', status: 'Scheduled' },
                { date: 'Oct 24, 02:00 PM', inst: 'Ministry of Education', comm: 'Education & Training', status: 'Scheduled' },
                { date: 'Oct 25, 10:00 AM', inst: 'Ministry of Public Works', comm: 'Infrastructure', status: 'Pending Docs' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-foreground/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted" /> {row.date}
                  </td>
                  <td className="px-4 py-3 text-foreground">{row.inst}</td>
                  <td className="px-4 py-3 text-muted">{row.comm}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md",
                      row.status === 'Scheduled' ? "bg-brand-green/20 text-brand-green" : "bg-orange-500/20 text-orange-500"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-brand-gold hover:text-brand-gold-dark font-medium text-xs transition-colors">
                      View Pack
                    </button>
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
