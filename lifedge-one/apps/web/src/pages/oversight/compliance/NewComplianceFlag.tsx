import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AlertOctagon, Save, CheckCircle, ArrowLeft, Building2, CalendarX, Link as LinkIcon, FileText, Scale } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewComplianceFlag() {
  const { theme } = useTheme();
  
  const [auditee, setAuditee] = useState('Ministry of Education');
  const [requirement, setRequirement] = useState('Monthly Financial Target Report');
  const [penalty, setPenalty] = useState('Administrative Warning');
  const [daysLate, setDaysLate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Flag ID
  const flagId = `REG-FLAG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !daysLate) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
          <AlertOctagon className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Violation Automatically Registered</h2>
        <p className="text-muted">
          The non-compliance infraction has been broadcast to the respective oversight commission and a formal penalty trajectory has been initiated.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-orange-500/30 bg-orange-500/5">
          <div className="flex justify-between items-center border-b border-orange-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Statutory Tracking Ref</span>
            <div className="bg-foreground/5 px-3 py-1 rounded border border-orange-500/30">
              <span className="text-lg font-mono font-bold text-orange-500 tracking-widest">{flagId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Deficient Entity</span>
            <span className="text-sm font-medium text-foreground">{auditee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Failed Requirement</span>
            <span className="text-sm font-medium text-foreground">{requirement}</span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-orange-500 flex items-center gap-2"><Scale className="w-4 h-4" /> Enforced Penalty</span>
            <span className="text-sm font-bold text-foreground">{penalty}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setDescription('');
              setDaysLate('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Log Another Violation
          </button>
          <Link 
            to="/app/oversight/compliance"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Tracker
          </Link>
        </div>
      </div>
    );
  }

  const isSeverePenalty = penalty === 'Freeze Active Treasury Allotments' || penalty === 'LACC Immediate Investigation';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/oversight/compliance" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Compliance Monitor
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Module 17 / Regulatory Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Override & Flag Violation
          </h1>
          <p className="text-sm text-muted">
            Execute manual regulatory overrides for missing asset declarations, absent procurement plans, and late financial reports.
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
              <Building2 className="w-4 h-4 text-orange-500" /> Institutional Target
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Deficient Entity (MAC)</label>
                <select 
                  value={auditee}
                  onChange={(e) => setAuditee(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                >
                  <option>Ministry of Education</option>
                  <option>Liberia Revenue Authority</option>
                  <option>Ministry of Health</option>
                  <option>Ministry of Public Works</option>
                  <option>National Port Authority</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Failed Requirement</label>
                <select 
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                >
                  <option>Monthly Financial Target Report</option>
                  <option>Quarterly Procurement Plan (PPCC)</option>
                  <option>Annual Asset Declaration (LACC)</option>
                  <option>Legislative Budget Defend Document</option>
                  <option>Payroll Verification Audit</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <CalendarX className="w-3 h-3 text-orange-500" /> Days Overdue
                </label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={daysLate}
                  onChange={(e) => setDaysLate(e.target.value)}
                  placeholder="e.g. 14"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                />
              </div>

            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <Scale className="w-4 h-4 text-orange-500" /> Statutory Enforcement
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Applicable Penalty / Action Escalation</label>
                <select 
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                >
                  <option>Administrative Warning Letter</option>
                  <option>Suspend Institutional Procurement Rights (PPCC)</option>
                  <option>Freeze Active Treasury Allotments</option>
                  <option>LACC Immediate Investigation</option>
                </select>
              </div>

              {isSeverePenalty && (
                <div className="flex items-start gap-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500 leading-tight">
                    <strong>High Impact Escalation!</strong> Executing a Treasury Freeze or an LACC Direct Investigation requires simultaneous notification to the Minister's office. This action mechanically disables the entity's ability to transact within the wider TRACE environment.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <FileText className="w-3 h-3 text-orange-500" /> Official Justification / Override Reason
                </label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide explicit fiscal or regulatory reasoning before issuing penalty override..."
                  className="w-full h-32 bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors resize-none"
                />
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Cancel Draft
            </button>
            <button 
              type="submit"
              disabled={!description || !daysLate}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !description || !daysLate
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_4px_15px_rgba(234,88,12,0.3)] hover:-translate-y-0.5"
              )}
            >
              <AlertOctagon className="w-4 h-4" /> Enforce Violation
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
