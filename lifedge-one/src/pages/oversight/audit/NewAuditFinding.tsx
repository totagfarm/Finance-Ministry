import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { ShieldAlert, Save, CheckCircle, ArrowLeft, Building2, AlertTriangle, Link as LinkIcon, FileText } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewAuditFinding() {
  const { theme } = useTheme();
  
  const [auditee, setAuditee] = useState('Ministry of Health');
  const [findingCategory, setFindingCategory] = useState('Financial Irregularity');
  const [severity, setSeverity] = useState('High Risk');
  const [description, setDescription] = useState('');
  const [remediationDeadline, setRemediationDeadline] = useState('');
  const [auditFramework, setAuditFramework] = useState('General Agency Audit');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Finding ID
  const findingId = `AUD-FINDING-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !remediationDeadline) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Audit Finding Registered</h2>
        <p className="text-muted">
          The infraction has been officially logged in the compliance registry. A mandatory remediation countdown has begun for the audited entity.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-red-500/30 bg-red-500/5">
          <div className="flex justify-between items-center border-b border-red-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Statutory Tracking ID</span>
            <div className="bg-foreground/5 px-3 py-1 rounded border border-red-500/30">
              <span className="text-lg font-mono font-bold text-red-500 tracking-widest">{findingId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Audited Entity (MAC)</span>
            <span className="text-sm font-medium text-foreground">{auditee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Infraction Category</span>
            <span className="text-sm font-medium text-foreground">{findingCategory}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Assigned Severity</span>
            <span className={cn(
              "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
              severity === 'High Risk' ? 'bg-red-500/20 text-red-500' :
              severity === 'Medium Risk' ? 'bg-orange-500/20 text-orange-500' :
              'bg-blue-500/20 text-blue-500'
            )}>
              {severity}
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-red-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Remediation Deadline</span>
            <span className="text-sm font-bold text-foreground">{new Date(remediationDeadline).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setDescription('');
              setRemediationDeadline('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Log Another Finding
          </button>
          <Link 
            to="/app/oversight/audit"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Audit Hub
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
          <Link to="/app/oversight/audit" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Audit Hub
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Module 16 / Internal Audit</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Log Official Finding
          </h1>
          <p className="text-sm text-muted">
            Register compliance failures, financial irregularities, and audit infractions enforcing strict agency remediation.
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
              <Building2 className="w-4 h-4 text-red-500" /> Entity & Framework
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Audited Entity (MAC / SOE)</label>
                <select 
                  value={auditee}
                  onChange={(e) => setAuditee(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors"
                >
                  <option>Ministry of Health</option>
                  <option>Liberia Revenue Authority</option>
                  <option>Ministry of Education</option>
                  <option>Ministry of Public Works</option>
                  <option>National Port Authority</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Audit Framework / Source</label>
                <select 
                  value={auditFramework}
                  onChange={(e) => setAuditFramework(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors"
                >
                  <option>General Agency Audit (Internal)</option>
                  <option>GAC External Report</option>
                  <option>Performance & Operations Review</option>
                  <option>Special Investigation</option>
                  <option>LACC Whistleblower Flag</option>
                </select>
              </div>

            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Infraction Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Finding Category</label>
                <select 
                  value={findingCategory}
                  onChange={(e) => setFindingCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors"
                >
                  <option>Financial Irregularity / Missing Funds</option>
                  <option>Procurement Violation (PPCC)</option>
                  <option>Ghost Worker / Payroll Fraud</option>
                  <option>Unjustified Sole Sourcing</option>
                  <option>Procedural Non-Compliance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Risk Severity</label>
                <select 
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors"
                >
                  <option>High Risk</option>
                  <option>Medium Risk</option>
                  <option>Low Risk / Administrative</option>
                </select>
              </div>

              {severity === 'High Risk' && (
                <div className="md:col-span-2 flex items-start gap-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 leading-tight">
                    <strong>Critical Escalation:</strong> Logging a High Risk finding automatically alerts the Liberia Anti-Corruption Commission (LACC) and halts all active Ministry treasury allotments until a formal remediation response is accepted.
                  </p>
                </div>
              )}

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <FileText className="w-3 h-3 text-red-500" /> Finding Description / Evidence Summary
                </label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the exact nature of the compliance failure, missing documentation, or fiscal irregularity..."
                  className="w-full h-32 bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   Statutory Remediation Deadline
                </label>
                <input 
                  type="date" 
                  required
                  value={remediationDeadline}
                  onChange={(e) => setRemediationDeadline(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-red-500 outline-none transition-colors dark:[color-scheme:dark]"
                />
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Save as Draft
            </button>
            <button 
              type="submit"
              disabled={!description || !remediationDeadline}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !description || !remediationDeadline
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-red-600 text-white hover:bg-red-500 shadow-[0_4px_15px_rgba(239,68,68,0.3)] hover:-translate-y-0.5"
              )}
            >
              <ShieldAlert className="w-4 h-4" /> Issue Formal Finding
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Ensure proper icon is available locally in the file or imported top
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
