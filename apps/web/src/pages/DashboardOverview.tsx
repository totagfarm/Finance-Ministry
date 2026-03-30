import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Home, LineChart, FileText, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';

import WorkspaceView from './dashboard/WorkspaceView';
import NationalSummaryView from './dashboard/NationalSummaryView';
import BriefBuilderView from './dashboard/BriefBuilderView';

type TabId = 'workspace' | 'summary' | 'alerts' | 'briefs';

export default function DashboardOverview() {
  const context = useOutletContext<{ currentRole: string; currentName: string }>() || { currentRole: 'User', currentName: 'Demo User' };
  const { currentRole } = context;
  const [activeTab, setActiveTab] = useState<TabId>('workspace');
  
  const tabs = [
    { id: 'workspace', label: 'My Workspace', icon: Home },
    { id: 'summary', label: 'National Summary', icon: LineChart },
    { id: 'briefs', label: 'Briefing Builder', icon: FileText },
    { id: 'alerts', label: 'Command Alerts', icon: Bell },
  ];

  return (
    <div className="flex flex-col gap-12 pb-12 relative">
      {/* Editorial Dashboard Header */}
      <div className="flex flex-col items-center text-center gap-8 pt-12 pb-8 border-b border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
        
        <div className="flex flex-col gap-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-brand-gold/5 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] rounded-full mx-auto"
          >
            Executive Command Suite
          </motion.div>
          <h1 className="text-5xl lg:text-8xl font-serif font-black text-white tracking-tighter leading-none">
            Digital <span className="italic font-light text-brand-gold/80">Twin</span>
          </h1>
        </div>

        <p className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed font-sans">
          A definitive, real-time command mirror of the National Treasury. 
          Unifying 11 functional silos into a single, high-fidelity fiscal authority.
        </p>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Active Context</span>
            <div className="text-white font-serif italic text-sm border-b border-brand-gold/30 pb-0.5">{currentRole}</div>
          </div>
        </div>
      </div>

        {/* Professional Navigation Tabs (Linear Style) */}
        <div className="flex justify-center overflow-x-auto custom-scrollbar gap-8 border-b border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={cn(
                "flex items-center gap-3 px-2 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-all whitespace-nowrap relative border-b-2",
               activeTab === tab.id 
                  ? "border-brand-gold text-white" 
                  : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-brand-gold" : "text-slate-600")} />
              {tab.label}
            </button>
          ))}
        </div>


      {/* Tab Content Routing */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'workspace' && <WorkspaceView currentRole={currentRole} />}
          {activeTab === 'summary' && <NationalSummaryView currentRole={currentRole} />}
          {activeTab === 'briefs' && <BriefBuilderView currentRole={currentRole} />}
          {activeTab === 'alerts' && (
            <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
              <Bell className="w-12 h-12 text-muted mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-foreground mb-1">Alerts Center</h3>
              <p className="text-sm text-muted max-w-md">
                Cross-module risk indicators and transaction anomalies will trigger here. Currently scanning 0 active exceptions.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
