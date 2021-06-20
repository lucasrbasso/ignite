import { Flex, Heading } from '@chakra-ui/react'

interface ContainerBannerProps {
  url: string
  country: string
}

export const ContainerBanner: React.FC<ContainerBannerProps> = ({ url, country }) => {
  return (
    <Flex
      w="100%"
      h={["150px", "200px", "400px", "500px"]}
      bgImage={`${url}`}
      bgSize="cover"
      pb={["0", "0", "3.86rem"]}
      pl={["0", "0", "3.86rem"]}
      align={["center", "center", "flex-end"]}
      justify={["center", "center", "flex-start"]}
    >
      <Heading fontSize={["3xl","4xl","5xl"]} color="gray.50">
        {country}
      </Heading>
    </Flex>
  )
}
