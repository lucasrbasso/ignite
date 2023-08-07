import { Grid, Heading, Box } from "@chakra-ui/react";
import { City } from "./City";

interface City {
  city_name: string,
  country: string,
  flag: {
    url: string,
  },
  photo: {
    url: string,
  }
}

interface CitiesProps {
  cities: City[],
}

export const Cities: React.FC<CitiesProps> = ({ cities }) => {

  console.log(cities)

  return (
    <>
      <Heading fontWeight="500" fontSize={["2xl","4xl"]} mb="10" mt={["2rem","5rem"]}>Cidades +100</Heading>
      <Grid
        templateColumns={["1fr","1fr 1fr", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gap={['20px','45px']} alignItems="center"
        justifyContent="center"
        px={["30px", "0"]}
      >
        {cities.map((city) => (
            <City key={city.city_name} city={city} />
          )
        )}
      </Grid>
    </>
  )
}
