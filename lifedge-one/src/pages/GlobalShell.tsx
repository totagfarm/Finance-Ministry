import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Plus, Inbox, Bell, User, Calendar, Building2, 
  Home, DollarSign, Globe, Shield, Settings, 
  HelpCircle, FileText, CheckSquare, AlertTriangle, RefreshCw,
  Landmark, ChevronRight, Menu, X, Sun, Moon, LogOut, ChevronRight as ChevronRightIcon,
  Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';
import CommandPalette from '../components/CommandPalette';
import WorkQueueDrawer from '../components/WorkQueueDrawer';
import AlertsDrawer from '../components/AlertsDrawer';

type Role = 'Minister' | 'Budget Officer' | 'Aid Coordinator' | 'Auditor' | 'System Admin';

const roleNavMap: Record<Role, { icon: any, label: string, path: string }[]> = {
  'Minister': [
    { icon: Home, label: 'Executive Dashboard', path: '/app' },
    { icon: DollarSign, label: 'Finance', path: '/app/finance' },
    { icon: Globe, label: 'Development', path: '/app/development' },
    { icon: Shield, label: 'Oversight', path: '/app/oversight' },
    { icon: Settings, label: 'Administration', path: '/app/admin' },
  ],
  'Budget Officer': [
    { icon: Home, label: 'My Workspace', path: '/app' },
    { icon: DollarSign, label: 'Budget & Allotments', path: '/app/finance' },
    { icon: FileText, label: 'Reports', path: '/app/reports' },
  ],
  'Aid Coordinator': [
    { icon: Home, label: 'My Workspace', path: '/app' },
    { icon: Globe, label: 'Aid & Projects', path: '/app/development' },
    { icon: FileText, label: 'Reports', path: '/app/reports' },
  ],
  'Auditor': [
    { icon: Home, label: 'My Workspace', path: '/app' },
    { icon: Shield, label: 'Audits & Compliance', path: '/app/oversight' },
    { icon: FileText, label: 'Reports', path: '/app/reports' },
  ],
  'System Admin': [
    { icon: Home, label: 'System Status', path: '/app' },
    { icon: Settings, label: 'Administration', path: '/app/admin' },
  ],
};

