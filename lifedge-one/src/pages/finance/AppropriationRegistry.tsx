import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Shield, FileText, ArrowRightLeft, Printer, RefreshCw, AlertTriangle, CheckCircle, Save, Download, Stamp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_INSTITUTIONS } from '../../config/institutions.config';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

type AppropTab = 'master' | 'virement' | 'warrants';

interface AppropriationBase {
  id: string;
  agencyId: string;
  agencyName: string;
  fundSource: string;
  economicCode: string;
  description: string;
  originalAmount: number;
  virements: number;
  adjustedAmount: number;
  status: 'Active' | 'Locked';
}

const mockAppropriations: AppropriationBase[] = [
  { id: 'A001', agencyId: 'MoF', agencyName: 'Ministry of Finance & Dev. Planning', fundSource: 'GOL', economicCode: '211101', description: 'Basic Salary - Civil Service', originalAmount: 4500000, virements: 0, adjustedAmount: 4500000, status: 'Active' },
  { id: 'A002', agencyId: 'MoF', agencyName: 'Ministry of Finance & Dev. Planning', fundSource: 'GOL', economicCode: '221101', description: 'Domestic Travel', originalAmount: 250000, virements: -50000, adjustedAmount: 200000, status: 'Active' },
  { id: 'A003', agencyId: 'MoF', agencyName: 'Ministry of Finance & Dev. Planning', fundSource: 'GOL', economicCode: '221401', description: 'Fuel & Lubricants - Vehicles', originalAmount: 800000, virements: 50000, adjustedAmount: 850000, status: 'Active' },
  { id: 'A004', agencyId: 'MoH', agencyName: 'Ministry of Health', fundSource: 'Donor', economicCode: '311101', description: 'Capital Equipment - Vehicles', originalAmount: 1200000, virements: 0, adjustedAmount: 1200000, status: 'Active' },
  { id: 'A005', agencyId: 'MoH', agencyName: 'Ministry of Health', fundSource: 'GOL', economicCode: '221102', description: 'Drugs and Medical Supplies', originalAmount: 5600000, virements: 300000, adjustedAmount: 5900000, status: 'Active' },
  { id: 'A006', agencyId: 'MoE', agencyName: 'Ministry of Education', fundSource: 'GOL', economicCode: '221502', description: 'Printing & Binding (Textbooks)', originalAmount: 850000, virements: -200000, adjustedAmount: 650000, status: 'Active' },
  { id: 'A007', agencyId: 'MoE', agencyName: 'Ministry of Education', fundSource: 'GOL', economicCode: '311104', description: 'ICT Infrastructure (E-Learning)', originalAmount: 450000, virements: 200000, adjustedAmount: 650000, status: 'Active' },
];

