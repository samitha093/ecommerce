import React, { useState } from 'react';
import Toast from '../modules/toast';
import axios from 'axios';

function getAccessToken() {
    const [accessToken, setAccessToken] = useState('');
    
    let refreshToken = sessionStorage.getItem('refresh_token');
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
            setAccessToken(access_token);
            // Toast.fire({
            //   icon: 'success',
            //   title: 'Refresh token function run successfully',
            // });
  
            sessionStorage.setItem('refresh_token', refresh_token);
           
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
        return accessToken;
    }
  
export default getAccessToken;