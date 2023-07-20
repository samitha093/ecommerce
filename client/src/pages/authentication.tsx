import Profile from "../components/authentication/profile";
import Login from "../components/authentication/login";
import { CSSProperties } from "react";

function Authentication() {
  const containerStyle: CSSProperties = {
    display: 'flex',
  };
  const halfPageStyle: CSSProperties = {
    flex: 1,
    width: '50%',
    padding: '20px',
    display: 'flex', 

  };
  
  const imageStyle: CSSProperties = {
    maxWidth: '60%',
    height: 'auto',
    float: 'right', // Align the image to the right
  };
  const imageUrl = 'https://nest.botble.com/storage/general/login-1.png';

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-500">Authentication</h1>
      <div style={containerStyle}>
      <div style={halfPageStyle}>
      <img src={imageUrl} alt="Image" style={imageStyle} />
      </div>
      <div style={halfPageStyle}>
        <Login />
      </div>
    </div>

      
    </div>
  )
}

export default Authentication;
