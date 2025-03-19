import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Purchases from './components/Dashboard/Purchases';
import Information from './components/Dashboard/Information';
import Formulas from './components/Dashboard/Formulas';
import Logout from './Actions/Logout';


const MyAccount = ({ session, formulas, gifts }) => {

  const [activeComponent, setActiveComponent] = useState('formulas');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'formulas':
        return <Formulas items={formulas} />;
      case 'purchases':
        return <Purchases />;
      case 'gift':
        return <Purchases />;
      case 'informacion':
        return <Information session={session} />;
      default:
        return <Formulas items={formulas} />;
    }
  };


  return (
    <>
      <section className='px-[5%] md:px-[7.5%] lg:px-[10%] py-[5%] bg-[#F9F3EF] text-[#404040]'>


        <h2 className='text-2xl font-bold mb-4'>
          ¡Bienvenid@, {session.name.split(' ')[0]}! ✨
        </h2>



        <div className='flex flex-col md:flex-row gap-5'>

          <div className='w-full md:w-1/3 lg:w-1/4 md:bg-[#EFBEC1] rounded-xl'>
            <ul className='text-center md:text-start text-[#404040] md:text-white grid sm:grid-cols-2 md:flex md:flex-col gap-2 text-sm font-light tracking-wider md:p-4'>
              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'formulas' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('formulas')} >
                <i className='mdi mdi-flask me-1'></i>
                Fórmulas creadas
              </li>

              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'purchases' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('purchases')} >
                <i className='mdi mdi-cart-outline me-1'></i>
                Mis compras
              </li>
              {
                gifts.length > 0 &&
                <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'gift' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                  onClick={() => setActiveComponent('gift')} >
                  <i className='mdi mdi-gift-outline me-1'></i>
                  Regala un Vuá
                </li>
              }
              <li className={`px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer ${activeComponent === 'informacion' && 'bg-[#EFBEC1] md:bg-[#ffffff33] text-white'}`}
                onClick={() => setActiveComponent('informacion')} >
                <i className='mdi mdi-account me-1'></i>
                Información personal
              </li>

              <li className='px-4 py-2 border-[#404040] border md:border-none hover:bg-[#EFBEC1] md:hover:bg-[#ffffff33] rounded cursor-pointer' onClick={Logout}>
                <i className='mdi mdi-close me-1'></i>
                Cerrar sesión
              </li>
            </ul>
          </div>

          <div className='bg-white p-4 w-full md:w-2/3 lg:w-3/4 rounded-xl'>

            {renderComponent()}

          </div>

        </div>




      </section>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <Base {...properties}>
      <MyAccount {...properties} />
    </Base>
  );
});
