import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"

const Testimonies = ({ testimonies }) => {

  return (
    <section className="p-[5%] py-[10%] md:pt-[2.5%] text-[#404040] bg-white">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mx-auto items-center"
      >
        {testimonies.map((testimony, index) => (
          <SwiperSlide key={index}>
            <div className="text-center max-w-md px-[15%] md:px-0 mx-auto">
              <div
                className="relative py-10"
                style={{
                  background: 'radial-gradient(circle, #f9edf1 0%, transparent 50%)',
                }}
              >
                <div className="text-lg font-bold relative">
                  <img
                    className="absolute -top-10 -left-12 w-12 h-12 object-contain object-center"
                    src="/assets/img/testimonies/quotes-initial.png"
                    alt="Opening quote"
                  />
                  {testimony.description}
                  <img
                    className="absolute -bottom-10 -right-12 w-12 h-12 object-contain object-center"
                    src="/assets/img/testimonies/quotes-final.png"
                    alt="Closing quote"
                  />
                </div>
              </div>
              <h1 className="text-xl text-[#DDABC6] font-bold">{testimony.name}</h1>
              <h3 className="text-[#DDABC6] font-extralight">@{testimony.correlative}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonies