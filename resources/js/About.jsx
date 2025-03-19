import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';

// Importación de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import em from './Utils/em';

const About = ({ about }) => {
  return <section className='bg-white p-[5%] md:px-[7.5%] lg:px-[10%]'>
    <div className='mx-auto w-max'>
      <p className='hidden md:block'>Nosotros:</p>
      <h1 className='text-4xl font-bold my-[5%] md:mt-0'>Hacemos alquimia</h1>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-5 md:mx-[7.5%] lg:mx-[10%] items-center'>
      <div className='my-[10%] px-[10%] md:col-span-2'>
        <img className='w-full' src="/assets/img/about/table-alchemy.png" alt="" />
      </div>
      <div className='text-justify text-sm md:col-span-3'>
        {em(about.description)}
      </div>
    </div>

    {/* Swiper para las imágenes */}
    <div className='my-[10%] md:my-[7.5%] lg:my-[5%]'>
      <Swiper
        slidesPerView={2} // 2 slides en mobile por defecto
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2, // 2 slides para pantallas pequeñas (mobile)
          },
          768: {
            slidesPerView: 3, // 3 slides para pantallas medianas (tablets)
          },
          1024: {
            slidesPerView: 4, // 4 slides para pantallas grandes (desktop)
          },
        }}
        className='mySwiper'
      >
        <SwiperSlide>
          <img className='aspect-square object-cover object-center' src="/assets/img/about/vua-1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='aspect-square object-cover object-center' src="/assets/img/about/vua-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='aspect-square object-cover object-center' src="/assets/img/about/vua-3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='aspect-square object-cover object-center' src="/assets/img/about/vua-4.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <About {...properties} />
  </Base>);
});
