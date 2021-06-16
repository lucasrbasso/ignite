import React from "react";
import { Header } from '../components/Header';
import { Specs } from '../components/Specs';
import { Divider } from '../components/Divider'

import Banner from "../components/Banner";
import { Heading } from "@chakra-ui/react";
import { Carousel } from "../components/Carousel";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Specs />
      <Divider />

      <Heading
        textAlign="center"
        fontWeight="500"
        fontSize={["lg", "2xl", "4xl"]}
        mb={["5", "14"]}
        mt={["9", "14"]}
      >
        Vamos nessa? <br/>
        Então escolha seu continente
      </Heading>

      <Carousel />
    </>
  )
}
