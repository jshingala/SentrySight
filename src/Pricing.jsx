import { motion } from 'framer-motion';
import React from 'react';

function Pricing({ onContactClick }) {
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

      <div className="text-center mt-12 mb-16">
        <button 
          onClick={onContactClick}
          className="px-8 py-3 bg-[#4CAF50] text-white rounded-lg text-lg hover:bg-[#45a049] transition-colors"
        >
          Contact Us
        </button>
      </div>
    </main>
  );
}

export default Pricing;