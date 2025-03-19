import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './components/Tailwind/Base';
import SupplieCard from './components/Supplies/components/SupplieCard';

const Supplies = ({ supplies = [] }) => {
  return (
    <section className='p-[5%] py-[10%] md:py-[5%] bg-[#FBF5F1]'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-[10%] md:mb-[5%]'>
          <h2 className='text-2xl font-bold'>+50 Ingredientes naturales</h2>
          <p>Tu fórmula única cumplirá tus objetivos gracias a algunos ingredientes como:</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8'>
          {supplies.map((supplie, index) => <SupplieCard key={index} {...supplie} />)}
        </div>
      </div>
    </section>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Supplies {...properties} />
  </Base>);
})