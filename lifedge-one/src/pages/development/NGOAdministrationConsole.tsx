import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, CheckCircle, AlertTriangle, Clock, Search, Filter, ArrowRight, FileText, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockApplications = [
  { id: 'NGO-2026-045', name: 'Global Health Initiative', status: 'Pending Review', type: 'International', date: 'Oct 24, 2026' },
  { id: 'NGO-2026-046', name: 'Liberia Education Trust', status: 'Missing Docs', type: 'National', date: 'Oct 23, 2026' },
  { id: 'NGO-2026-047', name: 'AgriGrow Foundation', status: 'Approved', type: 'National', date: 'Oct 20, 2026' },
  { id: 'NGO-2026-048', name: 'Water for All', status: 'Pending Review', type: 'International', date: 'Oct 19, 2026' },
];

export default function NGOAdministrationConsole() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">NGO Administration Console</h1>
          <p className="text-sm text-muted mt-1">Manage NGO registrations, accreditations, and compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search NGOs..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {[
          { id: 'applications', label: 'Applications' },
          { id: 'users', label: 'Users' },
          { id: 'documents', label: 'Document Types' },
          { id: 'statuses', label: 'Accreditation Statuses' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id ? "text-brand-gold" : "text-muted hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'applications' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Accredited', value: '142', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                { label: 'Pending Review', value: '24', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { label: 'Missing Documents', value: '8', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
                { label: 'Expiring Soon', value: '15', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              ].map((kpi, idx) => (
                <div key={idx} className="glass-panel p-4 flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", kpi.bg)}>
                    <kpi.icon className={cn("w-6 h-6", kpi.color)} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">{kpi.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Applications Table */}
            <div className="glass-panel overflow-hidden">
              <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
                <h3 className="font-medium text-sm text-foreground">Recent Applications</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Application ID</th>
                      <th className="px-4 py-3 font-medium">Organization Name</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Submission Date</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {mockApplications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                        <td className="px-4 py-3 font-mono text-xs text-foreground">{app.id}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{app.name}</td>
                        <td className="px-4 py-3 text-muted">{app.type}</td>
                        <td className="px-4 py-3 text-muted">{app.date}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block",
                            app.status === 'Approved' ? "bg-brand-green/20 text-brand-green" :
                            app.status === 'Missing Docs' ? "bg-red-500/20 text-red-500" :
                            "bg-orange-500/20 text-orange-500"
                          )}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-brand-gold hover:text-brand-gold-dark font-medium text-xs transition-colors">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'applications' && (
          <div className="glass-panel p-12 text-center">
            <p className="text-muted">Content for {activeTab} will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
