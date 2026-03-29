import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { ShieldCheck, AlertTriangle, FileCheck, CheckCircle, Clock, Building2, Download, Search, AlertOctagon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface ComplianceRecord {
  id: string;
  entity: string;
  requirement: string;
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'At Risk';
  dueDate: string;
  submitted: string;
}

export default function ComplianceMonitor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<ComplianceRecord[]>([
    { id: 'COMP-2026-001', entity: 'Ministry of Finance', requirement: 'Monthly Financial Report', status: 'Compliant', dueDate: '2026-10-31', submitted: '2026-10-28' },
    { id: 'COMP-2026-002', entity: 'Ministry of Health', requirement: 'Quarterly Procurement Plan', status: 'Non-Compliant', dueDate: '2026-09-30', submitted: 'N/A' },
    { id: 'COMP-2026-003', entity: 'Liberia Revenue Authority', requirement: 'Annual Audit Response', status: 'Pending Review', dueDate: '2026-11-15', submitted: '2026-11-01' },
    { id: 'COMP-2026-004', entity: 'Ministry of Education', requirement: 'Payroll Verification', status: 'Compliant', dueDate: '2026-10-15', submitted: '2026-10-14' },
    { id: 'COMP-2026-005', entity: 'National Port Authority', requirement: 'Asset Declaration (LACC)', status: 'At Risk', dueDate: '2026-11-30', submitted: 'N/A' },
  ]);

  const statusCellRenderer = (params: any) => {
    const status = params.value;
    return (
       <div className="flex items-center h-full">
         <span className={cn(
            "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-flex items-center gap-1",
            status === 'Compliant' ? "bg-brand-green/20 text-brand-green" :
            status === 'Non-Compliant' ? "bg-red-500/20 text-red-500" :
            status === 'At Risk' ? "bg-orange-500/20 text-orange-500" :
            "bg-blue-500/20 text-blue-500"
          )}>
            {status === 'Compliant' && <CheckCircle className="w-3 h-3" />}
            {status === 'Non-Compliant' && <AlertTriangle className="w-3 h-3" />}
            {status === 'At Risk' && <Clock className="w-3 h-3" />}
            {status === 'Pending Review' && <FileCheck className="w-3 h-3" />}
            {status}
          </span>
       </div>
    );
  }

  const [colDefs] = useState<ColDef<ComplianceRecord>[]>([
    { field: 'id', headerName: 'Tracking Ref', width: 140, pinned: 'left', cellClass: 'font-mono text-xs text-brand-gold' },
    { field: 'entity', headerName: 'Governing Entity (MAC)', width: 280 },
    { field: 'requirement', headerName: 'Statutory Requirement', width: 220 },
    { field: 'status', headerName: 'Compliance Status', width: 180, cellRenderer: statusCellRenderer },
    { field: 'dueDate', headerName: 'Due Date', width: 130 },
    { field: 'submitted', headerName: 'Submitted On', width: 140, cellStyle: (p) => p.value === 'N/A' ? { color: '#ef4444' } : {} },
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
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Module 17 / Compliance & Regulatory</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Compliance Monitor</h1>
          <p className="text-sm text-muted mt-1">Track institutional adherence to financial reporting, PPCC mandates, and asset declarations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/oversight/compliance/new"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-500 flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(234,88,12,0.3)]"
          >
            <AlertOctagon className="w-4 h-4" /> Flag Violation Override
          </Link>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Compliance Rate', value: '82%', target: '+5% Monthly Velocity', icon: ShieldCheck, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Non-Compliant Entities', value: '14', target: 'Escalated to IG', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Pending Reviews', value: '38', target: 'Docs Submitted', icon: FileCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Upcoming Deadlines', value: '25', target: 'Next 14 Days', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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
              <p className="text-xs font-medium text-orange-500 mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors duration-500"></div>
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
          <h3 className="text-lg font-medium text-foreground font-serif">Statutory Submissions Matrix</h3>
          <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
             <Download className="w-4 h-4"/> Extract Ledger
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
            '--ag-header-foreground-color': isDark ? '#f97316' : '#ea580c',
            '--ag-header-font-weight': '600',
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
