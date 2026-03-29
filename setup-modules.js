const fs = require('fs');
const path = require('path');

const components = [
  { path: 'src/pages/institutions/InstitutionRegistry.tsx', name: 'Institution Registry', desc: 'Manage institutional master data and organization structures.' },
  { path: 'src/pages/finance/AppropriationRegistry.tsx', name: 'Appropriation Registry', desc: 'Stores and controls the officially approved budget allocations.' },
  { path: 'src/pages/finance/RevenueDashboard.tsx', name: 'Revenue Intelligence', desc: 'Forecasting, analysis, and fiscal planning for national revenue.' },
  { path: 'src/pages/oversight/MACRegistry.tsx', name: 'MAC Oversight', desc: 'Monitors Ministries, Agencies, and Commissions as spending entities.' },
  { path: 'src/pages/oversight/SOERegistry.tsx', name: 'SOE Oversight', desc: 'Tracks SOE reporting, subsidies, guarantees, and fiscal exposure.' },
  { path: 'src/pages/macro/MacroDashboard.tsx', name: 'Macroeconomic Modeling', desc: 'Supports national forecasting and fiscal framework policy scenario analysis.' },
  { path: 'src/pages/documents/DocumentCenter.tsx', name: 'Document Management', desc: 'Provides EDMS-style document control and audit support.' },
  { path: 'src/pages/admin/WorkflowEngine.tsx', name: 'Workflow Engine', desc: 'Controls process routing, approvals, rules, and escalation.' }
];

components.forEach(c => {
  const code = `import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function ${c.path.split('/').pop().replace('.tsx', '')}() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-medium text-foreground">${c.name}</h1>
        <p className="text-sm text-muted mt-1">${c.desc}</p>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 text-center"
      >
        <Shield className="w-12 h-12 text-brand-gold mx-auto mb-4 opacity-50" />
        <h2 className="text-lg font-medium text-foreground mb-2">Module Pre-Release</h2>
        <p className="text-muted max-w-md mx-auto">
          The ${c.name} module is currently being provisioned. Features will be activated according to the TRACE platform deployment schedule.
        </p>
      </motion.div>
    </div>
  );
}`;
  fs.mkdirSync(path.dirname(c.path), { recursive: true });
  fs.writeFileSync(c.path, code);
  console.log('Created: ' + c.path);
});
