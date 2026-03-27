import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Info, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface AlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockAlerts = [
  { id: '1', title: 'Budget Deficit Warning', type: 'Critical', message: 'Ministry of Education has exceeded Q2 allocation by 15%.', time: '10 mins ago', module: 'Finance' },
  { id: '2', title: 'IFMIS Sync Failure', type: 'Warning', message: 'Failed to synchronize payroll data for 3 institutions.', time: '1 hour ago', module: 'System' },
  { id: '3', title: 'New Fiscal Policy Update', type: 'Info', message: 'Please review the updated guidelines for infrastructure projects.', time: '2 hours ago', module: 'Oversight' },
];

export default function AlertsDrawer({ isOpen, onClose }: AlertsDrawerProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-background border-l border-border shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-medium text-foreground">Alerts & Exceptions</h2>
                  <p className="text-xs text-muted">Critical Issues & Sync Status</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-muted hover:text-foreground rounded-full hover:bg-foreground/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-2 pb-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/10 text-foreground whitespace-nowrap">All (8)</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-transparent border border-border text-red-500 hover:bg-red-500/10 whitespace-nowrap">Critical (2)</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-transparent border border-border text-orange-500 hover:bg-orange-500/10 whitespace-nowrap">Warnings (4)</button>
              </div>

              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-md flex items-center gap-1",
                          alert.type === 'Critical' ? "bg-red-500/20 text-red-500" : 
                          alert.type === 'Warning' ? "bg-orange-500/20 text-orange-500" : 
                          "bg-blue-500/20 text-blue-500"
                        )}>
                          {alert.type === 'Critical' ? <AlertCircle className="w-3 h-3" /> : 
                           alert.type === 'Warning' ? <AlertTriangle className="w-3 h-3" /> : 
                           <Info className="w-3 h-3" />}
                          {alert.type}
                        </span>
                        <span className="text-[10px] font-medium text-muted">
                          {alert.time}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-brand-gold transition-colors">{alert.title}</h4>
                    <p className="text-xs text-muted mb-3 leading-relaxed">
                      {alert.message}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                      <span className="text-[10px] font-medium text-muted uppercase tracking-wider">{alert.module}</span>
                      <div className="flex gap-2">
                        {alert.type === 'Warning' && alert.module === 'System' && (
                          <button className="flex items-center gap-1 text-[10px] font-medium text-muted hover:text-foreground transition-colors">
                            <RefreshCw className="w-3 h-3" /> Retry Sync
                          </button>
                        )}
                        <button className="flex items-center gap-1 text-[10px] font-medium text-brand-gold hover:text-brand-gold-dark transition-colors">
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-foreground/5">
              <button 
                onClick={() => { navigate('/app'); onClose(); }}
                className="w-full py-2 text-sm font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-foreground/10 transition-colors"
              >
                View All Alerts
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
