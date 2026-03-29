import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertTriangle, XCircle, Search, Filter, ChevronDown, ArrowRight, FileText, DollarSign, Activity, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockRequests = [
  { id: 'AR-2026-001', inst: 'Ministry of Health', amount: 250000, status: 'Pending', risk: 'High', date: 'Oct 24, 2026' },
  { id: 'AR-2026-002', inst: 'Ministry of Education', amount: 120000, status: 'Pending', risk: 'Low', date: 'Oct 23, 2026' },
  { id: 'AR-2026-003', inst: 'Ministry of Public Works', amount: 850000, status: 'Pending', risk: 'Medium', date: 'Oct 22, 2026' },
];

export default function ValidationWorkspace() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedRequest, setSelectedRequest] = useState(mockRequests[0]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Validation Workspace</h1>
          <p className="text-sm text-muted mt-1">Review and validate allotment requests against appropriations and cash plans</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Request Queue (Left Panel) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 flex flex-col glass-panel overflow-hidden"
        >
          <div className="p-4 border-b border-border bg-foreground/5 shrink-0 flex justify-between items-center">
            <h3 className="font-medium text-sm text-foreground">Pending Validation (12)</h3>
            <button className="text-xs text-brand-gold flex items-center gap-1 hover:underline">
              Sort by Risk <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {mockRequests.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200 group",
                  selectedRequest.id === req.id 
                    ? "bg-brand-gold/10 border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                    : "bg-background border-border hover:border-brand-gold/50 hover:bg-foreground/5"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted">{req.id}</span>
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-md",
                    req.risk === 'High' ? "bg-red-500/20 text-red-500" :
                    req.risk === 'Medium' ? "bg-orange-500/20 text-orange-500" :
                    "bg-brand-green/20 text-brand-green"
                  )}>
                    {req.risk} Risk
                  </span>
                </div>
                <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-1">{req.inst}</h4>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-bold text-foreground">${req.amount.toLocaleString()}</span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {req.date}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Validation Details (Right Panel) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 flex flex-col glass-panel overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border shrink-0 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-serif font-medium text-foreground">{selectedRequest.id}</h2>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg text-xs font-medium">
                  Under Review
                </span>
              </div>
              <p className="text-sm text-muted">{selectedRequest.inst} • Q3 FY 2026/27</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted mb-1">Requested Amount</p>
              <p className="text-2xl font-bold text-foreground">${selectedRequest.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Rule Check Results */}
            <section>
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-brand-gold" /> System Rule Checks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-brand-green/30 bg-brand-green/5 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Appropriation Limit</h4>
                    <p className="text-xs text-muted">Request is within the approved annual appropriation balance ($1.2M remaining).</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Cash Plan Feasibility</h4>
                    <p className="text-xs text-muted">Exceeds recommended Q3 liquidity cap by $50,000. Treasury review required.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Prior Utilization</h4>
                    <p className="text-xs text-muted">Previous Q2 allotment shows only 65% utilization. Dormant funds detected.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-brand-green/30 bg-brand-green/5 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Document Compliance</h4>
                    <p className="text-xs text-muted">All required supporting documents and justifications are attached.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Request Lines */}
            <section>
              <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-brand-gold" /> Request Lines
              </h3>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Code</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                      <th className="px-4 py-3 font-medium text-right">Requested</th>
                      <th className="px-4 py-3 font-medium text-right">Approvable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-foreground/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">221101</td>
                      <td className="px-4 py-3 text-foreground">Drugs and Medical Supplies</td>
                      <td className="px-4 py-3 text-right font-medium">${(150000).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium text-brand-green">${(150000).toLocaleString()}</td>
                    </tr>
                    <tr className="hover:bg-foreground/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">221102</td>
                      <td className="px-4 py-3 text-foreground">Medical Equipment</td>
                      <td className="px-4 py-3 text-right font-medium">${(100000).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-medium text-orange-500">${(50000).toLocaleString()}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-foreground/5 border-t border-border font-medium">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-right">Total:</td>
                      <td className="px-4 py-3 text-right">${selectedRequest.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-brand-gold">${(200000).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

          </div>

          {/* Action Bar (Footer) */}
          <div className="p-4 border-t border-border bg-foreground/5 shrink-0 flex items-center justify-between">
            <button className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
              View Full History
            </button>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-transparent border border-red-500/50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors">
                Return to MAC
              </button>
              <button className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-500/20 transition-colors">
                Partially Approve ($200k)
              </button>
              <button className="px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium hover:bg-brand-green/90 transition-colors shadow-lg shadow-brand-green/20">
                Validate & Approve
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
