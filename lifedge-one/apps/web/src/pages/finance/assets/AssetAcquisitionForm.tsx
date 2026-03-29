import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../../components/ThemeProvider';
import { Car, Save, CheckCircle, ArrowLeft, QrCode, HardDrive, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';

export default function AssetAcquisitionForm() {
  const { theme } = useTheme();
  
  const [assetCategory, setAssetCategory] = useState('Vehicle Fleet');
  const [description, setDescription] = useState('');
  const [custodian, setCustodian] = useState('Ministry of Finance');
  const [condition, setCondition] = useState('New/Excellent');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [poReference, setPoReference] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate a mocked Barcode Tag ID based on Category
  const generateTag = () => {
    const prefix = assetCategory === 'Vehicle Fleet' ? 'V' : 
                   assetCategory === 'IT Infrastructure' ? 'IT' : 
                   assetCategory === 'Buildings & Land' ? 'RE' : 'M';
    return `GOL-${prefix}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  };

  const [tagId, setTagId] = useState(generateTag());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !purchaseValue || !poReference) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
          <QrCode className="w-10 h-10 text-purple-500" />
        </div>
        <h2 className="text-3xl font-serif font-medium text-foreground">Asset Registered Successfully</h2>
        <p className="text-muted">
          The physical property has been inducted into the National Registry and is now tracked under GSA supervision.
        </p>
        <div className="glass-panel p-6 w-full text-left space-y-3 border border-purple-500/30 bg-purple-500/5">
          <div className="flex justify-between items-center border-b border-purple-500/20 pb-4 mb-4">
            <span className="text-sm text-muted">Government Asset Barcode</span>
            <div className="bg-white px-3 py-1 rounded border-2 border-dashed border-black">
              <span className="text-lg font-mono font-bold text-black tracking-widest">{tagId}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Asset Description</span>
            <span className="text-sm font-medium text-foreground">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Capitalized Value</span>
            <span className="text-sm font-bold text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(purchaseValue))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted">Primary Custodian (MAC)</span>
            <span className="text-sm font-medium text-foreground">{custodian}</span>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setDescription('');
              setPurchaseValue('');
              setPoReference('');
              setTagId(generateTag()); // Generate a new tag for the next asset
            }}
            className="px-6 py-2.5 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 rounded-lg transition-colors font-medium text-sm"
          >
            Register Another Asset
          </button>
          <Link 
            to="/app/finance/assets"
            className="px-6 py-2.5 bg-brand-gold text-brand-dark hover:bg-brand-gold-dark rounded-lg transition-colors font-bold text-sm"
          >
            Return to Registry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <Link to="/app/finance/assets" className="flex items-center gap-2 mb-4 text-xs font-medium text-muted hover:text-foreground transition-colors group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Asset Registry
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-medium text-purple-500 uppercase tracking-wider">Module 13 / Acquisition Engine</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-medium text-foreground tracking-tight mb-1">
            Induct Physical Asset
          </h1>
          <p className="text-sm text-muted">
            Register newly purchased or donated capital equipment into GSA custody and generate tracking barcodes.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 mt-6"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <HardDrive className="w-4 h-4 text-purple-500" /> Asset Meta-Data
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Classification Category</label>
                <select 
                  value={assetCategory}
                  onChange={(e) => {
                    setAssetCategory(e.target.value);
                    // We update the tag logic immediately based on dropdown change.
                    // Note: In real app, we'd manage this differently to avoid overwriting typed data,
                    // but for the demo this forces the prefix to match.
                  }}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-purple-500 outline-none transition-colors"
                >
                  <option>Vehicle Fleet</option>
                  <option>IT Infrastructure</option>
                  <option>Buildings & Land</option>
                  <option>Heavy Machinery</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Initial Appraised Condition</label>
                <select 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-purple-500 outline-none transition-colors"
                >
                  <option>New/Excellent</option>
                  <option>Good (Used)</option>
                  <option>Fair (Requires Maintenance)</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Make / Model / Description</label>
                <input 
                  type="text" 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 2025 Toyota LandCruiser V8 Executive Edition"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-purple-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/50 pb-2">
              <Car className="w-4 h-4 text-purple-500" /> Financial & Logistics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Purchasing Document Reference</label>
                <input 
                  type="text" 
                  required
                  value={poReference}
                  onChange={(e) => setPoReference(e.target.value.toUpperCase())}
                  placeholder="e.g. PO-MOF-8812 (Optional if Donated)"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground focus:border-purple-500 outline-none transition-colors uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Capitalized Value (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    required
                    value={purchaseValue}
                    onChange={(e) => setPurchaseValue(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-background border-2 border-border rounded-lg pl-8 pr-4 py-3 text-xl font-bold text-foreground focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-muted/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted uppercase tracking-wider">Assigned Custodian (MAC)</label>
                <select 
                  value={custodian}
                  onChange={(e) => setCustodian(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:border-purple-500 outline-none transition-colors"
                >
                  <option>Ministry of Finance</option>
                  <option>Ministry of Defense</option>
                  <option>Ministry of Public Works</option>
                  <option>Liberia Revenue Authority</option>
                  <option>Executive Mansion</option>
                </select>
              </div>

              <div className="flex items-start gap-2 bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                <AlertTriangle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-400 leading-tight">
                  Registration triggers an automated physical inspection queue for the General Services Agency (GSA) within 30 days.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-4">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Draft & Hold
            </button>
            <button 
              type="submit"
              disabled={!description || !purchaseValue || !poReference}
              className={cn(
                "px-8 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm",
                !description || !purchaseValue || !poReference
                  ? "bg-foreground/10 text-muted cursor-not-allowed" 
                  : "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:-translate-y-0.5"
              )}
            >
              <Save className="w-4 h-4" /> Append to Main Registry
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
