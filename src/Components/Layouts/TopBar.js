import React from 'react';
import Topbarlogo from "../../images/—Pngtree—logo killer_6686709 1.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";

const TopBar = (props) => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate after logout

  // Logout function
  const handleLogout = () => {
    // Remove token and userId from localStorage
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");

    

    // Navigate to login page (or home)
    navigate("/");
  };

  return (
    <div className='bg-primary p-2'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-center text-white font-semibold'>
        <img src={Topbarlogo} alt="Topbar Logo" className='mb-2 md:mb-0' />
        {location.pathname !== '/' && (
          <>
            <ul className='flex gap-10 md:gap-8 text-white text-center p-2'>
              <li>
                <Link to="/home" className="hover:text-gray-300 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-gray-300 transition duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300 transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className='flex items-center gap-8'>
              <div className='relative'>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="p-2 pl-10 rounded-lg text-black"
                />
                <HiOutlineSearch className='absolute left-2 top-2.5 h-5 w-5 text-gray-500' />
              </div>
              <ul className='text-center p-2 flex gap-5 items-center'>
                <Link to="/usercart" className="hover:text-gray-300 transition duration-300">
                  <AiOutlineShoppingCart className='h-6 w-6'/>
                </Link>
                {/* <li><FaRegHeart className='h-6 w-6 hover:text-gray-300 transition duration-300'/></li> */}
                <li className='flex gap-1 items-center'>
                  <Link to="/userprofile" className="flex gap-1 hover:text-gray-300 transition duration-300">
                  <HiOutlineUserCircle className='h-6 w-6' /> 
                  <span>{props.email || "Guest"}</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TopBar;
