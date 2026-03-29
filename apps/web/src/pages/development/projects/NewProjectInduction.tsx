import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Construction, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  Layers,
  Building2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

const projectStages = [
  { id: 1, name: 'Core Definition', icon: Briefcase },
  { id: 2, name: 'Financial Model', icon: DollarSign },
  { id: 3, name: 'Geographic Impact', icon: MapPin },
  { id: 4, name: 'Ministry Approval', icon: CheckCircle2 },
];

export default function NewProjectInduction() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    agency: '',
    budget: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < projectStages.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmission();
    }
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    // Simulate API persistence to Warehouse fact_project table
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCompleted(true);
    setIsSubmitting(false);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ rotate: 360, scale: 1 }}
          className="w-24 h-24 rounded-full bg-brand-gold/20 flex items-center justify-center border-2 border-brand-gold"
        >
          <Construction className="w-12 h-12 text-brand-gold" />
        </motion.div>
        <div className="space-y-3">
          <h1 className="text-4xl font-serif font-medium text-white">PSIP Project Inducted</h1>
          <p className="text-slate-400 max-w-lg mx-auto font-serif italic text-lg">
            "Your infrastructure project has been successfully encoded into the National Project Bank registry for FY 2026/27."
          </p>
        </div>
        <Link to="/app/development/projects" className="px-10 py-4 bg-white text-black rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
          View Project Registry <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-8">
      <div className="flex items-center gap-4 mb-3">
        <Layers className="w-6 h-6 text-brand-gold" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Capital Investment / Infrastructure</span>
      </div>
      <h1 className="text-5xl font-serif font-medium text-white tracking-tight mb-4">Project Induction Wizard</h1>
      <p className="text-slate-400 font-serif italic text-lg mb-12 max-w-2xl">
        "Transforming strategic infrastructure needs into data-driven development projects through standardized induction."
      </p>

      {/* Modern Stepper */}
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-[40%] left-0 w-full h-[1px] bg-slate-800 -z-10" />
        {projectStages.map((stage) => (
          <div key={stage.id} className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 border-2",
              currentStep === stage.id ? "bg-brand-gold border-brand-gold text-brand-dark scale-125 shadow-2xl shadow-brand-gold/30" :
              currentStep > stage.id ? "bg-brand-green border-brand-green text-white" :
              "bg-slate-900 border-slate-700 text-slate-500"
            )}>
              {currentStep > stage.id ? <CheckCircle2 className="w-6 h-6" /> : <stage.icon className="w-6 h-6" />}
            </div>
            <p className={cn(
              "text-[9px] font-black uppercase tracking-widest transition-colors duration-500",
              currentStep === stage.id ? "text-brand-gold" : "text-slate-500"
            )}>
              {stage.name}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-12 min-h-[500px] flex flex-col justify-between border border-slate-800/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] -z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-10"
          >
            {currentStep === 1 && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block group-focus-within:text-brand-gold transition-colors">Official Project Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none transition-all focus:ring-4 focus:ring-brand-gold/5 shadow-inner" 
                      placeholder="e.g., Monrovia-Gbarnga Highway Phase 2" 
                    />
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block group-focus-within:text-brand-gold transition-colors">Executing Agency</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 pl-14 text-white focus:border-brand-gold outline-none transition-all focus:ring-4 focus:ring-brand-gold/5" 
                        placeholder="Ministry of Public Works" 
                      />
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                    </div>
                  </div>
                </div>
                <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 backdrop-blur-md">
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                     <Calendar className="w-4 h-4 text-brand-gold" /> Strategic Timeline (Projected)
                   </h4>
                   <div className="grid grid-cols-3 gap-8">
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Commencement</p>
                        <p className="text-sm font-bold text-white uppercase">Q3 FY 2026/27</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Duration</p>
                        <p className="text-sm font-bold text-white uppercase">24 Months</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Target End</p>
                        <p className="text-sm font-bold text-white uppercase">Q3 FY 2028/29</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block group-focus-within:text-brand-gold transition-colors">Requested Budget Value (USD)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 pl-14 text-white text-2xl font-bold focus:border-brand-gold outline-none transition-all" 
                        placeholder="0.00" 
                      />
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-gold" />
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block group-focus-within:text-brand-gold transition-colors">Resource Allocation Modality</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none">
                      <option>Off-Budget (Donor Direct)</option>
                      <option>On-Budget (Treasury)</option>
                      <option>Pooled / Trust Fund</option>
                      <option>Public-Private Partnership</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif text-white">Geograpic Impact Analysis</h3>
                <div className="h-64 rounded-3xl border border-slate-800 bg-slate-950 relative overflow-hidden group cursor-crosshair">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent opacity-50" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-700 italic group-hover:text-brand-gold transition-colors">National Map Interface Placeholder</p>
                   </div>
                   <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-lg rounded-xl border border-slate-800">
                      <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1">Selection Coordinate</p>
                      <p className="text-xs font-mono text-white">MONT-LBR-CTR12</p>
                   </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-12">
                <h3 className="text-2xl font-serif text-white text-center">Final Verification Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Confirming Environmental Impact Study",
                    "Validating Technical Feasibility Report",
                    "Alignment with 2030 National Vision",
                    "Compliance with Procurement Guidelines",
                    "Procurement Integrity Assurance",
                    "Stakeholders Agreement Validated"
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:bg-slate-900/50 transition-all group">
                       <div className="w-6 h-6 rounded-full border-2 border-brand-gold flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-all duration-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold group-hover:text-brand-dark transition-all" />
                       </div>
                       <span className="text-sm text-slate-300 font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Wrapper */}
        <div className="flex justify-between items-center mt-12 pt-10 border-t border-slate-800">
          <button 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-white disabled:opacity-0 transition-all font-serif italic"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-12 py-5 bg-brand-gold text-brand-dark rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-gold/20 flex items-center gap-4"
          >
            {isSubmitting ? 'Inducting Project...' : currentStep === projectStages.length ? 'Confirm & Induct Project' : 'Advance Stage'}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
