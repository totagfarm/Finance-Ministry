import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, ClientSideRowModelModule, ValidationModule } from 'ag-grid-community';
import { Save, AlertTriangle, FileText, CheckCircle, Calculator, Link as LinkIcon, Building2, Globe } from 'lucide-react';
import { cn } from '../../../lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule]);

interface AmortizationRow {
  period: number;
  periodLabel: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const CURRENT_DEBT_STOCK = 1650000000; // $1.65B
const STATUTORY_DEBT_CEILING = 2000000000; // $2.0B mock limit

export default function LoanRegistrationWorkspace() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Form State
  const [creditorType, setCreditorType] = useState('External (Multilateral)');
  const [creditorName, setCreditorName] = useState('World Bank (IDA)');
  const [principal, setPrincipal] = useState('50000000'); // 50M
  const [interestRate, setInterestRate] = useState('3.5');
  const [tenorYears, setTenorYears] = useState('10');
  const [frequency, setFrequency] = useState('Semi-Annual'); // Annual, Semi-Annual, Quarterly
  
  const [scheduleData, setScheduleData] = useState<AmortizationRow[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateAmortization = () => {
    const P = Number(principal);
    const annualRate = Number(interestRate) / 100;
    const years = Number(tenorYears);
    
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || years <= 0) {
      alert("Please enter valid positive numbers for Principal, Interest Rate, and Tenor.");
      return;
    }

    let periodsPerYear = 1;
    if (frequency === 'Semi-Annual') periodsPerYear = 2;
    if (frequency === 'Quarterly') periodsPerYear = 4;

    const r = annualRate / periodsPerYear;
    const n = years * periodsPerYear;

    let payment = 0;
    // Handle 0% interest loans gracefully
    if (r === 0) {
      payment = P / n;
    } else {
      payment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    let balance = P;
    const newSchedule: AmortizationRow[] = [];

    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      let principalPayment = payment - interestPayment;
      
      // Handle rounding issues on the last payment
      if (i === n) {
        principalPayment = balance;
        payment = principalPayment + interestPayment;
        balance = 0;
      } else {
        balance -= principalPayment;
      }

      newSchedule.push({
        period: i,
        periodLabel: `Period ${i} (Yr ${Math.ceil(i/periodsPerYear)})`,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, balance)
      });
    }

