import { useQuery, gql } from "@apollo/client";

const GET_CONTENT = gql`
  query {
    blogCollection{
      items {
        name(locale: "en-US")
        name_hin: name(locale: "hi")
        shortDescription(locale: "en-US")
        shortDescription_hin: shortDescription(locale: "hi")
        publishedDate
        publishedDate_hin:publishedDate(locale:"hi")
        duration(locale: "en-US")
        duration_hin:duration(locale: "hi")
        longDescription(locale: "en-US") {
          json
        }
        longDescription_hin: longDescription(locale: "hi") {
          json
        }
        blog_images: imagesCollection {
          items {
            name(locale: "en-US")
            name_hin: name(locale: "en-US")
            altText(locale: "hi")
            altText_hin: altText(locale: "hi")
            image
          }
        }
        author {
          name
          email
          image
        }
        microcopy {
          name(locale: "en-US")
          name_hin: name(locale: "hi")
        }
      }
    }
  }
`;

const useBlog = () => {
  const { loading, error, data } = useQuery(GET_CONTENT);

  return {
    loading,
    error,
    data
  };
};

export default useBlog;
