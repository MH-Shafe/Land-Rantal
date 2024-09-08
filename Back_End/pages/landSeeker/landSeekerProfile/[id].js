import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import dynamic from 'next/dynamic';



const handleClick = (landSeekerId, router) => {
  // Set a cookie with the user ID
  Cookies.set('userId', landSeekerId, { expires: 365, path: '/' });

  // Navigate to the edit profile page
  router.push(`/landSeeker/landSeekerProfile/editProfile`);
};




export default function AllLandSeekers() {
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();

  // Extract landSeekerId from the router query or from cookies
  const landSeekerIdFromQuery = router.query.id;
  const landSeekerIdFromCookies = Cookies.get('userId');
  const landSeekerId = landSeekerIdFromQuery || landSeekerIdFromCookies;

  useEffect(() => {
    fetchData();
  }, [landSeekerId]);

  async function fetchData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/search/${landSeekerId}`, {
        withCredentials: true,
      });
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDashboardClick = () => {
    router.push('/landSeeker/dashboard');
  };
  
  const printObject = (jsonData) => {
    return (
      <div>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            {jsonData ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Profile Picture:</label>
                  {jsonData.filename ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/profilepic/?id=${jsonData.landSeekerId}`}
                      alt="Profile Picture"
                      className="w-full rounded-md"
                    />
                  ) : (
                    <p>No profile picture available</p>
                    // You can also display a placeholder image here
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Name:</label>
                  <p className="text-lg">{jsonData.name}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">UserName:</label>
                  <p className="text-lg">{jsonData.username}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Address:</label>
                  <p className="text-lg">{jsonData.address}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  onClick={() => handleClick(jsonData.landSeekerId, router)}
                >
                  Edit Profile Picture
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>

              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return <>{jsonData != null && printObject(jsonData)}</>;
}
