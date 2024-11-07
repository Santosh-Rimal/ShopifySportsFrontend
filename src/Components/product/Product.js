import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { MdKeyboardArrowRight } from "react-icons/md";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  function getTimeLeft(targetDate) {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="text-sm text-red-500 mt-2">
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
      {timeLeft.minutes > 0 && <span>{timeLeft.minutes}m </span>}
      {timeLeft.seconds > 0 && <span>{timeLeft.seconds}s </span>}
      {timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0 && <span>Time's up!</span>}
    </div>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const itemsPerPage = 8;

  // Fetching paginated products
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/getproduct?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
      const data = await response.json();
      console.log(data.data); // Log data to ensure it's an array of objects
      setProducts(data.data);
      setShowPagination(true);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [currentPage, itemsPerPage]); // Include currentPage and itemsPerPage as dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now fetchData is properly included in the dependency array

  // Fetch products by category
  const fetchProductsByCategory = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/singlecategory/${id}`);
      const data = await response.json();
      console.log(data.data.product); // Log the product array

      if (data) {
        setProducts(data.data.product); // Set products fetched by category
      } else {
        setProducts([]); // No products found
      }
      setShowPagination(false); // Hide pagination when viewing by category
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-gray-100'>
      <div className='flex gap-4 p-2'>
        <div className='flex mx-3'>
          <Link to='/home' className='font-bold'>Home</Link>
          <MdKeyboardArrowRight className='h-6 w-6' />
          <Link to='/product' className='font-bold'>All Products</Link>
        </div>
        <div>
          {/* Categories component */}
          <Categories
            fetchProductsByCategory={fetchProductsByCategory}
            fetchData={fetchData}
            className='bg-white p-2 rounded-md shadow-sm'
          />
        </div>
      </div>

     <section className="featured-collections pt-8 pb-10 bg-gray-100">
  <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
    {products.map(product => {
      // Calculate discounted price
      const discountPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

      return (
        <div key={product.id} className="collection-card bg-white shadow-md rounded-lg p-4 flex flex-col relative">
          <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-t-lg" />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}

          <div className="flex gap-10">
            <h3 className="text-lg font-semibold mt-4 w-64 h-4">{product.name}</h3>
            <div className="flex items-center justify-between mt-4">
              <div>
                {/* Display Discounted Price */}
                <p className="text-[16px] font-semibold text-green-600">
                  ${discountPrice}
                </p>
                {/* Show Original Price if Discounted */}
                {product.discount > 0 && (
                  <span className="ml-3 text-[16px] font-semibold text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 h-auto my-4 w-full break-all">{product.description}</p>

          {/* Show Discount Start Date */}
          {product.youwillget > 0 && product.discount_start_date && (
            <p className="text-xs text-blue-500 mt-2">
              Discount starts on: {new Date(product.discount_start_date).toLocaleDateString()}
            </p>
          )}

          {/* Show Discount Expiration Date */}
          {product.discount > 0 && product.discount_end_date && (
            <p className="text-xs text-red-500 mt-2">
              Sale ends on: {new Date(product.discount_end_date).toLocaleDateString()}
            </p>
          )}

          {/* Show Countdown for Discount Start Date */}
          {product.discount_start_date && (
            <Countdown targetDate={product.discount_start_date} />
          )}

          {/* Show Countdown for Discount End Date */}
          {product.discount_end_date && (
            <Countdown targetDate={product.discount_end_date} />
          )}

          <div className="mt-3 flex justify-between items-center">
            <Link
              to={`/product/${product.id}`}
              className="bg-primary text-white text-center py-2 px-5 rounded-lg"
            >
              View Product
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</section>


      {showPagination && totalPages > 1 && (
        <div className="flex justify-center pb-8 bg-gray-100">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`mx-2 px-3 flex gap-1 items-center rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-primary'}`}
            disabled={currentPage === 1}
          >
            <FiArrowLeft /> Prev
          </button>
          <span className='p-1 font-semibold text-gray-600 text-[16px]'>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`mx-2 px-3 py-1 flex gap-1 items-center rounded-md ${currentPage >= totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-primary'}`}
            disabled={currentPage >= totalPages}
          >
            Next <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
