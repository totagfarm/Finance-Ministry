import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../components/ThemeProvider';
import { Construction, ArrowLeft, Lightbulb, Clock, BookOpen, Fingerprint } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ModulePlaceholder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleName = searchParams.get('module') || 'This Enterprise Module';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto space-y-6 text-center px-4">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-2"
      >
        <Construction className="w-12 h-12 text-brand-gold" />
      </motion.div>

      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground tracking-tight">
          Module in Pre-Release
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
           <span className="font-medium text-brand-gold">{moduleName}</span> is currently queued in the TRACE development roadmap. Access is restricted while financial engineers map the underlying institutional workflows. 
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 w-full text-left bg-foreground/5 border border-border"
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
           <Fingerprint className="w-5 h-5 text-blue-500" />
           <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Deployment Status Matrix</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Architectural Phase</span>
            <span className="font-bold text-foreground">Scoping & Wireframing</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><BookOpen className="w-4 h-4" /> Legislation Compliance</span>
            <span className="font-bold text-orange-500">Awaiting PPFA Sign-off</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted flex items-center gap-2"><Clock className="w-4 h-4" /> Estimated Activation</span>
            <span className="font-bold text-blue-500">Q3 Enterprise Rollout</span>
          </div>
        </div>
      </motion.div>

      <div className="pt-6">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-foreground/10 text-foreground rounded-lg transition-colors font-medium text-sm hover:bg-foreground/15 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Previous Dashboard
        </button>
      </div>

    </div>
  );
}
