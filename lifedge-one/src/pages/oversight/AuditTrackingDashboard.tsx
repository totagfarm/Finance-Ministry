import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, CheckCircle, Clock, AlertTriangle, Search, Filter, ArrowRight, FileText, Building2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockAudits = [
  { id: 'AUD-2026-012', entity: 'Ministry of Health', type: 'Financial', status: 'In Progress', findings: 4, dueDate: 'Nov 15, 2026' },
  { id: 'AUD-2026-011', entity: 'Liberia Revenue Authority', type: 'Compliance', status: 'Drafting Report', findings: 2, dueDate: 'Oct 30, 2026' },
  { id: 'AUD-2026-010', entity: 'Ministry of Education', type: 'Performance', status: 'Completed', findings: 12, dueDate: 'Sep 15, 2026' },
  { id: 'AUD-2026-009', entity: 'National Port Authority', type: 'Financial', status: 'Planning', findings: 0, dueDate: 'Dec 01, 2026' },
  { id: 'AUD-2026-008', entity: 'Ministry of Public Works', type: 'Compliance', status: 'In Progress', findings: 7, dueDate: 'Nov 20, 2026' },
];

export default function AuditTrackingDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Audit Tracking Dashboard</h1>
          <p className="text-sm text-muted mt-1">Monitor ongoing audits, findings, and remediation plans</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search audits..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Audits', value: '24', trend: 'Across 18 Entities', icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Open Findings', value: '142', trend: '35 High Risk', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Remediated (YTD)', value: '85', trend: '60% Resolution Rate', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Overdue Responses', value: '12', trend: 'Requires Escalation', icon: Clock, color: 'text-red-500', bg: 'bg-red-500/10' },
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

      {/* Audits Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
          <h3 className="font-medium text-sm text-foreground">Audit Engagement Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Audit ID</th>
                <th className="px-4 py-3 font-medium">Entity</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-center">Findings</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockAudits.map((audit, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{audit.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted" /> {audit.entity}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{audit.type}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block",
                      audit.status === 'Completed' ? "bg-brand-green/20 text-brand-green" :
                      audit.status === 'In Progress' ? "bg-blue-500/20 text-blue-500" :
                      audit.status === 'Drafting Report' ? "bg-brand-gold/20 text-brand-gold" :
                      "bg-foreground/10 text-foreground"
                    )}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "font-bold",
                      audit.findings > 5 ? "text-red-500" :
                      audit.findings > 0 ? "text-orange-500" :
                      "text-muted"
                    )}>
                      {audit.findings}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {audit.dueDate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-brand-gold hover:text-brand-gold-dark font-medium text-xs transition-colors">
                      View Details
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
