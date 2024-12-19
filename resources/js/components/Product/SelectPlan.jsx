import React from "react"
import { Local } from "sode-extend-react"
import Number2Currency from "../../Utils/Number2Currency";

const SelectPlan = ({ goToNextPage, setSelectedPlan, bundles = [], planes = [] }) => {

  const cart = Local.get('vua_cart') ?? []

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  const restBundles = bundles.filter(x => {
    switch (x.comparator) {
      case '<':
        return totalQuantity < x.items_quantity
      case '>':
        return totalQuantity > x.items_quantity
      default:
        return totalQuantity == x.items_quantity
    }
  }).sort((a, b) => b.percentage - a.percentage)
  const bundle = restBundles?.[0] ?? null

  const finalPrice = totalPrice * (1 - (bundle?.percentage || 0))

  const onSelectPlan = (plan) => {
    setSelectedPlan(plan)
    goToNextPage()
  }

  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center'>

    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Elije la frecuencia de tu pedido!</h1>
      <p className="mb-8 text-sm font-extralight">Conoce de qué manera puedes ahorrar en tu rutina</p>
    </div>

    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 sm:mt-8 lg:mt-10 items-center">

      <div className={`transition-all cursor-pointer p-6 bg-white group hover:bg-[#EFBEC1] hover:text-white rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full`}
        onClick={() => onSelectPlan(null)}>
        <div className="text-start">
          <span className="block">Comprar por</span>
          <span className="block font-bold mb-2 -mt-1">1 sola vez</span>
        </div>
        <div className="flex flex-col gap-2 text-end">
          <span className="ms-auto text-4xl text-[#C0AFD4] group-hover:text-white font-bold">
            S/{Number2Currency(finalPrice)}
          </span>
        </div>
      </div>

      {
        planes.length == 0 ?
          <div className="p-4 text-center flex flex-col gap-2 items-center">
            <span>
              o inicia sesion para acceder a <br />
              <b>planes de suscripcion</b>
            </span>
            <button href='/login' className="block rounded-full px-3 py-2 bg-[#A191B8] text-white text-sm uppercase">Iniciar sesion</button>
          </div>
          : planes.sort((a, b) => b.percentage - a.percentage).map((plan, index) => {
            const price = finalPrice - (totalPrice * plan.percentage)
            return <div key={index}
              className={`cursor-pointer p-6 bg-white transition-all rounded-2xl grid grid-cols-2 items-center justify-between gap-4 shadow-md h-full hover:bg-[#EFBEC1] hover:text-white peer-checked:bg-[#EFBEC1] peer-checked:text-white group`}
              onClick={() => onSelectPlan(plan.id)}
            >
              <div className="text-start">
                <span className="block">Suscripción</span>
                <span className="block font-bold mb-2 -mt-1">Cada {plan.name}</span>
                <div
                  className={`
          border border-[#404040] text-xs px-2 py-1 rounded-full w-max 
          group-hover:border-white peer-checked:border-white
        `}
                >
                  + Envío gratis Lima Met.
                </div>
              </div>
              <div className="flex flex-col gap-2 text-end">
                <span
                  className={`
          ms-auto text-nowrap text-xs px-2 py-1 rounded-full w-max
          text-white bg-[#C0AFD4]
          group-hover:text-[#EEA9D2] group-hover:bg-white
          peer-checked:text-[#EEA9D2] peer-checked:bg-white
        `}
                >
                  -{plan.percentage * 100}%OFF
                  <img className="w-3 inline-block ms-1" src="/assets/img/emojis/fire.png" alt="-{plan.percentage * 100}%OFF" />
                </span>
                <span className="ms-auto text-4xl text-[#C0AFD4] font-bold group-checked:text-white group-hover:text-white">
                  S/{Number2Currency(price)}
                </span>
              </div>
            </div>
          })
      }



      {/* <div>
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
      </div> */}
    </div>

    {/* <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded mt-4'>PROCEDER A LA COMPRA</button>
    </div> */}

  </section>
}

export default SelectPlan
