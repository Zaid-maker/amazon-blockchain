import Head from 'next/head'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amazon Blockchain App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <Main />
    </div>
  )
}
