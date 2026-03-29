import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  FileCheck, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText,
  Users,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, name: 'Organization Identity', icon: Building2 },
  { id: 2, name: 'Sectoral Focus', icon: Globe },
  { id: 3, name: 'Financial Capacity', icon: FileText },
  { id: 4, name: 'Compliance Review', icon: ShieldCheck },
];

export default function NGOAccreditationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      submitApplication();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    // Simulation of API persistence to NestJS backend
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch('/api/ngo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* dummy data */ })
      });
      // Even if it fails (as backend isn't real), we simulate success for demo
      setIsCompleted(true);
    } catch (err) {
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-brand-green" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-medium text-white">Application Submitted</h1>
          <p className="text-slate-400 max-w-md mx-auto italic font-serif">
            "Your NGO accreditation request has been encoded into the National CSO Registry. Technical review by the Ministry of Planning is now pending."
          </p>
        </div>
        <div className="pt-6">
          <Link 
            to="/app/development/ngo" 
            className="px-8 py-3 bg-brand-gold text-brand-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold/90 transition-all flex items-center gap-2"
          >
            Return to Registry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="space-y-2 mb-12">
        <h1 className="text-4xl font-serif font-medium text-white tracking-tight">National CSO Accreditation Wizard</h1>
        <p className="text-slate-400 font-serif italic">Step-by-step organizational verification for the FY 2026/27 cycle.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 -z-10" />
        {steps.map((step) => (
          <div key={step.id} className="relative">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl",
              currentStep === step.id ? "bg-brand-gold border-brand-gold text-brand-dark scale-110" : 
              currentStep > step.id ? "bg-brand-green border-brand-green text-white" : 
              "bg-slate-900 border-slate-700 text-slate-500"
            )}>
              {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
            </div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <p className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                currentStep === step.id ? "text-brand-gold" : "text-slate-500"
              )}>
                {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Wizard Content */}
      <div className="glass-panel p-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Organization Name</label>
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none" placeholder="e.g., Global Aid Initiative" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Legal Registration ID</label>
                    <input className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono focus:border-brand-gold outline-none" placeholder="LBR-NGO-0000" />
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-brand-gold shrink-0" />
                  <p className="text-sm text-brand-gold/80 italic font-serif">
                    "Ensure organizational identity matches the Ministry of Foreign Affairs (MOFA) credentials for automated verification."
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Healthcare', 'Education', 'WASH', 'Agriculture', 'Human Rights', 'Governance'].map(sector => (
                    <button key={sector} className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-center">
                      <Globe className="w-6 h-6 text-slate-500 mx-auto mb-3" />
                      <span className="text-xs font-bold text-white">{sector}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 text-center py-12">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-brand-gold" />
                </div>
                <h3 className="text-xl font-serif text-white">Upload Financial Audits (Last 3 Years)</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">Upload certified audits in PDF format for technical evaluation.</p>
                <div className="pt-4">
                  <button className="px-10 py-4 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500 hover:border-brand-gold transition-all">
                    Drag & Drop Files Here
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif text-white">Final Compliance Validation</h3>
                <div className="space-y-4">
                  {[
                    "Confirming adherence to Sectoral Reporting Guidelines",
                    "Validating Foreign Aid Accountability standards",
                    "Verifying Physical Field Presence documentation",
                    "Agreeing to Open Data transparency sharing"
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                      <div className="w-5 h-5 rounded-full border border-brand-gold" />
                      <span className="text-sm text-slate-300 font-medium">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Wizard Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-slate-800">
          <button 
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white disabled:opacity-0 transition-all font-serif italic"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-10 py-4 bg-brand-gold text-brand-dark rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-gold/10 flex items-center gap-3"
          >
            {isSubmitting ? 'Processing Application...' : currentStep === steps.length ? 'Finalize & Submit' : 'Continue Step'}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
