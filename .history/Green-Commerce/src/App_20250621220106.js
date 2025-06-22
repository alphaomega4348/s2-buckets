import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./Component/Header";
import Home from "./Component/Home";
import NavBar from "./Component/navbar";
import Checkout from "./Component/Checkout";

import Login from "./Component/Login";
import Headergreen from "./Component/Headergreen";
import NavBarg from "./Component/navbargreen";
import OrderPage from "./Component/OrderPage";
import OrderConfirmationWrapper from "./Component/OrderConfirmationWrapper";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EducationSection from "./Component/Educationsection";
import SustainabilityReportsSection from "./Component/Sustainability";
import Footer from "./Component/Footer";

import Orders from "./Component/Orders";
import Thanks from "./Component/thanks";
import SellerSection from "./Component/SellerSection";
import Submitted from "./Component/Submitted";

import Dashboard from "./Component/Dashboard";
import Feedback from "./Component/feedback";
import ProductDetails from "./Component/ProductDetails";
import ProductDetails1 from "./Component/ProductDetails1";

import FSubmitted from "./Component/Feedbacksubmitted";
import GreenProducts from "./Component/GreenProducts";

import ProductPage from "./Component/ProductPage";
import Signup from "./Component/Signup";
import GroupOrderSetup from "./Component/GroupOrderSetup";
import MyGroups from "./Component/MyGroups";
import NearbyGroups from "./Component/NearbyGroups";

import ProtectedRoute from "./Auth/ProtectedRoute"; // ✅ Import ProtectedRoute
import StandardDashboard from "./Component/StandardDashboard";

const ecoCartItems = [
  {
    productName: 'Reusable Bamboo Toothbrush - 4 Pack',
    brand: 'GreenSmile',
    image: 'https://brownliving.in/cdn/shop/files/sustainable-bamboo-toothbrush-with-charcoal-bristles-adults-pack-of-4-by-oiko-at-brownliving-344070.png?v=1745430490&width=1000',
    quantity: 2,
    price: 349,
  },
  {
    productName: 'Organic Cotton Grocery Bags - Set of 6',
    brand: 'EcoRight',
    image: 'https://m.media-amazon.com/images/I/71B56Of6vTL._SL1500_.jpg',
    quantity: 1,
    price: 599,
  },
  {
    productName: 'Compostable Biodegradable Garbage Bags - 30L',
    brand: 'GreenPolly',
    image: 'https://m.media-amazon.com/images/I/41zGNEYgBZL._AC_UF1000,1000_QL80_.jpg',
    quantity: 1,
    price: 289,
  },
];

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={[<standardH />, <NavBar />, <Home />, <Footer />]} />
          <Route path="/feedbacksubmitted" element={[<Headergreen />, <NavBarg />, <FSubmitted />]} />
          <Route path="/feedback" element={[<Headergreen />, <NavBarg />, <Feedback />, <Footer />]} />
          <Route path="/submitted" element={[<Headergreen />, <Submitted />]} />
          <Route path="/seller" element={[<Headergreen />, <SellerSection />, <Footer />]} />
          <Route path="/thanks" element={[<Header />, <Thanks />]} />
          <Route path="/orders" element={[<Header />, <Orders />, <Footer />]} />
          <Route path="/sustainability" element={[<Headergreen />, <SustainabilityReportsSection />, <Footer />]} />
          <Route path="/education" element={[<Headergreen />, <EducationSection />, <Footer />]} />
          <Route path="/green" element={[<Headergreen />, <GreenProducts />, <Footer />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={[<Header />, <Checkout />, <Footer />]} />
          <Route path="/greendashboard" element={[<Headergreen />, <Dashboard />, <Footer />]} />
          <Route path="/product" element={[<Headergreen />, <NavBarg />, <ProductDetails />, <Footer />]} />
          <Route path="/product1" element={[<Headergreen />, <NavBarg />, <ProductDetails1 />, <Footer />]} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/delivery" element={<OrderPage cartItems={ecoCartItems} />} />
          <Route path="/standardDashboard" element={<StandardDashboard/>} />

          {/* ✅ Protected Routes */}
          <Route
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmationWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-order-setup"
            element={
              <ProtectedRoute>
                <GroupOrderSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-groups"
            element={
              <ProtectedRoute>
                <MyGroups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nearby-groups"
            element={
              <ProtectedRoute>
                <NearbyGroups />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;