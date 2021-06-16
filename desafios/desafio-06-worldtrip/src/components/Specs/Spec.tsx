import { Image, useBreakpointValue, Text, Flex } from '@chakra-ui/react';

interface specProps {
  title: string;
  icon: string;
}

export const Spec: React.FC<specProps> = ({ title, icon}) => {

  const isMobile = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <Flex direction={["row", "column"]} align="center" justify="center">
      {isMobile ?
        <Image
          src={`icons/${icon}.svg`}
          color="orange.400"
          w="85px"
          h="85px"
          mb="6"
          alt={title} /> :
        <Text
          color="orange.400"
          fontWeight="600"
          fontSize="4xl">•</Text>}
      <Text
        fontWeight="600"
        color="gray.700"
        fontSize={["md", "xl", "2xl"]}>{title}</Text>
    </Flex>
  )
}
