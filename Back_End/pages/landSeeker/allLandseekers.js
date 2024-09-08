// AllLandSeekers.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from './components.js/header';

export default function AllLandSeekers() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/landSeekers/index', {
        withCredentials: true,
      });
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const printArray = (jsonData) => {
    return jsonData.map((item, index) => {
      return (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
          <Link href={'landSeekerProfile/' + item.landSeekerId}>
            <h3 className="text-ellipsis text-cyan-700 cursor-pointer hover:text-cyan-500">
              {item.landSeekerId}
            </h3>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <Header title="ALL LandSeekers" />

      <div className="max-w-2xl mx-auto mt-8">
        <p className="text-lg font-bold mb-4">All LandSeekers Data listed below:</p>
        {jsonData != null && printArray(jsonData)}
      </div>
    </>
  );
}
