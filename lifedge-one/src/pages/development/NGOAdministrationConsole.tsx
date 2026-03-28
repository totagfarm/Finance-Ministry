import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { HeartHandshake, FileCheck, AlertTriangle, ArrowRight, ShieldCheck, Link as LinkIcon, Download } from 'lucide-react';
import { cn } from '../../lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface NGORecord {
  id: string;
  name: string;
  sector: string;
  accreditationStatus: string;
  expirationDate: string;
  totalFunding: number;
}

export default function NGOAdministrationConsole() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<NGORecord[]>([
    { id: 'NGO-2026-001', name: 'Global Health Partners', sector: 'Healthcare', accreditationStatus: 'Active', expirationDate: '2027-12-31', totalFunding: 15500000 },
    { id: 'NGO-2026-002', name: 'Education for All Foundation', sector: 'Education', accreditationStatus: 'Expired', expirationDate: '2025-06-30', totalFunding: 2100000 },
    { id: 'NGO-2026-003', name: 'AgriTech Liberia', sector: 'Agriculture', accreditationStatus: 'Pending Renewal', expirationDate: '2026-11-15', totalFunding: 850000 },
    { id: 'NGO-2026-004', name: 'Clean Water Initiative', sector: 'WASH', accreditationStatus: 'Active', expirationDate: '2028-01-01', totalFunding: 4200000 },
    { id: 'NGO-2026-005', name: 'Women in Tech Africa', sector: 'ICT & Gender', accreditationStatus: 'Active', expirationDate: '2029-05-20', totalFunding: 1100000 },
  ]);

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const statusCellRenderer = (params: any) => {
    const status = params.value;
    return (
      <span className={cn(
        "px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold inline-block leading-none mt-2",
        status === 'Active' ? "bg-brand-green/20 text-brand-green cursor-default" :
        status === 'Expired' ? "bg-red-500/20 text-red-500 cursor-default" :
        "bg-orange-500/20 text-orange-500 cursor-default"
      )}>
         {status}
      </span>
    );
  };

  const [colDefs] = useState<ColDef<NGORecord>[]>([
    { field: 'id', headerName: 'Registration ID', width: 150, pinned: 'left', cellClass: 'font-mono text-xs' },
    { field: 'name', headerName: 'CSO / NGO Name', width: 250 },
    { field: 'sector', headerName: 'Primary Sector', width: 160 },
    { field: 'accreditationStatus', headerName: 'Status', width: 150, cellRenderer: statusCellRenderer },
    { field: 'expirationDate', headerName: 'Valid Until', width: 140 },
    { field: 'totalFunding', headerName: 'Reported Capital Inflow', width: 220, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'font-bold text-brand-gold' },
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
            <HeartHandshake className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Module 14 / CSO Oversight</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">NGO Administration Console</h1>
          <p className="text-sm text-muted mt-1">Accreditation tracking, sector alignment, and non-profit funding visibility</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/development/ngo/new"
            className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-bold hover:bg-brand-gold-dark flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
          >
            <FileCheck className="w-4 h-4" /> Issue Certificate
          </Link>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Accredited NGOs', value: '142', target: 'Across 12 Sectors', icon: ShieldCheck, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Expired Licenses', value: '18', target: 'Requires Review', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Pending Renewals', value: '24', target: 'Under Review', icon: FileCheck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Total CSO Capital', value: '$254.1M', target: 'Off-Budget Funding', icon: HeartHandshake, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
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
              <p className="text-xs font-medium text-muted mt-2">{kpi.target}</p>
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
          <h3 className="text-lg font-medium text-foreground font-serif">Registered Civil Society Registry</h3>
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
