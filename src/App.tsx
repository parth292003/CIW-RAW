/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import PracticeCapabilities from './components/PracticeCapabilities';
import PortfolioExperience from './components/PortfolioExperience';
import TaxCalculator from './components/TaxCalculator';
import Credentials from './components/Credentials';
import ContactForm from './components/ContactForm';
import { Mail, Linkedin, Phone, MapPin, ChevronUp, Clock, Scale } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update dynamic time counter for professional look
  useEffect(() => {
    // Current Indian Standard Time (or fallback UTC)
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll height to show scrolling indicators
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button
      setShowScrollTop(window.scrollY > 500);

      // Simple active section monitor based on offsets
      const sections = ['hero', 'capabilities', 'experience', 'tax-calculator', 'credentials', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navSectors = [
    { id: 'hero', label: 'HIGHLIGHTS' },
    { id: 'capabilities', label: 'SERVICES' },
    { id: 'experience', label: 'CAREER TIMELINE' },
    { id: 'tax-calculator', label: 'TAX TOOLKIT' },
    { id: 'credentials', label: 'CREDENTIALS' },
    { id: 'contact', label: 'CONSULTATION' }
  ];

  return (
    <div className="bg-[#FAF9F6] selection:bg-[#AF926B]/25 text-charcoal font-sans relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      {/* Cinematic Sidebar Progress Bullet List (Universal Nav Indicator) */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 items-end">
        {navSectors.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            {/* Hover Tooltip Label */}
            <span className={`font-mono text-[8px] tracking-widest uppercase font-black transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === sec.id ? 'text-[#8E704F] opacity-100' : 'text-charcoal/40'
            }`}>
              {sec.label}
            </span>
            {/* Interactive Dot Indicator */}
            <span className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
              activeSection === sec.id 
              ? 'bg-[#8E704F] border-[#8E704F] scale-125' 
              : 'border-[#D4CDBC] bg-[#FAF9F6]/50 group-hover:border-[#8E704F]'
            }`} />
          </button>
        ))}
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection('hero')}
          className="fixed bottom-6 right-6 z-40 p-3 bg-charcoal text-[#FAF9F6] border border-transparent rounded-full shadow-2xl hover:bg-[#8E704F] transition-all cursor-pointer animate-fade-in hover:translate-y-[-2px]"
          title="Scroll to Top"
          id="scroll-top-button"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Primary Visual Architecture */}
      <main className="w-full flex-grow">
        
        {/* Cinematic Announcement Banner */}
        <div className="bg-charcoal text-[#FAF9F6] py-2 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-[#D4CDBC]/10 select-none">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#AF926B] animate-ping" />
            <p className="font-mono text-[9px] tracking-widest uppercase text-[#FAF9F6]/80 font-bold">
              Now Booking Q2-Q3 Audits, Business Accounting advisory, and GST reconciliations
            </p>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-charcoal-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#AF926B]" />
              {currentTime || "12:00 PM IST"}
            </span>
            <span className="hidden md:inline h-3 w-[1px] bg-[#FAF9F6]/20" />
            <span className="hidden md:flex items-center gap-1">
              <Scale className="w-3 h-3 text-[#AF926B]" />
              ICAI & ACCA Compliant
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Capabilities Grid */}
        <PracticeCapabilities />

        {/* Professional EY Timeline */}
        <PortfolioExperience />

        {/* Income Tax Regime & GST Assist Tool */}
        <TaxCalculator />

        {/* Credentials, Education Certificates & Resume Print Block */}
        <Credentials />

        {/* Contact Form Builder Linked to Direct Mail */}
        <ContactForm />

      </main>

      {/* Sleek Minimalist Editorial Footer */}
      <footer className="bg-charcoal text-[#FAF9F6]/80 py-16 px-6 md:px-12 border-t border-[#D4CDBC]/10 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-grotesk font-bold tracking-widest text-lg text-white">A.S</span>
              <span className="h-4 w-[1px] bg-[#FAF9F6]/40" />
              <span className="font-mono text-[8px] tracking-widest text-[#AF926B] uppercase font-bold">CA ATHARVA SONGIRE</span>
            </div>
            <p className="font-sans text-xs text-[#FAF9F6]/50 leading-relaxed font-light">
              Chartered Accountant, Corporate Auditor, and Global ACCA Advisor specializing in building operating models, assessing regulatory SOX structures, and enabling corporate growth plans.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-grotesk text-[10px] uppercase tracking-widest text-[#AF926B] font-bold">Practice Capabilities</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-sans text-[#FAF9F6]/50 font-light">
              <span>Internal Audit</span>
              <span>GST Filings</span>
              <span>SOX & IFC Assurances</span>
              <span>Tax Audits 44AB</span>
              <span>SOP Manual drafting</span>
              <span>ITR Return Compliance</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-grotesk text-[10px] uppercase tracking-widest text-[#AF926B] font-bold">Direct Channels</h4>
            <div className="space-y-2 text-xs font-sans text-[#FAF9F6]/50 font-light">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#AF926B]" />
                <a href="mailto:atharvasongire29@gmail.com" className="hover:text-white transition-colors">atharvasongire29@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#AF926B]" />
                <a href="tel:+919370673731" className="hover:text-white transition-colors">+91 9370673731</a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-[#AF926B]" />
                <a href="https://www.linkedin.com/in/atharvasongire" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">linkedin.com/in/atharvasongire</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#AF926B]" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-[#FAF9F6]/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[9px] text-[#FAF9F6]/40">
            &copy; {new Date().getFullYear()} Atharva Songire. All Rights Reserved. Designed under elite cinematic standards.
          </p>
          <div className="flex gap-6 text-[9px] font-mono tracking-wider text-[#FAF9F6]/40 uppercase">
            <span>ICAI Member</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>ACCA Affiliate</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Audit, Assurance & Taxation Specialist</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
