// ProfileInformation.jsx
import React from 'react';

const ProfileInformation = ({ jsonData }) => {
  return (
    <div className="flex-1 bg-gray-100 p-8">
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
      <div>
        <div className="mb-2">
          <p className="text-lg font-semibold text-gray-800">Profile Information</p>
        </div>
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-600">Name:</p>
          <p className="text-gray-800">{jsonData.name}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-600">Username:</p>
          <p className="text-gray-800">{jsonData.username}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-600">Address:</p>
          <p className="text-gray-800">{jsonData.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
