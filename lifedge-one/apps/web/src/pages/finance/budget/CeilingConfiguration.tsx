import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Save, AlertTriangle, TrendingUp, Download, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface SectorCeiling {
  id: string;
  sectorName: string;
  headAgency: string;
  fy25Actual: number;
  fy26Ceiling: number;
  fy27Projection: number;
  fy28Projection: number;
  status: 'Set' | 'Pending' | 'Locked';
}

const mockData: SectorCeiling[] = [
  { id: 'S01', sectorName: 'Public Administration', headAgency: 'MFDP', fy25Actual: 154000000, fy26Ceiling: 160000000, fy27Projection: 165000000, fy28Projection: 170000000, status: 'Set' },
  { id: 'S02', sectorName: 'Municipal Government', headAgency: 'MIA', fy25Actual: 25000000, fy26Ceiling: 28000000, fy27Projection: 30000000, fy28Projection: 32000000, status: 'Locked' },
  { id: 'S03', sectorName: 'Transparency & Accountability', headAgency: 'GAC', fy25Actual: 18000000, fy26Ceiling: 20000000, fy27Projection: 22000000, fy28Projection: 24000000, status: 'Pending' },
  { id: 'S04', sectorName: 'Security & Rule of Law', headAgency: 'MoJ', fy25Actual: 85000000, fy26Ceiling: 92000000, fy27Projection: 95000000, fy28Projection: 98000000, status: 'Set' },
  { id: 'S05', sectorName: 'Health', headAgency: 'MoH', fy25Actual: 110000000, fy26Ceiling: 125000000, fy27Projection: 130000000, fy28Projection: 135000000, status: 'Set' },
  { id: 'S06', sectorName: 'Social Development Services', headAgency: 'MGCSP', fy25Actual: 15000000, fy26Ceiling: 18000000, fy27Projection: 20000000, fy28Projection: 22000000, status: 'Pending' },
  { id: 'S07', sectorName: 'Education', headAgency: 'MoE', fy25Actual: 105000000, fy26Ceiling: 115000000, fy27Projection: 120000000, fy28Projection: 125000000, status: 'Set' },
  { id: 'S08', sectorName: 'Infrastructure & Basic Services', headAgency: 'MPW', fy25Actual: 210000000, fy26Ceiling: 195000000, fy27Projection: 180000000, fy28Projection: 200000000, status: 'Locked' },
  { id: 'S09', sectorName: 'Agriculture', headAgency: 'MoA', fy25Actual: 35000000, fy26Ceiling: 45000000, fy27Projection: 50000000, fy28Projection: 55000000, status: 'Set' },
  { id: 'S10', sectorName: 'Commerce & Industry', headAgency: 'MoCI', fy25Actual: 12000000, fy26Ceiling: 14000000, fy27Projection: 15000000, fy28Projection: 16000000, status: 'Pending' }
];

const MACRO_ENVELOPE = 1200000000; // $1.2B

export default function CeilingConfiguration() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [rowData, setRowData] = useState<SectorCeiling[]>(mockData);
  const [totalCeiling, setTotalCeiling] = useState(() => mockData.reduce((acc, row) => acc + row.fy26Ceiling, 0));

  const currencyFormatter = (params: any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const statusRenderer = (params: any) => {
    const status = params.value;
    switch(status) {
      case 'Locked': return '<span class="px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs font-medium border border-red-500/20">Locked</span>';
      case 'Set': return '<span class="px-2 py-1 bg-brand-green/10 text-brand-green rounded text-xs font-medium border border-brand-green/20">Set</span>';
      default: return '<span class="px-2 py-1 bg-brand-gold/10 text-brand-gold rounded text-xs font-medium border border-brand-gold/20">Pending</span>';
    }
  };

  const [colDefs] = useState<ColDef<SectorCeiling>[]>([
    { field: 'sectorName', headerName: 'MTEF Sector', width: 280, pinned: 'left', filter: true },
    { field: 'headAgency', headerName: 'Head MAC', width: 120 },
    { field: 'fy25Actual', headerName: 'FY25 Approved', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { 
      field: 'fy26Ceiling', 
      headerName: 'FY26 Envelope', 
      width: 180, 
      editable: (params) => params.data?.status !== 'Locked',
      valueFormatter: currencyFormatter, 
      type: 'numericColumn',
      cellClass: (params) => params.data?.status === 'Locked' ? '' : 'bg-brand-gold/5 font-bold cursor-text',
      onCellValueChanged: (params) => {
        // Recalculate total logic will be handled below via grid event
      }
    },
    { field: 'fy27Projection', headerName: 'FY27 MTEF', width: 180, editable: true, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { field: 'fy28Projection', headerName: 'FY28 MTEF', width: 180, editable: true, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { field: 'status', headerName: 'Status', width: 120, cellRenderer: statusRenderer }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const handleCellValueChanged = (event: any) => {
    // Recalculate the sum of fy26Ceiling
    let newTotal = 0;
    event.api.forEachNode((node: any) => {
      newTotal += Number(node.data.fy26Ceiling);
    });
    setTotalCeiling(newTotal);
  };

  const utilizationPercent = (totalCeiling / MACRO_ENVELOPE) * 100;
  const isOverBudget = totalCeiling > MACRO_ENVELOPE;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 5 / Setup</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Macroeconomic Envelopes
          </h1>
          <p className="text-sm text-muted">
            Configure hard top-line ceilings for all 27 MTEF Sectors. Agencies cannot submit budgets exceeding these figures.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-bold shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:bg-brand-gold-dark flex items-center gap-2 transition-all">
            <Save className="w-4 h-4" /> Save Formulation
          </button>
        </div>
      </div>

      {/* Constraints Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="glass-panel p-6">
          <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">National Revenue Envelope</h3>
          <p className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(MACRO_ENVELOPE)}
          </p>
          <p className="text-xs text-brand-green mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.2% projected growth
          </p>
        </div>

        <div className={`glass-panel p-6 border-l-4 ${isOverBudget ? 'border-l-red-500 bg-red-500/5' : 'border-l-brand-gold'}`}>
          <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Total Sector Ceilings Set</h3>
          <p className={`text-3xl font-serif font-semibold ${isOverBudget ? 'text-red-500' : 'text-foreground'}`}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalCeiling)}
          </p>
          <div className="w-full bg-foreground/10 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-brand-gold'}`} 
              style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-center">
          {isOverBudget ? (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-500">Deficit Warning</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Allocated ceilings exceed the macroeconomic revenue framework. The system will prevent locking this formulation cycle until balanced.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-green/10 rounded-lg shrink-0">
                <AlertTriangle className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-brand-green">Balanced Status</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Remaining headroom: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(MACRO_ENVELOPE - totalCeiling)}. You may proceed to distribute remaining funds.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel overflow-hidden border border-border flex flex-col"
        style={{ height: '500px' }}
      >
        <div className="bg-foreground/[0.02] border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-sm font-medium text-foreground">Sector Allocation Grid</h2>
          <span className="text-xs text-muted">Double-click FY26, FY27 cells to edit constraints.</span>
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
            onCellValueChanged={handleCellValueChanged}
            suppressCellFocus={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
