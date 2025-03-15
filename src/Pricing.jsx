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

  return (
    <main className="container">
      <div className="container">
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
        }}>
          {/* Flat Purchase */}
          <div className="card">
            <div style={{ backgroundColor: "#4CAF50", padding: "24px 16px" }} className="text-center">
              <h2 style={{ color: "white", fontSize: "1.5rem", letterSpacing: "0.05em", margin: "0" }}>FLAT PURCHASE</h2>
            </div>
            <div className="text-center" style={{ fontSize: "1.875rem", color: "#333", padding: "24px", borderBottom: "1px solid #eee", margin: "0" }}>
              $2,000/appliance
            </div>
            <div style={{ padding: "24px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Flat license fee of $500</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Receive the newest update and feature with no additional cost</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Receive a robust hardware equipped with strong capacity for 10+ cameras</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Cameras not included</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Basic Subscription */}
          <div className="card">
            <div style={{ backgroundColor: "#3f51b5", padding: "24px 16px" }} className="text-center">
              <h2 style={{ color: "white", fontSize: "1.5rem", letterSpacing: "0.05em", margin: "0" }}>BASIC SUBSCRIPTION</h2>
            </div>
            <div className="text-center" style={{ fontSize: "1.875rem", color: "#333", padding: "24px", borderBottom: "1px solid #eee", margin: "0" }}>
              $15/camera/month
            </div>
            <div style={{ padding: "24px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#3f51b5", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Flat license fee of $500</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#3f51b5", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Receive the newest update and feature through subscription period</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#3f51b5", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Free customer and technical support 24/7</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#3f51b5", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>SMS fees at additional cost</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Subscription */}
          <div className="card">
            <div style={{ backgroundColor: "#e65100", padding: "24px 16px" }} className="text-center">
              <h2 style={{ color: "white", fontSize: "1.5rem", letterSpacing: "0.05em", margin: "0" }}>PREMIUM SUBSCRIPTION</h2>
            </div>
            <div className="text-center" style={{ fontSize: "1.875rem", color: "#333", padding: "24px", borderBottom: "1px solid #eee", margin: "0" }}>
              $50/camera/month
            </div>
            <div style={{ padding: "24px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#e65100", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>All of the previous subscription benefits PLUS additional safety detection features tailored for businesses</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ color: "#e65100", marginRight: "8px", fontSize: "1.25rem", lineHeight: "1.2" }}>•</span>
                  <span style={{ color: "#666", fontSize: "1rem", lineHeight: "1.5" }}>Receive further discounts by opting for an extended contract term</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "64px", marginBottom: "40px" }}>
          <button 
            onClick={onContactClick}
            className="btn"
            style={{ 
              backgroundColor: "#4CAF50", 
              width: "176px", 
              marginBottom: "16px" 
            }}
          >
            Contact Us
          </button>
          <br />
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn"
            style={{ 
              backgroundColor: "#3f51b5", 
              width: "176px" 
            }}
          >
            Press for Estimate
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ 
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
        }}>
          <div style={{ 
            backgroundColor: "white", 
            width: "60%", 
            height: "80%", 
            padding: "32px", 
            borderRadius: "15px", 
            overflowY: "auto", 
            color: "black" 
          }} className="card">
            <h2 className="text-center" style={{ fontSize: "2.25rem", marginBottom: "24px", color: "#333", letterSpacing: "0.05em" }}>
              Estimate Based on Your Requirements
            </h2>

            {/* Appliances Section */}
            <div className="card" style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px", color: "#444" }}>
                Appliances
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  How many cameras?
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
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
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  How many server/workstations?
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
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
            <div className="card" style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px", color: "#444" }}>
                Storage
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  Storage Type
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
                  value={field3}
                  onChange={(e) => setField3(e.target.value)}
                >
                  <option value="">Select Storage Type</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Physical">Physical</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  Select Storage Size
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
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
            <div className="card" style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px", color: "#444" }}>
                Network Requirements
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  Routers and Switches
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
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
            <div className="card" style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px", color: "#444" }}>
                Security Features
              </h3>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "1.125rem", fontWeight: "bold", color: "#444", marginBottom: "4px" }}>
                  Select Security Features
                </label>
                <select
                  style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "1.125rem", color: "black" }}
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
            <div className="text-center" style={{ marginBottom: "16px" }}>
              <button
                onClick={handleEstimate}
                className="btn"
              >
                Get Estimate
              </button>
            </div>

            {/* Estimate Display */}
            {estimate && (
              <div className="text-center" style={{ marginTop: "16px", fontSize: "2.25rem", color: "#444" }}>
                <strong>Estimated Price: </strong> {estimate}
              </div>
            )}

            {/* Close Button */}
            <div className="text-center" style={{ marginTop: "16px" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn"
                style={{ backgroundColor: "#e65100" }}
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