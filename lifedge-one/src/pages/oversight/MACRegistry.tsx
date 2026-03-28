import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { Shield, Building2, TrendingUp, AlertTriangle, Download, Search, Activity, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface MACRecord {
  id: string;
  name: string;
  category: string;
  head: string;
  performanceScore: number;
  riskStatus: 'Optimal' | 'Caution' | 'High Risk';
  lastEvaluation: string;
}

export default function MACRegistry() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData] = useState<MACRecord[]>([
    { id: 'MAC-MOF-01', name: 'Ministry of Finance & Development Planning', category: 'Cabinet Ministry', head: 'Hon. Boima S. Kamara', performanceScore: 92, riskStatus: 'Optimal', lastEvaluation: '2026-10-15' },
    { id: 'MAC-MPW-02', name: 'Ministry of Public Works', category: 'Cabinet Ministry', head: 'Hon. Roland Giddings', performanceScore: 78, riskStatus: 'Caution', lastEvaluation: '2026-09-30' },
    { id: 'MAC-LRA-05', name: 'Liberia Revenue Authority', category: 'Autonomous Agency', head: 'Hon. Dorbor Jallah', performanceScore: 95, riskStatus: 'Optimal', lastEvaluation: '2026-11-01' },
    { id: 'MAC-MOE-12', name: 'Ministry of Education', category: 'Cabinet Ministry', head: 'Dr. Jarso Maley Jallah', performanceScore: 64, riskStatus: 'High Risk', lastEvaluation: '2026-08-20' },
    { id: 'MAC-LACC-18', name: 'Liberia Anti-Corruption Commission', category: 'Commission', head: 'Cllr. Alexandra Zoe', performanceScore: 88, riskStatus: 'Optimal', lastEvaluation: '2026-10-05' },
  ]);

  const scoreCellRenderer = (params: any) => {
    const score = params.value;
    return (
      <div className="flex items-center gap-2 h-full">
        <div className="w-full bg-border/50 rounded-full h-2 max-w-[80px]">
          <div 
            className={cn("h-full rounded-full", score >= 85 ? "bg-brand-green" : score >= 70 ? "bg-orange-500" : "bg-red-500")}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={cn("font-bold text-xs", score >= 85 ? "text-brand-green" : score >= 70 ? "text-orange-500" : "text-red-500")}>
          {score}/100
        </span>
      </div>
    );
  };

  const riskCellRenderer = (params: any) => {
    const status = params.value;
    return (
       <div className="flex items-center h-full">
         <span className={cn(
            "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1",
            status === 'Optimal' ? "bg-brand-green/20 text-brand-green" :
            status === 'High Risk' ? "bg-red-500/20 text-red-500" :
            "bg-orange-500/20 text-orange-500"
          )}>
            {status}
          </span>
       </div>
    );
  }

  const [colDefs] = useState<ColDef<MACRecord>[]>([
    { field: 'id', headerName: 'MAC Code', width: 120, pinned: 'left', cellClass: 'font-mono text-xs text-blue-500' },
    { field: 'name', headerName: 'Institutional Entity', width: 280, cellClass: 'font-medium' },
    { field: 'category', headerName: 'Classification', width: 180 },
    { field: 'head', headerName: 'Institutional Head', width: 200 },
    { field: 'performanceScore', headerName: 'KPI Score', width: 180, cellRenderer: scoreCellRenderer },
    { field: 'riskStatus', headerName: 'Operational Risk', width: 150, cellRenderer: riskCellRenderer },
    { field: 'lastEvaluation', headerName: 'Last Scored', width: 130 },
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
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 18 / Governance & Performance</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">MAC Registry & Performance Tracking</h1>
          <p className="text-sm text-muted mt-1">Holistic oversight of Ministries, Agencies, and Commissions (MACs) covering KPI deliverables.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/app/oversight/evaluation/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500 flex items-center gap-2 transition-colors shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
          >
            <Activity className="w-4 h-4" /> Log Evaluation Score
          </Link>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Registered Entities', value: '104', target: 'Across 3 Branches', icon: Building2, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Avg MAC Score', value: '78.4', target: 'National Average', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'High Risk MACs', value: '8', target: 'Requires Intervention', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Evaluations Pending', value: '12', target: 'Q4 2026 Phase', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-500/10' },
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
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
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
          <h3 className="text-lg font-medium text-foreground font-serif">MAC Baseline Matrix</h3>
          <button className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1">
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
