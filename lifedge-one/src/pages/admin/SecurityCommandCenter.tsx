import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Users, Key, Settings, Lock, FileKey, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import UserManagement from './UserManagement';

type SecurityTab = 'users' | 'roles' | 'thresholds' | 'delegations' | 'audit';

export default function SecurityCommandCenter() {
  const [activeTab, setActiveTab] = useState<SecurityTab>('users');

  const tabs = [
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Key },
    { id: 'thresholds', label: 'Approval Thresholds', icon: DollarSignIcon },
    { id: 'delegations', label: 'Acting Delegations', icon: Shield },
    { id: 'audit', label: 'Access Audit Logs', icon: FileKey },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1 flex items-center gap-3">
            <Lock className="w-8 h-8 text-brand-gold" /> Security & Access Command
          </h1>
          <p className="text-sm text-muted">
            Configure sovereign-grade access controls, financial boundaries, and delegation routing.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 mt-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SecurityTab)}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[500px]"
        >
          {activeTab === 'users' && <UserManagement />}
          
          {activeTab === 'roles' && (
            <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-[500px]">
              <Key className="w-12 h-12 text-muted mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-foreground mb-1">Role Matrix Builder</h3>
              <p className="text-sm text-muted max-w-md">
                Map granular ABAC policies dynamically. Features allow configuring Read/Write/Execute across all 27 domain modules.
              </p>
              <button className="mt-6 px-6 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium">Create New Custom Role</button>
            </div>
          )}

          {activeTab === 'thresholds' && (
            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Financial Approval Thresholds</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                      <tr>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Action Type</th>
                        <th className="px-4 py-3">Maximum Limit (USD)</th>
                        <th className="px-4 py-3">Routing Required Above Limit</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      <tr className="hover:bg-foreground/5">
                        <td className="px-4 py-3 font-medium text-brand-gold">Budget Officer</td>
                        <td className="px-4 py-3">Allotment Request</td>
                        <td className="px-4 py-3 font-mono text-foreground">$50,000.00</td>
                        <td className="px-4 py-3 text-muted">Director of Budget</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">Enforced</span></td>
                      </tr>
                      <tr className="hover:bg-foreground/5">
                        <td className="px-4 py-3 font-medium text-brand-gold">Director of Budget</td>
                        <td className="px-4 py-3">Allotment Request</td>
                        <td className="px-4 py-3 font-mono text-foreground">$150,000.00</td>
                        <td className="px-4 py-3 text-muted">Deputy Minister for Budget</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">Enforced</span></td>
                      </tr>
                      <tr className="hover:bg-foreground/5">
                        <td className="px-4 py-3 font-medium text-brand-gold">Deputy Minister for Budget</td>
                        <td className="px-4 py-3">Allotment Request</td>
                        <td className="px-4 py-3 font-mono text-foreground">$500,000.00</td>
                        <td className="px-4 py-3 text-muted">Minister of Finance</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">Enforced</span></td>
                      </tr>
                      <tr className="hover:bg-foreground/5">
                        <td className="px-4 py-3 font-medium text-brand-gold">Minister of Finance</td>
                        <td className="px-4 py-3">Allotment Request</td>
                        <td className="px-4 py-3 font-mono text-foreground">Unlimited</td>
                        <td className="px-4 py-3 text-muted">President (Optional)</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">Enforced</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delegations' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium">New Delegation</button>
              </div>
              <div className="glass-panel p-6 border-l-4 border-l-brand-gold">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Acting Minister of Finance</h4>
                    <p className="text-xs text-muted mt-1">Delegated from: Amara Konneh</p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-brand-gold">
                      <span>Minister of Finance</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="font-bold">Anthony K. Myers (Deputy Minister)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-xs font-medium uppercase rounded border border-brand-green/20">Active</span>
                    <p className="text-[10px] text-muted mt-2 font-mono">Until: Oct 15, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-[500px]">
              <FileKey className="w-12 h-12 text-muted mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-foreground mb-1">Immutable Audit Log</h3>
              <p className="text-sm text-muted max-w-md">
                Every login, permission change, and threshold adjustment is securely logged and hashed here to prevent tampering.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const DollarSignIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
