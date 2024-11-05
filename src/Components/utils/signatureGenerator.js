// src/utils/signatureGenerator.js
import CryptoJS from 'crypto-js';

export const generateSignature = (message, secretKey) => {
  const hmac = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hmac);
};
