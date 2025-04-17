import Aos from "aos"
import React, { useEffect } from "react"

const Highlights = () => {
  useEffect(() => {
    Aos.init()
  }, [null])
  return <div className="flex gap-[2%] px-[5%] py-[5%] bg-white md:px-[20%]">
    <img className="w-[15%]" src="/assets/img/highlights/no-sulfates.png" alt="Libre de sulfatos" data-aos='fade-right'/>
    <img className="w-[15%]" src="/assets/img/highlights/no-parabens.png" alt="Libre de parabenos" data-aos='fade-right'/>
    <img className="w-[15%]" src="/assets/img/highlights/vegan.png" alt="Vegano" data-aos='fade-right'/>
    <img className="w-[15%]" src="/assets/img/highlights/no-salts.png" alt="Libre de sales" data-aos='fade-left'/>
    <img className="w-[15%]" src="/assets/img/highlights/cruelty-free.png" alt="Cruelty Free" data-aos='fade-left'/>
    <img className="w-[15%]" src="/assets/img/highlights/organic.png" alt="Orgánico" data-aos='fade-left'/>
  </div>
}

export default Highlights