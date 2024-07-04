/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { useHeader } from "./header.hooks";

const Header: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [menuIcon, setMenuIcon] = useState(true);

  const {loading, error, data} = useHeader();
//   console.log(data.headerCollection.items[0].logo.image[0].url);

  const handleToggle = () => {
    onToggle();
    setMenuIcon(!menuIcon);
  };

  const [isDrawerOpen, setDrawer] = useState(false);

  const BORDER_COLOR = "rgb(139, 195, 74)";
  const GREY_COLOR = "rgb(180, 180, 180)";
  const LIGHT_GREY_COLOR = "rgb(150, 150, 150)";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="white"
      boxShadow="sm"
      width="100%"
      maxWidth={"100%"}
      borderBottom={`1px solid ${BORDER_COLOR}`}
      // p={"10px 10px 5px 10px"}
    >
      <Flex
        justifyContent={"space-between"}
        p={"10px"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex gap={"20px"}>
          <Box>
            <NextLink href={"/"} passHref>
              <Link
                p={0}
                fontSize={"sm"}
                width={"100px"}
                h="60px"
                fontWeight={500}
                display="block"
                pos="relative"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <NextImage
                  src={data?.headerCollection.items[0].logo.image[0].url}
                  alt="logo"
                  layout="fill"
                />
              </Link>
            </NextLink>
          </Box>

          <Flex as="nav" align="center">
          <Link
              href="/"
              mx="2"
              color={GREY_COLOR}
              fontSize="17px"
              _hover={{ color: BORDER_COLOR, textDecoration: "underline" }}
              textDecoration={"none"}
            >
              Home
            </Link>

            <FaGreaterThan color={LIGHT_GREY_COLOR} />
            <Link
              href="/products"
              mx="2"
              color={GREY_COLOR}
              fontSize="17px"
              _hover={{ color: BORDER_COLOR, textDecoration: "underline" }}
              textDecoration={"none"}
            >
              Shop
            </Link>
          </Flex>
        </Flex>

        <Flex align="center">
          <Input
            placeholder="Search for products"
            _focus={{
              outline: "none",
              borderBottom: `3px solid ${BORDER_COLOR}`,
            }}
            border={"none"}
            w={"300px"}
            maxW={"400px"}
            borderBottom={"1px solid black"}
            borderRadius={"none"}
            mr="-15px"
            pb={"5px"}
          />
          <Icon
            as={SearchIcon}
            _hover={{ cursor: "pointer", color: BORDER_COLOR }}
            pb={"1px"}
          />
        </Flex>

        <Flex gap={"100px"}>
          <Flex align={"center"}>
            <Flex
              _hover={{ color: BORDER_COLOR, textDecoration: "underline" }}
              align={"center"}
              gap={"5"}
            >
              <FaUser />
              <Link
                href="/login"
                mx="5"
                textDecoration={"none"}
                color={BORDER_COLOR}
                fontSize={"17px"}
              >
                Login
              </Link>
            </Flex>
            <Text mx="5">|</Text>
            <Link
              href="/register"
              mx="5"
              textDecoration={"none"}
              color={BORDER_COLOR}
              fontSize={"17px"}
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </Link>
          </Flex>

          <Flex align={"center"} gap={"25px"}>
            <Box pos={"relative"}>
              <IconButton
                onClick={() => setDrawer((prevState) => !prevState)}
                icon={<Icon as={RiShoppingBagLine} w={20} h={20} />}
                variant={"ghost"}
                aria-label={"Toggle basket"}
                border={"none"}
                bg={"transparent"}
                cursor={"pointer"}
              />
              {/* {checkoutItems.productQuantity > 0 && (
                <Box
                  position={'absolute'}
                  top={'0'}
                  right={'0'}
                  backgroundColor={'#e60958'}
                  width={'15px'}
                  height={'15px'}
                  borderRadius={'50%'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Text fontSize={'10px'} color={'white'} fontWeight={'bold'}>
                    {checkoutItems.productQuantity}
                  </Text>
                </Box>
              )} */}
            </Box>
            <Menu>
              <MenuButton
                as={Flex}
                align="center"
                _hover={{ cursor: "pointer", color: BORDER_COLOR }}
                onClick={handleToggle}
                gap={"8px"}
              >
                <Flex gap={"10px"}>
                  <Text fontSize={"17px"}>Menu</Text>
                  <IconButton
                    _hover={{ color: BORDER_COLOR }}
                    icon={
                      menuIcon ? (
                        <HamburgerIcon w={20} h={20} />
                      ) : (
                        <CloseIcon w={15} h={15} />
                      )
                    }
                    variant={"ghost"}
                    aria-label={"Toggle Navigation"}
                    border={"none"}
                    bg={"transparent"}
                  />
                </Flex>
              </MenuButton>
              <MenuList mt={'-10px'} border="0.5px solid gray" borderRadius="5px">
                <NextLink href="/blog" passHref style={{ textDecoration:'none' }}>
                  <MenuItem
                    onClick={() => console.log("Navigate to Blog")}
                    _hover={{ bg: "#D3D3D3" }}
                    padding="10px"
                    color={"black"}
                    textDecoration="none"
                    cursor={'pointer'}
                    // borderBottom={"0.5px solid rgb(200, 200, 200)"}
                    // borderRadius={"5px"}
                  >
                    Blog
                  </MenuItem>
                </NextLink>
                <MenuItem
                  onClick={() => console.log("Navigate to Contact Us")}
                  _hover={{ bg: "#D3D3D3" }}
                  padding="10px"
                  cursor={'pointer'}
                //   borderRadius={"5px"}
                >
                  Contact Us
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      {/* <CheckoutDrawer isDrawerOpen={isDrawerOpen} onClose={() => setDrawer(false)} /> */}
    </Box>
  );
};

export default Header;
