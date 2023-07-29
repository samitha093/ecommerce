import { useState } from "react";
import Toast from "../modules/toast";
import axios, { AxiosResponse } from "axios";
import jwtDecode from 'jwt-decode';


interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

function Login() {
  const imageUrl = 'https://nest.botble.com/storage/general/login-1.png';
  const [password, setPassword] = useState('');
  const [useremail, setEmail] = useState('');

  const imageStyle: React.CSSProperties = {
    width: '400px',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  };
  const containerRightStyle: React.CSSProperties = {
    marginTop:'-200px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    marginLeft: '40px'
  };
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  function handleLogingClick() {
    // Prepare the user details object with email and password
    const userDetails = {
      email: useremail,
      password: password,
    };
    
    const myHost = sessionStorage.getItem('host');
    
    // Send a POST request to the /loginUser endpoint with the user details
    axios.post(`${myHost}/api/v1/auth/authenticate`, userDetails)
    .then((response: AxiosResponse<AuthResponse>) => {
      // Extract the access_token from the response.data object
      const accessToken = response.data.access_token;
      if(accessToken !=="Email already exists"){
        console.log(accessToken); //
        // The decodedToken variable now holds the decoded payload information
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken); // {username: "john", iat: 1598616022, exp: 1598619622}
        Toast.fire({
          icon: 'success',
          title: 'Succeessfully logged in'
        })
      }
      else{
        console.log(response.data);
        Toast.fire({
          icon: 'error',
          title: 'Email or password is incorrect'
        })
      }
    })
      .catch((error) => {
        console.error("Error login user:", error);
        Toast.fire({
          icon: 'error',
          title: 'Email or password is incorrect'
        })
      });
  }
  
  return (
    <div className="grid grid-cols-2 gap-0 content-center ...">
      <div style={containerStyle}>
        <img src={imageUrl} style={imageStyle} />
      </div>

      <div style={containerRightStyle}>
        <div className="h-56 grid grid-cols-1 gap-0  mt-0" style={{ textAlign: 'left' }}>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '44px', fontWeight: 'bold',textAlign:'left',color:'#001C30' }}>Login</h1>
          </div>
          <div>
            <h1 style={{textAlign:'left'}}>Don't have an account? <a style={{color:"#35A29F"}}>Create one</a> </h1>
          </div>
          <div className=" mt-4">
            <input placeholder="Email"
              type="text"
              value={useremail}
              onChange={handleEmailChange}
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className=" mt-2">
            <input placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>

            <div className="grid grid-cols-2 gap-1 mt-2" style={{ textAlign: 'left' }} >
              <div style={{ textAlign: 'left' }}>
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" style={{ textAlign: 'left' }}>
                <input
                  type="checkbox"
                  id="checkboxDefault"
                  className="form-checkbox mr-2 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxDefault">
                    Remember password
                  </label>
                </div>
              </div>
              <div style={{color:'#B5C99A'}}>Forgot Password?</div>
            </div>
            <div style={{ textAlign: 'left' }} className="mt-8">
              <button 
              style={{padding:'15px',width:'130px'}} 
              onClick={handleLogingClick} 
              className="bg-blue-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
            </div>
        </div>
      </div>
    </div>
  )
}
export default Login;