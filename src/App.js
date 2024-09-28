import './App.css';
import Login from './Components/Login/Login';
import { useState } from 'react';
import TopBar from './Components/Layouts/TopBar';
import Product from './Components/product/Product';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Categories from './Components/product/Categories';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Layouts/Footer';
import SingleProduct from './Components/product/Singleproduct';
import HomePage from './Components/product/Home';
import UserCart from './Components/product/Cart';
import ProductSearch from './Components/product/Search';
import CheckoutPage from './Components/product/Checkout';
import AboutUsPage from './Components/product/AboutUs';
import ContactUsPage from './Components/product/ContactUs';
import UserProfile from './Components/product/Userprofile';
import EditProfile from './Components/product/Editprofile';
import Settings from './Components/product/Setting';
import Register from './Components/Login/Signup';
function App() {
  const [email, setEmail] = useState(null);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const handleLoginClick = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  return (
    <div className="">
      <BrowserRouter>
        <TopBar email={email} onLoginClick={handleLoginClick} />
        <Routes>
          <Route path='/' element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register setEmail={setEmail} />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<HomePage setEmail={setEmail} isLoginVisible={isLoginVisible} setIsLoginVisible={setIsLoginVisible}/>} />
          <Route path='/product' element={<Product />} />
          <Route path='/about' element={<AboutUsPage/>} />
          <Route path='/contact' element={<ContactUsPage/>} />

          <Route path='/category' element={<Categories />} />
          <Route path='/product/:productId' element={<SingleProduct />} />
          <Route path='/usercart' element={<UserCart/>} />
          <Route path='/search' element={<ProductSearch />} />
          <Route path='/usercart' element={<UserCart />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/setting' element={<Settings/>} />



        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
