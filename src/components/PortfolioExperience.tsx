/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, Calendar, Award, ChevronDown, ChevronUp, Search, SlidersHorizontal, BookOpen, Layers } from 'lucide-react';
import { ExperienceItem } from '../types';

export default function PortfolioExperience() {
  const [expandedId, setExpandedId] = useState<string | null>('ey');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const experiences: ExperienceItem[] = [
    {
      id: 'ey',
      role: "Senior Consultant",
      company: "Ernst and Young LLP (EY)",
      location: "Mumbai, Maharashtra (Global Engagements)",
      period: "May 2023 – Present",
      highlights: [
        "Led key client engagements, managing a functional team of 5+ individuals and taking end-to-end responsibility for managing, coordinating, and performing internal audits.",
        "Responsible for Sarbanes-Oxley (SOX) audit planning, execution, and direct reporting to external auditors to ensure sovereign corporate compliance in EMEA, APAC, and the Americas for a prominent pharmaceutical conglomerate headquartered in the United Kingdom. Specialized in critical cycles like Procure to Pay (P2P), Order to Cash (O2C), and Record to Report (R2R).",
        "Led the team responsible for Risk & Control Matrix (RCM) development and Standard Operating Procedure (SOP) building for a giant multi-facility chemicals & manufacturing corporation, analyzing and designing operational processes to mitigate critical control gaps.",
        "Conducted a comprehensive operational audit for a warehousing corporation covering Investment Management, AIF Compliances, leasing agreements, HR & Payroll cycles, and led the presentation of key findings to the executive Management Committee.",
        "Performed high-stakes audit of procurement cycles for leading chemical corporations, verifying vendor master validation, ordering systems, Segregation of Duties (SoD), SAP Access Rights, and Accounts Payable workflows with thorough impact analysis.",
        "Executed full inventory audits for multi-state manufacturing and chemicals plants covering material master maintenance, warehouse storage security, slow-moving inventory reserves, and ledger adjustments.",
        "Designed and audited regulatory, legal compliance, physical security, and entry-exit gate control models for a leading automotive dealer network.",
        "Supervised comprehensive multi-year contract compliance audits and Proprietary / General Procurement audits for a major list steel manufacturer, optimizing purchase transparency."
      ],
      tags: ["Pharmaceuticals", "Manufacturing", "Chemicals", "Warehousing", "Automobile", "Steel & Infrastructure"]
    },
    {
      id: 'prism',
      role: "Assistant Manager - Finance",
      company: "Prism Johnson Limited",
      location: "Mumbai, Maharashtra",
      period: "Oct 2022 – May 2023",
      highlights: [
        "Responsible for monthly preparation and structuring of core MIS reports and Profitability Statements at the consolidated corporate entity level.",
        "Conducted granular profitability and capital-expenditure analysis of self-owned cement plants, Joint Ventures and subsidiary units.",
        "Performed competitor peer reviews and market share analysis directly reported to the Chief Executive Officer (CEO) and Executive Director (ED) of the H&R Johnson India division."
      ],
      tags: ["Corporate MIS", "Profitability Analytics", "Competitor Intelligence"]
    },
    {
      id: 'ssmutha',
      role: "Article Assistant",
      company: "S.S. Mutha and Co. (Chartered Accountants)",
      location: "Mumbai, Maharashtra",
      period: "Oct 2019 – Oct 2022",
      highlights: [
        "Supervised various Statutory Audits and extensive Tax Audits of Private Limited Companies, joint venture partnerships, and sole proprietors in infrastructure and retail.",
        "Involved in the complete spectrum of Direct and Indirect taxation workflow—ranging from monthly compliance filings, response drafts to assessment notices, scrutiny cases, and preparation of CIT Appeals submissions."
      ],
      tags: ["Tax Audits", "Statutory Audits", "GST Compliance", "CIT Appeals"]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sectors = ["All", "Pharmaceuticals", "Chemicals", "Manufacturing", "Warehousing", "Automobile", "Steel & Infrastructure"];

  // Filter highlights specifically matching the selected sector for deeper interactive fidelity
  const getFilteredHighlights = (item: ExperienceItem) => {
    if (selectedSector === 'All') return item.highlights;
    
    // EY has detailed sector breakdowns, return only the bullets matching the selected sector
    if (item.id === 'ey') {
      return item.highlights.filter(bullet => {
        if (selectedSector === 'Pharmaceuticals' && (bullet.toLowerCase().includes('pharmaceutical') || bullet.toLowerCase().includes('sox'))) return true;
        if (selectedSector === 'Manufacturing' && (bullet.toLowerCase().includes('manufacturing') || bullet.toLowerCase().includes('process'))) return true;
        if (selectedSector === 'Chemicals' && (bullet.toLowerCase().includes('chemical') || bullet.toLowerCase().includes('rcm'))) return true;
        if (selectedSector === 'Warehousing' && (bullet.toLowerCase().includes('warehous') || bullet.toLowerCase().includes('leasing'))) return true;
        if (selectedSector === 'Automobile' && bullet.toLowerCase().includes('automotive')) return true;
        if (selectedSector === 'Steel & Infrastructure' && (bullet.toLowerCase().includes('steel') || bullet.toLowerCase().includes('procurement'))) return true;
        return false;
      });
    }
    
    // For other companies, return all bullets as they are specialized
    return item.highlights;
  };

  return (
    <section className="py-24 bg-[#FAF9F6] executive-grid" id="experience">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">PROFESSIONAL TIMELINE</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mt-2 mb-4 leading-tight">
            Corporate Experience & Track Record
          </h2>
          <p className="font-sans text-charcoal/60 leading-relaxed font-light text-sm">
            Three years of institutional experience managing complex governance architectures, audit pipelines, and corporate accounts with world-class frameworks.
          </p>
        </div>

        {/* EY Sector Highlights Filter */}
        <div className="mb-12 bg-white/60 backdrop-blur-md border border-[#D4CDBC]/30 p-5 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8E704F]" />
              <h3 className="font-grotesk text-[10px] uppercase tracking-widest text-charcoal font-bold">Interactive Client Portfolio Audit (EY)</h3>
            </div>
            <span className="font-mono text-[9px] text-[#8E704F] uppercase font-bold bg-[#8E704F]/10 px-2.5 py-1 rounded">
              Filter EY Engagements by Sector
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectors.map(sector => (
              <button
                key={sector}
                onClick={() => {
                  setSelectedSector(sector);
                  setExpandedId('ey'); // Keep EY expanded for contextual viewing
                }}
                className={`px-3 py-1.5 rounded-md font-sans text-xs transition-all cursor-pointer ${
                  selectedSector === sector
                    ? 'bg-charcoal text-[#FAF9F6] font-medium scale-[1.02]'
                    : 'bg-[#FAF6F0] text-charcoal/70 border border-sand hover:text-charcoal hover:bg-[#FAF9F6]'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
          {selectedSector !== 'All' && (
            <p className="font-mono text-[9px] text-charcoal/50 mt-3 italic">
              Showing active audit objectives in the <strong>{selectedSector}</strong> market segment handled for key client accounts.
            </p>
          )}
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-[#8E704F]/20 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12 py-4">
          
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            const filteredHighlights = getFilteredHighlights(exp);
            const isInactiveHighlight = exp.id === 'ey' && filteredHighlights.length === 0;

            return (
              <div key={exp.id} className="relative group" id={`timeline-item-${exp.id}`}>
                
                {/* Timeline Node Ring */}
                <span className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#FAF9F6] transition-all duration-300 flex items-center justify-center ${
                  isExpanded ? 'border-[#8E704F] ring-4 ring-[#8E704F]/10' : 'border-[#D4CDBC] group-hover:border-[#8E704F]'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isExpanded ? 'bg-[#8E704F]' : 'bg-transparent'}`} />
                </span>

                {/* Main Card Header */}
                <div 
                  onClick={() => toggleExpand(exp.id)}
                  className="bg-white/40 hover:bg-white/80 border border-[#D4CDBC]/30 p-6 rounded-xl cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#8E704F]" />
                        <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">
                          {exp.period}
                        </span>
                        {exp.id === 'ey' && (
                          <span className="font-mono text-[9px] tracking-wider text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded font-black uppercase">
                            Leading Position
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-display font-medium text-lg sm:text-xl text-charcoal leading-snug">
                        {exp.role}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-charcoal/60 mt-1 font-sans text-xs">
                        <span className="font-semibold text-charcoal/80 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 inline text-charcoal/40" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 inline text-charcoal/40" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Tags */}
                      <div className="hidden lg:flex items-center gap-2">
                        {exp.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="font-mono text-[9px] uppercase tracking-wider bg-charcoal/5 px-2 py-1 rounded text-charcoal/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="p-1 px-2.5 rounded bg-charcoal/5 group-hover:bg-[#8E704F]/10 group-hover:text-[#8E704F] text-charcoal/70 transition-colors">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Highlights Expander */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-[#D4CDBC]/30 space-y-4">
                          {isInactiveHighlight ? (
                            <div className="p-4 bg-[#FAF6F0] rounded-lg border border-sand text-center">
                              <p className="font-sans text-xs text-charcoal/50">
                                No specific engagements matching &quot;{selectedSector}&quot; are listed for this role. Clear the filter above to view all audits.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <h4 className="font-mono text-[9px] tracking-widest text-[#8E704F] uppercase font-bold flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                Audit Objectives & Impact
                              </h4>
                              
                              <ul className="space-y-3.5">
                                {filteredHighlights.map((bullet, bIdx) => (
                                  <motion.li 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: bIdx * 0.04 }}
                                    key={bIdx} 
                                    className="flex gap-3 items-start"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#8E704F] mt-2 shrink-0" />
                                    <span className="font-sans text-xs sm:text-[13px] text-charcoal/85 leading-relaxed font-light">
                                      {bullet}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Skills/Tags associated */}
                          <div className="pt-4 border-t border-[#D4CDBC]/20 flex flex-wrap gap-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-charcoal/40 self-center mr-1">Skills:</span>
                            {exp.tags.map(tag => (
                              <span 
                                key={tag} 
                                className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer transition-colors ${
                                  selectedSector === tag || (exp.id !== 'ey' && selectedSector !== 'All' && tag.includes(selectedSector))
                                  ? 'bg-[#8E704F]/15 text-[#8E704F] border border-[#8E704F]/30 font-medium'
                                  : 'bg-charcoal/5 text-charcoal/60 border border-transparent'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}

        </div>

        {/* EY Kudos Award Shoutout */}
        <div className="mt-16 bg-gradient-to-br from-[#FAF6F0] to-[#EFECE6] border border-[#D4CDBC]/40 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-xs">
          <div className="p-4 bg-white rounded-full border border-sand shadow-inner text-[#8E704F]">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#8E704F] uppercase font-bold">RECOGNIZED FOR EXCELLENCE</span>
            <h4 className="font-display font-medium text-lg text-charcoal mt-1 mb-2">EY Kudos Award Winner</h4>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
              Recipient of the coveted EY Kudos Award at Ernst & Young for maintaining exceptional delivery quality, exhibiting leadership under stringent auditing timelines, and coordinating flawlessly with global partner teams based in the UK and pharmaceutical heads in Europe.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
