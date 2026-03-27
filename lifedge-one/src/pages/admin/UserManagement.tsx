import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Key, Search, Filter, Plus, MoreVertical, CheckCircle, XCircle, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

const mockUsers = [
  { id: 'USR-001', name: 'Amara Konneh', email: 'akonneh@mfdp.gov.lr', role: 'Minister', department: 'MFDP', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'USR-002', name: 'Boima Kamara', email: 'bkamara@mfdp.gov.lr', role: 'Deputy Minister', department: 'Fiscal Affairs', status: 'Active', lastLogin: '1 hour ago' },
  { id: 'USR-003', name: 'Tete Antonio', email: 'tantonio@mfdp.gov.lr', role: 'Comptroller General', department: 'CAG', status: 'Active', lastLogin: '3 hours ago' },
  { id: 'USR-004', name: 'Samuel Tweah', email: 'stweah@mfdp.gov.lr', role: 'Budget Director', department: 'Budget', status: 'Inactive', lastLogin: '2 days ago' },
  { id: 'USR-005', name: 'Decontee King-Sackie', email: 'dksackie@lra.gov.lr', role: 'Commissioner General', department: 'LRA', status: 'Active', lastLogin: '5 mins ago' },
];

export default function UserManagement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">User Management</h1>
          <p className="text-sm text-muted mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-9 pr-4 py-2 bg-foreground/5 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors w-64"
            />
          </div>
          <button className="p-2 bg-foreground/5 border border-border rounded-lg text-muted hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {[
          { id: 'users', label: 'Users' },
          { id: 'roles', label: 'Roles & Permissions' },
          { id: 'audit', label: 'Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id ? "text-brand-gold" : "text-muted hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Active Sessions', value: '342', icon: Shield, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                { label: 'Pending Approvals', value: '12', icon: Key, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((kpi, idx) => (
                <div key={idx} className="glass-panel p-4 flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", kpi.bg)}>
                    <kpi.icon className={cn("w-6 h-6", kpi.color)} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">{kpi.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Users Table */}
            <div className="glass-panel overflow-hidden">
              <div className="p-4 border-b border-border bg-foreground/5 flex justify-between items-center">
                <h3 className="font-medium text-sm text-foreground">User Directory</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted uppercase bg-foreground/5 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name / Email</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Last Login</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {mockUsers.map((user, idx) => (
                      <tr key={idx} className="hover:bg-foreground/5 transition-colors cursor-pointer">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {user.email}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-foreground/10 text-foreground text-xs font-medium rounded-md">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted">{user.department}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md inline-flex items-center gap-1",
                            user.status === 'Active' ? "bg-brand-green/20 text-brand-green" : "bg-red-500/20 text-red-500"
                          )}>
                            {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted text-xs">{user.lastLogin}</td>
                        <td className="px-4 py-3 text-right">
                          <button className="p-1 text-muted hover:text-foreground transition-colors rounded-md hover:bg-foreground/10">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'users' && (
          <div className="glass-panel p-12 text-center">
            <p className="text-muted">Content for {activeTab} will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
