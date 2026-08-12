import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage.jsx'

import './App.css'

function App() {
 

  return (
    <Routes>
      <Route index element={ <HomePage /> } />
      <Route path="checkout" element={ <h1>Test Checkout page</h1> } />
    </Routes>
  )
}

export default App
