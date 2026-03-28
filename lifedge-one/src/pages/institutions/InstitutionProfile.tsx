import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, ArrowLeft, Shield, DollarSign, Users, Briefcase, FileText, Settings, Network } from 'lucide-react';
import { MOCK_INSTITUTIONS, INSTITUTION_CATEGORIES } from '../../config/institutions.config';
import { cn } from '../../lib/utils';

export default function InstitutionProfile() {
  const { id } = useParams<{ id: string }>();

  const institution = useMemo(() => {
    return MOCK_INSTITUTIONS.find(i => i.id === id);
  }, [id]);

  const parentInstitution = useMemo(() => {
    if (!institution?.parentId) return null;
    return MOCK_INSTITUTIONS.find(i => i.id === institution.parentId);
  }, [institution]);

  const childInstitutions = useMemo(() => {
    if (!institution) return [];
    return MOCK_INSTITUTIONS.filter(i => i.parentId === institution.id);
  }, [institution]);

  const categoryName = useMemo(() => {
    if (!institution) return '';
    return INSTITUTION_CATEGORIES.find(c => c.id === institution.categoryId)?.name || institution.categoryId;
  }, [institution]);

  if (!institution) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-medium text-foreground mb-2">Institution Not Found</h2>
        <Link to="/app/institutions" className="text-brand-gold hover:underline">Return to Registry</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/app/institutions" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Registry
      </Link>

      {/* Header Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-green/20 border border-brand-gold/30 flex items-center justify-center shrink-0">
            <Building2 className="w-10 h-10 text-brand-gold" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-2.5 py-1 bg-brand-gold/10 text-brand-gold text-xs font-medium uppercase tracking-wider rounded border border-brand-gold/20">
                {categoryName}
              </span>
              {institution.isActive ? (
                <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-xs font-medium uppercase tracking-wider rounded border border-brand-green/20">
                  Active
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-xs font-medium uppercase tracking-wider rounded border border-red-500/20">
                  Inactive
                </span>
              )}
            </div>
            <h1 className="text-3xl font-serif font-medium text-foreground leading-tight">
              {institution.name} {institution.acronym && `(${institution.acronym})`}
            </h1>
            <p className="text-muted mt-1 font-mono text-sm">Entity Code: {institution.id}</p>
          </div>
          
          <div className="flex flex-col gap-2 shrink-0 md:text-right">
            <button className="px-5 py-2.5 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors">
              Edit Profile
            </button>
            <button className="px-5 py-2.5 bg-foreground/5 text-foreground border border-border rounded-lg text-sm font-medium hover:bg-foreground/10 transition-colors">
              View Audit Log
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Controls & Personnel) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Financial Governance */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-gold" /> Financial Controls
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Top-Line Budgeting</p>
                  <p className="text-xs text-muted">Can receive direct budget ceilings</p>
                </div>
                {institution.budgetEnabled ? (
                  <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded border border-brand-green/20">Enabled</span>
                ) : (
                  <span className="px-2.5 py-1 bg-foreground/10 text-muted text-xs font-medium rounded border border-border">Disabled</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Allotment Authority</p>
                  <p className="text-xs text-muted">Can independently request releases</p>
                </div>
                {institution.allotmentEnabled ? (
                  <span className="px-2.5 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded border border-brand-green/20">Enabled</span>
                ) : (
                  <span className="px-2.5 py-1 bg-foreground/10 text-muted text-xs font-medium rounded border border-border">Restricted</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Leadership & Personnel Quick View */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-green" /> Leadership
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center border border-border">
                <Users className="w-5 h-5 text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{institution.headOfInstitution || 'Not Assigned'}</p>
                <p className="text-xs text-muted">Head of Institution</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Hierarchy & Relationships) */}
        <div className="space-y-6 lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 h-full"
          >
            <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-brand-gold" /> Organization Structure
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8">
              {/* Vertical line connecting the tree */}
              <div className="absolute top-4 bottom-4 left-[11px] sm:left-[19px] w-px bg-border z-0" />

              {/* Parent */}
              {parentInstitution && (
                <div className="relative z-10 mb-8 group">
                  <div className="absolute top-4 -left-6 sm:-left-8 w-4 h-px bg-border" />
                  <div className="absolute top-3 -left-7 sm:-left-9 w-2 h-2 rounded-full border border-brand-gold bg-background group-hover:bg-brand-gold cursor-pointer transition-colors" />
                  <div className="glass-panel p-4 border border-border/50 bg-foreground/[0.02]">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Parent Entity</p>
                    <Link to={`/app/institutions/${parentInstitution.id}`} className="text-sm font-medium text-foreground hover:text-brand-gold transition-colors flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted" /> 
                      {parentInstitution.name}
                    </Link>
                  </div>
                </div>
              )}

              {/* Current Context */}
              <div className="relative z-10 mb-8">
                {parentInstitution && <div className="absolute top-4 -left-6 sm:-left-8 w-4 h-px bg-brand-gold" />}
                <div className="absolute top-3 -left-[29.5px] sm:-left-[37.5px] w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="glass-panel p-4 border border-brand-gold/30 bg-brand-gold/5 shadow-sm">
                  <p className="text-xs font-medium text-brand-gold uppercase tracking-wider mb-1">Current Entity</p>
                  <div className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-gold" /> 
                    {institution.name}
                  </div>
                </div>
              </div>

              {/* Children Nodes */}
              {childInstitutions.length > 0 ? (
                <div className="relative z-10 flex flex-col gap-3">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1 ml-4 sm:ml-6">Sub-Units ({childInstitutions.length})</p>
                  {childInstitutions.map((child, idx) => (
                    <div key={child.id} className="relative group ml-4 sm:ml-6">
                      <div className="absolute top-[22px] -left-10 sm:-left-14 w-10 sm:w-14 h-px bg-border" />
                      {/* End of vertical branch graphic for the last child */}
                      {idx === childInstitutions.length - 1 && (
                        <div className="absolute top-[22px] bottom-0 -left-[14.5px] sm:-left-[22.5px] w-1 bg-background" /> 
                      )}
                      
                      <div className="absolute top-[18px] -left-11 sm:-left-15 w-2 h-2 rounded-full border border-border bg-background group-hover:border-brand-gold group-hover:bg-brand-gold/20 transition-colors" />
                      
                      <Link to={`/app/institutions/${child.id}`} className="block glass-panel p-3 border border-border/50 bg-foreground/[0.02] hover:border-brand-gold/30 hover:bg-foreground/5 transition-all">
                        <div className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-muted" /> 
                          {child.name} {child.acronym && `(${child.acronym})`}
                        </div>
                        <div className="text-[10px] text-muted ml-5.5 mt-0.5 uppercase tracking-wider">
                          {INSTITUTION_CATEGORIES.find(c => c.id === child.categoryId)?.name}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative z-10 ml-4 sm:ml-6">
                  <div className="absolute top-4 -left-10 sm:-left-14 w-10 sm:w-14 h-px bg-border" />
                  <p className="text-xs text-muted italic ml-2">No direct sub-units registered.</p>
                </div>
              )}

            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
