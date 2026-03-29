import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Clock, ArrowRight, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface WorkQueueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTasks = [
  { id: '1', title: 'Approve Q3 Budget Allocation', type: 'Approval', status: 'Pending', due: 'Today', priority: 'High', institution: 'Ministry of Health' },
  { id: '2', title: 'Review Infrastructure Project Proposal', type: 'Review', status: 'Returned', due: 'Tomorrow', priority: 'Medium', institution: 'Ministry of Public Works' },
  { id: '3', title: 'Submit Monthly Expenditure Report', type: 'Task', status: 'Overdue', due: 'Yesterday', priority: 'High', institution: 'Finance Dept' },
];

export default function WorkQueueDrawer({ isOpen, onClose }: WorkQueueDrawerProps) {
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
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-medium text-foreground">My Work Queue</h2>
                  <p className="text-xs text-muted">Tasks & Approvals</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-muted hover:text-foreground rounded-full hover:bg-foreground/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-2 pb-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/10 text-foreground whitespace-nowrap">All (12)</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-transparent border border-border text-muted hover:text-foreground whitespace-nowrap">Pending (5)</button>
                <button className="px-3 py-1 text-xs font-medium rounded-full bg-transparent border border-border text-muted hover:text-foreground whitespace-nowrap">Overdue (2)</button>
              </div>

              <div className="space-y-3">
                {mockTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-border rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-md",
                          task.type === 'Approval' ? "bg-brand-gold/20 text-brand-gold" : 
                          task.type === 'Review' ? "bg-blue-500/20 text-blue-500" : 
                          "bg-foreground/10 text-foreground"
                        )}>
                          {task.type}
                        </span>
                        <span className={cn(
                          "flex items-center gap-1 text-[10px] font-medium",
                          task.status === 'Overdue' ? "text-red-500" : 
                          task.status === 'Returned' ? "text-orange-500" : 
                          "text-muted"
                        )}>
                          {task.status === 'Overdue' ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {task.due}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-brand-gold transition-colors">{task.title}</h4>
                    <p className="text-xs text-muted mb-3 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {task.institution}
                    </p>
                    
                    {task.type === 'Approval' && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                        <button className="flex-1 py-1.5 text-xs font-medium bg-brand-gold text-brand-dark rounded-lg hover:bg-brand-gold/90 transition-colors">
                          Approve
                        </button>
                        <button className="flex-1 py-1.5 text-xs font-medium bg-transparent border border-border text-foreground rounded-lg hover:bg-foreground/5 transition-colors">
                          Return
                        </button>
                      </div>
                    )}
                    {task.type !== 'Approval' && (
                      <div className="flex justify-end mt-2">
                        <button className="flex items-center gap-1 text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors">
                          Open Record <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-foreground/5">
              <button 
                onClick={() => { navigate('/app'); onClose(); }}
                className="w-full py-2 text-sm font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-foreground/10 transition-colors"
              >
                View All Tasks
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
