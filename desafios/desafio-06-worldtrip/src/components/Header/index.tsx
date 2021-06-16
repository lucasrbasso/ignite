import { Flex } from '@chakra-ui/react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return(
    <Flex
      as="header"
      w="100%"
      h={["3.125rem","5rem","6.25rem",]}
      align="center"
      justify="center"
    >
      <Logo />
    </Flex>
  )
}
