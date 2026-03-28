import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { Shield, Key, Search, FileKey, CheckCircle2, XCircle, Clock, Download, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
  clearance: 'LACC Verified' | 'Pending Audit' | 'Revoked';
  status: 'Active' | 'Locked';
  lastLogin: string;
}

export default function UserManagement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<UserRecord[]>([
    { id: 'UID-1001', name: 'Alexander B. Cummings', email: 'acummings@emansion.gov.lr', role: 'Executive Override', institution: 'Executive Mansion', clearance: 'LACC Verified', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'UID-1002', name: 'Boima S. Kamara', email: 'bkamara@mfdp.gov.lr', role: 'System Administrator (Finance)', institution: 'Ministry of Finance', clearance: 'LACC Verified', status: 'Active', lastLogin: '1 hour ago' },
    { id: 'UID-1003', name: 'Samuel D. Tweah', email: 'stweah@mfdp.gov.lr', role: 'Budget Director', institution: 'Ministry of Finance', clearance: 'Pending Audit', status: 'Locked', lastLogin: '45 days ago' },
    { id: 'UID-1004', name: 'Dorbor Jallah', email: 'djallah@lra.gov.lr', role: 'Revenue Commissioner', institution: 'Liberia Revenue Authority', clearance: 'LACC Verified', status: 'Active', lastLogin: '5 mins ago' },
    { id: 'UID-1005', name: 'Cllr. Alexandra Zoe', email: 'azoe@lacc.gov.lr', role: 'Chief Auditor (Read-Only)', institution: 'Liberia Anti-Corruption Commission', clearance: 'LACC Verified', status: 'Active', lastLogin: '3 days ago' },
  ]);

  const clearanceCellRenderer = (params: any) => {
    const clearance = params.value;
    return (
       <div className="flex items-center h-full">
         <span className={cn(
            "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1",
            clearance === 'LACC Verified' ? "bg-brand-green/20 text-brand-green" :
            clearance === 'Revoked' ? "bg-red-500/20 text-red-500" :
            "bg-orange-500/20 text-orange-500"
          )}>
            {clearance === 'LACC Verified' && <CheckCircle2 className="w-3 h-3" />}
            {clearance === 'Revoked' && <XCircle className="w-3 h-3" />}
            {clearance === 'Pending Audit' && <Clock className="w-3 h-3" />}
            {clearance}
          </span>
       </div>
    );
  };
  
  const statusCellRenderer = (params: any) => {
    const status = params.value;
    return (
      <span className={cn(
        "px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider inline-flex items-center gap-1 mt-2.5",
        status === 'Active' ? "text-brand-green bg-brand-green/10" : "text-red-500 bg-red-500/10"
      )}>
        {status}
      </span>
    );
  };

  const [colDefs] = useState<ColDef<UserRecord>[]>([
    { field: 'id', headerName: 'Network ID', width: 130, pinned: 'left', cellClass: 'font-mono text-xs text-brand-gold' },
    { field: 'name', headerName: 'Official Name', width: 200, cellClass: 'font-medium text-foreground' },
    { field: 'role', headerName: 'System Role', width: 220 },
    { field: 'institution', headerName: 'Governing Body', width: 250 },
    { field: 'clearance', headerName: 'Background Check', width: 170, cellRenderer: clearanceCellRenderer },
    { field: 'status', headerName: 'Access', width: 120, cellRenderer: statusCellRenderer },
    { field: 'lastLogin', headerName: 'Last Authentication', width: 180, cellClass: 'text-muted text-xs' },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif font-medium text-foreground">Active Directory (GoL)</h2>
          <p className="text-sm text-muted mt-1">Manage physical users, 2FA profiles, and underlying system permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/admin/security/new-role"
            className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-bold hover:bg-brand-gold-dark flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(234,179,8,0.3)]"
          >
            <Plus className="w-4 h-4" /> Provision User Access
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
              placeholder="Search by Name or Network ID..." 
              className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64 lg:w-80"
            />
          </div>
          <button className="text-xs font-medium text-brand-gold hover:text-brand-gold-dark transition-colors flex items-center gap-1">
             <Download className="w-4 h-4"/> Export Audit List
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
            '--ag-header-foreground-color': isDark ? '#facc15' : '#ca8a04',
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
