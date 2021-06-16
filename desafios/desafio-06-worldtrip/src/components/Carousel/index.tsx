import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard } from 'swiper';

import { Slide } from './Slide'

import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay]);

export const Carousel: React.FC = () => {
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
        <SwiperSlide><Slide /></SwiperSlide>
        <SwiperSlide><Slide /></SwiperSlide>
        <SwiperSlide><Slide /></SwiperSlide>

      </Swiper>
    </Flex>
  );
}
