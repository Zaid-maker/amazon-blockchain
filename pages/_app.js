import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { AmazonProvider } from "../context/AmazonContext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="hWKs6uoexB2oa1i2dyd39PpEMGPKcPv4n4QJtxIN"
      serverUrl="https://t1zjikvshoiq.usemoralis.com:2053/server"
    >
      <AmazonProvider>
        <Component {...pageProps} />
      </AmazonProvider>
    </MoralisProvider>
  );
}

export default MyApp;
