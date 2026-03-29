import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Search, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Building2, 
  Scale, 
  Clock,
  Save,
  Trash2
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const steps = [
  { number: 1, title: 'Scope & Entity', icon: Building2 },
  { number: 2, title: 'Finding Context', icon: AlertTriangle },
  { number: 3, title: 'Remediation', icon: Clock },
  { number: 4, title: 'Review', icon: CheckCircle },
];

export default function AuditFindingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    entity: 'Ministry of Health',
    auditType: 'Financial Compliance',
    severity: 'High',
    findingTitle: '',
    description: '',
    evidenceReference: '',
    remediationDeadline: '',
    responsibleOfficial: '',
    financialImpact: '',
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step < 4) return;
    
    // Simulate commit to master audit ledger
    alert("Official Audit Finding successfully committed to the national oversight database.");
    navigate('/app/oversight/audit');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 pt-8 px-4 font-inter">
      {/* Structural Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 shrink-0 border-b border-border pb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Oversight Induction / Module 16</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-foreground tracking-tight">
            Log Official Finding
          </h1>
          <p className="text-sm text-muted mt-2 max-w-md leading-relaxed font-serif italic text-muted/70">
            "Formalize structural fiscal anomalies into the national audit ledger for executive remediation tracking."
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 bg-foreground/[0.02] p-2 rounded-2xl border border-border">
          {steps.map((s, idx) => (
            <React.Fragment key={s.number}>
              <button
                type="button"
                onClick={() => s.number < step && setStep(s.number)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all",
                  step === s.number ? "bg-red-500 text-white shadow-lg" : 
                  step > s.number ? "text-brand-green" : "text-muted opacity-50 cursor-default"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border",
                  step === s.number ? "border-white/20 bg-white/10" : "border-current"
                )}>
                  {step > s.number ? <CheckCircle className="w-3 h-3" /> : s.number}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{s.title}</span>
              </button>
              {idx < steps.length - 1 && <div className="w-4 h-[1px] bg-border hidden lg:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Audited Entity (MAC)</label>
                  <select 
                    name="entity"
                    value={formData.entity}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm focus:border-red-500 outline-none transition-all font-serif"
                  >
                    <option>Ministry of Health</option>
                    <option>Ministry of Public Works</option>
                    <option>Liberia Revenue Authority</option>
                    <option>National Port Authority</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Audit Framework</label>
                  <select 
                    name="auditType"
                    value={formData.auditType}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm focus:border-red-500 outline-none transition-all"
                  >
                    <option>Financial Compliance</option>
                    <option>Performance Audit</option>
                    <option>System Vulnerability</option>
                    <option>Procurement Rigidity</option>
                  </select>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02] flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <p className="text-xs text-muted leading-relaxed">
                  <strong>Authority Alert:</strong> Logging a finding triggers a formal request for justification from the entity's Internal Audit department. Ensure the audit scope is legally defined within the GAC (General Auditing Commission) mandate.
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted">Finding Title</label>
                <input 
                  type="text"
                  name="findingTitle"
                  required
                  value={formData.findingTitle}
                  onChange={handleChange}
                  placeholder="e.g. Unverified Disbursement of Travel Allotments"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-lg font-serif italic text-foreground focus:border-red-500 outline-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Risk Severity Level</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, severity: lvl as any }))}
                        className={cn(
                          "flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                          formData.severity === lvl ? 
                            (lvl === 'High' ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20" : 
                             lvl === 'Medium' ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" : 
                             "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20") : 
                            "border-border hover:bg-foreground/5"
                        )}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Estimated Financial Impact (USD)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                    <input 
                      type="number"
                      name="financialImpact"
                      value={formData.financialImpact}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full bg-background border border-border rounded-xl px-10 py-4 text-sm font-mono text-foreground focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted">Technical Description</label>
                <textarea 
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide objective data points regarding the structural anomaly..."
                  className="w-full h-32 bg-background border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:border-red-500 outline-none transition-all resize-none font-serif leading-relaxed"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Remediation Deadline</label>
                  <input 
                    type="date"
                    name="remediationDeadline"
                    required
                    value={formData.remediationDeadline}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm focus:border-red-500 outline-none transition-all font-mono"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Responsible Compliance Official</label>
                  <input 
                    type="text"
                    name="responsibleOfficial"
                    required
                    value={formData.responsibleOfficial}
                    onChange={handleChange}
                    placeholder="Chief Financial Officer / Auditor"
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted">Evidence Reference (IFMIS / Voucher ID)</label>
                <input 
                  type="text"
                  name="evidenceReference"
                  value={formData.evidenceReference}
                  onChange={handleChange}
                  placeholder="e.g. EFT-009234-MOH-2026"
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm font-mono text-foreground focus:border-red-500 outline-none transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="glass-panel p-8 border-t-4 border-t-red-500 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-1">Final Finding Review</h3>
                    <h2 className="text-2xl font-serif font-medium text-foreground italic">"{formData.findingTitle || 'Untitled Finding'}"</h2>
                  </div>
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                    formData.severity === 'High' ? "bg-red-500/10 text-red-500 border-red-500/20" : 
                    formData.severity === 'Medium' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : 
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  )}>
                    {formData.severity} Risk Payload
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border/50 bg-foreground/[0.01]">
                   <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Entity</span>
                      <p className="text-sm font-medium text-foreground">{formData.entity}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Framework</span>
                      <p className="text-sm font-medium text-foreground">{formData.auditType}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Deadline</span>
                      <p className="text-sm font-mono font-bold text-red-500">{formData.remediationDeadline || 'Not Set'}</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Impact</span>
                      <p className="text-sm font-mono font-bold text-foreground">
                        {formData.financialImpact ? `$${Number(formData.financialImpact).toLocaleString()}` : 'N/A'}
                      </p>
                   </div>
                </div>

                <div className="space-y-2">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-muted">Auditor's Narrative</h4>
                   <p className="text-sm text-foreground leading-relaxed font-serif text-muted/90 italic">
                     {formData.description || "No description provided."}
                   </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted italic">
                   <FileText className="w-3 h-3" /> Artifact Reference: {formData.evidenceReference || 'Manual Entry'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
          <Link to="/app/oversight/audit" className="flex items-center gap-2 text-xs font-medium text-muted hover:text-foreground transition-all">
            <Trash2 className="w-4 h-4" /> Discard Finding
          </Link>
          
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-all"
              >
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-foreground text-background dark:bg-foreground dark:text-background rounded-xl text-sm font-bold hover:gap-4 transition-all"
              >
                Proceed Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit as any}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-xl text-sm font-black shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_30px_rgba(220,38,38,0.5)] hover:scale-105 transition-all outline-none"
              >
                Commit Finding <Save className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
