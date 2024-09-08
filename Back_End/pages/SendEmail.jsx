import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const SendEmail = () => {
  const router = useRouter();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleToChange = (e) => {
    setTo(e.target.value);
    setIsButtonDisabled(!validateEmail(e.target.value));
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!to) {
      setFormErrors({ to: 'Email address is required' });
      setIsLoading(false);
    } else if (!validateEmail(to)) {
      setFormErrors({ to: 'Please enter a valid email address format' });
      setIsLoading(false);
    } else if (!subject) {
      setFormErrors({ subject: 'Please enter a subject' });
      setIsLoading(false);
    } else {
      setFormErrors({});
      try {
        const formData = new FormData();
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('text', text);

        const response = await axios.post(
          'http://localhost:3000/manager/sendEmail',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Backend Response:", response);

        if (response.data === "Invalid product") {
          setError('Product is invalid');
        } else {
          setSuccessMessage('Email sent successfully!');
          setTo('');
          setSubject('');
          setText('');
          setTimeout(() => {
            setSuccessMessage('');
            router.push('/SendEmail');
          }, 2000);
        }
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Send Email</h2>
      {successMessage && <p className="text-green-500 text-lg font-bold">{successMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label htmlFor="product" className="block text-sm font-semibold text-gray-600 mb-1">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={to}
            onChange={handleToChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formErrors.to ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.to && (
            <p className="text-red-500 text-sm mt-1">{formErrors.to}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={handleSubjectChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formErrors.subject ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.subject && (
            <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
            Text:
          </label>
          <textarea
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={handleTextChange}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              formErrors.text ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {formErrors.text && (
            <p className="text-red-500 text-sm mt-1">{formErrors.text}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white align-middle px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ${isLoading ? 'cursor-wait' : ''}`}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  </div>
  );
};

export default SendEmail;
