import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditLandPost = () => {
    const router = useRouter();
    const { landid, landname, price } = router.query;
    const [name, setname] = useState(landname || '');
    const [landprice, setlandprice] = useState(price || '');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    

    useEffect(() => {
      const fetchLandDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/manager/single/${landid}`);
          if (response.data) {
            const landDetails = response.data.data;
            setname(landDetails.landname);
            setlandprice(landDetails.price);
          } else {
            setError('Failed to fetch land details');
          }
        } catch (error) {
          console.error('Error fetching land details:', error);
          setError('Failed to fetch land details');
        }
      };
    
      fetchLandDetails();
    }, [landid]);
  
    const handleNameChange = (e) => {
      setname(e.target.value);
    };
  
    const handlePriceChange = (e) => {
      setlandprice(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!name || !landprice) {
        setError('Please enter both land name and price');
      } else {
        try {
          const response = await axios.put(
            `http://localhost:3000/manager/updateland/${landid}`,
            {
              landname: name,
              price: landprice,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (response.data.success) {
            console.log('Land updated successfully');
            router.push('/ManagerDashboard');
          } else {
            setError('Failed to update land');
          }
        } catch (error) {
          console.error('Update failed:', error);
          setError(`An error occurred while updating the land: ${error.message}`);
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
              Land Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="product_price" className="block text-sm font-semibold text-gray-600 mb-1">
              Land Price:
            </label>
            <input
              type="text"
              id="landprice"
              name="landprice"
              value={landprice}
              onChange={handlePriceChange}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                formErrors.landprice ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.landprice && (
              <p className="text-red-500 text-sm mt-1">{formErrors.landprice}</p>
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

export default EditLandPost;
