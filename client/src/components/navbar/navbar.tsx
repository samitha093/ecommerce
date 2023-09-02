import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../modules/toast';
import axios from "axios";
import jwtDecode from 'jwt-decode';
interface NavbarProps {
  handleMessageChange: (message: string) => void;
}

function Navbar({ handleMessageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("false");
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState("false");

  const handleMouseEnter = () => {
    const loginState = localStorage.getItem('isLogin');
    if(loginState == null){
      setIsLogin("false");
    }
    else if(loginState == 'true'){
      setIsLogin(loginState);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item: string) => {
    handleMessageChange(item);
    localStorage.setItem('auth', item);
  };

  const handleLoginClick = () => {
    handleItemClick('LOGIN');
    navigate('/authentication');
  };
  const handleLogOutClick = () => {
    handleItemClick('LOGIN');
    localStorage.setItem('isLogin', 'false');
    setIsLogin("false");
    navigate('/authentication');
  };
  const handleRegisterClick = () => {
    handleItemClick('REGISTER');
    navigate('/authentication');
  };
  

  const handleNavigateHome = () => {
    navigate('/');
  };
  //use effect for logout
  useEffect(() => {
    const loginState = localStorage.getItem('isLogin');
    if(loginState == null){
      setIsLogin("false");
    }
    else if(loginState == 'true'){
      setIsLogin(loginState);
    }
   
  }, [isLogin]);
  
  

  const handleNavigateDashboard = () => {
    getAccessToken("dashboard");
      
  };

  const handleNavigateImageUpload = () => {
    // getAccessToken("productImageUpload");

    navigate('/productImageUpload');
  };
  const handleNavigateCategory = () => {
    // getAccessToken("categoryUpload");

    navigate('/categoryUpload');
  };
  const handleNavigateCart = () => {
    navigate('/cart');
  };
  //pass parameter to this function
  function getAccessToken(routeName: string) {
    let refreshToken = sessionStorage.getItem('refresh_token');
    var myHost = sessionStorage.getItem('host');
    //test
    myHost = "http://localhost:8081";

    axios
      .post(
        `${myHost}/api/v1/auth/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Check if the header exists before accessing it
          const refresh_token = response.headers['refresh-token'];
          const access_token = response.headers['access-token'];
          sessionStorage.setItem('refresh_token', refresh_token);
          setAccessToken(access_token);
          const decodedToken: any = jwtDecode(access_token);
          let isVerified = decodedToken.isVerified;
          if(isVerified == "true"){
            setIsVerified("true");
            navigate('/'+routeName);
          }
          else{
            setIsVerified("false");
            Toast.fire({
              icon: 'error',
              title: 'Please verify your email',
            });
          }
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Refresh token function failed',
          });
          console.log('Refresh-Token header not found ');
          
        }
      })
      .catch(() => {
        Toast.fire({
          icon: 'error',
          title: 'Refresh token function error',
        });
      });
  }

  return (
    <ul className="flex bg-lightblue-300 w-screen h-12 items-center px-4">
      <li className="mr-6">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" 
          onClick={handleNavigateHome}>
          Home
        </button>
        </span>
      </li>


      <li className="mr-6">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
          </svg>
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" onClick={handleNavigateDashboard}>
          Product
        </button>
        </span>
      </li>

      <li className="mr-6">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" 
          onClick={handleNavigateImageUpload}>
         Image Upload
        </button>
        </span>
      </li>
      <li className="mr-6">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" 
          onClick={handleNavigateCategory}>
         Category Upload
        </button>
        </span>
      </li>
      <li className="mr-6">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" 
          onClick={handleNavigateCart}>
         Cart
        </button>
        </span>
      </li>
      <li className="flex items-center ml-auto mr-6"
       onMouseEnter={handleMouseEnter}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <div className="relative inline-block ml-2">
          <button className="text-blue-500 hover:text-blue-400 bg-transparent hover:bg-blue-200 text-sm px-4 py-2 border rounded-full" >Account</button>
          {isOpen ? (
  <div
    className="absolute mt-1 py-2 px-4 bg-white shadow-lg rounded"
    onMouseLeave={handleMouseLeave}
  >
    {isLogin === 'false' ? (
      <>
        <p className="text-black">
          <button
            className="text-blue-500 hover:text-blue-800"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </p>
        <p className="text-black">
          <button
            className="text-blue-500 hover:text-blue-800"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </p>
      </>
    ) : (
      <p className="text-black">
         <button
            className="text-blue-500 hover:text-blue-800"
            onClick={handleLogOutClick}
          >
            Logout
          </button>
      </p>
    )}
  </div>
) : null}
        </div>
      </li>
    </ul>
  );
}

export default Navbar;
