import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
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

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted font-light leading-relaxed mb-10">
              For technical support, access requests, or general inquiries regarding the LIFEDge One platform, please contact the system administration team.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Ministry Headquarters</h3>
                  <p className="text-muted leading-relaxed">
                    Broad Street<br />
                    Monrovia, Liberia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Email Support</h3>
                  <p className="text-muted leading-relaxed">
                    support@lifedge.mfdp.gov.lr<br />
                    info@mfdp.gov.lr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Helpdesk</h3>
                  <p className="text-muted leading-relaxed">
                    +231 (0) 770 123 456<br />
                    Mon-Fri, 8:00 AM - 5:00 PM GMT
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-serif font-medium text-foreground mb-6">Send a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="email">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="subject">Subject</label>
                <input 
                  id="subject"
                  type="text" 
                  className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-foreground/5 border border-border rounded-xl text-foreground focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-brand-gold text-white dark:text-brand-dark rounded-xl font-medium hover:bg-brand-gold-dark transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
