import { motion } from 'framer-motion';
import React from 'react';
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <main className="w-full min-h-screen bg-[#1a1a1a] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to enhance your security with AI-powered solutions? Our team of experts is here to help you create a safer environment for your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phone Card */}
          <motion.div
            className="bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-purple-500/10 hover:bg-[#2d2d2d] transition-all duration-300 overflow-hidden border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Call Us</h2>
              <p className="text-gray-300 mb-4">Available 24/7 for urgent inquiries</p>
              <a 
                href="tel:1-916-425-6820" 
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                (916) 425-6820
              </a>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            className="bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-purple-500/10 hover:bg-[#2d2d2d] transition-all duration-300 overflow-hidden border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Email Us</h2>
              <p className="text-gray-300 mb-4">Get detailed information</p>
              <a 
                href="mailto:contact@sentrysight.com" 
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                contact@sentrysight.com
              </a>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            className="bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-purple-500/10 hover:bg-[#2d2d2d] transition-all duration-300 overflow-hidden border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Visit Us</h2>
              <p className="text-gray-300 mb-4">Schedule a demo at our office</p>
              <span className="text-purple-400 font-medium">
                Sacramento, CA
              </span>
            </div>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            className="bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-purple-500/10 hover:bg-[#2d2d2d] transition-all duration-300 overflow-hidden border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏰</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Business Hours</h2>
              <p className="text-gray-300 mb-4">Mon - Fri: 9AM - 6PM</p>
              <span className="text-purple-400 font-medium">
                24/7 Emergency Support
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-6">
            Experience the future of security with SentrySight's AI-powered solutions
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactUs;