import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-16">
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are committed to providing the best products and services to our customers. Our mission is to bring quality and value to all our offerings.
          </p>
        </div>
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +1 123 456 7890</p>
          <p className="text-gray-400">Address: 1234 Street, City, State, Country</p>
        </div>
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="mb-8 lg:mb-0">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white"><AiFillTwitterCircle /></a>
            <a href="#" className="text-gray-400 hover:text-white"><AiFillInstagram/></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-400">&copy; 2024 SportifySports. All rights reserved.</p>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer