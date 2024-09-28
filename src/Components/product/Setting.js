import React from 'react';
import { FiLock, FiMail, FiBell } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="container mx-auto p-6">
         <div className="flex items-center mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/userprofile' className="hover:text-blue-600 ">Profile</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/setting' className="hover:text-blue-600 font-bold">Settings</Link>
      </div>
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">Settings</h2>

        {/* Account Settings Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiLock className="mr-2 text-primary" />
            Account Settings
          </h3>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition duration-300"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
