// ManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';


const ManagerDashboard = () => {
    const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products when the component mounts
    GetProducts();
  }, []);

  const GetProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:7000/manager/getAllProduct',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
       console.log(response.data)
       console.log(response.success)
      if (response.data.success) {
        console.log('Products:', response.data);
        console.log(response.data.data);
        setAllProducts(response.data.data);
      } else {
        console.log('No products available');
        setError('No products available');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };

  const handleEditClick = (product) => {

    router.push({
        pathname: '/EditProduct',
        query: {
          productId: product.productId,
          name: product.name,
          price: product.price,
          descripton: product.description,
        },
      });
      
  };

  const handleDeleteClick = async (productId) => {
    console.log(`Delete clicked for product with ID: ${productId}`);
    try {
      const respons = await axios.delete(`http://localhost:7000/manager/deleteProduct/${productId}`);

      GetProducts();
      if (respons.data.success) {
        console.log('Product deleted successfully');
        
        // Update the UI state to remove the deleted product
        setAllProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
      } else {
        
        console.log('Failed to delete product');
        
        setError('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      setError(`An error occurred while deleting the product: ${error.message}`);
    }
  };
  
  return (
    <div className="bg-gray-800 text-white min-h-screen py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Manager Dashboard</h2>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border rounded-md">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2">Product Name</th>
                <th className="py-2">Product Price</th>
                <th className="py-2">Product Description</th>
                <th className="py-2">Product picture</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-center">
  {allProducts.length > 0 ? (
    allProducts.map((product) => (
      <tr key={product.productId}>
        <td className="py-2">{product.name}</td>
        <td className="py-2">${product.price}</td>
        <td className="py-2">${product.description}</td>
        <td className="py-2">
          {/* Dynamically generate the image URL */}
          <img
            src={`http://localhost:7000/manager/getproductimage/${product.picture}`}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-sm ml-32"
          />
        </td>
        <td className="py-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 cursor-pointer mr-2"
            onClick={() => handleEditClick(product)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover.bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 cursor-pointer"
            onClick={() => handleDeleteClick(product.productId)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">{error || 'No products available'}</td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        <div className="flex space-x-4 justify-center mt-5">
          {/* Add Product */}
          <Link href="/AddProduct">
            <div className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-300 cursor-pointer">
              Add Product
            </div>
          </Link>

         
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
