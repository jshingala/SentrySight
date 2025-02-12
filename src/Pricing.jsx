import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './Pricing.css'; // Import the CSS file

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
    <main className="min-h-screen bg-[#1A1A1A] pt-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Flat Purchase */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#4CAF50] py-6 px-4">
            <h2 className="text-white text-center text-2xl font-normal">FLAT PURCHASE</h2>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-center text-3xl font-normal text-gray-800">$2,000/appliance</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#4CAF50] mr-2 text-lg">•</span>
                <span className="text-gray-600">Flat license fee of $500</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4CAF50] mr-2 text-lg">•</span>
                <span className="text-gray-600">Receive the newest update and feature with no additional cost</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4CAF50] mr-2 text-lg">•</span>
                <span className="text-gray-600">Receive a robust hardware equipped with strong capacity for 10+ cameras</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#4CAF50] mr-2 text-lg">•</span>
                <span className="text-gray-600">Cameras not included</span>
              </li>
            </ul>
          </div>
        </motion.div>

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
