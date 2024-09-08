// makeReport.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const MakeReport = () => {
    const [reportData, setReportData] = useState({
        rep_name: '',
        rep_reports: '', // Add any default value if needed
      });

      const [emailData, setEmailData] = useState({
        receiverEmail:'',
        subject: '',
        text: '',
    });

  const [jsonData, setJsonData] = useState(null);
  

  const router = useRouter();

 const handleChange = (e) => {
    setReportData({
        ...reportData,
        [e.target.name]: e.target.value,
    });
    setEmailData({
        ...emailData,
        [e.target.name]: e.target.value,
    });
};
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Ensure that rep_name and description are provided in the reportData
    const dataWithRepName = {
      ...reportData,
      rep_name: reportData.rep_name || 'Default Report Value',
      rep_reports: reportData.rep_reports || 'Default Description Value',
    };

    // Assuming you have an endpoint for creating a report
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/addReport`,
      dataWithRepName,
      {
        withCredentials: true,
      }
    );

    // Ensure that necessary properties are provided in the emailData
    const dataEmail = {
      ...emailData,
      receiverEmail: emailData.receiverEmail || 'Default Receiver Email',
      subject: emailData.rep_name || 'Default Subject',
      text: emailData.rep_reports || 'Default Text',
    };

    // Assuming you have an endpoint for sending an email
    const responseEmail = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/sendMail`,
      dataEmail,
      {
        withCredentials: true,
      }
    );

    // Redirect to the dashboard after successfully making a report
    router.push('/landSeeker/makeReport');
  } catch (error) {
    console.error(error);
  }
};

  
  
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
 
  return (
    <div className="flex h-screen">
      {jsonData && (
        <div className="flex-2/3 bg-gray-100 p-8">
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

      <div className="flex-1 p-8">
        <h1 className="font-semibold mb-4">Make Report</h1>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for report data */}
          {/* For example: */}
          <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">Email:</label>
                <input
                type="email"
                name="receiverEmail"
                value={reportData.receiverEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                />
            </div>

          <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">Title:</label>
                <input
                type="text"
                name="rep_name"
                value={reportData.rep_name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Textarea for Description */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">Description:</label>
                <textarea
                name="rep_reports"
                value={reportData.rep_reports}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                ></textarea>
            </div>

          {/* Add other form fields as needed */}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeReport;
