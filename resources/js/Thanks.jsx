import React, { useEffect } from "react"
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./Components/Tailwind/Base";
import { Local } from "sode-extend-react";

const Thanks = ({ session }) => {
  useEffect(() => {
    history.replaceState(null, '', '/thanks');
    Local.delete('vua_cart');
    Local.delete('vua_test');
    Local.delete('vua_formula')
  }, [null])

  return <div>
    <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl lg:text-4xl'>
          <b>¡Muchas gracias por tu compra!</b>
        </h1>
        <p className='mt-4 text-base sm:text-lg font-light'>
          Tu fórmula personalizada está pasando a nuestro laboratorio y será creada por nuestro equipo de expertos.
          La tendrás en tus manos en un rango de 3 a 6 días hábiles.
        </p>
      </div>
      {
        session?.id &&
        <button
          href='/my-account'
          className='mt-[15%] md:mt-[10%] lg:mt-[5%] bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded border border-white w-max  text-nowrap'>
          MIS FÓRMULAS
          <i className="ms-1 mdi mdi-arrow-top-right"></i>
        </button>
      }
    </section>

    <section className='p-[5%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-white text-center'
      style={{
        backgroundImage: 'url(/assets/img/test/bg-image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className="flex gap-[2%] px-[5%] md:px-[20%]">
        <img className="w-[15%]" src="/assets/img/highlights/no-sulfates.png" alt="Libre de sulfatos" />
        <img className="w-[15%]" src="/assets/img/highlights/no-parabens.png" alt="Libre de parabenos" />
        <img className="w-[15%]" src="/assets/img/highlights/vegan.png" alt="Vegano" />
        <img className="w-[15%]" src="/assets/img/highlights/no-salts.png" alt="Libre de sales" />
        <img className="w-[15%]" src="/assets/img/highlights/cruelty-free.png" alt="Cruelty Free" />
        <img className="w-[15%]" src="/assets/img/highlights/organic.png" alt="Orgánico" />
      </div>
      <figure className='h-[40vh] lg:h-[60vh] xl:h-[80vh]'></figure>
    </section>

  </div>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Thanks {...properties} />
  </Base>);
})