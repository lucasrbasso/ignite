import { Flex } from '@chakra-ui/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard } from 'swiper';

import { Slide } from './Slide'

import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]);

interface Continent {
  slug: string;
  continent: string;
  summary: string;
  slider: {
    url: string,
  }
}

interface CarouselProps {
  continents: Continent[],
}

export const Carousel: React.FC<CarouselProps> = ({ continents }) => {
  return (
    <Flex w="100%" h={["250px","450px"]} maxW="1240px" mx="auto" mb={["5","10"]}>
      <Swiper
        slidesPerView={1}
        navigation
        keyboard
        pagination={{ clickable: true }}
        autoplay={{
          delay:4000,
        }}
        style={{width: '100%', flex: '1'}}
      >
        {continents.map((continent) => {
          return (
            <SwiperSlide key={continent.slug}><Slide continent={continent}/></SwiperSlide>
          )
        })}
      </Swiper>
    </Flex>
  );
}
