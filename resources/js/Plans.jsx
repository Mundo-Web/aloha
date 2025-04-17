import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

const Plans = ({ renewals }) => {
  return (
    <>
      <span className='h-10 bg-[#f3a3d3] block absolute -left-32 md:-left-60 bottom-0 rotate-45 w-full p-2 z-10'>
        <figure className='h-6'
          style={{
            backgroundImage: 'url(/assets/img/logo-spaced.svg)',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat-x',
          }}
        >

        </figure>
      </span>
      <section className='px-[5%] md:px-[7.5%] lg:px-[10%] pb-[5%] mt-[7.5%] md:mt-[5%] lg:mt-[2.5%] text-white'>
        <div className='max-w-4xl mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-center mb-6">
            <div className='col-span-1 lg:col-span-3'>
              <img className="h-auto items-center w-full md:-mx-8" src="/assets/img/plans/slogan.png" alt="" />
            </div>
            <div className='col-span-1 lg:col-span-2'>
              <img className="h-auto items-center w-full max-w-[240px] lg:max-w-none mx-auto lg:-mt-8" src="/assets/img/plans/logo-club.png" alt="" />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-start'>
            <div className='col-span-1 lg:col-span-2'>
              <p className='mb-8 text-center md:text-start md:w-11/12'>
                Conoce nuestros planes de suscripción y olvídate de hacer la misma fórmula todos los meses {' '}
                <b>+ Envío gratis a Lima Metropolitana</b>
              </p>
              <ul className='flex flex-col gap-4 text-center mb-4 justify-center md:justify-start'>
                {
                  renewals.map((renewal, index) => {
                    const percentage = renewal.percentage * 100
                    return <li key={index} className='border border-white bg-[rgba(255,255,255,.1)] rounded-lg p-4 w-full max-w-[300px] mx-auto'>
                      <h4 className='text-lg uppercase font-bold mb-2'>Renueva <span className='text-[#E2F57F]'>{renewal.name}</span> con</h4>
                      <span className='font-bold grid grid-cols-2 w-max mx-auto ps-4'>
                        <span className='text-6xl'>{percentage}</span>
                        <span className='flex flex-col text-start'>
                          <span className='text-3xl'>%</span>
                          <span className='text-xl font-light -mt-1.5'>DSCT</span>
                        </span>
                      </span>
                    </li>
                  })
                }
              </ul>
              <button href='/test' className='bg-[#8998DA] text-white text-sm px-8 py-3 rounded border border-white mx-auto block'>QUIERO SUSCRIBIRME</button>
            </div>
            <div className='col-span-1 lg:col-span-3 relative'>
              <div className='relative'>
                <img className='absolute -translate-x-1/2 -translate-y-1/2 mt-2 ms-1 w-32' src="/assets/img/plans/tag.png" alt="" />
                <img className='w-full mt-8 aspect-video md:aspect-auto rounded-lg object-cover object-top' src="/assets/img/plans/girls.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <figure className='h-0 md:h-[20vh]'></figure>
      </section>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties} showSlogan={false} showFooter={false} gradientStart='#99ADE8' gradientEnd='#F2A2D2' menuGradientEnd='#b8a9e0'>
    <Plans {...properties} />
  </Base>);
})