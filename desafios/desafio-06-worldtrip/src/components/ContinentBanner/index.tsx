import { Flex, Heading } from '@chakra-ui/react'

export const ContainerBanner: React.FC = () => {
  return (
    <Flex
      w="100%"
      h={["150px", "200px", "400px", "500px"]}
      bgImage="/london.png"
      bgSize="cover"
      pb={["0", "0", "3.86rem"]}
      pl={["0", "0", "3.86rem"]}
      align={["center", "center", "flex-end"]}
      justify={["center", "center", "flex-start"]}
    >
      <Heading fontSize={["3xl","4xl","5xl"]} color="gray.50">
        Europa
      </Heading>
    </Flex>
  )
}
