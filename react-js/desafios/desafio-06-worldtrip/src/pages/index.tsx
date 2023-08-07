import React from "react";
import Prismic from '@prismicio/client';
import { Header } from '../components/Header';
import { Specs } from '../components/Specs';
import { Divider } from '../components/Divider'

import Banner from "../components/Banner";
import { Heading } from "@chakra-ui/react";
import { Carousel } from "../components/Carousel";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";


interface Continent {
  slug: string;
  continent: string;
  summary: string;
  slider: {
    url: string,
  }
}

interface HomeProps {
  continents: Continent[],
}

export default function Home({ continents }: HomeProps) {

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

      <Carousel continents={continents}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.content', 'posts.summary', 'posts.slider_image' ],
      pageSize: 100,
    },
  );

  const continents = response.results.map(continent =>
    {
      return {
        slug: continent.uid,
        continent: continent.data.title,
        summary: continent.data.summary,
        slider: {
          url: continent.data.slider_image.url
        }
      }
    }
  );

  console.log(continents);

  return {
    props: {
      continents,
    },

    revalidate: 60 * 60 * 24, // 24 hours
  };
};
