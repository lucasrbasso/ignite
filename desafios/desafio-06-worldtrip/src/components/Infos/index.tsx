import { Flex, Heading, Text, Box } from '@chakra-ui/react';

interface InfoProps {
  countries: number;
  languages: number;
  citiesTop100: number;
}

export const Infos: React.FC<InfoProps> = ({ countries, languages, citiesTop100 }) => {
  return (
    <Flex justifyContent="space-between" maxW="490px" w="100%" mt={["2rem","2rem","2rem","2rem", "0"]}>
      <Flex flexDirection="column" justifyContent={["left", "center", "center"]}>
        <Heading fontWeight={["400","600"]} fontSize={["2xl","4xl","5xl","5xl"]} color="orange.400">{countries}</Heading>
        <Text fontWeight={["400","600"]} fontSize={["xl","xl","2xl"]}>países</Text>
      </Flex>
      <Flex flexDirection="column" justifyContent={["left", "center", "center"]}>
        <Heading fontWeight={["400","600"]} fontSize={["2xl","4xl","5xl","5xl"]} color="orange.400">{languages}</Heading>
        <Text fontWeight={["400","600"]} fontSize={["xl","xl","2xl"]}>línguas</Text>
      </Flex>
      <Flex flexDirection="column" justifyContent={["left", "center", "center"]}>
        <Heading fontWeight={["400","600"]} fontSize={["2xl","4xl","5xl","5xl"]} color="orange.400">{citiesTop100}</Heading>
        <Text fontWeight={["400","600"]} fontSize={["xl","xl","2xl"]}>cidades +100</Text>
      </Flex>
    </Flex>
  )
}
