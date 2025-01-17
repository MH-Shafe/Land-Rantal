import Head from 'next/head';

export default function Header(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" type="image/png" href="download.peg"/>
      </Head>
    </>
  );
}
