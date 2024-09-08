import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const AddProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState('');
  const [product_price, setProduct_price] = useState('');
  const [product_description, setProduct_description] = useState('');
  const [product_picture, setProduct_picture] = useState(null);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProduct_price(e.target.value);
  };

  const handleDesctiptionChange = (e) => {
    setProduct_description(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setProduct_picture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) {
      setFormErrors({ product: 'Please enter product name' });
    } else if(!product_price){
      setFormErrors({ product_price: 'Please enter product price' });
    } else {
      setFormErrors({});

      try {
        const formData = new FormData();
        formData.append('name', product);
        formData.append('price', product_price);
        formData.append('description', product_description);
        formData.append('picture', product_picture);

        const response = await axios.post(
          'http://localhost:3000/manager/addProduct',
          formData,
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
          router.push('/ManagerDashboard');
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
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-1">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">ADD PRODUCT</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-2">
            <label htmlFor="product" className="block text-sm font-semibold text-gray-600 mb-1">
              Product Name:
            </label>
            <input
              type="text"
              id="product"
              name="product"
              value={product}
              onChange={handleProductChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.product ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.product && (
              <p className="text-red-500 text-sm mt-1">{formErrors.product}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
              Product Price:
            </label>
            <input
              type="text"
              id="product_price"
              name="product_price"
              value={product_price}
              onChange={handlePriceChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.product_price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.product_price && (
              <p className="text-red-500 text-sm mt-1">{formErrors.product_price}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
              Product Desctiption:
            </label>
            <input
              type="text"
              id="product_description"
              name="product_description"
              value={product_description}
              onChange={handleDesctiptionChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.product_description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.product_description && (
              <p className="text-red-500 text-sm mt-1">{formErrors.product_description}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
              Product Picture:
            </label>
            <input
  type="file"
  id="product_picture"
  name="product_picture"
  onChange={handlePictureChange}
  className={`w-full p-3 border rounded-md focus:outline-none ${
    formErrors.product_picture ? "border-red-500" : "border-gray-300"
  }`}
/>
            {formErrors.product_picture && (
              <p className="text-red-500 text-sm mt-1">{formErrors.product_picture}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white align-middle px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            ADD
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