export default function GlobalShell() {
  const [currentRole, setCurrentRole] = useState<Role>(
    (localStorage.getItem('lifedge-demo-role') as Role) || 'Minister'
  );
  const [currentName, setCurrentName] = useState<string>(
    localStorage.getItem('lifedge-demo-name') || 'Amara Konneh'
  );
  const [activeDrawer, setActiveDrawer] = useState<'context' | 'inbox' | 'alerts' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('lifedge-demo-role');
    localStorage.removeItem('lifedge-demo-name');
    navigate('/');
  };

  const toggleDrawer = (drawer: 'context' | 'inbox' | 'alerts') => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
  };

  // Generate breadcrumbs based on current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment === 'app' ? 'Home' : segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, path };
  });

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-brand-gold/30 selection:text-brand-gold transition-colors duration-300">
      
      {/* Left Rail (Desktop) */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-border bg-background/95 backdrop-blur-xl z-30 transition-all duration-300">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center border border-brand-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              <Landmark className="text-brand-gold w-4 h-4" />
            </div>
            <span className="hidden lg:block text-lg font-serif font-semibold tracking-wide text-foreground">
              LIFEDge<span className="text-brand-gold">One</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          {roleNavMap[currentRole].map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive ? "bg-brand-gold/10 text-brand-gold" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                )}
                title={item.label}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-brand-gold" : "text-muted group-hover:text-foreground")} />
                <span className="hidden lg:block font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div className="absolute left-0 w-1 h-6 bg-brand-gold rounded-r-full" layoutId="activeNav" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-background/90 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 z-20 transition-colors duration-300">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden p-2 text-muted hover:text-foreground" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu">
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Global Search */}
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-full w-full max-w-md hover:border-brand-gold/50 hover:bg-foreground/10 transition-all text-left"
            >
              <Search className="w-4 h-4 text-muted" />
              <span className="text-sm text-muted flex-1">Search appropriations, allotments, projects...</span>
              <div className="flex items-center gap-1 text-[10px] text-muted font-mono border border-border px-1.5 rounded">
                <span>⌘</span><span>K</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            {/* Context Selectors */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-medium border-r border-border pr-6">
              <div className="flex items-center gap-2 text-muted bg-foreground/5 px-3 py-1.5 rounded-full border border-border cursor-pointer hover:bg-foreground/10 transition-colors">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                FY 2026/27
              </div>
              <div className="flex items-center gap-2 text-muted bg-foreground/5 px-3 py-1.5 rounded-full border border-border cursor-pointer hover:bg-foreground/10 transition-colors">
                <Building2 className="w-3.5 h-3.5 text-brand-green" />
                MFDP - Budget Dept
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors"
                title="Toggle theme"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors relative" title="Quick Create" aria-label="Quick Create">
                <Plus className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors relative" 
                title="Approval Inbox" 
                aria-label="Approval Inbox"
                onClick={() => toggleDrawer('inbox')}
              >
                <Inbox className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold rounded-full border border-background"></span>
              </button>
              <button 
                className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors relative" 
                title="Notifications" 
                aria-label="Notifications"
                onClick={() => toggleDrawer('alerts')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
              </button>
              <button 
                className="p-2 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors md:hidden" 
                onClick={() => toggleDrawer('context')}
                aria-label="Help and Context"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-border hover:bg-foreground/5 transition-colors"
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-brand-dark font-bold text-xs">
                    AK
                  </div>
                  <span className="text-sm font-medium hidden sm:block text-foreground">A. Konneh</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{currentName}</p>
                        <p className="text-xs text-muted">
                          {currentRole === 'Minister' ? 'minister@mfdp.gov.lr' : 
                           currentRole === 'Budget Officer' ? 'budget@mfdp.gov.lr' : 
                           currentRole === 'Aid Coordinator' ? 'aid@mfdp.gov.lr' : 
                           currentRole === 'Auditor' ? 'audit@mfdp.gov.lr' : 'admin@lifedge.gov.lr'}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-brand-gold/20 text-brand-gold text-[10px] font-medium uppercase tracking-wider rounded">
                            {currentRole}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-2 border-b border-border">
                        <p className="px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">Switch Role (Demo)</p>
                        {(Object.keys(roleNavMap) as Role[]).map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              setCurrentRole(role);
                              const newName = role === 'Minister' ? 'Amara Konneh' :
                                              role === 'Budget Officer' ? 'Sarah Doe' :
                                              role === 'Aid Coordinator' ? 'John Smith' :
                                              role === 'Auditor' ? 'Jane Doe' : 'Admin User';
                              setCurrentName(newName);
                              localStorage.setItem('lifedge-demo-role', role);
                              localStorage.setItem('lifedge-demo-name', newName);
                              setIsUserMenuOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between",
                              currentRole === role ? "bg-foreground/10 text-foreground" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                            )}
                          >
                            {role}
                            {currentRole === role && <CheckSquare className="w-4 h-4 text-brand-gold" />}
                          </button>
                        ))}
                      </div>

                      <div className="p-2">
                        <Link to="/app/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors">
                          <User className="w-4 h-4" /> Profile Settings
                        </Link>
                        <button 
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
          {/* Breadcrumb Header */}
          <div className="px-4 lg:px-8 py-4 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
            <nav className="flex items-center text-sm text-muted font-medium">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path}>
                  {idx > 0 && <ChevronRightIcon className="w-4 h-4 mx-2 opacity-50" />}
                  <Link 
                    to={crumb.path}
                    className={cn(
                      "hover:text-foreground transition-colors",
                      idx === breadcrumbs.length - 1 ? "text-foreground" : ""
                    )}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Ambient background glow for main content */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none z-0" />
          
          <div className="relative z-10 h-full p-4 lg:p-8 pt-4">
            <Outlet context={{ currentRole }} />
          </div>
        </main>

        {/* Footer Utility Strip */}
        <footer className="h-8 border-t border-border bg-background flex items-center justify-between px-4 text-[10px] text-muted font-mono z-20 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              PROD ENV
            </span>
            <span className="hidden sm:inline">IFMIS Sync: 2 mins ago</span>
            <span className="hidden sm:inline">EFT Sync: 5 mins ago</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Session: 45m remaining</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-brand-gold/50" />
              Audit Active
            </span>
          </div>
        </footer>
      </div>

      {/* Right Drawer (Contextual) */}
      <AnimatePresence>
        {activeDrawer === 'context' && (
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 border-l border-border bg-background/95 backdrop-blur-2xl z-40 shadow-2xl flex flex-col"
          >
            <div className="h-16 border-b border-border flex items-center justify-between px-6">
              <h3 className="font-medium text-sm text-foreground">Contextual Actions</h3>
              <button className="p-2 text-muted hover:text-foreground" onClick={() => setActiveDrawer(null)} aria-label="Close drawer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {/* Contextual Help */}
              <section>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5" /> Help & Guides
                </h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-sm text-brand-gold hover:underline">Budget Formulation Guidelines FY26</a>
                  <a href="#" className="text-sm text-muted hover:text-foreground">How to request an allotment override</a>
                </div>
              </section>

              {/* Linked Docs */}
              <section>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Linked Documents
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="glass-panel p-3 !rounded-lg flex items-start gap-3 hover:bg-foreground/5 cursor-pointer transition-colors">
                    <div className="p-2 bg-foreground/5 rounded">
                      <FileText className="w-4 h-4 text-muted" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Appropriation Act 2026.pdf</p>
                      <p className="text-xs text-muted">Added 2 days ago</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Related Approvals */}
              <section>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5" /> Pending Approvals
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="glass-panel p-3 !rounded-lg border-l-2 border-l-brand-gold flex flex-col gap-2">
                    <p className="text-xs text-muted">Allotment Request <span className="text-foreground">ALR-2026-0015</span></p>
                    <p className="text-sm font-medium text-foreground">$250,000.00 - Min. of Health</p>
                    <button className="text-xs text-brand-gold font-medium hover:underline self-start mt-1">Review &gt;</button>
                  </div>
                </div>
              </section>

              {/* Sync Status */}
              <section>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5" /> Integration Status
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">IFMIS Core</span>
                    <span className="text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">CS-DRMS (Debt)</span>
                    <span className="text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">EFT Gateway</span>
                    <span className="text-yellow-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Syncing</span>
                  </div>
                </div>
              </section>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Right Drawer Toggle */}
      <button 
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 bg-background border border-r-0 border-border p-1.5 rounded-l-md text-muted hover:text-foreground hover:bg-foreground/5 transition-colors z-30"
        onClick={() => toggleDrawer('context')}
        aria-label={activeDrawer === 'context' ? "Close context drawer" : "Open context drawer"}
      >
        <ChevronRight className={cn("w-4 h-4 transition-transform", activeDrawer === 'context' ? "rotate-180" : "")} />
      </button>

      {/* Modals and Drawers */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      <WorkQueueDrawer isOpen={activeDrawer === 'inbox'} onClose={() => setActiveDrawer(null)} />
      <AlertsDrawer isOpen={activeDrawer === 'alerts'} onClose={() => setActiveDrawer(null)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden flex"
          >
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-64 bg-background border-r border-border h-full flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                <span className="text-lg font-serif font-semibold tracking-wide text-foreground">
                  LIFEDge<span className="text-brand-gold">One</span>
                </span>
                <button className="p-2 text-muted hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close mobile menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
                {roleNavMap[currentRole].map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200",
                        isActive ? "bg-brand-gold/10 text-brand-gold" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
