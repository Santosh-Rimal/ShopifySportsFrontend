// import './App.css';
// import Login from './Components/Login/Login';
// import { useState } from 'react';
// import TopBar from './Components/Layouts/TopBar';
// import Product from './Components/product/Product';
// import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
// import Categories from './Components/product/Categories';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Footer from './Components/Layouts/Footer';
// import SingleProduct from './Components/product/Singleproduct';
// import HomePage from './Components/product/Home';
// import UserCart from './Components/product/Cart';
// import ProductSearch from './Components/product/Search';
// import CheckoutPage from './Components/product/Checkout';
// import AboutUsPage from './Components/product/AboutUs';
// import ContactUsPage from './Components/product/ContactUs';
// import UserProfile from './Components/product/Userprofile';
// import EditProfile from './Components/product/Editprofile';
// import Settings from './Components/product/Setting';
// import Register from './Components/Login/Signup';
// import Epay from './Components/product/Epay';
// import Success from './Components/product/Success';
// import Failure from './Components/product/Failure';
// import Protectedroute from './Components/product/Protectedroute';
// import SearchResults from './Components/product/SearchResults'
// function App() {
//   const [email, setEmail] = useState(null);
//   const [isLoginVisible, setIsLoginVisible] = useState(false);
//   const handleLoginClick = () => {
//     setIsLoginVisible(!isLoginVisible);
//   };

//   return (
//     <div className="">
//       <BrowserRouter>
//         <TopBar email={email} onLoginClick={handleLoginClick} />
//         <Routes>
//           <Route path='/' element={<Login setEmail={setEmail} />} />
//           <Route path="/register" element={<Register setEmail={setEmail} />} />
//           <Route path='/dashboard' element={<Dashboard />} />
//           <Route path='/home' element={<HomePage setEmail={setEmail} isLoginVisible={isLoginVisible} setIsLoginVisible={setIsLoginVisible}/>} />
//           <Route path='/product' element={<Product />} />
//           <Route path='/about' element={<AboutUsPage/>} />
//           <Route path='/contact' element={<ContactUsPage/>} />
//           <Route path='/category' element={<Categories />} />
//           <Route path='/product/:productId' element={<SingleProduct />} />
//           <Route path='/usercart' element={<Protectedroute><UserCart/></Protectedroute>} />
//           <Route path='/search' element={<ProductSearch />} />
//           <Route path='/usercart' element={<UserCart />} />
//           <Route path='/checkout' element={<CheckoutPage />} />
//           <Route path='/userprofile' element={<UserProfile />} />
//           <Route path='/editprofile' element={<EditProfile />} />
//           <Route path='/setting' element={<Settings/>} />
//           <Route path='/setting' element={<Settings/>} />
//           <Route path='/epay' element={<Epay/>} />
//           <Route path='/success' element={<Success/>} />
//           <Route path='/failure' element={<Failure/>} />
//           <Route path='/search-results' element={<SearchResults/>} />
         



//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;




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
import Epay from './Components/product/Epay';
import Success from './Components/product/Success';
import Failure from './Components/product/Failure';
import Protectedroute from './Components/product/Protectedroute';
import SearchResults from './Components/product/SearchResults';

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
          <Route path='/login' element={<Login setEmail={setEmail} />} />
          <Route path="/register" element={<Register setEmail={setEmail} />} />
          
          {/* Protected Routes */}
          <Route path='/dashboard' element={<Protectedroute><Dashboard /></Protectedroute>} />
          <Route path='/usercart' element={<Protectedroute><UserCart /></Protectedroute>} />
          <Route path='/userprofile' element={<Protectedroute><UserProfile /></Protectedroute>} />
          <Route path='/editprofile' element={<Protectedroute><EditProfile /></Protectedroute>} />
          <Route path='/setting' element={<Protectedroute><Settings /></Protectedroute>} />
          <Route path='/epay' element={<Protectedroute><Epay /></Protectedroute>} />
          <Route path='/success' element={<Protectedroute><Success /></Protectedroute>} />
          <Route path='/failure' element={<Protectedroute><Failure /></Protectedroute>} />
          <Route path='/checkout' element={<Protectedroute><CheckoutPage /></Protectedroute>} /> {/* Checkout as Protected Route */}

          {/* Public Routes */}
          <Route path='/' element={<HomePage setEmail={setEmail} isLoginVisible={isLoginVisible} setIsLoginVisible={setIsLoginVisible}/>} />
          <Route path='/product' element={<Product />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/category' element={<Categories />} />
          <Route path='/product/:productId' element={<SingleProduct />} />
          <Route path='/search' element={<ProductSearch />} />
          <Route path='/search-results' element={<SearchResults />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
