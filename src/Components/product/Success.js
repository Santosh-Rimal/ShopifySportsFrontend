import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Get the encoded data from the URL
  const query = new URLSearchParams(location.search);
  const encodedData = query.get('data');

  // Decode the Base64 encoded data
  const decodedData = encodedData ? atob(encodedData) : '';

  // Parse the JSON string into an object
  const parsedData = decodedData ? JSON.parse(decodedData) : {};

  useEffect(() => {
    // If there's parsed data, send the entire object to the API
    if (parsedData.transaction_code) {
      const updateOrderStatus = async () => {
        setLoading(true); // Start loading
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/updateOrderStatus/${parsedData.transaction_uuid}`, {
            method: 'PUT', // Use PUT for updating
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transaction_code: parsedData.transaction_code,
              // Dynamically set the status from parsedData if available, otherwise default to 'completed'
              status: parsedData.status || 'completed',  
              total_amount: parsedData.total_amount,
              transaction_uuid: parsedData.transaction_uuid,
              product_code: parsedData.product_code,
              signed_field_names: parsedData.signed_field_names,
              signature: parsedData.signature
            }),
          });

          const result = await response.json();

          if (result.statusCode === 200) {
            console.log('Order status updated successfully');
          } else {
            setError(`Error updating order status: ${result.message}`);
            console.error('Error updating order status:', result.message);
          }
        } catch (error) {
          setError(`Error: ${error.message}`);
          console.error('Error:', error);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      updateOrderStatus();
    }
  }, [parsedData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Payment Success!</h1>
        <div className="mb-2">
          <span className="font-semibold">Transaction Code:</span> {parsedData.transaction_code}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Status:</span> {parsedData.status || 'completed'} {/* Display status */}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Total Amount:</span> {parsedData.total_amount}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Transaction UUID:</span> {parsedData.transaction_uuid}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Product Code:</span> {parsedData.product_code}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Signature Field Names:</span> {parsedData.signed_field_names}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Signature:</span> {parsedData.signature}
        </div>
        {/* Display loading or error messages */}
        {loading && <p className="text-blue-500">Updating order status...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <Link to="/home" className="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
