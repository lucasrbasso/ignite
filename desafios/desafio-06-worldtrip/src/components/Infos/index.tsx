import { Flex, Heading, Text, Box, Icon, Tooltip } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';


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
        <Tooltip hasArrow label="Cidades entre as 100 mais visitadas do mundo!" aria-label="A tooltip" color="white" bg="orange.400">
          <Flex alignSelf="flex-end">
            <span><FiInfo color="#DADADA" size={16}/></span>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  )
}
