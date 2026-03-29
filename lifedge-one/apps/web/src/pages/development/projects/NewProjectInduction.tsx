import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { Construction, Save, CheckCircle, ArrowLeft, Building2, MapPin, Link as LinkIcon, DollarSign, Calendar } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewProjectInduction() {
  const { theme } = useTheme();
  
  const [projectTitle, setProjectTitle] = useState('');
  const [sector, setSector] = useState('Roads & Bridges');
  const [executingAgency, setExecutingAgency] = useState('Ministry of Public Works');
  const [geographicRegion, setGeographicRegion] = useState('Multi-County / National');
  const [totalBudget, setTotalBudget] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [fundingSource, setFundingSource] = useState('Government of Liberia (GoL / Consolidated Fund)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked PSIP ID
  const psipId = `PSIP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !totalBudget || !completionDate) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
          <Construction className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Project Formally Inducted</h2>
        <p className="text-muted">
          Your capital infrastructure initiative has been successfully registered into the National Public Sector Investment Program (PSIP).
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-orange-500/30 bg-orange-500/5">
          <div className="flex justify-between items-center border-b border-orange-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Master Project ID</span>
            <div className="bg-foreground/5 px-3 py-1 rounded">
              <span className="text-lg font-mono font-bold text-foreground tracking-widest">{psipId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Project Title</span>
            <span className="text-sm font-medium text-foreground">{projectTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Executing Agency</span>
            <span className="text-sm font-medium text-foreground">{executingAgency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Total Approved Budget</span>
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(totalBudget))}
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-orange-500">Target Completion</span>
            <span className="text-sm font-bold text-red-500">{new Date(completionDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setProjectTitle('');
              setTotalBudget('');
              setCompletionDate('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Induct Another Project
          </button>
          <Link 
            to="/app/development/projects"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Project Bank
          </Link>
        </div>
      </div>
    );
  }

  const isDonorFunded = fundingSource === 'Bilateral / Multilateral Donor Aid';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/development/projects" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Project Bank
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-medium text-brand-gold uppercase tracking-wider">Module 15 / PSIP Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Induct New Infrastructure Project
          </h1>
          <p className="text-sm text-muted">
            Register major capital investments into the Public Sector Investment Program (PSIP) to track geographic disbursements and physical completion rates.
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
              <Building2 className="w-4 h-4 text-brand-gold" /> Project Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Project Title</label>
                <input 
                  type="text" 
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Coastal Highway Expansion - Phase III"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Economic Sector</label>
                <select 
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Roads & Bridges</option>
                  <option>Power Grid / Energy</option>
                  <option>Healthcare Facilities</option>
                  <option>Educational Infrastructure</option>
                  <option>WASH (Water & Sanitation)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-gold" /> Geographic Locus
                </label>
                <select 
                  value={geographicRegion}
                  onChange={(e) => setGeographicRegion(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Multi-County / National</option>
                  <option>Montserrado</option>
                  <option>Nimba</option>
                  <option>Bong</option>
                  <option>Grand Bassa</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <DollarSign className="w-4 h-4 text-brand-gold" /> Fiduciary Logistics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Primary Funding Modality</label>
                <select 
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Government of Liberia (GoL / Consolidated Fund)</option>
                  <option>Bilateral / Multilateral Donor Aid</option>
                  <option>Public-Private Partnership (PPP)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Executing Agency (MAC)</label>
                <select 
                  value={executingAgency}
                  onChange={(e) => setExecutingAgency(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Ministry of Public Works</option>
                  <option>Liberia Electricity Corporation</option>
                  <option>Ministry of Health</option>
                  <option>Ministry of Education</option>
                  <option>Liberia Water & Sewer Corporation</option>
                </select>
              </div>

              {isDonorFunded && (
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider">Donor / Financer Profile</label>
                  <select className="w-full bg-brand-gold/5 border border-brand-gold/30 rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors">
                      <option>Select Donor Identification Code...</option>
                      <option>World Bank (WB-0192)</option>
                      <option>USAID (US-041A)</option>
                      <option>European Union (EU-INT-99)</option>
                      <option>African Development Bank (AFDB)</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Total Approved Lifetime Budget (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border-2 border-border rounded-lg pl-8 pr-4 py-3 text-xl font-bold text-foreground focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   <Calendar className="w-3 h-3 text-brand-gold" /> Target Completion Date
                </label>
                <input 
                  type="date" 
                  required
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors dark:[color-scheme:dark]"
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
              disabled={!projectTitle || !totalBudget || !completionDate}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !projectTitle || !totalBudget || !completionDate
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-brand-gold text-brand-dark hover:bg-brand-gold-dark shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
              )}
            >
              <Construction className="w-4 h-4" /> Induct PSIP Project
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
