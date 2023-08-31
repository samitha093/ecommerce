import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Authentication from './pages/authentication';
import Navbar from './components/navbar/navbar';
import Dashboard from './pages/dashboard';
import ProductImageUpload from './pages/productImageUpload';
import { useEffect, useState } from 'react';
import CategoryUpload from './pages/categoryUpload';

function App() {
  useEffect(() => {
    var hostname = window.location.hostname;
    sessionStorage.setItem('host', 'http://' + hostname + ':8083');
  }, []);

  const [message, setMessage] = useState('');
  const handleMessageChange = (newMessage: any) => {
    setMessage(newMessage);
  };
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
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
