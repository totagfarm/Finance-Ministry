import React from 'react';
import { motion } from 'motion/react';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, 
  AlertCircle, CheckCircle2, Clock, FileText, ArrowRight, Inbox,
  Users, ShieldAlert, Server, Globe
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';

// --- Mock Data ---
const mockExecutionData = [
  { month: 'Jul', budget: 100, actual: 80 },
  { month: 'Aug', budget: 100, actual: 95 },
  { month: 'Sep', budget: 100, actual: 110 },
  { month: 'Oct', budget: 100, actual: 85 },
  { month: 'Nov', budget: 100, actual: 90 },
  { month: 'Dec', budget: 100, actual: 105 },
];

const mockSectorData = [
  { name: 'Education', value: 450 },
  { name: 'Health', value: 380 },
  { name: 'Infrastructure', value: 620 },
  { name: 'Defense', value: 290 },
  { name: 'Agriculture', value: 150 },
];

const StatCard = ({ title, value, trend, trendValue, icon: Icon, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel p-6 relative overflow-hidden group"
  >
    <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40", colorClass)} />
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="p-2 bg-foreground/5 rounded-lg border border-border">
        <Icon className="w-5 h-5 text-muted" />
      </div>
      {trend === 'up' ? (
        <span className="flex items-center gap-1 text-xs font-medium text-green-500 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
          <TrendingUp className="w-3 h-3" /> {trendValue}
        </span>
      ) : trend === 'down' ? (
        <span className="flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
          <TrendingDown className="w-3 h-3" /> {trendValue}
        </span>
      ) : null}
    </div>
    
    <div className="relative z-10">
      <h4 className="text-sm font-medium text-muted mb-1">{title}</h4>
      <p className="text-3xl font-serif font-semibold text-foreground tracking-tight">{value}</p>
    </div>
  </motion.div>
);

export default function DashboardOverview() {
  const { theme } = useTheme();
  const { currentRole } = useOutletContext<{ currentRole: string }>();
  
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const tooltipBg = isDark ? '#1A1A1A' : '#FFFFFF';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const axisColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // --- Role-Specific Configurations ---
  
  const getHeaderInfo = () => {
    switch(currentRole) {
      case 'Budget Officer': return { title: 'Budget Execution', desc: 'Manage allotments, virements, and track departmental spending.' };
      case 'Aid Coordinator': return { title: 'External Assistance', desc: 'Monitor donor pledges, disbursements, and NGO activities.' };
      case 'Auditor': return { title: 'Compliance & Audit', desc: 'Review high-risk transactions, reconciliations, and audit trails.' };
      case 'System Admin': return { title: 'System Health', desc: 'Monitor platform performance, integrations, and user access.' };
      default: return { title: 'Executive Overview', desc: 'National fiscal health and development delivery status for FY 2026/27.' };
    }
  };

  const getStats = () => {
    switch(currentRole) {
      case 'Budget Officer': return [
        { title: "Total Budget", value: "$1.24B", trend: "up", trendValue: "+5.2%", icon: DollarSign, colorClass: "bg-brand-gold" },
        { title: "Allotments Issued", value: "$845M", trend: "up", trendValue: "+12.4%", icon: Activity, colorClass: "bg-brand-green" },
        { title: "Pending Requests", value: "42", trend: "down", trendValue: "-5", icon: Clock, colorClass: "bg-blue-500" },
        { title: "Available Balance", value: "$395M", trend: "down", trendValue: "-2.1%", icon: CheckCircle2, colorClass: "bg-emerald-500" },
      ];
      case 'Aid Coordinator': return [
        { title: "Total Pledges", value: "$450M", trend: "up", trendValue: "+8.1%", icon: Globe, colorClass: "bg-brand-gold" },
        { title: "Active Projects", value: "124", trend: "up", trendValue: "+12", icon: Activity, colorClass: "bg-brand-green" },
        { title: "Disbursements", value: "$180M", trend: "up", trendValue: "+15.4%", icon: DollarSign, colorClass: "bg-blue-500" },
        { title: "NGO Accreditations", value: "8", trend: "down", trendValue: "-2", icon: Users, colorClass: "bg-emerald-500" },
      ];
      case 'Auditor': return [
        { title: "Audits Pending", value: "15", trend: "down", trendValue: "-3", icon: Clock, colorClass: "bg-brand-gold" },
        { title: "Exceptions Found", value: "142", trend: "up", trendValue: "+12%", icon: ShieldAlert, colorClass: "bg-red-500" },
        { title: "Reconciled Accounts", value: "89%", trend: "up", trendValue: "+2.1%", icon: CheckCircle2, colorClass: "bg-brand-green" },
        { title: "High Risk Tx", value: "24", trend: "down", trendValue: "-5%", icon: AlertCircle, colorClass: "bg-orange-500" },
      ];
      case 'System Admin': return [
        { title: "Active Users", value: "1,245", trend: "up", trendValue: "+45", icon: Users, colorClass: "bg-brand-gold" },
        { title: "API Requests", value: "45.2k", trend: "up", trendValue: "+12%", icon: Activity, colorClass: "bg-brand-green" },
        { title: "Error Rate", value: "0.02%", trend: "down", trendValue: "-0.01%", icon: ShieldAlert, colorClass: "bg-emerald-500" },
        { title: "System Uptime", value: "99.99%", trend: "up", trendValue: "+0.01%", icon: Server, colorClass: "bg-blue-500" },
      ];
      default: return [
        { title: "Total Appropriation", value: "$1.24B", trend: "up", trendValue: "+5.2%", icon: DollarSign, colorClass: "bg-brand-gold" },
        { title: "Allotments Released", value: "$845M", trend: "up", trendValue: "+12.4%", icon: Activity, colorClass: "bg-brand-green" },
        { title: "Active Commitments", value: "$320M", trend: "down", trendValue: "-2.1%", icon: Clock, colorClass: "bg-blue-500" },
        { title: "EFT Payments Settled", value: "$410M", trend: "up", trendValue: "+8.7%", icon: CheckCircle2, colorClass: "bg-emerald-500" },
      ];
    }
  };

  const getWorkQueue = () => {
    switch(currentRole) {
      case 'Budget Officer': return [
        { id: 'ALR-2026-0015', type: 'Allotment Request', entity: 'Min. of Health', amount: '$250,000.00', status: 'Review Pending', time: '2h ago', urgent: true },
        { id: 'VIR-2026-0042', type: 'Virement', entity: 'Min. of Education', amount: '$50,000.00', status: 'Approval Required', time: '4h ago', urgent: false },
        { id: 'ALR-2026-0016', type: 'Allotment Request', entity: 'Min. of Defense', amount: '$850,000.00', status: 'Review Pending', time: '1d ago', urgent: true },
      ];
      case 'Aid Coordinator': return [
        { id: 'PRJ-2026-0112', type: 'Project Approval', entity: 'USAID', amount: '$5,000,000.00', status: 'Review Pending', time: '2h ago', urgent: true },
        { id: 'NGO-2026-0044', type: 'NGO Accreditation', entity: 'Save the Children', amount: '-', status: 'Clearance Required', time: '1d ago', urgent: false },
        { id: 'DIS-2026-0089', type: 'Disbursement', entity: 'World Bank', amount: '$12,500,000.00', status: 'Verification', time: '2d ago', urgent: false },
      ];
      case 'Auditor': return [
        { id: 'PV-2026-0892', type: 'Payment Voucher', entity: 'Min. of Education', amount: '$120,500.00', status: 'Audit Review', time: '4h ago', urgent: true },
        { id: 'REC-2026-0045', type: 'Reconciliation', entity: 'Central Bank', amount: '-', status: 'Mismatch Investigation', time: '1d ago', urgent: false },
        { id: 'AUD-2026-0012', type: 'Internal Audit', entity: 'Min. of Health', amount: '-', status: 'Fieldwork', time: '3d ago', urgent: false },
      ];
      case 'System Admin': return [
        { id: 'REQ-2026-0115', type: 'Access Request', entity: 'Min. of Finance', amount: '-', status: 'Approval Pending', time: '1h ago', urgent: true },
        { id: 'INT-2026-0042', type: 'Integration Error', entity: 'CS-DRMS', amount: '-', status: 'Investigation', time: '3h ago', urgent: false },
        { id: 'REQ-2026-0116', type: 'Role Change', entity: 'Min. of Health', amount: '-', status: 'Approval Pending', time: '1d ago', urgent: false },
      ];
      default: return [
        { id: 'ALR-2026-0015', type: 'Allotment Request', entity: 'Min. of Health', amount: '$250,000.00', status: 'Validation Pending', time: '2h ago', urgent: true },
        { id: 'PV-2026-0892', type: 'Payment Voucher', entity: 'Min. of Education', amount: '$120,500.00', status: 'Treasury Review', time: '4h ago', urgent: false },
        { id: 'NGO-2026-044', type: 'NGO Accreditation', entity: 'Save the Children', amount: '-', status: 'Sector Clearance', time: '1d ago', urgent: false },
        { id: 'ALR-2026-0012', type: 'Allotment Request', entity: 'Min. of Defense', amount: '$850,000.00', status: 'Override Pending', time: '1d ago', urgent: true },
      ];
    }
  };

  const getAlerts = () => {
    switch(currentRole) {
      case 'Budget Officer': return [
        { title: 'Appropriation Overrun Warning', desc: 'Min. of Infrastructure approaching 95% of Q2 capital allocation.', type: 'warning', time: '2h ago' },
        { title: 'Allotment Delay', desc: '3 requests pending for > 48 hours.', type: 'info', time: '5h ago' },
      ];
      case 'Aid Coordinator': return [
        { title: 'Disbursement Delay', desc: 'Expected funds from EU grant #EU-092 delayed by 5 days.', type: 'warning', time: '1d ago' },
        { title: 'NGO Report Missing', desc: 'Action Against Hunger Q3 report overdue.', type: 'info', time: '2d ago' },
      ];
      case 'Auditor': return [
        { title: 'Reconciliation Mismatch', desc: 'Bank statement import #BS-044 shows $12,500 variance vs IFMIS ledger.', type: 'critical', time: '5h ago' },
        { title: 'Suspicious Activity', desc: 'Multiple failed login attempts for user ID 492.', type: 'warning', time: '1d ago' },
      ];
      case 'System Admin': return [
        { title: 'EFT Sync Failure', desc: 'Connection timeout with Central Bank gateway during batch PV-BATCH-092.', type: 'critical', time: '15m ago' },
        { title: 'High CPU Usage', desc: 'Database server CPU > 90% for 10 minutes.', type: 'warning', time: '1h ago' },
        { title: 'CS-DRMS Integration', desc: 'Scheduled debt portfolio sync completed with 2 minor mapping warnings.', type: 'info', time: '1d ago' },
      ];
      default: return [
        { title: 'EFT Sync Failure', desc: 'Connection timeout with Central Bank gateway during batch PV-BATCH-092.', type: 'critical', time: '15m ago' },
        { title: 'Appropriation Overrun Warning', desc: 'Min. of Infrastructure approaching 95% of Q2 capital allocation.', type: 'warning', time: '2h ago' },
        { title: 'Reconciliation Mismatch', desc: 'Bank statement import #BS-044 shows $12,500 variance vs IFMIS ledger.', type: 'warning', time: '5h ago' },
        { title: 'CS-DRMS Integration', desc: 'Scheduled debt portfolio sync completed with 2 minor mapping warnings.', type: 'info', time: '1d ago' },
      ];
    }
  };

  const getPipeline = () => {
    switch(currentRole) {
      case 'Budget Officer': return [
        { id: 'ALR-2026-0014', title: 'Allotment: Min. of Health', status: 'Approved', step: 4, totalSteps: 4, time: '1h ago' },
        { id: 'VIR-2026-0041', title: 'Virement: Min. of Education', status: 'Processing', step: 2, totalSteps: 3, time: '3h ago' },
        { id: 'ALR-2026-0013', title: 'Allotment: Min. of Defense', status: 'Completed', step: 4, totalSteps: 4, time: '1d ago' },
      ];
      case 'Aid Coordinator': return [
        { id: 'PRJ-2026-0111', title: 'Project: USAID Health', status: 'Active', step: 5, totalSteps: 5, time: '2h ago' },
        { id: 'DIS-2026-0088', title: 'Disbursement: World Bank', status: 'Processing', step: 2, totalSteps: 4, time: '5h ago' },
        { id: 'NGO-2026-0043', title: 'Accreditation: Oxfam', status: 'Approved', step: 3, totalSteps: 3, time: '1d ago' },
      ];
      case 'Auditor': return [
        { id: 'AUD-2026-0011', title: 'Audit: Min. of Education', status: 'Report Drafted', step: 3, totalSteps: 4, time: '1h ago' },
        { id: 'REC-2026-0044', title: 'Reconciliation: Q2', status: 'Completed', step: 3, totalSteps: 3, time: '4h ago' },
        { id: 'PV-2026-0891', title: 'Voucher Review: MoH', status: 'Approved', step: 2, totalSteps: 2, time: '1d ago' },
      ];
      case 'System Admin': return [
        { id: 'BKP-2026-099', title: 'Database Backup', status: 'Completed', step: 3, totalSteps: 3, time: '1h ago' },
        { id: 'MIG-2026-002', title: 'Data Migration', status: 'In Progress', step: 2, totalSteps: 5, time: '3h ago' },
        { id: 'REQ-2026-0114', title: 'Access Provisioning', status: 'Completed', step: 2, totalSteps: 2, time: '1d ago' },
      ];
      default: return [
        { id: 'ALR-2026-0014', title: 'Allotment: Min. of Health', status: 'Approved', step: 4, totalSteps: 4, time: '1h ago' },
        { id: 'PV-2026-0891', title: 'Payment: Min. of Education', status: 'Settled', step: 5, totalSteps: 5, time: '3h ago' },
        { id: 'PRJ-2026-0111', title: 'Project: USAID Health', status: 'Active', step: 5, totalSteps: 5, time: '1d ago' },
      ];
    }
  };

  const getTools = () => {
    switch(currentRole) {
      case 'Budget Officer': return ['Allotment Generator', 'Virement Request Form', 'Budget Execution Report', 'Departmental Spending Analysis'];
      case 'Aid Coordinator': return ['Donor Pledge Tracker', 'Disbursement Request', 'NGO Accreditation Portal', 'Project Impact Dashboard'];
      case 'Auditor': return ['Voucher Sampling Tool', 'Reconciliation Engine', 'Risk Assessment Matrix', 'Audit Report Generator'];
      case 'System Admin': return ['User Management', 'Role Configuration', 'System Logs Viewer', 'Integration Dashboard'];
      default: return ['Executive Summary Report', 'National Budget Dashboard', 'Macroeconomic Indicators', 'Policy Document Repository'];
    }
  };

  const headerInfo = getHeaderInfo();
  const stats = getStats();
  const workQueue = getWorkQueue();
  const alerts = getAlerts();
  const pipeline = getPipeline();
  const tools = getTools();

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-2">
            {headerInfo.title}
          </h1>
          <p className="text-sm text-muted">
            {headerInfo.desc}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground bg-foreground/5 border border-border rounded-lg hover:bg-foreground/10 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Export Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-brand-dark bg-brand-gold rounded-lg hover:bg-brand-gold-dark transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            {currentRole === 'Minister' ? 'New Allotment Request' : 'New Action'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {currentRole === 'System Admin' ? 'System Load' : 
                 currentRole === 'Aid Coordinator' ? 'Donor Contributions' : 
                 currentRole === 'Auditor' ? 'Exception Trends' : 'Budget vs Execution'}
              </h3>
              <p className="text-xs text-muted">Monthly trend</p>
            </div>
            <select 
              className="bg-foreground/5 border border-border text-foreground text-xs rounded-md px-3 py-1.5 outline-none focus:border-brand-gold/50"
              aria-label="Select timeframe"
            >
              <option>Last 6 Months</option>
              <option>FY 2026/27</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockExecutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E4D2B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E4D2B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => currentRole === 'System Admin' ? `${val}%` : `$${val}M`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: isDark ? '#fff' : '#000' }}
                />
                <Area type="monotone" dataKey="budget" name={currentRole === 'System Admin' ? 'CPU Usage' : 'Planned'} stroke="#1E4D2B" strokeWidth={2} fillOpacity={1} fill="url(#colorBudget)" />
                <Area type="monotone" dataKey="actual" name={currentRole === 'System Admin' ? 'Memory Usage' : 'Actual'} stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">
              {currentRole === 'System Admin' ? 'API Errors by Endpoint' : 
               currentRole === 'Aid Coordinator' ? 'Funding by Sector' : 
               currentRole === 'Auditor' ? 'Exceptions by Dept' : 'Top Sector Allocations'}
            </h3>
            <p className="text-xs text-muted">{currentRole === 'System Admin' || currentRole === 'Auditor' ? 'Count' : 'Millions USD'}</p>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSectorData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} width={80} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', fontSize: '12px', color: isDark ? '#fff' : '#000' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {mockSectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#D4AF37' : index === 1 ? '#1E4D2B' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Work Queue */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-0 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-foreground/[0.02]">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Inbox className="w-5 h-5 text-brand-gold" /> My Work Queue
            </h3>
            <span className="text-xs font-medium bg-brand-gold/20 text-brand-gold px-2 py-1 rounded-full">{workQueue.length} Pending</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {workQueue.map((item, idx) => (
              <div key={idx} className="p-4 border-b border-border hover:bg-foreground/5 transition-colors flex items-center justify-between group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={cn("w-2 h-2 rounded-full mt-2", item.urgent ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-brand-gold")}></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{item.id}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted border border-border px-1.5 rounded">{item.type}</span>
                    </div>
                    <p className="text-xs text-muted">{item.entity} &bull; {item.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium text-foreground/80">{item.status}</p>
                    <p className="text-[10px] text-muted">{item.time}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand-gold transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border bg-foreground/[0.01] text-center">
            <button className="text-xs text-brand-gold hover:text-brand-gold-dark font-medium transition-colors">View All Tasks</button>
          </div>
        </motion.div>

        {/* Alerts & Exceptions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-0 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-border flex justify-between items-center bg-foreground/[0.02]">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" /> Alerts & Exceptions
            </h3>
            <span className="text-xs font-medium bg-red-500/20 text-red-500 dark:text-red-400 px-2 py-1 rounded-full">
              {alerts.filter(a => a.type === 'critical').length} Critical
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] p-4 flex flex-col gap-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className={cn(
                "p-4 rounded-xl border flex gap-4 items-start",
                alert.type === 'critical' ? "bg-red-500/5 border-red-500/20" : 
                alert.type === 'warning' ? "bg-yellow-500/5 border-yellow-500/20" : 
                "bg-blue-500/5 border-blue-500/20"
              )}>
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  alert.type === 'critical' ? "bg-red-500/10 text-red-500 dark:text-red-400" : 
                  alert.type === 'warning' ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : 
                  "bg-blue-500/10 text-blue-500 dark:text-blue-400"
                )}>
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-foreground/90">{alert.title}</h4>
                    <span className="text-[10px] text-muted whitespace-nowrap ml-2">{alert.time}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Pipeline & Tools */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel p-6 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">Progress Pipeline</h3>
            <p className="text-xs text-muted">Status of recently executed tasks</p>
          </div>
          <div className="flex flex-col gap-4">
            {pipeline.map((item, idx) => (
              <div key={idx} className="p-4 border border-border rounded-xl bg-foreground/[0.02]">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted">{item.id}</span>
                    <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                  </div>
                  <span className="text-xs text-muted">{item.time}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-gold transition-all duration-500"
                      style={{ width: `${(item.step / item.totalSteps) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground/80 w-24 text-right">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground">Available Tools</h3>
            <p className="text-xs text-muted">Quick links based on your role</p>
          </div>
          <div className="flex flex-col gap-3">
            {tools.map((tool, idx) => (
              <button 
                key={idx}
                className="w-full text-left p-3 rounded-lg border border-border bg-foreground/[0.02] hover:bg-foreground/5 hover:border-brand-gold/30 transition-all flex items-center justify-between group"
              >
                <span className="text-sm font-medium text-foreground/90">{tool}</span>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-brand-gold transition-colors" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
