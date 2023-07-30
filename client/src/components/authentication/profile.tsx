import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Toast from "../modules/toast";
import jwtDecode from 'jwt-decode';



interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

function Profile() {
  const imageUrl = 'https://nest.botble.com/storage/general/login-1.png';
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [useremail, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  function handleRegisterClick() {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      const userDetails = {
        username: username,
        email: useremail,
        password: password,
        role:"USER"
      };
      console.log(userDetails);
      const myHost = sessionStorage.getItem('host');
      console.log(myHost);
      axios
        .post(`${myHost}/api/v1/auth/register`, userDetails)
        .then((response) => {

        //refresh token save in browser cookie
        document.cookie = "refresh-token=" + response.headers["refresh-token"];


          // Get the response headers
          const headers = response.headers;
          console.log(headers);

          const customHeader1 = headers['content-length'];
          const customHeader2 = headers['refresh-token'];
      
          console.log('Custom Header 1:', customHeader1);
          console.log('Custom Header 2:', customHeader2);

          //response code print
          console.log(response.status);
          

          // const accessToken = response.data.access_token;
          // console.log(accessToken); //
          // const decodedToken = jwtDecode(accessToken);
          // console.log(decodedToken);

          if(response.status==200){
       
            Toast.fire({
              icon: 'success',
              title: 'New user added successfully'
            })
          }
          else{
            console.log(response.data);
            Toast.fire({
              icon: 'error',
              title: 'Email already exists'
            })
          }
   


        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  }
  return (
    <div className="grid grid-cols-2 gap-0 content-center ...">
      <div style={containerStyle}>
        <img src={imageUrl} style={imageStyle} />
      </div>

      <div style={containerRightStyle}>
        <div className="h-56 grid grid-cols-1 gap-0 mt-0" style={{ textAlign: 'left' }}>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '44px', fontWeight: 'bold',textAlign:'left', color: '#001C30' }}>Register</h1>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h1>Please fill in the information below</h1>
          </div>
          <div className="mt-2" style={{ textAlign: 'left' }}>
            <input
              placeholder="Your Name"
              type="text"
              value={username}
              onChange={handleUsernameChange} // Update username state on input change
              style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className="mt-2" style={{ textAlign: 'left' }}>
            <input
              placeholder="Email"
              type="text"
              value={useremail}
              onChange={handleEmailChange} // Update email state on input change
              style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className="mt-2" style={{ textAlign: 'left' }}>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ border: '1px solid #7FFFD4', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className="mt-2" style={{ textAlign: 'left' }}>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ border: `1px solid ${passwordMatch ? '#7FFFD4' : 'red'}`, borderRadius: '5px', height: '50px', width: '300px' }}
            />
            {!passwordMatch && <p style={{ color: 'red', margin: '5px 0', fontSize: '12px' }}>Passwords do not match</p>}
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]" style={{ textAlign: 'left' }}>
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer items-center" htmlFor="checkboxDefault">
                <input
                  type="checkbox"
                  id="checkboxDefault"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="form-checkbox mr-2 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                I agree to terms & Policy.
              </label>
            </div>
          </div>
          <div style={{ textAlign: 'left' }} className="mt-8">
            <button
              onClick={handleRegisterClick}
              style={{ padding: '15px', width: '130px' }}
              className={`text-white font-bold py-2 px-4 rounded ${isChecked ? 'bg-blue-900 hover:bg-green-700' : 'bg-gray-400'}`}
              disabled={!isChecked}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;