// LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';




const EditProfile = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "", // Clear any previous errors when the user starts typing
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation
    let isValid = true;
    const newFormErrors = { ...formErrors };
  
    if (formData.email.trim() === "") {
      newFormErrors.email = "Email is required";
      isValid = false;
    }
  
    if (formData.password.trim() === "") {
      newFormErrors.password = "Password is required";
      isValid = false;
    }
  
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:7000/manager/login',
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
   
      // Check for a specific error condition (e.g., password mismatch)
      if (response.data.error === "PasswordMismatchError") {
        setPasswordError("Incorrect password. Please try again.");
        setEmailError(""); // Reset email error
      } else if (response.data.error === "EmailMismatchError") {
        setEmailError("Email and password do not match. Please try again.");
        setPasswordError(""); // Reset password error
      } else {
        console.log("Login success:", response);
        router.push('/Manager');
      }
    } catch (error) {
      console.log("Error:", error);
      setGeneralError("There was an error logging you in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-1">
              Profile Pic:
            </label>
            <input
              type="file"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600 mb-1">
              Name:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
              Phone:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              
             
            />
           
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
