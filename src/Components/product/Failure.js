import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Failure = () => {
  const location = useLocation();
  
  // Get the error message from the URL (if any)
  const query = new URLSearchParams(location.search);
  const errorMessage = query.get('error') || 'An unknown error occurred. Please try again.';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed!</h1>
        <p className="text-lg mb-4">{errorMessage}</p>
        <div className="mt-4">
          <Link to="/" className="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failure;
