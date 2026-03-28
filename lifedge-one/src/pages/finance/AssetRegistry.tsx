import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Car, AlertTriangle, ArrowRight, CheckCircle, Database, LayoutTemplate, Link as LinkIcon, Building } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../components/ThemeProvider';

const mockAssetComposition = [
  { name: 'Buildings & Land', value: 850000000, color: '#D4AF37' },
  { name: 'Vehicle Fleet', value: 45000000, color: '#3b82f6' },
  { name: 'IT Infrastructure', value: 12000000, color: '#1E4D2B' },
  { name: 'Heavy Machinery', value: 38000000, color: '#f97316' },
];

export default function AssetRegistry() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-purple-500 uppercase tracking-wider">Module 13 / Fixed Assets</span>
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground">National Asset Registry</h1>
          <p className="text-sm text-muted mt-1">Lifecycle tracking, depreciation, and custody management of physical assets</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Capital Assets', value: '$945.0M', target: 'Acquisition Value', icon: Building, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Registered Vehicles', value: '4,215', target: 'State Fleet', icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Write-offs Pending', value: '112', target: 'Requires Auction', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Verification Rate', value: '88%', target: 'Annual Audit 2026', icon: CheckCircle, color: 'text-brand-green', bg: 'bg-brand-green/10' },
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg", kpi.bg)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-light text-foreground mb-1">{kpi.value}</h3>
              <p className="text-sm font-medium text-muted">{kpi.label}</p>
              <p className="text-xs font-medium text-muted mt-2">{kpi.target}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Asset Composition */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1 glass-panel p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Database className="w-5 h-5 text-brand-gold" /> Registry Composition
            </h3>
          </div>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAssetComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockAssetComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1A1A' : '#fff', border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`, borderRadius: '8px', color: isDark ? '#fff' : '#000' }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {mockAssetComposition.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="text-sm font-medium text-foreground">${(item.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col min-h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-foreground font-serif flex items-center gap-2">
              <Car className="w-5 h-5 text-purple-500" /> Active Fleet Registry Matrix
            </h3>
            <Link to="/app/finance/assets/new" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(168,85,247,0.3)]">
              Register Asset <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
           <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Tag ID</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Assigned To (MAC)</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                  <th className="px-4 py-3 font-medium">Acquired (Net Book)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                   { tag: 'GOL-V-0044', desc: 'Toyota LandCruiser V8', mac: 'Ministry of Finance', cond: 'Excellent', val: '$85,000 (2024)' },
                   { tag: 'GOL-V-1092', desc: 'Ford Ranger XLT', mac: 'Ministry of Agriculture', cond: 'Good', val: '$32,000 (2022)' },
                   { tag: 'GOL-IT-099', desc: 'HP ProLiant Server Stack', mac: 'LRA Data Center', cond: 'Fair', val: '$45,000 (2021)' },
                   { tag: 'GOL-R-012', desc: 'Ministerial Complex (Congo Town)', mac: 'General Services', cond: 'Excellent', val: '$45,000,000 (2018)' },
                   { tag: 'GOL-V-0012', desc: 'Nissan Patrol', mac: 'Ministry of Defense', cond: 'Poor (GSA Auction)', val: '$5,000 (2015)' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-xs text-brand-gold">{row.tag}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{row.desc}</td>
                    <td className="px-4 py-3">{row.mac}</td>
                    <td className="px-4 py-3 text-xs">
                       <span className={cn(
                         "px-2 py-1 rounded",
                         row.cond.includes('Excellent') ? "bg-brand-green/10 text-brand-green" : 
                         row.cond.includes('Auction') ? "bg-red-500/10 text-red-500" :
                         "bg-blue-500/10 text-blue-500"
                       )}>{row.cond}</span>
                    </td>
                    <td className="px-4 py-3 text-right">{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
