import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, CheckSquare, Square, 
  Download, Eye, Printer, Layout, 
  PieChart as PieChartIcon, ShieldAlert, DollarSign, Activity, FileStack, TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import NationalSummaryView from './NationalSummaryView';

type BriefModule = {
  id: string;
  title: string;
  description: string;
  icon: any;
  required?: boolean;
};

const AVAILABLE_MODULES: BriefModule[] = [
  { id: 'exec_summary', title: 'Executive Fiscal Summary', description: 'Top-level macroeconomic indicators and total expenditures.', icon: Layout, required: true },
  { id: 'revenue', title: 'Revenue Trajectory', description: 'Domestic receipts and donor inflows vs targets.', icon: TrendingUp },
  { id: 'allotments', title: 'Sector Allotment Analysis', description: 'Detailed breakdown of active allotments by Ministry.', icon: PieChartIcon },
  { id: 'treasury', title: 'Treasury Position', description: 'EFTs cleared, pending payments, and consolidated fund balance.', icon: DollarSign },
  { id: 'exceptions', title: 'Critical Exceptions', description: 'Overruns, delayed audits, and integration failures.', icon: ShieldAlert },
  { id: 'projects', title: 'Donor Project Implementation', description: 'Disbursement rates on active PSIPs/PIUs.', icon: Activity },
];

export default function BriefBuilderView({ currentRole }: { currentRole: string }) {
  const [selectedModules, setSelectedModules] = useState<string[]>(['exec_summary']);
  const [previewMode, setPreviewMode] = useState(false);
  const [reportTitle, setReportTitle] = useState('Presidential Fiscal Brief - Q2 2026');

  const toggleModule = (id: string, required?: boolean) => {
    if (required) return;
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    // In a real app, this would trigger a library like jsPDF or html2canvas
    setPreviewMode(true);
  };

  if (previewMode) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center glass-panel p-4 sticky top-0 z-20 shadow-xl border-brand-gold/20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setPreviewMode(false)}
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors border border-border rounded"
            >
              Exit Preview
            </button>
            <span className="text-sm font-medium text-brand-gold">Preview Mode Active</span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-border rounded-lg text-sm font-medium transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-black rounded-lg text-sm font-medium transition-colors shadow">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full bg-white dark:bg-zinc-950 p-8 sm:p-12 shadow-2xl rounded-xl border border-border print:shadow-none print:p-0">
          <div className="text-center border-b-2 border-brand-gold pb-8 mb-8">
            <div className="w-16 h-16 mx-auto bg-brand-gold/20 rounded-full flex items-center justify-center mb-4 border border-brand-gold/50">
              <ShieldAlert className="w-8 h-8 text-brand-gold" />
            </div>
            <h1 className="text-3xl font-serif text-foreground font-bold tracking-tight mb-2">{reportTitle}</h1>
            <p className="text-sm text-muted uppercase tracking-widest font-medium">Prepared by: {currentRole} &bull; Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-12">
            {selectedModules.includes('exec_summary') && (
              <section>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-2">
                  <div className="bg-brand-gold text-black w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full">1</div>
                  <h2 className="text-xl font-medium text-foreground">Executive Fiscal Summary</h2>
                </div>
                <NationalSummaryView currentRole={currentRole} />
              </section>
            )}

            {selectedModules.includes('exceptions') && (
              <section className="print:break-before-page">
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-2">
                  <div className="bg-brand-gold text-black w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full">2</div>
                  <h2 className="text-xl font-medium text-foreground flex items-center gap-2">Critical Exceptions <ShieldAlert className="w-5 h-5 text-red-500" /></h2>
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <h4 className="font-medium text-red-500 mb-2">Reconciliation Mismatch</h4>
                  <p className="text-sm text-muted">Bank statement import #BS-044 shows $12,500 variance vs IFMIS ledger. Action required by CMA.</p>
                </div>
              </section>
            )}
            
            {/* Other sections would render based on selection */}
            {selectedModules.length > 2 && (
              <section className="print:break-before-page text-center py-12 border-t border-border mt-12">
                <FileStack className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
                <p className="text-muted italic">Additional selected modules ({selectedModules.length - 2}) are appended in full print layout.</p>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      
      {/* Builder Configuration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 flex flex-col gap-6"
      >
        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Layout className="w-5 h-5 text-brand-gold" /> Briefing Pack Configurator
              </h2>
              <p className="text-xs text-muted mt-1">Compile real-time dashboard widgets into a static executive brief.</p>
            </div>
            <button className="text-xs text-brand-gold hover:underline font-medium">Load Template</button>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">Briefing Title</label>
            <input 
              type="text" 
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-brand-gold transition-colors text-lg font-serif"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-medium text-muted uppercase tracking-wider">Select Inclusion Modules</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {AVAILABLE_MODULES.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <div 
                    key={module.id}
                    onClick={() => toggleModule(module.id, module.required)}
                    className={cn(
                      "p-4 border rounded-xl cursor-pointer transition-all flex gap-3 group relative overflow-hidden",
                      isSelected ? "bg-brand-gold/5 border-brand-gold/50 shadow-sm" : "bg-foreground/[0.02] border-border hover:border-brand-gold/30 hover:bg-foreground/5",
                      module.required && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <div className="mt-0.5 pointer-events-none">
                      {isSelected ? (
                        <CheckSquare className={cn("w-5 h-5", module.required ? "text-brand-gold/50" : "text-brand-gold")} />
                      ) : (
                        <Square className="w-5 h-5 text-muted group-hover:text-foreground/50 transition-colors" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        {module.title}
                        {module.required && <span className="text-[10px] bg-foreground/10 px-1.5 py-0.5 rounded text-muted">Required</span>}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{module.description}</p>
                    </div>
                    <module.icon className={cn("absolute -right-4 -bottom-4 w-16 h-16 opacity-5 transition-opacity duration-500", isSelected ? "opacity-10 text-brand-gold" : "")} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Generation Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 flex flex-col"
      >
        <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-6 border-b border-border pb-2">
          Compile Target
        </h3>
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="p-4 bg-foreground/5 border border-border border-dashed rounded-xl flex items-center justify-center mb-2">
            <div className="text-center">
              <FileText className="w-8 h-8 text-brand-gold mx-auto mb-2 opacity-80" />
              <p className="text-lg font-medium text-foreground">{selectedModules.length} Modules</p>
              <p className="text-xs text-muted">Est. length: {selectedModules.length * 2} Pages</p>
            </div>
          </div>

          <div className="space-y-3 flex-1 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Classification</span>
              <span className="font-medium text-yellow-500 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Internal restricted</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Data Snapshot</span>
              <span className="font-medium text-foreground font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Author</span>
              <span className="font-medium text-foreground">{currentRole}</span>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            className="w-full py-3 bg-brand-gold text-brand-dark rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:bg-brand-gold-dark hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview & Generate
          </button>
        </div>
      </motion.div>

    </div>
  );
}
