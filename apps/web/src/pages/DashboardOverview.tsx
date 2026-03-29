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
    <div className="flex flex-col gap-6 pb-12">
      {/* Dashboard Global Header & Tabs */}
      <div className="flex flex-col gap-4 border-b border-border pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl lg:text-5xl font-serif font-black text-white tracking-tight mb-2">
              Command <span className="text-[#D4AF37]">Center</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-xl leading-relaxed">
              Executive multi-view dashboard for real-time fiscal performance, automated oversight, and exception management.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-black uppercase tracking-widest rounded border border-yellow-400/20">
              Role Context: <span className="text-white ml-1">{currentRole}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-4 mt-4 border-b border-border/10 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={cn(
                "flex items-center gap-2.5 px-1 py-2 text-[11px] font-black tracking-[0.2em] transition-all whitespace-nowrap relative",
               activeTab === tab.id 
                  ? "text-[#D4AF37]" 
                  : "text-slate-400 hover:text-white"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-[#D4AF37]" : "text-slate-500")} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-9px] left-0 right-0 h-[2.5px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              )}
            </button>
          ))}
        </div>
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
