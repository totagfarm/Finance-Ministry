import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, CheckSquare, Shield } from 'lucide-react';
import { ROLE_CATEGORIES, Role } from '../config/rbac';
import { cn } from '../lib/utils';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: Role;
  onSelectRole: (role: Role) => void;
}

export default function RoleSwitcherModal({ isOpen, onClose, currentRole, onSelectRole }: RoleSwitcherModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories and roles based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return ROLE_CATEGORIES;

    const query = searchQuery.toLowerCase();
    const result: Record<string, Role[]> = {};

    Object.entries(ROLE_CATEGORIES).forEach(([category, roles]) => {
      // If the category name matches, include all its roles
      if (category.toLowerCase().includes(query)) {
        result[category] = roles as Role[];
      } else {
        // Otherwise filter specific roles that match the query
        const matchingRoles = roles.filter(r => r.toLowerCase().includes(query));
        if (matchingRoles.length > 0) {
          result[category] = matchingRoles as Role[];
        }
      }
    });

    return result;
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl max-h-[85vh] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-foreground/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Switch User Role</h2>
                <p className="text-xs text-muted">Test RBAC layout configurations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-border relative">
            <Search className="w-5 h-5 text-muted absolute left-7 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 150+ functional roles by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
              autoFocus
            />
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-card">
            {Object.keys(filteredCategories).length === 0 ? (
              <div className="text-center py-10 text-muted">
                <p className="text-sm">No roles found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {Object.entries(filteredCategories).map(([category, roles]) => (
                  <div key={category} className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider pl-2 sticky top-0 bg-card py-1 z-10 border-b border-border/50">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(roles as Role[]).map((role) => (
                        <button
                          key={role as string}
                          onClick={() => {
                            onSelectRole(role as Role);
                            onClose();
                          }}
                          className={cn(
                            "flex items-center justify-between text-left px-4 py-3 text-sm rounded-lg transition-all border",
                            currentRole === role
                              ? "bg-brand-gold/10 border-brand-gold text-foreground font-medium shadow-sm"
                              : "bg-background border-border text-muted hover:border-brand-gold/50 hover:text-foreground"
                          )}
                        >
                          <span className="truncate pr-2" title={role as string}>{role as string}</span>
                          {currentRole === role && <CheckSquare className="w-4 h-4 text-brand-gold shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
