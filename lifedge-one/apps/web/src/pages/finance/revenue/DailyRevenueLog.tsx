import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileText, Save, CheckCircle, ArrowLeft, Banknote, Building2, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function DailyRevenueLog() {
  const { theme } = useTheme();
  
  const [revenueType, setRevenueType] = useState('Tax Revenue (LRA)');
  const [amount, setAmount] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a random mocked submission ID
  const submissionId = `REV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !receiptNumber) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Revenue Successfully Logged</h2>
        <p className="text-muted">
          Your collection report has been mathematically verified and posted to the General Revenue Account.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-brand-green/30 bg-brand-green/5">
          <div className="flex justify-between">
            <span className="text-sm text-muted">Transaction Hash ID</span>
            <span className="text-sm font-mono font-bold text-foreground">{submissionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Amount</span>
            <span className="text-sm font-bold text-brand-green">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Receipt Ref</span>
            <span className="text-sm font-medium text-foreground">{receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Timestamp</span>
            <span className="text-sm font-medium text-foreground">{new Date().toLocaleString()}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setAmount('');
              setReceiptNumber('');
              setDescription('');
            }}
            className="px-6 py-2.5 border border-border text-foreground hover:bg-foreground/5 rounded-lg transition-colors font-medium text-sm"
          >
            Log Another Receipt
          </button>
          <Link 
            to="/app/finance/revenue"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/finance/revenue" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Revenue Hub
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium text-brand-green uppercase tracking-wider">Module 11 / Transaction Log</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Daily Revenue Input
          </h1>
          <p className="text-sm text-muted">
            Digitally record tax receipts, non-tax fees, and miscellaneous collections directly into the Treasury ledger.
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
              <Banknote className="w-4 h-4 text-brand-green" /> Collection Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Revenue Classification</label>
                <select 
                  value={revenueType}
                  onChange={(e) => setRevenueType(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-green outline-none transition-colors"
                >
                  <option>Tax Revenue (LRA)</option>
                  <option>Non-Tax Revenue (Ministries/Agencies)</option>
                  <option>Customs & Tariffs</option>
                  <option>Grants/Miscellaneous</option>
                </select>
              </div>

              {revenueType === 'Non-Tax Revenue (Ministries/Agencies)' && (
                 <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Collecting Agency
                  </label>
                  <select 
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-green outline-none transition-colors"
                  >
                    <option>Ministry of Transport (Vehicle Reg)</option>
                    <option>Ministry of Commerce (Business Reg)</option>
                    <option>Immigration Services (Visas/Passports)</option>
                    <option>Forestry Authority (Concessions)</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Deposit Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border-2 border-border rounded-lg pl-8 pr-4 py-3 text-xl font-bold text-brand-green focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Physical Receipt / Bank Swift Number</label>
                <input 
                  type="text" 
                  required
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  placeholder="e.g. REC-8992-001"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground focus:border-brand-green outline-none transition-colors uppercase"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Description / Narration</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional context regarding this collection..."
                  className="w-full h-24 resize-none bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-green outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Clear Form
            </button>
            <button 
              type="submit"
              disabled={!amount || !receiptNumber}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !amount || !receiptNumber
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-brand-green text-white hover:bg-brand-green/90 shadow-[0_4px_15px_rgba(30,77,43,0.3)] hover:-translate-y-0.5"
              )}
            >
              <Save className="w-4 h-4" /> Log Revenue to Ledger
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
