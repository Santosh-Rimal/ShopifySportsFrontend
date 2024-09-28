// src/Components/ProductSearch/ProductSearch.js
import React, { useState } from 'react';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Search Products</h2>
      <div className="mb-6">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-lg w-full mb-4"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-300">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-700">Category: {product.category}</p>
          </li>
        ))}
      </ul>
      {products.length === 0 && !loading && <div className="text-center text-gray-600">No products found</div>}
    </div>
  );
};

export default ProductSearch;
