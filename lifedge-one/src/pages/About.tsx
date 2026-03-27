import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft, Shield, Globe, BarChart3, Layers } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-x-0 !border-t-0 !border-b-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center border border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Landmark className="text-brand-gold w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-semibold tracking-wide text-foreground">
              LIFEDge<span className="text-brand-gold">One</span>
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">
            About LIFEDge One
          </h1>
          <p className="text-xl text-muted font-light leading-relaxed mb-12">
            The Liberia Integrated Financial and Economic Data edge (LIFEDge One) is the sovereign digital operating system for the Ministry of Finance and Development Planning.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-medium text-foreground mb-4">Our Mission</h2>
              <p className="text-muted leading-relaxed">
                To consolidate and orchestrate existing siloed finance, planning, oversight, and development workflows into a single, unified national command environment. LIFEDge One ensures transparency, accountability, and efficiency in the management of public resources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-foreground mb-6">Core Pillars</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Layers className="w-6 h-6 text-brand-gold" />, title: "Unified Architecture", desc: "Seamless integration of IFMIS, CS-DRMS, and other critical national systems." },
                  { icon: <Shield className="w-6 h-6 text-brand-green" />, title: "Sovereign Security", desc: "Enterprise-grade security protocols protecting sensitive national financial data." },
                  { icon: <BarChart3 className="w-6 h-6 text-blue-500" />, title: "Real-time Intelligence", desc: "Live macroeconomic forecasting and execution tracking for data-driven policy." },
                  { icon: <Globe className="w-6 h-6 text-purple-500" />, title: "Development Delivery", desc: "Comprehensive tracking of donor aid, NGO activities, and public investment projects." }
                ].map((pillar, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-xl">
                    <div className="mb-4">{pillar.icon}</div>
                    <h3 className="text-lg font-medium text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-foreground mb-4">The Platform</h2>
              <p className="text-muted leading-relaxed mb-4">
                LIFEDge One is not merely a collection of modules; it is an interoperable command environment. It visibly preserves the real functional behaviors of existing systems while providing a modernized, unified interface.
              </p>
              <p className="text-muted leading-relaxed">
                From budget preparation handoffs to execution, allotment controls, and EFT payment execution, every workflow is digitized, tracked, and auditable.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
