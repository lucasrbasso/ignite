import { ContainerBanner } from "../../components/ContinentBanner";
import { Header } from "../../components/Header";
import { Text, Flex, Box } from '@chakra-ui/react';
import { Infos } from "../../components/Infos";
import { RichText } from 'prismic-dom';
import React from "react";
import { Cities } from "../../components/Cities";
import { getPrismicClient } from "../../../services/prismic";
import { GetStaticProps } from "next";


interface Continent {
  slug: string;
  data: {
    country: string,
    description: string,
    banner: {
      url: string,
    },
    infos: {
      cities_list: string,
      countries: number,
      languages: number,
      cities: number,
    }
  },
  cities_100: {
    city_name: string,
    country: string,
    flag: {
      url: string,
    },
    photo: {
      url: string,
    }
  }[],
}

interface ContinentProps {
  continent: Continent;
}

const Continent: React.FC<ContinentProps> = ({ continent }) => {

  return (
    <>
      <Header />
      <ContainerBanner
        url={continent.data.banner.url}
        country={continent.data.country}
      />

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
            textAlign="justify"
          >
            <Text
              fontSize={["sm","1xl","2xl","2xl"]}
            >
              {continent.data.description}
            </Text>
          </Box>
          <Infos
            citiesTop100={continent.data.infos.cities}
            languages={continent.data.infos.languages}
            countries={continent.data.infos.countries}/>
        </Flex>

        <Cities cities={continent.cities_100}/>
      </Flex>
    </>
  );
}

export default Continent;

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  console.log(params);

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const continent = {
    slug,
    data: {
      country: response.data.title,
      description: RichText.asText(response.data.description),
      banner: {
        url: response.data.banner_image.url,
      },
      infos: {
        cities_list: response.data.cities_list,
        countries: response.data.countries,
        languages: response.data.languages,
        cities: response.data.cities,
      }
    },
    cities_100: response.data.cities_100.map(city => {
      return {
        city_name: city.city,
        country: city.country,
        flag: {
          url: city.flag.url,
        },
        photo: {
          url: city.city_photo.url,
        }
      }
    })
  };

  console.log(continent);

  return {
    props: {
      continent,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
