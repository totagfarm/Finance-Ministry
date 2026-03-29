import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Landmark, Building2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HandshakeProps {
  status: 'pending' | 'authorized' | 'rejected';
  entity: string;
  value: number;
}

export default function StatutoryHandshake({ status, entity, value }: HandshakeProps) {
  const isHighValue = value >= 10000;
  
  const steps = [
    { label: 'MAC/SOE Request', icon: Building2, desc: 'Plan Alignment', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'PPCC Authorization', icon: ShieldCheck, desc: 'M&E Compliance', color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'MFDP Validation', icon: Landmark, desc: 'Budget Availability', color: 'text-brand-green', bg: 'bg-brand-green/10' },
  ];

  return (
    <div className="glass-panel p-6 border-l-4 border-l-blue-500 bg-blue-500/[0.02] flex flex-col gap-6 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Triple-Lock Statutory Handshake
          </h3>
          <p className="text-xl font-serif font-medium text-foreground tracking-tight">
            Compliance Authorization
          </p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0",
          status === 'authorized' ? "bg-brand-green/20 text-brand-green border-brand-green/30" : 
          status === 'rejected' ? "bg-red-500/20 text-red-500 border-red-500/30" :
          "bg-foreground/5 text-muted border-border"
        )}>
          {status}
        </div>
      </div>

      <div className="relative flex justify-between items-center px-2">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border/50 -translate-y-1/2 z-0" />
        <div className="absolute top-1/2 left-0 h-[2px] bg-blue-500/30 -translate-y-1/2 z-0 transition-all duration-1000" style={{ width: status === 'authorized' ? '100%' : '33%' }} />

        {steps.map((step, idx) => {
          const isActive = status === 'authorized' || (idx === 0);
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group/step">
               <motion.div 
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                  isActive ? cn(step.bg, step.color, "border-white/10 shadow-lg") : "bg-background border-border text-muted"
                )}
               >
                 <step.icon className={cn("w-6 h-6", isActive ? "" : "opacity-30")} />
               </motion.div>
               <div className="text-center absolute top-14 w-32 -left-10 opacity-0 group-hover/step:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground">{step.label}</p>
                  <p className="text-[9px] text-muted">{step.desc}</p>
               </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-foreground/[0.03] rounded-xl border border-border flex flex-col gap-3">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
           <span className="text-muted">Procuring Entity</span>
           <span className="text-foreground">{entity}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
           <span className="text-muted">Fiscal Validation (MFDP)</span>
           <span className={cn(isHighValue ? "text-brand-green" : "text-blue-500")}>
              {isHighValue ? "Payable - Budget Validated" : "Internal Entity Payment Required (< $10k)"}
           </span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
           <span className="text-muted">PPCC Oversight (M&E)</span>
           <span className="text-brand-gold">M&E Synchronized</span>
        </div>
      </div>

      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
