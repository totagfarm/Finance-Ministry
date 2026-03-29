import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Plus, Save, Link as LinkIcon, Shield, ChevronRight, ChevronLeft, Check, AlertCircle, Info, DollarSign, ArrowRightLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { INSTITUTION_CATEGORIES, MOCK_INSTITUTIONS } from '../../config/institutions.config';
import { cn } from '../../lib/utils';

export default function InstitutionSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    categoryId: 'ministries',
    parentId: '',
    headOfInstitution: '',
    budgetEnabled: false,
    allotmentEnabled: false,
    legalBasis: '',
    staffCount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      console.warn("Form submitted prematurely on step:", step);
      return;
    }
    // Simulate save functionality
    alert("Entity registration successfully committed to the national master data registry.");
    navigate('/app/institutions');
  };

  const steps = [
    { number: 1, title: 'Identity', icon: Building2 },
    { number: 2, title: 'Structure', icon: LinkIcon },
    { number: 3, title: 'Governance', icon: Shield },
    { number: 4, title: 'Review', icon: Check },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-foreground tracking-tight">
            Structural Entity Induction
          </h1>
          <p className="text-sm text-muted mt-1 leading-relaxed">
            Professional workflow for mapping new government bodies into the TRACE institutional ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-widest bg-foreground/5 px-3 py-1.5 rounded-full border border-border/50">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" /> Platform Governance v2.4
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />
        <div className="relative flex justify-between z-10 w-full px-4 sm:px-12">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center gap-2">
              <button
                onClick={() => s.number < step && setStep(s.number)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  step === s.number 
                    ? "bg-brand-gold border-brand-gold text-brand-dark shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                    : step > s.number 
                      ? "bg-brand-green border-brand-green text-white" 
                      : "bg-background border-border text-muted"
                )}
              >
                {step > s.number ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
              </button>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider transition-colors",
                step === s.number ? "text-brand-gold" : "text-muted"
              )}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Core Identity */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 sm:p-10 border-t-4 border-t-brand-gold"
            >
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium text-foreground mb-1 flex items-center gap-2">
                  <span className="text-brand-gold">01.</span> Primary Identification
                </h2>
                <p className="text-sm text-muted mb-8 italic">
                  Provide the official legal name and classification for the entity as recognized by the Civil Service Agency and MFDP.
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Legal Entity Name <span className="text-brand-gold">*</span></label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ministry of Commerce and Industry"
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-base text-foreground focus:border-brand-gold transition-all outline-none focus:ring-4 ring-brand-gold/10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Registry Code / Acronym</label>
                    <input 
                      type="text" 
                      name="acronym"
                      value={formData.acronym}
                      onChange={handleChange}
                      placeholder="e.g. MOCI"
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-base font-mono uppercase text-foreground focus:border-brand-gold transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Institutional Sector <span className="text-brand-gold">*</span></label>
                    <select 
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-base text-foreground focus:border-brand-gold transition-all appearance-none outline-none"
                    >
                      {INSTITUTION_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Legislative Mandate / Status</label>
                    <textarea 
                      name="legalBasis"
                      value={formData.legalBasis}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Specify the act or decree authorizing this entity's creation."
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-brand-gold transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Structural Topology */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 sm:p-10 border-t-4 border-t-brand-green"
            >
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium text-foreground mb-1 flex items-center gap-2">
                  <span className="text-brand-green">02.</span> Organizational Hierarchy
                </h2>
                <p className="text-sm text-muted mb-8 italic">
                  Define where this entity sits in the national structural framework.
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-3">Superior / Umbrella Authority</label>
                    <div className="p-4 border border-brand-green/20 bg-brand-green/5 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-brand-green/10 rounded-xl">
                        <Info className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="flex-1">
                        <select 
                          name="parentId"
                          value={formData.parentId}
                          onChange={handleChange}
                          className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-green transition-colors appearance-none outline-none"
                        >
                          <option value="">-- No Parent (Standalone Strategic Body) --</option>
                          {MOCK_INSTITUTIONS.filter(i => !i.parentId).map(inst => (
                            <option key={inst.id} value={inst.id}>{inst.name} ({inst.id})</option>
                          ))}
                        </select>
                        <p className="text-[11px] text-muted mt-2 leading-relaxed">
                          Standalone bodies include Ministries and Commissions. Agencies and PIUs typically roll up to a Ministry.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Designated Executive Lead</label>
                    <input 
                      type="text" 
                      name="headOfInstitution"
                      value={formData.headOfInstitution}
                      onChange={handleChange}
                      placeholder="e.g. Hon. Minister John Doe"
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-base text-foreground focus:border-brand-green transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-widest mb-2">Authorized Staff Count</label>
                    <input 
                      type="number" 
                      name="staffCount"
                      value={formData.staffCount}
                      onChange={handleChange}
                      placeholder="Establishment size"
                      className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-base text-foreground focus:border-brand-green transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Fiscal Perimeter */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 sm:p-10 border-t-4 border-t-blue-500"
            >
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium text-foreground mb-1 flex items-center gap-2">
                  <span className="text-blue-500">03.</span> Financial Mandate
                </h2>
                <p className="text-sm text-muted mb-8 italic">
                  Assert the financial autonomy and execution permissions for this unit.
                </p>

                <div className="space-y-6">
                  <label className={cn(
                    "flex items-start gap-6 p-6 border rounded-2xl cursor-pointer transition-all group",
                    formData.budgetEnabled ? "border-brand-gold bg-brand-gold/5" : "border-border hover:bg-foreground/5"
                  )}>
                    <div className="relative flex items-center justify-center mt-1">
                      <input 
                        type="checkbox" 
                        name="budgetEnabled"
                        checked={formData.budgetEnabled}
                        onChange={handleChange}
                        className="w-6 h-6 cursor-pointer accent-brand-gold"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-brand-gold" />
                        <p className="text-base font-bold text-foreground tracking-tight">Prime Budgetary Authority</p>
                      </div>
                      <p className="text-sm text-muted mt-2 leading-relaxed">
                        If enabled, this entity will receive its own top-line ceiling directly from the MFDP and will be required to submit a comprehensive MTEF budget submission.
                      </p>
                    </div>
                  </label>

                  <label className={cn(
                    "flex items-start gap-6 p-6 border rounded-2xl cursor-pointer transition-all group",
                    formData.allotmentEnabled ? "border-brand-green bg-brand-green/5" : "border-border hover:bg-foreground/5"
                  )}>
                    <div className="relative flex items-center justify-center mt-1">
                      <input 
                        type="checkbox" 
                        name="allotmentEnabled"
                        checked={formData.allotmentEnabled}
                        onChange={handleChange}
                        className="w-6 h-6 cursor-pointer accent-brand-green"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="w-4 h-4 text-brand-green" />
                        <p className="text-base font-bold text-foreground tracking-tight">Execution & Release Rights</p>
                      </div>
                      <p className="text-sm text-muted mt-2 leading-relaxed">
                        Enabling this allows the entity to initiate its own allotment requests and execute payments. Strict IFMIS validation will apply.
                      </p>
                    </div>
                  </label>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-xs text-blue-200 leading-relaxed mt-4">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    These settings directly impact the general ledger structure and audit perimeter. Ensure they align with the current Appropriation Act.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Review & Finalize */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 sm:p-10 border-t-2 border-t-brand-gold"
            >
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium text-foreground mb-8">Verification Summary</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/50 border border-border rounded-2xl overflow-hidden">
                  <div className="bg-background p-6">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Entity Name</p>
                    <p className="text-sm font-medium text-foreground">{formData.name || 'Not specified'}</p>
                  </div>
                  <div className="bg-background p-6">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Registry Code</p>
                    <p className="text-sm font-bold text-brand-gold font-mono">{formData.acronym || 'NONE'}</p>
                  </div>
                  <div className="bg-background p-6">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Category</p>
                    <p className="text-sm font-medium text-foreground">{INSTITUTION_CATEGORIES.find(c => c.id === formData.categoryId)?.name}</p>
                  </div>
                  <div className="bg-background p-6">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Superior Authority</p>
                    <p className="text-sm font-medium text-foreground">{MOCK_INSTITUTIONS.find(i => i.id === formData.parentId)?.name || 'Direct / Standalone'}</p>
                  </div>
                  <div className="bg-background p-6 sm:col-span-2">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Governance assertions</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 text-xs">
                        {formData.budgetEnabled ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <AlertCircle className="w-3.5 h-3.5 text-muted" />}
                        <span className={formData.budgetEnabled ? "text-foreground font-medium" : "text-muted"}>Budgetary Recipient</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/5 text-xs">
                        {formData.allotmentEnabled ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <AlertCircle className="w-3.5 h-3.5 text-muted" />}
                        <span className={formData.allotmentEnabled ? "text-foreground font-medium" : "text-muted"}>Execution Authority</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl flex gap-4">
                  <Shield className="w-6 h-6 text-brand-gold shrink-0" />
                  <p className="text-xs text-muted leading-relaxed">
                    By committing this schema, you are asserting that this institution represents a valid structural component of the government. This action will generate a unique GFS code and activate reporting requirements for the next fiscal period.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-muted hover:text-foreground hover:bg-foreground/5 transition-all rounded-xl disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" /> Go Back
          </button>
          
          <div className="flex items-center gap-4">
            <Link to="/app/institutions" className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-all">
              Discard Changes
            </Link>
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
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-brand-gold text-brand-dark rounded-xl text-sm font-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all"
              >
                Commit Schema <Save className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

