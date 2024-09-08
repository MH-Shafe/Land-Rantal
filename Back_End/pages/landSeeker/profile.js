import Link from "next/link";
import dynamic from 'next/dynamic'
import NaveBar from "../components.js/navbar";

const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})


export default function Profile( ) {

 
  return (
    <>

    <Title page="Profile"> </Title>
  <Layout>
    <NaveBar/>

<Link  className="link link-primary" href="allLandseekers">ALL LandSeekers</Link>
<br/>

 <br/>

</Layout>
  
    </>
  )
}