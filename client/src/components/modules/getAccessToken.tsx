import React, { useState } from 'react';
import Toast from '../modules/toast';
import axios from 'axios';

interface GetAccessTokenProps {
  onAccessTokenReceived: (accessToken: string) => void; 
}

const GetAccessToken: React.FC<GetAccessTokenProps> = ({ onAccessTokenReceived }) => {
  // Get refresh token from session storage
  const refreshToken = sessionStorage.getItem('refresh_token');

  // send refreshToken in authorization header
  function handleRegisterClick() {
    const myHost = sessionStorage.getItem('host');
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
          console.log(response.headers);
          if (refresh_token) {
            console.log(refresh_token);
            sessionStorage.setItem('refresh_token', refresh_token);
            // Send the access token to the parent component
            onAccessTokenReceived(access_token);
          } else {
            console.log('Refresh-Token header not found in the response.');
          }
          // Toast.fire({
          //   icon: 'success',
          //   title: 'Refresh token function run successfully',
          // });
          console.log('Refresh-Token header not found ');
        } else {
          // Toast.fire({
          //   icon: 'error',
          //   title: 'Refresh token function failed',
          // });
          console.log('Refresh-Token header not found ');
        }
      })
      .catch(() => {
        // Toast.fire({
        //   icon: 'error',
        //   title: 'Refresh token function run successfully',
        // });
      });
  }

  // Use effect to run handleRegisterClick
  React.useEffect(() => {
    handleRegisterClick();
  }, []);

  return <></>;
};

export default GetAccessToken;
