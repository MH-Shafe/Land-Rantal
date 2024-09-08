import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [Name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userCategory, setUserCategory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleUserCategoryChange = (e) => {
    setUserCategory(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check file size (5MB limit in this example)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the limit (5MB)');
    } else {
      setProfilePicture(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Name || !userName || !password || !confirmPassword || !agreeTerms || !userCategory || !profilePicture) {
        setError('All fields are required');
      } else if (!isValidUserName(userName)) {
        setError('Minimum length of 3 characters and only alphanumeric characters allowed');
      } else if (!isValidPassword(password)) {
        setError('Password must be strong (8 characters, letters, numbers, and special characters)');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } /*else if (!isValidAddress(address)) {
        setError('Incorrect address');
      }*/ else if (!agreeTerms) {
        setError('You must agree to the terms and conditions');
      } else if (!userCategory) {
        setError('Please select a user category');
      } else if (!isValidProfilePicture(profilePicture)) {
        setError('Please upload a valid image file for the profile picture (jpg, webp, png, jpeg)');
      }else {
        await postData();
        // Show a success message
        setError('Signup successful! Redirecting to login page...');
        // Optionally, you can use setTimeout to delay the redirect message
        setTimeout(() => {
          // Redirect to the login page
          // You should replace '/login' with the actual URL of your login page
          window.location.href = '/landSeeker/login';
        }, 3000); // Redirect after 3 seconds (adjust as needed)
      }
    } catch (error) {
      if (error.response && error.response.status === 500 && error.response.data === 'Username already exists. Please choose a different username.') {
        setError('Username already exists. Please choose a different username.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  const postData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', Name);
      formData.append('username', userName);
      formData.append('password', password);
      formData.append('address', address);
      formData.append('profilepic', profilePicture);

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/landseekers/addlandSeekers',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      // Check if the error is an Axios error and the status code is 500
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        // Set a user-friendly error message for the 500 status code
        setError('Username already exists. Please choose a different username.');
      } else {
        // Set a generic error message for other types of errors
        setError('An error occurred. Please try again.');
      }
  
      console.error('Error in postData:', error);
    }
  };

  const isValidUserName = (userName) => {
    const userNameRegex = /^[a-zA-Z0-9]{3,}$/;
    return userNameRegex.test(userName);
  };

  const isValidAddress = (address) => {
    const addressRegex = /^[a-zA-Z0-9]{3,}$/;
    return addressRegex.test(address);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidProfilePicture = (file) => {
    return (
      file &&
      file.type.startsWith('image/') 
      //&& file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)
    );
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 ">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
           <div>
            <label className="block mb-1">Name:</label>
            <input 
              type="text"
              name="Name"
              value={Name}
              onChange={handleNameChange}
              className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
            />
          </div>


            <div>
              <label className="block mb-1">User Name:</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleUserNameChange}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                />
            </div>
            <div>
              <label className="block mb-1">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                />
            </div>
            <div>
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleChangeAddress}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                />
            </div>
            <div>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={agreeTerms}
                  onChange={handleAgreeTermsChange}
                />
                I agree to the terms and conditions
              </label>
            </div>
            <div>
              <label className="block mb-1">User Category:</label>
              <select
                name="userCategory"
                value={userCategory}
                onChange={handleUserCategoryChange}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                >
                <option value="">Select User Category</option>
                <option value="landSeeker">Land Seeker</option>
                <option value="landOwner">Land Owner</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                name="profilePicture"
                onChange={handleProfilePictureChange}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
  
}
