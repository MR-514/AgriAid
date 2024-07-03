import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { GiSellCard } from "react-icons/gi";

const SubBanner = ({data, language}) => {
  return (
    <>
      <Box width="100%" maxWidth="100%" height="500px" bg="#f2ffe999">
        <Flex height="100%" alignItems="center" justifyContent="space-between">
          <Image src={data.displayImage[0].url} alt="test_img" height="80%" m={"5% auto"} />
          
          <Flex gap={'20px'}>
            <GiSellCard fontSize="50px" />
            <Flex
              direction="column"
              alignItems="start"
              justifyContent={"center"}
            >
              <Flex alignItems="center" gap="15px">
                <Text fontSize="2rem">{ language === 'en' ? data.header : data.header_hi}</Text>
              </Flex>
              <Text fontSize="1.1rem" width="70%">
                {/* {data.subheader} */}
                { language === 'en' ? data.subheader : data.subheader_hi}
              </Text>
              <Button
                pl="0px"
                w="150px"
                bg="red"
                p="10px"
                color="white"
                border={'none'}
                borderRadius="5px"
                mt="10px"
                _hover={{ bg: "#DC143C" }}
                cursor={'pointer'}
              >
                {/* {data.microcopy.name} */}
                { language === 'en' ? data.microcopy.name : data.microcopy.name_hi}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default SubBanner;
