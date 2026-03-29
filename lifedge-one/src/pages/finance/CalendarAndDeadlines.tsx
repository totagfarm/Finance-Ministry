import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight, 
  FileText, 
  Filter,
  ArrowRight,
  X,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';

const INITIAL_DEADLINES = [
  { 
    id: 1, 
    title: 'Q3 Budget Submission', 
    date: new Date(2026, 2, 31), // March 31, 2026
    type: 'Submission', 
    status: 'Upcoming', 
    urgency: 'high',
    desc: 'All line ministries must submit finalized Q3 expenditure reports.'
  },
  { 
    id: 2, 
    title: 'Macro-Fiscal Framework Review', 
    date: new Date(2026, 3, 15), // April 15, 2026
    type: 'Review', 
    status: 'Pending', 
    urgency: 'medium',
    desc: 'Legislative hearing on medium-term fiscal frameworks.'
  },
  { 
    id: 3, 
    title: 'NGO Accreditation Renewal', 
    date: new Date(2026, 3, 20), // April 20, 2026
    type: 'Registration', 
    status: 'Upcoming', 
    urgency: 'low',
    desc: 'Window closes for annual NGO accreditation verification.'
  },
  { 
    id: 4, 
    title: 'Audit Submission Window', 
    date: new Date(2026, 4, 1), // May 01, 2026
    type: 'Compliance', 
    status: 'Queued', 
    urgency: 'medium',
    desc: 'Internal audit reports for FY2025 due to GAC.'
  }
];

export default function CalendarAndDeadlines() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Start in March 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15));
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deadlines, setDeadlines] = useState(INITIAL_DEADLINES);

  // Filter logic
  const filteredDeadlines = useMemo(() => {
    return deadlines.filter(d => !filterType || d.type === filterType);
  }, [deadlines, filterType]);

  // Calendar Helper Logic
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate adding an event
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-foreground">Fiscal Calendar & Deadlines</h1>
          <p className="text-muted text-sm mt-1">Orchestrating national financial timelines and statutory compliance windows.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border rounded-lg text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" /> {filterType || 'All Types'}
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 p-2 overflow-hidden">
              {['Submission', 'Review', 'Registration', 'Compliance'].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilterType(filterType === type ? null : type)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    filterType === type ? "bg-brand-gold/20 text-brand-gold" : "hover:bg-foreground/5 text-muted hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              ))}
              {filterType && (
                <button 
                  onClick={() => setFilterType(null)}
                  className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase text-red-500 hover:bg-red-500/5 mt-1 border-t border-border/50 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-white dark:text-brand-dark rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Main Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg font-serif font-medium mb-6 flex items-center justify-between text-brand-gold">
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> Statutory Timeline</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{filteredDeadlines.length} Items Listed</span>
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-px before:bg-border/50 mb-4">
              <AnimatePresence mode="popLayout">
                {filteredDeadlines.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative pl-12 group"
                  >
                    <div className={cn(
                      "absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center z-10 transition-colors",
                      item.urgency === 'high' ? "bg-red-500 text-white" : 
                      item.urgency === 'medium' ? "bg-brand-gold text-white" : "bg-blue-500 text-white"
                    )}>
                      <FileText className="w-4 h-4" />
                    </div>
                    
                    <div className={cn(
                      "glass-panel p-5 group-hover:border-brand-gold/50 transition-all",
                      isSameDay(selectedDate, item.date) ? "border-brand-gold ring-1 ring-brand-gold/30 bg-brand-gold/5 shadow-lg" : ""
                    )}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1 block">
                            {item.type} • {format(item.date, 'MMMM dd, yyyy')}
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
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Interactive Calendar */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-brand-gold/5 border-brand-gold/20">
            <h2 className="text-lg font-serif font-medium mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-brand-gold" /> Critical Compliance
            </h2>
            <p className="text-sm text-muted mb-4">Urgent deadlines closing soon across the national platform.</p>
            <div className="space-y-2">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-red-500/20 transition-colors">
                <span className="text-xs font-bold text-red-500">MTEF Finalizer</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-500">22h <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{format(currentMonth, 'MMMM yyyy')}</h2>
              <div className="flex gap-1">
                <button 
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-foreground/10 rounded-lg transition-colors text-muted hover:text-foreground"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-foreground/10 rounded-lg transition-colors text-muted hover:text-foreground"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-3 font-bold text-muted uppercase tracking-widest">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const hasDeadline = deadlines.some(d => isSameDay(d.date, day));
                
                return (
                  <button 
                    key={i} 
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "aspect-square flex items-center justify-center text-xs rounded-lg transition-all relative",
                      isSelected ? "bg-brand-gold text-white font-bold scale-110 z-10 shadow-lg shadow-brand-gold/30" : 
                      isCurrentMonth ? "hover:bg-foreground/5 text-foreground" : "text-muted/30",
                      hasDeadline && !isSelected ? "after:absolute after:bottom-1 after:w-1 after:h-1 after:rounded-full after:bg-brand-gold" : ""
                    )}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col items-center text-center bg-brand-green/5 border-brand-green/20">
            <CheckCircle2 className="w-10 h-10 text-brand-green mb-3" />
            <h3 className="text-sm font-medium">Compliance Pulse</h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">94% of submissions are correctly mapped for the Q3 audit rollout.</p>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel p-8 shadow-2xl bg-background border border-border"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-full hover:bg-foreground/5"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-medium text-foreground">Add Fiscal Event</h2>
                <p className="text-sm text-muted mt-1 text-left">Map a new statutory deadline to the national roadmap.</p>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Event Title</label>
                  <input type="text" className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" placeholder="e.g. Budget Formulation Handoff" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Date</label>
                    <input type="date" className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Type</label>
                    <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all">
                      <option>Submission</option>
                      <option>Review</option>
                      <option>Registration</option>
                      <option>Compliance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">Description</label>
                  <textarea rows={3} className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-muted/50" placeholder="Brief details about this institutional requirement..." />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 bg-foreground/5 text-foreground rounded-lg font-medium hover:bg-foreground/10 transition-colors">
                    Discard
                  </button>
                  <button type="submit" className="flex-1 py-3 bg-brand-gold text-white dark:text-brand-dark rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-brand-gold/20">
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
