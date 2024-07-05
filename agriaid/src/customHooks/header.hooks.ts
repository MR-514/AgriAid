import { useQuery, gql } from "@apollo/client";

const GET_CONTENT = gql`
  query {
    headerCollection(limit: 1) {
      items {
        title
        logo {
          headername_en: name(locale: "en-US")
          headername_hin: name(locale: "hi")
          altText_en: altText(locale: "en-US")
          altText_hin: altText(locale: "hi")
          image
        }
        headerComponentsCollection(limit: 6) {
          items {
            ... on BlogSection {
              blogname_en: name(locale: "en-US")
              blogname_hin: name(locale: "hi")
              blogCategoriesCollection(limit: 2) {
                items {
                  blogcategoryname_en: name(locale: "en-US")
                  blogcategoryname_hin: name(locale: "hi")
                  link
                }
              }
            }
            ... on Microcopy {
              microcopyname_en: name(locale: "en-US")
              microcopyname_hin: name(locale: "hi")
            }
          }
        }
      }
    }
  }
`;

export const useHeader = () => {
    const {  loading, error, data } = useQuery(GET_CONTENT);

  return {
    loading,
    error,
    data
  };
};
