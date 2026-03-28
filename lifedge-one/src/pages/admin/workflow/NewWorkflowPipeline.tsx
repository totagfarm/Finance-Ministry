import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { Network, Save, CheckCircle2, ArrowLeft, Merge, GitMerge, DollarSign, ArrowDown, Activity, Link as LinkIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewWorkflowPipeline() {
  const { theme } = useTheme();
  
  const [domain, setDomain] = useState('Finance - Treasury Execution');
  const [triggerEvent, setTriggerEvent] = useState('New Allotment Request Generated');
  const [threshold, setThreshold] = useState('');
  
  const [node1, setNode1] = useState('Budget Officer');
  const [node2, setNode2] = useState('Director of Budget');
  const [node3, setNode3] = useState('Deputy Minister for Budget');
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Pipeline Hash
  const hashId = `PIPE-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isFinancial = domain.includes('Finance');

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-3xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
          <Network className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Pipeline Compiled & Activated</h2>
        <p className="text-muted">
          The sequential verification chain is now intercepting live transactions within the TRACE ecosystem.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-between items-center border-b border-blue-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Active Pipeline Hash</span>
            <div className="bg-foreground/5 px-3 py-1 rounded border border-blue-500/30">
              <span className="text-lg font-mono font-bold text-blue-500 tracking-widest">{hashId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Target TRACE Domain</span>
            <span className="text-sm font-medium text-foreground">{domain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Intercepted Trigger</span>
            <span className="text-sm font-medium text-foreground">{triggerEvent}</span>
          </div>
          {threshold && (
             <div className="flex justify-between">
               <span className="text-sm text-muted">Escalation Boundary</span>
               <span className="text-sm font-mono font-bold text-red-500">${parseFloat(threshold).toLocaleString()}</span>
             </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-muted uppercase tracking-wider">
             <span>Genesis Node</span>
             <ArrowLeft className="w-4 h-4" /> <span>{node1}</span>
             <ArrowLeft className="w-4 h-4" /> <span>{node2}</span>
             <ArrowLeft className="w-4 h-4" /> <span className="text-foreground">{node3}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <Link 
            to="/app/admin/workflow"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg transition-colors font-bold text-sm shadow-[0_4px_15px_rgba(59,130,246,0.3)]"
          >
            Return to Command Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/admin/workflow" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Automations
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 20 / Workflow Architect</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Design Verification Pipeline
          </h1>
          <p className="text-sm text-muted">
            Construct immutable, sequential sign-off chains to enforce institutional routing parameters.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 mt-6"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <Network className="w-4 h-4 text-blue-500" /> Domain & Actuator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Target Domain Module</label>
                <select 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>Finance - Treasury Execution</option>
                  <option>Finance - Procurement Console</option>
                  <option>Development - NGO Accreditation</option>
                  <option>Oversight - Internal Audit</option>
                  <option>System - User Provisioning</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Intercepted Trigger Event</label>
                {isFinancial ? (
                  <select 
                    value={triggerEvent}
                    onChange={(e) => setTriggerEvent(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>New Allotment Request Generated</option>
                    <option>Vendor Voucher Submitted</option>
                    <option>EFT Dispatch Authorized</option>
                    <option>Bid Winner Selected</option>
                  </select>
                ) : (
                  <select 
                    value={triggerEvent}
                    onChange={(e) => setTriggerEvent(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>Initial System State Change</option>
                    <option>High-Risk Compliance Flag Generated</option>
                    <option>NGO Registration Applied</option>
                  </select>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <DollarSign className="w-3 h-3 text-blue-500" /> Financial Routing Threshold Bypass (Optional)
                </label>
                <input 
                  type="number" 
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="e.g. 500000 (Forces this pipeline to execute ONLY when transaction exceeds value)"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors font-mono"
                />
              </div>

            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <GitMerge className="w-4 h-4 text-blue-500" /> Sequenced Approval Path
            </h3>
            
            <div className="flex flex-col space-y-4">

              {/* Node 1 */}
              <div className="flex gap-4 items-end bg-foreground/5 p-4 rounded-lg border border-border">
                <div className="flex flex-col items-center justify-center shrink-0 w-12 pb-2">
                   <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs ring-2 ring-blue-500/50">1</div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Initial Review Node</label>
                  <select 
                    value={node1}
                    onChange={(e) => setNode1(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>Budget Officer</option>
                    <option>Procurement Specialist</option>
                    <option>Internal Auditor</option>
                    <option>Department Controller</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-2 z-10">
                 <div className="bg-background rounded-full p-1 border border-border"><ArrowDown className="w-4 h-4 text-muted" /></div>
              </div>

              {/* Node 2 */}
              <div className="flex gap-4 items-end bg-foreground/5 p-4 rounded-lg border border-border">
                <div className="flex flex-col items-center justify-center shrink-0 w-12 pb-2">
                   <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs ring-2 ring-orange-500/50">2</div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Escalation Node</label>
                  <select 
                    value={node2}
                    onChange={(e) => setNode2(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>Director of Budget</option>
                    <option>Director of Procurement</option>
                    <option>Inspector General</option>
                    <option>Comptroller General</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center -my-2 z-10">
                 <div className="bg-background rounded-full p-1 border border-border"><ArrowDown className="w-4 h-4 text-muted" /></div>
              </div>

              {/* Node 3 */}
              <div className="flex gap-4 items-end bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                <div className="flex flex-col items-center justify-center shrink-0 w-12 pb-2">
                   <div className="w-8 h-8 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-xs ring-2 ring-brand-green/50">3</div>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Final Authorization Node</label>
                  <select 
                    value={node3}
                    onChange={(e) => setNode3(e.target.value)}
                    className="w-full bg-background border border-blue-500/50 rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>Deputy Minister for Budget</option>
                    <option>Deputy Minister for Administration</option>
                    <option>Minister of Finance</option>
                    <option>President of the Republic</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
            >
              <Activity className="w-4 h-4" /> Compile & Enforce Engine
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
