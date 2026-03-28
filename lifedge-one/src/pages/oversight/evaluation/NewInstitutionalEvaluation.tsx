import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { FileText, Save, CheckCircle, ArrowLeft, Building2, Link as LinkIcon, Activity, Baseline, ShieldAlert } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewInstitutionalEvaluation() {
  const { theme } = useTheme();
  
  const [entityType, setEntityType] = useState('Ministry / Agency (MAC)');
  const [entityName, setEntityName] = useState('Ministry of Education');
  const [evaluationPeriod, setEvaluationPeriod] = useState('FY 2026 - Q3');
  const [kpiScore, setKpiScore] = useState('');
  const [riskClassification, setRiskClassification] = useState('Caution / Moderate Risk');
  const [justification, setJustification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Evaluation ID
  const evalId = `EVAL-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiScore || !justification) return;
    setIsSubmitted(true);
  };

  const isHighRisk = riskClassification === 'High Risk / Critical Intervention';
  const isOptimal = riskClassification === 'Optimal / Low Risk';

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Evaluation Logged Successfully</h2>
        <p className="text-muted">
          The institutional performance score has been structurally bound to the governing entity, updating their national risk profile.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-blue-500/30 bg-blue-500/5">
          <div className="flex justify-between items-center border-b border-blue-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Evaluation Reference Barcode</span>
            <div className="bg-foreground/5 px-3 py-1 rounded border border-blue-500/30">
              <span className="text-lg font-mono font-bold text-blue-500 tracking-widest">{evalId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Scored Entity</span>
            <span className="text-sm font-medium text-foreground">{entityName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Evaluation Timeframe</span>
            <span className="text-sm font-medium text-foreground">{evaluationPeriod}</span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-blue-500 flex items-center gap-2"><Baseline className="w-4 h-4" /> Final KPI Score</span>
            <div className="flex items-center gap-2">
               <span className="text-xl font-bold text-foreground">{kpiScore}</span>
               <span className="text-sm text-muted">/ 100</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setKpiScore('');
              setJustification('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Log Another Evaluation
          </button>
          <Link 
            to="/app/oversight/mac"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Registry
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
          <Link to="/app/oversight/mac" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Registries
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Module 18 / Governance Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Log Institutional Performance Score
          </h1>
          <p className="text-sm text-muted">
            Submit formal KPI evaluations and risk assessments for Government Ministries and State-Owned Enterprises.
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
              <Building2 className="w-4 h-4 text-blue-500" /> Institutional Target
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Entity Classification</label>
                <select 
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>Ministry / Agency (MAC)</option>
                  <option>State-Owned Enterprise (SOE)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Governing Entity</label>
                {entityType === 'Ministry / Agency (MAC)' ? (
                   <select 
                     value={entityName}
                     onChange={(e) => setEntityName(e.target.value)}
                     className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                   >
                     <option>Ministry of Education</option>
                     <option>Ministry of Public Works</option>
                     <option>Ministry of Finance & Development Planning</option>
                     <option>Liberia Revenue Authority</option>
                     <option>Liberia Anti-Corruption Commission</option>
                   </select>
                ) : (
                   <select 
                     value={entityName}
                     onChange={(e) => setEntityName(e.target.value)}
                     className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-purple-500 outline-none transition-colors"
                   >
                     <option>Liberia Electricity Corporation</option>
                     <option>Liberia Water & Sewer Corp.</option>
                     <option>National Port Authority</option>
                     <option>Liberia Petroleum Refining Co.</option>
                   </select>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Evaluation Period</label>
                <select 
                  value={evaluationPeriod}
                  onChange={(e) => setEvaluationPeriod(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>FY 2026 - Q1</option>
                  <option>FY 2026 - Q2</option>
                  <option>FY 2026 - Q3</option>
                  <option>FY 2026 - Annual Review</option>
                </select>
              </div>

            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <Baseline className="w-4 h-4 text-blue-500" /> Analytical Scoring
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   Composite KPI Score (0 - 100)
                </label>
                <div className="relative">
                   <input 
                     type="number" 
                     min="0"
                     max="100"
                     required
                     value={kpiScore}
                     onChange={(e) => setKpiScore(e.target.value)}
                     placeholder="e.g. 78"
                     className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-xl font-bold text-foreground focus:border-blue-500 outline-none transition-colors"
                   />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold text-sm">/ 100</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Governing Risk Classification</label>
                <select 
                  value={riskClassification}
                  onChange={(e) => setRiskClassification(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors"
                >
                  <option>Optimal / Low Risk</option>
                  <option>Caution / Moderate Risk</option>
                  <option>High Risk / Critical Intervention</option>
                </select>
              </div>

              {isHighRisk && (
                <div className="md:col-span-2 flex items-start gap-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-500 leading-tight">
                    <strong>Critical Oversight Alert:</strong> Assigning a High Risk classification to an entity generates an immediate automated briefing to the Executive Mansion, indicating severe operational or fiduciary vulnerability within this institution.
                  </p>
                </div>
              )}

              {isOptimal && (
                <div className="md:col-span-2 flex items-start gap-2 bg-brand-green/10 p-4 rounded-lg border border-brand-green/20">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-green leading-tight">
                    <strong>Performance Recognition:</strong> An Optimal score maintains the entity's "Green Channel" status, qualifying them for expedited procurement thresholds and reduced quarterly compliance audits.
                  </p>
                </div>
              )}

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <FileText className="w-3 h-3 text-blue-500" /> Executive Summary & Justification
                </label>
                <textarea 
                  required
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Summarize the primary drivers of this evaluation score (budget execution rates, deliverable completion, procurement compliance)..."
                  className="w-full h-32 bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-blue-500 outline-none transition-colors resize-none"
                />
              </div>

            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Save as Draft
            </button>
            <button 
              type="submit"
              disabled={!kpiScore || !justification}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !kpiScore || !justification
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
              )}
            >
              <Save className="w-4 h-4" /> Publish Evaluation Matrix
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
