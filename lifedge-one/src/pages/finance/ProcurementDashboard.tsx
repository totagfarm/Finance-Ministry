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
          { label: 'Compliance Flags', value: '7', target: 'Requires Audit', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
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
              <p className="text-xs font-medium text-muted mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-500" /> E-Tendering Pipeline (IFB)
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
                  <th className="px-4 py-3 font-medium">Bids Received</th>
                  <th className="px-4 py-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { ifb: 'IFB/MOH/NCB/001', entity: 'Ministry of Health', val: 450000, bids: 12, deadline: 'Tomorrow' },
                  { ifb: 'IFB/MPW/ICB/004', entity: 'Ministry of Public Works', val: 2500000, bids: 4, deadline: 'Oct 30' },
                  { ifb: 'IFB/MOE/NCB/012', entity: 'Ministry of Education', val: 1200000, bids: 8, deadline: 'Nov 05' },
                  { ifb: 'IFB/MOF/NCB/002', entity: 'Ministry of Finance', val: 180000, bids: 3, deadline: 'Nov 12' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{row.ifb}</td>
                    <td className="px-4 py-3 text-foreground">{row.entity}</td>
                    <td className="px-4 py-3 text-brand-gold font-medium">${row.val.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-center">{row.bids}</td>
                    <td className="px-4 py-3">
                       <span className="bg-red-500/10 text-red-500 px-2.5 py-1 rounded text-xs font-bold">{row.deadline}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <AlertTriangle className="w-5 h-5 text-red-500" /> Compliance Audit
            </h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { inst: 'Liberia Water & Sewer', issue: 'Missing PPCA Clearance' },
              { inst: 'Ministry of Defense', issue: 'Sole Source Justification Denied' },
              { inst: 'Ministry of Agriculture', issue: 'Contract Award Exceeds Budget' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-foreground line-clamp-1">{item.inst}</span>
                </div>
                <p className="text-xs text-red-500 flex items-start gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {item.issue}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
