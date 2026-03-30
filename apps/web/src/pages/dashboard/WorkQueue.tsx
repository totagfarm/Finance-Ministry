import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  FileText,
  User,
  LayoutGrid,
  List,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const WORK_ITEMS = [
  { 
    id: 'AQ-2026-982', 
    title: 'Q3 Allotment Reallocation', 
    origin: 'Ministry of Health', 
    date: '2h ago', 
    type: 'Approval', 
    priority: 'high',
    desc: 'Emergency reallocation request for rural clinic medical supplies.'
  },
  { 
    id: 'PR-2026-441', 
    title: 'NGO Accreditation Review', 
    origin: 'WaterAid Liberia', 
    date: '5h ago', 
    type: 'Review', 
    priority: 'medium',
    desc: 'Annual renewal application for Level 2 international NGO status.'
  },
  { 
    id: 'TR-2026-009', 
    title: 'EFT Batch Exception', 
    origin: 'Treasury Operations', 
    date: '8h ago', 
    type: 'Action Required', 
    priority: 'critical',
    desc: '3 transactions failed due to routing code mismatch in B-092 batch.'
  },
  { 
    id: 'BC-2026-112', 
    title: 'Budget Ceiling Adjustment', 
    origin: 'Budget Directorate', 
    date: '1d ago', 
    type: 'Approval', 
    priority: 'medium',
    desc: 'Shift in Sector 4 ceilings based on revised revenue projections.'
  }
];

export default function WorkQueue() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemAction = (item: typeof WORK_ITEMS[0]) => {
    // Mapping Work Item IDs to the appropriate high-fidelity functional routes
    if (item.id.startsWith('AQ')) {
        // Expenditure / Allotment Control
        navigate(`/app/finance/allotments/new?id=${item.id}`);
    } else if (item.id.startsWith('PR')) {
        // NGO Accreditation
        navigate(`/app/development/ngo?id=${item.id}`);
    } else if (item.id.startsWith('TR')) {
        // Treasury / EFT Exception
        navigate(`/app/finance/treasury?id=${item.id}`);
    } else if (item.id.startsWith('BC')) {
        // Budgeting
        navigate(`/app/finance/budget?id=${item.id}`);
    } else {
        // Default to pendings
        navigate(`/app/pending?id=${item.id}&module=${item.title}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
            <Inbox className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-medium text-foreground">My Work Queue</h1>
            <p className="text-muted text-sm mt-1">Central command for your pending approvals, reviews, and exceptions.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search IDs, entities..." 
              className="w-full pl-10 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex border border-border rounded-lg overflow-hidden shrink-0">
            <button 
              onClick={() => setView('list')}
              className={cn("p-2 transition-colors", view === 'list' ? "bg-foreground/10 text-brand-gold" : "bg-transparent text-muted hover:bg-foreground/5")}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('grid')}
              className={cn("p-2 transition-colors", view === 'grid' ? "bg-foreground/10 text-brand-gold" : "bg-transparent text-muted hover:bg-foreground/5")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "New Requests", count: 12, icon: <Inbox className="w-4 h-4" />, color: "text-blue-500" },
          { label: "Urgent Actions", count: 3, icon: <ShieldAlert className="w-4 h-4" />, color: "text-red-500" },
          { label: "Pending Review", count: 8, icon: <Clock className="w-4 h-4" />, color: "text-brand-gold" },
          { label: "Completed (24h)", count: 45, icon: <CheckCircle2 className="w-4 h-4" />, color: "text-brand-green" }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 flex items-center justify-between group hover:bg-foreground/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center", stat.color)}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{stat.label}</p>
                <p className="text-2xl font-serif font-bold text-foreground">{stat.count}</p>
              </div>
            </div>
            <button className="p-1 text-muted hover:text-foreground hover:bg-foreground/10 rounded">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main List View */}
      <div className="glass-panel overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-foreground/5 text-[10px] font-bold uppercase tracking-widest text-muted">
          <div className="col-span-1">Priority</div>
          <div className="col-span-2">ID / Request</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Originating MAC</div>
          <div className="col-span-2">Last Updated</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-border/50">
          <AnimatePresence mode="popLayout">
            {WORK_ITEMS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleItemAction(item)}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center group hover:bg-brand-gold/5 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-l-2 border-transparent hover:border-brand-gold"
              >
                <div className="col-span-1 flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    item.priority === 'critical' ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                    item.priority === 'high' ? "bg-orange-500" : "bg-blue-500"
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold uppercase",
                    item.priority === 'critical' ? "text-red-500" :
                    item.priority === 'high' ? "text-orange-500" : "text-blue-500"
                  )}>{item.priority}</span>
                </div>
                
                <div className="col-span-2">
                  <p className="text-xs font-bold font-mono text-brand-gold mb-0.5">{item.id}</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">{item.title}</p>
                </div>

                <div className="col-span-4">
                  <p className="text-xs text-muted line-clamp-1 group-hover:line-clamp-none transition-all duration-300">{item.desc}</p>
                  <div className="flex gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-500 text-[10px] font-medium border border-blue-500/20">{item.type}</span>
                    <span className="px-1.5 py-0.5 rounded-sm bg-foreground/5 text-muted text-[10px] font-medium border border-border">Fiscal Planning</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <User className="w-3 h-3 text-muted" />
                  <span className="text-xs text-foreground font-medium">{item.origin}</span>
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted" />
                  <span className="text-xs text-muted">{item.date}</span>
                </div>

                <div className="col-span-1 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleItemAction(item); }}
                    className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all transform group-hover:scale-110 ml-auto border border-white/5 shadow-xl"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {WORK_ITEMS.length === 0 && (
          <div className="p-12 text-center text-muted">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-serif">Inbox Zero Reached</p>
            <p className="text-sm">You have no pending tasks in your queue.</p>
          </div>
        )}

        <div className="p-4 bg-foreground/[0.02] border-t border-border/50 flex justify-between items-center">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Showing 4 of 4 Pending Tasks</p>
            <button className="text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:underline flex items-center gap-1">
               Go to Archive <ArrowRight className="w-2 h-2" />
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-4">
        <div className="glass-panel p-6 bg-blue-500/5 group">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Integration Health</h3>
             <Activity className="w-4 h-4 text-blue-500" />
           </div>
           <p className="text-sm text-foreground font-medium mb-1">Queue Sync Status: <span className="text-brand-green">Nominal</span></p>
           <p className="text-xs text-muted">Work items are being synchronized from 12 MAC source systems in real-time.</p>
        </div>
        <div className="glass-panel p-6 bg-brand-gold/5 group">
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Security Profile</h3>
             <ShieldAlert className="w-4 h-4 text-brand-gold" />
           </div>
           <p className="text-sm text-foreground font-medium mb-1">Authorization Mode: <span className="text-brand-gold">MFA Requested</span></p>
           <p className="text-xs text-muted">Critical approvals (Priority: Critical) require mobile push authentication.</p>
        </div>
      </div>
    </div>
  );
}

