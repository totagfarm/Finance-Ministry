import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Shield, Database, Bell, Globe, Mail, Key, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../components/ThemeProvider';

export default function SystemSettings() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-foreground">System Settings</h1>
          <p className="text-sm text-muted mt-1">Configure global application parameters and integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-medium hover:bg-brand-gold/90 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                activeTab === tab.id 
                  ? "bg-brand-gold/10 text-brand-gold" 
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6"
          >
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-4">General Settings</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Application Name</label>
                      <input type="text" defaultValue="LIFedge One" className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Fiscal Year Start</label>
                      <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                        <option>January 1st</option>
                        <option>July 1st</option>
                        <option>October 1st</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Default Currency</label>
                    <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                      <option>USD - US Dollar</option>
                      <option>LRD - Liberian Dollar</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">System Language</label>
                    <select className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                      <option>English (US)</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground border-b border-border pb-4">Security Policies</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
                    <div>
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-gold" /> Multi-Factor Authentication (MFA)
                      </h4>
                      <p className="text-xs text-muted mt-1">Require MFA for all administrative accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Password Expiration (Days)</label>
                    <input type="number" defaultValue="90" className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Session Timeout (Minutes)</label>
                    <input type="number" defaultValue="30" className="w-full bg-foreground/5 border border-border rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand-gold transition-colors" />
                  </div>
                </div>
              </div>
            )}

            {/* Placeholders for other tabs */}
            {['database', 'notifications', 'integrations'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Settings className="w-12 h-12 text-muted mb-4 opacity-20" />
                <h3 className="text-lg font-medium text-foreground mb-2">Configuration Pending</h3>
                <p className="text-sm text-muted max-w-md">
                  Settings for {activeTab} are currently being configured for the LIFedge One environment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
