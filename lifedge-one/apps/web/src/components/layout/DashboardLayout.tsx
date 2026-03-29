import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div className="flex min-h-screen bg-[#07090d] text-slate-200">
      {/* Premium Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 bg-[#0c1017]/80 backdrop-blur-xl sticky top-0 h-screen flex flex-col">
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <span className="font-bold text-white text-xl">T</span>
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">TRACE</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Finance Ministry</p>
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
                    ? "bg-brand-blue/10 text-brand-blue" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-brand-blue" : "group-hover:text-white")} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-brand-blue rounded-r-full"
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
            <span className="text-white font-medium capitalize">
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-brand-green">LIVE DATA</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-300" />
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
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
