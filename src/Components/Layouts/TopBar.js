import React, { useState, useEffect } from 'react';
import Topbarlogo from "../../images/—Pngtree—logo killer_6686709 1.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const TopBar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getproduct');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // Sort products for binary search
          data.sort((a, b) => a.name.localeCompare(b.name));
          setProducts(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const binarySearch = (sortedArray, query) => {
    let left = 0;
    let right = sortedArray.length - 1;
    const result = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentProduct = sortedArray[mid];

      // Check if the current product matches the search query
      if (
        currentProduct.name.toLowerCase().includes(query.toLowerCase()) ||
        currentProduct.price.toString().includes(query)
      ) {
        result.push(currentProduct);
        
        // Expand to the left
        let leftIndex = mid - 1;
        while (leftIndex >= 0 && 
               (sortedArray[leftIndex].name.toLowerCase().includes(query.toLowerCase()) || 
                sortedArray[leftIndex].price.toString().includes(query))) {
          result.push(sortedArray[leftIndex]);
          leftIndex--;
        }
        
        // Expand to the right
        let rightIndex = mid + 1;
        while (rightIndex < sortedArray.length && 
               (sortedArray[rightIndex].name.toLowerCase().includes(query.toLowerCase()) || 
                sortedArray[rightIndex].price.toString().includes(query))) {
          result.push(sortedArray[rightIndex]);
          rightIndex++;
        }
        break;
      } else if (currentProduct.name.toLowerCase() < query.toLowerCase()) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (searchQuery) {
      const searchResults = binarySearch(products, searchQuery);
      // Navigate to the search results page with the search query
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`, { state: { searchResults } });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className='bg-primary p-2'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-center text-white font-semibold'>
        <img src={Topbarlogo} alt="Topbar Logo" className='mb-2 md:mb-0' />
        {location.pathname !== '/' && (
          <>
            <ul className='flex gap-10 md:gap-8 text-white text-center p-2'>
              <li><Link to="/home" className="hover:text-gray-300 transition duration-300">Home</Link></li>
              <li><Link to="/product" className="hover:text-gray-300 transition duration-300">Products</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact Us</Link></li>
            </ul>
            <div className='flex items-center gap-8'>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  name="searchQuery"
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="p-2 pl-10 rounded-lg text-black"
                />
                <HiOutlineSearch className='absolute left-2 top-2.5 h-5 w-5 text-gray-500' />
              </form>
              <ul className='text-center p-2 flex gap-5 items-center'>
                <Link to="/usercart" className="hover:text-gray-300 transition duration-300">
                  <AiOutlineShoppingCart className='h-6 w-6' />
                </Link>
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
