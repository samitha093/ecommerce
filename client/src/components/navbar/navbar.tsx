
import {Link } from 'react-router-dom';
function Navbar (){
  return (
      <ul className="flex">
        <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800"  to='/'>Home</Link>
        </li>
        <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800"  to='/dashboard'>Dashboard</Link>
        </li>
        <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800"  to='/login'>Login</Link>
        </li>
        <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800"  to='/profile'>Profile</Link>
        </li>
      </ul>
  );
};

export default Navbar;
