import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileSignature, Send, CheckCircle, ArrowLeft, ShoppingCart, ShieldCheck, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';
import StatutoryHandshake from '../../../components/finance/StatutoryHandshake';

export default function NewTenderForm() {
  const { theme } = useTheme();
  
  const [procurementMethod, setProcurementMethod] = useState('National Competitive Bidding (NCB)');
  const [entity, setEntity] = useState('Ministry of Public Works');
  const [entityCategory, setEntityCategory] = useState('MAC');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [ifbNumber, setIfbNumber] = useState('');
  const [ppId, setPpId] = useState('');
  const [ppccApprovalId, setPpccApprovalId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked portal ID
  const portalId = `EP-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  const isHighValue = Number(estimatedValue) >= 10000;
  const remainsInBudget = Number(estimatedValue) <= 1200000; // Mock budget check

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimatedValue || !ifbNumber || !ppId || !deadline) return;
    if (isHighValue && !ppccApprovalId) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-10 h-10 text-blue-500" />
        </motion.div>
        <h2 className="text-3xl font-serif font-medium text-foreground tracking-tight">Statutory Clearance Issued</h2>
        <p className="text-muted leading-relaxed max-w-lg">
          Your IFB has been validated against the MFDP Annual Budget and synchronized with the PPCC e-Portal. 
          {isHighValue ? " MFDP Payment Authorization is active." : " Internal Entity Payment is required (Under $10k Threshold)."}
        </p>
        
        <div className="w-full max-w-md">
           <StatutoryHandshake 
              status="authorized" 
              entity={entity} 
              value={Number(estimatedValue)} 
           />
        </div>

        <div className="glass-panel p-6 w-full text-left space-y-4 border border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
            <span className="text-sm text-muted">Statutory ID</span>
            <span className="text-sm font-mono font-bold text-foreground">{portalId}</span>
          </div>
          {isHighValue && (
            <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
              <span className="text-sm text-muted">PPCC Clearance</span>
              <span className="text-sm font-mono font-bold text-blue-500">{ppccApprovalId}</span>
            </div>
          )}
          <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
            <span className="text-sm text-muted">Procurement Value</span>
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(estimatedValue))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Bidding Closes</span>
            <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-1 rounded">{deadline}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setEstimatedValue('');
              setIfbNumber('');
              setPpId('');
              setPpccApprovalId('');
              setDeadline('');
              setDescription('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-xl transition-all font-medium text-sm"
          >
            Publish New Tender
          </button>
          <Link 
            to="/app/finance/procurement"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-xl transition-all font-bold text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isSoleSource = procurementMethod === 'Sole Source / Direct Procurement';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/finance/procurement" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-all group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Procurement Hub
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Statutory Framework / Module 12</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-foreground tracking-tight mb-2">
            Publish New Tender
          </h1>
          <p className="text-sm text-muted max-w-xl font-serif italic text-muted/70">
            "Every tender exceeding $10,000 USD must include formal PPCC structural oversight and be cross-referenced against the MFDP annual allocation."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> Statutory Mandate & Budget
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Procuring Entity</label>
                    <div className="flex gap-2">
                       <select 
                        value={entityCategory}
                        onChange={(e) => setEntityCategory(e.target.value)}
                        className="w-32 bg-foreground/5 border border-border rounded-xl px-4 py-4 text-xs font-bold text-foreground focus:border-blue-500 transition-all uppercase"
                       >
                         <option value="MAC">MAC</option>
                         <option value="SOE">SOE</option>
                         <option value="COUNTY">COUNTY</option>
                       </select>
                       <select 
                        value={entity}
                        onChange={(e) => setEntity(e.target.value)}
                        className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:border-blue-500 outline-none transition-all font-serif"
                       >
                        <option>Ministry of Public Works</option>
                        <option>Ministry of Health</option>
                        <option>Ministry of Education</option>
                        <option>NOCAL (SOE)</option>
                        <option>Montserrado County Admin</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Annual Procurement Plan ID</label>
                    <input 
                      type="text" 
                      required
                      value={ppId}
                      onChange={(e) => setPpId(e.target.value.toUpperCase())}
                      placeholder="e.g. PP-MPW-2026-04"
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm font-mono text-foreground focus:border-blue-500 outline-none transition-all uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <ShoppingCart className="w-4 h-4 text-blue-500" /> Contract Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Tender Threshold Check (USD)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                      <input 
                        type="number" 
                        required
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        placeholder="0.00"
                        className={cn(
                          "w-full bg-background border-2 rounded-xl pl-10 pr-5 py-4 text-xl font-bold text-foreground focus:ring-1 outline-none transition-all font-mono",
                          isHighValue ? "border-blue-500/50 focus:border-blue-500" : "border-border focus:border-blue-500"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Procurement Method</label>
                    <select 
                      value={procurementMethod}
                      onChange={(e) => setProcurementMethod(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:border-blue-500 outline-none transition-all"
                    >
                      <option>National Competitive Bidding (NCB)</option>
                      <option>International Competitive Bidding (ICB)</option>
                      <option>Request for Quotations (RFQ)</option>
                      <option>Sole Source / Direct Procurement</option>
                    </select>
                  </div>

                   {isHighValue && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className="md:col-span-2 space-y-4"
                     >
                       <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] flex items-start gap-4">
                          <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.1em] mb-1">PPCC Statutory Oversight Required</p>
                            <p className="text-[11px] text-muted leading-relaxed">
                              This procurement exceeds the $10,000.00 USD threshold. Per Liberian Procurement Law, this tender must be supervised and approved by the **PPCC**. A valid Statutory Approval Clearance is required to proceed to the E-Portal.
                            </p>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-blue-500">PPCC Approval / Clearance ID</label>
                          <input 
                            type="text" 
                            required={isHighValue}
                            value={ppccApprovalId}
                            onChange={(e) => setPpccApprovalId(e.target.value.toUpperCase())}
                            placeholder="e.g. PPCC-AUTH-2026-X99"
                            className="w-full bg-background border-2 border-blue-500/30 rounded-xl px-5 py-4 text-sm font-mono text-foreground focus:border-blue-500 outline-none transition-all uppercase"
                          />
                       </div>
                     </motion.div>
                   )}

                  {isSoleSource && (
                    <div className="md:col-span-2 p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.03] flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-500 uppercase tracking-[0.1em] mb-1">High Compliance Vulnerability</p>
                        <p className="text-[11px] text-muted leading-relaxed font-serif">
                          Direct procurement bypasses national competitive frameworks. This action will be flagged on the MFDP Audit Dashboard as a High-Risk event.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-x-2 md:col-span-2 grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted">IFB Reference Number</label>
                      <input 
                        type="text" 
                        required
                        value={ifbNumber}
                        onChange={(e) => setIfbNumber(e.target.value.toUpperCase())}
                        placeholder="IFB/MPW/NCB/001"
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm font-mono text-foreground focus:border-blue-500 outline-none transition-all uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted">Portal Submission Deadline</label>
                      <input 
                        type="datetime-local" 
                        required
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:border-blue-500 outline-none transition-all dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">Detailed Scope of Works / Supplies</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail the exact technical specifications..."
                      required
                      className="w-full h-28 resize-none bg-background border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:border-blue-500 outline-none transition-all font-serif"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-end gap-4">
                <button 
                  type="submit"
                  disabled={!estimatedValue || !ifbNumber || !ppId || !deadline || !remainsInBudget || (isHighValue && !ppccApprovalId)}
                  className={cn(
                    "px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-3 transition-all",
                    !estimatedValue || !ifbNumber || !ppId || !deadline || !remainsInBudget || (isHighValue && !ppccApprovalId)
                      ? "bg-foreground/10 text-muted cursor-not-allowed border border-border" 
                      : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_25px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:translate-y-0"
                  )}
                >
                  <Send className="w-4 h-4" /> Publish Statutory Tender
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Dynamic Statutory Context Bar */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 border-l-4 border-l-brand-gold bg-brand-gold/[0.02]"
          >
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-4 flex items-center gap-2">
              <FileSignature className="w-4 h-4" /> Budget Guardrail
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Annual Allocation (M&A)</span>
                <span className="text-foreground font-mono font-bold">$4,500,000.00</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted">Total YTD Commitment</span>
                <span className="text-foreground font-mono font-bold">$3,120,400.00</span>
              </div>
              <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                 <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '69%' }}
                  className="h-full bg-brand-gold"
                 />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Remaining Headroom</span>
                <span className={cn("text-xs font-mono font-black", remainsInBudget ? "text-brand-green" : "text-red-500")}>
                  ${(1379600 - (Number(estimatedValue) || 0)).toLocaleString()}
                </span>
              </div>
              {!remainsInBudget && (
                <div className="text-[10px] text-red-500 font-bold bg-red-500/10 p-2 rounded text-center">
                  Error: Insufficient Budget Allocation
                </div>
              )}
            </div>
          </motion.div>
          
          <div className="glass-panel p-6 border-l-4 border-l-blue-500 bg-blue-500/[0.02]">
             <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> PPCC Compliance
            </h3>
            <p className="text-[11px] text-muted leading-relaxed mb-4">
              Statutory oversight is automatically enabled for all spending entities.
            </p>
            <div className="space-y-3">
               {[
                 { label: 'PPCC Threshold', val: '$10,000.00' },
                 { label: 'Supervision', val: 'Mandatory' },
                 { label: 'Approval Method', val: 'External/Statutory' }
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center bg-foreground/[0.03] p-2 rounded border border-border">
                    <span className="text-[9px] text-muted uppercase font-bold">{item.label}</span>
                    <span className="text-[9px] text-foreground font-black uppercase">{item.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

