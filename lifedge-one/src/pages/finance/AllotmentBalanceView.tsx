import React from 'react';
import { motion } from 'motion/react';
import { Building2, TrendingUp, AlertCircle, DollarSign, Activity, FileText, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockUtilizationData = [
  { name: 'Q1', allotted: 250000, committed: 240000, paid: 220000 },
  { name: 'Q2', allotted: 300000, committed: 280000, paid: 250000 },
  { name: 'Q3', allotted: 450000, committed: 150000, paid: 50000 },
  { name: 'Q4', allotted: 0, committed: 0, paid: 0 },
];

export default function AllotmentBalanceView() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const approvedAllocation = 1500000;
  const totalAllotted = 1000000;
  const totalCommitted = 670000;
  const totalPaid = 520000;
  
  const unreleasedBalance = approvedAllocation - totalAllotted;
  const uncommittedBalance = totalAllotted - totalCommitted;
  const unpaidCommitments = totalCommitted - totalPaid;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Entity Allotment Balance</h1>
          <p className="text-sm text-muted mt-1 flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Ministry of Health • FY 2026/27
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
            <option>All Fund Sources</option>
            <option>GoL Consolidated Fund</option>
            <option>Donor Grants</option>
          </select>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Main Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Approved Allocation', value: approvedAllocation, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Total Allotted', value: totalAllotted, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Total Committed', value: totalCommitted, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Total Paid', value: totalPaid, color: 'text-brand-green', bg: 'bg-brand-green/10' },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", card.bg)}>
                <DollarSign className={cn("w-5 h-5", card.color)} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">${card.value.toLocaleString()}</h3>
              <p className="text-sm font-medium text-muted">{card.label}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="glass-panel p-6">
            <h3 className="text-lg font-medium text-foreground font-serif mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-gold" /> Current Balances
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted">Unreleased Allocation</span>
                  <span className="text-sm font-bold text-foreground">${unreleasedBalance.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(unreleasedBalance / approvedAllocation) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-muted mt-1 text-right">{((unreleasedBalance / approvedAllocation) * 100).toFixed(1)}% of total</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted">Uncommitted Allotment</span>
                  <span className="text-sm font-bold text-brand-gold">${uncommittedBalance.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold rounded-full" style={{ width: `${(uncommittedBalance / totalAllotted) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-muted mt-1 text-right">{((uncommittedBalance / totalAllotted) * 100).toFixed(1)}% of allotted</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted">Unpaid Commitments</span>
                  <span className="text-sm font-bold text-orange-500">${unpaidCommitments.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(unpaidCommitments / totalCommitted) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-muted mt-1 text-right">{((unpaidCommitments / totalCommitted) * 100).toFixed(1)}% of committed</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-orange-500 mb-1">Dormant Funds Alert</h4>
                <p className="text-xs text-muted">High uncommitted balance detected in Q2 allotments. Consider accelerating procurement plans.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Utilization Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-gold" /> Utilization Trend
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-gold"></span> Allotted</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Committed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-green"></span> Paid</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockUtilizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e5e5'} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#222' : '#f5f5f5' }}
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="allotted" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                <Bar dataKey="committed" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paid" fill="#1E4D2B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