    setScheduleData(newSchedule);
    setIsCalculated(true);
  };

  const currencyFormatter = (params: any) => {
    if (!params.value && params.value !== 0) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(params.value);
  };

  const [colDefs] = useState<ColDef<AmortizationRow>[]>([
    { field: 'periodLabel', headerName: 'Period', width: 140, pinned: 'left' },
    { field: 'payment', headerName: 'Total Service ($)', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'font-medium' },
    { field: 'principal', headerName: 'Principal ($)', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn' },
    { field: 'interest', headerName: 'Interest ($)', width: 180, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'text-orange-500' },
    { field: 'remainingBalance', headerName: 'Remaining Balance', width: 200, valueFormatter: currencyFormatter, type: 'numericColumn', cellClass: 'font-bold bg-foreground/[0.02]' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    cellStyle: { fontSize: '13px', display: 'flex', alignItems: 'center' }
  }), []);

  const currentPrincipal = Number(principal) || 0;
  const newProjectedDebt = CURRENT_DEBT_STOCK + currentPrincipal;
  const isCeilingBreached = newProjectedDebt > STATUTORY_DEBT_CEILING;

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-muted" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Module 10 / Macro Financing</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Sovereign Loan Registration
          </h1>
          <p className="text-sm text-muted">
            Record new debt instruments into the national ledger and dynamically project lifetime service schedules.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
              !isCalculated || isCeilingBreached
                ? "bg-foreground/10 text-muted cursor-not-allowed" 
                : "bg-brand-gold text-brand-dark hover:bg-brand-gold-dark hover:translate-y-[-2px] shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
            )}
            disabled={!isCalculated || isCeilingBreached}
          >
            <Save className="w-4 h-4" /> Finalize Registration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Controls - Left */}
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-panel p-6">
              <h3 className="text-lg font-medium text-foreground font-serif mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-gold" /> Instrument Terms
              </h3>
              
              <div className="space-y-5">
                 <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Creditor Type</label>
                  <select 
                    value={creditorType}
                    onChange={(e) => setCreditorType(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                  >
                    <option>External (Multilateral)</option>
                    <option>External (Bilateral)</option>
                    <option>Domestic (Commercial Bank)</option>
                    <option>Domestic (Treasury Bond)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Creditor Entity</label>
                  <div className="relative">
                    {creditorType.includes('External') ? <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" /> : <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />}
                    <input 
                      type="text" 
                      value={creditorName}
                      onChange={(e) => setCreditorName(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Principal Amount (USD)</label>
                  <input 
                    type="number" 
                    value={principal}
                    onChange={(e) => {
                      setPrincipal(e.target.value);
                      setIsCalculated(false);
                    }}
                    className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-lg font-bold text-foreground focus:border-brand-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => {
                        setInterestRate(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Tenor (Years)</label>
                    <input 
                      type="number" 
                      value={tenorYears}
                      onChange={(e) => {
                        setTenorYears(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Repayment Frequency</label>
                  <select 
                    value={frequency}
                    onChange={(e) => {
                      setFrequency(e.target.value);
                      setIsCalculated(false);
                    }}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold outline-none"
                  >
                    <option>Annual</option>
                    <option>Semi-Annual</option>
                    <option>Quarterly</option>
                  </select>
                </div>

                <button 
                  onClick={calculateAmortization}
                  className="w-full py-3 mt-4 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-border"
                >
                  <Calculator className="w-4 h-4" /> Generate Schedule
                </button>
              </div>
           </div>
        </div>

        {/* Schedule Grid - Right */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
           
           {/* Fiscal Guardrail Summary */}
           <div className="glass-panel p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                 <p className="text-xs text-muted uppercase tracking-wider mb-1">Projected Total Debt Stock</p>
                 <div className="flex items-end gap-3">
                   <p className={cn("text-2xl font-mono font-bold", isCeilingBreached ? "text-red-500" : "text-brand-green")}>
                     {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(newProjectedDebt)}
                   </p>
                   <p className="text-sm text-muted mb-1">vs Ceiling: $2.0B</p>
                 </div>
               </div>
               
               {isCeilingBreached ? (
                 <div className="flex items-start gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20 max-w-xs">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-xs text-red-500 leading-tight">
                      <strong>Statutory Breach.</strong> This instrument will push National Debt above the legal cap. Registration blocked.
                    </p>
                 </div>
               ) : (
                 <div className="flex items-start gap-2 bg-brand-green/10 p-3 rounded-lg border border-brand-green/20 max-w-xs">
                    <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                    <p className="text-xs text-brand-green leading-tight">
                      <strong>Within Bounds.</strong> The projected debt stock adheres to statutory thresholds.
                    </p>
                 </div>
               )}
           </div>

           {/* Grid */}
           <div className="glass-panel overflow-hidden border border-border flex flex-col flex-1 min-h-[500px]">
              <div className="bg-foreground/[0.02] border-b border-border p-4">
                <h2 className="text-sm font-medium text-foreground flex items-center gap-2">Amortization Projection Engine</h2>
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
                {!isCalculated ? (
                   <div className="h-full w-full flex flex-col items-center justify-center text-muted p-6 text-center">
                     <Calculator className="w-12 h-12 opacity-20 mb-4" />
                     <p>Define the loan macro-terms and click "Generate Schedule" to project the complete amortization lifetime.</p>
                   </div>
                ) : (
                  <AgGridReact
                    rowData={scheduleData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                  />
                )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
