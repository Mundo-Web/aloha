import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Aos from 'aos';

const FAQs = ({ faqs }) => {
  const [opened, setOpened] = useState(faqs[0].id)

  useEffect(() => {
    Aos.init()
  }, [null])

  return (
    <>
      <section className='px-[5%] md:px-[7.5%] lg:px-[10%] pb-[5%] mt-[7.5%] md:mt-[5%] lg:mt-[2.5%] text-white'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className="text-2xl font-bold mb-8">Preguntas frecuentes</h1>
        </div>
        <div className='max-w-2xl mx-auto text-sm flex flex-col gap-4'>
          {
            faqs.map((faq, index) => {
              return <div key={index} className='bg-white rounded-xl text-[#404040] shadow-md' data-aos='fade-up'>
                <h1 className='flex justify-between font-bold px-6 py-4 bg-[#F7F7E7] rounded-xl shadow-md cursor-pointer ' onClick={() => setOpened(opened == faq.id ? null : faq.id)}>
                  <span>{index + 1}. {faq.name}</span>
                  {
                    opened == faq.id
                      ? <i className='mdi mdi-arrow-up'></i>
                      : <i className='mdi mdi-arrow-down'></i>
                  }
                </h1>
                <p className={`px-6 py-3 transition-all ${opened == faq.id ? 'show opacity-1' : 'hidden opacity-0'}`}>{faq.description}</p>
              </div>
            })
          }
        </div>
      </section>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties} showSlogan={false}>
    <FAQs {...properties} />
  </Base>);
})