import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Scale, MessageSquare, CheckCircle, Search, Link as LinkIcon, Filter, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { MOCK_INSTITUTIONS } from '../../../config/institutions.config';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface HearingRow {
  id: string;
  charterId: string;
  description: string;
  agencyRequest: number;
  recommendedAmount: number;
  variance: number;
  notes: string;
}

const generateMockHearingData = (): HearingRow[] => [
  { id: '211101', charterId: '211101', description: 'Basic Salary - Civil Service', agencyRequest: 2550000, recommendedAmount: 2550000, variance: 0, notes: 'Aligned with CSA roster' },
  { id: '221101', charterId: '221101', description: 'Domestic Travel', agencyRequest: 180000, recommendedAmount: 150000, variance: -30000, notes: 'Reduced to FY25 execution levels' },
  { id: '221102', charterId: '221102', description: 'Foreign Travel & DSA', agencyRequest: 120000, recommendedAmount: 50000, variance: -70000, notes: 'Executive mandate cut on travel' },
  { id: '221401', charterId: '221401', description: 'Fuel & Lubricants - Vehicles', agencyRequest: 400000, recommendedAmount: 320000, variance: -80000, notes: 'Capping fleet consumption' },
  { id: '311101', charterId: '311101', description: 'Capital Equipment - Vehicles', agencyRequest: 250000, recommendedAmount: 0, variance: -250000, notes: 'Denied. Utilize existing fleet.' }
];

export default function HearingsWorkspace() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [selectedInst, setSelectedInst] = useState<string | null>(null);
  const [rowData, setRowData] = useState<HearingRow[]>([]);
  const [totals, setTotals] = useState({ requested: 0, recommended: 0, variance: 0 });

  const loadInstitutionData = (id: string) => {
    setSelectedInst(id);
    const mockData = generateMockHearingData();
    setRowData(mockData);
    
    // Calculate initial totals
    const req = mockData.reduce((acc, row) => acc + row.agencyRequest, 0);
    const rec = mockData.reduce((acc, row) => acc + row.recommendedAmount, 0);
    setTotals({ requested: req, recommended: rec, variance: rec - req });
  };

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const varianceFormatter = (params: any) => {
    const val = params.value;
    if (val === 0) return '$0';
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(val));
    return val < 0 ? `-${formatted}` : `+${formatted}`;
  };

  const varianceCellClassRules = {
    'text-red-500 font-medium': (params: any) => params.value < 0,
    'text-green-500 font-medium': (params: any) => params.value > 0,
    'text-muted': (params: any) => params.value === 0,
  };

  const [colDefs] = useState<ColDef<HearingRow>[]>([
    { field: 'charterId', headerName: 'Code', width: 90 },
    { field: 'description', headerName: 'Economic Classification', width: 250 },
    { field: 'agencyRequest', headerName: 'Requested (USD)', width: 140, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { 
      field: 'recommendedAmount', 
      headerName: 'Reviewer Recommendation', 
      width: 180, 
      editable: true,
      valueFormatter: currencyFormatter, 
      type: 'numericColumn',
      cellClass: 'bg-brand-gold/5 font-bold cursor-text border border-brand-gold/20',
    },
    { 
      field: 'variance', 
      headerName: 'Variance', 
      width: 140, 
      valueFormatter: varianceFormatter, 
      type: 'numericColumn',
      cellClassRules: varianceCellClassRules
    },
    { field: 'notes', headerName: 'Hearing Notes / Justification', width: 300, editable: true, cellClass: 'cursor-text italic text-muted' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const handleCellValueChanged = (event: any) => {
    if (event.column.colId === 'recommendedAmount') {
      let req = 0;
      let rec = 0;
      
      const newRowData: HearingRow[] = [];
      event.api.forEachNode((node: any) => {
        const row = node.data;
        // Recalculate variance for the edited row
        row.variance = Number(row.recommendedAmount) - Number(row.agencyRequest);
        newRowData.push(row);
        
        req += Number(row.agencyRequest);
        rec += Number(row.recommendedAmount);
      });
      
      // We must update the grid data to show the new variance immediately
      setRowData(newRowData);
      setTotals({ requested: req, recommended: rec, variance: rec - req });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12 h-screen max-h-[90vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 5 / Review & Hearings</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Budget Hearings Hub
          </h1>
          <p className="text-sm text-muted">
            Comparative analysis and reconciliation of agency submissions against core macro ceilings.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Pane: Agency Queue */}
        <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
          <div className="glass-panel p-4 flex flex-col h-full border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-gold" /> Submission Queue
              </h3>
              <Filter className="w-4 h-4 text-muted cursor-pointer hover:text-foreground transition-colors" />
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Search agencies..." 
                className="w-full bg-foreground/5 border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
              />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-1">
              {MOCK_INSTITUTIONS.filter(i => i.categoryId === 'ministries').map((inst) => (
                <div 
                  key={inst.id}
                  onClick={() => loadInstitutionData(inst.id)}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all",
                    selectedInst === inst.id 
                      ? "bg-brand-gold/10 border-brand-gold/30" 
                      : "bg-foreground/[0.02] border-border hover:bg-foreground/5"
                  )}
                >
                  <p className={cn("text-xs font-medium mb-1 line-clamp-1", selectedInst === inst.id ? "text-brand-gold" : "text-foreground")}>
                    {inst.name}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-muted inline-block bg-foreground/10 px-1.5 py-0.5 rounded">
                      Submitted
                    </span>
                    <span className="text-[10px] text-muted">Oct 24</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Review Grid */}
        <div className="flex-1 flex flex-col bg-background/50 rounded-xl border border-border overflow-hidden relative">
          {!selectedInst ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm z-10">
              <Scale className="w-16 h-16 text-muted mb-4 opacity-20" />
              <h3 className="text-xl font-serif text-foreground mb-2">Select an Agency Submission</h3>
              <p className="text-sm text-muted max-w-sm">
                Choose an institution from the submission queue to begin the comparative line-item review and hearings process.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedInst}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Inst Header */}
                <div className="p-6 border-b border-border bg-foreground/[0.02] shrink-0">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-lg font-medium text-foreground">
                        {MOCK_INSTITUTIONS.find(i => i.id === selectedInst)?.name || 'Agency'}
                      </h2>
                      <p className="text-xs text-muted mt-1">FY 2026/27 Draft Budget Submission</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-3 py-1.5 border border-border hover:bg-foreground/5 text-foreground rounded text-xs font-medium transition-colors flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" /> Add Global Comment
                      </button>
                      <button className="px-3 py-1.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded text-xs font-bold transition-colors flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Approve Recommendations
                      </button>
                    </div>
                  </div>

                  {/* Variance Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-foreground/5 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Agency Requested</p>
                      <p className="text-xl font-mono text-foreground font-semibold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totals.requested)}
                      </p>
                    </div>
                    <div className="p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
                      <p className="text-xs text-brand-gold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Scale className="w-3 h-3" /> DB Recommended
                      </p>
                      <p className="text-xl font-mono text-brand-gold font-semibold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totals.recommended)}
                      </p>
                    </div>
                    <div className="p-4 bg-foreground/5 border border-border rounded-xl">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Net Variance</p>
                      <p className={cn(
                        "text-xl font-mono font-semibold",
                        totals.variance < 0 ? "text-red-500" : totals.variance > 0 ? "text-green-500" : "text-foreground"
                      )}>
                        {totals.variance === 0 ? '$0' : 
                          totals.variance < 0 
                            ? `-${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(totals.variance))}`
                            : `+${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(totals.variance))}`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grid */}
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
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
