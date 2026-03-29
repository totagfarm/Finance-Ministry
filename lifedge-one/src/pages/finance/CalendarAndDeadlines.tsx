import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const DEADLINES = [
  { 
    id: 1, 
    title: 'Q3 Budget Submission', 
    date: 'March 31, 2026', 
    type: 'Submission', 
    status: 'Upcoming', 
    urgency: 'high',
    desc: 'All line ministries must submit finalized Q3 expenditure reports.'
  },
  { 
    id: 2, 
    title: 'Macro-Fiscal Framework Review', 
    date: 'April 15, 2026', 
    type: 'Review', 
    status: 'Pending', 
    urgency: 'medium',
    desc: 'Legislative hearing on medium-term fiscal frameworks.'
  },
  { 
    id: 3, 
    title: 'NGO Accreditation Renewal', 
    date: 'April 20, 2026', 
    type: 'Registration', 
    status: 'Upcoming', 
    urgency: 'low',
    desc: 'Window closes for annual NGO accreditation verification.'
  },
  { 
    id: 4, 
    title: 'Audit Submission Window', 
    date: 'May 01, 2026', 
    type: 'Compliance', 
    status: 'Queued', 
    urgency: 'medium',
    desc: 'Internal audit reports for FY2025 due to GAC.'
  }
];

export default function CalendarAndDeadlines() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-foreground">Fiscal Calendar & Deadlines</h1>
          <p className="text-muted text-sm mt-1">Orchestrating national financial timelines and statutory compliance windows.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filter by Type
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-white dark:text-brand-dark rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <CalendarIcon className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Main Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg font-serif font-medium mb-6 flex items-center gap-2 text-brand-gold">
              <Clock className="w-5 h-5" /> Statutory Timeline
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-px before:bg-border/50">
              {DEADLINES.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12 group"
                >
                  <div className={cn(
                    "absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center z-10 transition-colors",
                    item.urgency === 'high' ? "bg-red-500 text-white" : 
                    item.urgency === 'medium' ? "bg-brand-gold text-white" : "bg-blue-500 text-white"
                  )}>
                    <FileText className="w-4 h-4" />
                  </div>
                  
                  <div className="glass-panel p-5 group-hover:border-brand-gold/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1 block">
                          {item.type} • {item.date}
                        </span>
                        <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                        item.status === 'Upcoming' ? "bg-blue-500/10 text-blue-500" :
                        item.status === 'Pending' ? "bg-brand-gold/10 text-brand-gold" : "bg-green-500/10 text-green-500"
                      )}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{item.desc}</p>
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border border-background bg-foreground/10 flex items-center justify-center text-[10px]">
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                        <div className="w-6 h-6 rounded-full border border-background bg-brand-gold/20 flex items-center justify-center text-[10px] text-brand-gold">
                          +5
                        </div>
                      </div>
                      <button className="text-xs font-bold text-brand-gold flex items-center gap-1 hover:underline">
                        View Workspace <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Insights & Calendar View Placeholder */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-brand-gold/5 border-brand-gold/20">
            <h2 className="text-lg font-serif font-medium mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-brand-gold" /> Critical Compliance
            </h2>
            <p className="text-sm text-muted mb-4">You have <span className="font-bold text-foreground">2 submissions</span> closing in the next 72 hours.</p>
            <div className="space-y-2">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
                <span className="text-xs font-medium text-red-500">MTEF Finalizer</span>
                <span className="text-[10px] font-bold text-red-500">22h Remaining</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted">Upcoming Month</h2>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-foreground/5 rounded"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button className="p-1 hover:bg-foreground/5 rounded"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            {/* Simple Grid Placeholder for Calendar */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 font-bold text-muted">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square flex items-center justify-center text-xs rounded-sm transition-colors",
                    i + 1 === 15 ? "bg-brand-gold text-white font-bold" : 
                    i + 1 === 31 ? "bg-red-500/20 text-red-500 font-bold" : "hover:bg-foreground/5"
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col items-center text-center">
            <CheckCircle2 className="w-10 h-10 text-brand-green mb-3" />
            <h3 className="text-sm font-medium">Compliance Pulse</h3>
            <p className="text-xs text-muted mt-1">94% of Ministry submissions are currently ahead of schedule.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
