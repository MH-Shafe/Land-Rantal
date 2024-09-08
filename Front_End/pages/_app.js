import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Navbar from '../Components/Navbar/Navbar';
import "../pages/Shop/Shop.css"
import ShopContextProvider from './shop-context';
import { AuthProvider } from './authcontext';

import "./Cart/cart.css"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/Login';
  const isSignUpPage = router.pathname === '/Signup';
  const isManager = router.pathname === '/Manager';
  const isManagerDashboard = router.pathname === '/ManagerDashboard';


  return (
    <ShopContextProvider>
      {!isLoginPage && !isSignUpPage && !isManager && !isManagerDashboard && <Navbar />}

      <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
      
    </ShopContextProvider>
  );
}