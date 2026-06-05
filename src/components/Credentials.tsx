/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, GraduationCap, Trophy, Globe, Briefcase, FileDown, BookOpen, CheckCircle, Shield } from 'lucide-react';
import { EducationItem, AchievementItem } from '../types';

export default function Credentials() {
  const educations: EducationItem[] = [
    {
      institution: "ICAI - Institute of Chartered Accountants of India",
      degree: "Chartered Accountant (CA)",
      period: "2018 – 2022",
      details: "Cleared the elite professional examination in the standard FIRST ATTEMPT. Core specialization in Audit & Assurance, Direct and Indirect Taxation, and Corporate Law."
    },
    {
      institution: "ACCA - Association of Chartered Certified Accountants, UK",
      degree: "ACCA Affiliate",
      period: "Passed all papers in 2024",
      details: "Global chartered status, cleared all papers comprehensively (first-pass clearance focus). Expertise in International Financial Reporting Standards (IFRS) and Strategic Management."
    },
    {
      institution: "University of Pune",
      degree: "Bachelor of Commerce (B.Com)",
      period: "2018 – 2021",
      details: "Graduated with top academic standing. Specialized in Advanced Accounting and Corporate Financial Methods."
    }
  ];

  const achievements: AchievementItem[] = [
    {
      title: "EY Kudos Award",
      description: "Recognized at Ernst and Young for exceptional performance and dedication to managing high-profile corporate client engagements.",
      category: "Corporate Excellence"
    },
    {
      title: "Academic Milestone",
      description: "Secured 3rd Rank in graduating College at standard class XII level and passed the ICAI Chartered Accountancy examinations in the first attempt.",
      category: "Academics"
    },
    {
      title: "District Athlete",
      description: "Represented Pune and District teams in competitive Swimming and Rope Skipping at State and District level sports meets.",
      category: "Sports & Leadership"
    }
  ];

  const printResume = () => {
    window.print();
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-b border-[#D4CDBC]/35" id="credentials">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">EDUCATION & ACCOMPLISHMENTS</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mt-2 mb-4 leading-tight">
            Qualifications & Accreditation
          </h2>
          <p className="font-sans text-charcoal/60 leading-relaxed font-light text-sm">
            A background representing double-chartered financial credentials, certified global advisory competencies, and stellar competitive achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Educations - Left */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-display font-medium text-lg text-charcoal mb-6 border-b border-[#D4CDBC]/30 pb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#8E704F]" />
              Academic & Certification Degrees
            </h3>

            <div className="space-y-6">
              {educations.map((edu, idx) => (
                <div key={idx} className="bg-white/50 border border-sand p-6 rounded-xl relative hover:bg-white transition-all duration-300">
                  <span className="font-mono text-[9px] tracking-widest text-[#8E704F] uppercase font-bold absolute top-6 right-6">
                    {edu.period}
                  </span>
                  
                  <h4 className="font-display font-medium text-base text-charcoal pr-16">
                    {edu.degree}
                  </h4>
                  <p className="font-sans font-semibold text-[#8E704F]/90 text-xs mt-1">
                    {edu.institution}
                  </p>
                  <p className="font-sans text-xs text-charcoal/60 font-light mt-3 leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="mt-4 flex gap-1.5 items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span className="font-mono text-[9px] text-[#A58B6F] uppercase font-bold tracking-wider">Verification Complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Awards - Right */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-display font-medium text-lg text-charcoal mb-6 border-b border-[#D4CDBC]/30 pb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#8E704F]" />
                Honors & Accomplishments
              </h3>
              
              <div className="space-y-4">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="p-5 bg-white border border-[#D4CDBC]/20 rounded-xl hover:shadow-md transition-shadow">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#8E704F]/85 bg-[#8E704F]/5 px-2 py-0.5 rounded font-bold">
                      {ach.category}
                    </span>
                    <h4 className="font-display font-medium text-sm text-charcoal mt-2 mb-1">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Print / View Resume Summary */}
            <div className="bg-gradient-to-br from-[#FAF6F0] to-[#EFECE6] p-6 rounded-xl border border-sand space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Shield className="w-5 h-5 text-[#8E704F]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-charcoal/50">Standard Audit CV</p>
                  <p className="font-sans text-xs font-bold text-charcoal">Official Ledger Summary</p>
                </div>
              </div>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                Need a physical copy of Atharva&apos;s CV or audit framework credentials? Print a clean, formatted copy of this online portfolio.
              </p>
              <button 
                onClick={printResume}
                className="w-full flex items-center justify-center gap-2 bg-charcoal text-[#FAF9F6] py-2.5 rounded-lg font-grotesk text-[10px] tracking-widest uppercase font-bold hover:bg-[#8E704F] transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                Print / Save Portfolio CV
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
