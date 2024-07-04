import {
    Box,
    IconButton,
    Image,
    Flex,
    Icon,
    HStack,
    Text,
  } from "@chakra-ui/react";
  const BlogCard = ({ data, language }) => {
    function formatDate(dateString) {
      const date = new Date(dateString);
      
      const day = date.getUTCDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getUTCFullYear();
    
      const daySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };
    
      return `${day}${daySuffix(day)} ${month} ${year}`;
    }
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
          cursor={'pointer'}
        >
          <Flex direction="column" m={"1px auto"}>
            <Image
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
                {formatDate(data.publishedDate)}
              </Text>
              <Text color="#999999" fontSize={"0.8rem"}>
                {data.duration}
              </Text>
            </Flex>
            <Text fontSize="1.2rem">{language === 'en' ? data.name : data.name_hin}</Text>
            <Text color="#666666">{language === 'en' ? data.shortDescription : data.shortDescription_hin}</Text>
          </Flex>
        </Box>
      </>
    );
  };
  
  export default BlogCard;
  