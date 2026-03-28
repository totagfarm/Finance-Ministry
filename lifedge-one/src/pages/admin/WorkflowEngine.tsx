import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { Network, Search, GitMerge, FileCheck, CheckCircle2, ChevronRight, Activity, Download, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PipelineRecord {
  id: string;
  moduleRoute: string;
  triggerEvent: string;
  nodes: number;
  condition: string;
  status: 'Active Enforced' | 'Bypassed' | 'Draft Mode';
  lastExecuted: string;
}

export default function WorkflowEngine() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<PipelineRecord[]>([
    { id: 'PIPE-ALLOT-01', moduleRoute: 'Treasury Execution', triggerEvent: 'New Allotment Request > $500,000', nodes: 4, condition: 'Strict Sequential', status: 'Active Enforced', lastExecuted: '12 mins ago' },
    { id: 'PIPE-VOUCH-02', moduleRoute: 'Voucher Processing', triggerEvent: 'Vendor Payment Disbursement', nodes: 3, condition: 'Parallel Review', status: 'Active Enforced', lastExecuted: '1 hr ago' },
    { id: 'PIPE-PROC-03', moduleRoute: 'Procurement Console', triggerEvent: 'Sole-Sourcing Exemption', nodes: 5, condition: 'Mandatory Escalation', status: 'Active Enforced', lastExecuted: '2 days ago' },
    { id: 'PIPE-MAC-04', moduleRoute: 'Institution Setup', triggerEvent: 'New Agency Induction', nodes: 2, condition: 'Director Sign-off', status: 'Draft Mode', lastExecuted: 'Never' },
    { id: 'PIPE-AUDIT-05', moduleRoute: 'Internal Audit', triggerEvent: 'High-Risk Rectification Log', nodes: 3, condition: 'LACC Notification Trigger', status: 'Active Enforced', lastExecuted: '5 hrs ago' },
  ]);

  const statusCellRenderer = (params: any) => {
    const status = params.value;
    return (
       <div className="flex items-center h-full">
         <span className={cn(
            "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1",
            status === 'Active Enforced' ? "bg-brand-green/20 text-brand-green" :
            status === 'Draft Mode' ? "bg-foreground/10 text-muted" :
            "bg-red-500/20 text-red-500"
          )}>
            {status}
          </span>
       </div>
    );
  };
  
  const nodeCellRenderer = (params: any) => {
    const count = params.value;
    return (
      <div className="flex items-center gap-1 h-full font-bold text-blue-500">
         <GitMerge className="w-3.5 h-3.5" /> {count} Tier Routing
      </div>
    );
  };

  const [colDefs] = useState<ColDef<PipelineRecord>[]>([
    { field: 'id', headerName: 'Pipeline Hash', width: 140, pinned: 'left', cellClass: 'font-mono text-xs text-blue-500' },
    { field: 'moduleRoute', headerName: 'Target Domain / Module', width: 220, cellClass: 'font-medium text-foreground' },
    { field: 'triggerEvent', headerName: 'Initialization Event', width: 280 },
    { field: 'nodes', headerName: 'Approval Nodes', width: 160, cellRenderer: nodeCellRenderer },
    { field: 'condition', headerName: 'Enforcement Policy', width: 200 },
    { field: 'status', headerName: 'System State', width: 160, cellRenderer: statusCellRenderer },
    { field: 'lastExecuted', headerName: 'Last Triggered', width: 130, cellClass: 'text-muted text-sm' },
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
            <Network className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 20 / Workflow Architecture</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Global Automation Engine</h1>
          <p className="text-sm text-muted mt-1">Design multi-tier verification chains bridging macroeconomic allotments down to daily revenue entries.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/admin/workflow/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500 flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
          >
            <GitMerge className="w-4 h-4" /> Architect New Pipeline
          </Link>
        </div>
      </div>

      {/* Grid Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel flex flex-col min-h-[500px]"
      >
        <div className="p-4 border-b border-border flex justify-between items-center bg-foreground/5 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search active pipelines..." 
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-blue-500 transition-colors w-64 lg:w-80"
            />
          </div>
          <button className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
             <Download className="w-4 h-4"/> Export Process Map
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
            '--ag-header-foreground-color': isDark ? '#3b82f6' : '#2563eb',
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
