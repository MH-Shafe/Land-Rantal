import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProduct = () => {
  const router = useRouter();
  const { productId, name, price } = router.query;
  const [product, setProduct] = useState(name || '');
  const [product_price, setProduct_price] = useState(price || '');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/manager/getProduct/${productId}`);

        if (response.data.success) {
          const productDetails = response.data.data;
          setProduct(productDetails.name);
          setProduct_price(productDetails.price);
        } else {
          setError('Failed to fetch product details');
        }
      } catch (error) {
        
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProduct_price(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product || !product_price) {
      setError('Please enter both product name and price');
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3000/manager/updateProduct/${productId}`,
          {
            name: product,
            price: product_price,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          console.log('Product updated successfully');
         
        } else {
            router.push('/ManagerDashboard');
          setError('Failed to update product');
        }
      } catch (error) {
        console.error('Update failed:', error);
        setError(`An error occurred while updating the product: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">EDIT PRODUCT</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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
                formErrors.product ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.product && <p className="text-red-500 text-sm mt-1">{formErrors.product}</p>}
          </div>
          <div className="mb-6">
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
                formErrors.product_price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.product_price && (
              <p className="text-red-500 text-sm mt-1">{formErrors.product_price}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white align-middle px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            EDIT
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default EditProduct;
