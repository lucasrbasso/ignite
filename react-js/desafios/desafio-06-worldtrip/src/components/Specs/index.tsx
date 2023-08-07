import { GridItem, Grid } from "@chakra-ui/react";
import React from "react";
import { Spec } from "./Spec";

export const Specs: React.FC = () => {
  return (
    <Grid
      templateColumns={["1fr 1fr", "1fr 1fr" , "1fr 1fr", "repeat(5, 1fr)"]}
      w="100%"
      justifyContent= "space-between"
      align="center"
      mt={["10","32"]}
      mx="auto"
      maxW="1160px"
      gap={[1, 5]}

    >
      <GridItem>
        <Spec icon="cocktail" title="vida noturna" />
      </GridItem>
      <GridItem>
        <Spec icon="surf" title="praia" />
      </GridItem>
      <GridItem>
        <Spec icon="building" title="moderno" />
      </GridItem>
      <GridItem>
        <Spec icon="museum" title="clássico" />
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1]}>
        <Spec icon="earth" title="e mais..." />
      </GridItem>
    </Grid>
  )
}
