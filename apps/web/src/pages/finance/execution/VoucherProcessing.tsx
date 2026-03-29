import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileText, CheckCircle, Package, Link as LinkIcon, FileCheck, ShieldAlert, ArrowRight, Stamp, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function VoucherProcessing() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [matchStatus, setMatchStatus] = useState<'pending' | 'matched' | 'discrepancy'>('pending');
  const [matchLogs, setMatchLogs] = useState<string[]>([]);
  const [isVoucherGenerated, setIsVoucherGenerated] = useState(false);

  const runStatutoryMatch = () => {
    const poValue = 35000;
    const invoiceValue = 35000;
    const ppccAuthorized = 35000;
    
    const logs = [];
    logs.push("MATCH: PO Value ($35,000) == Invoice Value ($35,000)");
    logs.push("MATCH: PPCC Clearance #AUTH-26-X verified for $35k ceiling");
    logs.push("MATCH: GRN-0902 confirmed 100% quantity acceptance");
    
    setMatchLogs(logs);
    setMatchStatus('matched');
  };

  const handleGenerateVoucher = () => {
    setIsVoucherGenerated(true);
  };

  if (isVoucherGenerated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-4"
        >
          <Stamp className="w-10 h-10 text-brand-gold" />
        </motion.div>
        <h2 className="text-3xl font-serif font-medium text-foreground tracking-tight">Statutory Voucher Created</h2>
        <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
          PV #2026-F4-0012 has been legally cleared by PPCC validation and is ready for remittance. Transfer this obligation to the EFT Gateway for electronic settlement.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-4 border border-brand-gold/30 bg-brand-gold/5">
          <div className="flex justify-between items-center pb-2 border-b border-brand-gold/20">
            <span className="text-sm text-muted uppercase tracking-widest text-[10px] font-bold">Beneficiary Entity</span>
            <span className="text-sm font-bold text-foreground">Liberia Tech Ltd.</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-brand-gold/20">
            <span className="text-sm text-muted uppercase tracking-widest text-[10px] font-bold">PPCC Clearance ID</span>
            <span className="text-sm font-mono font-bold text-blue-500">PPCC-AUTH-2026-X99</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-brand-gold/20">
            <span className="text-sm text-muted uppercase tracking-widest text-[10px] font-bold">Disbursement Amount</span>
            <span className="text-sm font-bold text-foreground font-mono">$35,000.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted uppercase tracking-widest text-[10px] font-bold">Treasury Status</span>
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-brand-green/20 text-brand-green px-2.5 py-1 rounded">
              <CheckCircle className="w-3 h-3" /> Ready for EFT Release
            </span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsVoucherGenerated(false);
              setMatchStatus('pending');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-xl transition-all font-medium text-sm"
          >
            Process Next Ledger
          </button>
          <Link 
            to="/app/finance/treasury?voucher=2026-F4-0012"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-xl transition-all font-bold text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Proceed to EFT Disbursement
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1500px] mx-auto min-h-screen pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Statutory Verification / Module 08</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-foreground tracking-tight mb-2">
             Statutory 4-Way Match
          </h1>
          <p className="text-sm text-muted max-w-xl font-serif italic text-muted/70 leading-relaxed">
            "Automated verification of Linkage between Budget Allotment, PPCC Documentation, Physical Goods Received, and Vendor Invoicing."
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        
        {/* Left Side: Invoice Queue Context */}
        <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
          <div className="glass-panel p-4 flex flex-col h-[600px]">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
               Pending Obligations
            </h3>
            <div className="overflow-y-auto pr-2 space-y-2">
              {[
                { id: 'INV-LiberiaTech-092', amount: 35000, date: 'Oct 25', status: 'ready', entity: 'MPW' },
                { id: 'INV-AlphaConstruct', amount: 150000, date: 'Oct 24', status: 'discrepancy', entity: 'MOH' },
                { id: 'INV-OfficeSupplies', amount: 4500, date: 'Oct 23', status: 'ready', entity: 'MOE' }
              ].map((inv, idx) => (
                <div key={idx} className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all",
                  idx === 0 ? "bg-brand-gold/10 border-brand-gold/30 shadow-lg shadow-brand-gold/5" : "bg-foreground/[0.02] border-border hover:bg-foreground/5"
                )}>
                  <div className="flex justify-between items-start mb-2">
                    <p className={cn("text-[10px] font-mono", idx === 0 ? "text-brand-gold font-bold" : "text-muted")}>{inv.id}</p>
                    <span className="text-[9px] font-black bg-foreground/5 px-1.5 py-0.5 rounded">{inv.entity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-foreground">${inv.amount.toLocaleString()}</span>
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
                <h2 className="text-xl font-medium text-foreground tracking-tight font-mono">INV-LT-092 / COMMIT-26</h2>
                <p className="text-xs text-muted uppercase tracking-widest mt-1 font-bold">Economic Code: 221401 • Ministry of Public Works</p>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={runStatutoryMatch}
                  disabled={matchStatus === 'matched'}
                  className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all", matchStatus === 'matched' ? "bg-foreground/10 text-muted border border-border" : "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20 active:translate-y-px")}
                 >
                   <ShieldCheck className="w-4 h-4" /> Run Statutory 4-Way Match
                 </button>
              </div>
           </div>

           {/* Matching Panes */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* PO Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-4", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted/30')}
                animate={matchStatus === 'matched' ? { y: [0, -5, 0] } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                       Budget PO
                    </h3>
                    <FileText className="w-4 h-4 text-blue-500" />
                 </div>
                 <div className="space-y-4">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Reference</span>
                     <span className="text-xs font-mono font-bold text-foreground">PO-26-0034</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Authorized Value</span>
                     <span className="text-xs font-mono font-bold text-foreground">$35,000.00</span>
                   </div>
                 </div>
              </motion.div>

              {/* PPCC Data (Statutory) */}
               <motion.div 
                className={cn("glass-panel p-5 border-t-4", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted/30')}
                animate={matchStatus === 'matched' ? { y: [0, -5, 0], transition: { delay: 0.1 } } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                       PPCC Clearance
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                 </div>
                 <div className="space-y-4">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Clearance ID</span>
                     <span className="text-xs font-mono font-bold text-foreground">PPCC-AUTH-26-X</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Oversight</span>
                     <span className="text-[10px] font-bold text-brand-green uppercase">Verified Statutory</span>
                   </div>
                 </div>
              </motion.div>

              {/* Delivery Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-4", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted/30')}
                animate={matchStatus === 'matched' ? { y: [0, -5, 0], transition: { delay: 0.2 } } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                       Delivery Note
                    </h3>
                    <Package className="w-4 h-4 text-orange-500" />
                 </div>
                 <div className="space-y-4">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Signed Receipt</span>
                     <span className="text-xs font-mono font-bold text-foreground">GRN-0902</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Asset Status</span>
                     <span className="text-[10px] font-black text-brand-green uppercase tracking-widest bg-brand-green/10 px-1.5 py-0.5 rounded w-fit">Accepted</span>
                   </div>
                 </div>
              </motion.div>

               {/* Invoice Data */}
              <motion.div 
                className={cn("glass-panel p-5 border-t-4", matchStatus === 'matched' ? 'border-t-brand-green' : 'border-t-muted/30')}
                animate={matchStatus === 'matched' ? { y: [0, -5, 0], transition: { delay: 0.3 } } : {}}
              >
                 <div className="flex justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2">
                       Vendor Invoice
                    </h3>
                    <FileText className="w-4 h-4 text-brand-gold" />
                 </div>
                 <div className="space-y-4">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Invoice Ref</span>
                     <span className="text-xs font-mono font-bold text-foreground">INV-092-LT</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted uppercase font-bold">Billed Amount</span>
                     <span className="text-xs font-mono font-bold text-foreground">$35,000.00</span>
                   </div>
                 </div>
              </motion.div>
           </div>

           {/* Matching Verdict Area */}
           <AnimatePresence>
             {matchStatus === 'matched' && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="overflow-hidden"
               >
                 <div className="glass-panel p-8 border-l-4 border-l-brand-green bg-brand-green/[0.03] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-brand-green rounded-2xl text-white shrink-0 shadow-lg shadow-brand-green/20">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-brand-green font-serif mb-2 tracking-tight">Statutory 4-Way Match Confirmed</h3>
                        <div className="space-y-1 mt-2">
                           {matchLogs.map((log, i) => (
                             <p key={i} className="text-[10px] font-mono text-brand-green/80 flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3" /> {log}
                             </p>
                           ))}
                        </div>
                        <p className="text-sm text-muted max-w-xl leading-relaxed font-serif italic mt-4">
                           Linkage between Budget PO #0034 and PPCC Clearance #AUTH-26-X has been verified as structurally sound.
                        </p>
                     </div>
                    </div>
                    
                    <button 
                      onClick={handleGenerateVoucher}
                      className="px-8 py-5 bg-brand-gold text-brand-dark rounded-xl text-sm font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] hover:scale-[1.02] hover:-translate-y-1 transition-all flex items-center gap-4 w-full md:w-auto shrink-0 whitespace-nowrap active:scale-95"
                    >
                      <Stamp className="w-5 h-5" /> Issue Statutory PV
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


