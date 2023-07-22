import Login from "../components/authentication/login";
import Profile from "../components/authentication/profile";
import { CSSProperties } from "react";

function Authentication() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <h1 className="text-4xl font-bold text-blue-500">Authentication</h1>
    <div className="h-56 grid grid-cols-1 gap-0 content-center mt-40">
      <Profile/>
    </div>
  </div>
  

      

  )
}

export default Authentication;
