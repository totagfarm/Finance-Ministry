import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Save, Send, AlertTriangle, FileText, CheckCircle, Package, Link as LinkIcon, Download } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { MOCK_INSTITUTIONS } from '../../../config/institutions.config';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface POLineItem {
  id: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  economicCode: string;
}

const mockAllotmentBalance = 125000; // $125,000 available allotment

export default function PurchaseOrderGeneration() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [vendor, setVendor] = useState('Liberia Tech Solutions Inc.');
  const [economicCode, setEconomicCode] = useState('221401 - IT Equipment');
  
  const [rowData, setRowData] = useState<POLineItem[]>([
    { id: '1', itemDescription: 'Dell Latitude 5540 Laptops', quantity: 20, unitPrice: 1200, totalPrice: 24000, economicCode: '221401' },
    { id: '2', itemDescription: 'Cisco Core Switches', quantity: 2, unitPrice: 5500, totalPrice: 11000, economicCode: '221401' },
    { id: '3', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, economicCode: '221401' }
  ]);

  const [poTotal, setPoTotal] = useState(35000);

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const [colDefs] = useState<ColDef<POLineItem>[]>([
    { field: 'itemDescription', headerName: 'Item Description', width: 350, editable: true, cellClass: 'cursor-text' },
    { field: 'quantity', headerName: 'Qty', width: 100, editable: true, type: 'numericColumn', cellClass: 'bg-brand-gold/5 cursor-text' },
    { field: 'unitPrice', headerName: 'Unit Price', width: 150, editable: true, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'bg-brand-gold/5 cursor-text' },
    { field: 'totalPrice', headerName: 'Total Line Price', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'font-bold bg-foreground/[0.02]' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const handleCellValueChanged = (event: any) => {
    const data = event.data;
    if (event.column.colId === 'quantity' || event.column.colId === 'unitPrice') {
      const newTotal = Number(data.quantity) * Number(data.unitPrice);
      data.totalPrice = newTotal;
      event.api.applyTransaction({ update: [data] });
    }

    // Recalculate full PO total
    let total = 0;
    event.api.forEachNode((node: any) => {
      total += Number(node.data.totalPrice) || 0;
    });
    setPoTotal(total);
  };

  const addEmptyRow = () => {
    setRowData([...rowData, { id: Date.now().toString(), itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, economicCode: '221401' }]);
  };

  const remainingBalance = mockAllotmentBalance - poTotal;
  const isBlocked = remainingBalance < 0;

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 8 / Execution</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Commitment (PO) Generation
          </h1>
          <p className="text-sm text-muted">
            Raise a legally binding Purchase Order securely tied to an active Allotment.
          </p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-foreground/5 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> Download Draft
          </button>
          <button 
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
              isBlocked 
                ? "bg-foreground/10 text-muted cursor-not-allowed" 
                : "bg-brand-gold text-brand-dark hover:bg-brand-gold-dark hover:translate-y-[-2px]"
            )}
            disabled={isBlocked}
          >
            <Send className="w-4 h-4" /> Issue Commitment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Controls - Left */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass-panel p-6">
              <h3 className="text-lg font-medium text-foreground font-serif mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-gold" /> Contract Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Procuring Entity (MAC)</label>
                  <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none">
                    <option>Ministry of Finance</option>
                    <option>Ministry of Health</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Budget Classification</label>
                  <select 
                    value={economicCode}
                    onChange={(e) => setEconomicCode(e.target.value)}
                    className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                  >
                    <option>221401 - IT Equipment</option>
                    <option>221101 - Drugs & Supplies</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted">Registered Vendor</label>
                  <input 
                    type="text" 
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                  />
                  <p className="text-[10px] text-brand-green flex items-center gap-1 mt-1"><CheckCircle className="w-3 h-3"/> Tax Clearance Verified Valid to Dec 2026</p>
                </div>
              </div>
           </div>

           {/* Grid */}
           <div className="glass-panel overflow-hidden border border-border flex flex-col h-[400px]">
              <div className="bg-foreground/[0.02] border-b border-border p-4 flex justify-between items-center">
                <h2 className="text-sm font-medium text-foreground flex items-center gap-2"><Package className="w-4 h-4"/> Line Item Details</h2>
                <button onClick={addEmptyRow} className="text-xs bg-foreground/10 hover:bg-foreground/20 text-foreground px-3 py-1.5 rounded transition-colors font-medium">
                  + Add Item
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
                  onCellValueChanged={handleCellValueChanged}
                  suppressCellFocus={false}
                />
              </div>
           </div>
        </div>

        {/* Real-time Allotment Tracker - Right */}
        <div className="space-y-6">
           <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                 Financial Control Guardrail
              </h3>
              
              <div className="space-y-5">
                <div className="pb-4 border-b border-border/50">
                  <p className="text-xs text-muted mb-1">Available Allotment (Cash Plan)</p>
                  <p className="text-2xl font-mono text-foreground font-semibold">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(mockAllotmentBalance)}
                  </p>
                </div>
                
                <div className="pb-4 border-b border-border/50">
                  <p className="text-xs text-muted mb-1">Total PO Amount (This Contract)</p>
                  <p className="text-xl font-mono text-brand-gold font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(poTotal)}
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl border border-border/50 transition-colors", isBlocked ? "bg-red-500/10 border-red-500/30" : "bg-brand-green/10 border-brand-green/30")}>
                  <p className="text-xs text-muted mb-1">Remaining Balance</p>
                  <p className={cn("text-2xl font-mono font-bold", isBlocked ? "text-red-500" : "text-brand-green")}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(remainingBalance)}
                  </p>
                </div>

                {isBlocked && (
                  <div className="flex items-start gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-xs text-red-500 leading-tight">
                      <strong>Insufficient Funds.</strong> The total commitment amount exceeds the active allotment limit. Adjust line-item quantities or initiate an Allotment Transfer request before proceeding.
                    </p>
                  </div>
                )}
                
                {!isBlocked && (
                  <div className="flex items-start gap-2 bg-brand-green/10 p-3 rounded-lg border border-brand-green/20">
                    <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                    <p className="text-xs text-brand-green leading-tight">
                      <strong>Cleared for Execution.</strong> Sufficient unencumbered funds are available to raise this PO without triggering a deficit.
                    </p>
                  </div>
                )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
