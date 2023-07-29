import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

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
    <ul className="flex">
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to="/">
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li
        className="mr-6"
        onMouseEnter={handleMouseEnter}
    
      >
        <div className="relative inline-block">
          <span className="text-blue-500 hover:text-blue-800">Authentication</span>
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
