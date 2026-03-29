import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function DocumentCenter() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-medium text-foreground">Document Management</h1>
        <p className="text-sm text-muted mt-1">Provides EDMS-style document control and audit support.</p>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 text-center"
      >
        <Shield className="w-12 h-12 text-brand-gold mx-auto mb-4 opacity-50" />
        <h2 className="text-lg font-medium text-foreground mb-2">Module Pre-Release</h2>
        <p className="text-muted max-w-md mx-auto">
          The Document Management module is currently being provisioned. Features will be activated according to the TRACE platform deployment schedule.
        </p>
      </motion.div>
    </div>
  );
}
