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
          <div className="bg-white w-[60%] h-[60%] p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Estimate Based on Your Requirements</h2>

          {/* These are just mock Fields and Mock Values for the fields and options for now. TODO: Will be updated soon */}
            <div className="mb-8">
            <label className="block text-gray-700 text-lg font-bold">Field 1</label>
              <select
                className="w-full p-2 border rounded-lg text-lg"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
              >
                <option value="" className="text-black-800">Select</option>
                <option value="Option 1" className="text-black-800">Option 1</option>
                <option value="Option 2" className="text-gray-800">Option 2</option>

              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold">Field 2</label>
              <select
                className="w-full p-2 border rounded-lg text-lg"
                value={field2}
                onChange={(e) => setField2(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold">Field 3</label>
              <select
                className="w-full p-2 border rounded-lg text-lg"
                value={field3}
                onChange={(e) => setField3(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
              </select>
            </div>
            <div className="text-center">
              <button
                onClick={handleEstimate}
                className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] text-lg">
                Get Estimate
              </button>
            </div>
            {estimate && (
              <div className="mt-4 text-center text-4xl text-gray-700">
                <strong>Estimated Price: </strong> {estimate}
              </div>
            )}
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
