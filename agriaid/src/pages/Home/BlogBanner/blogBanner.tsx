import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import { format } from "path";

const BlogBanner = ({ blogStories, language }) => {
  // console.log(blogStories);

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
      <Box width="100%" maxWidth="100%" height="500px" bg="#E0FFFF" p={"20px"}>
        <Flex margin={'10px auto'}>
          <Box width={'50%'} pl={'20px'}>
            <Flex direction="column">
              <Text fontSize={"3rem"}>The Agriaid</Text>
              <Text
                fontSize={"3rem"}
                color={"red"}
                lineHeight={"35px"}
                mb={"10px"}
              >
                STORIES
              </Text>
              <Text width={"80%"} mb={"10px"}>
                {/* Read & explore our perspectives on agriculture & technology with
                the latest trends. Get all the current updates on innovations in
                agriculture. */}
                {/* {blogStories?.blogReference.header} */}
                { language === 'en' ?  blogStories?.blogReference.header : blogStories?.blogReference.header_hi}
              </Text>
              <Text fontWeight={"bold"} mb={"10px"}>
                Insights and trends from the agri-tech industry.
              </Text>
              <Button
                pl="0px"
                w="200px"
                bg="red"
                p="10px"
                color="white"
                border={'none'}
                borderRadius="5px"
                mt="10px"
                _hover={{ bg: "#DC143C" }}
                cursor={'pointer'}
              >
                {/* VIEW MORE */}
                {language === 'en' ? blogStories?.blogReference.microcopy.name : blogStories?.blogReference.microcopy.name_hi}
                {/* {blogStories?.blogReference.microcopy.name} */}
              </Button>
            </Flex>
          </Box>

          <Box width={'50%'}>
            <Flex>
              {/* blogStories.blogsCollection.items.map((stories, index)) */}
              {blogStories?.blogsCollection.items.map((stories, index) => (
                <Box key={index}>
                  <Flex direction={"column"}>
                    <Box w={"95%"} h={"70px"} bg={"#FBF4E9FF"} p={"10px"}>
                      <Text color={"red"} fontSize={"1.1rem"}>
                        {/* {stories.heading} */}
                        {language === 'en' ? stories.name : stories.name_hi}
                        {/* {stories.name} */}
                      </Text>
                    </Box>
                    <Box
                      w={"95%"}
                      h={"350px"}
                      bg={"#DFE6DB99"}
                      p={"10px"}
                      position={"relative"}
                    >
                      <Text color={"brown"}>
                        {/* {stories.desc} */}
                        {language === 'en' ? stories.shortDescription : stories.shortDescription_hi}
                        {/* {stories.shortDescription} */}
                      </Text>
                      <Text
                        color={"brown"}
                        fontSize={"1rem"}
                        fontWeight={"bold"}
                        position={"absolute"}
                        bottom={"10px"}
                        left={"10px"}
                      >
                        {/* {stories.date} */}
                        {/* {stories.publishedDate} */}
                        {formatDate(stories.publishedDate)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default BlogBanner;
