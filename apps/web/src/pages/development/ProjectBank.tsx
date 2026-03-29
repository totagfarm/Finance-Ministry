import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { Construction, Map, TrendingUp, ArrowRight, Building2, MapPin, DollarSign, Loader2, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import LiberiaInteractiveMap from '../../components/LiberiaInteractiveMap';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface ProjectRecord {
  id: string;
  name: string;
  agency: string;
  region: string;
  budget: number;
  spent: number;
  physicalCompletion: number;
  status: string;
}

const mockPSIPData = [
  { name: 'Roads & Bridges', budget: 150, spent: 45 },
  { name: 'Power Grid', budget: 85, spent: 60 },
  { name: 'Hospitals', budget: 45, spent: 10 },
  { name: 'Schools', budget: 35, spent: 15 },
  { name: 'WASH', budget: 25, spent: 5 },
];

export default function ProjectBank() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [rowData, setRowData] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Live PSIP Data from NestJS Warehouse API
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setRowData(data);
        } else {
          // Fallback to mock data for demo consistency
          setRowData([
            { id: 'PSIP-001', name: 'Coastal Highway Expansion', agency: 'Public Works', region: 'Montserrado', budget: 45000000, spent: 12000000, physicalCompletion: 15, status: 'Active' },
            { id: 'PSIP-002', name: 'JFK Hospital Renovation', agency: 'Ministry of Health', region: 'Montserrado', budget: 12500000, spent: 11000000, physicalCompletion: 85, status: 'Active' },
            { id: 'PSIP-003', name: 'Rural Electrification Phase II', agency: 'Energy Board', region: 'Bong County', budget: 28000000, spent: 4000000, physicalCompletion: 5, status: 'Delayed' },
            { id: 'PSIP-004', name: 'Monrovia Water Treatment', agency: 'Water & Sewer', region: 'Montserrado', budget: 18000000, spent: 18000000, physicalCompletion: 100, status: 'Completed' },
            { id: 'PSIP-005', name: 'National University Science Block', agency: 'Education', region: 'Margibi', budget: 8500000, spent: 2000000, physicalCompletion: 25, status: 'Active' },
          ]);
        }
      } catch (err) {
        console.error("Project Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const progressRenderer = (params: any) => {
    const p = params.value;
    return (
      <div className="flex items-center gap-2 w-full h-full">
         <span className="text-xs font-bold w-10">{p}%</span>
         <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div className={cn("h-full", p === 100 ? "bg-brand-green" : p < 20 ? "bg-orange-500" : "bg-blue-500")} style={{ width: `${p}%` }}></div>
         </div>
      </div>
    );
  };

  const [colDefs] = useState<ColDef<ProjectRecord>[]>([
    { field: 'id', headerName: 'PSIP ID', width: 120, pinned: 'left', cellClass: 'font-mono text-xs' },
    { field: 'name', headerName: 'Project Title', width: 250 },
    { field: 'agency', headerName: 'Executing Agency', width: 160 },
    { field: 'totalFunding', headerName: 'Capital Inflow', width: 150, cellRenderer: (params: any) => (
      <Link to="/app/development/aid" className="text-brand-gold hover:underline flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-widest">
         <Globe className="w-3 h-3" /> {currencyFormatter(params)}
      </Link>
    )},
    { field: 'spent', headerName: 'Amount Disbursed', width: 160, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'text-brand-gold font-medium' },
    { field: 'fundingSource', headerName: 'Source of Funds', width: 160, cellRenderer: (params: any) => (
      <Link to="/app/development/aid" className="text-brand-gold hover:underline flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-widest">
         <Globe className="w-3 h-3" /> {params.value || 'GOL (On-Budget)'}
      </Link>
    )},
    { field: 'physicalCompletion', headerName: 'Physical Completion', width: 220, cellRenderer: progressRenderer },
    { field: 'status', headerName: 'Status', width: 130 }
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
            <Construction className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Module 15 / Infrastructure</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Project Bank (PSIP)</h1>
          <p className="text-sm text-muted mt-1">Capital investment tracking, geographic distribution, and physical completion rates</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active PSIP Portfolio', value: '$340.0M', target: 'Lifespan Value', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Total Projects', value: '47', target: 'Across 15 Counties', icon: Map, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Stalled / Delayed', value: '4', target: 'Requires Intervention', icon: Construction, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'YTD Disbursed', value: '$56.4M', target: 'Financial Progress', icon: TrendingUp, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 glass-panel p-6 flex flex-col bg-[#050505]/50 border-brand-gold/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" /> Geographic Distribution
            </h3>
          </div>
          <div className="h-[300px] relative border border-border bg-foreground/5 rounded-2xl overflow-hidden p-6 ring-1 ring-white/10 group">
              <LiberiaInteractiveMap 
                data={{ "Montserrado": 150, "Bong County": 45, "Margibi": 30, "Lofa": 85 }} 
                dataLabel="PSIP Investment"
                colorScale={(val) => val > 100 ? "rgba(212,175,55,0.6)" : val > 50 ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.2)"}
              />
              <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-[#D4AF37]/10 backdrop-blur-md border border-brand-gold/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-brand-gold shadow-lg">
                  PSIP Heatmap
                </div>
              </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/10">
            <p className="text-[10px] text-muted font-serif leading-relaxed italic">
              "72% of current infrastructure spend is concentrated in the Montserrado-Nimba-Lofa corridor, aligning with the National Development Plan."
            </p>
          </div>
        </motion.div>

        {/* Master Registry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel flex flex-col min-h-[400px]"
        >
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-medium text-foreground font-serif">Major Projects Pipeline</h3>
            <Link 
              to="/app/development/projects/new"
              className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-xs font-bold hover:bg-brand-gold-dark transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
            >
               Induct New Project <ArrowRight className="w-3 h-3"/>
            </Link>
          </div>
            <div 
              className={cn(
                "flex-1 w-full relative",
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
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                  <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                </div>
              )}
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
    </div>
  );
}
