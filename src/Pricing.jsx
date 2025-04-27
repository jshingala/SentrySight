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

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "64px", marginBottom: "40px" }}>
          <button
            onClick={onContactClick}
            style={buttonStyle(theme.colors.headerFlat)}
            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.headerFlat}
          >
            Contact Us
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            style={buttonStyle(theme.colors.headerBasic)}
            onMouseOver={(e) => e.target.style.backgroundColor = "#35489a"}
            onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.headerBasic}
          >
            Press for Estimate
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: "0", left: "0", right: "0", bottom: "0",
          backgroundColor: theme.colors.modalOverlay,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "50"
        }}>
          <div style={{
            backgroundColor: theme.colors.background,
            width: "60%", height: "80%",
            padding: "32px", borderRadius: "8px",
            overflowY: "auto",
            color: theme.colors.textPrimary
          }}>
            <h2 style={{
              fontSize: theme.fontSizes.xxl,
              fontWeight: "bold",
              marginBottom: "24px",
              textAlign: "center",
              letterSpacing: "0.05em"
            }}>
              Estimate Based on Your Requirements
            </h2>

            {[
              { label: "How many cameras?", value: field1, setter: setField1 },
              { label: "How many server/workstations?", value: field2, setter: setField2 }
            ].map((input, idx) => (
              <div key={idx} style={modalSectionStyle}>
                <label style={labelStyle}>{input.label}</label>
                <select
                  style={{
                    width: "100%", padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: theme.fontSizes.md,
                    color: theme.colors.textDark
                  }}
                  value={input.value}
                  onChange={(e) => input.setter(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            ))}

            <div style={{ ...modalSectionStyle, textAlign: "center" }}>
              <button
                onClick={handleEstimate}
                style={buttonStyle(theme.colors.headerFlat)}
                onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.headerFlat}
              >
                Get Estimate
              </button>
              {estimate && (
                <div style={{
                  marginTop: "16px",
                  fontSize: theme.fontSizes.xxl,
                  color: theme.colors.textPrimary
                }}>
                  <strong>Estimated Price: </strong> {estimate}
                </div>
              )}
              <div style={{ marginTop: "16px" }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={buttonStyle(theme.colors.headerPremium)}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#d84315"}
                  onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.headerPremium}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close Button */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          onClick={() => setIsModalOpen(false)}
          style={buttonStyle(theme.colors.headerPremium)}
          onMouseOver={(e) => e.target.style.backgroundColor = "#d84315"}
          onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.headerPremium}
        >
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
