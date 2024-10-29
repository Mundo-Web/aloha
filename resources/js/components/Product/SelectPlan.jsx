import React from "react"

const SelectPlan = ({ goToNextPage }) => {


  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>

    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Elije la frecuencia de tu pedido!</h1>
      <p className="mb-8 text-sm font-extralight">Conoce de qué manera puedes ahorrar en tu rutina</p>
    </div>

    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 sm:mt-8 lg:mt-10">

      <div>
        <input type="radio" name="plan" id="unique" className="hidden peer" />
        <label htmlFor="unique" className="peer-checked:border-2 peer-checked:border-[#c0afd4] transition-all cursor-pointer p-6 bg-white rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full">
          <div className="text-start">
            <span className="block">Comprar por</span>
            <span className="block font-bold mb-2 -mt-1">1 sola vez</span>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <span className="ms-auto text-4xl text-[#C0AFD4] font-bold">
              S/99.90
            </span>
          </div>
        </label>
      </div>

      <div>
        <input type="radio" name="plan" id="each-three" className="hidden peer" />
        <label htmlFor="each-three" className="peer-checked:border-2 peer-checked:border-[#c0afd4] transition-all cursor-pointer p-6 bg-white rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full">
          <div className="text-start">
            <span className="block">Suscripción</span>
            <span className="block font-bold mb-2 -mt-1">Cada 3 meses</span>
            <div className="border border-[#404040] text-xs px-2 py-1 rounded-full w-max">
              + Envío gratis Lima Met.
            </div>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <span className="ms-auto text-nowrap text-xs px-2 py-1 text-white bg-[#C0AFD4] rounded-full w-max">
              -10%OFF 🔥
            </span>
            <span className="ms-auto text-4xl text-[#C0AFD4] font-bold">
              S/99.90
            </span>
          </div>
        </label>
      </div>

      <div>
        <input type="radio" name="plan" id="each-two" className="hidden peer" />
        <label htmlFor="each-two" className="peer-checked:border-2 peer-checked:border-[#c0afd4] transition-all cursor-pointer p-6 bg-white rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full">
          <div className="text-start">
            <span className="block">Suscripción</span>
            <span className="block font-bold mb-2 -mt-1">Cada 2 meses</span>
            <div className="border border-[#404040] text-xs px-2 py-1 rounded-full w-max">
              + Envío gratis Lima Met.
            </div>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <span className="ms-auto text-nowrap text-xs px-2 py-1 text-white bg-[#C0AFD4] rounded-full w-max">
              -10%OFF 🔥
            </span>
            <span className="ms-auto text-4xl text-[#C0AFD4] font-bold">
              S/99.90
            </span>
          </div>
        </label>
      </div>

      <div>
        <input type="radio" name="plan" id="each-one" className="hidden peer" />
        <label htmlFor="each-one" className="peer-checked:border-2 peer-checked:border-[#c0afd4] transition-all cursor-pointer p-6 bg-[#EFBEC1] text-white rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full">
          <div className="text-start">
            <span className="block">Suscripción</span>
            <span className="block font-bold mb-2 -mt-1">Cada 1 mes</span>
            <div className="border border-white text-xs px-2 py-1 rounded-full w-max">
              + Envío gratis Lima Met.
            </div>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <span className="ms-auto text-nowrap text-xs px-2 py-1 text-[#EEA9D2] bg-white rounded-full w-max">
              -10%OFF 🔥
            </span>
            <span className="ms-auto text-4xl text-white font-bold">
              S/99.90
            </span>
          </div>
        </label>
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded mt-4'>AGREGAR AL CARRITO</button>
    </div>

  </section>
}

export default SelectPlan
