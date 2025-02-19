import Aos from "aos"
import React, { useEffect } from "react"
import "swiper/css"
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Number2Currency from "../../Utils/Number2Currency"

const Routine = ({ items }) => {

  useEffect(() => {
    Aos.init()
  }, [null])

  const spv = Math.min(items.length, 4)

  return <section className="bg-white p-[5%] text-center md:p-[10%] md:pt-[5%] lg:px-[20%]">
    <h1 className="text-2xl text-center text-[#404040] font-bold">
      Rutina capilar personalizada
    </h1>
    <Swiper
      spaceBetween={'5%'}
      slidesPerView={2} // Muestra 2 slides en móvil
      breakpoints={{
        1024: {
          slidesPerView: spv, // Muestra 3 slides en escritorio
        },
      }}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mt-[5%]"
    >
      {
        items.map((item, index) => <SwiperSlide>
          <a key={index} href="/test">
            <article className="bg-[#FBF5F1] rounded-lg" data-aos="fade-up">
              <img src={`/api/items/media/${item.image}`} className="aspect-[3/4] object-cover object-center bg-[#d0cddc] rounded-t-xl w-full border border-[#fbf5f1]" onError={(e) => e.target.src = "/assets/img/routine/conditioner.png"} alt="Shampoo" />
              <div className="p-2">
                <h1 className="text-lg font-bold">{item.name}</h1>
                <p className="text-center text-sm">Personalizado desde S/{Number2Currency(item.price)}</p>
              </div>
            </article>
          </a>
        </SwiperSlide>)
      }
    </Swiper>
  </section>
}

export default Routine 