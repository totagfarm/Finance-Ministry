import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Filter, Search, Calendar, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';

const mockReports = [
  { id: 'RPT-001', name: 'Monthly Fiscal Outturn', category: 'Finance', date: 'Oct 31, 2026', format: 'PDF' },
  { id: 'RPT-002', name: 'Donor Aid Disbursement Summary', category: 'Development', date: 'Oct 15, 2026', format: 'Excel' },
  { id: 'RPT-003', name: 'Q3 Audit Findings Report', category: 'Oversight', date: 'Sep 30, 2026', format: 'PDF' },
  { id: 'RPT-004', name: 'National Debt Sustainability Analysis', category: 'Finance', date: 'Sep 15, 2026', format: 'PDF' },
  { id: 'RPT-005', name: 'Project Implementation Status', category: 'Development', date: 'Aug 31, 2026', format: 'Excel' },
];

export default function Reports() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted mt-1">Access standardized reports and generate custom analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Categories */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-2">Categories</h3>
          {[
            { name: 'All Reports', count: 124, active: true },
            { name: 'Finance & Budget', count: 45, active: false },
            { name: 'Development & Aid', count: 32, active: false },
            { name: 'Oversight & Audit', count: 28, active: false },
            { name: 'Custom Analytics', count: 19, active: false },
          ].map((category, idx) => (
            <button
              key={idx}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                category.active 
                  ? "bg-brand-gold/10 text-brand-gold" 
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <span>{category.name}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                category.active ? "bg-brand-gold/20" : "bg-foreground/10"
              )}>
                {category.count}
              </span>
            </button>
          ))}

          <div className="mt-8 p-4 bg-foreground/5 rounded-xl border border-border">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <BarChart2 className="w-4 h-4 text-brand-gold" /> Custom Report Builder
            </h4>
            <p className="text-xs text-muted mb-4">Create custom reports by selecting specific data points and visualizations.</p>
            <button className="w-full px-4 py-2 bg-foreground/10 text-foreground rounded-lg text-sm font-medium hover:bg-foreground/20 transition-colors">
              Launch Builder
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="md:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
              <h3 className="font-medium text-sm text-foreground">Recent Reports</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Report Name</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Date Generated</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {mockReports.map((report, idx) => (
                    <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer group">
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted" /> {report.name}
                        </div>
                        <div className="text-xs text-muted mt-1 font-mono">{report.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-foreground/10 text-foreground text-xs font-medium rounded-md">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {report.date}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-2 text-muted hover:text-brand-gold transition-colors rounded-md hover:bg-brand-gold/10 opacity-0 group-hover:opacity-100">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
