import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Plus, Inbox, Bell, User, Calendar, Building2, 
  Home, DollarSign, Globe, Shield, Settings, 
  HelpCircle, FileText, CheckSquare, AlertTriangle, RefreshCw,
  Landmark, ChevronRight, Menu, X, Sun, Moon, LogOut, ChevronRight as ChevronRightIcon,
  Briefcase,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';
import CommandPalette from '../components/CommandPalette';
import WorkQueueDrawer from '../components/WorkQueueDrawer';
import AlertsDrawer from '../components/AlertsDrawer';
import RoleSwitcherModal from '../components/RoleSwitcherModal';
import { Role, ROLE_NAV_MAP, ROLE_CATEGORIES } from '../config/rbac';

export default function GlobalShell() {
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem('trace-demo-role');
    const allValidRoles = Object.values(ROLE_CATEGORIES).flat();
    return allValidRoles.includes(saved as string) 
      ? (saved as Role) 
      : 'Minister of Finance & Development Planning';
  });

  const [currentName, setCurrentName] = useState<string>(
    localStorage.getItem('trace-demo-name') || 'Amara Konneh'
  );
  
  const [activeDrawer, setActiveDrawer] = useState<'context' | 'inbox' | 'alerts' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [openNavExpanded, setOpenNavExpanded] = useState<string>('Overview');
  
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
    localStorage.removeItem('trace-demo-role');
    localStorage.removeItem('trace-demo-name');
    navigate('/');
  };

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    localStorage.setItem('trace-demo-role', role);
    // Dynamic name adjustment purely for demo aesthetic
    if (role.includes('Minister')) setCurrentName('Amara Konneh');
    else if (role.includes('Director')) setCurrentName('David Cole');
    else if (role.includes('Analyst')) setCurrentName('Sarah Doe');
    else setCurrentName('Test User');
  };

  const toggleDrawer = (drawer: 'context' | 'inbox' | 'alerts') => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
  };

  // Generate breadcrumbs based on current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment === 'app' ? 'Home' : segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, path };
  });

  const sidebarSections = ROLE_NAV_MAP[currentRole] || [];

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-brand-gold/30 selection:text-brand-gold transition-colors duration-300">
      
      {/* Left Rail (Desktop) */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-border bg-background/95 backdrop-blur-xl z-30 transition-all duration-300">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white hidden lg:flex items-center justify-center border border-brand-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] shrink-0">
              <img src="/logo.jpg" alt="MFDP Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:flex flex-col justify-center">
              <span className="text-lg font-serif font-semibold tracking-wide text-foreground leading-tight">
                TRA<span className="text-brand-gold">CE</span>
              </span>
              <span className="text-[9px] text-muted font-medium leading-[1.2] max-w-[150px] mt-0.5">
                Transparent Resource Allocation, Control & Execution
              </span>
            </div>
            <div className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-white border border-brand-gold/50 shadow-sm shrink-0">
              <img src="/logo.jpg" alt="MFDP Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-4 px-3 custom-scrollbar">
          {sidebarSections.map((section) => {
            if (!section || !section.items) return null;
            const hasActiveItem = section.items.some(i => location.pathname === i.path || (i.path !== '/app' && location.pathname.startsWith(i.path)));
            const isExpanded = openNavExpanded === section.label || hasActiveItem;

            return (
              <div key={section.label} className="flex flex-col gap-1">
                <button 
                  onClick={() => setOpenNavExpanded(isExpanded ? '' : section.label)}
                  className="w-full flex items-center justify-between px-3 py-2 text-muted hover:text-foreground transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="w-5 h-5 group-hover:text-brand-gold transition-colors" />
                    <span className="hidden lg:block font-medium text-sm text-left">{section.label}</span>
                  </div>
                  <ChevronRightIcon className={cn(
                    "w-4 h-4 hidden lg:block transition-transform duration-200",
                    isExpanded ? "rotate-90" : ""
                  )} />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden hidden lg:block"
                    >
                      <div className="flex flex-col gap-1 pl-10 pr-2 pb-2">
                        {section.items.map(item => {
                          const isItemActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                          return (
                            <Link
                              key={item.label}
                              to={item.path}
                              className={cn(
                                "py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium relative block",
                                isItemActive ? "bg-brand-gold/10 text-brand-gold" : "text-muted hover:bg-foreground/5 hover:text-foreground"
                              )}
                            >
                              {item.label}
                              {isItemActive && (
                                <motion.div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-gold rounded-r-full" layoutId="activeNavSub" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-brand-dark font-bold text-xs uppercase">
                    {currentName.split(' ').map(n => n[0]).join('').substring(0,2)}
                  </div>
                  <span className="text-sm font-medium hidden sm:block text-foreground truncate max-w-[120px]">
                    {currentName}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="px-4 py-4 border-b border-border bg-foreground/5">
                        <p className="text-sm font-semibold text-foreground flex items-center justify-between">
                          {currentName}
                          <span className="px-2 py-0.5 bg-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-wider rounded">
                            Active
                          </span>
                        </p>
                        <p className="text-xs text-brand-gold font-medium mt-1 leading-snug">
                          {currentRole}
                        </p>
                      </div>
                      
                      <div className="p-2 border-b border-border">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsRoleModalOpen(true);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground bg-background hover:bg-brand-gold/10 hover:text-brand-gold font-medium border border-border hover:border-brand-gold/30 rounded-lg transition-all"
                        >
                          <Layers className="w-4 h-4" />
                          Switch Role Context (Demo)
                          <span className="ml-auto text-[10px] bg-foreground/10 px-1.5 py-0.5 rounded text-muted">150+</span>
                        </button>
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
              {/* Features exist... */}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Modals and Drawers */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      <WorkQueueDrawer isOpen={activeDrawer === 'inbox'} onClose={() => setActiveDrawer(null)} />
      <AlertsDrawer isOpen={activeDrawer === 'alerts'} onClose={() => setActiveDrawer(null)} />
      
      {/* 150+ Roles Switcher Modal */}
      <RoleSwitcherModal 
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)} 
        currentRole={currentRole}
        onSelectRole={handleRoleChange} 
      />

    </div>
  );
}
