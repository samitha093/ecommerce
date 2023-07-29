import Login from "../components/authentication/login";
import Profile from "../components/authentication/profile";
import { useEffect } from "react";

interface authProps {
  message: string;
}


function Authentication({ message }: authProps) {
  useEffect(() => {
   const auth =  localStorage.getItem('auth');
   console.log(auth);

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="h-56 grid grid-cols-1 gap-0 content-center mt-40">
        {message === 'LOGIN' ? <Login /> : <Profile />}
      </div>
    </div>
  );
}

export default Authentication;
