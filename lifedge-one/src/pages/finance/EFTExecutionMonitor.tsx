import React from 'react';
import { motion } from 'motion/react';
import { Activity, CheckCircle, AlertTriangle, Clock, ArrowRight, RefreshCw, XCircle, Send } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockBatches = [
  { id: 'EFT-2026-1042', status: 'Completed', amount: 12500000, count: 450, date: 'Oct 24, 14:30' },
  { id: 'EFT-2026-1043', status: 'Received by Bank', amount: 8400000, count: 320, date: 'Oct 24, 15:45' },
  { id: 'EFT-2026-1044', status: 'Sent', amount: 5200000, count: 180, date: 'Oct 24, 16:10' },
  { id: 'EFT-2026-1045', status: 'Failed', amount: 150000, count: 12, date: 'Oct 24, 16:20' },
  { id: 'EFT-2026-1046', status: 'Pending Confirmation', amount: 3400000, count: 95, date: 'Oct 24, 16:30' },
];

export default function EFTExecutionMonitor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">EFT Execution Monitor</h1>
          <p className="text-sm text-muted mt-1">Track straight-through payment execution and bank reconciliation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-foreground/5 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/10 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Sync Status
          </button>
        </div>
      </div>

      {/* Status Board */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Sent', value: '12', icon: Send, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Received by Bank', value: '8', icon: Activity, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Completed', value: '145', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Failed', value: '3', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Reversed', value: '1', icon: RefreshCw, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Pending Confirmation', value: '5', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-4 relative overflow-hidden group flex flex-col items-center justify-center text-center"
          >
            <div className={cn("p-2 rounded-full mb-3", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-xs font-medium text-muted uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Batches */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-gold" /> Recent EFT Batches
            </h3>
            <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Batch ID</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Amount (LRD)</th>
                  <th className="px-4 py-3 font-medium text-right">Transactions</th>
                  <th className="px-4 py-3 font-medium text-right">Last Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockBatches.map((batch, idx) => (
                  <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{batch.id}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md flex items-center gap-1.5 w-max",
                        batch.status === 'Completed' ? "bg-brand-green/20 text-brand-green" :
                        batch.status === 'Failed' ? "bg-red-500/20 text-red-500" :
                        batch.status === 'Received by Bank' ? "bg-brand-gold/20 text-brand-gold" :
                        batch.status === 'Sent' ? "bg-blue-500/20 text-blue-500" :
                        "bg-purple-500/20 text-purple-500"
                      )}>
                        {batch.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                        {batch.status === 'Failed' && <XCircle className="w-3 h-3" />}
                        {batch.status === 'Received by Bank' && <Activity className="w-3 h-3" />}
                        {batch.status === 'Sent' && <Send className="w-3 h-3" />}
                        {batch.status === 'Pending Confirmation' && <Clock className="w-3 h-3" />}
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">${batch.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-muted">{batch.count}</td>
                    <td className="px-4 py-3 text-right text-muted text-xs">{batch.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Failed Transfer Queue */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Failed Transfer Queue
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {[
              { id: 'TRX-89234', payee: 'Acme Corp', amount: 45000, reason: 'Invalid Account Number' },
              { id: 'TRX-89235', payee: 'Global Supplies', amount: 120000, reason: 'Bank Routing Error' },
              { id: 'TRX-89236', payee: 'John Doe', amount: 2500, reason: 'Account Closed' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-foreground">{item.id}</span>
                  <span className="text-sm font-bold text-foreground">${item.amount.toLocaleString()}</span>
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1">{item.payee}</h4>
                <p className="text-xs text-red-500 flex items-start gap-1 mt-2">
                  <XCircle className="w-3 h-3 shrink-0 mt-0.5" /> {item.reason}
                </p>
                <div className="mt-3 flex justify-end gap-2">
                  <button className="px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium text-muted hover:text-foreground transition-colors">
                    Edit Details
                  </button>
                  <button className="px-3 py-1.5 bg-brand-gold/20 text-brand-gold rounded-md text-xs font-medium hover:bg-brand-gold/30 transition-colors">
                    Retry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
