import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { HeartHandshake, FileCheck, CheckCircle, ArrowLeft, ShieldCheck, Link as LinkIcon, AlertTriangle, Globe2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function NGOAccreditationWizard() {
  const { theme } = useTheme();
  
  const [ngoType, setNgoType] = useState('International Non-Governmental Organization (INGO)');
  const [ngoName, setNgoName] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('United States');
  const [sector, setSector] = useState('Healthcare & Sanitation');
  const [capitalInflow, setCapitalInflow] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Registration ID
  const registrationId = `NGO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  // Calculate expiration date (2 years from today)
  const today = new Date();
  const expirationDate = new Date(today.setFullYear(today.getFullYear() + 2)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ngoName || !capitalInflow) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
          <FileCheck className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Accreditation Certificate Issued</h2>
        <p className="text-muted">
          The civil society organization is now legally recognized to operate within the Republic of Liberia and its financial inflows are tracked.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-orange-500/30 bg-orange-500/5">
          <div className="flex justify-between items-center border-b border-orange-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Official Registration ID</span>
            <div className="bg-foreground/5 px-3 py-1 rounded">
              <span className="text-lg font-mono font-bold text-foreground tracking-widest">{registrationId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Entity Name</span>
            <span className="text-sm font-medium text-foreground">{ngoName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Primary Sector</span>
            <span className="text-sm font-medium text-foreground">{sector}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Projected Capital</span>
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(capitalInflow))}
            </span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-orange-500">Certificate Expiration</span>
            <span className="text-sm font-bold text-red-500">{expirationDate}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setNgoName('');
              setCapitalInflow('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Issue Another Certificate
          </button>
          <Link 
            to="/app/development/ngo"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Console
          </Link>
        </div>
      </div>
    );
  }

  const isInternational = ngoType === 'International Non-Governmental Organization (INGO)';

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/development/ngo" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to NGO Console
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Module 14 / Certification Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Civil Society Accreditation
          </h1>
          <p className="text-sm text-muted">
            Issue legal operating certificates to domestic and international Non-Governmental Organizations.
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
              <Globe2 className="w-4 h-4 text-orange-500" /> Organizational Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Legal Entity Name</label>
                <input 
                  type="text" 
                  required
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  placeholder="e.g. Save the Children International"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Classification</label>
                <select 
                  value={ngoType}
                  onChange={(e) => setNgoType(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                >
                  <option>International Non-Governmental Organization (INGO)</option>
                  <option>Domestic / Local Civil Society (CSO)</option>
                  <option>Faith-Based Organization (FBO)</option>
                </select>
              </div>

              {isInternational ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Country of Registration (Origin)</label>
                  <select 
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>European Union</option>
                    <option>Other / Rest of World</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Domestic County HQ</label>
                  <select 
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                  >
                    <option>Montserrado</option>
                    <option>Nimba</option>
                    <option>Bong</option>
                    <option>Other County</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <ShieldCheck className="w-4 h-4 text-orange-500" /> Operational Framework
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Primary Intervention Sector</label>
                <select 
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-orange-500 outline-none transition-colors"
                >
                  <option>Healthcare & Sanitation</option>
                  <option>Education & Youth Development</option>
                  <option>Agriculture & Food Security</option>
                  <option>Democracy & Governance</option>
                  <option>Infrastructure / WASH</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Estimated Annual Capital Inflow (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    required
                    value={capitalInflow}
                    onChange={(e) => setCapitalInflow(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border-2 border-border rounded-lg pl-8 pr-4 py-3 text-xl font-bold text-foreground focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-start gap-2 bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-400 leading-tight">
                  <strong>Statutory Provision.</strong> According to the NGO guidelines, this accreditation is strictly valid for <strong className="text-foreground">2 Years</strong>. Following this issuance, the system will set an automated revocation date: <strong className="text-foreground">{expirationDate}</strong>.
                </p>
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
              disabled={!ngoName || !capitalInflow}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !ngoName || !capitalInflow
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:-translate-y-0.5"
              )}
            >
              <FileCheck className="w-4 h-4" /> Issue Certificate
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
