import React, { useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccessMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset the form
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-6 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/contact' className="hover:text-blue-600 font-bold">Contact Us</Link>
      </div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          We're here to help! If you have any questions or need assistance, feel free to reach out to us using the form below or through our contact details.
        </p>
      </div>

      {/* Contact Information and Form */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contact Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[500px]">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Address</h3>
            <p className="text-gray-700 mb-4">
              <MdLocationPin className="w-6 h-6 text-blue-600 inline-block mr-3" />
              Bharatpur-chitwan, Nepal
            </p>
            <p className="text-gray-700 mb-4">
              <MdEmail className="w-6 h-6 text-blue-600 inline-block mr-3"/>
              info@sportifysport.com
            </p>
            <p className="text-gray-700">
              <FaPhone className="w-6 h-6 text-blue-600 inline-block mr-3" />
              +977 9814205266
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
          {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
