import { ContainerBanner } from "../../components/ContinentBanner";
import { Header } from "../../components/Header";
import { Text, Flex, Box } from '@chakra-ui/react';
import { Infos } from "../../components/Infos";
import React from "react";
import Cities from "../../components/Cities";


const Continent: React.FC = () => {
  return (
    <>
      <Header />
      <ContainerBanner />

      <Flex
        mx="auto"
        maxWidth={["349px","600px","600px","800px","1200px"]}
        direction="column"
        px={["1rem", "1.5rem"]}
        mb="2rem"
      >
        <Flex
          flex="1"
          flexDirection={["column", "column", "column", "column","row"]}
          justifyContent="space-between"
          align="center"
          mt={["24px","34px", "50px", "80px"]}
        >
          <Box
            maxWidth={["343px","600px","800px","800px","600px"]}
            textJustify="inter-word"
            textAlign="justify"
          >
            <Text
              fontSize={["sm","1xl","2xl","2xl"]}
            >
                A Europa é, por convenção, um dos seis continentes do mundo.
                Compreendendo a península ocidental da Eurásia, a Europa geralmente
                divide-se da Ásia a leste pela divisória de águas dos montes Urais,
                o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste.
            </Text>
          </Box>
          <Infos citiesTop100={27} languages={60} countries={50}/>
        </Flex>

        <Cities />
      </Flex>
    </>
  );
}

export default Continent;
