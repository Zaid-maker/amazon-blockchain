import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

const styles = {
  container: 'h-full w-full flex bg-[#fff]',
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amazon Blockchain App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <Main />
    </div>
  )
}
