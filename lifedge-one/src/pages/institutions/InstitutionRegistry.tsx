import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Filter, Building2, MoreVertical, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_INSTITUTIONS, INSTITUTION_CATEGORIES } from '../../config/institutions.config';
import { cn } from '../../lib/utils';

export default function InstitutionRegistry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredInstitutions = useMemo(() => {
    return MOCK_INSTITUTIONS.filter(inst => {
      const matchesSearch = 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (inst.acronym && inst.acronym.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || inst.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const getCategoryName = (id: string) => {
    return INSTITUTION_CATEGORIES.find(c => c.id === id)?.name || id;
  };

  const getParentName = (parentId?: string) => {
    if (!parentId) return null;
    return MOCK_INSTITUTIONS.find(i => i.id === parentId)?.name;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">Institution Registry</h1>
          <p className="text-sm text-muted mt-1">Master registry of all structural government entities and departments.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search institutions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Entity
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 custom-scrollbar border-b border-border/50">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            "px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors border-b-2",
            activeCategory === 'all' 
              ? "border-brand-gold text-brand-gold bg-brand-gold/5" 
              : "border-transparent text-muted hover:text-foreground hover:bg-foreground/5"
          )}
        >
          All Entities ({MOCK_INSTITUTIONS.length})
        </button>
        {INSTITUTION_CATEGORIES.map(cat => {
          const count = MOCK_INSTITUTIONS.filter(i => i.categoryId === cat.id).length;
          if (count === 0) return null; // Hide empty categories for cleaner UI
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors border-b-2",
                activeCategory === cat.id 
                  ? "border-brand-gold text-brand-gold bg-brand-gold/5" 
                  : "border-transparent text-muted hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Table */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Institution Code</th>
                <th className="px-4 py-3 font-medium">Entity Name</th>
                <th className="px-4 py-3 font-medium">Structure</th>
                <th className="px-4 py-3 font-medium">Controls</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredInstitutions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted">
                    <Building2 className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    No institutions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredInstitutions.map((inst, idx) => (
                  <tr key={inst.id} className="hover:bg-foreground/5 transition-colors group">
                    <td className="px-4 py-4">
                      <div className="font-mono text-xs text-brand-gold font-medium">{inst.id}</div>
                      {inst.acronym && <div className="text-xs text-muted mt-0.5">{inst.acronym}</div>}
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/app/institutions/${inst.id}`} className="font-medium text-foreground hover:text-brand-gold transition-colors">
                        {inst.name}
                      </Link>
                      {inst.headOfInstitution && (
                        <div className="text-xs text-muted mt-0.5 flex items-center gap-1">
                          Head: {inst.headOfInstitution}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1.5 align-start">
                        <span className="px-2 py-0.5 bg-foreground/10 text-foreground text-[10px] font-medium rounded-md w-fit whitespace-nowrap uppercase tracking-wider">
                          {getCategoryName(inst.categoryId)}
                        </span>
                        {inst.parentId && (
                          <div className="text-[10px] text-muted flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            Under: {getParentName(inst.parentId)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {inst.budgetEnabled ? (
                          <span className="px-2 py-0.5 bg-brand-green/10 text-brand-green text-[10px] font-medium rounded border border-brand-green/20" title="Can receive top-line ceilings">
                            Budget
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-foreground/5 text-muted text-[10px] font-medium rounded border border-border" title="Budgets roll up to parent">
                            No Budget
                          </span>
                        )}
                        
                        {inst.allotmentEnabled ? (
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-medium rounded border border-blue-500/20" title="Has independent execution authority">
                            Allotments
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-foreground/5 text-muted text-[10px] font-medium rounded border border-border" title="Must execute via parent or restricted">
                            Restricted
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link 
                        to={`/app/institutions/${inst.id}`}
                        className="p-1.5 text-muted hover:text-brand-gold transition-colors rounded-md hover:bg-brand-gold/10 inline-flex"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
