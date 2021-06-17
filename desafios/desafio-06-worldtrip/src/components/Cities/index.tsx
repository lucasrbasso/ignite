import { Grid, Heading, Box } from "@chakra-ui/react";

export default function Cities() {
  return (
    <>
      <Heading fontWeight="500" fontSize={["2xl","4xl"]} mb="10" mt={["2rem","5rem"]}>Cidades +100</Heading>
      <Grid templateColumns={["1fr","1fr 1fr", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={['20px','45px']} alignItems="center" justifyContent="center" px={["30px", "0"]}>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
        <Box borderRadius="4px" overflow="hidden" bgColor="orange.400" h="170px" w="100%"/>
      </Grid>
    </>
  )
}