export default function AppropriationRegistry() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [activeTab, setActiveTab] = useState<AppropTab>('master');
  const [rowData, setRowData] = useState<AppropriationBase[]>(mockAppropriations);
  
  // Virement State
  const [sourceAccount, setSourceAccount] = useState('');
  const [destAccount, setDestAccount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferReason, setTransferReason] = useState('');

  const currencyFormatter = (params: any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const virementFormatter = (params: any) => {
    const val = params.value;
    if (val === 0) return '$0';
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(val));
    return val < 0 ? `-${formatted}` : `+${formatted}`;
  };

  const [colDefs] = useState<ColDef<AppropriationBase>[]>([
    { field: 'agencyName', headerName: 'Institution', width: 250, pinned: 'left', filter: true, rowGroup: true, hide: true },
    { field: 'economicCode', headerName: 'Econ Code', width: 120, pinned: 'left', filter: true },
    { field: 'description', headerName: 'Classification Description', width: 300 },
    { field: 'fundSource', headerName: 'Fund', width: 100 },
    { field: 'originalAmount', headerName: 'Legis. Approved', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { 
      field: 'virements', 
      headerName: 'Net Transfers', 
      width: 150, 
      valueFormatter: virementFormatter, 
      type: 'numericColumn',
      cellClassRules: {
        'text-red-500': (p) => p.value < 0,
        'text-brand-green': (p) => p.value > 0
      }
    },
    { 
      field: 'adjustedAmount', 
      headerName: 'Current Legal Limit', 
      width: 180, 
      valueFormatter: currencyFormatter, 
      type: 'numericColumn',
      cellClass: 'bg-brand-gold/5 font-bold border-l border-brand-gold/20 text-brand-gold'
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: 'Agency / Sub-Sector',
      minWidth: 350,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const totalBudget = rowData.reduce((acc, r) => acc + r.adjustedAmount, 0);

  // Virement execution logic
  const handleVirement = () => {
    if (!sourceAccount || !destAccount || !transferAmount) return alert('Please complete all transfer details.');
    if (sourceAccount === destAccount) return alert('Source and Destination cannot be the same account.');
    
    const amt = Number(transferAmount);
    if (amt <= 0) return alert('Transfer amount must be strictly greater than zero.');

    const source = rowData.find(r => r.id === sourceAccount);
    const dest = rowData.find(r => r.id === destAccount);

    if (!source || !dest) return alert('Invalid accounts selected.');
    if (source.adjustedAmount < amt) return alert(`Insufficient funds in Source Account. Available balance: $${source.adjustedAmount.toLocaleString()}`);

    const newData = rowData.map(row => {
      if (row.id === source.id) {
        return { ...row, virements: row.virements - amt, adjustedAmount: row.adjustedAmount - amt };
      }
      if (row.id === dest.id) {
        return { ...row, virements: row.virements + amt, adjustedAmount: row.adjustedAmount + amt };
      }
      return row;
    });

    setRowData(newData);
    alert('✅ Virement executed and recorded securely onto the General Ledger.');
    setSourceAccount('');
    setDestAccount('');
    setTransferAmount('');
    setTransferReason('');
  };

  const tabs = [
    { id: 'master', label: 'Master Budget Log', icon: FileText },
    { id: 'virement', label: 'Inter-Sector Virement Engine', icon: ArrowRightLeft },
    { id: 'warrants', label: 'Print Warrants', icon: Printer },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1600px] mx-auto h-[90vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-medium text-brand-gold uppercase tracking-wider">Module 6 / Execution Control</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Appropriation Registry
          </h1>
          <p className="text-sm text-muted">
            Immutable tracking of legislatively enacted budgets and formalized inter-agency transfers.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto custom-scrollbar gap-2 shrink-0 border-b border-border pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AppropTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.1)]" 
                : "bg-transparent text-muted hover:bg-foreground/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col min-h-0"
        >
          {activeTab === 'master' && (
            <div className="flex-col flex flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
                <div className="glass-panel p-5 border-l-4 border-l-brand-gold">
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Enacted Ledger</p>
                  <p className="text-2xl font-serif font-semibold text-foreground">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalBudget)}
                  </p>
                </div>
                <div className="glass-panel p-5">
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Virements Logged</p>
                  <p className="text-2xl font-mono text-foreground font-medium">14 Transfers</p>
                </div>
                <div className="glass-panel p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-brand-green uppercase tracking-wider mb-1">Registry Lock Status</p>
                    <p className="text-2xl font-medium text-brand-green flex items-center gap-2"><CheckCircle className="w-5 h-5"/> Locked & Active</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel overflow-hidden border border-border flex flex-col flex-1">
                <div className="bg-foreground/[0.02] border-b border-border p-3 flex justify-between items-center shrink-0">
                  <h2 className="text-sm font-medium text-foreground">Legislative Chart of Accounts (FY26)</h2>
                  <button className="text-xs flex items-center gap-1 text-muted hover:text-foreground transition-colors bg-foreground/5 px-2 py-1 rounded">
                    <Download className="w-3 h-3" /> Export Excel
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
                    '--ag-header-foreground-color': isDark ? '#a1a1aa' : '#71717a',
                  } as React.CSSProperties}
                >
                  <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    groupDefaultExpanded={-1}
                    animateRows={true}
                    suppressCellFocus={false}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'virement' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              {/* Form Pane */}
              <div className="glass-panel p-8 space-y-8 overflow-y-auto custom-scrollbar">
                <div>
                  <h2 className="text-xl font-medium text-foreground flex items-center gap-2 mb-2">
                    <ArrowRightLeft className="w-5 h-5 text-brand-gold" /> Execute Formal Transfer
                  </h2>
                  <p className="text-sm text-muted">
                    Move funds inter-sectorally or intra-sectorally. This action permanently alters the 'Current Legal Limit' for both target accounts. All operations are logged.
                  </p>
                </div>

                <div className="grid gap-6">
                  {/* Source */}
                  <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-xl space-y-4">
                     <h3 className="text-sm font-medium text-red-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Source (Deduct From)
                      </h3>
                      <div>
                        <select 
                          value={sourceAccount}
                          onChange={(e) => setSourceAccount(e.target.value)}
                          className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none"
                        >
                          <option value="">-- Select Source Account --</option>
                          {rowData.map(r => (
                            <option key={r.id} value={r.id}>{r.agencyName} - {r.economicCode} ({r.description}) &bull; Avail: ${r.adjustedAmount.toLocaleString()}</option>
                          ))}
                        </select>
                      </div>
                  </div>

                  <div className="flex justify-center -my-2 z-10 relative">
                    <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRightLeft className="w-4 h-4 text-muted rotate-90" />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="p-5 border border-brand-green/20 bg-brand-green/5 rounded-xl space-y-4">
                     <h3 className="text-sm font-medium text-brand-green flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-green"></span> Destination (Add To)
                      </h3>
                      <div>
                        <select 
                          value={destAccount}
                          onChange={(e) => setDestAccount(e.target.value)}
                          className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none"
                        >
                          <option value="">-- Select Destination Account --</option>
                          {rowData.map(r => (
                            <option key={r.id} value={r.id}>{r.agencyName} - {r.economicCode} ({r.description})</option>
                          ))}
                        </select>
                      </div>
                  </div>

                  {/* Transfer Specifics */}
                  <div className="p-5 border border-border rounded-xl space-y-6 bg-foreground/[0.02]">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted uppercase tracking-wider">Exact Transfer Amount (USD)</label>
                      <input 
                        type="number" 
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-4 text-xl font-medium text-foreground focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted uppercase tracking-wider">Legislative Justification & Memo</label>
                      <textarea 
                        rows={3}
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                        placeholder="Resolution code and rationale..."
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleVirement}
                    className="w-full py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 hover:translate-y-[-2px]"
                  >
                    <RefreshCw className="w-5 h-5" /> Execute & Lock Virement
                  </button>
                </div>
              </div>

              {/* Info Pane */}
              <div className="hidden lg:flex flex-col gap-6">
                 <div className="glass-panel p-8 text-center flex flex-col items-center justify-center h-[350px]">
                    <AlertTriangle className="w-16 h-16 text-brand-gold bg-brand-gold/10 p-4 rounded-full mb-6" />
                    <h3 className="text-xl font-serif text-foreground mb-3">Virement Policy Enforcement</h3>
                    <p className="text-sm text-muted max-w-sm leading-relaxed">
                      All transfers requested through this module immediately reflect across the entire Master Budget Ledger. The system maintains a strictly balanced double-entry equation where Deductions === Additions (Zero-Sum Principle).
                    </p>
                 </div>
                 <div className="glass-panel p-6 flex-1">
                    <h3 className="text-sm font-medium text-foreground mb-4">Recent Virement Audit Log</h3>
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-border/50">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium bg-foreground/10 px-2 py-0.5 rounded text-foreground">VIR-00492</span>
                          <span className="text-[10px] text-muted">2 hours ago</span>
                        </div>
                        <p className="text-sm text-muted break-words leading-tight">
                          <span className="text-red-400 font-medium">-$50,000</span> (MoF - Travel) <ArrowRightLeft className="w-3 h-3 inline mx-1" /> <span className="text-green-400 font-medium">+$50,000</span> (MoF - Fuel)
                        </p>
                      </div>
                       <div className="pb-4 border-b border-border/50">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium bg-foreground/10 px-2 py-0.5 rounded text-foreground">VIR-00491</span>
                          <span className="text-[10px] text-muted">Yesterday</span>
                        </div>
                        <p className="text-sm text-muted break-words leading-tight">
                          <span className="text-red-400 font-medium">-$200,000</span> (MoE - Printing) <ArrowRightLeft className="w-3 h-3 inline mx-1" /> <span className="text-green-400 font-medium">+$200,000</span> (MoE - ICT)
                        </p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'warrants' && (
            <div className="glass-panel p-16 flex flex-col items-center justify-center text-center h-full">
              <Stamp className="w-20 h-20 text-muted opacity-20 mb-6" />
              <h2 className="text-2xl font-serif text-foreground mb-2">General Warrant Generation</h2>
              <p className="text-sm text-muted max-w-md mx-auto mb-8">
                Generate the officially sanctioned Appropriation Warrant required to initialize the fiscal year for any given Ministry, Agency, or Commission.
              </p>
              
              <div className="flex w-full max-w-md gap-2">
                <select className="flex-1 bg-foreground/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none">
                  <option>Select Agency File...</option>
                  {MOCK_INSTITUTIONS.map(i => <option key={i.id}>{i.name}</option>)}
                </select>
                <button className="px-6 py-3 bg-brand-gold text-brand-dark rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-gold-dark transition-colors">
                  <Printer className="w-4 h-4" /> Print PDF
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
