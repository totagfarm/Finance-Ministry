import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Send, AlertTriangle, CheckCircle, Shield, Link as LinkIcon, Download, CreditCard, Building2, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface VoucherToPay {
  id: string;
  agencyName: string;
  vendorName: string;
  invoiceNumber: string;
  totalVoucherAmount: number;
  previouslyPaid: number;
  remainingAmount: number;
  amountToPayNow: number;
  selected: boolean;
}

const mockTSALiquidity = 2450000; // $2.45M Available in Treasury Single Account

export default function PaymentDispatchWorkspace() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const gridRef = useRef<AgGridReact>(null);
  
  const [paymentMethod, setPaymentMethod] = useState('EFT (Central Bank Swift)');

  const [rowData, setRowData] = useState<VoucherToPay[]>([
    { id: 'VCH-2026-0891', agencyName: 'Ministry of Health', vendorName: 'Global Meds Ltd', invoiceNumber: 'INV-GM-442', totalVoucherAmount: 450000, previouslyPaid: 0, remainingAmount: 450000, amountToPayNow: 450000, selected: true },
    { id: 'VCH-2026-0892', agencyName: 'Ministry of Public Works', vendorName: 'Alpha Construction', invoiceNumber: 'INV-AC-09', totalVoucherAmount: 1200000, previouslyPaid: 600000, remainingAmount: 600000, amountToPayNow: 300000, selected: true },
    { id: 'VCH-2026-0893', agencyName: 'Ministry of Education', vendorName: 'EduPrint Inc.', invoiceNumber: 'INV-EP-11B', totalVoucherAmount: 85000, previouslyPaid: 0, remainingAmount: 85000, amountToPayNow: 85000, selected: false },
    { id: 'VCH-2026-0894', agencyName: 'Ministry of Finance', vendorName: 'Liberia Tech Solutions', invoiceNumber: 'INV-LT-092', totalVoucherAmount: 35000, previouslyPaid: 0, remainingAmount: 35000, amountToPayNow: 35000, selected: false },
    { id: 'VCH-2026-0895', agencyName: 'Ministry of Agriculture', vendorName: 'AgroSeed Suppliers', invoiceNumber: 'INV-AS-77', totalVoucherAmount: 420000, previouslyPaid: 0, remainingAmount: 420000, amountToPayNow: 0, selected: false },
  ]);

  const [batchTotal, setBatchTotal] = useState(750000);

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const onSelectionChanged = () => {
    if (gridRef.current) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      let total = 0;
      selectedNodes.forEach(node => {
        total += Number(node.data.amountToPayNow) || 0;
      });
      setBatchTotal(total);
    }
  };

  const handleCellValueChanged = (event: any) => {
    const data = event.data;
    if (event.column.colId === 'amountToPayNow') {
      // Prevent paying more than remaining
      if (data.amountToPayNow > data.remainingAmount) {
        data.amountToPayNow = data.remainingAmount;
        event.api.applyTransaction({ update: [data] });
        alert(`Cannot pay more than the remaining balance of $${data.remainingAmount.toLocaleString()}`);
      }
      onSelectionChanged(); // Recalculate total immediately
    }
  };

  const [colDefs] = useState<ColDef<VoucherToPay>[]>([
    { 
      headerName: '', 
      field: 'selected', 
      headerCheckboxSelection: true, 
      checkboxSelection: true, 
      width: 50, 
      pinned: 'left' 
    },
    { field: 'id', headerName: 'Voucher Number', width: 140, pinned: 'left', cellClass: 'font-mono text-xs' },
    { field: 'agencyName', headerName: 'MAC', width: 220 },
    { field: 'vendorName', headerName: 'Payee (Vendor)', width: 200 },
    { field: 'totalVoucherAmount', headerName: 'Total Invoice', width: 140, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { field: 'remainingAmount', headerName: 'Rem. Balance', width: 130, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { 
      field: 'amountToPayNow', 
      headerName: 'Amount to Pay (Split)', 
      width: 170, 
      editable: true, 
      valueFormatter: currencyFormatter, 
      type: 'numericColumn', 
      cellClass: 'bg-brand-gold/10 cursor-text font-bold text-brand-gold border border-brand-gold/30',
      tooltipValueGetter: () => 'Double-click to edit (Split Payment Supported)'
    }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const onGridReady = (params: any) => {
    // Pre-select rows based on state
    params.api.forEachNode((node: any) => {
      if (node.data.selected) {
        node.setSelected(true);
      }
    });
  };

  const remainingTSA = mockTSALiquidity - batchTotal;
  const isBlocked = remainingTSA < 0 || batchTotal === 0;

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 9 / Treasury Operations</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Payment Dispatch
          </h1>
          <p className="text-sm text-muted">
            Select verified vouchers, configure split payments, and transmit bulk execution files to the Central Bank.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            className={cn(
              "px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.4)]",
              isBlocked 
                ? "bg-foreground/10 text-muted cursor-not-allowed shadow-none" 
                : "bg-brand-gold text-brand-dark hover:bg-brand-gold-dark hover:translate-y-[-2px]"
            )}
            disabled={isBlocked}
          >
            <Send className="w-4 h-4" /> Transmit to Central Bank (EFT)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Grid Area - Left */}
        <div className="lg:col-span-3 space-y-6 flex flex-col h-[700px]">
           <div className="glass-panel p-6 shrink-0 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground font-serif">Awaiting Payment Queue</h3>
                  <p className="text-sm text-muted">Double-click the 'Amount to Pay' column to initiate a split payment.</p>
                </div>
              </div>
           </div>

           {/* Grid */}
           <div className="glass-panel overflow-hidden border border-border flex flex-col flex-1">
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
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  rowSelection="multiple"
                  onSelectionChanged={onSelectionChanged}
                  onCellValueChanged={handleCellValueChanged}
                  onGridReady={onGridReady}
                  suppressRowClickSelection={true}
                  enableBrowserTooltips={true}
                />
              </div>
           </div>
        </div>

        {/* Real-time Liquidity Tracker - Right */}
        <div className="space-y-6">
           <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                 Liquidity Guardrail
              </h3>
              
              <div className="space-y-5">
                <div className="pb-4 border-b border-border/50">
                  <p className="text-xs text-muted mb-1 flex items-center gap-1"><Building2 className="w-3 h-3"/> TSA Liquid Balance</p>
                  <p className="text-2xl font-mono text-foreground font-semibold">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(mockTSALiquidity)}
                  </p>
                </div>
                
                <div className="pb-4 border-b border-border/50">
                  <p className="text-xs text-muted mb-1 flex items-center gap-1"><Layers className="w-3 h-3"/> Selected Batch Total</p>
                  <p className="text-xl font-mono text-brand-gold font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(batchTotal)}
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl border border-border/50 transition-colors", remainingTSA < 0 ? "bg-red-500/10 border-red-500/30" : "bg-brand-green/10 border-brand-green/30")}>
                  <p className="text-xs text-muted mb-1">Projected End of Day TSA</p>
                  <p className={cn("text-2xl font-mono font-bold", remainingTSA < 0 ? "text-red-500" : "text-brand-green")}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(remainingTSA)}
                  </p>
                </div>

                {remainingTSA < 0 && (
                  <div className="flex items-start gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-500 leading-tight">
                      <strong>Liquidity Deficit.</strong> The selected Payment Batch exceeds the cash currently available in the Treasury Single Account. Deselect vouchers or utilize split payments to reduce the batch volume.
                    </p>
                  </div>
                )}
                
                {remainingTSA >= 0 && batchTotal > 0 && (
                  <div className="flex items-start gap-2 bg-brand-green/10 p-3 rounded-lg border border-brand-green/20">
                    <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-green leading-tight">
                      <strong>Clearing Secure.</strong> Sufficient liquidity is available to execute this batch without causing a TSA overdraft.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                 <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">Disbursement Method</h4>
                 <div className="space-y-2">
                    <label className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors", paymentMethod === 'EFT (Central Bank Swift)' ? "bg-brand-gold/10 border-brand-gold/50 text-brand-gold" : "border-border hover:bg-foreground/5")}>
                       <input type="radio" name="payment" checked={paymentMethod === 'EFT (Central Bank Swift)'} onChange={() => setPaymentMethod('EFT (Central Bank Swift)')} className="accent-brand-gold" />
                       <span className="text-sm font-medium">EFT (Central Bank Swift)</span>
                    </label>
                    <label className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors", paymentMethod === 'Physical Check' ? "bg-brand-gold/10 border-brand-gold/50 text-brand-gold" : "border-border hover:bg-foreground/5")}>
                       <input type="radio" name="payment" checked={paymentMethod === 'Physical Check'} onChange={() => setPaymentMethod('Physical Check')} className="accent-brand-gold" />
                       <span className="text-sm font-medium">Physical Check Print</span>
                    </label>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
