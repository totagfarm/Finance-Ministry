import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Plus, Save, Link as LinkIcon, Shield } from 'lucide-react';
import { INSTITUTION_CATEGORIES, MOCK_INSTITUTIONS } from '../../config/institutions.config';

export default function InstitutionSetup() {
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    categoryId: 'ministries',
    parentId: '',
    headOfInstitution: '',
    budgetEnabled: false,
    allotmentEnabled: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save functionality
    alert("Entity configuration saved to backend registry.");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-serif font-medium text-foreground tracking-tight mb-1">
          Entity Schema Setup
        </h1>
        <p className="text-sm text-muted">
          Register new government institutions, PIUs, or internal sub-units with the Master Data framework.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Identity */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 sm:p-8 border-t-2 border-t-brand-gold"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <Building2 className="w-5 h-5 text-brand-gold" />
            </div>
            <h2 className="text-lg font-medium text-foreground">Core Identity</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-foreground mb-1">Official Entity Name <span className="text-brand-gold">*</span></label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ministry of Finance and Development Planning"
                className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Acronym / Entity Code</label>
              <input 
                type="text" 
                name="acronym"
                value={formData.acronym}
                onChange={handleChange}
                placeholder="e.g. MFDP"
                className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm uppercase text-foreground focus:border-brand-gold transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Institution Category <span className="text-brand-gold">*</span></label>
              <select 
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold transition-colors appearance-none"
              >
                {INSTITUTION_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Structural Topology */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="p-2 bg-brand-green/10 rounded-lg">
              <LinkIcon className="w-5 h-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-medium text-foreground">Structural Topology</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-foreground mb-2">Parent / Umbrella Institution</label>
              <div className="flex gap-4 items-start">
                <select 
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleChange}
                  className="flex-1 bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold transition-colors appearance-none"
                >
                  <option value="">-- No Parent (Top-Level Entity) --</option>
                  {MOCK_INSTITUTIONS.filter(i => !i.parentId).map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
                <div className="text-[10px] text-muted max-w-[200px] bg-foreground/5 p-2 rounded-lg border border-border/50">
                  Select a parent if this entity is a sub-unit, PIU, or agency operating directly under a Ministry.
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-foreground mb-1">Designated Head of Institution</label>
              <input 
                type="text" 
                name="headOfInstitution"
                value={formData.headOfInstitution}
                onChange={handleChange}
                placeholder="e.g. Minister of Finance, Director General"
                className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-brand-gold transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Financial Governance Checks */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-medium text-foreground">Fiscal Perimeter & Authority</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-foreground/5 cursor-pointer transition-colors group">
              <div className="relative flex items-start justify-center mt-1">
                <input 
                  type="checkbox" 
                  name="budgetEnabled"
                  checked={formData.budgetEnabled}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer accent-brand-gold bg-foreground/10 border-border rounded"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">Eligible for Top-Line Budget Ceilings</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Checking this box asserts that this specific structural unit is recognized as a direct budgetary recipient and can formulate its own multi-year budget independently of a parent body.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-4 p-4 border border-border rounded-xl hover:bg-foreground/5 cursor-pointer transition-colors group">
              <div className="relative flex items-start justify-center mt-1">
                <input 
                  type="checkbox" 
                  name="allotmentEnabled"
                  checked={formData.allotmentEnabled}
                  onChange={handleChange}
                  className="w-5 h-5 cursor-pointer accent-brand-gold bg-foreground/10 border-border rounded"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">Vested Allotment & Execution Authority</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Checking this box permits this entity to request allotments, execute virement transfers, and commit funds. Leave unchecked for strictly reporting/advisory units.
                </p>
              </div>
            </label>
          </div>
        </motion.div>

        <div className="flex justify-end gap-4 py-4 sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border z-20">
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground hover:bg-foreground/5 transition-colors rounded-lg">
            Discard
          </button>
          <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-brand-gold text-brand-dark rounded-lg text-sm font-bold shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:bg-brand-gold-dark hover:translate-y-[-2px] transition-all">
            <Save className="w-4 h-4" /> Save Schema
          </button>
        </div>
      </form>
    </div>
  );
}
