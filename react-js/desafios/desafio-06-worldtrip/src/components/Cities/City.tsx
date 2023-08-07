import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface CityProps {
  city: {
    city_name: string,
    country: string,
    flag: {
      url: string,
    },
    photo: {
      url: string,
    }
  }
}

export const City: React.FC<CityProps> = ({ city }) => {
  return (
    <Box
      borderRadius="4px"
      overflow="hidden"
    >
      <Image
        src={`${city.photo.url}`}
        alt="paris"
        h="173px"
        w="100%"
      />
      <Flex
        p="6"
        align="center"
        justify="space-between"
        bg="white"
        border="1px"
        borderColor="yellow.300"
        borderTop="0"
      >
      <Flex direction="column">
        <Heading fontSize="xl" fontWeight="500">{city.city_name}</Heading>
        <Text mt="3" fontSize="md" color="gray.500" fontWeight="500">{city.country}</Text>
      </Flex>
      <Image src={`${city.flag.url}`} alt="paris" w="30px" h="30px" borderRadius="50%" objectFit="cover"/>
    </Flex>
    </Box>
  )
}
