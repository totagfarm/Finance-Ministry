import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Upload, DollarSign, Building2, AlertTriangle, CheckCircle, ArrowRight, Save, Send } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

export default function NewAllotmentRequest() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [requestedAmount, setRequestedAmount] = useState('');

  // Mock auto-computed data
  const approvedAllocation = 1500000;
  const priorAllotments = 800000;
  const commitments = 750000;
  const availableBalance = approvedAllocation - priorAllotments;
  const recommendedAmount = Math.min(availableBalance, 250000); // Mock logic

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">New Allotment Request</h1>
          <p className="text-sm text-muted mt-1">Request spending authority against approved appropriation</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-transparent border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <Send className="w-4 h-4" /> Submit Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="glass-panel p-6">
            <h3 className="text-lg font-medium text-foreground font-serif mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-gold" /> Request Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Fiscal Period</label>
                <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
                  <option>Q3 - FY 2026/27</option>
                  <option>Q4 - FY 2026/27</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Institution</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input type="text" value="Ministry of Health" disabled className="w-full bg-foreground/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground opacity-70 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Fund Source</label>
                <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
                  <option>GoL Consolidated Fund</option>
                  <option>World Bank Grant IDA-123</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Budget Line / Economic Code</label>
                <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
                  <option>221101 - Drugs and Medical Supplies</option>
                  <option>221102 - Medical Equipment</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted">Program / Project</label>
                <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none">
                  <option>P-001: National Malaria Control Program</option>
                  <option>P-002: Maternal Health Initiative</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Requested Amount (LRD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold" />
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    className="w-full bg-background border-2 border-border rounded-lg pl-10 pr-4 py-3 text-lg font-medium text-foreground focus:outline-none focus:border-brand-gold transition-colors" 
                  />
                </div>
                {Number(requestedAmount) > availableBalance && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" /> Requested amount exceeds available balance.
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted">Justification</label>
                <textarea 
                  rows={4}
                  placeholder="Provide detailed justification for this allotment request..."
                  className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted">Supporting Documents</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-foreground/5 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-gold/10 transition-colors">
                    <Upload className="w-6 h-6 text-muted group-hover:text-brand-gold transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted mt-1">PDF, Excel, or Word (max. 10MB)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Auto-computed Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-lg font-medium text-foreground font-serif mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-green" /> Financial Context
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted">Approved Allocation</span>
                <span className="text-sm font-medium text-foreground">${approvedAllocation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted">Prior Allotments</span>
                <span className="text-sm font-medium text-foreground">${priorAllotments.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted">Commitments</span>
                <span className="text-sm font-medium text-foreground">${commitments.toLocaleString()}</span>
              </div>
              
              <div className="pt-2 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Available Balance</span>
                  <span className="text-lg font-serif font-medium text-brand-green">${availableBalance.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-green rounded-full" 
                    style={{ width: `${(priorAllotments / approvedAllocation) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-muted mt-2 text-right">
                  {((priorAllotments / approvedAllocation) * 100).toFixed(1)}% of allocation utilized
                </p>
              </div>

              <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-brand-gold mb-1">Cash Plan Indicator</h4>
                    <p className="text-xs text-muted leading-relaxed mb-3">
                      Based on current treasury liquidity forecasts, the recommended approvable amount for this period is capped.
                    </p>
                    <div className="flex justify-between items-center bg-background/50 rounded-lg p-2 border border-brand-gold/10">
                      <span className="text-xs font-medium text-foreground">Recommended Cap</span>
                      <span className="text-sm font-bold text-brand-gold">${recommendedAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
