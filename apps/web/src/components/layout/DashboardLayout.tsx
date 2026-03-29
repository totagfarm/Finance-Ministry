import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { 
  BarChart3, 
  Briefcase, 
  Building2, 
  Calendar, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  ShieldCheck, 
  Users,
  Wallet,
  Globe,
  HandCoins
} from "lucide-react";
import { cn } from "../../lib/utils";

const navigation = [
  { name: 'Executive Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Budget Execution', href: '/app/finance/execution', icon: BarChart3 },
  { name: 'Treasury & Payments', href: '/app/finance/treasury', icon: Wallet },
  { name: 'Strategic Aid', href: '/app/development/aid', icon: Globe },
  { name: 'NGO Oversight', href: '/app/development/ngo', icon: ShieldCheck },
  { name: 'Project Bank', href: '/app/development/projects', icon: Briefcase },
  { name: 'Institutional Registry', href: '/app/institutions', icon: Building2 },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRole = localStorage.getItem('trace-demo-role') || '';
  const currentName = localStorage.getItem('trace-demo-name') || '';

  useEffect(() => {
    // Basic Auth Guard
    if (!currentRole) {
      navigate('/login');
    }
  }, [currentRole, navigate]);

  if (!currentRole) return null;

  return (
    <div className="flex min-h-screen bg-[#07090d] text-slate-200">
      {/* Premium Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 bg-[#0c1017]/80 backdrop-blur-xl sticky top-0 h-screen flex flex-col">
        <div className="p-6 border-b border-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border border-brand-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] shrink-0">
              <img src="/logo.jpg" alt="MFDP Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-black tracking-widest text-[#D4AF37] leading-tight">
                TRA<span className="text-white">CE</span>
              </span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter leading-tight max-w-[140px]">
                Transparent Resource Allocation, Control & Execution
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                  isActive 
                    ? "bg-brand-gold/10 text-brand-gold border-r-2 border-brand-gold" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-brand-gold" : "group-hover:text-brand-gold transition-colors")} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-brand-gold rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <Link to="/app/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0c1017] to-[#07090d]">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/30 flex items-center justify-between px-8 bg-[#0c1017]/40 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Ministry Hub</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#D4AF37] font-medium capitalize">
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-brand-green">LIVE DATA</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-slate-300" />
            </div>
            <div className="hidden lg:flex flex-col text-right">
               <span className="text-[11px] font-black uppercase tracking-widest text-white leading-tight">{currentName}</span>
               <span className="text-[9px] font-bold text-[#D4AF37] uppercase">{currentRole}</span>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet context={{ currentRole, currentName }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
