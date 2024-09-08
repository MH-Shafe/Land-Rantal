import Link from 'next/link';
import Image from 'next/image';
import 'typeface-lobster';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';


const Navbar = () => {

  

  const landSeekerIdFromCookies = Cookies.get('userId');
  const landSeekerId = landSeekerIdFromCookies;

  const hasCookies = Cookies.get('session'); // Replace 'yourCookieName' with the actual name of your cookie
  const router = useRouter();

  const handleSignOut = async () => {
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
  };

  const handleProfile = () => {
    const landSeekerIdFromCookies = Cookies.get('landSeekerId');

      // Handle the case when the cookie is not set
    
      console.log('landSeekerId:', landSeekerIdFromCookies); // Log landSeekerId

      router.push(`/landSeeker/landSeekerProfile/${landSeekerId}`);

    
  };
  
  
  return (
    <div className="bg-white text-[#006266] p-6 text-sm font-Poppins">
      <div className="container mx-auto flex items-center justify-center">
        <div className="mr-6 text-center flex ml-10">
          <div className="flex items-center">
            <div className="">
              <Image
                src="/Assets/logo.png"
                alt="Manager"
                className="w-12 h-12 mt-2"
                width={500}
                height={500}
              />
            </div>
            <div>
              <h4 className="text-2xl font-bold font-lobster">NatureLease</h4>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <ul className="flex justify-center font-semibold text-xl cursor-pointer">
            <li className="mr-4">
              <Link href="/">Home</Link>
            </li>
            <li className="mr-4">
              <Link href="/About">About</Link>
            </li>
            <li className="mr-4">
              <Link href="/Contact">Contact</Link>
            </li>
            <li className="mr-4">
              <Link href="/Shop">Shop</Link>
            </li>
            <li className="mr-4">
              <Link href="/Service">Service</Link>
            </li>
            <li className="mr-4">
              <Link href="/News">News</Link>
            </li>
          </ul>
        </div>
        <div className="text-center flex mr-10">
          <input
            type="text"
            placeholder="Search here"
            className="text-red border border-solid border-green-600 rounded-full mr-4 text-center"
          />
          <ul>
            {hasCookies ? (
              <>
                <li className="text-[#006266] text-lg font-Poppins font-bold"onClick={handleProfile}>
                  Profile
                </li>
                <li
                  className="text-[#006266] text-lg font-Poppins font-bold" onClick={handleSignOut}>
                  <a>Sign out</a>
                </li>
              </>
            ) : (
              <>
                <li className="mr-4">
                  <Link href="/landSeeker/Signup">Sign Up</Link>
                </li>
                <li className="mr-4">
                  <Link href="/landSeeker/login">Sign In</Link>
                </li>
              </>

            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
