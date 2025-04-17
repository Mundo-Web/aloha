import Aos from "aos"
import React, { useEffect } from "react"

const HowItWorks = () => {

  useEffect(() => {
    Aos.init()
  }, [null])

  return <section className="bg-[#FBF5F1] lg:bg-white p-[5%] text-center lg:px-[12.5%] lg:py-0">
    <div className="lg:flex lg:items-center lg:gap-8 bg-[#FBF5F1] lg:p-[5%] rounded-2xl">
      <div>
        <h1 className="text-2xl text-center text-[#404040]">
          Hechos a tu medida.<br />
          <span className="font-bold">¿Cómo funciona?</span>
        </h1>
        <button href='/test' className='bg-[#C5B8D4] text-white text-sm px-4 py-3 rounded my-4'>HAZ EL TEST Y CREA TU FÓRMULA</button>
      </div>
      <div className="flex gap-[5%] mt-[5%]">
        <article className="w-1/3 relative" data-aos='fade-up-right'>
          <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">1</span>
          <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-1.png" alt="" />
          <p className="text-xs">Haz un test, para personalizar la fórmula ideal para ti.</p>
        </article>
        <article className="w-1/3 relative" data-aos="fade-up">
          <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">2</span>
          <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-2.png" alt="" />
          <p className="text-xs">Nuestro laboratorio, prepara tus productos basado en las necesidades de tu cabello.</p>
        </article>
        <article className="w-1/3 relative" data-aos="fade-up-left">
          <span className="absolute -top-1 -left-1 bg-[#FBF5F1] rounded-full w-6 h-6 p-1 text-xs font-bold border border-[#404040]">3</span>
          <img className="rounded-lg mb-2 w-full aspect-square object-cover object-center" src="/assets/img/steps/step-3.png" alt="" />
          <p className="text-xs">Lograrás un cabello saludable, con un producto personalizado, libre de sales y sulfato.</p>
        </article>
      </div>
    </div>
  </section>
}

export default HowItWorks