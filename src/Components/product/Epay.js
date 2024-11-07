import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

import { generateSignature } from '../utils/signatureGenerator';
const Epay = () => {
  // State variables for form fields
  const [amount, setAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('0'); // Set this based on your requirements
  const [totalAmount, setTotalAmount] = useState('');
  const [transactionUUID, setTransactionUUID] = useState(''); // Generate or fetch this value
  const [productCode, setProductCode] = useState('EPAYTEST'); // Use a fixed code or retrieve from the order items
  const [productServiceCharge, setProductServiceCharge] = useState('0');
  const [productDeliveryCharge, setProductDeliveryCharge] = useState('0');
  const [successUrl, setSuccessUrl] = useState('http://localhost:3000/success');
  const [failureUrl, setFailureUrl] = useState('http://localhost:3000/failure');
  const [signedFieldNames, setSignedFieldNames] = useState('total_amount,transaction_uuid,product_code');
  const [signature, setSignature] = useState('');
  const secretKey = '8gBm/:&EnhH.1/q'; // Replace with your actual secret key
  const location = useLocation();
  const { invoice } = location.state || {};

  // Fetch order data based on user ID
useEffect(() => {
  const fetchOrderData = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getOrder/${invoice}`);
        const data = await response.json();
        if (response.ok) {
          const order = data.data[0]; // Accessing the first order
          if (order) {
            setAmount(order.total); // Assuming 'total' is the amount to be paid
            setTransactionUUID(invoice); // Using invoice as transaction UUID
            
            // Calculate the total amount including charges
            const calculatedTotal = parseFloat(order.total) + parseFloat(taxAmount) + parseFloat(productServiceCharge) + parseFloat(productDeliveryCharge);
            setTotalAmount(calculatedTotal.toString()); // Convert to string for consistency

            // Generate the signature after setting values
            const message = `total_amount=${calculatedTotal},transaction_uuid=${invoice},product_code=${productCode}`;
            const signature = generateSignature(message, secretKey);
            setSignature(signature);
            console.log("Invoice is:", invoice);
          }
        } else {
          console.error('Error fetching order data:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    } else {
      console.warn('User ID not found in local storage');
    }
  };

  if (invoice) {
    fetchOrderData();
  }
}, [invoice, productCode, productDeliveryCharge, productServiceCharge, taxAmount]); // Add the missing dependencies here

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // The form will be submitted manually to the eSewa gateway
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
    const signature = generateSignature(message, secretKey);
    setSignature(signature); // Generate signature again to ensure it is up to date
    e.target.submit(); // Submit the form programmatically
  };

  // Create message to display
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;

  return (
    <div>
      <h1>eSewa Payment Form</h1>
      <h2>{message}</h2> {/* Display the message here */}
      <h2>Signature: {signature}</h2> {/* Display the signature here */}
      <h2>invoice: {invoice}</h2>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value={taxAmount}
          onChange={(e) => setTaxAmount(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={totalAmount}
          readOnly // Make this read-only as it's calculated
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={transactionUUID}
          readOnly // Make this read-only as it's set programmatically
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value={productServiceCharge}
          onChange={(e) => setProductServiceCharge(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={productDeliveryCharge}
          onChange={(e) => setProductDeliveryCharge(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value={successUrl}
          onChange={(e) => setSuccessUrl(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={failureUrl}
          onChange={(e) => setFailureUrl(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value={signedFieldNames}
          onChange={(e) => setSignedFieldNames(e.target.value)}
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={signature}
          readOnly // Make this read-only as it's set programmatically
          required
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Epay;
