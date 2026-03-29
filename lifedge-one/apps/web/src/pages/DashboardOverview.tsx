import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router-dom';
import { Home, LineChart, FileText, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';

import WorkspaceView from './dashboard/WorkspaceView';
import NationalSummaryView from './dashboard/NationalSummaryView';
import BriefBuilderView from './dashboard/BriefBuilderView';

type TabId = 'workspace' | 'summary' | 'alerts' | 'briefs';

export default function DashboardOverview() {
  const { currentRole } = useOutletContext<{ currentRole: string }>();
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
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
              Command Center
            </h1>
            <p className="text-sm text-muted">
              Executive multi-view dashboard for real-time fiscal performance and exceptions.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="px-3 py-1.5 bg-foreground/5 text-muted text-xs font-medium rounded-lg border border-border">
              Role Context: <span className="text-brand-gold ml-1">{currentRole}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 mt-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap border",
                activeTab === tab.id 
                  ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30 shadow-sm" 
                  : "bg-transparent text-muted border-transparent hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-brand-gold" : "text-muted")} />
              {tab.label}
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
