import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        // Remove the cookie
        Cookies.remove('session'); // Replace 'yourCookieName' with the actual name of your cookie

        // Make an asynchronous POST request to the specified API endpoint for logging out
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/landseekers/logout/`,
          {},
          { withCredentials: true }
        );

        // Redirect to the home page after signing out
        router.push('/');
      } catch (error) {
        console.error('An error occurred during logout:', error);
        // Redirect to the home page even if an error occurs during logout
        router.push('/');
      }
    };

    // Call the handleSignOut function when the component mounts
    handleSignOut();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      {/* You can optionally display a loading spinner or a message during the logout process */}
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
