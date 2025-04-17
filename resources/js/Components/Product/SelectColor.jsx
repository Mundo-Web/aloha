import React, { useEffect, useState } from "react"
import { Local } from "sode-extend-react"
import Tippy from "@tippyjs/react"
import Aos from "aos"

const SelectColor = ({ formula, otherFormulas, goToNextPage, goToPrevPage, items = [], defaultColors = {}, setSelectedPlan }) => {
  const [cart, setCart] = useState((Local.get('vua_cart') ?? []).filter(item => !!item.formula_id))

  useEffect(() => {
    setCart(old => {
      return old.map(item => {
        const colors = items.find(x => x.id == item.id)?.colors ?? []
        const currentColors = item.colors ?? []
        const quantity = item.quantity
        const leftColorsCount = quantity - currentColors.length
        const color2fill = structuredClone(colors).sort((a, b) => defaultColors[item.id] == a.id ? -1 : 1)
        const leftColor = new Array(leftColorsCount > 0 ? leftColorsCount : 0).fill(color2fill?.[0] ?? null)

        if (currentColors.length < quantity) item.colors = [...currentColors, ...leftColor].filter(Boolean)
        else item.colors = currentColors.slice(0, quantity).filter(Boolean)
        return item
      })
    })
  }, [null])

  const onSelectColor = (itemId, colorIndex, color, formula_id_in) => {
    const formula_id = formula_id_in ?? formula?.id
    setCart(old => {
      return old.map(item => {
        if (item.id == itemId && item.formula_id == formula_id) item.colors[colorIndex] = color
        return item
      })
    })
  }

  const onNextClicked = () => {
    if (otherFormulas.length > 0) {
      setSelectedPlan(null)
      goToNextPage(2)
    } else {
      goToNextPage()
    }
  }

  useEffect(() => {
    Local.set('vua_cart', cart)
  }, [cart])

  useEffect(() => {
    Aos.init()
  }, [null])

  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center text-[#404040]'>

    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Ahora selecciona el color!</h1>
      <p className="mb-8 text-sm font-extralight">
        <span>Elije tus colores favoritos para tu rutina</span>
        <img className="w-4 inline-block ms-2" src="/assets/img/emojis/stars.png" alt="Elije tus colores favoritos para tu rutina" />
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-5 mt-5 sm:mt-8 lg:mt-10">
      {
        cart.sort((a, b) => {
          const formula_a = otherFormulas.find(x => x.id == a.formula_id) ?? formula
          const formula_b = otherFormulas.find(x => x.id == b.formula_id) ?? formula
          return formula_a.created_at < formula_b.created_at ? -1 : 1
        }).map((item, i) => {
          const formulaIndex = otherFormulas.findIndex(x => x.id == item.formula_id) + 1
          const itemFormula = otherFormulas.find(x => x.id == item.formula_id) ?? formula
          const colors = items.find(x => x.id == item.id)?.colors ?? []

          if (colors.length == 0) return null
          return item.colors?.map((existence, j) => {
            return <div key={`existence-${i}-${j}`} className="overflow-hidden w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.33px)] bg-white rounded-2xl shadow-md" data-aos='fade-down'>
              <div className="flex flex-row gap-2 items-center p-2">
                <div className="">
                  {/* <ItemContainer color={existence.hex} /> */}
                  <img className="h-[120px] aspect-[3/4] object-cover object-center rounded-md" src={`/api/colors/media/${existence?.image}`} alt={item.name} />
                </div>
                <div className="">
                  <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                    <div className="flex flex-col items-start self-stretch">
                      <small className="block mb-1 font-bold">
                        <i className="mdi mdi-flask me-1"></i>
                        {
                          formulaIndex == 0
                            ? 'Fórmula principal'
                            : <>{formulaIndex + 1}<sup>a</sup> fórmula</>
                        }
                      </small>
                      <h2 className="text-lg font-semibold tracking-normal leading-none text-neutral-700 mb-2">
                        {item.name} {j + 1}
                      </h2>
                      <p className=" text-sm font-light tracking-normal leading-none text-neutral-700 mb-2">Selecciona tu color:</p>
                      <div className="flex gap-2 flex-wrap">
                        {
                          colors.map((color, index) => {
                            const isSelected = existence?.id == color.id
                            return <Tippy key={index} content={color.name}>
                              <button className={`flex shrink-0 w-8 aspect-square rounded-full border ${isSelected ? 'shadow-md border-[#000000]' : ''}`} style={{
                                backgroundColor: color.hex || '#fff'
                              }} onClick={() => onSelectColor(item.id, j, color, itemFormula.id)} />
                            </Tippy>
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        }).filter(Boolean)
      }
    </div>


    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={() => goToPrevPage()} className='bg-[#C5B8D4] text-white text-sm px-16 py-3 rounded mt-4'>
        <i className="mdi mdi-arrow-left me-1"></i>
        VOLVER
      </button>
      <button onClick={onNextClicked} className='bg-[#C5B8D4] text-white text-sm px-14 py-3 rounded mt-4'>
        SIGUIENTE
        <i className="mdi mdi-arrow-right ms-1"></i>
      </button>
    </div>

  </section>
}

export default SelectColor 