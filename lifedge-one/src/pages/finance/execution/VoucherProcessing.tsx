import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileText, CheckCircle, Package, Link as LinkIcon, FileCheck, ShieldAlert, ArrowRight, Stamp, Send } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function VoucherProcessing() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [matchStatus, setMatchStatus] = useState<'pending' | 'matched' | 'discrepancy'>('pending');

  const runThreeWayMatch = () => {
    setMatchStatus('matched');
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1500px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 8 / Accountability</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Voucher Processing & 3-Way Match
          </h1>
          <p className="text-sm text-muted">
            Verify automated linkage between Purchase Order, Delivery Note, and Vendor Invoice before routing to Treasury.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Invoice Queue Context */}
        <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
          <div className="glass-panel p-4 flex flex-col h-[500px]">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
               Pending Invoices
            </h3>
            <div className="overflow-y-auto pr-2 space-y-2">
              {[
                { id: 'INV-LiberiaTech-092', amount: 35000, date: 'Oct 25', status: 'ready' },
                { id: 'INV-AlphaConstruct', amount: 150000, date: 'Oct 24', status: 'discrepancy' },
                { id: 'INV-OfficeSupplies', amount: 4500, date: 'Oct 23', status: 'ready' }
              ].map((inv, idx) => (
                <div key={idx} className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-colors",
                  idx === 0 ? "bg-brand-gold/10 border-brand-gold/30" : "bg-foreground/[0.02] border-border hover:bg-foreground/5"
                )}>
                  <p className={cn("text-xs font-mono mb-1", idx === 0 ? "text-brand-gold font-bold" : "text-foreground font-medium")}>{inv.id}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-foreground">${inv.amount.toLocaleString()}</span>
                    {inv.status === 'ready' ? 
                      <CheckCircle className="w-3 h-3 text-brand-green" /> : 
                      <ShieldAlert className="w-3 h-3 text-red-500" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Execution View */}
        <div className="flex-1 space-y-6">
          
          {/* Header Action Bar */}
           <div className="glass-panel p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-medium text-foreground font-mono">INV-LiberiaTech-092</h2>
                <p className="text-sm text-muted">Ministry of Finance • Economic Code: 221401</p>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={runThreeWayMatch}
                  disabled={matchStatus === 'matched'}
                  className={cn("px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all", matchStatus === 'matched' ? "bg-foreground/10 text-muted" : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg")}
                 >
                   <FileCheck className="w-4 h-4" /> Run Automated 3-Way Match
                 </button>
              </div>
           </div>

           {/* Matching Panes */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* PO Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-2", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted')}
                animate={matchStatus === 'matched' ? { scale: [1, 1.02, 1] } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" /> System PO
                    </h3>
                    <span className="text-xs font-mono text-foreground">PO-26-0034</span>
                 </div>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Vendor</span>
                     <span className="text-sm font-medium text-foreground">Liberia Tech</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Total Auth</span>
                     <span className="text-sm font-medium text-foreground">$35,000.00</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Items Expected</span>
                     <span className="text-sm font-medium text-foreground">22 Units</span>
                   </div>
                 </div>
              </motion.div>

              {/* Delivery Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-2", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted')}
                animate={matchStatus === 'matched' ? { scale: [1, 1.02, 1], transition: { delay: 0.1 } } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-500" /> Receiving Report
                    </h3>
                    <span className="text-xs font-mono text-foreground">GRN-0902</span>
                 </div>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Signed By</span>
                     <span className="text-sm font-medium text-foreground">Warehouse Mgr</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Condition</span>
                     <span className="text-sm font-medium text-brand-green">Good (Accepted)</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Items Received</span>
                     <span className="text-sm font-medium text-foreground">22 Units</span>
                   </div>
                 </div>
              </motion.div>

               {/* Invoice Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-2", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted')}
                animate={matchStatus === 'matched' ? { scale: [1, 1.02, 1], transition: { delay: 0.2 } } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-gold" /> Vendor Invoice
                    </h3>
                    <span className="text-xs font-mono text-foreground">INV-092</span>
                 </div>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Remit To</span>
                     <span className="text-sm font-medium text-foreground">Liberia Tech</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Amount Billed</span>
                     <span className="text-sm font-medium text-foreground">$35,000.00</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-sm text-muted">Items Billed</span>
                     <span className="text-sm font-medium text-foreground">22 Units</span>
                   </div>
                 </div>
              </motion.div>
           </div>

           {/* Matching Verdict Area */}
           <AnimatePresence>
             {matchStatus === 'matched' && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="overflow-hidden"
               >
                 <div className="glass-panel p-8 border-l-4 border-l-brand-green bg-brand-green/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-brand-green rounded-full text-white">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-brand-green mb-1">Perfect Three-Way Match Verified</h3>
                        <p className="text-sm text-muted max-w-lg">
                          The System Purchase Order, Physical Receiving Report, and Vendor Invoice are entirely aligned in quantity, unit price, and vendor entity. Modifying any detail going forward is prohibited.
                        </p>
                      </div>
                    </div>
                    
                    <button className="px-6 py-4 bg-brand-gold text-brand-dark rounded-xl text-lg font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:bg-brand-gold-dark hover:translate-y-[-2px] transition-all flex items-center gap-3 w-full md:w-auto shrink-0 whitespace-nowrap">
                      <Stamp className="w-5 h-5" /> Generate Payment Voucher
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
