// SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
const Signup = () => {
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    dateOfBirth: "",
    phoneNumber: "",
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    dateOfBirth: "",
    phoneNumber: "",
    agreeToTerms: "",
  });

  const countries = ["", "USA", "Canada", "UK", "Australia", "Other"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "", // Clear any previous errors when the user starts typing
    });
  };

  const handlePasswordStrength = () => {
    // You can implement password strength logic here if needed
    // For example, check if the password contains a combination of letters, numbers, and special characters
    // Update formErrors.passwordStrength accordingly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


   
    // Perform form validation
    let isValid = true;
    const newFormErrors = { ...formErrors };

   // Check if first name is empty
if (formData.firstName.trim() === "") {
  newFormErrors.firstName = "First name is required";
  isValid = false;
} else {
  // Check for minimum/maximum length
  const minFirstNameLength = 2; // Adjust as needed
  const maxFirstNameLength = 50; // Adjust as needed

  if (formData.firstName.trim().length < minFirstNameLength || formData.firstName.trim().length > maxFirstNameLength) {
     newFormErrors.firstName = `First name must be between ${minFirstNameLength} and ${maxFirstNameLength} characters`;
     isValid = false;
  }

  // Check for alphabetic characters only
  const alphabeticRegex = /^[A-Za-z]+$/;
  if (!alphabeticRegex.test(formData.firstName.trim())) {
     newFormErrors.firstName = "First name must contain only alphabetic characters";
     isValid = false;
  }

  // Check for specific format (e.g., title case)
  const titleCaseRegex = /^(?:(?:[A-Za-z]+[\s']?){1,2}[A-Za-z]+)$/;
  if (!titleCaseRegex.test(formData.firstName.trim())) {
     newFormErrors.firstName = "First name must be in title case";
     isValid = false;
  }
}

    if (formData.email.trim() === "") {
      newFormErrors.email = "Email is required";
      isValid = false;
   } else {
      // Check for a valid email format
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newFormErrors.email = "Invalid email format";
         isValid = false;
      }
   
      // Check for maximum length
      const maxEmailLength = 100; // Adjust as needed
      if (formData.email.trim().length > maxEmailLength) {
         newFormErrors.email = `Email must be ${maxEmailLength} characters or less`;
         isValid = false;
      }
   
      // Check for a specific domain
      const allowedDomain = "gmail.com"; // Adjust as needed
      if (!formData.email.trim().endsWith(`@${allowedDomain}`)) {
         newFormErrors.email = `Email must be from the domain ${allowedDomain}`;
         isValid = false;
      }
   
      // Check for a custom email format
      // const customEmailRegex = /^custom[0-9]+@example\.com$/; // Adjust as needed
      // if (!customEmailRegex.test(formData.email.trim())) {
      //    newFormErrors.email = "Email must follow a custom format";
      //    isValid = false;
      // }
   
      // Check for blacklisted domains
      const blacklistedDomains = ["example.net", "example.org"]; // Adjust as needed
      if (blacklistedDomains.includes(formData.email.trim().split('@')[1])) {
         newFormErrors.email = "Email from this domain is not allowed";
         isValid = false;
      }
   
      // Check for special characters
      // const specialCharactersRegex = /[!#$%^&*(),.?":{}|<>]/; // Adjust as needed
      // if (specialCharactersRegex.test(formData.email.trim())) {
      //    newFormErrors.email = "Email cannot contain special characters";
      //    isValid = false;
      // }
   }

    if (formData.password.trim() === "") {
      newFormErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newFormErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newFormErrors.password = "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/[a-z]/.test(formData.password)) {
      newFormErrors.password = "Password must contain at least one lowercase letter";
      isValid = false;
    } else if (!/\d/.test(formData.password)) {
      newFormErrors.password = "Password must contain at least one digit";
      isValid = false;
    } else if (!/[@#$%^&*!]/.test(formData.password)) {
      newFormErrors.password = "Password must contain at least one special character (@#$%^&*!)";
      isValid = false;
    }
    

    if (formData.confirmPassword.trim() === "") {
      newFormErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newFormErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (formData.country === "") {
      newFormErrors.country = "Please select your country";
      isValid = false;
    }

    const birthDate = new Date(formData.dateOfBirth);
    const minimumAge = 1; // Adjust the minimum age as needed
    const currentDate = new Date();
    
    if (currentDate.getFullYear() - birthDate.getFullYear() < minimumAge) {
      newFormErrors.dateOfBirth = `Must be at least ${minimumAge} years old`;
      isValid = false;
    }

   

    // Check if phone number is empty
    const phoneNumberRegex = /^\d{11}$/;
    const expectedCountryCode = "01";
    const minPhoneNumberLength = 11; // Adjust as needed
    const maxPhoneNumberLength = 15; // Adjust as needed
    
    if (formData.phoneNumber.trim() === "") {
       newFormErrors.phoneNumber = "Phone number is required";
       isValid = false;
    } else if (!phoneNumberRegex.test(formData.phoneNumber.trim())) {
       newFormErrors.phoneNumber = "Invalid phone number format";
       isValid = false;
    } else if (isNaN(formData.phoneNumber.trim())) {
       newFormErrors.phoneNumber = "Phone number must contain only numbers";
       isValid = false;
    } else if (formData.phoneNumber.trim().length < minPhoneNumberLength || formData.phoneNumber.trim().length > maxPhoneNumberLength) {
       newFormErrors.phoneNumber = `Phone number must be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} digits`;
       isValid = false;
    } else if (!formData.phoneNumber.trim().startsWith(expectedCountryCode)) {
       newFormErrors.phoneNumber = `Phone number must start with ${expectedCountryCode}`;
       isValid = false;
    }
    
    // Continue with other form validations or submit the form based on the isValid flag
    

    if (!formData.agreeToTerms) {
      newFormErrors.agreeToTerms = "You must agree to the terms and conditions";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }

    // Add your logic here to handle the signup, such as API call or authentication
    console.log("Signup submitted:", formData);

    // try {
    //   const check= await axios.get(
    //     "http://localhost:7000/manager/check-email",
    //   );
      
    //   if (response.data.exists) {
    //     newFormErrors.email = "Email already exists. Please use a different email.";
    //     setFormErrors(newFormErrors);
    //     return;
    //   }
    //   else{
        try {
     
          const response = await axios.post(
              `http://localhost:3000/manager/add`,
              {
                firstName: formData.firstName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                country: formData.country,
                dateOfBirth: formData.dateOfBirth,
                phoneNumber: formData.phoneNumber,
                lastName: formData.lastName,
                
               
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
         
            
        
    
          console.log("Backend Response:", response);
          if (response.data.exists) {
            setEmailError("Email already exists. Please use a different email.");
          } else {
            setEmailError(""); // Reset email error
          }
          router.push('/Login');
          // router.push('/Login');
        } catch (error) {
          console.error('Failed:', error);
          
          if (error.response) {
            console.log('Error Response Data:', error.response.data);
            console.log('Error Response Status:', error.response.status);
            console.log('Error Response Headers:', error.response.headers);
            setError(`Server error: ${error.response.status}`);
          } else if (error.request) {
            console.log('Error Request:', error.request);
            setError('Request to the server failed.');
          } else {
            console.log('Error Message:', error.message);
            setError('Something went wrong.');
          }
        }
        // You can also redirect the user to another page upon successful signup
      };
      
    // } catch (error) {
    //     setEmailError('Invalid');
    //   };
    

  return (
    <div className="flex justify-center items-center h-[110vh] bg-gradient-to-r from-[#079992] to-[#38ada9]">
      <div className="max-h-[110vh] rounded shadow-md">
      <Image
          src="/Assets/Signup.jpg" // Adjust the path based on your project structure
          alt="Manager"  
          className="rounded rounded-l-md" 
          width={480} // Set your desired width
          height={500} // Set your desired height
        />

      </div>
      <div className="bg-[#f1f2f6] px-12 rounded shadow-md w-full max-w-lg max-h-[110vh]">
        <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-1 border rounded-md focus:outline-none"
              
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-1 border rounded-md focus:outline-none"
              
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none"
            
            />
              {(formErrors.email || emailError) && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email || emailError}</p>
            )}
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                handlePasswordStrength();
              }}
              className="w-full p-1 border rounded-md focus:outline-none"
             
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
            {/* Display password strength indicator */}
            {/* Add your logic to display password strength here */}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none"
              
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-600">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-1 border rounded-md focus:outline-none"
                >
                   <option value="" disabled>
                    Select a Country
                    </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {formErrors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.country}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-1 border rounded-md focus:outline-none"
                
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-semibold text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-1 border rounded-md focus:outline-none"
             
            />
            {formErrors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.dateOfBirth}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="text-blue-500"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms" className="text-blue-500">
                terms and conditions
              </a>
            </label>
          </div>
          {formErrors.agreeToTerms && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.agreeToTerms}
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 w-full mt-4">
            Sign Up
          </button>
        </form>
        <Link href="/Login"><h6 className="text-blue-500 text-center ">Already have an account? Login here.</h6></Link>
        
      </div>
    </div>
  );
};

export default Signup;
