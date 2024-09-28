import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { MdKeyboardArrowRight } from "react-icons/md";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const itemsPerPage = 8;

  // Fetching paginated products
  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
    < div className='bg-gray-100'>
      <div className='flex gap-4 p-2'>
        <div className='flex mx-3'>
          <Link to='/home' className=' font-bold'>Home</Link>
          <MdKeyboardArrowRight className='h-6 w-6' />
          <Link to='/product' className=' font-bold'>All Products</Link>
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
        <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl ">
          {products.map(product => (
            <div key={product.id} className="collection-card bg-white shadow-md rounded-lg p-4 flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded-t-lg" />
              <div className='flex gap-10'>
                <h3 className="text-lg font-semibold mt-4 w-64 h-4">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-[16px] font-semibold text-green-600">${product.price}</p>
                    <span className="ml-3 text-[16px] font-semibold text-gray-400 line-through dark:text-gray-400">
                      ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 h-32 my-4 w-full break-all">{product.description}</p>
              <Link
                to={`/product/${product.id}`}
                className="bg-primary text-white text-center py-2 mb-3 flex justify-center rounded-lg px-5 mt-3"
              >
                View Product
              </Link>
            </div>
          ))}
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
