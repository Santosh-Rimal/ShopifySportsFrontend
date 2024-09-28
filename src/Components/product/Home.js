import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Herosectionimage from "../../images/12721210_2023-wabc-NewApp-SPORTS.jpg";
import Offerimage from "../../images/istockphoto-1321017606-612x612.jpg";
import Offerimage2 from "../../images/download.jpeg";
import Login from '../Login/Login'; // Adjust the path if necessary

const HomePage = ({ setEmail }) => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [isLoginVisible, setIsLoginVisible] = useState(false); // State to control login form visibility

  useEffect(() => {
    // Fetch data for best selling products
    const fetchBestSellingProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getproduct?limit=4');
        const data = await response.json();
        setBestSellingProducts(data.data|| []);
      } catch (error) {
        console.error('Error fetching best selling products:', error);
      }
    };

    // Fetch data for featured collections
    const fetchFeaturedCollections = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getproduct?limit=4');
        const data = await response.json();
        setFeaturedCollections(data.data|| []);
      } catch (error) {
        console.error('Error fetching featured collections:', error);
      }
    };

    // Fetch customer reviews
    const fetchCustomerReviews = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/?limit=5');
        const data = await response.json();
        setCustomerReviews(data.products || []);
      } catch (error) {
        console.error('Error fetching customer reviews:', error);
      }
    };

    fetchBestSellingProducts();
    fetchFeaturedCollections();
    fetchCustomerReviews();
  }, []);

  const toggleLoginVisibility = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  return (
    <div className="homepage">
      {/* Banner Section */}
      <section 
        className="banner relative text-white text-center py-20" 
        style={{ 
          backgroundImage: `url(${Herosectionimage})`, 
          minHeight: '550px', 
          backgroundColor: 'black', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 mt-20">
          <h1 className="text-4xl font-bold">Elegance Draped in Tradition</h1>
          <p className="text-xl mt-4 mb-8">Explore our exclusive collection of saris</p>
          <button className='border-2 rounded-lg p-2' >
           Explore Now
          </button>
        </div>
      </section>

      {/* Login Form Section */}
      {isLoginVisible && (
        <section className="login-section py-12 bg-gray-100">
          <Login setEmail={setEmail} />
        </section>
      )}

      {/* Best Selling Products Section */}
      <section className="featured-collections pt-12 pb-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Best Selling Products</h2>
        <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
          {bestSellingProducts.map(product => (
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
              <p className="text-gray-600 h-32 my-4">{product.description}</p>
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

      {/* Featured Collections Section */}
      <section className="featured-collections pb-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
        <div className="collections-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
          {featuredCollections.map(collection => (
            <div key={collection.id} className="collection-card bg-white shadow-md rounded-lg p-4 flex flex-col">
              <img src={collection.image} alt={collection.name} className="w-full h-44 object-cover rounded-t-lg" />
              <div className='flex gap-10'>
                <h3 className="text-lg font-semibold mt-4 w-64 h-4">{collection.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-[16px] font-semibold text-green-600">${collection.price}</p>
                    <span className="ml-3 text-[16px] font-semibold text-gray-400 line-through dark:text-gray-400">
                      ${(collection.price * (1 + collection.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 h-32 my-4">{collection.description}</p>
              <Link 
                to={`/product/${collection.id}`} 
                className="bg-primary text-white text-center py-2 mb-3 flex justify-center rounded-lg px-5 mt-3"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews bg-gray-100 pb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        <div className="reviews-grid grid gap-4 mx-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl">
          {customerReviews.slice(0, 4).map(review => (
            <div key={review.id} className="review-card bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <p className="text-gray-800 text-center h-36">"{review.description}"</p>
              <span className="text-gray-600 mt-2 inline-block">- {review.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers pb-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
        <div className='flex gap-10 mx-8'>
          <div className="offer-card relative text-white text-center py-20 rounded-lg shadow-md" 
            style={{ 
              backgroundImage: `url(${Offerimage})`, 
              minHeight: '300px', 
              width: "100%", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="offer-details relative z-10 py-8 px-4 rounded-lg">
              <h3 className="text-2xl font-bold">SALE UP TO 50% OFF</h3>
              <p className="text-lg mt-4">Just for one day!</p>
            </div>
          </div>

          <div className="offer-card relative text-white text-center pt-20 rounded-lg shadow-md" 
            style={{ 
              backgroundImage: `url(${Offerimage2})`, 
              minHeight: '300px', 
              width: "100%", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="offer-details relative z-10 py-8 px-4 rounded-lg">
              <h3 className="text-2xl font-bold">SALE UP TO 50% OFF</h3>
              <p className="text-lg mt-4">Just for one day!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
