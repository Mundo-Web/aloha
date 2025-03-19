import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';


const Popup = () => {

return (
    <section className="max-w-2xl bg-white mx-2 md:mx-auto rounded-xl overflow-hidden px-2 py-4 flex flex-col gap-5">
      <div className='bg-[#FEFAF7] flex flex-col items-center '>
          <div className='flex flex-row gap-2 text-xl md:text-3xl text-white font-semibold rounded-3xl px-[10%] py-2 bg-[#C5B8D4] w-auto'><span>Solo por</span><span>00 : 10 : 58</span></div>
      </div>
      <h2 className='text-xl md:text-2xl md:text-3xl mb-5 text-center'>
            <b>¿Te gustaría añadir a tu pedido?</b>
      </h2>
      <div className='grid grid-cols-3 gap-3 md:gap-10'>
          <div className='flex flex-col gap-2 justify-center items-center'>
                <img src='./assets/img/products/imagenvua.png' className='h-40 md:h-60 object-contain object-center' />
                <div className='flex flex-col md:flex-row gap-1 md:gap-4 justify-center items-center'>
                  <h2 className='text-base md:text-xl font-light'>1 Extra</h2>
                  <span className='font-bold text-lg md:text-xl'>S/59.90</span>
                </div>
                <div>
                  <select className='bg-[#F7F7E7] rounded-xl p-2 text-xs w-[99%]'> 
                    <option>Shampoo extra</option>
                    <option>Acondicionador extra</option>
                    <option>Crema de peinar extra</option>
                    <option>Óleo de cabello extra</option>
                  </select>
                </div>
                <div className='bg-[#9577B9] text-white font-medium text-center text-sm md:text-lg rounded-md py-2 px-5 md:px-10'>Agregar</div>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
                <img src='./assets/img/products/imagenvua.png' className='h-40 md:h-60 object-contain object-center' />
                <div className='flex flex-col md:flex-row gap-1 md:gap-4 justify-center items-center'>
                  <h2 className='text-base md:text-xl font-light'>1 Extra</h2>
                  <span className='font-bold text-lg md:text-xl'>S/59.90</span>
                </div>
                <div>
                  <select className='bg-[#F7F7E7] rounded-xl p-2 text-xs w-[99%]'> 
                    <option>Shampoo extra</option>
                    <option>Acondicionador extra</option>
                    <option>Crema de peinar extra</option>
                    <option>Óleo de cabello extra</option>
                  </select>
                </div>
                <div className='bg-[#9577B9] text-white font-medium text-center text-sm md:text-lg rounded-md py-2 px-5 md:px-10'>Agregar</div>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
                <img src='./assets/img/products/imagenvua.png' className='h-40 md:h-60 object-contain object-center' />
                <div className='flex flex-col md:flex-row gap-1 md:gap-4 justify-center items-center'>
                  <h2 className='text-base md:text-xl font-light'>1 Extra</h2>
                  <span className='font-bold text-lg md:text-xl'>S/59.90</span>
                </div>
                <div>
                  <select className='bg-[#F7F7E7] rounded-xl p-2 text-xs w-[99%]'> 
                    <option>Shampoo extra</option>
                    <option>Acondicionador extra</option>
                    <option>Crema de peinar extra</option>
                    <option>Óleo de cabello extra</option>
                  </select>
                </div>
                <div className='bg-[#9577B9] text-white font-medium text-center text-sm md:text-lg rounded-md py-2 px-5 md:px-10'>Agregar</div>
          </div>
          
          
      </div>
      <div className='flex flex-row justify-center text-center text-xs md:text-sm font-light'>*Los productos extras se harán de la misma fórmula creada previamente</div>  
    </section>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Base {...properties}>
      <Popup {...properties} />
    </Base>
  );
});