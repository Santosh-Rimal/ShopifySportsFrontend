// src/Components/AboutUsPage/AboutUsPage.js
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaShieldAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-6 mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/about' className="hover:text-blue-600 font-bold">About Us</Link>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Welcome to SportifySports, your premier destination for all things sports. We're passionate about bringing you the best in sports gear, apparel, and accessories.
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-32 h-32 text-blue-500 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-lg mb-6 mx-4">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">Our Mission & Values</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At SportifySports, our mission is to inspire and equip athletes of all levels to reach their full potential. We value quality, innovation, and customer satisfaction. Our team is dedicated to providing top-notch products and exceptional service.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Quality: We ensure every product meets high standards.
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Innovation: We continuously improve and stay ahead of trends.
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Customer Satisfaction: Your happiness is our top priority.
          </li>
        </ul>
      </div>

      {/* Our Services */}
      <div className=" p-8   mx-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Faster Delivery */}
          <div className="flex flex-col gap-2 bg-gray-100 p-6 rounded-lg shadow-md">
            <FaShippingFast className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Faster Delivery</h3>
              <p className="text-gray-700 mt-1">We ensure that your orders are delivered quickly and efficiently.</p>
            </div>
          </div>
          {/* Safe & High Quality */}
          <div className="flex flex-col gap-2 bg-gray-100 p-6 rounded-lg shadow-md">
            <FaShieldAlt className="text-green-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Safe & High Quality</h3>
              <p className="text-gray-700 mt-1">Our products meet the highest standards of safety and quality.</p>
            </div>
          </div>
          {/* Customer Satisfaction */}
          <div className="flex flex-col gap-2 bg-gray-100 p-6 rounded-lg shadow-md">
            <FaStar className="text-yellow-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Customer Satisfaction</h3>
              <p className="text-gray-700 mt-1">We prioritize your satisfaction and work hard to exceed your expectations.</p>
            </div>
          </div>
          {/* 24/7 Support */}
          <div className="flex flex-col gap-2  bg-gray-100 p-6 rounded-lg shadow-md">
            <FaShieldAlt className="text-red-600 text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-gray-700 mt-1">Our dedicated support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us? */}
      <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-lg  mb-6 mx-4">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">Why Choose Us?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our commitment to quality and customer satisfaction sets us apart from the competition. We offer a wide range of products from top brands, and our team is always here to help you find exactly what you need.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li className="flex items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Wide Selection of Products
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Competitive Prices
          </li>
          <li className="flex  items-center">
            <FaCheckCircle className="text-blue-600 text-2xl mr-3" />
            Exceptional Customer Service
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <section className="bg-blue-100 w-full py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-700 mb-4">Have questions or want to collaborate? We'd love to hear from you!</p>
          <a href="mailto:contact@example.com" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
