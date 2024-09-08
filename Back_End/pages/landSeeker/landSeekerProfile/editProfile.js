import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
  });

  const [error, setError] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [loadingSave, setSaveLoading] = useState(false); // Added loading state
  const [loadingDelete, setDeleteLoading] = useState(false); // Added loading state
  const router = useRouter();

  const landSeekerIdFromCookies = Cookies.get('userId');
  const landSeekerId = landSeekerIdFromCookies;

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the limit (5MB)');
    } else {
      setFormData({
        profilePicture: selectedFile,
      });
      setError('');
    }
  };

  const handleEditProfile = async () => {
    try {
      setSaveLoading(true);
  
      if (!formData.profilePicture) {
        setError('Profile picture is required');
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('profilepic', formData.profilePicture);
  
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/addProfilePicture/${landSeekerId}`,
          formDataToSend,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        setError('Profile picture updated successfully!');
        // Fetch the updated data after the update
        fetchData();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setSaveLoading(false);
    }finally {
      // Add a delay of 2 seconds (adjust as needed)
      setTimeout(() => {
        setSaveLoading(false);
      }, 2000);
    }
  };
  
  const handleDeletePicture = async () => {
    try {
      setDeleteLoading(true);
  
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/deleteProfilePic/${landSeekerId}`,
        {
          withCredentials: true,
        }
      );
  
      setError('Profile picture deleted successfully!');
      // Fetch the updated data after the deletion
      fetchData();
    } catch (error) {
      console.error('An error occurred:', error);
      setDeleteLoading(false);
    }finally {
      // Add a delay of 2 seconds (adjust as needed)
      setTimeout(() => {
        setDeleteLoading(false);
      }, 2000);
    }
  };
  

  const handleClick = (path) => {
    router.push(`/landSeeker/${path}`);
  };

  const handleSaveChanges = () => {
    handleEditProfile();
    handleClick('landSeekerProfile/editProfile');
  };

  const handleDeleteProfilePicture = () => {
    handleDeletePicture();
    handleClick('landSeekerProfile/editProfile');
  };

  useEffect(() => {
    fetchData();
  }, [landSeekerId]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/search/${landSeekerId}`,
        {
          withCredentials: true,
        }
      );
      const jsonData = response.data;
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form>
            {jsonData ? (
              <div className="w-48 h-48 bg-white rounded-md mb-4 overflow-hidden">
                {jsonData.filename ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/profilepic/?id=${jsonData.landSeekerId}`}
                    alt="Profile Picture"
                    className="w-full rounded-md"
                  />
                ) : (
                  <p>No profile picture available</p>
                )}
              </div>
            ) : (
              <p>Loading profile picture...</p>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                name="profilePicture"
                onChange={handleProfilePictureChange}
                className="input input-bordered w-full bg-gray-100 text-gray-800 border-gray-300 focus:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex space-x-4">
              <button
                type="button"
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 rounded-full text-white w-full"
                onClick={handleSaveChanges}
              >
                {loadingSave ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn btn-primary bg-red-500 hover:bg-red-300 rounded-full text-white w-full"
                onClick={handleDeleteProfilePicture}
              >
                {loadingDelete ? 'Deleting...' : 'Delete Image'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
