'use client'
import { useEffect, useState } from "react";
import { Box, IconButton, Image, Flex, Icon, HStack, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroBanner = ({ images, language }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // console.log(images[0].backgroundImage.image[0].url)

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <Box position="relative" margin="auto">
        <Flex overflow="hidden">
          {images.map((image, index) => (
            <Box
            key={index}
            minWidth="100%"
            position="relative"
            transition="transform 0.5s ease-in-out"
            transform={`translateX(-${currentIndex * 100}%)`}
          >
            <Image src={image.backgroundImage.image[0].url} width="100%" height={'600px'} />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              background="rgba(0, 0, 0, 0.5)"
              zIndex="1"
            />
          
            <Text
              position="absolute"
              left="5%"
              top="40%"
              transform="translateY(-50%)"
              color="white" 
              padding="10px"
              fontSize={'3rem'}
              width={'60%'}
              lineHeight={'40px'}
              zIndex="2"
            >
              {/* {image.motto} */}
              { language === 'hi' ? image.motto_hi : image.motto}
            </Text>
            <Text
              position="absolute"
              left="5%"
              top="55%"
              transform="translateY(-50%)"
              color="yellow" 
              padding="10px"
              fontSize={'2rem'}
              width={'50%'}
              lineHeight={'25px'}
              zIndex="2"
            >
              {/* {image.heading} */}
              { language === 'hi' ? image.heading_hi : image.heading}
            </Text>
          </Box>
          
          ))}
        </Flex>
        <Icon
          as={FaChevronLeft}
          // color="rgb(139, 195, 74)"
          boxSize={30}
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={prevSlide}
        />
        <Icon
          as={FaChevronRight}
          // color="rgb(139, 195, 74)"
          boxSize={30}
          position="absolute"
          right="10px"
          top="50%"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={nextSlide}
        />
        <HStack
          spacing={2}
          position="absolute"
          bottom="10px"
          width="100%"
          justifyContent="center"
        >
          {images.map((_, index) => (
            <Box
              key={index}
              as="button"
              height="10px"
              width="10px"
              borderRadius="50%"
              backgroundColor={
                currentIndex === index
                  ? "rgb(139, 195, 74)"
                  : "rgb(195, 240, 180)"
              }
              onClick={() => goToSlide(index)}
            />
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default HeroBanner;
