/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, GraduationCap, Briefcase, Globe, ArrowDown, ChevronRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between executive-grid py-6 select-none" id="hero">
      {/* Sleek Floating Header */}
      <header className="sticky top-0 z-50 w-full px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#FAF9F6]/85 backdrop-blur-md py-3 px-6 rounded-full border border-[#D4CDBC]/30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-grotesk font-bold tracking-widest text-lg text-charcoal">A.S</span>
            <span className="h-4 w-[1px] bg-[#D4CDBC]" />
            <span className="font-mono text-[9px] tracking-widest text-[#8E704F] uppercase font-semibold">CA & ACCA</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-grotesk tracking-widest text-charcoal/75">
            <button onClick={() => scrollToSection('capabilities')} className="hover:text-[#8E704F] transition-colors cursor-pointer">SERVICES</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-[#8E704F] transition-colors cursor-pointer">EY EXPERIENCE</button>
            <button onClick={() => scrollToSection('tax-calculator')} className="hover:text-[#8E704F] transition-colors cursor-pointer">TAX ESTIMATOR</button>
            <button onClick={() => scrollToSection('credentials')} className="hover:text-[#8E704F] transition-colors cursor-pointer">CREDENTIALS</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#8E704F] transition-colors cursor-pointer">CONTACT</button>
          </nav>

          <a 
            href="mailto:atharvasongire29@gmail.com"
            className="font-grotesk text-[10px] tracking-widest font-bold bg-charcoal text-[#FAF9F6] px-4 py-2 rounded-full hover:bg-[#8E704F] transition-colors"
          >
            CONSULT NOW
          </a>
        </div>
      </header>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full flex flex-col items-center justify-center flex-grow py-12 text-center">
        
        {/* Dynamic Professional Profile */}
        <motion.div 
          className="flex flex-col items-center justify-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8E704F] animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E704F] font-bold">
              FORMER EY SENIOR CONSULTANT
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight font-light text-charcoal mb-6"
          >
            Atharva Songire
          </motion.h1>

          {/* Subheading / Summary */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-charcoal/70 max-w-2xl mb-8 leading-relaxed font-light"
          >
            A high-performing <strong className="font-medium text-charcoal">Chartered Accountant (ICAI)</strong>, <strong className="font-medium text-charcoal">ACCA Affiliate</strong>, and B.Com graduate with 3 years of elite experience at <strong className="font-medium text-charcoal">Ernst & Young (EY)</strong>. 
            Specializing in Internal Auditing, Sarbanes-Oxley (SOX) Compliance, RCM design, and Financial Reporting. Delivering regulatory assurance and modern taxation services.
          </motion.p>

          {/* Core Credentials Badges */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 border-t border-b border-[#D4CDBC]/30 py-6 mb-8 w-full max-w-2xl"
          >
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal/50 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#8E704F]" />
                Degrees
              </span>
              <span className="font-display font-medium text-base sm:text-lg text-charcoal">CA / ACCA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal/50 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#8E704F]" />
                Domain
              </span>
              <span className="font-display font-medium text-base sm:text-lg text-charcoal">Internal Audit</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal/50 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#8E704F]" />
                Portfolio
              </span>
              <span className="font-display font-medium text-base sm:text-lg text-charcoal">Global Client</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 bg-charcoal text-[#FAF9F6] font-grotesk text-xs tracking-widest uppercase font-bold rounded-lg hover:bg-[#8E704F] transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg hover:shadow-xl hover:translate-y-[-1px]"
            >
              <Mail className="w-4 h-4" />
              Contact Atharva
              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection('experience')}
              className="px-8 py-3.5 bg-transparent border border-charcoal/20 text-charcoal font-grotesk text-xs tracking-widest uppercase font-bold rounded-lg hover:bg-charcoal/5 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              View EY Portfolio
            </button>
          </motion.div>
        </motion.div>

      </div>

      {/* Hero Foot - Scroll Indicator */}
      <footer className="w-full text-center py-4 flex flex-col items-center gap-1 h-14 justify-end">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E704F] select-none">Scroll to Explore</span>
        <button 
          onClick={() => scrollToSection('capabilities')}
          className="p-1 rounded-full text-charcoal/50 hover:text-charcoal transition-colors animate-bounce cursor-pointer"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </footer>
    </section>
  );
}
