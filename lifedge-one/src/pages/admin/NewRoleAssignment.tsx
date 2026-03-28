import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../components/ThemeProvider';
import { UserPlus, Save, CheckCircle2, ArrowLeft, Building2, Key, Link as LinkIcon, ShieldAlert, Fingerprint } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export default function NewRoleAssignment() {
  const { theme } = useTheme();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('Ministry of Health');
  const [role, setRole] = useState('Department Controller');
  const [clearance, setClearance] = useState('Pending Audit');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Network ID
  const networkId = `NID-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;
    setIsSubmitted(true);
  };

  const isPending = clearance === 'Pending Audit';
  const isRevoked = clearance === 'Revoked / Flagged';
  const isCleared = clearance === 'LACC Verified';

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-4">
          <Key className="w-10 h-10 text-brand-gold" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Identity Core Encrypted</h2>
        <p className="text-muted">
          The security profile has been committed to the sovereign ledger. Biometric challenge keys will be dispatched to the official's email.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-brand-gold/30 bg-brand-gold/5">
          <div className="flex justify-between items-center border-b border-brand-gold/20 pb-4 mb-4">
            <span className="text-sm text-muted">Network Authentication ID</span>
            <div className="bg-foreground/5 px-3 py-1 rounded border border-brand-gold/30">
              <span className="text-lg font-mono font-bold text-brand-gold tracking-widest">{networkId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Authorized Official</span>
            <span className="text-sm font-medium text-foreground">{firstName} {lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Binding Institution</span>
            <span className="text-sm font-medium text-foreground">{institution}</span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-bold text-brand-gold flex items-center gap-2"><Fingerprint className="w-4 h-4" /> TRACE Clearance</span>
            <span className="text-sm font-bold text-foreground">{clearance}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFirstName('');
              setLastName('');
              setEmail('');
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Provision Another Active
          </button>
          <Link 
            to="/app/admin/security"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
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
          <Link to="/app/admin/security" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Active Directory
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-medium text-brand-gold uppercase tracking-wider">Module 19 / Cryptographic Access</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Provision Institutional Role
          </h1>
          <p className="text-sm text-muted">
            Bind a government official to a secure Role-Based Control Profile, governed by the Liberia Anti-Corruption Commission clearance framework.
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
              <Key className="w-4 h-4 text-brand-gold" /> Identity & Target Sector
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   First Name
                </label>
                <input 
                  type="text" 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Boima"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   Last Name
                </label>
                <input 
                  type="text" 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Kamara"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider flex items-center gap-1">
                   Official Government Email (*@*.gov.lr)
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. bkamara@mfdp.gov.lr"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Governing Target Institution (MAC/SOE)</label>
                <select 
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Ministry of Finance & Development Planning</option>
                  <option>Liberia Revenue Authority</option>
                  <option>Ministry of Health</option>
                  <option>Ministry of Education</option>
                  <option>Liberia Electricity Corporation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Assigned System Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Cabinet Minister (E-Signature Required)</option>
                  <option>Comptroller General</option>
                  <option>Department Controller (Read/Write)</option>
                  <option>Budget Procurement Officer</option>
                  <option>Inspector General (Read-Only Global)</option>
                </select>
              </div>

            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <ShieldAlert className="w-4 h-4 text-brand-gold" /> Security & Compliance State
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">LACC Background Clearance</label>
                <select 
                  value={clearance}
                  onChange={(e) => setClearance(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-brand-gold outline-none transition-colors"
                >
                  <option>Pending Audit</option>
                  <option>LACC Verified</option>
                  <option>Revoked / Flagged</option>
                </select>
              </div>

              {isPending && (
                <div className="md:col-span-2 flex items-start gap-2 bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                  <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-400 leading-tight">
                    <strong>Clearance Block:</strong> The profile can be constructed, but no financial execution rights will be granted until the official submits their Financial Disclosure Form to LACC and is verified.
                  </p>
                </div>
              )}

              {isRevoked && (
                <div className="md:col-span-2 flex items-start gap-2 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 leading-tight">
                    <strong>Critical Override:</strong> This individual has been explicitly flagged by the Inspector General. System access is algorithmically denied regardless of Role Assignment.
                  </p>
                </div>
              )}

              {isCleared && (
                <div className="md:col-span-2 flex items-start gap-2 bg-brand-green/10 p-4 rounded-lg border border-brand-green/20">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-green leading-tight">
                    <strong>LACC Cleared:</strong> Profile verified. The official will be prompted to secure their account using YubiKey multifactor authentication on first login.
                  </p>
                </div>
              )}

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
              disabled={!firstName || !lastName || !email || isRevoked}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                (!firstName || !lastName || !email || isRevoked)
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-brand-gold text-brand-dark hover:bg-brand-gold-dark shadow-[0_4px_15px_rgba(234,179,8,0.3)] hover:-translate-y-0.5"
              )}
            >
              <UserPlus className="w-4 h-4" /> Provision Active Profile
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
