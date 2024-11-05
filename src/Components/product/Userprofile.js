import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BiCog } from 'react-icons/bi';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
    address: '',
    phone: '',
  });

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the token from localStorage
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
              name: data.name,  // Assuming 'name' is the field returned from the API
              email: data.email,  // Assuming 'email' is returned
              profilePicture: data.profilePicture,  // Assuming 'profilePicture' field exists
              address: data.address,  // Assuming 'address' is returned
              phone: data.phone,  // Assuming 'phone' is returned
            });
          } else {
            console.log('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchOrderHistory = async () => {
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/getOrder/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Attach the token
              'Content-Type': 'application/json',
            },
          });
          
          const data = await response.json();
          setOrderHistory(data.data || []);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      }
    };

    fetchUserData();
    fetchOrderHistory();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex items-center p-6 mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/userprofile' className="hover:text-blue-600 font-bold">Profile</Link>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col items-center">
        <img 
          src={user.profilePicture || 'https://via.placeholder.com/150'}  // Fallback image
          alt={`${user.name}'s profile`} 
          className="w-32 h-32 rounded-full mb-4 shadow-lg"
        />
        <h2 className="text-3xl font-bold mb-2 text-primary">{user.name}</h2>
        <p className="text-gray-700 mb-4">{user.email}</p>
        <div className="w-full text-center mb-6">
          <p className="text-gray-800"><strong>Address:</strong> {user.address}</p>
          <p className="text-gray-800"><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="justify-around mb-8">
          <Link to="/editprofile" className="text-primary flex items-center gap-2 hover:text-secondary transition duration-300">
            <FaUserEdit /> Edit Profile
          </Link>

          <Link to="/setting" className="text-primary flex items-center gap-2 hover:text-secondary transition duration-300">
            <BiCog /> Settings
          </Link>
        </div>

        <div className="w-full">
          <h3 className="text-2xl font-bold mb-4 text-primary ml-8">Order History</h3>
          <div className="p-6">
            {orderHistory.length > 0 ? (
              orderHistory.map(order => (
                <div key={order.id} className="bg-white px-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between">
                  <div className='flex gap-16 text-center'>
                    {order.order_items.map(item => (
                      <div key={item.id} className="flex gap-16">
                        <img 
                          src={`http://127.0.0.1:8000/storage/${item.product.image}`} 
                          alt={item.product.name} 
                          className="w-24 h-24 object-cover rounded-lg shadow-sm"
                        />
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-primary">{item.product.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-gray-600">Price: ${item.product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">Total: ${order.total}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
