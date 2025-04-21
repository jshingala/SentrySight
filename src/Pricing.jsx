import React, { useState } from 'react';

const theme = {
  colors: {
    background: "#2D2D2D",
    modalOverlay: "rgba(0, 0, 0, 0.5)",
    textPrimary: "white",
    textSecondary: "#ccc",
    textMuted: "#888",
    textDark: "#1A1A1A",
    priceBorder: "#444",
    headerFlat: "#4CAF50",
    headerBasic: "#3f51b5",
    headerPremium: "#e65100",
    modalCard: "#f9f9f9"
  },
  card: {
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "24px"
  },
  fontSizes: {
    sm: "1rem",
    md: "1.125rem",
    lg: "1.5rem",
    xl: "1.875rem",
    xxl: "2.25rem"
  }
};

function Pricing({ onContactClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [estimate, setEstimate] = useState(null);

  const handleEstimate = () => {
    const mockEstimate = `$${Math.floor(Math.random() * 1000 + 500)}`;
    setEstimate(mockEstimate);
  };

  const headerTextStyle = {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.lg,
    fontWeight: "normal",
    letterSpacing: "0.05em",
    margin: "0"
  };

  const featureTextStyle = {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.sm,
    lineHeight: "1.5"
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px"
  };

  const dotStyle = (color) => ({
    color,
    marginRight: "8px",
    fontSize: "1.25rem",
    lineHeight: "1.2"
  });

  const priceStyle = {
    textAlign: "center",
    fontSize: "clamp(1rem, 2.5vw, 1.875rem)", 
    fontWeight: "normal",
    color: theme.colors.textPrimary,
    padding: "12px",
    borderBottom: `1px solid ${theme.colors.priceBorder}`,
    margin: "0",
    backgroundColor: theme.colors.background,
    whiteSpace: "nowrap",
    overflow: "hidden",            
   
  };

  const buttonStyle = (bg) => ({
    backgroundColor: bg,
    color: theme.colors.textPrimary,
    padding: "12px 32px",
    fontSize: theme.fontSizes.md,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "176px",
    marginBottom: "16px",
    transition: "background-color 0.3s"
  });

  const modalSectionStyle = {
    ...theme.card,
    backgroundColor: theme.colors.modalCard,
    marginBottom: "32px"
  };

  const labelStyle = {
    display: "block",
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
    color: theme.colors.textDark,
    marginBottom: "4px"
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#1A1A1A",
      paddingTop: "96px",
      color: theme.colors.textPrimary
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px"
        }}>
          {[
            {
              title: "FLAT PURCHASE",
              price: "$2,000/appliance",
              bgColor: theme.colors.headerFlat,
              features: [
                "Flat license fee of $500",
                "Receive the newest update and feature with no additional cost",
                "Receive a robust hardware equipped with strong capacity for 10+ cameras",
                "Cameras not included"
              ],
              dotColor: theme.colors.headerFlat
            },
            {
              title: "BASIC SUBSCRIPTION",
              price: "$15/camera/month",
              bgColor: theme.colors.headerBasic,
              features: [
                "Flat license fee of $500",
                "Receive the newest update and feature through subscription period",
                "Free customer and technical support 24/7",
                "SMS fees at additional cost"
              ],
              dotColor: theme.colors.headerBasic
            },
            {
              title: "PREMIUM SUBSCRIPTION",
              price: "$50/camera/month",
              bgColor: theme.colors.headerPremium,
              features: [
                "All of the previous subscription benefits PLUS additional safety detection features tailored for businesses",
                "Receive further discounts by opting for an extended contract term"
              ],
              dotColor: theme.colors.headerPremium
            }
          ].map((plan, index) => (
            <div key={index} style={{
              backgroundColor: theme.colors.background,
              borderRadius: theme.card.borderRadius,
              overflow: "hidden",
              boxShadow: theme.card.boxShadow
            }}>
              <div style={{ backgroundColor: plan.bgColor, padding: "24px 16px", textAlign: "center" }}>
                <h2 style={headerTextStyle}>{plan.title}</h2>
              </div>
              <div style={priceStyle}>{plan.price}</div>
              <div style={{ padding: "24px", backgroundColor: theme.colors.background }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={featureItemStyle}>
                      <span style={dotStyle(plan.dotColor)}>•</span>
                      <span style={featureTextStyle}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Basic Subscription */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-[#3f51b5] py-6 px-4">
            <h2 className="text-white text-center text-2xl font-normal">BASIC SUBSCRIPTION</h2>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-center text-3xl font-normal text-gray-800">$15/camera/month</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#3f51b5] mr-2 text-lg">•</span>
                <span className="text-gray-600">Flat license fee of $500</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#3f51b5] mr-2 text-lg">•</span>
                <span className="text-gray-600">Receive the newest update and feature through subscription period</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#3f51b5] mr-2 text-lg">•</span>
                <span className="text-gray-600">Free customer and technical support 24/7</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#3f51b5] mr-2 text-lg">•</span>
                <span className="text-gray-600">SMS fees at additional cost</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Premium Subscription */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-[#e65100] py-6 px-4">
            <h2 className="text-white text-center text-2xl font-normal">PREMIUM SUBSCRIPTION</h2>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-center text-3xl font-normal text-gray-800">$50/camera/month</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#e65100] mr-2 text-lg">•</span>
                <span className="text-gray-600">All of the previous subscription benefits PLUS additional safety detection features tailored for businesses</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#e65100] mr-2 text-lg">•</span>
                <span className="text-gray-600">Receive further discounts by opting for an extended contract term</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="button-container text-center mt-12 mb-16 flex flex-col items-center space-y-4">
        <button
          onClick={onContactClick}
          className="px-8 py-3 bg-[#4CAF50] text-white rounded-lg text-lg hover:bg-[#45a049] transition-colors">
          Contact Us
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-[#3f51b5] text-white rounded-lg text-lg hover:bg-[#35489a] transition-colors">
          Press for Estimate
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[60%] h-[80%] p-8 rounded-lg overflow-y-auto">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center tracking-wide" style={{ fontFamily: "'Copperplate Gothic', serif" }}>
            Estimate Based on Your Requirements
          </h2>


            {/* Appliances Section */}
            <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Appliances</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">How many cameras?</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">How many server/workstations?</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field2}
                  onChange={(e) => setField2(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Storage Section */}
            <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Storage</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">Storage Type</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field3}
                  onChange={(e) => setField3(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select Storage Type</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Physical">Physical</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">Select Storage Size</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field3}
                  onChange={(e) => setField3(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select Size</option>
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                  <option value="2TB">2TB</option>
                  <option value="4TB">4TB</option>
                  <option value="8TB">8TB</option>
                  <option value="16TB">16TB</option>
                </select>
              </div>
            </div>

            {/* Network Requirements Section */}
            <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Network Requirements</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">Routers and Switches</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Security Features Section */}
            <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Security Features</h3>
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-700">Select Security Features</label>
                <select
                  className="w-full p-2 border rounded-lg text-lg"
                  value={field2}
                  onChange={(e) => setField2(e.target.value)}
                  style={{color: field1 ? "black" : ""}}
                >
                  <option value="">Select</option>
                  <option value="Encryption of data">Encryption of data</option>
                  <option value="Role-based access control">Role-based access control</option>
                  <option value="Secure cloud storage">Secure cloud storage</option>
                  <option value="Secure physical storage">Secure physical storage</option>
                  <option value="No specific security features">No specific security features</option>
                </select>
              </div>
            </div>

            {/* Get Estimate Button */}
            <div className="text-center mb-4">
              <button
                onClick={handleEstimate}
                className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] text-lg">
                Get Estimate
              </button>
            </div>

            {/* Estimate Display */}
            {estimate && (
              <div className="mt-4 text-center text-4xl text-gray-700">
                <strong>Estimated Price: </strong> {estimate}
              </div>
            )}

            {/* Close Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#e65100] text-white px-4 py-2 rounded-lg hover:bg-[#d84315] text-lg">
                Close
              </button>
            </div>
          </div>
        </div>
)}


    </main>
  );
}

export default Pricing;
