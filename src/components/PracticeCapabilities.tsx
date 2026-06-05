/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, FileSpreadsheet, Percent, Scale, ClipboardList, 
  BookOpen, Calculator, UserCheck, Briefcase, Activity, Check, ArrowRight
} from 'lucide-react';
import { CapabilityItem } from '../types';

export default function PracticeCapabilities() {
  const [activeTab, setActiveTab] = useState<'all' | 'corporate' | 'traditional'>('all');
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);

  const capabilities: CapabilityItem[] = [
    {
      title: "Internal Financial Controls (IFC)",
      description: "Comprehensive designing, evaluation, and end-to-end testing of internal audit frameworks to ensure reliable financial operations and mitigate corporate risk.",
      iconName: "ShieldCheck",
      category: "corporate",
      details: [
        "Designing the flowcharts and narratives of critical business cycles.",
        "Identifying Process Level and Entity Level controls to assess operational leaks.",
        "Formulating Remediation Plans for identified testing exceptions and deficiencies.",
        "Supporting global standard compliance frameworks (COSO / Ind AS)."
      ]
    },
    {
      title: "SOX & Sarbanes-Oxley Compliance",
      description: "Rigorous planning and auditing under Section 404 for global US-listed companies across EMEA, APAC, and the Americas.",
      iconName: "Activity",
      category: "corporate",
      details: [
        "Specializing in critical mega-cycles: Procure to Pay (P2P), Order to Cash (O2C), Record to Report (R2R).",
        "Executing design walk-throughs and testing of operating effectiveness.",
        "Liaising with top-tier international external auditors to coordinate control attestations.",
        "Mitigating material weaknesses through precise remediation tracking."
      ]
    },
    {
      title: "Risk & Control Matrix (RCM) Development",
      description: "Drafting dynamic Risk registers mapping business goals to micro-level risks, controls, and testing definitions.",
      iconName: "ClipboardList",
      category: "corporate",
      details: [
        "Identifying processes prone to fraud, error, or operational friction.",
        "Establishing direct associations between Risks and Control Objectives.",
        "Designing specific key and non-key preventative/detective controls.",
        "Deploying testing plans with standard operating procedures."
      ]
    },
    {
      title: "Standard Operating Procedures (SOP)",
      description: "Authoring comprehensive, audit-ready operational manuals to standardize cross-functional compliance and corporate procedures.",
      iconName: "BookOpen",
      category: "corporate",
      details: [
        "Reviewing and analyzing 'as-is' process steps with department heads.",
        "Drafting clear, visual flowcharts representing task segregations (SoD).",
        "Formulating quantitative key performance metrics for ongoing process monitoring.",
        "Updating regulatory frameworks with changes in statutory laws."
      ]
    },
    {
      title: "Income Tax return (ITR) Advisory",
      description: "Flawless filing of Income Tax Returns for high-net-worth individuals, salaried professionals, partnerships, and corporations.",
      iconName: "Calculator",
      category: "traditional",
      details: [
        "Strategic tax planning to maximize legal deductions under applicable sections.",
        "Expert assistance in compiling Form 16, Form 26AS, and AIS/TIS reconciliations.",
        "Filing of forms ITR-1 to ITR-6 with precise income categorizations.",
        "Drafting detailed written submissions for tax notices and CIT/ITAT appeals."
      ]
    },
    {
      title: "GST Return Filings & Audit Support",
      description: "Seamless preparation, verification, and dynamic reconciliation of monthly, quarterly, and annual GST submissions.",
      iconName: "Percent",
      category: "traditional",
      details: [
        "Accurate GSTR-1 & GSTR-3B filing and prompt Input Tax Credit (ITC) optimization.",
        "Formulating annual GSTR-9 and auditor reconciliation GSTR-9C certifications.",
        "Providing legal advisory on complex inter-state and intra-state GST valuations.",
        "Resolving departmental GST notices and conducting mock internal GST audits."
      ]
    },
    {
      title: "Statutory Audits & Tax Audits (Sec 44AB)",
      description: "Thorough statutory auditing services ensuring full adherence to ICAI standards, Indian GAAP, and Companies Act provisions.",
      iconName: "Scale",
      category: "traditional",
      details: [
        "Executing complete tax audit under Section 44AB of the Income Tax Act.",
        "Expressing independent professional opinion on financial statement presentation.",
        "Reviewing corporate ledger reconciliations, asset valuations, and liability setups.",
        "Delivering business insights to the board and management committee."
      ]
    },
    {
      title: "Corporate Accounting & Reporting",
      description: "Establishing standard corporate accounting setups, preparing MIS reports, and consolidating multi-entity financial statements.",
      iconName: "FileSpreadsheet",
      category: "traditional",
      details: [
        "Setting up custom charts of accounts in ERP systems like SAP and Tally.",
        "Formulating entity-level profitability, cash-flow, and budget-variance analyses.",
        "Preparing executive-ready MIS reports direct for CEO and Board level review.",
        "Financial modeling for new business project proposals."
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#8E704F]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#8E704F]" />;
      case 'ClipboardList': return <ClipboardList className="w-6 h-6 text-[#8E704F]" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-[#8E704F]" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-[#8E704F]" />;
      case 'Percent': return <Percent className="w-6 h-6 text-[#8E704F]" />;
      case 'Scale': return <Scale className="w-6 h-6 text-[#8E704F]" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6 text-[#8E704F]" />;
      default: return <ClipboardList className="w-6 h-6 text-[#8E704F]" />;
    }
  };

  const filteredCapabilities = capabilities.filter(cap => {
    if (activeTab === 'all') return true;
    return cap.category === activeTab;
  });

  return (
    <section className="py-24 bg-[#FAF6F0] border-t border-b border-[#D4CDBC]/30" id="capabilities">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">PROFESSIONAL CAPABILITIES</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mt-2 mb-4 leading-tight">
            Specialized Services & Practices
          </h2>
          <p className="font-sans text-charcoal/60 leading-relaxed font-light">
            Leveraging elite experience as an EY Senior Consultant and core CA qualifications to offer world-class internal audits, corporate governance support, and compliant taxation services.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#FAF9F6] p-1.5 rounded-full border border-[#D4CDBC]/35 shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full font-grotesk text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer ${
                activeTab === 'all' 
                ? 'bg-charcoal text-[#FAF9F6] shadow-md' 
                : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              All Capabilities
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-5 py-2 rounded-full font-grotesk text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer ${
                activeTab === 'corporate' 
                ? 'bg-charcoal text-[#FAF9F6] shadow-md' 
                : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Corporate Advisory & Risk
            </button>
            <button
              onClick={() => setActiveTab('traditional')}
              className={`px-5 py-2 rounded-full font-grotesk text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer ${
                activeTab === 'traditional' 
                ? 'bg-charcoal text-[#FAF9F6] shadow-md' 
                : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Taxation & CA Practice
            </button>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCapabilities.map((cap, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={cap.title}
                onClick={() => setSelectedCapability(cap)}
                className="bg-[#FAF9F6] border border-[#D4CDBC]/30 p-6 rounded-xl hover:shadow-xl hover:border-[#8E704F]/40 cursor-pointer transition-all duration-300 flex flex-col justify-between group h-full"
                id={`capability-card-${idx}`}
              >
                <div>
                  <div className="p-3 bg-[#FAF6F0] rounded-lg w-fit mb-5 transition-colors group-hover:bg-[#8E704F]/10">
                    {getIcon(cap.iconName)}
                  </div>
                  
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8E704F] font-bold bg-[#8E704F]/5 px-2 py-0.5 rounded">
                    {cap.category === 'corporate' ? 'corporate audit' : 'ca practice'}
                  </span>

                  <h3 className="font-display font-medium text-lg text-charcoal mt-3 mb-2 leading-snug group-hover:text-[#8E704F] transition-colors">
                    {cap.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-charcoal/60 font-light leading-relaxed line-clamp-3">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4CDBC]/20 flex items-center justify-between text-xs font-grotesk tracking-widest text-[#8E704F] font-medium uppercase group-hover:translate-x-1 transition-transform">
                  <span>View Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Modal for Selected Service */}
        <AnimatePresence>
          {selectedCapability && (
            <div className="fixed inset-0 bg-[#1C1C1E]/30 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setSelectedCapability(null)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FAF9F6] max-w-lg w-full rounded-2xl p-8 border border-sand shadow-2xl relative"
                id="capability-detail-modal"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#FAF6F0] rounded-lg border border-sand">
                      {getIcon(selectedCapability.iconName)}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-wider text-[#8E704F] uppercase font-bold bg-[#8E704F]/5 px-2 py-0.5 rounded">
                        {selectedCapability.category === 'corporate' ? 'ASSURANCE & AUDITS' : 'TAXATION SERVICES'}
                      </span>
                      <h3 className="font-display font-medium text-xl text-charcoal mt-1">
                        {selectedCapability.title}
                      </h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCapability(null)}
                    className="p-1 px-2 text-xs font-mono rounded bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 transition-colors cursor-pointer"
                  >
                    ESC
                  </button>
                </div>

                <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed font-light mb-6">
                  {selectedCapability.description}
                </p>

                <div className="border-t border-[#D4CDBC]/30 pt-6">
                  <h4 className="font-mono text-[10px] tracking-widest text-charcoal/50 uppercase font-bold mb-4">Core Deliverables & Standards</h4>
                  <ul className="space-y-3">
                    {selectedCapability.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-2.5 items-start">
                        <div className="p-0.5 bg-[#8E704F]/10 rounded text-[#8E704F] mt-0.5 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-sans text-xs text-charcoal/80 leading-relaxed font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#D4CDBC]/20 flex flex-col sm:flex-row gap-3">
                  <a 
                    href={`mailto:atharvasongire29@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(selectedCapability.title)}&body=Dear%20Atharva%2C%20I%20visited%20your%20website%20and%20am%20interested%20in%20discussing%20your%20services%20for%3A%20${encodeURIComponent(selectedCapability.title)}.%20Please%20let%20me%20know%20your%20availability%20for%20a%20brief%20consultation.`}
                    className="flex-grow text-center py-2.5 bg-charcoal text-[#FAF9F6] rounded-lg font-grotesk text-[10px] tracking-widest uppercase font-bold hover:bg-[#8E704F] transition-colors"
                  >
                    Request Consultation
                  </a>
                  <button 
                    onClick={() => setSelectedCapability(null)}
                    className="py-2.5 px-5 border border-charcoal/10 hover:bg-charcoal/5 rounded-lg font-grotesk text-[10px] tracking-widest uppercase font-bold transition-colors cursor-pointer text-charcoal/70"
                  >
                    Back to services
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
