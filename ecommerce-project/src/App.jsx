import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/TrackingPage.jsx'
import { NotFoundPage } from './pages/404.jsx'
import './App.css'

function App() {
   const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items")
    .then((response) => {
      setCartItems(response.data);
    });
  }, []);

  return (
    <Routes>
      <Route index element={ <HomePage cartItems={cartItems} /> } />
      <Route path="checkout" element={ <CheckoutPage cartItems={cartItems} /> } />
      <Route path="orders" element={ <OrdersPage /> } />
      <Route path="tracking" element={ <TrackingPage /> } />
      <Route path="*" element={ <NotFoundPage /> } />
    </Routes>
  )
}

export default App
