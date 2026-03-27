import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Landmark, ArrowRight, Mail, Lock, User, Building } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Left: Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/80 to-brand-dark/90 z-10 mix-blend-multiply" />
        <img 
          src="https://picsum.photos/seed/liberia/1080/1920" 
          alt="Liberia landscape" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 h-full">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center border border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Landmark className="text-brand-gold w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-semibold tracking-wide text-white">
              LIFEDge<span className="text-brand-gold">One</span>
            </span>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-serif font-medium text-white mb-4 leading-tight">
              Join the National Command Center
            </h2>
            <p className="text-white/70 text-lg font-light">
              Request access to the unified platform for budget formulation, financial execution, and development delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center border border-brand-gold/30">
            <Landmark className="text-brand-gold w-4 h-4" />
          </div>
          <span className="text-lg font-serif font-semibold tracking-wide text-foreground">
            LIFEDge<span className="text-brand-gold">One</span>
          </span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md my-auto pt-16 lg:pt-0"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-serif font-medium text-foreground mb-2">Request Access</h1>
            <p className="text-muted">Submit your details for administrative approval</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="firstName">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input 
                    id="firstName"
                    type="text" 
                    placeholder="Amara" 
                    className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="lastName">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input 
                    id="lastName"
                    type="text" 
                    placeholder="Konneh" 
                    className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">Official Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  id="email"
                  type="email" 
                  placeholder="name@mfdp.gov.lr" 
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="ministry">Ministry / Agency</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <select 
                  id="ministry"
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors appearance-none"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select your institution...</option>
                  <option value="mfdp">Ministry of Finance and Development Planning</option>
                  <option value="moh">Ministry of Health</option>
                  <option value="moe">Ministry of Education</option>
                  <option value="mopw">Ministry of Public Works</option>
                  <option value="other">Other MAC</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-brand-gold text-white dark:text-brand-dark rounded-xl font-medium hover:bg-brand-gold-dark transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 mt-4"
            >
              Submit Request <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-gold hover:text-brand-gold-dark font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
