import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/bopdv1grl0yt",
  headers: {
    Authorization: `Bearer lBjSjdhAlZ1P1XpLYo4xLsOeT_YGsepfpwNmG8VXBrc`, 
  },
  cache: new InMemoryCache(),
});

export default client;
