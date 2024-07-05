import {
  Box,
  IconButton,
  Image,
  Flex,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";

const BlogCard = ({ data, language, index }) => {
  return (
    <>
      <Box
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        mb="4"
        position="relative"
        padding={"15px"}
        border={"0.5px solid #E2E8F0"}
        _hover={{ "& .hoverImage": { transform: "scale(1.05)" } }}
        cursor={"pointer"}
      >
        <Flex direction="column" m={"1px auto"}>
          <Image
            alt="image"
            className="hoverImage"
            // src={data.img}
            src={data?.blog_images.items[0].image[0].url}
            w="100%"
            h="250px"
            mb="25px"
            objectFit="cover"
            transition="transform 0.3s ease"
          />
          <Flex mb="25px" gap={"7px"}>
            <Text fontWeight="bold" fontSize={"0.8rem"}>
              AGRITECH STORIES
            </Text>
            <Text color="#999999" mr="2" fontSize={"0.8rem"}>
              {/* {formatDate(data.publishedDate)} */}
              {language === "en" ? data.publishedDate : data.publishedDate_hin}
            </Text>
            <Text color="#999999" fontSize={"0.8rem"}>
              {language === "en" ? data.duration : data.duration_hin}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={"10px"} mb={"15px"}>
            <Image
              alt="image"
              src={data?.author.image[0].url}
              w="50px"
              h="50px"
              borderRadius={"50%"}
            />
            <Text>{data?.author.name}</Text>
          </Flex>
          <Text fontSize="1.2rem">
            {language === "en" ? data.name : data.name_hin}
          </Text>
          <Text color="#666666" mb={"20px"}>
            {language === "en"
              ? data.shortDescription
              : data.shortDescription_hin}
          </Text>
          {/* <Link href={`/blog/${index}`} passHref> */}
          <Flex
            alignItems={"center"}
            color={"red"}
            position={"absolute"}
            right={"15px"}
            bottom={"1px"}
            mb={"10px"}
          >
            <Text>Read more</Text>
            <FaAngleRight />
          </Flex>
          {/* </Link> */}
        </Flex>
      </Box>
    </>
  );
};

export default BlogCard;
