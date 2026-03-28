import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Save, AlertTriangle, Send, FileText, LayoutTemplate, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface BudgetRow {
  id: string;
  charterId: string;
  description: string;
  fundSource: string;
  fy25Actual: number;
  fy26Request: number;
  fy27Projection: number;
  fy28Projection: number;
  justification: string;
}

const mockAgencyData: BudgetRow[] = [
  { id: '211101', charterId: '211101', description: 'Basic Salary - Civil Service', fundSource: 'GOL', fy25Actual: 2500000, fy26Request: 2550000, fy27Projection: 2600000, fy28Projection: 2650000, justification: 'Annual increment' },
  { id: '221101', charterId: '221101', description: 'Domestic Travel', fundSource: 'GOL', fy25Actual: 150000, fy26Request: 180000, fy27Projection: 190000, fy28Projection: 200000, justification: 'Increased supervision trips' },
  { id: '221102', charterId: '221102', description: 'Foreign Travel & DSA', fundSource: 'GOL', fy25Actual: 80000, fy26Request: 120000, fy27Projection: 100000, fy28Projection: 110000, justification: 'Bilateral negotiations' },
  { id: '221201', charterId: '221201', description: 'Telecommunications', fundSource: 'GOL', fy25Actual: 45000, fy26Request: 50000, fy27Projection: 50000, fy28Projection: 50000, justification: 'Internet bandwidth upgrade' },
  { id: '221401', charterId: '221401', description: 'Fuel & Lubricants - Vehicles', fundSource: 'GOL', fy25Actual: 320000, fy26Request: 400000, fy27Projection: 420000, fy28Projection: 440000, justification: 'New fleet procurement impact' },
  { id: '221502', charterId: '221502', description: 'Printing & Binding', fundSource: 'GOL', fy25Actual: 20000, fy26Request: 25000, fy27Projection: 25000, fy28Projection: 25000, justification: 'Policy document publication' },
  { id: '221601', charterId: '221601', description: 'Stationery', fundSource: 'GOL', fy25Actual: 15000, fy26Request: 18000, fy27Projection: 18000, fy28Projection: 18000, justification: 'General office supplies' },
  { id: '311101', charterId: '311101', description: 'Capital Equipment - Vehicles', fundSource: 'Donor', fy25Actual: 0, fy26Request: 250000, fy27Projection: 0, fy28Projection: 0, justification: 'Replacement of 2018 fleet' },
  { id: '311104', charterId: '311104', description: 'ICT Infrastructure', fundSource: 'GOL', fy25Actual: 120000, fy26Request: 80000, fy27Projection: 50000, fy28Projection: 50000, justification: 'Server room modernization' }
];

const MACRO_CEILING = 3500000; // $3.5M Ceiling for this agency

export default function AgencySubmissionGrid() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [rowData, setRowData] = useState<BudgetRow[]>(mockAgencyData);
  const [totalRequest, setTotalRequest] = useState(() => mockAgencyData.reduce((acc, row) => acc + row.fy26Request, 0));

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const [colDefs] = useState<ColDef<BudgetRow>[]>([
    { field: 'charterId', headerName: 'Code', width: 100, pinned: 'left', filter: true },
    { field: 'description', headerName: 'Chart of Account (Economic Class)', width: 300, pinned: 'left' },
    { field: 'fundSource', headerName: 'Fund', width: 100, editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ['GOL', 'Donor', 'IGR'] }, cellClass: 'bg-foreground/5 cursor-pointer' },
    { field: 'fy25Actual', headerName: 'FY25 Approved', width: 150, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'text-muted' },
    { 
      field: 'fy26Request', 
      headerName: 'FY26 Request', 
      width: 150, 
      editable: true,
      valueFormatter: currencyFormatter, 
      type: 'numericColumn',
      cellClass: 'bg-brand-gold/5 font-bold cursor-text border-l border-brand-gold/30',
    },
    { field: 'fy27Projection', headerName: 'FY27 MTEF', width: 150, editable: true, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'cursor-text bg-foreground/[0.02]' },
    { field: 'fy28Projection', headerName: 'FY28 MTEF', width: 150, editable: true, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'cursor-text bg-foreground/[0.02]' },
    { field: 'justification', headerName: 'Strategic Justification', width: 350, editable: true, cellClass: 'cursor-text italic text-muted' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const handleCellValueChanged = (event: any) => {
    if (event.column.colId === 'fy26Request') {
      let newTotal = 0;
      event.api.forEachNode((node: any) => {
        newTotal += Number(node.data.fy26Request) || 0;
      });
      setTotalRequest(newTotal);
    }
  };

  const utilizationPercent = (totalRequest / MACRO_CEILING) * 100;
  const isOverBudget = totalRequest > MACRO_CEILING;

  return (
    <div className="space-y-6 pb-12 h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 5 / Formulation</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Agency Submission Matrix
          </h1>
          <p className="text-sm text-muted">
            Ministry of Finance, Development & Planning &bull; Departmental Itemization
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <LayoutTemplate className="w-4 h-4" /> Load Template
          </button>
          <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2">
            <Save className="w-4 h-4 text-brand-green" /> Save Draft
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              isOverBudget 
                ? 'bg-foreground/10 text-muted cursor-not-allowed' 
                : 'bg-brand-gold text-brand-dark shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:bg-brand-gold-dark hover:translate-y-[-2px]'
            }`}
            disabled={isOverBudget}
          >
            <Send className="w-4 h-4" /> Submit to Review
          </button>
        </div>
      </div>

      {/* Constraints Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-6 shrink-0"
      >
        <div className="glass-panel p-6 border-l-4 border-l-brand-gold">
          <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
            Ceiling Disbursed <FileText className="w-3 h-3 text-brand-gold" />
          </h3>
          <p className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(MACRO_CEILING)}
          </p>
          <p className="text-xs text-muted mt-2">Fixed envelope assigned by Macro Department.</p>
        </div>

        <div className={`glass-panel p-6 border-l-4 ${isOverBudget ? 'border-l-red-500 bg-red-500/5' : 'border-l-brand-green'}`}>
          <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Total FY26 Requested</h3>
          <p className={`text-3xl font-serif font-semibold ${isOverBudget ? 'text-red-500' : 'text-foreground'}`}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalRequest)}
          </p>
          <div className="w-full bg-foreground/10 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-brand-green'}`} 
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
                <h4 className="text-sm font-medium text-red-500">Submission Blocked - Over Ceiling</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Your request is <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalRequest - MACRO_CEILING)}</strong> over the authorized ceiling. Reduce line items below to enable the Submit button.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-green/10 rounded-lg shrink-0">
                <AlertTriangle className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-brand-green">Submission Cleared</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Remaining headroom: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(MACRO_CEILING - totalRequest)}. Your spreadsheet is within allowed fiscal limits.
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
        className="glass-panel overflow-hidden border border-border flex flex-col flex-1"
      >
        <div className="bg-foreground/[0.02] border-b border-border p-4 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-medium text-foreground">Line-Item Economic Classification Grid</h2>
          <span className="text-xs text-muted bg-foreground/10 px-2 py-1 rounded">Double-click any colored cell to edit</span>
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
