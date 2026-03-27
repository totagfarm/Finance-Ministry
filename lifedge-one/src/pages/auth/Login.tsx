import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Landmark, ArrowRight, Mail, Lock, Users } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { role: 'Minister', email: 'minister@mfdp.gov.lr', name: 'Amara Konneh' },
  { role: 'Budget Officer', email: 'budget@mfdp.gov.lr', name: 'Sarah Doe' },
  { role: 'Aid Coordinator', email: 'aid@mfdp.gov.lr', name: 'John Smith' },
  { role: 'Auditor', email: 'audit@mfdp.gov.lr', name: 'Jane Doe' },
  { role: 'System Admin', email: 'admin@lifedge.gov.lr', name: 'Admin User' }
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Find role by email or default to Minister
    const account = DEMO_ACCOUNTS.find(acc => acc.email === email);
    const role = account ? account.role : 'Minister';
    const name = account ? account.name : 'Demo User';
    
    localStorage.setItem('lifedge-demo-role', role);
    localStorage.setItem('lifedge-demo-name', name);
    navigate('/app');
  };

  const fillDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground selection:bg-brand-gold/30 selection:text-brand-gold">
      {/* Left: Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/80 to-brand-dark/90 z-10 mix-blend-multiply" />
        <img 
          src="https://picsum.photos/seed/monrovia/1080/1920" 
          alt="Monrovia cityscape" 
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
              Secure Access to National Financial Infrastructure
            </h2>
            <p className="text-white/70 text-lg font-light">
              Authorized personnel only. All activities are monitored and logged in accordance with the Public Financial Management Act.
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
            <h1 className="text-3xl font-serif font-medium text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted">Sign in to your LIFEDge One account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@mfdp.gov.lr" 
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-brand-gold hover:text-brand-gold-dark transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-brand-gold text-white dark:text-brand-dark rounded-xl font-medium hover:bg-brand-gold-dark transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Accounts Section */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
              <Users className="w-4 h-4 text-brand-gold" />
              <span>Demo Accounts</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemoAccount(acc.email)}
                  className="text-left px-3 py-2 text-xs rounded-lg border border-border bg-foreground/5 hover:bg-foreground/10 hover:border-brand-gold/50 transition-colors"
                >
                  <div className="font-medium text-foreground">{acc.role}</div>
                  <div className="text-muted truncate">{acc.email}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-gold hover:text-brand-gold-dark font-medium transition-colors">
              Request Access
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
