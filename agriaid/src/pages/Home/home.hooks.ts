import { useQuery, gql } from "@apollo/client";

const GET_CONTENT = gql`
  query {
    landingPageCollection(limit: 1) {
      items {
        heroBannersCollection(limit: 4) {
          ... on LandingPageHeroBannersCollection {
            items {
              motto(locale: "en-US")
              motto_hi: motto(locale: "hi")
              heading: heading(locale: "en-US")
              heading_hi: heading(locale: "hi")
              subheading(locale: "en-US")
              subheading_hi: subheading(locale: "hi")
              backgroundImage {
                altText(locale: "en-US")
                altText_hi: altText(locale: "hi")
                image
              }
            }
          }
        }
        marketplacePreview {
          ...diaplayCardDetails
        }
        blogsPreview {
          blogReference {
            title
            ...diaplayCardDetails
          }
          blogsCollection {
            items {
              name(locale: "en-US")
              name_hi: name(locale: "hi")
              shortDescription(locale: "en-US")
              shortDescription_hi: shortDescription(locale: "hi")
              publishedDate
              publishedDate_hin:publishedDate(locale:"hi")
            }
          }
        }
        newsletter {
          title(locale: "en-US")
          title_hi: title(locale: "hi")
          header(locale: "en-US")
          header_hi: header(locale: "hi")
          offer(locale: "en-US")
          offer_hi: offer(locale: "hi")
          emailPlaceholder {
            name(locale: "en-US")
            name_hi: name(locale: "hi")
            description
          }
          ctaButton {
            name(locale: "en-US")
            name_hi: name(locale: "hi")
            description
          }
          noticeText(locale: "en-US")
          noticeText_hi: noticeText(locale: "hi")
        }
      }
    }
  }

  fragment diaplayCardDetails on DisplayCard {
    header(locale: "en-US")
    header_hi: header(locale: "hi")
    subheader(locale: "en-US")
    subheader_hi: subheader(locale: "hi")
    microcopy {
      name(locale: "en-US")
      name_hi: name(locale: "hi")
      description
    }
    displayImage
  }
`;

const useHomePage = () => {
  const {  loading, error, data } = useQuery(GET_CONTENT);

  return {
    loading,
    error,
    data,
  };
}

export default useHomePage;
