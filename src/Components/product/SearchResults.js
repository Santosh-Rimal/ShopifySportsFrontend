// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]); // State to store all fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query')?.toLowerCase() || ''; // Convert query to lowercase for case-insensitive search

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch products from the API
        const response = await fetch(`http://127.0.0.1:8000/api/getproduct`);
        const data = await response.json();

        // Check if the response contains a valid array of products
        if (data && Array.isArray(data.data)) {
          setProducts(data.data); // Store all fetched products
          // Filter products based on the search query
          filterProducts(data.data, searchQuery);
        } else {
          console.error('Invalid data format:', data);
          setProducts([]); // Handle invalid data format
          setFilteredProducts([]); // Handle invalid data format
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Handle fetch error
        setFilteredProducts([]); // Handle fetch error
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    // Fetch products only if there is a search query
    fetchProducts();
  }, []);

  // Filter products whenever the searchQuery or products change
  useEffect(() => {
    filterProducts(products, searchQuery);
  }, [searchQuery, products]);

  // Function to filter products based on the search query
  const filterProducts = (products, query) => {
    if (!query) {
      setFilteredProducts(products); // Display all products if no search query is provided
      return;
    }

    // Filter products based on the search query (searching by name or description)
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.price.toString().includes(query)||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Display loading state
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Render search results
  return (
    <div className="search-results p-4">
      <h2 className="text-3xl font-bold mb-6">
        Search Results for: "{searchQuery}"
      </h2>
      <div className="products-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-green-600">${product.price}</p>
              <p className="text-gray-600 my-4">{product.description}</p>
              <button className="bg-blue-500 text-white py-2 rounded">
                View Product
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            No products found for your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;