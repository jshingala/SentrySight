import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Star, AlertCircle, ChevronDown, X, Menu, Shield, Video, ArrowUpCircle, Percent } from 'lucide-react';
import './Pricing.css';

const PricingPage = () => {
  // State for monthly/yearly toggle
  const [isYearly, setIsYearly] = useState(false);
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for estimate modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numCameras, setNumCameras] = useState(1);
  const [planType, setPlanType] = useState('');
  const [localUpgrades, setLocalUpgrades] = useState([]);
  const [subscriptionUpgrades, setSubscriptionUpgrades] = useState([]);
  const [localDiscount, setLocalDiscount] = useState('none');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [estimateResult, setEstimateResult] = useState(null);
  const [breakdownItems, setBreakdownItems] = useState([]);

  // Handle form submission
  const calculateEstimate = (e) => {
    if (e) e.preventDefault();
    
    // Initialize variables
    let baseCost = 0;
    let upgradeCost = 0;
    let discountRate = 0;
    let totalEstimate = 0;
    let monthlyEstimate = 0;
    let periodLabel = '';
    let breakdown = [];
    
    // Calculate base cost based on plan type
    switch(planType) {
      case 'local':
        // Calculate appliances needed (8 cameras = 1 appliance)
        const appliancesNeeded = Math.ceil(numCameras / 8);
        
        // Each appliance costs $2000 + $500 license fee
        baseCost = (appliancesNeeded * 2000) + 500;
        breakdown.push(`Base cost: ${appliancesNeeded} appliance${appliancesNeeded > 1 ? 's' : ''} × $2,000 = ${(appliancesNeeded * 2000).toLocaleString()}`);
        breakdown.push(`License fee: $500`);
        
        // Calculate upgrade costs
        if (localUpgrades.includes('support')) {
          upgradeCost += 500;
          breakdown.push(`Customer Support: +$500`);
        }
        
        if (localUpgrades.includes('extended')) {
          const extendedCost = 300 * appliancesNeeded;
          upgradeCost += extendedCost;
          breakdown.push(`Extended Warranty: +${extendedCost.toLocaleString()}`);
        }
        
        if (localUpgrades.includes('premium')) {
          const premiumCost = 3000 * appliancesNeeded;
          upgradeCost += premiumCost;
          breakdown.push(`Premium Software: +${premiumCost.toLocaleString()}`);
        }
        
        // Calculate discount
        if (localDiscount === 'multi' && appliancesNeeded >= 5) {
          discountRate = 0.15; // 15% off for 5+ appliances
          breakdown.push(`Multi-Appliance Discount: -15%`);
        } else if (localDiscount === 'partner') {
          discountRate = 0.20; // 20% off for partners
          breakdown.push(`Partner Discount: -20%`);
        }
        
        periodLabel = ''; // One-time purchase
        break;
        
      case 'basic':
        // $15 per camera per month
        const basicRate = 15;
        
        // Calculate based on billing cycle
        if (billingCycle === 'annual') {
          // 35% discount for annual payment
          discountRate = 0.35;
          monthlyEstimate = numCameras * basicRate * (1 - discountRate);
          baseCost = monthlyEstimate * 12;
          periodLabel = '/month ($' + Math.round(baseCost).toLocaleString() + '/year)';
          breakdown.push(`Base cost: ${numCameras} cameras × ${basicRate}/stream/month × 12 months = ${(numCameras * basicRate * 12).toLocaleString()}`);
          breakdown.push(`Annual Discount: -35% = -${(numCameras * basicRate * 12 * 0.35).toLocaleString()}`);
        } else {
          baseCost = numCameras * basicRate;
          periodLabel = '/month';
          breakdown.push(`Base cost: ${numCameras} cameras × ${basicRate}/stream/month = ${(numCameras * basicRate).toLocaleString()}`);
        }
        
        // Handle subscription upgrades
        if (subscriptionUpgrades.includes('premium')) {
          const premiumUpgrade = 35; // $35 extra per camera per month
          if (billingCycle === 'annual') {
            const premiumUpgradeCost = numCameras * premiumUpgrade * (1 - discountRate);
            upgradeCost += premiumUpgradeCost * 12;
            monthlyEstimate += premiumUpgradeCost;
            breakdown.push(`Premium Upgrade: ${numCameras} cameras × ${premiumUpgrade}/stream/month × 0.65 (after discount) = +${Math.round(premiumUpgradeCost).toLocaleString()}/month`);
          } else {
            const premiumUpgradeCost = numCameras * premiumUpgrade;
            upgradeCost += premiumUpgradeCost;
            breakdown.push(`Premium Upgrade: ${numCameras} cameras × ${premiumUpgrade}/stream/month = +${premiumUpgradeCost.toLocaleString()}`);
          }
        }
        
        if (subscriptionUpgrades.includes('api')) {
          const apiCost = 5; // $5 extra per camera per month
          if (billingCycle === 'annual') {
            const apiUpgradeCost = numCameras * apiCost * (1 - discountRate);
            upgradeCost += apiUpgradeCost * 12;
            monthlyEstimate += apiUpgradeCost;
            breakdown.push(`API Access: ${numCameras} cameras × ${apiCost}/stream/month × 0.65 (after discount) = +${Math.round(apiUpgradeCost).toLocaleString()}/month`);
          } else {
            const apiUpgradeCost = numCameras * apiCost;
            upgradeCost += apiUpgradeCost;
            breakdown.push(`API Access: ${numCameras} cameras × ${apiCost}/stream/month = +${apiUpgradeCost.toLocaleString()}`);
          }
        }
        
        if (subscriptionUpgrades.includes('support')) {
          const supportCost = 100; // $100 per month
          if (billingCycle === 'annual') {
            const supportUpgradeCost = supportCost * (1 - discountRate);
            upgradeCost += supportUpgradeCost * 12;
            monthlyEstimate += supportUpgradeCost;
            breakdown.push(`Priority Support: ${supportCost}/month × 0.65 (after discount) = +${Math.round(supportUpgradeCost).toLocaleString()}/month`);
          } else {
            upgradeCost += supportCost;
            breakdown.push(`Priority Support: +${supportCost}/month`);
          }
        }
        break;
        
      case 'premium':
        // $50 per camera per month
        const premiumRate = 50;
        
        // Calculate based on billing cycle
        if (billingCycle === 'annual') {
          discountRate = 0.35;
          monthlyEstimate = numCameras * premiumRate * (1 - discountRate);
          baseCost = monthlyEstimate * 12;
          periodLabel = '/month ($' + Math.round(baseCost).toLocaleString() + '/year)';
          breakdown.push(`Base cost: ${numCameras} cameras × ${premiumRate}/stream/month × 12 months = ${(numCameras * premiumRate * 12).toLocaleString()}`);
          breakdown.push(`Annual Discount: -35% = -${(numCameras * premiumRate * 12 * 0.35).toLocaleString()}`);
        } else {
          baseCost = numCameras * premiumRate;
          periodLabel = '/month';
          breakdown.push(`Base cost: ${numCameras} cameras × ${premiumRate}/stream/month = ${(numCameras * premiumRate).toLocaleString()}`);
        }
        
        // Handle subscription upgrades
        if (subscriptionUpgrades.includes('api')) {
          const apiCost = 5; // $5 extra per camera per month
          if (billingCycle === 'annual') {
            const apiUpgradeCost = numCameras * apiCost * (1 - discountRate);
            upgradeCost += apiUpgradeCost * 12;
            monthlyEstimate += apiUpgradeCost;
            breakdown.push(`API Access: ${numCameras} cameras × ${apiCost}/stream/month × 0.65 (after discount) = +${Math.round(apiUpgradeCost).toLocaleString()}/month`);
          } else {
            const apiUpgradeCost = numCameras * apiCost;
            upgradeCost += apiUpgradeCost;
            breakdown.push(`API Access: ${numCameras} cameras × ${apiCost}/stream/month = +${apiUpgradeCost.toLocaleString()}`);
          }
        }
        
        if (subscriptionUpgrades.includes('support')) {
          const supportCost = 100; // $100 per month
          if (billingCycle === 'annual') {
            const supportUpgradeCost = supportCost * (1 - discountRate);
            upgradeCost += supportUpgradeCost * 12;
            monthlyEstimate += supportUpgradeCost;
            breakdown.push(`Priority Support: ${supportCost}/month × 0.65 (after discount) = +${Math.round(supportUpgradeCost).toLocaleString()}/month`);
          } else {
            upgradeCost += supportCost;
            breakdown.push(`Priority Support: +${supportCost}/month`);
          }
        }
        break;
        
      default:
        // No plan selected
        totalEstimate = 0;
        periodLabel = '';
        break;
    }
    
    // Calculate total (for local plan, apply discount last)
    if (planType === 'local' && baseCost > 0) {
      const subtotal = baseCost + upgradeCost;
      const discount = subtotal * discountRate;
      totalEstimate = subtotal - discount;
      if (discount > 0) {
        breakdown.push(`Subtotal: $${subtotal.toLocaleString()}`);
        breakdown.push(`Discount: -$${discount.toLocaleString()}`);
      }
    } else {
      // For subscription plans
      if (billingCycle === 'annual') {
        totalEstimate = monthlyEstimate;
      } else {
        totalEstimate = baseCost + upgradeCost;
      }
      if (upgradeCost > 0 && billingCycle !== 'annual') {
        breakdown.push(`Total: $${Math.round(totalEstimate).toLocaleString()}${periodLabel}`);
      }
    }
    
    // Format as currency for the main display
    const formattedEstimate = totalEstimate > 0 ? 
      `$${Math.round(totalEstimate).toLocaleString()}${periodLabel}` : 
      "$ ---";
    
    setEstimateResult(formattedEstimate);
    setBreakdownItems(breakdown);
  };

  // Handle checkbox change for local upgrades
  const handleLocalUpgradeChange = (value) => {
    if (localUpgrades.includes(value)) {
      setLocalUpgrades(localUpgrades.filter(item => item !== value));
    } else {
      setLocalUpgrades([...localUpgrades, value]);
    }
  };

  // Handle checkbox change for subscription upgrades
  const handleSubscriptionUpgradeChange = (value) => {
    if (subscriptionUpgrades.includes(value)) {
      setSubscriptionUpgrades(subscriptionUpgrades.filter(item => item !== value));
    } else {
      setSubscriptionUpgrades([...subscriptionUpgrades, value]);
    }
  };

  // Reset the form and close modal
  const closeAndResetModal = () => {
    setPlanType('');
    setNumCameras(1);
    setLocalUpgrades([]);
    setSubscriptionUpgrades([]);
    setLocalDiscount('none');
    setBillingCycle('monthly');
    setEstimateResult(null);
    setBreakdownItems([]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#151723] text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#1c1e2a] z-50 h-[70px] transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-5 h-full flex items-center justify-between relative">
          <button 
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </button>
          
          <a href="#" className="flex items-center">
            <span className="text-xl font-semibold">SentrySight</span>
          </a>
          
          <nav className={`${mobileMenuOpen ? 'left-0' : '-left-full'} md:static absolute top-[70px] w-full md:w-auto bg-[#151723] md:bg-transparent transition-all duration-300 ease-in-out md:flex`}>
            <ul className="md:flex md:items-center md:space-x-6 p-0 md:p-0">
              <li className="mb-4 md:mb-0 border-b border-opacity-10 border-white md:border-0 pb-4 md:pb-0">
                <a href="#" className="text-[#b0b0b0] hover:text-white px-5 md:px-0 flex items-center">
                  <span className="md:hidden mr-2">🏠</span> Home
                </a>
              </li>
              <li className="mb-4 md:mb-0 border-b border-opacity-10 border-white md:border-0 pb-4 md:pb-0">
                <a href="#" className="text-[#b0b0b0] hover:text-white px-5 md:px-0 flex items-center">
                  <span className="md:hidden mr-2">ℹ️</span> About Us
                </a>
              </li>
              <li className="mb-4 md:mb-0 border-b border-opacity-10 border-white md:border-0 pb-4 md:pb-0">
                <a href="#" className="text-[#b0b0b0] hover:text-white px-5 md:px-0 flex items-center">
                  <span className="md:hidden mr-2">📋</span> Questionnaire
                </a>
              </li>
              <li className="mb-4 md:mb-0 border-b border-opacity-10 border-white md:border-0 pb-4 md:pb-0">
                <a href="#" className="text-[#b0b0b0] hover:text-white px-5 md:px-0 flex items-center">
                  <span className="md:hidden mr-2">▶️</span> Demo
                </a>
              </li>
              <li className="mb-4 md:mb-0 border-b border-opacity-10 border-white md:border-0 pb-4 md:pb-0">
                <a href="#" className="text-white px-5 md:px-0 flex items-center">
                  <span className="md:hidden mr-2">🏷️</span> Pricing
                </a>
              </li>
            </ul>
          </nav>
          
          <a href="#" className="bg-[#ed3c64] text-white px-4 py-2 rounded text-sm font-medium hidden md:block">
            Sign Up for Waitlist
          </a>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pt-[130px] pb-20">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Our Pricing Plans</h1>
            <p className="text-[#b0b0b0] text-lg max-w-2xl mx-auto">
              Choose the plan that best fits your security needs and budget.
            </p>
            
            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center mt-8 space-x-3">
              <span className="text-[#b0b0b0]">Monthly</span>
              <label className="relative inline-block w-[60px] h-[30px]">
                <input 
                  type="checkbox" 
                  className="opacity-0 w-0 h-0"
                  checked={isYearly}
                  onChange={() => setIsYearly(!isYearly)}
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#2a2d3d] border border-[#444857] rounded-[34px] transition-all duration-400 before:absolute before:content-[''] before:h-[22px] before:w-[22px] before:left-1 before:bottom-[3px] before:bg-[#8B7DEE] before:rounded-full before:transition-all before:duration-400 before:transform" 
                  style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
                />
              </label>
              <span className="text-[#b0b0b0]">Yearly</span>
              <span className="bg-[#8B7DEE] text-white text-xs font-bold py-1 px-2 rounded-full ml-2">Save 35%</span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Plan 1: Local On-Premise */}
            <div className="bg-[#1c1e2a] rounded-xl overflow-hidden shadow-lg border border-[#444857] transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl relative flex flex-col">
              <div className="bg-[#3a9e6a] py-6 px-5 text-center">
                <h2 className="text-xl font-semibold tracking-wider uppercase">Local On-Premise</h2>
              </div>
              <div className="text-center text-4xl font-light py-8 px-5 border-b border-[#444857] bg-black bg-opacity-10">
                $2,000<span className="block text-sm font-normal text-[#b0b0b0] mt-2">/appliance</span>
              </div>
              <div className="p-7 flex-grow">
                <ul className="list-none p-0 m-0">
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a9e6a] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Flat license fee of $500</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a9e6a] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Receive the newest update and feature with no additional cost</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a9e6a] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Robust hardware equipped for 10+ cameras</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <XCircle className="text-[#666] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Cameras not included</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 text-center border-t border-[#444857] mt-auto">
                <a href="#" className="inline-block bg-[#3a9e6a] text-white py-3 px-6 rounded-md font-medium w-4/5 max-w-[200px] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
                  Select Plan
                </a>
              </div>
            </div>

            {/* Plan 2: Basic Subscription */}
            <div className="bg-[#1c1e2a] rounded-xl overflow-hidden shadow-lg border-2 border-[#8B7DEE] transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl relative flex flex-col">
              <div className="absolute top-0 right-5 bg-[#8B7DEE] text-white text-xs font-bold py-1 px-3 rounded-b-lg z-10">
                Most Popular
              </div>
              <div className="bg-[#3a6a9e] py-6 px-5 text-center">
                <h2 className="text-xl font-semibold tracking-wider uppercase">Basic Subscription</h2>
              </div>
              <div className="text-center text-4xl font-light py-8 px-5 border-b border-[#444857] bg-black bg-opacity-10">
                {!isYearly ? (
                  <div>
                    $15<span className="block text-sm font-normal text-[#b0b0b0] mt-2">/stream/month</span>
                  </div>
                ) : (
                  <div>
                    $117<span className="block text-sm font-normal text-[#b0b0b0] mt-2">/stream/year</span>
                    <span className="block text-xs text-[#8B7DEE] mt-1 font-medium">Save $63/year</span>
                  </div>
                )}
              </div>
              <div className="p-7 flex-grow">
                <ul className="list-none p-0 m-0">
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a6a9e] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Flat license fee of $500</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a6a9e] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Receive updates during subscription</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a6a9e] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Free customer and technical support 24/7</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <CheckCircle className="text-[#3a6a9e] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Law Enforcement Escalation</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <AlertCircle className="text-[#aaa] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>SMS fees at additional cost</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 text-center border-t border-[#444857] mt-auto">
                <a href="#" className="inline-block bg-[#3a6a9e] text-white py-3 px-6 rounded-md font-medium w-4/5 max-w-[200px] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
                  Select Plan
                </a>
              </div>
            </div>

            {/* Plan 3: Premium Package */}
            <div className="bg-[#1c1e2a] rounded-xl overflow-hidden shadow-lg border border-[#444857] transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl relative flex flex-col">
              <div className="bg-[#e65100] py-6 px-5 text-center">
                <h2 className="text-xl font-semibold tracking-wider uppercase">Premium Package</h2>
              </div>
              <div className="text-center text-4xl font-light py-8 px-5 border-b border-[#444857] bg-black bg-opacity-10">
                {!isYearly ? (
                  <div>
                    $50<span className="block text-sm font-normal text-[#b0b0b0] mt-2">/stream/month</span>
                    <div className="text-xs opacity-80 mt-1">or $5,000/appliance</div>
                  </div>
                ) : (
                  <div>
                    $390<span className="block text-sm font-normal text-[#b0b0b0] mt-2">/stream/year</span>
                    <span className="block text-xs text-[#8B7DEE] mt-1 font-medium">Save $210/year</span>
                  </div>
                )}
              </div>
              <div className="p-7 flex-grow">
                <ul className="list-none p-0 m-0">
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <Star className="text-[#e65100] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>All Basic benefits included</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <Star className="text-[#e65100] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Additional tailored business safety features</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <Star className="text-[#e65100] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Further discounts for extended contract terms</span>
                  </li>
                  <li className="flex items-start mb-4 text-[#b0b0b0]">
                    <Star className="text-[#e65100] mr-3 mt-1 flex-shrink-0" size={18} />
                    <span>Priority Support Queue</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 text-center border-t border-[#444857] mt-auto">
                <a href="#" className="inline-block bg-[#e65100] text-white py-3 px-6 rounded-md font-medium w-4/5 max-w-[200px] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">
                  Select Plan
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-5 mt-10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ed3c64] text-white py-3 px-8 rounded-lg text-lg border border-[#ed3c64] min-w-[250px] transition-all duration-300 hover:bg-transparent hover:text-[#ed3c64]"
            >
              Get a Custom Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111219] py-12">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap justify-center space-x-6 mb-6">
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Home</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">About Us</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Questionnaire</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Demo</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Terms</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Privacy</a>
            <a href="#" className="text-[#b0b0b0] hover:text-white mb-2">Pricing</a>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-[#b0b0b0] hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-[#b0b0b0] hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-[#b0b0b0] hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-[#b0b0b0] hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-[#b0b0b0] hover:text-white">
              <span className="sr-only">Email</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>
          <p className="text-center text-[#b0b0b0] text-sm">© 2025 SentrySight. All rights reserved.</p>
        </div>
      </footer>

      {/* Estimate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1001] transition-opacity duration-300">
          <div 
            className="bg-[#111219] text-white w-11/12 max-w-[700px] max-h-[85vh] p-6 md:p-10 rounded-lg overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-4xl text-[#b0b0b0] hover:text-white bg-transparent border-0 p-0 leading-none cursor-pointer"
              onClick={closeAndResetModal}
            >
              <X />
            </button>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-[#8B7DEE]">Get a Custom Estimate</h2>
            <p className="text-center text-[#b0b0b0] mb-8">Fill in your requirements below for a preliminary estimate.</p>
            
            <div>
              {/* Camera Setup */}
              <div className="mb-8 pb-6 border-b border-[#444857]">
                <h3 className="text-xl font-medium mb-5 flex items-center text-white">
                  <Video className="text-[#8B7DEE] mr-3" />
                  Camera Setup
                </h3>
                <div className="mb-5">
                  <label htmlFor="numCameras" className="block mb-2 font-medium text-[#b0b0b0] text-sm">
                    Number of Streams:
                  </label>
                  <input 
                    type="number" 
                    id="numCameras" 
                    name="numCameras" 
                    min="1" 
                    value={numCameras}
                    onChange={(e) => setNumCameras(parseInt(e.target.value) || 1)}
                    className="w-full p-3 bg-[#2a2d3d] border border-[#444857] rounded-md text-white focus:outline-none focus:border-[#8B7DEE] focus:ring-3 focus:ring-[rgba(139,125,238,0.3)]"
                    required
                  />
                </div>
              </div>
              
              {/* Plan Selection */}
              <div className="mb-8 pb-6 border-b border-[#444857]">
                <h3 className="text-xl font-medium mb-5 flex items-center text-white">
                  <Shield className="text-[#8B7DEE] mr-3" />
                  Plan Selection
                </h3>
                <div className="mb-5">
                  <label htmlFor="planType" className="block mb-2 font-medium text-[#b0b0b0] text-sm">
                    Which Plan are you interested in?
                  </label>
                  <select 
                    id="planType" 
                    name="planType" 
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    className="w-full p-3 bg-[#2a2d3d] border border-[#444857] rounded-md text-white focus:outline-none focus:border-[#8B7DEE] focus:ring-3 focus:ring-[rgba(139,125,238,0.3)] appearance-none bg-[right_10px_center] bg-no-repeat pr-8"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b0b0b0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`
                    }}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="local">Local On-Premise</option>
                    <option value="basic">Basic Subscription</option>
                    <option value="premium">Premium Package</option>
                  </select>
                </div>
              </div>
              
              {/* Upgrade Options */}
              {planType && (
                <div className="mb-8 pb-6 border-b border-[#444857]">
                  <h3 className="text-xl font-medium mb-5 flex items-center text-white">
                    <ArrowUpCircle className="text-[#8B7DEE] mr-3" />
                    Upgrade Options
                  </h3>
                  
                  {planType === 'local' && (
                    <div className="mb-5">
                      <label className="block mb-3 font-medium text-[#b0b0b0] text-sm">
                        Available Upgrades (Select all that apply):
                      </label>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="localUpgrade_support" 
                            checked={localUpgrades.includes('support')}
                            onChange={() => handleLocalUpgradeChange('support')}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="localUpgrade_support" className="cursor-pointer select-none text-[#b0b0b0]">
                            Customer Support (+$500)
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="localUpgrade_extended"
                            checked={localUpgrades.includes('extended')}
                            onChange={() => handleLocalUpgradeChange('extended')}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="localUpgrade_extended" className="cursor-pointer select-none text-[#b0b0b0]">
                            Extended Warranty (+$300/appliance)
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="localUpgrade_premium"
                            checked={localUpgrades.includes('premium')}
                            onChange={() => handleLocalUpgradeChange('premium')}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="localUpgrade_premium" className="cursor-pointer select-none text-[#b0b0b0]">
                            Upgrade to Premium Software (+$3000/appliance)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(planType === 'basic' || planType === 'premium') && (
                    <div className="mb-5">
                      <label className="block mb-3 font-medium text-[#b0b0b0] text-sm">
                        Available Upgrades (Select all that apply):
                      </label>
                      <div className="flex flex-col gap-3">
                        {planType === 'basic' && (
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="subscriptionUpgrade_premium"
                              checked={subscriptionUpgrades.includes('premium')}
                              onChange={() => handleSubscriptionUpgradeChange('premium')}
                              className="w-5 h-5 cursor-pointer"
                            />
                            <label htmlFor="subscriptionUpgrade_premium" className="cursor-pointer select-none text-[#b0b0b0]">
                              Upgrade to Premium (+$35/stream/month)
                            </label>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="subscriptionUpgrade_api"
                            checked={subscriptionUpgrades.includes('api')}
                            onChange={() => handleSubscriptionUpgradeChange('api')}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="subscriptionUpgrade_api" className="cursor-pointer select-none text-[#b0b0b0]">
                            API Access (+$5/stream/month)
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="subscriptionUpgrade_support"
                            checked={subscriptionUpgrades.includes('support')}
                            onChange={() => handleSubscriptionUpgradeChange('support')}
                            className="w-5 h-5 cursor-pointer"
                          />
                          <label htmlFor="subscriptionUpgrade_support" className="cursor-pointer select-none text-[#b0b0b0]">
                            24/7 Priority Support (+$100/month)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Discount Options */}
              {planType && (
                <div className="mb-8 pb-6 border-b border-[#444857]">
                  <h3 className="text-xl font-medium mb-5 flex items-center text-white">
                    <Percent className="text-[#8B7DEE] mr-3" />
                    Discount Options
                  </h3>
                  
                  {planType === 'local' && (
                    <div className="mb-5">
                      <label htmlFor="localDiscount" className="block mb-2 font-medium text-[#b0b0b0] text-sm">
                        Available Discounts:
                      </label>
                      <select 
                        id="localDiscount" 
                        name="localDiscount"
                        value={localDiscount}
                        onChange={(e) => setLocalDiscount(e.target.value)}
                        className="w-full p-3 bg-[#2a2d3d] border border-[#444857] rounded-md text-white focus:outline-none focus:border-[#8B7DEE] focus:ring-3 focus:ring-[rgba(139,125,238,0.3)] appearance-none bg-[right_10px_center] bg-no-repeat pr-8"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b0b0b0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`
                        }}
                      >
                        <option value="none">No Discount</option>
                        <option value="multi">Multi-Appliance (15% off 5+ appliances)</option>
                        <option value="partner">Partner Discount (20% off)</option>
                      </select>
                    </div>
                  )}
                  
                  {(planType === 'basic' || planType === 'premium') && (
                    <div className="mb-5">
                      <label htmlFor="billingCycle" className="block mb-2 font-medium text-[#b0b0b0] text-sm">
                        Billing Cycle:
                      </label>
                      <select 
                        id="billingCycle" 
                        name="billingCycle"
                        value={billingCycle}
                        onChange={(e) => setBillingCycle(e.target.value)}
                        className="w-full p-3 bg-[#2a2d3d] border border-[#444857] rounded-md text-white focus:outline-none focus:border-[#8B7DEE] focus:ring-3 focus:ring-[rgba(139,125,238,0.3)] appearance-none bg-[right_10px_center] bg-no-repeat pr-8"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b0b0b0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`
                        }}
                      >
                        <option value="monthly">Monthly (Regular Price)</option>
                        <option value="annual">Annual (35% Discount)</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
              
              {/* Estimate Results */}
              {estimateResult && (
                <div className="mb-8 p-5 bg-[rgba(139,125,238,0.1)] border border-[rgba(139,125,238,0.3)] rounded-lg text-center">
                  <div className="mb-1">
                    Estimated Cost: <span className="text-2xl font-bold text-[#8B7DEE] block my-1">{estimateResult}</span>
                  </div>
                  {breakdownItems.length > 0 && (
                    <div className="mt-4 text-left">
                      <h4 className="font-medium mb-2">Cost Breakdown:</h4>
                      <div className="space-y-1">
                        {breakdownItems.map((item, index) => (
                          <p key={index} className="text-sm text-[#b0b0b0]">{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  <small className="text-xs text-[#b0b0b0] block mt-3">This is a preliminary estimate. Please contact us for a detailed quote.</small>
                </div>
              )}
              
              <div className="text-center mt-8">
                <button 
                  onClick={calculateEstimate}
                  className="bg-[#3a9e6a] text-white py-3 px-6 rounded-lg text-lg font-medium min-w-[180px] border border-[#3a9e6a] transition-all duration-300 hover:bg-transparent hover:text-[#3a9e6a]"
                >
                  Calculate Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;