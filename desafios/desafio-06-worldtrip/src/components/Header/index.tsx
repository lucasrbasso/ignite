import { Flex, Icon } from '@chakra-ui/react';
import { Logo } from './Logo';
import { useRouter } from 'next/router'
import { FiChevronLeft } from 'react-icons/fi';

export const Header: React.FC = () => {
  const router = useRouter()

  const isInMainPage = (router.asPath === '/');

  return(
    <Flex
      as="header"
      w="100%"
      h={["3.125rem","5rem","6.25rem",]}
      align="center"
      justify="center"
    >
      {!isInMainPage &&   <Icon as={FiChevronLeft} fontSize={["16px", "32px"]} position="absolute" left={["1rem","8.75rem"]}/>}
      <Logo />
    </Flex>
  )
}
