import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/home/home';
import Profile from './components/authentication/profile';
import Login from './components/authentication/login';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
