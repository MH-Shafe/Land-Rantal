// components/Layout.js

import Navbar from "../Components/Navbar/Navbar";
import Head from "next/head";


const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Land Rent</title>
      </Head>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
