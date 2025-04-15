import React, { useState, useEffect } from 'react';
import './Pricing.css'; // Import the CSS file

// Dummy function if not passed as prop
const defaultOnContactClick = () => {
  console.log("Contact button clicked - provide an onContactClick prop to handle this.");
};

function Pricing({ onContactClick = defaultOnContactClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numCameras, setNumCameras] = useState(1);
  const [planType, setPlanType] = useState('');
  const [localUpgrades, setLocalUpgrades] = useState([]);
  const [subscriptionUpgrades, setSubscriptionUpgrades] = useState([]);
  const [localDiscount, setLocalDiscount] = useState('none');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [estimateResult, setEstimateResult] = useState(null);
  const [breakdown, setBreakdown] = useState([]);

  // Display appropriate upgrade and discount options based on plan type
  const showLocalUpgradeOptions = planType === 'local';
  const showSubscriptionUpgradeOptions = planType === 'basic' || planType === 'premium';
  const showLocalDiscountOptions = planType === 'local';
  const showSubscriptionDiscountOptions = planType === 'basic' || planType === 'premium';

   // Simplified calculation logic - focusing on presentation fix
   const calculateEstimate = (e) => {
      if (e) e.preventDefault();
      // Basic placeholder calculation - replace with your full logic if needed
      let baseCost = 0;
      let periodLabel = '';
      let breakdownItems = [`Plan: ${planType}`, `Cameras: ${numCameras}`];

      switch(planType) {
          case 'local': baseCost = 2000 + 500 * Math.ceil(numCameras / 8); periodLabel=''; break;
          case 'basic': baseCost = 15 * numCameras; periodLabel = '/month'; break;
          case 'premium': baseCost = 50 * numCameras; periodLabel = '/month'; break;
          default: baseCost = 0; periodLabel = ''; break;
      }

       if (planType === 'basic' || planType === 'premium') {
           if (billingCycle === 'annual') {
              const annualCost = baseCost * 12 * 0.65; // 35% discount
              const monthlyEquivalent = annualCost / 12;
              setEstimateResult(`$${Math.round(monthlyEquivalent).toLocaleString()}/month ($${Math.round(annualCost).toLocaleString()}/year)`);
              breakdownItems.push(`Billing: Annual (35% off)`);
           } else {
               setEstimateResult(`$${Math.round(baseCost).toLocaleString()}${periodLabel}`);
                breakdownItems.push(`Billing: Monthly`);
           }
       } else if (planType === 'local') {
            setEstimateResult(`$${Math.round(baseCost).toLocaleString()}`); // One-time
       }
       else {
          setEstimateResult('$ ---');
       }
       setBreakdown(breakdownItems);
   };


  // Handle checkbox changes for local upgrades
  const handleLocalUpgradeChange = (value) => {
    setLocalUpgrades(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Handle checkbox changes for subscription upgrades
  const handleSubscriptionUpgradeChange = (value) => {
    setSubscriptionUpgrades(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Recalculate estimate when relevant state changes
  useEffect(() => {
    if (planType && numCameras > 0) {
       calculateEstimate(); // Call without event object
    } else {
       setEstimateResult(null); // Clear estimate if plan/cameras are invalid
       setBreakdown([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCameras, planType, localUpgrades, subscriptionUpgrades, localDiscount, billingCycle]); // Add dependencies

  // Reset dependent state when plan type changes
  useEffect(() => {
    setLocalUpgrades([]);
    setSubscriptionUpgrades([]);
    setLocalDiscount('none');
    setBillingCycle('monthly');
    // Don't reset numCameras here, user might want to compare plans for same cameras
  }, [planType]);


  return (
    <main className="pricing-wrapper">
      <div className="pricing-container">
        {/* Local On-Premise Card */}
        <div className="price-card">
          {/* No badge */}
          <div className="price-header flat">
            <h2>LOCAL ON-PREMISE</h2>
          </div>
          <div className="price-amount">
            <h3>$2,000<span className="price-unit">/appliance</span></h3>
          </div>
          <div className="price-features">
            <ul>
              <li><span className="icon-checkmark"></span>Flat license fee of $500</li>
              <li><span className="icon-checkmark"></span>Receive the newest update and feature with no additional cost</li>
              <li><span className="icon-checkmark"></span>Robust hardware equipped for 10+ cameras</li>
              <li><span className="icon-checkmark"></span>Cameras not included</li>
            </ul>
          </div>
          <div className="price-button-container">
            <button className="price-button flat" onClick={() => {setPlanType('local'); setIsModalOpen(true);}}>
              Select Plan
            </button>
          </div>
        </div>

        {/* Basic Subscription Card */}
        <div className="price-card popular">
          {/* Badge moved to the top */}
          <div className="popular-badge">Most Popular</div>
          <div className="price-header basic">
            <h2>BASIC SUBSCRIPTION</h2>
          </div>
          <div className="price-amount">
            <h3>$15<span className="price-unit">/camera/month</span></h3>
          </div>
          <div className="price-features">
            <ul>
              <li><span className="icon-checkmark"></span>Flat license fee of $500</li>
              <li><span className="icon-checkmark"></span>Receive updates during subscription</li>
              <li><span className="icon-checkmark"></span>Free customer and technical support 24/7</li>
              <li><span className="icon-checkmark"></span>SMS fees at additional cost</li>
            </ul>
          </div>
          <div className="price-button-container">
            <button className="price-button basic" onClick={() => {setPlanType('basic'); setIsModalOpen(true);}}>
              Select Plan
            </button>
          </div>
        </div>

        {/* Premium Package Card */}
        <div className="price-card">
          {/* No badge */}
          <div className="price-header premium">
            <h2>PREMIUM PACKAGE</h2>
          </div>
          <div className="price-amount">
            <h3>$50<span className="price-unit">/camera/month</span></h3>
            <div className="price-alternative">or $5,000/appliance</div>
          </div>
          <div className="price-features">
            <ul>
              <li><span className="icon-star"></span>All Basic benefits included</li>
              <li><span className="icon-star"></span>Additional tailored business safety features</li>
              <li><span className="icon-star"></span>Further discounts for extended contract terms</li>
              <li><span className="icon-star"></span>Priority Support Queue</li>
            </ul>
          </div>
          <div className="price-button-container">
            <button className="price-button premium" onClick={() => {setPlanType('premium'); setIsModalOpen(true);}}>
              Select Plan
            </button>
          </div>
        </div>
      </div>

      <div className="contact-button-container">
        <button
          onClick={() => setIsModalOpen(true)}
          className="contact-button estimate">
          Get a Custom Estimate
        </button>
      </div>

      {/* Custom Estimate Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</button>

            <form onSubmit={calculateEstimate}>
              <div className="calculator-header">
                <h2>Get a Custom Estimate</h2>
                <p>Fill in your requirements below for a preliminary estimate.</p>
              </div>

              {/* Camera Setup Section */}
              <div className="modal-section">
                 <h3><i className="modal-icon camera-icon"></i>Camera Setup</h3>
                 <div className="form-group">
                   <label htmlFor="numCameras">Number of Cameras:</label>
                   <input
                     type="number"
                     id="numCameras"
                     min="1"
                     value={numCameras}
                     onChange={(e) => setNumCameras(parseInt(e.target.value) || 1)}
                     required
                     />
                 </div>
               </div>

               {/* Plan Selection Section */}
               <div className="modal-section">
                 <h3><i className="modal-icon plan-icon"></i>Plan Selection</h3>
                 <div className="form-group">
                   <label htmlFor="planType">Which Plan are you interested in?</label>
                   <select
                     id="planType"
                     value={planType}
                     onChange={(e) => setPlanType(e.target.value)}
                     required
                   >
                     <option value="">-- Select --</option>
                     <option value="local">Local On-Premise</option>
                     <option value="basic">Basic Subscription</option>
                     <option value="premium">Premium Package</option>
                   </select>
                 </div>
               </div>

               {/* Conditionally render sections based on plan type */}
               {planType && (
                 <>
                    {/* Upgrade Options Section */}
                     <div className="modal-section">
                       <h3><i className="modal-icon upgrade-icon"></i>Upgrade Options</h3>
                       {showLocalUpgradeOptions && (
                         <div className="form-group">
                            <label>Available Upgrades (Select all that apply):</label>
                           <div className="checkbox-group">
                              {/* Local Upgrade Checkboxes */}
                              <div className="checkbox-option">
                                 <input type="checkbox" id="localUpgrade_support" checked={localUpgrades.includes('support')} onChange={() => handleLocalUpgradeChange('support')} />
                                 <label htmlFor="localUpgrade_support">Customer Support (+$500)</label>
                              </div>
                              <div className="checkbox-option">
                                <input type="checkbox" id="localUpgrade_extended" checked={localUpgrades.includes('extended')} onChange={() => handleLocalUpgradeChange('extended')} />
                                <label htmlFor="localUpgrade_extended">Extended Warranty (+$300/appliance)</label>
                              </div>
                              <div className="checkbox-option">
                                 <input type="checkbox" id="localUpgrade_premium" checked={localUpgrades.includes('premium')} onChange={() => handleLocalUpgradeChange('premium')} />
                                 <label htmlFor="localUpgrade_premium">Upgrade to Premium Software (+$3000/appliance)</label>
                              </div>
                           </div>
                          </div>
                       )}
                       {showSubscriptionUpgradeOptions && (
                         <div className="form-group">
                           <label>Available Upgrades (Select all that apply):</label>
                           <div className="checkbox-group">
                             {/* Subscription Upgrade Checkboxes */}
                             {planType === 'basic' && (
                                <div className="checkbox-option">
                                  <input type="checkbox" id="subscriptionUpgrade_premium" checked={subscriptionUpgrades.includes('premium')} onChange={() => handleSubscriptionUpgradeChange('premium')} />
                                  <label htmlFor="subscriptionUpgrade_premium">Upgrade to Premium (+$35/camera/month)</label>
                                </div>
                              )}
                             <div className="checkbox-option">
                               <input type="checkbox" id="subscriptionUpgrade_api" checked={subscriptionUpgrades.includes('api')} onChange={() => handleSubscriptionUpgradeChange('api')} />
                               <label htmlFor="subscriptionUpgrade_api">API Access (+$5/camera/month)</label>
                              </div>
                              <div className="checkbox-option">
                                <input type="checkbox" id="subscriptionUpgrade_support" checked={subscriptionUpgrades.includes('support')} onChange={() => handleSubscriptionUpgradeChange('support')} />
                                <label htmlFor="subscriptionUpgrade_support">24/7 Priority Support (+$100/month)</label>
                              </div>
                           </div>
                         </div>
                       )}
                       {/* Message if no upgrades available for selected plan */}
                        {!showLocalUpgradeOptions && !showSubscriptionUpgradeOptions && planType && (
                           <p>No specific upgrades available for this section with the selected plan.</p>
                       )}
                     </div>

                     {/* Discount Options Section */}
                     <div className="modal-section">
                       <h3><i className="modal-icon discount-icon"></i>Discount Options</h3>
                       {showLocalDiscountOptions && (
                         <div className="form-group">
                           <label htmlFor="localDiscount">Available Discounts:</label>
                           <select id="localDiscount" value={localDiscount} onChange={(e) => setLocalDiscount(e.target.value)}>
                             <option value="none">No Discount</option>
                             <option value="multi">Multi-Appliance (15% off 5+ appliances)</option>
                             <option value="partner">Partner Discount (20% off)</option>
                           </select>
                         </div>
                       )}
                       {showSubscriptionDiscountOptions && (
                         <div className="form-group">
                           <label htmlFor="billingCycle">Billing Cycle:</label>
                           <select id="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)}>
                             <option value="monthly">Monthly (Regular Price)</option>
                             <option value="annual">Annual (35% Discount)</option>
                           </select>
                         </div>
                       )}
                       {/* Message if no discounts available for selected plan */}
                        {!showLocalDiscountOptions && !showSubscriptionDiscountOptions && planType && (
                           <p>No specific discounts available for this section with the selected plan.</p>
                       )}
                     </div>

                     {/* Results Section */}
                     {estimateResult && (
                       <div className="estimate-result-container">
                         <div className="estimate-total">
                           Estimated Cost: <span className="estimate-value">{estimateResult}</span>
                         </div>
                          {breakdown.length > 0 && (
                               <div className="estimate-breakdown">
                                   <h4>Cost Breakdown:</h4>
                                   <div className="breakdown-items">
                                       {breakdown.map((item, index) => (
                                           <p key={index}>{item}</p>
                                       ))}
                                   </div>
                               </div>
                           )}
                         <small>This is a preliminary estimate based on selected options. Contact us for a detailed quote.</small>
                       </div>
                     )}

                     <div className="modal-actions">
                       {/* Optional: Keep Calculate button or remove if estimate updates live */}
                       {/* <button type="submit" className="action-button estimate-button">Calculate Estimate</button> */}
                       <button type="button" className="action-button close-button" onClick={() => setIsModalOpen(false)}>Close</button>
                     </div>
                </>
              )}
              {/* Show message if no plan is selected */}
                {!planType && (
                    <p style={{textAlign: 'center', marginTop: '20px', color: '#ccc'}}>Please select a plan to see options and estimate.</p>
                )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Pricing;