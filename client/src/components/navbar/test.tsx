import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  handleMessageChange: (message: string) => void;
}

function Navbar({ handleMessageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
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

  const handleRegisterClick = () => {
    handleItemClick('REGISTER');
    navigate('/authentication');
  };

  return (
    <ul className="flex bg-lightblue-300 w-screen h-12 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>

      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to="/">
          Home
        </Link>
      </li>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
      </svg>

      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>

      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to="/">
          Cart
        </Link>
      </li>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>

      <li
        className="mr-6"
        onMouseEnter={handleMouseEnter}
      >

        <div className="relative inline-block">
          <span className="text-blue-500 hover:text-blue-800">Account</span>
          {isOpen && (
            <div
              className="absolute mt-1 py-2 px-4 bg-white shadow-lg rounded"
              onMouseLeave={handleMouseLeave}
            >
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
            </div>
          )}
        </div>
      </li>
    </ul>
  );
}

export default Navbar;