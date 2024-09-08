// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ProfileInformation from './landSeekerProfile/ProfileInformation';
import ButtonsSection from './buttonsSection';

const Dashboard = () => {
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
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (path) => {
    router.push(`/landSeeker/${path}`);
  };
  const handleProductClick = (path) => {
    router.push(`/${path}`);
  };


  return (
    <div className="flex h-screen">
      {jsonData && <ProfileInformation jsonData={jsonData} />}
      <ButtonsSection
        handleClick={(path) => router.push(`/landSeeker/${path}`)}
        handleProductClick={(path) => router.push(`/${path}`)}
      />
    </div>
  );
};

export default Dashboard;
