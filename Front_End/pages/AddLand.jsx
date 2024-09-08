import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

const AddLand = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    landname: '',
    description: '',
    location: '',
    size: '',
    price: '',
    picture: null, // Use null or an initial value that suits your needs
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is a file input
    const newValue = files ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdataInstance = new FormData();
      formdataInstance.append('landname', formData.landname);
      formdataInstance.append('description', formData.description);
      formdataInstance.append('location', formData.location);
      formdataInstance.append('size', formData.size);
      formdataInstance.append('price', formData.price);
      formdataInstance.append('picture', formData.picture);

      const response = await axios.post(
        'http://localhost:7000/manager/addland',
        formdataInstance,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Backend Response:", response);

      if (response.data === "Invalid product") {
        setError('Product is invalid');
      } else {
        router.push('/LandPost');
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
    }
  };

  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     picture: [...prevData.picture, ...files],
  //   }));
  // };

  // const handleRemoveImage = (index) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     picture: prevData.picture.filter((_, i) => i !== index),
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Form data submitted:', formData);
  // };



  // const renderFileInputs = () => {
  //   return formData.picture.map((file, index) => (
  //     <div key={index}>
  //       <input
  //         type="file"
  //         name={`image-${index}`}
  //         onChange={handleFileChange}
  //         className="w-full border rounded py-2 px-3 mb-2"
  //       />
  //       <button type="button" onClick={() => handleRemoveImage(index)}>
  //         Remove Image
  //       </button>
  //     </div>
  //   ));
  // };





  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded shadow-md">
      <label htmlFor="landname" className="block text-gray-700 text-sm font-bold mb-2">Land Name:</label>
      <input
        type="text"
        id="landname"
        name="landname"
        value={formData.landname}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      /><br />

      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      ></textarea><br />

      <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      /><br />

      <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">Size:</label>
      <input
        type="text"
        id="size"
        name="size"
        value={formData.size}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      /><br />

      <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      /><br />
        <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Images:</label>
        <input
        type="file"
        id="picture"
        name="picture"
        onChange={handleChange}
        className="w-full border rounded py-2 px-3 mb-2"
      />
      {/* {renderFileInputs()} */}
      {/* <button type="button" onClick={() => setFormData((prevData) => ({ ...prevData, picture: [...prevData.picture, null] }))}>
        Add Image
      </button> */}

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
};

export default AddLand;
