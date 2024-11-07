import React, { useState, useEffect } from 'react';
import Topbarlogo from "../../images/—Pngtree—logo killer_6686709 1.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null); // State to store user data

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId') || 2;

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        // Fetch cart items
        const cartResponse = await fetch(`http://127.0.0.1:8000/api/single-user-cart/${userId}`);
        const cartData = await cartResponse.json();
        setCartItemCount(cartData.data ? cartData.data.length : 0);

        // Fetch products
        const productResponse = await fetch('http://127.0.0.1:8000/api/getproduct');
        const productData = await productResponse.json();

        if (Array.isArray(productData.data)) {
          // Sort products for binary search
          productData.data.sort((a, b) => a.name.localeCompare(b.name));
          setProducts(productData.data);
        } else {
          console.error('Fetched data is not an array:', productData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserData = async () => {
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
              name: data.name,
              email: data.email,
            });
          } else {
            console.log('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchCartAndProducts();
    fetchUserData();
  }, [userId, token]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Binary search function
  const binarySearchProduct = (query) => {
    let left = 0;
    let right = products.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midName = products[mid].name.toLowerCase();

      if (midName === query.toLowerCase()) {
        return products[mid]; // Found the product
      } else if (midName < query.toLowerCase()) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return null; // If product is not found
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const result = binarySearchProduct(searchQuery);

    if (result) {
      console.log("Product found:", result);
      // Redirect to the product detail page or perform further actions here
      navigate(`/product/${result.id}`);
    } else {
      console.log("Product not found");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className='bg-primary p-2'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-center text-white font-semibold'>
        <img src={Topbarlogo} alt="Topbar Logo" className='mb-2 md:mb-0' />
        <ul className='flex gap-10 md:gap-8 text-white text-center p-2'>
          <li><Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link></li>
          <li><Link to="/product" className="hover:text-gray-300 transition duration-300">Products</Link></li>
          <li><Link to="/about" className="hover:text-gray-300 transition duration-300">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact Us</Link></li>
        </ul>
        <div className='flex items-center gap-8'>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="p-2 pl-10 rounded-lg text-black"
            />
            <HiOutlineSearch className='absolute left-2 top-2.5 h-5 w-5 text-gray-500' />
          </form>
          <ul className='text-center p-2 flex gap-5 items-center'>
            <Link to="/usercart" className="relative hover:text-gray-300 transition duration-300">
              <AiOutlineShoppingCart className='h-6 w-6' />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <li className='flex gap-1 items-center'>
              <Link to="/userprofile" className="flex gap-1 hover:text-gray-300 transition duration-300">
                <HiOutlineUserCircle className='h-6 w-6' />
                <span>{user ? user.email || user.name : "Guest"}</span>
              </Link>
            </li>
            {user ? (
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300">
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:text-gray-300 transition duration-300">
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
