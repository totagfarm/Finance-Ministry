import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, FileText, Activity, MapPin, DollarSign, Building2, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockProjects = [
  { id: 'PRJ-2026-001', title: 'National Malaria Control Program', sector: 'Health', county: 'Montserrado', funding: 'Donor', stage: 'Implementation', cost: 15000000, execution: 45 },
  { id: 'PRJ-2026-002', title: 'Rural Electrification Initiative', sector: 'Infrastructure', county: 'Nimba', funding: 'GoL', stage: 'Appraisal', cost: 25000000, execution: 0 },
  { id: 'PRJ-2026-003', title: 'Primary Education Support', sector: 'Education', county: 'Bong', funding: 'Blended', stage: 'Implementation', cost: 12000000, execution: 75 },
  { id: 'PRJ-2026-004', title: 'Agricultural Extension Services', sector: 'Agriculture', county: 'Lofa', funding: 'Donor', stage: 'Completion', cost: 8500000, execution: 95 },
  { id: 'PRJ-2026-005', title: 'Coastal Defense Project', sector: 'Infrastructure', county: 'Grand Bassa', funding: 'GoL', stage: 'Identification', cost: 45000000, execution: 0 },
];

export default function ProjectBank() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Project Bank</h1>
          <p className="text-sm text-muted mt-1">Central repository for all public investment and donor-funded projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '452', trend: 'Active Portfolio', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Total Value', value: '$1.2B', trend: 'Across All Stages', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'In Implementation', value: '185', trend: '41% of Portfolio', icon: Activity, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Pending Appraisal', value: '42', trend: 'Requires Review', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-light text-foreground mb-1">{kpi.value}</h3>
              <p className="text-sm font-medium text-muted">{kpi.label}</p>
              <p className="text-xs text-muted mt-2">{kpi.trend}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      {/* Projects List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
          <h3 className="font-medium text-sm text-foreground">Project Portfolio</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Project ID / Title</th>
                <th className="px-4 py-3 font-medium">Sector / County</th>
                <th className="px-4 py-3 font-medium">Funding</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium text-right">Total Cost</th>
                <th className="px-4 py-3 font-medium text-right">Execution</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockProjects.map((project, idx) => (
                <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs text-muted mb-1">{project.id}</div>
                    <div className="font-medium text-foreground line-clamp-1">{project.title}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-foreground flex items-center gap-1 mb-1">
                      <Building2 className="w-3 h-3 text-muted" /> {project.sector}
                    </div>
                    <div className="text-muted text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.county}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block",
                      project.funding === 'Donor' ? "bg-blue-500/20 text-blue-500" :
                      project.funding === 'GoL' ? "bg-brand-green/20 text-brand-green" :
                      "bg-purple-500/20 text-purple-500"
                    )}>
                      {project.funding}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block",
                      project.stage === 'Implementation' ? "bg-brand-gold/20 text-brand-gold" :
                      project.stage === 'Appraisal' ? "bg-orange-500/20 text-orange-500" :
                      project.stage === 'Completion' ? "bg-brand-green/20 text-brand-green" :
                      "bg-foreground/10 text-foreground"
                    )}>
                      {project.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    ${(project.cost / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs font-medium text-muted">{project.execution}%</span>
                      <div className="w-16 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            project.execution > 80 ? "bg-brand-green" :
                            project.execution > 40 ? "bg-brand-gold" :
                            "bg-orange-500"
                          )}
                          style={{ width: `${project.execution}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-brand-gold hover:text-brand-gold-dark font-medium text-xs transition-colors">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
