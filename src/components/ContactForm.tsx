/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, ArrowRight, CheckCircle2, User, Building, Clipboard, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    service: 'Internal Audit Assurance',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "Internal Audit Assurance",
    "SOX Compliance / IFC Review",
    "RCM & SOP Writing",
    "Income Tax Filing (ITR)",
    "GST Returns & Advisory",
    "Statutory Audit / Tax Audit",
    "Business Advisory & Financial Management"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      alert("Please provide at least your name and key inquiry message.");
      return;
    }

    // Format professional structured email layout
    const subject = encodeURIComponent(`Professional Consultation Request - ${formData.name}`);
    const body = encodeURIComponent(
      `Dear Atharva,\n\nI hope this email finds you well.\n\nMy name is ${formData.name}, and I am reaching out to consult on your professional services. Here are my engagement details:\n\n` +
      `- Name / Contact: ${formData.name}\n` +
      `- Company: ${formData.company || 'Not Specified'}\n` +
      `- Phone Number: ${formData.phone || 'Not Provided'}\n` +
      `- Service Needed: ${formData.service}\n\n` +
      `Inquiry / Requirement Detail:\n${formData.message}\n\n` +
      `Please let me know your availability for a brief exploratory call to discuss how we can collaborate.\n\nBest Regards,\n${formData.name}`
    );

    // Launch email client
    const mailtoUrl = `mailto:atharvasongire29@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        phone: '',
        service: 'Internal Audit Assurance',
        message: ''
      });
    }, 5000);
  };

  return (
    <section className="py-24 bg-[#FAF9F6] executive-grid" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block - Communication channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">GET IN TOUCH</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mt-2 mb-4 leading-tight">
                Let&apos;s Build a Solution
              </h2>
              <p className="font-sans text-charcoal/60 leading-relaxed font-light text-xs sm:text-sm mb-8">
                Ready to optimize your internal financial controls, manage taxation audit reconciliations, or seek advice? Contact Atharva Songire to organize reliable financial blueprints.
              </p>

              <div className="space-y-6">
                
                {/* Email Channel */}
                <a 
                  href="mailto:atharvasongire29@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#D4CDBC]/30 hover:border-[#8E704F] transition-all group"
                  id="contact-email-card"
                >
                  <div className="p-3 rounded-lg bg-[#FAF6F0] text-[#8E704F] group-hover:bg-[#8E704F] group-hover:text-white transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40">Inquire Directly via Email</p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-charcoal group-hover:text-[#8E704F] transition-colors">atharvasongire29@gmail.com</p>
                  </div>
                </a>

                {/* Call Channel */}
                <a 
                  href="tel:+919370673731" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#D4CDBC]/30 hover:border-[#8E704F] transition-all group"
                  id="contact-phone-card"
                >
                  <div className="p-3 rounded-lg bg-[#FAF6F0] text-[#8E704F] group-hover:bg-[#8E704F] group-hover:text-white transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40">Direct Call / Mobile</p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-charcoal">+91 9370673731</p>
                  </div>
                </a>

                {/* Professional LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/atharvasongire" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#D4CDBC]/30 hover:border-[#8E704F] transition-all group"
                  id="contact-linkedin-card"
                >
                  <div className="p-3 rounded-lg bg-[#FAF6F0] text-[#8E704F] group-hover:bg-[#8E704F] group-hover:text-white transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40">Connect on LinkedIn</p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-charcoal">LinkedIn Profile</p>
                  </div>
                </a>

                {/* Geography Map Indicator */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-[#D4CDBC]/20">
                  <div className="p-3 rounded-lg bg-[#FAF6F0] text-charcoal/45">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40">Based In</p>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-charcoal">Mumbai, Maharashtra, India</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quality Tagline on bottom */}
            <div className="hidden lg:block pt-6 border-t border-[#D4CDBC]/30">
              <p className="font-display italic text-xs text-charcoal/50">
                &quot;Ensuring financial clarity and audit security through methodical execution.&quot;
              </p>
            </div>
          </div>

          {/* Right Block - Interactive Inquiry Builder */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#D4CDBC]/30 p-8 rounded-2xl shadow-lg relative">
              
              {submitted ? (
                <div className="py-16 text-center space-y-4" id="success-message">
                  <div className="w-16 h-16 bg-[#8E704F]/10 text-[#8E704F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display font-medium text-xl text-charcoal">Pre-composing Mail Draft...</h3>
                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light max-w-sm mx-auto">
                    Your direct mail client is launching with your customized compliance questions. Simply click &quot;Send&quot; in your mail app to reach Atharva instantly!
                  </p>
                  <p className="font-mono text-[9px] italic text-[#8E704F] uppercase font-bold pt-6">Redirecting Callback Complete</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="consultation-form">
                  <div className="mb-6">
                    <h3 className="font-display font-medium text-lg text-charcoal">Inquiry Draft Dispatcher</h3>
                    <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed font-light mt-0.5">
                      Compile your business variables below. The application will pre-structure and load your inquiry draft instantly into your email client.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold flex items-center gap-1">
                      <User className="w-3 h-3 text-[#8E704F]" />
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name} 
                      onChange={handleInputChange}
                      placeholder="e.g. Sterling Pharmaceutical Executives"
                      className="w-full bg-[#FAF9F6] border border-sand rounded-lg px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#8E704F]"
                    />
                  </div>

                  {/* Two Column items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Company Input */}
                    <div className="space-y-1.5">
                      <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold flex items-center gap-1">
                        <Building className="w-3 h-3 text-[#8E704F]" />
                        Company Name
                      </label>
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleInputChange}
                        placeholder="e.g. Pfizer Limited"
                        className="w-full bg-[#FAF9F6] border border-sand rounded-lg px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#8E704F]"
                      />
                    </div>

                    {/* Mobile Input */}
                    <div className="space-y-1.5">
                      <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#8E704F]" />
                        Phone / Mobile
                      </label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#FAF9F6] border border-sand rounded-lg px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#8E704F]"
                      />
                    </div>

                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="space-y-1.5">
                    <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold flex items-center gap-1">
                      <Clipboard className="w-3 h-3 text-[#8E704F]" />
                      Advisory Framework Required
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF9F6] border border-sand rounded-lg px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#8E704F]"
                    >
                      {servicesList.map(srv => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-[#8E704F]" />
                      Inquiry Details / Message *
                    </label>
                    <textarea 
                      name="message" 
                      rows={4}
                      required
                      value={formData.message} 
                      onChange={handleInputChange}
                      placeholder="e.g. Looking to design SOPs, organize Tax audits under standard Section 44AB, or plan SOX compliance assessments..."
                      className="w-full bg-[#FAF9F6] border border-sand rounded-lg px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#8E704F] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-charcoal text-[#FAF9F6] py-3.5 rounded-lg font-grotesk text-xs tracking-widest uppercase font-bold hover:bg-[#8E704F] transition-all cursor-pointer shadow-md hover:shadow-xl hover:translate-y-[-1px]"
                  >
                    Draft & Dispatch Consultation Email
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
