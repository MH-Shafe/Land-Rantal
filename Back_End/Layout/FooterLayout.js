// components/FooterLayout.js

import React from 'react';

import Footer from '@/Components/Footer/Footer';

const FooterLayout = ({ children }) => {
  return (
    <div >
 
      <div >{children}</div>
      <Footer />
    </div>
  );
};

export default FooterLayout;
