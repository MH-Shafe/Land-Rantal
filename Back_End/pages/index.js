import { Inter } from 'next/font/google'
import Display from '../Components/Display/Display'
import About from './About'
import Contact from './Contact'
import Youtube from '../Components/Practice/Youtube'
import Discount from '../Components/Discount/Discount'
import Shop from './Shop'
import ShopContextProvider from './shop-context'
import Service from './Service'
import News from './News'
import ShowLandPost from './ShowLandPost'
// import Chat from './Chat'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    
    <div>
      {/* <Chat /> */}
    <Display />
    <Discount />
    <ShowLandPost />
    <Shop />
    <About />
    <Service />

    <Contact />
    <News />
    
    {/* <Youtube /> */}
    </div>
    
   
  );
};
    {/* <Youtube /> */}

 