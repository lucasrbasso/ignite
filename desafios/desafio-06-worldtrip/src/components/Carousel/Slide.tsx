import { Flex, Heading, Text } from '@chakra-ui/react';
import  Link  from 'next/link'

interface SlideProps {
  continent: {
    slug: string;
    continent: string;
    summary: string;
    slider: {
      url: string,
    }
  }
}

export const Slide: React.FC<SlideProps> = ({ continent }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      bgImage={`${continent.slider.url}`}
      bg="cover" bgPosition="center"
      bgRepeat="no-repeat"
      align="center"
      justify="center"
      textAlign="center"
      _hover={{ bgImage: `linear-gradient(rgba(0,0,0,0.09), rgba(0,0,0,0.09)), ${continent.slider.url}`}}
    >
      <Link href={`/continent/${continent.slug}`}>
        <a>
          <Heading
          fontSize={["2xl","3xl","4xl","5xl"]}
          color="gray.50"
          fontWeight="700"
        >
            {continent.continent}
          </Heading>
          <Text
            fontWeight="700"
            color="gray.100"
            fontSize={["0.8rem", "1xl", "2xl"]}
            mt={["2", "4"]}
            textAlign="center"
          >
            {continent.summary}
          </Text>
        </a>
      </Link>
    </Flex>
  )
}
