import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, FileCheck, Search, Filter, ArrowRight, Building2, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockComplianceData = [
  { id: 'COMP-2026-001', entity: 'Ministry of Finance', requirement: 'Monthly Financial Report', status: 'Compliant', dueDate: 'Oct 31, 2026', submitted: 'Oct 28, 2026' },
  { id: 'COMP-2026-002', entity: 'Ministry of Health', requirement: 'Quarterly Procurement Plan', status: 'Non-Compliant', dueDate: 'Sep 30, 2026', submitted: '-' },
  { id: 'COMP-2026-003', entity: 'Liberia Revenue Authority', requirement: 'Annual Audit Response', status: 'Pending Review', dueDate: 'Nov 15, 2026', submitted: 'Nov 01, 2026' },
  { id: 'COMP-2026-004', entity: 'Ministry of Education', requirement: 'Payroll Verification', status: 'Compliant', dueDate: 'Oct 15, 2026', submitted: 'Oct 14, 2026' },
  { id: 'COMP-2026-005', entity: 'National Port Authority', requirement: 'Asset Declaration', status: 'At Risk', dueDate: 'Nov 30, 2026', submitted: '-' },
];

export default function ComplianceMonitor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Compliance Monitor</h1>
          <p className="text-sm text-muted mt-1">Track institutional adherence to financial and administrative regulations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search entities or requirements..." 
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
          { label: 'Overall Compliance Rate', value: '82%', trend: '+5% from last month', icon: ShieldCheck, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Non-Compliant Entities', value: '14', trend: 'Requires Intervention', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Pending Reviews', value: '38', trend: 'Documentation Submitted', icon: FileCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Upcoming Deadlines', value: '25', trend: 'Next 14 Days', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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

      {/* Compliance Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
          <h3 className="font-medium text-sm text-foreground">Institutional Compliance Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Tracking ID</th>
                <th className="px-4 py-3 font-medium">Entity</th>
                <th className="px-4 py-3 font-medium">Requirement</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockComplianceData.map((item, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted">{item.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted" /> {item.entity}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{item.requirement}</td>
                  <td className="px-4 py-3 text-muted flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {item.dueDate}
                  </td>
                  <td className="px-4 py-3 text-muted">{item.submitted}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block flex items-center gap-1 w-fit",
                      item.status === 'Compliant' ? "bg-brand-green/20 text-brand-green" :
                      item.status === 'Non-Compliant' ? "bg-red-500/20 text-red-500" :
                      item.status === 'At Risk' ? "bg-orange-500/20 text-orange-500" :
                      "bg-blue-500/20 text-blue-500"
                    )}>
                      {item.status === 'Compliant' && <CheckCircle className="w-3 h-3" />}
                      {item.status === 'Non-Compliant' && <AlertTriangle className="w-3 h-3" />}
                      {item.status === 'At Risk' && <Clock className="w-3 h-3" />}
                      {item.status === 'Pending Review' && <FileCheck className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-brand-gold hover:text-brand-gold-dark font-medium text-xs transition-colors">
                      Review
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
