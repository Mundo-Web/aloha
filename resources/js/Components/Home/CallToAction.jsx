import Aos from "aos"
import React, { useEffect } from "react"

const CallToAction = () => {

  useEffect(() => {
    Aos.init()
  }, [null])

  return <section className="px-[5%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-gradient-to-tr from-[#99ade8] to-[#f2a2d2] text-center flex flex-col gap-4 justify-center" >
    <div className="flex flex-col gap-4 md:flex-row">
      <div >
        <img className="h-auto items-center" src="/assets/img/calltoaction/slogan.png" alt="" data-aos="fade-right" />
      </div>
      <div >
        <img className="h-auto items-center" src="/assets/img/calltoaction/banner.png" alt="" data-aos="fade-left" />
      </div>
    </div>
    <button data-aos="fade-up" href='/plans' className='bg-[#8998DA] text-white text-sm px-4 py-3 rounded border border-white w-max mx-auto md:mx-[12.5%]'>TE CONTAMOS MÁS AQUÍ</button>
  </section>
}

export default CallToAction