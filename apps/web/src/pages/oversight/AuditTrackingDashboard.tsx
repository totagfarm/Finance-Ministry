import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { ShieldAlert, CheckCircle, Clock, AlertTriangle, ArrowRight, Building2, Download, Search, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AuditRecord {
  id: string;
  entity: string;
  type: string;
  status: string;
  findingsCount: number;
  findingSeverity: 'High' | 'Medium' | 'Low' | 'None';
  dueDate: string;
}

export default function AuditTrackingDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<AuditRecord[]>([
    { id: 'AUD-2026-012', entity: 'Ministry of Health', type: 'Financial Rectification', status: 'In Progress', findingsCount: 4, findingSeverity: 'High', dueDate: '2026-11-15' },
    { id: 'AUD-2026-011', entity: 'Liberia Revenue Authority', type: 'System Compliance', status: 'Drafting Report', findingsCount: 2, findingSeverity: 'Medium', dueDate: '2026-10-30' },
    { id: 'AUD-2026-010', entity: 'Ministry of Education', type: 'Performance Audit', status: 'Completed', findingsCount: 12, findingSeverity: 'High', dueDate: '2026-09-15' },
    { id: 'AUD-2026-009', entity: 'National Port Authority', type: 'Financial Audit', status: 'Planning', findingsCount: 0, findingSeverity: 'None', dueDate: '2026-12-01' },
    { id: 'AUD-2026-008', entity: 'Ministry of Public Works', type: 'Procurement Compliance', status: 'In Progress', findingsCount: 7, findingSeverity: 'High', dueDate: '2026-11-20' },
  ]);

  const severityCellRenderer = (params: any) => {
    const sev = params.value;
    if (sev === 'None') return <span className="text-muted text-xs">No Findings</span>;
    return (
      <span className={cn(
        "px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-1 leading-none mt-2",
        sev === 'High' ? "bg-red-500/20 text-red-500" :
        sev === 'Medium' ? "bg-orange-500/20 text-orange-500" :
        "bg-blue-500/20 text-blue-500"
      )}>
         {sev === 'High' && <AlertTriangle className="w-3 h-3" />}
         {sev} Risk
      </span>
    );
  };

  const statusCellRenderer = (params: any) => {
    const status = params.value;
    return (
       <span className={cn(
          "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-block mt-2",
          status === 'Completed' ? "bg-brand-green/20 text-brand-green" :
          status === 'In Progress' ? "bg-blue-500/20 text-blue-500" :
          status === 'Drafting Report' ? "bg-brand-gold/20 text-brand-gold" :
          "bg-foreground/10 text-foreground"
        )}>
          {status}
        </span>
    );
  }

  const [colDefs] = useState<ColDef<AuditRecord>[]>([
    { field: 'id', headerName: 'Audit Tracking ID', width: 160, pinned: 'left', cellClass: 'font-mono text-xs text-brand-gold' },
    { field: 'entity', headerName: 'Audited Entity (MAC)', width: 250 },
    { field: 'type', headerName: 'Audit Framework', width: 200 },
    { field: 'status', headerName: 'Current Phase', width: 150, cellRenderer: statusCellRenderer },
    { field: 'findingsCount', headerName: 'Total Findings', width: 140, type: 'numericColumn', cellClass: 'font-bold text-center' },
    { field: 'findingSeverity', headerName: 'Max Severity', width: 140, cellRenderer: severityCellRenderer },
    { field: 'dueDate', headerName: 'Statutory Deadline', width: 160 },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Module 16 / Internal Audit</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Audit Tracking & Remediation</h1>
          <p className="text-sm text-muted mt-1">Monitor active investigations, structural findings, and agency remediation plans.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/oversight/audit/new"
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-500 flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(239,68,68,0.3)]"
          >
            <AlertTriangle className="w-4 h-4" /> Log Official Finding
          </Link>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Audits', value: '24', target: 'Across 18 Entities', icon: Search, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Open Findings', value: '142', target: '35 High Risk Flags', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Remediated (YTD)', value: '85', target: '60% Resolution Rate', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Overdue Responses', value: '12', target: 'Requires Escalation', icon: Clock, color: 'text-red-500', bg: 'bg-red-500/10' },
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
              <p className="text-xs font-medium text-red-500 mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      {/* Grid Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel flex flex-col min-h-[500px]"
      >
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-medium text-foreground font-serif">Audit Engagement Ledger</h3>
          <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
             <Download className="w-4 h-4"/> Extract to Excel
          </button>
        </div>
        <div 
          className={cn(
            "flex-1 w-full",
            isDark ? "ag-theme-quartz-dark" : "ag-theme-quartz"
          )}
          style={{ 
            '--ag-background-color': 'transparent', 
            '--ag-header-background-color': 'rgba(255,255,255,0.02)',
            '--ag-border-color': isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            '--ag-row-border-color': isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            '--ag-odd-row-background-color': 'transparent',
            '--ag-header-foreground-color': isDark ? '#a1a1aa' : '#71717a',
            '--ag-font-family': 'Inter, system-ui, sans-serif'
          } as React.CSSProperties}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            domLayout="autoHeight"
          />
        </div>
      </motion.div>
    </div>
  );
}
