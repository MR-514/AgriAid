// src/app/pages/Blog/index.tsx
"use client";
import {
  Container,
  Text,
  Divider,
  Box,
  Flex,
  SimpleGrid,
  Switch,
  Button,
  HStack,
} from "@chakra-ui/react";
import Header from "../Header/header";
import BlogCard from "./blogCard";
import Footer from "../Footer/footer";
import { useEffect, useState } from "react";
import useBlog from "./blog.hooks";
import { FaLanguage } from "react-icons/fa";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Educational");
  const [language, setLanguage] = useState("en");

  const { loading, error, data } = useBlog();
  // console.log(data?.blogCollection.items[0].longDescription);

  const educationalData = [
    {
      img: "https://blog.agribazaar.com/wp-content/uploads/2023/06/agriculture-iot-with-rice-field-background-2-1.jpg",
      date: "JUNE 10, 2024",
      duration: "1 MIN READ",
      heading:
        "How is modern farming technology in india improving farmers' lives?",
    },
    {
      img: "https://blog.agribazaar.com/wp-content/uploads/2024/05/2.jpg",
      date: "MAY 9, 2024",
      duration: "3 MIN READ",
      heading:
        "Digital approach to Revolutionise Indian Agricultural Supply Chain!",
    },
    {
      img: "https://blog.agribazaar.com/wp-content/uploads/2024/04/2.jpg",
      date: "April 22, 2024",
      duration: "3 MIN READ",
      heading: "Enhancing Indian Agricultural Resilience with NICRA",
    },
    {
      img: "https://blog.agribazaar.com/wp-content/uploads/2024/03/Smart-farm-precision-farming-concept.-Use-drone-for-various-fields-like-research-analysis-terrain-scan-technology-monitoring-soil-hydration-yield-problem.jpeg",
      date: "March 26, 2024",
      duration: "4 MIN READ",
      heading: "Introducing Agribhumi to unlock the potential of your farm!",
    },
  ];

  const diseasesData = [
    {
      img: "https://blog.agribazaar.com/wp-content/uploads/2024/02/Urban-Farm-Growing-vegetables-on-roof-of-urban-building.jpg",
      date: "February 29, 2024",
      duration: "3 MIN READ",
      heading: "Cultivating Indian Food Security with Urban Farming",
    },
  ];

  function hasDiseases(text) {
    const lowercaseText = text.toLowerCase();
    return lowercaseText.includes("diseases");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* <Header /> */}
      <Container
        w={"90%"}
        alignItems={"center"}
        justifyContent={"center"}
        m={"50px auto"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={"20px"}>
            <Text
              cursor={"pointer"}
              onClick={() => setSelectedCategory("Educational")}
              color={selectedCategory === "Educational" ? "black" : "#999999"}
              textDecoration={
                selectedCategory === "Educational" ? "underline" : "none"
              }
            >
              Educational
            </Text>
            <Text
              cursor={"pointer"}
              onClick={() => setSelectedCategory("Diseases")}
              color={selectedCategory === "Diseases" ? "black" : "#999999"}
              textDecoration={
                selectedCategory === "Diseases" ? "underline" : "none"
              }
            >
              Diseases
            </Text>
          </Flex>
          <Button
            pl="0px"
            w="150px"
            bg="red"
            p="5px"
            color="white"
            border={"none"}
            borderRadius="5px"
            cursor={'pointer'}
            mt="10px"
            _hover={{ bg: "#DC143C" }}
            onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
          >
            <HStack spacing="5px">
              {" "}
              {/* Adjust spacing as needed */}
              <Text>{language === "en" ? "Read in Hindi" : "Read in English"}</Text>
              <FaLanguage fontSize={"30px"} />
            </HStack>
          </Button>
        </Flex>
        <Text fontSize={"3.5rem"}>AgriTech Stories</Text>
        <Text w={"50%"} color={"#999999"} fontSize={"1.5rem"}>
          Get all the latest updates on AgriTech and innovations in agriculture.
        </Text>
        <Box
          borderBottom="0.5px solid #999999"
          w="full"
          mt={"30px"}
          mb={"20px"}
        />
        {/* <SimpleGrid columns={"3"} spacingY={"20px"} spacingX={"10px"}>
          {selectedCategory === "Educational"
            ? educationalData.map((data, index) => (
                <BlogCard key={index} data={data} />
              ))
            : diseasesData.map((data, index) => (
                <BlogCard key={index} data={data} />
              ))}
        </SimpleGrid> */}
        <SimpleGrid columns={3} spacingY={"20px"} spacingX={"10px"}>
          {selectedCategory === "Diseases"
            ? data?.blogCollection.items.map(
                (data, index) =>
                  hasDiseases(data.name) === true && (
                    <BlogCard key={index} data={data} language={language} index={index}/>
                  )
              )
            : data?.blogCollection.items.map(
                (data, index) =>
                  hasDiseases(data.name) === false && (
                    <BlogCard key={index} data={data} language={language} index={index}/>
                  )
              )}
        </SimpleGrid>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Blog;

// hasDiseases(data.name)
