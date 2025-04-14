import React, { useState } from 'react';

function Pricing({ onContactClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [estimate, setEstimate] = useState(null);

  const handleEstimate = () => {
    // Mock calculation logic until we figure out what will be the actual estimate according to the services provided
    const mockEstimate = `$${Math.floor(Math.random() * 1000 + 500)}`;
    setEstimate(mockEstimate);
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "0",
    padding: "0"
  };

  const flatHeaderStyle = {
    backgroundColor: "#4CAF50",
    padding: "24px 16px",
    textAlign: "center"
  };

  const basicHeaderStyle = {
    backgroundColor: "#3f51b5",
    padding: "24px 16px",
    textAlign: "center"
  };

  const premiumHeaderStyle = {
    backgroundColor: "#e65100",
    padding: "24px 16px",
    textAlign: "center"
  };

  const headerTextStyle = {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "normal",
    letterSpacing: "0.05em",
    margin: "0"
  };

  const priceStyle = {
    textAlign: "center",
    fontSize: "1.875rem",
    fontWeight: "normal",
    color: "#333",
    padding: "24px",
    borderBottom: "1px solid #eee",
    margin: "0",
    backgroundColor: "white"
  };

  const featuresContainerStyle = {
    padding: "24px",
    backgroundColor: "white"
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px"
  };

  const greenDotStyle = {
    color: "#4CAF50",
    marginRight: "8px",
    fontSize: "1.25rem",
    lineHeight: "1.2"
  };

  const blueDotStyle = {
    color: "#3f51b5",
    marginRight: "8px",
    fontSize: "1.25rem",
    lineHeight: "1.2"
  };

  const orangeDotStyle = {
    color: "#e65100",
    marginRight: "8px",
    fontSize: "1.25rem",
    lineHeight: "1.2"
  };

  const featureTextStyle = {
    color: "#666",
    fontSize: "1rem",
    lineHeight: "1.5"
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "64px",
    marginBottom: "40px"
  };

  const contactButtonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 32px",
    fontSize: "1.125rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "176px",
    marginBottom: "16px",
    transition: "background-color 0.3s"
  };

  const estimateButtonStyle = {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "12px 32px",
    fontSize: "1.125rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    width: "176px",
    transition: "background-color 0.3s"
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "50"
  };

  const modalContentStyle = {
    backgroundColor: "white",
    width: "60%",
    height: "80%",
    padding: "32px",
    borderRadius: "8px",
    overflowY: "auto",
    color: "black"
  };

  return (
    <main style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1A1A1A", 
      paddingTop: "96px",
      color: "white"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "0 16px" 
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
          "@media (max-width: 768px)": {
            gridTemplateColumns: "repeat(1, 1fr)"
          }
        }}>
          {/* Flat Purchase */}
          <div style={cardStyle}>
            <div style={flatHeaderStyle}>
              <h2 style={headerTextStyle}>FLAT PURCHASE</h2>
            </div>
            <div style={priceStyle}>
              $2,000/appliance
            </div>
            <div style={featuresContainerStyle}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={featureItemStyle}>
                  <span style={greenDotStyle}>•</span>
                  <span style={featureTextStyle}>Flat license fee of $500</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={greenDotStyle}>•</span>
                  <span style={featureTextStyle}>Receive the newest update and feature with no additional cost</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={greenDotStyle}>•</span>
                  <span style={featureTextStyle}>Receive a robust hardware equipped with strong capacity for 10+ cameras</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={greenDotStyle}>•</span>
                  <span style={featureTextStyle}>Cameras not included</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Basic Subscription */}
          <div style={cardStyle}>
            <div style={basicHeaderStyle}>
              <h2 style={headerTextStyle}>BASIC SUBSCRIPTION</h2>
            </div>
            <div style={priceStyle}>
              $15/camera/month
            </div>
            <div style={featuresContainerStyle}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={featureItemStyle}>
                  <span style={blueDotStyle}>•</span>
                  <span style={featureTextStyle}>Flat license fee of $500</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={blueDotStyle}>•</span>
                  <span style={featureTextStyle}>Receive the newest update and feature through subscription period</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={blueDotStyle}>•</span>
                  <span style={featureTextStyle}>Free customer and technical support 24/7</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={blueDotStyle}>•</span>
                  <span style={featureTextStyle}>SMS fees at additional cost</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Subscription */}
          <div style={cardStyle}>
            <div style={premiumHeaderStyle}>
              <h2 style={headerTextStyle}>PREMIUM SUBSCRIPTION</h2>
            </div>
            <div style={priceStyle}>
              $50/camera/month
            </div>
            <div style={featuresContainerStyle}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={featureItemStyle}>
                  <span style={orangeDotStyle}>•</span>
                  <span style={featureTextStyle}>All of the previous subscription benefits PLUS additional safety detection features tailored for businesses</span>
                </li>
                <li style={featureItemStyle}>
                  <span style={orangeDotStyle}>•</span>
                  <span style={featureTextStyle}>Receive further discounts by opting for an extended contract term</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button 
            onClick={onContactClick}
            style={contactButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
          >
            Contact Us
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            style={estimateButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = "#35489a"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3f51b5"}
          >
            Press for Estimate
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ 
              fontSize: "2.25rem", 
              fontWeight: "bold", 
              marginBottom: "24px", 
              textAlign: "center", 
              color: "#333",
              letterSpacing: "0.05em"
            }}>
              Estimate Based on Your Requirements
            </h2>

            {/* Appliances Section */}
            <div style={{
              marginBottom: "32px",
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600", 
                marginBottom: "16px", 
                color: "#444" 
              }}>
                Appliances
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  How many cameras?
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  How many server/workstations?
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field2}
                  onChange={(e) => setField2(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Storage Section */}
            <div style={{
              marginBottom: "32px",
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600", 
                marginBottom: "16px", 
                color: "#444" 
              }}>
                Storage
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  Storage Type
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field3}
                  onChange={(e) => setField3(e.target.value)}
                >
                  <option value="">Select Storage Type</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Physical">Physical</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  Select Storage Size
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field3}
                  onChange={(e) => setField3(e.target.value)}
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
            <div style={{
              marginBottom: "32px",
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600", 
                marginBottom: "16px", 
                color: "#444" 
              }}>
                Network Requirements
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  Routers and Switches
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field1}
                  onChange={(e) => setField1(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Security Features Section */}
            <div style={{
              marginBottom: "32px",
              padding: "24px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600", 
                marginBottom: "16px", 
                color: "#444" 
              }}>
                Security Features
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ 
                  display: "block", 
                  fontSize: "1.125rem", 
                  fontWeight: "bold", 
                  color: "#444", 
                  marginBottom: "4px" 
                }}>
                  Select Security Features
                </label>
                <select
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: "1px solid #ccc", 
                    borderRadius: "8px", 
                    fontSize: "1.125rem",
                    color: "black"
                  }}
                  value={field2}
                  onChange={(e) => setField2(e.target.value)}
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

            {/* Button Section */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <button
                onClick={handleEstimate}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "1.125rem",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
              >
                Get Estimate
              </button>
            </div>

            {/* Estimate Display */}
            {estimate && (
              <div style={{ 
                marginTop: "16px", 
                textAlign: "center", 
                fontSize: "2.25rem", 
                color: "#444" 
              }}>
                <strong>Estimated Price: </strong> {estimate}
              </div>
            )}

            {/* Close Button */}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: "#e65100",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "1.125rem",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#d84315"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#e65100"}
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