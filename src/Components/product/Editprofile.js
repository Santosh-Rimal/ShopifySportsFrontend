import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser({
              name: data.name || '',
              email: data.email || '',
              address: data.address || '',
              phone: data.phone || '',
            });
            setLoading(false);
          } else {
            console.log('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/update', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          alert('Profile updated successfully!');
          navigate('/userprofile');  // Navigate to profile page after update
        } else {
          alert('Failed to update profile.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/userprofile' className="hover:text-blue-600">Profile</Link>
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
