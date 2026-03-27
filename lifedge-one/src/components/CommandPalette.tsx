import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Building2, Briefcase, X, Folder, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockResults = [
  { id: '1', type: 'screen', title: 'Budget Execution Report', icon: FileText, path: '/app/finance' },
  { id: '2', type: 'institution', title: 'Ministry of Health', icon: Building2, path: '/app/admin' },
  { id: '3', type: 'project', title: 'National Highway Expansion', icon: Briefcase, path: '/app/development' },
  { id: '4', type: 'document', title: 'Q3 Financial Statement', icon: Folder, path: '/app/finance' },
];

const recentSearches = [
  'Education Budget 2026',
  'Ministry of Finance',
  'Pending Approvals'
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) {
          // The parent component should handle opening, but we can prevent default here
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = query 
    ? mockResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-muted mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search screens, institutions, projects..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted text-lg"
              />
              <button onClick={onClose} className="p-1 text-muted hover:text-foreground rounded-md hover:bg-foreground/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-2 flex-1">
              {query === '' ? (
                <div className="p-2">
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-2">Recent Searches</h4>
                  {recentSearches.map((search, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setQuery(search)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-foreground/5 rounded-lg transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-muted" />
                      {search}
                    </button>
                  ))}
                  
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mt-6 mb-2 px-2">Favorites</h4>
                  <button onClick={() => handleSelect('/app/finance')} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-foreground/5 rounded-lg transition-colors text-left">
                    <Star className="w-4 h-4 text-brand-gold" />
                    Finance Dashboard
                  </button>
                </div>
              ) : (
                <div className="p-2">
                  {filteredResults.length > 0 ? (
                    <>
                      <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-2">Results</h4>
                      {filteredResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result.path)}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm text-foreground hover:bg-foreground/5 rounded-lg transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-md bg-foreground/5 flex items-center justify-center group-hover:bg-background border border-border transition-colors">
                            <result.icon className="w-4 h-4 text-muted group-hover:text-brand-gold transition-colors" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{result.title}</span>
                            <span className="text-xs text-muted capitalize">{result.type}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="py-12 text-center text-muted">
                      <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p>No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 border-t border-border bg-foreground/5 flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px] font-mono">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px] font-mono">↵</kbd> to select</span>
              </div>
              <span className="flex items-center gap-1"><kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px] font-mono">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
