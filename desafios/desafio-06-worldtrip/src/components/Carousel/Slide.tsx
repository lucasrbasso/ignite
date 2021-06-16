import { Flex, Heading, Text } from '@chakra-ui/react';
import  Link  from 'next/link'

export const Slide: React.FC = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      bgImage="/europe.png"
      bg="cover" bgPosition="center"
      bgRepeat="no-repeat"
      align="center"
      justify="center"
      textAlign="center"
      _hover={{ bgImage: "linear-gradient(rgba(0,0,0,0.09), rgba(0,0,0,0.09)), url(europe.png)"}}
    >
      <Link href="/">
        <a>
          <Heading
          fontSize={["2xl","3xl","4xl","5xl"]}
          color="gray.50"
          fontWeight="700"
        >
            Europa
          </Heading>
          <Text
            fontWeight="700"
            color="gray.100"
            fontSize={["0.8rem", "1xl", "2xl"]}
            mt={["2", "4"]}
            textAlign="center"
          >
            O continente mais antigo.
          </Text>
        </a>
      </Link>
    </Flex>
  )
}
