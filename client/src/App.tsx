import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home';
import Authentication from './pages/authentication';
import Navbar from './components/navbar/navbar';
import Dashboard from './pages/dashboard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    var hostname = window.location.hostname;
    sessionStorage.setItem('host', 'http://'+hostname+':8085');
  }, []);
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route path="/home" element={<Home/>} />
        {/* <Route path="/authentication" element={<Authentication/>} /> */}
        <Route path="/" element={<Authentication/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
