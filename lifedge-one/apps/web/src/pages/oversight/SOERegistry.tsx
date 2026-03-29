import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { Factory, TrendingDown, TrendingUp, AlertTriangle, Download, DollarSign, Activity, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface SOERecord {
  id: string;
  name: string;
  sector: string;
  ceo: string;
  subsidy: number;
  fiscalRisk: 'Healthy' | 'Moderate' | 'Critical Bailout';
  lastEvaluation: string;
}

export default function SOERegistry() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<SOERecord[]>([
    { id: 'SOE-LEC-01', name: 'Liberia Electricity Corporation', sector: 'Energy & Utility', ceo: 'Monie R. Captan', subsidy: 15500000, fiscalRisk: 'Moderate', lastEvaluation: '2026-10-15' },
    { id: 'SOE-LWSC-02', name: 'Liberia Water & Sewer Corp.', sector: 'Utility & Sanitation', ceo: 'Mo Ali', subsidy: 8200000, fiscalRisk: 'Critical Bailout', lastEvaluation: '2026-09-30' },
    { id: 'SOE-NPA-03', name: 'National Port Authority', sector: 'Transport & Infrastructure', ceo: 'Sekou Dukuly', subsidy: 0, fiscalRisk: 'Healthy', lastEvaluation: '2026-11-01' },
    { id: 'SOE-LPRC-04', name: 'Liberia Petroleum Refining Co.', sector: 'Energy & Petroleum', ceo: 'Amos Tweh', subsidy: 0, fiscalRisk: 'Healthy', lastEvaluation: '2026-10-20' },
    { id: 'SOE-RIA-05', name: 'Roberts International Airport', sector: 'Transport & Infrastructure', ceo: 'MassAquoi Kamara', subsidy: 4500000, fiscalRisk: 'Moderate', lastEvaluation: '2026-08-10' },
  ]);

  const currencyCellRenderer = (params: any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value);
  };

  const riskCellRenderer = (params: any) => {
    const status = params.value;
    return (
       <div className="flex items-center h-full">
         <span className={cn(
            "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1",
            status === 'Healthy' ? "bg-brand-green/20 text-brand-green" :
            status === 'Critical Bailout' ? "bg-red-500/20 text-red-500 animate-pulse" :
            "bg-orange-500/20 text-orange-500"
          )}>
            {status}
          </span>
       </div>
    );
  }

  const [colDefs] = useState<ColDef<SOERecord>[]>([
    { field: 'id', headerName: 'SOE Code', width: 120, pinned: 'left', cellClass: 'font-mono text-xs text-purple-500' },
    { field: 'name', headerName: 'Corporate Entity', width: 260, cellClass: 'font-medium' },
    { field: 'sector', headerName: 'Industrial Sector', width: 190 },
    { field: 'ceo', headerName: 'Managing Director / CEO', width: 220 },
    { field: 'subsidy', headerName: 'GoL Subsidy Liability', width: 180, cellRenderer: currencyCellRenderer, cellClass: 'font-mono font-bold text-red-400 text-right' },
    { field: 'fiscalRisk', headerName: 'Fiscal Exposure', width: 160, cellRenderer: riskCellRenderer },
    { field: 'lastEvaluation', headerName: 'Last Audit', width: 120 },
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
            <Factory className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-purple-500 uppercase tracking-wider">Module 18 / Governance & Performance</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">SOE Fiscal Exposure Registry</h1>
          <p className="text-sm text-muted mt-1">Holistic oversight of State-Owned Enterprises focusing on consolidated liabilities and bailout risks.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/oversight/evaluation/new"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-500 flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
          >
            <Activity className="w-4 h-4" /> Log Evaluation Score
          </Link>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active SOEs', value: '18', target: 'Across 6 Sectors', icon: Factory, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Net Subsidy Outflow', value: '$28.2M', target: 'FY 2026 YTD', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Dividend Returns', value: '$12.5M', target: 'LPRC, NPA primary', icon: TrendingUp, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Critical Bailout Risk', value: '3', target: 'LWSC, NTA, LBS', icon: AlertTriangle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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
              <p className="text-xs text-muted mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-500"></div>
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
          <h3 className="text-lg font-medium text-foreground font-serif">SOE Baseline Matrix</h3>
          <button className="text-xs font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1">
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
            '--ag-header-foreground-color': isDark ? '#a855f7' : '#9333ea',
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
