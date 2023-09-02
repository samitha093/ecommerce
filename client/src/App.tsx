import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Authentication from './pages/authentication';
import Navbar from './components/navbar/navbar';
import Dashboard from './pages/dashboard';
import ProductImageUpload from './pages/productImageUpload';
import { useEffect, useState } from 'react';
import CategoryUpload from './pages/categoryUpload';
import Transactions from './pages/transactions';
import axios from 'axios';

function App() {


  // // axios get request
  // const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjkzNjQ1MzQyLCJleHAiOjE2OTM2NDg5NDJ9.ck4Y7uKlWUC9MW0wNTqxvZedUkjWCOxytOWnKzA5MTA';

  // // Axios GET request with authentication
  // axios.get('/api/v1/transactions/test', {
  //   headers: {
  //     Authorization: `Bearer ${bearerToken}`,
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });


  const [message, setMessage] = useState('');
  const handleMessageChange = (newMessage: any) => {
    setMessage(newMessage);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Navbar handleMessageChange={handleMessageChange} />
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/authentication" element={<Authentication message={message}/>} />
        <Route path="/dashboard"  element={<Dashboard/>} />
        <Route path="/productImageUpload"  element={<ProductImageUpload/>} />
        <Route path="/categoryUpload"  element={<CategoryUpload/>} />
        <Route path="/cart"  element={<Transactions/>} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App