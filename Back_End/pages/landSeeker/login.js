import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/pages/authcontext';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(''); 
  const [landSeekerId, setLandSeekerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
    } else {
      const res = await doSignIn(username, password);
      console.log(res);
    }
  };
  
  async function doSignIn(username, password) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/login/`,
        {
          username,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' }, // Update content-type
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 5 * 60 * 1000);
        Cookies.set('session', document.cookie, {           
          expires: expirationTime,
        });

        console.log('session' + document.cookie);
        login(username, document.cookie);
        router.push(`landSeekerProfile/${response.data.landSeekerId}`);
        console.log(response.data.landSeekerId);
        console.log(response.data);
      } else {
        setError('Invalid user');
      }
  
      
      
  
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.'); // Set a generic error message
    }
  }
  



  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Login Page</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="input input-bordered w-full max-w-xs bg-gray-200 text-gray-800 focus:bg-white"
              onChange={handleChangeUsername}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              className="input input-bordered w-full max-w-xs bg-gray-200 text-gray-800 focus:bg-white"
              onChange={handleChangePassword}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
  

    
}


