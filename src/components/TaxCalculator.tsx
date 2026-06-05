/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, Percent, ArrowRight, Table, Sparkles, Check, Info, FileText 
} from 'lucide-react';

export default function TaxCalculator() {
  const [activeCalculator, setActiveCalculator] = useState<'tax' | 'gst'>('tax');
  
  // Tax state
  const [annualGross, setAnnualGross] = useState<number>(1200000);
  const [deductions80C, setDeductions80C] = useState<number>(150000);
  const [deductionsOther, setDeductionsOther] = useState<number>(50000);
  
  // GST state
  const [gstBaseAmount, setGstBaseAmount] = useState<number>(50000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterState, setIsInterState] = useState<boolean>(true);

  // Income Tax Calculations for FY 2024-25 / AY 2025-26 (Indian Income Tax)
  const taxResults = useMemo(() => {
    const standardDeduction = 75000; // Increased to 75,000 in July 2024 Budget for New Regime, 50,000 for Old Regime
    
    // 1. New Regime Calculation
    const newRegimeNet = Math.max(0, annualGross - standardDeduction);
    let newRegimeTax = 0;
    
    // Slabs:
    // Up to 3L: Nil
    // 3L - 7L: 5% (Budget 2024 revised)
    // 7L - 10L: 10%
    // 10L - 12L: 15%
    // 12L - 15L: 20%
    // Above 15L: 30%
    if (newRegimeNet > 300000) {
      const taxable = newRegimeNet;
      if (taxable <= 700000) {
        newRegimeTax += (taxable - 300000) * 0.05;
      } else {
        newRegimeTax += 400000 * 0.05; // 3L to 7L
        if (taxable <= 1000000) {
          newRegimeTax += (taxable - 700000) * 0.10;
        } else {
          newRegimeTax += 300000 * 0.10; // 7L to 10L
          if (taxable <= 1200000) {
            newRegimeTax += (taxable - 1000000) * 0.15;
          } else {
            newRegimeTax += 200000 * 0.15; // 10L to 12L
            if (taxable <= 1500000) {
              newRegimeTax += (taxable - 1200000) * 0.20;
            } else {
              newRegimeTax += 300000 * 0.20; // 12L to 15L
              newRegimeTax += (taxable - 1500000) * 0.30; // Above 15L
            }
          }
        }
      }
    }
    
    // Rebate under New Regime: Section 87A (Rebate of tax if income up to 7,000,000 is tax-free)
    // Wait, the budget provides rebate up to taxable income of 7,00,000 (meaning tax is fully rebated if income is below 7L)
    if (newRegimeNet <= 700000) {
      newRegimeTax = 0;
    }
    
    const newRegimeCess = newRegimeTax * 0.04;
    const newRegimeTotal = Math.round(newRegimeTax + newRegimeCess);

    // 2. Old Regime Calculation
    const totalDeductionsOld = Math.min(150000, deductions80C) + deductionsOther + 50000; // includes 50k standard deduction
    const oldRegimeNet = Math.max(0, annualGross - totalDeductionsOld);
    let oldRegimeTax = 0;
    
    // Old Slabs:
    // Up to 2.5L: Nil
    // 2.5L - 5L: 5%
    // 5L - 10L: 20%
    // Above 10L: 30%
    if (oldRegimeNet > 250000) {
      const taxable = oldRegimeNet;
      if (taxable <= 500000) {
        oldRegimeTax += (taxable - 250000) * 0.05;
      } else {
        oldRegimeTax += 250000 * 0.05; // 2.5L to 5L
        if (taxable <= 1000000) {
          oldRegimeTax += (taxable - 500000) * 0.20;
        } else {
          oldRegimeTax += 500000 * 0.20; // 5L to 10L
          oldRegimeTax += (taxable - 1000000) * 0.30; // Above 10L
        }
      }
    }
    
    // Rebate under Old Regime: Section 87A (Rebate of tax up to 12,500 if income up to 5L is tax-free)
    if (oldRegimeNet <= 500000) {
      oldRegimeTax = 0;
    }
    
    const oldRegimeCess = oldRegimeTax * 0.04;
    const oldRegimeTotal = Math.round(oldRegimeTax + oldRegimeCess);

    return {
      newRegimeNet,
      newRegimeTotal,
      oldRegimeNet,
      oldRegimeTotal,
      betterRegime: newRegimeTotal < oldRegimeTotal ? 'NEW' : 'OLD',
      savings: Math.abs(oldRegimeTotal - newRegimeTotal)
    };
  }, [annualGross, deductions80C, deductionsOther]);

  // GST Split Calculations
  const gstResults = useMemo(() => {
    const totalTax = (gstBaseAmount * gstRate) / 100;
    const totalAmount = gstBaseAmount + totalTax;
    
    return {
      totalTax,
      totalAmount,
      cgst: isInterState ? 0 : totalTax / 2,
      sgst: isInterState ? 0 : totalTax / 2,
      igst: isInterState ? totalTax : 0
    };
  }, [gstBaseAmount, gstRate, isInterState]);

  // Generate Email Preload links with populated values
  const getTaxEmailLink = () => {
    const subject = `ITR%20Filing%20and%20Tax%20Consultation%20-%20Atharva%20Songire`;
    const body = `Dear%20Atharva%2C%0A%0AI%20was%20using%20the%20tax%20regime%20calculator%20on%20your%20website%20and%20would%20like%20to%20consult%20you%20on%20my%20filings%2E%20Here%20are%20my%20estimated%20details%3A%0A%0A-%20Gross%20Annual%20Income%3A%20%E2%82%B9${annualGross.toLocaleString('en-IN')}%0A-%20Investment%20under%2080C%3A%20%E2%82%B9${deductions80C.toLocaleString('en-IN')}%0A-%20Other%20Proposed%20Deductions%3A%20%E2%82%B9${deductionsOther.toLocaleString('en-IN')}%0A-%20Calculated%20Proposed%20Tax%20(New%20Regime)%3A%20%E2%82%B9${taxResults.newRegimeTotal.toLocaleString('en-IN')}%0A-%20Calculated%20Proposed%20Tax%20(Old%20Regime)%3A%20%E2%82%B9${taxResults.oldRegimeTotal.toLocaleString('en-IN')}%0A%0APlease%20let%20me%20know%20how%20we%20can%20partner%20to%20optimize%20my%20returns%20and%20schedule%20this%20filing%2E%0A%0ABest%20Regards%2C`;
    return `mailto:atharvasongire29@gmail.com?subject=${subject}&body=${body}`;
  };

  const getGstEmailLink = () => {
    const subject = `GST%20Advisory%20Inquiry%20-%20Atharva%20Songire`;
    const body = `Dear%20Atharva%2C%0A%0AI%20require%20expert%20assistance%20on%20GST%20reporting%2Ffilings%20for%20my%20business%20operations%2E%20Here%20is%20one%20of%20our%20estimated%20transaction%20profiles%3A%0A%0A-%20Base%20Amount%3A%20%E2%82%B9${gstBaseAmount.toLocaleString('en-IN')}%0A-%20GST%20Rate%20Slab%3A%20${gstRate}%25%0A-%20Transaction%3A%20${isInterState ? 'Inter-state IGST' : 'Intra-state CGST + SGST'}%0A-%20Total%20Filing%20GST%3A%20%E2%82%B9${gstResults.totalTax.toLocaleString('en-IN')}%0A%0APlease%20advise%20on%20reconciliation%2C%20filings%2C%20and%20assessing%20maximum%20ITC%20claims%20legally%2E%0A%0ABest%20Regards%2C`;
    return `mailto:atharvasongire29@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 bg-[#FAF6F0] border-t border-b border-[#D4CDBC]/30" id="tax-calculator">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#8E704F] uppercase font-bold">DIGITAL TAX ASSIST TOOLKIT</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mt-2 mb-4 leading-tight">
            Interactive Taxation Calculators
          </h2>
          <p className="font-sans text-charcoal/60 leading-relaxed font-light text-sm">
            Quickly estimate your direct income taxation (Old vs New Regime) or split GST distributions. Clear metrics to guide your business advisory.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#FAF9F6] p-1.5 rounded-xl border border-[#D4CDBC]/35 shadow-xs">
            <button
              onClick={() => setActiveCalculator('tax')}
              className={`px-6 py-2.5 rounded-lg font-grotesk text-[10px] tracking-widest uppercase font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeCalculator === 'tax' 
                ? 'bg-charcoal text-[#FAF9F6] shadow-md' 
                : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <FileText className="w-4 h-4" />
              Regime Comparison (FY 2024-25)
            </button>
            <button
              onClick={() => setActiveCalculator('gst')}
              className={`px-6 py-2.5 rounded-lg font-grotesk text-[10px] tracking-widest uppercase font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeCalculator === 'gst' 
                ? 'bg-charcoal text-[#FAF9F6] shadow-md' 
                : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <Percent className="w-4 h-4" />
              GST Split Calculator
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Calculator UI */}
          {activeCalculator === 'tax' ? (
            <>
              {/* Income Tax Inputs */}
              <div className="lg:col-span-6 bg-[#FAF9F6] border border-[#D4CDBC]/30 p-8 rounded-2xl shadow-xs space-y-6">
                <div>
                  <h3 className="font-display font-medium text-lg text-charcoal mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#8E704F]" />
                    Filing Variables
                  </h3>
                  <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed font-light mb-6">
                    Enter your annual gross compensation and eligible investment pools to compare real financial liabilities side-by-side.
                  </p>
                </div>

                {/* Gross Income Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-grotesk uppercase tracking-wider text-charcoal/60 font-bold">Annual Gross Income</label>
                    <span className="font-mono font-bold text-charcoal bg-[#FAF6F0] px-2.5 py-1 rounded border border-sand">
                      ₹{annualGross.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="300000" 
                    max="5000000" 
                    step="25000"
                    value={annualGross} 
                    onChange={(e) => setAnnualGross(Number(e.target.value))}
                    className="w-full accent-charcoal cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-charcoal/40">
                    <span>₹3L</span>
                    <span>₹15L</span>
                    <span>₹30L</span>
                    <span>₹50L</span>
                  </div>
                </div>

                {/* Deductions (Sec 80C) Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-grotesk uppercase tracking-wider text-charcoal/60 font-bold">Sec 80C Deductions (PPF, ELSS, EPF)</label>
                    <span className="font-mono font-bold text-charcoal bg-[#FAF6F0] px-2.5 py-1 rounded border border-sand">
                      ₹{deductions80C.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="150000" 
                    step="5000"
                    value={deductions80C} 
                    onChange={(e) => setDeductions80C(Number(e.target.value))}
                    className="w-full accent-[#8E704F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-charcoal/40">
                    <span>₹0</span>
                    <span>₹75k</span>
                    <span>₹1.5L (Max Limit)</span>
                  </div>
                </div>

                {/* Other Deductions (e.g. 80D, 24b Home Loan Interest) Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-grotesk uppercase tracking-wider text-charcoal/60 font-bold">Other Deductions (Sec 80D, NPS, etc.)</label>
                    <span className="font-mono font-bold text-charcoal bg-[#FAF6F0] px-2.5 py-1 rounded border border-sand">
                      ₹{deductionsOther.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="300000" 
                    step="5000"
                    value={deductionsOther} 
                    onChange={(e) => setDeductionsOther(Number(e.target.value))}
                    className="w-full accent-[#8E704F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-charcoal/40">
                    <span>₹0</span>
                    <span>₹1L</span>
                    <span>₹2L</span>
                    <span>₹3L</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-sand flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#8E704F] mt-0.5 shrink-0" />
                  <p className="font-sans text-[11px] text-charcoal/60 leading-relaxed font-light">
                    <strong>Note:</strong> Budget July 2024 standardized the New Regime deductions with an increased Standard Deduction of <strong>₹75,000</strong>. New Slabs calculate up to ₹7L with Section 87A Full Rebate benefit.
                  </p>
                </div>
              </div>

              {/* Income Tax Results */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Comparison Card */}
                <div className="bg-white border border-[#D4CDBC]/35 p-8 rounded-2xl shadow-md relative overflow-hidden">
                  
                  {/* Decorative badge */}
                  <span className="absolute top-0 right-0 bg-[#8E704F] text-[#FAF9F6] font-mono text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-bl-xl flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Regime Recommendation
                  </span>

                  <h3 className="font-display font-medium text-lg text-charcoal mb-6 mt-1 flex items-center gap-2">
                    <Table className="w-4 h-4 text-[#8E704F]" />
                    Comparative Analysis
                  </h3>

                  {/* Slabs breakdown */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    
                    {/* New Regime Grid */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      taxResults.betterRegime === 'NEW' 
                      ? 'bg-[#8E704F]/5 border-[#8E704F] ring-4 ring-[#8E704F]/5' 
                      : 'bg-[#FAF9F6] border-[#D4CDBC]/30'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-charcoal/50">NEW REGIME</span>
                        {taxResults.betterRegime === 'NEW' && <span className="text-[9px] font-mono font-bold text-[#8E704F] bg-white border border-[#8E704F]/20 px-1.5 py-0.5 rounded uppercase">Highly Efficient</span>}
                      </div>
                      <p className="font-mono text-2xl font-black text-charcoal">₹{taxResults.newRegimeTotal.toLocaleString('en-IN')}</p>
                      <p className="font-sans text-[10px] text-charcoal/50 font-light mt-1">Taxable Income: ₹{taxResults.newRegimeNet.toLocaleString('en-IN')}</p>
                    </div>

                    {/* Old Regime Grid */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      taxResults.betterRegime === 'OLD' 
                      ? 'bg-[#8E704F]/5 border-[#8E704F] ring-4 ring-[#8E704F]/5' 
                      : 'bg-[#FAF9F6] border-[#D4CDBC]/30'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-charcoal/50">OLD REGIME</span>
                        {taxResults.betterRegime === 'OLD' && <span className="text-[9px] font-mono font-bold text-[#8E704F] bg-white border border-[#8E704F]/20 px-1.5 py-0.5 rounded uppercase">Highly Efficient</span>}
                      </div>
                      <p className="font-mono text-2xl font-black text-charcoal">₹{taxResults.oldRegimeTotal.toLocaleString('en-IN')}</p>
                      <p className="font-sans text-[10px] text-charcoal/50 font-light mt-1">Taxable Income: ₹{taxResults.oldRegimeNet.toLocaleString('en-IN')}</p>
                    </div>

                  </div>

                  {/* Recommendation block */}
                  <div className="p-4 bg-[#FAF9F6] border border-sand rounded-xl flex items-center gap-4 mb-8">
                    <div className="p-2 bg-charcoal text-[#FAF9F6] rounded-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-grotesk text-[10px] uppercase tracking-widest font-bold text-[#8E704F]">Assistance Model Findings</p>
                      <p className="font-sans text-xs text-charcoal font-medium mt-0.5">
                        {taxResults.savings > 0 ? (
                          <>Based on inputs, filing under <strong className="text-[#8E704F] font-bold">{taxResults.betterRegime} Regime</strong> saves you roughly <strong className="text-[#8E704F] font-bold">₹{taxResults.savings.toLocaleString('en-IN')}</strong> in taxes!</>
                        ) : (
                          <>Both taxation regimes yield zero net tax liability for this income bracket.</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Submit Call to Action Button */}
                  <a 
                    href={getTaxEmailLink()}
                    className="w-full flex items-center justify-center gap-2 bg-charcoal text-[#FAF9F6] py-3.5 rounded-lg font-grotesk text-xs tracking-widest uppercase font-bold hover:bg-[#8E704F] transition-colors shadow-lg hover:shadow-xl"
                  >
                    File ITR with Atharva Songire
                    <ArrowRight className="w-4 h-4" />
                  </a>

                </div>
              </div>
            </>
          ) : (
            <>
              {/* GST Inputs */}
              <div className="lg:col-span-6 bg-[#FAF9F6] border border-[#D4CDBC]/30 p-8 rounded-2xl shadow-xs space-y-6">
                <div>
                  <h3 className="font-display font-medium text-lg text-charcoal mb-4 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-[#8E704F]" />
                    GST Computation Setup
                  </h3>
                  <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed font-light mb-6">
                    Calculate operational Goods and Services Tax output and split liabilities into statutory state and central shares instantly.
                  </p>
                </div>

                {/* Base amount */}
                <div className="space-y-1.5">
                  <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold block">Base Invoice Amount (₹)</label>
                  <div className="relative rounded-lg shadow-inner">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 font-mono text-sm">
                      ₹
                    </div>
                    <input 
                      type="number" 
                      value={gstBaseAmount} 
                      onChange={(e) => setGstBaseAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-white border border-sand rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-[#8E704F] font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Slabs */}
                <div className="space-y-1.5">
                  <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold block">GST Rate Slab</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 12, 18, 28].map(rate => (
                      <button
                        key={rate}
                        onClick={() => setGstRate(rate)}
                        className={`py-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                          gstRate === rate 
                          ? 'bg-charcoal text-[#FAF9F6] border-charcoal' 
                          : 'bg-white text-charcoal/60 border-sand hover:bg-charcoal/5'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transaction Location */}
                <div className="space-y-1.5">
                  <label className="font-grotesk text-[10px] uppercase tracking-wider text-charcoal/60 font-bold block">Transaction Origin & Route</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIsInterState(true)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isInterState 
                        ? 'bg-white border-[#8E704F] shadow-sm' 
                        : 'bg-white/40 border-sand opacity-60'
                      }`}
                    >
                      <p className="font-grotesk text-[10px] font-bold tracking-wider text-charcoal uppercase">Inter-State Route</p>
                      <p className="font-sans text-[9px] text-[#8E704F] mt-0.5 font-bold">IGST Only</p>
                    </button>

                    <button
                      onClick={() => setIsInterState(false)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        !isInterState 
                        ? 'bg-white border-[#8E704F] shadow-sm' 
                        : 'bg-white/40 border-sand opacity-60'
                      }`}
                    >
                      <p className="font-grotesk text-[10px] font-bold tracking-wider text-charcoal uppercase">Intra-State Route</p>
                      <p className="font-sans text-[9px] text-[#8E704F] mt-0.5 font-bold">CGST + SGST (50/50)</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* GST Results */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* SPLIT BREAKDOWN */}
                <div className="bg-white border border-[#D4CDBC]/35 p-8 rounded-2xl shadow-md">
                  <h3 className="font-display font-medium text-lg text-charcoal mb-6 flex items-center gap-2">
                    <Table className="w-4 h-4 text-[#8E704F]" />
                    GST Taxation Summary
                  </h3>

                  <div className="space-y-4 mb-8">
                    
                    {/* Invoice Line 1 */}
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-sand">
                      <span className="font-sans text-charcoal/60 font-light">Base Net Value</span>
                      <span className="font-mono font-medium text-charcoal">₹{gstBaseAmount.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Invoice Line 2 (CGST / IGST) */}
                    {isInterState ? (
                      <div className="flex justify-between items-center text-xs pb-3 border-b border-sand">
                        <span className="font-sans text-charcoal/60 font-light">Integrated GST (IGST @ {gstRate}%)</span>
                        <span className="font-mono font-bold text-charcoal">₹{gstResults.igst.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-xs pb-3 border-b border-sand">
                          <span className="font-sans text-charcoal/60 font-light">Central GST (CGST @ {gstRate / 2}%)</span>
                          <span className="font-mono font-medium text-charcoal">₹{gstResults.cgst.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pb-3 border-b border-sand">
                          <span className="font-sans text-charcoal/60 font-light">State GST (SGST @ {gstRate / 2}%)</span>
                          <span className="font-mono font-medium text-charcoal">₹{gstResults.sgst.toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    )}

                    {/* Invoice Line 3 */}
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-sand">
                      <span className="font-sans text-charcoal/60 font-light">Total GST Liability</span>
                      <span className="font-mono font-bold text-charcoal">₹{gstResults.totalTax.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Grand Invoice Total */}
                    <div className="flex justify-between items-center p-4 bg-[#FAF9F6] border border-sand rounded-xl">
                      <span className="font-grotesk text-[10px] uppercase tracking-wider font-bold text-charcoal/70">Total Invoice Valuation</span>
                      <span className="font-mono text-xl font-black text-charcoal">₹{gstResults.totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                  </div>

                  {/* Consulting Link */}
                  <a 
                    href={getGstEmailLink()}
                    className="w-full flex items-center justify-center gap-2 bg-charcoal text-[#FAF9F6] py-3.5 rounded-lg font-grotesk text-xs tracking-widest uppercase font-bold hover:bg-[#8E704F] transition-colors shadow-lg hover:shadow-xl"
                  >
                    Discuss Corporate GST Filing
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
