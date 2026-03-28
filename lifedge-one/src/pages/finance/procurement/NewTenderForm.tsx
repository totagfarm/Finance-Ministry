import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileSignature, Send, CheckCircle, ArrowLeft, ShoppingCart, ShieldCheck, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewTenderForm() {
  const { theme } = useTheme();
  
  const [procurementMethod, setProcurementMethod] = useState('National Competitive Bidding (NCB)');
  const [entity, setEntity] = useState('Ministry of Public Works');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [ifbNumber, setIfbNumber] = useState('');
  const [ppId, setPpId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked portal ID
  const portalId = `EP-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimatedValue || !ifbNumber || !ppId || !deadline) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Tender Published to E-Portal</h2>
        <p className="text-muted">
          Your Invitation for Bids has been registered and pushed to the public procurement portal for vendor access.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-between">
            <span className="text-sm text-muted">E-Portal Link ID</span>
            <span className="text-sm font-mono font-bold text-foreground">{portalId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">IFB Number</span>
            <span className="text-sm font-medium text-foreground">{ifbNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Procurement Value</span>
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(estimatedValue))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Bidding Closes</span>
            <span className="text-sm font-bold text-red-500">{deadline}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setEstimatedValue('');
              setIfbNumber('');
              setPpId('');
              setDeadline('');
              setDescription('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Publish Another Tender
          </button>
          <Link 
            to="/app/finance/procurement"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isSoleSource = procurementMethod === 'Sole Source / Direct Procurement';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/finance/procurement" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Procurement Hub
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 12 / Tender Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Publish New IFB
          </h1>
          <p className="text-sm text-muted">
            Transcribe an approved Procurement Plan into a live Invitation for Bids on the national E-Tendering portal.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 mt-6"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Statutory Linkage
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Procuring Entity</label>
                <select 
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>Ministry of Public Works</option>
                  <option>Ministry of Health</option>
                  <option>Ministry of Education</option>
                  <option>Liberia Electricity Corp (LEC)</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Approved Procurement Plan ID</label>
                <input 
                  type="text" 
                  required
                  value={ppId}
                  onChange={(e) => setPpId(e.target.value.toUpperCase())}
                  placeholder="e.g. PP-MPW-2026-04"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground focus:border-blue-500 outline-none transition-colors uppercase"
                />
                {!ppId && <AlertTriangle className="w-4 h-4 text-orange-500 absolute right-3 top-9" />}
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <ShoppingCart className="w-4 h-4 text-blue-500" /> Bidding Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Tender (IFB) Reference Number</label>
                <input 
                  type="text" 
                  required
                  value={ifbNumber}
                  onChange={(e) => setIfbNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. IFB/MPW/NCB/001/26"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground focus:border-blue-500 outline-none transition-colors uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Procurement Method</label>
                <select 
                  value={procurementMethod}
                  onChange={(e) => setProcurementMethod(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>National Competitive Bidding (NCB)</option>
                  <option>International Competitive Bidding (ICB)</option>
                  <option>Request for Quotations (RFQ)</option>
                  <option>Sole Source / Direct Procurement</option>
                </select>
              </div>

              {isSoleSource && (
                <div className="md:col-span-2 flex items-start gap-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500 leading-tight">
                    <strong>High Audit Risk.</strong> Sole Sourcing strictly bypasses competitive etendering. This submission will automatically trigger a PPCC (Public Procurement and Concessions Commission) compliance flag requiring written ministerial waiver approval.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Estimated Contract Value (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    required
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border-2 border-border rounded-lg pl-8 pr-4 py-3 text-xl font-bold text-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Submission Deadline</label>
                <input 
                  type="datetime-local" 
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors dark:[color-scheme:dark]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Equipment/Service Specifications</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of goods or works required..."
                  required
                  className="w-full h-24 resize-none bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Draft & Save
            </button>
            <button 
              type="submit"
              disabled={!estimatedValue || !ifbNumber || !ppId || !deadline}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !estimatedValue || !ifbNumber || !ppId || !deadline
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
              )}
            >
              <Send className="w-4 h-4" /> Publish to E-Portal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
