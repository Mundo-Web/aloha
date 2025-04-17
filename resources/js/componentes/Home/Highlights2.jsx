import React from "react"
import crueltyFree from './images/cruelty-free.svg'
import customizable from './images/customizable.svg'
import noParabens from './images/no-parabens.svg'
import noSulfates from './images/no-sulfates.svg'
import organic from './images/organic.svg'
import vegan from './images/vegan.svg'

const Highlights2 = () => {
  return <div className="p-[10%] bg-[#FBF5F1] md:py-[7.5%] lg:py-[5%]" style={{
    backgroundImage: 'url(/assets/img/highlights/background.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }}>
    <div className=" text-white md:w-2/3 lg:w-1/2">
      <h1 className="text-4xl mb-4">Hacemos alquimia</h1>
      <p className="mb-4 text-sm">Nuestro equipo de científicos identificó la proporción perfecta de ingredientes naturales para el bienestar de tu cabello.</p>
      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={organic} alt="Organico" />
              <p className="text-xs">Organico</p>
            </td>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={noParabens} alt="Libre de parabenos" />
              <p className="text-xs">Libre de parabenos</p>
            </td>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={noSulfates} alt="Libre de sulfatos" />
              <p className="text-xs">Libre de sulfatos</p>
            </td>
          </tr>
          <tr>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={customizable} alt="100% personalizado" />
              <p className="text-xs">100% personalizado</p>
            </td>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={vegan} alt="Vegano" />
              <p className="text-xs">Vegano</p>
            </td>
            <td valign="top" className="px-1 py-2 w-1/3 border border-white text-center">
              <img className="block mx-auto mb-2 h-12 w-12 object-contain object-center" src={crueltyFree} alt="Libre de crueldad animal" />
              <p className="text-xs">Libre de crueldad animal</p>
            </td>
          </tr>
        </tbody>
      </table>
      <button className='bg-[rgba(197,184,212,.50)] text-white text-sm px-4 py-3 rounded border border-white'>TE CONTAMOS MÁS AQUÍ</button>
    </div>
  </div>
}

export default Highlights2