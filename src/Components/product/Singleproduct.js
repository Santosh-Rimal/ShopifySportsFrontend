import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });
  const [cartMessage, setCartMessage] = useState(''); // To display messages after adding to cart

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getsingleproduct/${id}`);
        const { data } = await response.json();
        setProduct(data);

        const relatedResponse = await fetch(`http://127.0.0.1:8000/api/singlecategory/${data.category.id}`);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData.products.filter(p => p.id !== id));

        const reviewsResponse = await fetch(`http://127.0.0.1:8000/api/getsingleproduct/${id}/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(productId);
  }, [productId]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setReviews([...reviews, newReview]);
      setNewReview({ author: '', rating: 5, comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Function to handle "Add to Cart"
  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');  // Replace this with the actual user_id (you might fetch this from localStorage)
      const response = await fetch('http://127.0.0.1:8000/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity: 1, // Adjust quantity as needed
        }),
      });

      if (response.ok) {
        setCartMessage('Product added to cart successfully!');
      } else {
        setCartMessage('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setCartMessage('An error occurred. Please try again.');
    }
  };

  if (!product) {
    return <div className="text-center p-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-6 text-gray-700">
        <Link to='/dashboard' className="hover:text-blue-600">Dashboard</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/product' className="hover:text-blue-600">All Products</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <span className="font-bold">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <img
            alt={product.name}
            src={product.image}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</h3>
          <div className="flex items-center mb-4">
            <p className="text-xl font-bold text-green-600">${product.price}</p>
          </div>
          <p className="text-gray-700 mb-2">Category: <span className="font-medium">{product.category.name}</span></p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <Link to="#" className="flex-1 px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">Buy Now</Link>
          </div>

          {/* Display cart message */}
          {cartMessage && <p className="mt-4 text-green-600">{cartMessage}</p>}
        </div>
      </div>

      {/* Related Products */}
      {/* ... Related Products Section ... */}

      {/* Reviews Section */}
      {/* ... Reviews Section ... */}
    </div>
  );
};

export default SingleProduct;
