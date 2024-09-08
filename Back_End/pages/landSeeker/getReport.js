// getReport.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const GetReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jsonData, setJsonData] = useState(null);


  const landSeekerIdFromCookies = Cookies.get('userId');
  const landSeekerId = landSeekerIdFromCookies;


  useEffect(() => {
    fetchReports();
    fetchData();
  }, [landSeekerId]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/getReports`,
        {
          withCredentials: true,
        }
      );
      const fetchedReports = response.data;

      setReports(fetchedReports);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching reports.');
      setLoading(false);
    }
  };




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

  return (
    <div className="flex">
      {jsonData && (
        <div className="flex-1/2 bg-gray-100 p-8">
          <div className="w-48 h-48 bg-white rounded-md mb-4 overflow-hidden">
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
      )}

      <div className="flex-2/3 p-8">
        <h1 className="font-semibold mb-4">All Reports</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : reports.length > 0 ? (
          <ul>
            {reports.map((report) => (
              <li key={report.id} className="mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Title:</label>
                  <p className="text-lg">{report.rep_name}</p>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Details:</label>
                  <p className="text-lg">{report.rep_reports}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports found</p>
        )}
      </div>
    </div>
  );
};
export default GetReports;
