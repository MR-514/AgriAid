import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaYoutube, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const primaryColor = "rgb(139, 195, 74)";
  const hoverColor = "rgb(111, 156, 59)";
  const textColor = "rgb(100, 100, 100)";

  return (
    <>
      <Box
        bg={"#4165b3"}
        height={{ base: "auto", md: "200" }}
        w={"100%"}
        p={"30px"}
      >
        <Flex gap={"100px"}>
          <Box>
            <Flex direction={"column"}>
              <Text color={"white"} fontSize={"1.1rem"}>
                Contact us now
              </Text>
              <Text color={"white"} fontSize={"0.8rem"}>
                +352 27 80 28 00
              </Text>
              <Text color={"white"} fontSize={"0.8rem"} mb={"10px"}>
                agrisystems@agriaid.in
              </Text>
              <Button
                pl="0px"
                w="120px"
                bg="red"
                p="10px"
                color="white"
                border={'none'}
                borderRadius="5px"
                mt="10px"
                _hover={{ bg: "#DC143C" }}
                fontSize={'0.8rem'}
                cursor={'pointer'}
              >
                CONTACT FORM
              </Button>
            </Flex>
          </Box>

          <Box>
            <Flex>
              <Box
                bg={"white"}
                w={"1px"}
                h={"67px"}
                mr={"15px"}
                visibility={{ base: "hidden", md: "visible" }}
              ></Box>
              <Flex direction={"column"} gap={'5px'}>
                <Text color={"white"}>Follow us</Text>
                <Flex gap={"10px"}>
                  <Box
                    w={"100"}
                    backgroundColor={"white"}
                    p={"5px"}
                    borderRadius={"50%"}
                    cursor={"pointer"}
                    _hover={{ backgroundColor: hoverColor }}
                    role="group"
                  >
                    <FaYoutube fontSize={"25px"} color="black" />
                  </Box>

                  <Box
                    w={"100"}
                    backgroundColor={"white"}
                    p={"5px"}
                    borderRadius={"50%"}
                    cursor={"pointer"}
                    _hover={{ backgroundColor: hoverColor }}
                  >
                    <FaLinkedinIn fontSize={"25px"} color="black" />
                  </Box>

                  <Box
                    w={"100"}
                    backgroundColor={"white"}
                    p={"5px"}
                    borderRadius={"50%"}
                    cursor={"pointer"}
                    _hover={{ backgroundColor: hoverColor }}
                  >
                    <FaFacebookF fontSize={"25px"} color="black" />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
