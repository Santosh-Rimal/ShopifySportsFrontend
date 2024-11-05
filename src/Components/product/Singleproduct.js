
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: '5', review: '' });
  const [cartMessage, setCartMessage] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  const userId = localStorage.getItem('userId');
  const getStarColor = (averageRating) => {
  if (averageRating >= 4.5) return 'text-green-500';    // Green for high ratings
  if (averageRating >= 3) return 'text-yellow-500';     // Yellow for medium ratings
  return 'text-red-500';                                // Red for low ratings
};

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getsingleproduct/${id}`);
        const { data } = await response.json();

        setProduct(data.product);
        setRelatedProducts(data.related_products);

        const reviewsResponse = await fetch(`http://127.0.0.1:8000/api/ratingReview/${id}`);
        const reviewsData = await reviewsResponse.json();
        const reviewsArray = Array.isArray(reviewsData.data) ? reviewsData.data : [];
        
        const existingUserReview = reviewsArray.find(review => review.user_id === parseInt(userId));

        if (existingUserReview) {
          setUserReview(existingUserReview);
          setNewReview({ rating: existingUserReview.rating, review: existingUserReview.review });
          const filteredReviews = reviewsArray.filter(review => review.user_id !== parseInt(userId));
          setReviews([existingUserReview, ...filteredReviews]);
        } else {
          setReviews(reviewsArray);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(productId);
  }, [productId, userId]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    return (total / reviews.length).toFixed(1); // Average rating to one decimal place
  };

  const averageRating = calculateAverageRating();
  const reviewCount = reviews.length; // Count of reviews

  const getReviewDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const reviewDistribution = getReviewDistribution();

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (userReview) {
      setReviewMessage('You have already rated and reviewed this product. Cannot post another review.');
      return;
    }

    const reviewData = {
      user_id: userId,
      product_id: productId,
      rating: newReview.rating,
      review: newReview.review,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/storeRatingReview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setReviews([...reviews, { ...reviewData, user: { name: 'Current User' } }]);
        setUserReview(reviewData);
        setReviewMessage('Review submitted successfully!');
      } else {
        console.error('Error posting review');
        setReviewMessage('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      setReviewMessage('An error occurred. Please try again.');
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      setCartMessage('Please log in to add items to your cart.');
      return;
    }

    try {
      const cartResponse = await fetch(`http://127.0.0.1:8000/api/single-user-cart/${userId}`);
      const cartData = await cartResponse.json();
      const existingCartItems = cartData.data || [];
      const existingProduct = existingCartItems.find(item => item.product_id === product.id);

      if (existingProduct) {
        setCartMessage('Product already in cart.');
        return;
      }

      const addResponse = await fetch('http://127.0.0.1:8000/api/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (addResponse.ok) {
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
        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <img alt={product.name} src={product.image} className="w-full max-w-[300px] h-auto object-cover mx-auto" />
        </div>

        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</h3>
          <div className="flex items-center mb-4">
            <p className="text-xl font-bold text-green-600">${product.price}</p>
          </div>
          <p className="text-gray-700 mb-2">Category: <span className="font-medium">{product.category.name}</span></p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
            <Link to="#" className="flex-1 px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">Buy Now</Link>
          </div>

          {cartMessage && <p className="mt-4 text-green-600">{cartMessage}</p>}
        </div>
      </div>

      <div className="flex w-full gap-20 bg-white p-6 rounded-lg shadow-md mt-4">
    {/* Display Average Rating */}
    <div className="flex flex-col justify-center items-start mb-4">
      <h4 className="text-xl font-semibold">{averageRating}</h4>
      
      {/* Dynamic Star Rating Display */}
      <div className="inline text-lg mx-0">
        <span className={`${getStarColor(averageRating)}`}>
          {'★'.repeat(Math.round(averageRating))}
        </span>
        <span className="text-gray-300">
          {'★'.repeat(5 - Math.round(averageRating))}
        </span>
      </div>

      <span className="text-gray-600 text-sm">{reviewCount} reviews</span>
        </div>

      <div className="flex flex-col w-full">  
    {/* Review Distribution */}
    {Object.keys(reviewDistribution)
      .sort((a, b) => b - a) // Sort to display from 5 stars to 1 star
      .map((star) => (
        <div key={star} className="flex items-center mb-2">
          <span className="text-gray-700 font-semibold w-6">{star}</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden mx-2">
            <div
              className="h-full bg-green-600"
              style={{ width: `${(reviewDistribution[star] / reviewCount) * 100}%` }}
            />
          </div>
          <span className="text-gray-600">{reviewDistribution[star]}</span>
        </div>
      ))}
  </div>
      </div>

      <div className='flex justify-between w-full'>
        {/* Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-[600px] w-full">
          <form onSubmit={handleReviewSubmit}>
            <h4 className="text-xl font-semibold mb-4">Your Review</h4>
            {reviewMessage && <p className="text-red-600">{reviewMessage}</p>} {/* Display review message */}

            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-3xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setNewReview(prevState => ({ ...prevState, rating: star }))}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Review:</label>
              <textarea
                name="review"
                value={newReview.review}
                onChange={handleReviewChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
              disabled={userReview !== null} // Disable button if review already exists
            >
              {userReview ? 'Review Posted' : 'Submit Review'}
            </button>
          </form>

          <h4 className="text-xl font-semibold mb-4 mt-8">Customer Reviews</h4>
{reviews.length > 0 ? (
  reviews.map((review, index) => (
    <div key={index} className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center mb-2 space-x-2"> {/* Flex container with space between items */}
        <p className="text-sm text-gray-600">
          {review.user_id === parseInt(userId) ? 'Your Review' : review.user.name}
        </p>
        <p className="text-gray-500 text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
        ))}
      </div>
      <p className="mt-2 text-gray-700">{review.review}</p>
    </div>
  ))
) : (
  <p className="text-gray-500">No reviews yet.</p>
)}

        </div>

       {/* Related Products Section */}
<div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-[300px] w-full">
  <h4 className="text-xl font-semibold mb-4">Related Products</h4>
  {relatedProducts.map((relatedProduct) => (
    <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
      <div className="flex items-center mb-4">
        <img
          alt={relatedProduct.name}
          src={relatedProduct.image}
          className="w-16 h-16 object-cover rounded-lg mr-4"
        />
        <div>
          <h5 className="text-md font-semibold">{relatedProduct.name}</h5>
          <p className="text-sm text-gray-600">${relatedProduct.price}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

      </div>
    </div>
  );
};

export default SingleProduct;
           