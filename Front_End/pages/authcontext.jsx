import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const storedUser = cookies.get('user'); // Change this line
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, cookie) => {
    const userObject = { email, cookie };
    setUser(userObject);

    // Store user information in cookies
    cookies.set('user', userObject); // Change this line
    console.log("login" + email);
  };

  const checkUser = () => {
    return user && user.email != null && user.cookie != null;
  };

  const logout = () => {
    // Remove the user information from cookies on logout
    cookies.remove('user'); // Change this line
    doSignOut();
  };


  async function doSignOut() {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/signout/',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );
      console.log(response);
      setUser(null);
      document.cookie = null;
      router.push('/loginform');
    } catch (error) {
      console.error('error failed: ', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
