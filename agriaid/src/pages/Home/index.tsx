import Header from "../Header/header";
import useHomePage from "./home.hooks";
import HeroBanner from "./HeroBanner/heroBanner";
import SubBanner from "./SubBanner/subBanner";
import BlogBanner from "./BlogBanner/blogBanner";
import Footer from "../Footer/footer";
import { useState } from "react";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { FaLanguage } from "react-icons/fa";

const Landingpage = () => {
  const { loading, error, data } = useHomePage();
//   console.log(data);
  const [language, setLanguage] = useState("en");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
        <Header />
        <Flex justifyContent={'end'}>
            <Button
            pl="0px"
            w="150px"
            bg="red"
            p="5px"
            color="white"
            border={"none"}
            borderRadius="5px"
            cursor={"pointer"}
            mt="10px"
            _hover={{ bg: "#DC143C" }}
            onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
            m={"10px"}
            >
            <HStack spacing="5px">
                <Text>
                {language === "en" ? "Read in Hindi" : "Read in English"}
                </Text>
                <FaLanguage fontSize={"30px"} />
            </HStack>
            </Button>
        </Flex>
        <HeroBanner
            images={
            data?.landingPageCollection.items[0].heroBannersCollection.items
            }
            language={language}
        />
        <SubBanner
            data={data?.landingPageCollection.items[0].marketplacePreview}
            language={language}
        />
        <BlogBanner
            blogStories={data?.landingPageCollection.items[0].blogsPreview}
            language={language}
        />
        <Footer />
    </>
  );
};

export default Landingpage;
