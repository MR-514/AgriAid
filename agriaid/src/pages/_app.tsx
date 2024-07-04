import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "../../styles/global.css";
import Header from "./Header/header";
import Footer from "./Footer/footer";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return(
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </ApolloProvider>
  )
}
