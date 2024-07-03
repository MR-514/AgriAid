import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import "../../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
