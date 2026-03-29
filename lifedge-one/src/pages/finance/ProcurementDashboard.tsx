import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingCart, AlertTriangle, ArrowRight, CheckCircle, FileSignature, LayoutTemplate, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ProcurementDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LayoutTemplate className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 12 / E-Procurement</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Procurement Compliance Hub</h1>
          <p className="text-sm text-muted mt-1">Oversight for Procurement Plans, Bidding, and Contract Awards</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'PPs Approved', value: '84', target: '93% Compliance', icon: FileSignature, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Active E-Tenders', value: '124', target: '$45.2M Pipeline', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Contracts Awarded', value: '312', target: 'YTD Executed', icon: CheckCircle, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Pending Payment', value: '$8.4M', target: '12 High-Value PVs', icon: LinkIcon, color: 'text-red-500', bg: 'bg-red-500/10' },
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
              <p className="text-xs font-medium text-muted mt-2 tracking-tight">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* E-Tendering Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-500" /> Active Procurement Pipeline
            </h3>
            <Link to="/app/finance/procurement/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.3)]">
              Publish New Tender <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
           <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">IFB Number</th>
                  <th className="px-4 py-3 font-medium">Entity</th>
                  <th className="px-4 py-3 font-medium">Est. Value</th>
                  <th className="px-4 py-3 font-medium">Phase</th>
                  <th className="px-4 py-3 font-medium">Payment Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { ifb: 'IFB/MOH/NCB/001', entity: 'Ministry of Health', val: 450000, phase: 'Bidding', status: 'N/A' },
                  { ifb: 'IFB/MPW/ICB/004', entity: 'Ministry of Public Works', val: 2500000, phase: 'Awarded', status: 'PV Issued' },
                  { ifb: 'IFB/MOE/NCB/012', entity: 'Ministry of Education', val: 1200000, phase: 'Evaluation', status: 'Pending' },
                  { ifb: 'IFB/MOF/NCB/002', entity: 'Ministry of Finance', val: 180000, phase: 'Awarded', status: 'Disbursed' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer group">
                    <td className="px-4 py-3 font-mono text-xs text-foreground font-medium group-hover:text-blue-500 transition-colors">{row.ifb}</td>
                    <td className="px-4 py-3 text-foreground">{row.entity}</td>
                    <td className="px-4 py-3 text-brand-gold font-medium font-mono">${row.val.toLocaleString()}</td>
                    <td className="px-4 py-3">
                       <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        row.phase === 'Awarded' ? "bg-brand-green/10 text-brand-green border border-brand-green/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                       )}>
                        {row.phase}
                       </span>
                    </td>
                    <td className="px-4 py-3">
                      {row.phase === 'Awarded' ? (
                        <Link to="/app/finance/execution/vouchers" className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-xs">
                          {row.status} <LinkIcon className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-muted italic text-[11px]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Disbursement Velocity (IFMIS)</h4>
            <div className="relative h-2 bg-foreground/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-gold to-brand-green"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-muted font-medium">YTD Allotments Released (68%)</span>
              <span className="text-[10px] text-muted font-medium">$42.4M / $62.0M Authorized</span>
            </div>
          </div>
        </motion.div>

        {/* Audit Watchlist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <AlertTriangle className="text-red-500 w-5 h-5" /> Procurement Compliance
            </h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { inst: 'Liberia Water & Sewer', issue: 'Unmatched Invoice vs PO', severity: 'High' },
              { inst: 'Ministry of Defense', issue: 'Sole Source Justification Pending', severity: 'Medium' },
              { inst: 'Ministry of Agriculture', issue: 'Over-disbursement on Line Item', severity: 'High' }
            ].map((item, idx) => (
              <div key={idx} className={cn(
                "p-4 rounded-xl border transition-colors cursor-pointer group",
                item.severity === 'High' ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/10" : "border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10"
              )}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-foreground group-hover:text-blue-500 transition-colors line-clamp-1 font-serif">{item.inst}</span>
                </div>
                <p className={cn(
                  "text-xs flex items-start gap-1 mt-1",
                  item.severity === 'High' ? "text-red-500" : "text-orange-500"
                )}>
                  <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {item.issue}
                </p>
              </div>
            ))}
          </div>

          <Link to="/app/oversight/audit" className="mt-6 w-full py-2.5 text-center text-xs font-bold text-muted hover:text-foreground border border-border rounded-lg transition-colors bg-foreground/[0.02]">
             View Full Audit Ledger
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

