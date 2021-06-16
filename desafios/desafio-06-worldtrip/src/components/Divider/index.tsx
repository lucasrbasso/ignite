import { Box } from '@chakra-ui/react';

export const Divider: React.FC = () => {
  return(
    <Box
      mx="auto"
      mt={["9", "20"]}
      w={["60px", "70px", "80px", "90px"]}
      h={["1px","2px"]}
      bg="gray.700"
    />
  )
}
