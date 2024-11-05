// src/Components/UserCart/UserCart.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const UserCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId') || 2;

    const fetchCart = async () => {
        setLoading(true); 
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/single-user-cart/${userId}`);
            const data = await response.json();
            setCartItems(data.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError("Failed to fetch cart items.");
            setLoading(false);
        }
    };

    const updateCart = async (id, newQuantity) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updatecart/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, quantity: newQuantity }),
            });
            const data = await response.json();
            if (!data.error) {
                fetchCart();
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            setError("Failed to update cart item.");
        }
    };

    const deleteCartItem = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/deletecarts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId }),
            });
            const data = await response.json();
            if (!data.error) {
                fetchCart();
            }
        } catch (error) {
            console.error("Error deleting cart item:", error);
            setError("Failed to delete cart item.");
        }
    };

    const handleQuantityChange = (cartId, newQuantity) => {
        updateCart(cartId, newQuantity);
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            const formattedCart = {
                products: cartItems.map(item => ({
                    ...item,
                user_id: userId,
                    image:item.product.image,
                    price:item.product.price,
                    name: item.product.name,

                })),
                total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
            };
    
            navigate('/checkout', { state: { cart: formattedCart } });
        } else {
            alert('Cart is empty');
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="relative container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl rounded-xl">
            <div className="flex items-center mb-6 mx-8 text-gray-700">
                <Link to='/home' className="hover:text-blue-600">Home</Link>
                <MdKeyboardArrowRight className="mx-2 text-gray-400" />
                <Link to='/cart' className="hover:text-blue-600 font-bold">Cart</Link>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Your Shopping Cart</h2>

            {cartItems.length > 0 ? (
                <div className="overflow-x-auto mb-16">
                    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-700">Image</th>
                                <th className="py-3 px-4 text-left text-gray-700">Title</th>
                                <th className="py-3 px-4 text-left text-gray-700">Price</th>
                                <th className="py-3 px-4 text-left text-gray-700">Quantity</th>
                                <th className="py-3 px-4 text-left text-gray-700">Total</th>
                                <th className="py-3 px-4 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                                    </td>
                                    <td className="py-4 px-4 text-gray-700">{item.product.name}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.product.price}</td>
                                    <td className="py-4 px-4 text-gray-700">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="w-16 border rounded p-1 text-center"
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-gray-700">${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td className="py-4 px-4 text-gray-700">
                                        <button onClick={() => deleteCartItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
            )}

            {cartItems.length > 0 && (
                <div className="absolute bottom-4 right-32">
                    <button 
                        onClick={handleCheckout} 
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserCart;
