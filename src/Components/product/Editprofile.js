import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '+1 234 567 890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/userprofile' className="hover:text-blue-600 ">Profile</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/editprofile' className="hover:text-blue-600 font-bold">EditProfile</Link>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              value={user.name} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input 
              type="text" 
              name="address" 
              value={user.address} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={user.phone} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
