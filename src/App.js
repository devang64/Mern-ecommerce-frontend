import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header'
import 'font-awesome/css/font-awesome.min.css';
import Home from './components/Home/Home.js'
import Loader from './components/layout/Loader/Loader';
import ProductDetails from '../src/components/Product/ProductDetails'
import Products from './components/Product/Product';
import Search from '../src/components/Features/Search';
import LoginSignup from './components/User/LoginSignup';
import UpdateProfile from './components/User/UpdateProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import { loadUser } from './redux/Action/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Orders/MyOrder';
import OrderDetails from './components/Orders/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import Sliders from './components/layout/Slider/Slider';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrdersList from './components/Admin/OrdersList';
import UpdateOrder from './components/Admin/UpdateOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
// import DashboardLayout from './components/Admin/DashboardLayout';
function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { vrifyUserAuthenticate, user } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");
  const isAdminRoute = location.pathname.startsWith('/admin');
  async function getStriptApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    dispatch(loadUser());
    getStriptApiKey()

  }, [dispatch])
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    appearance,
  };
  return (
    <div className='App' >


      {isAdminRoute ? null : <Header />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/slider' element={<Sliders />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/product/:category' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/load' element={<Loader />} />
        <Route path='/search' element={<Search />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />
        <Route path='/admin/dashboard' element={<Dashboard />} ></Route>
        <Route path='/admin/products' element={<ProductList />} ></Route>
        <Route path='/admin/product' element={<NewProduct />} ></Route>
        <Route path='/admin/products/:id' element={<UpdateProduct />} ></Route>
        <Route path='/admin/orders' element={<OrdersList />} ></Route>
        <Route path='/admin/order/:id' element={<UpdateOrder />} ></Route>
        <Route path='/admin/users' element={<UsersList />} ></Route>
        <Route path='/admin/users/:id' element={<UpdateUser />} ></Route>
        <Route path='/admin/reviews' element={<ProductReviews />} ></Route>
        <Route path='/shipping' element={<Shipping />} />

        {/* Define the Payment route here */}
        {stripeApiKey && (
          <Route path="/process/payment" element={
            <Elements options={options} stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          } />
        )}
        <Route path='/success' element={<OrderSuccess />} ></Route>
        <Route path='/orders' element={<MyOrder />} ></Route>
        <Route path='/order/:id' element={<OrderDetails />} ></Route>

      </Routes>

      {isAdminRoute ? null : <Footer />}

    </div>
  );
}

export default App;
