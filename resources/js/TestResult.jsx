import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import SupplieCard from './components/Supplies/components/SupplieCard';
import ProgressBar from './components/Test/components/ProgressBar';
import { Local } from 'sode-extend-react';
import Base from './components/Tailwind/Base';
import NewFormulaButton from './components/Product/components/NewFormulaButton';

const TestResult = ({ user_formula, hair_goals, supplies }) => {

  const has_treatment = user_formula.has_treatment.correlative
  const scalp_type = user_formula.scalp_type.correlative

  const hydration = {
    oily: { percent: '25%', label: 'BAJO', },
    normal: { percent: '55%', label: 'MODERADO', },
    dry: { percent: '95%', label: 'ALTO', }
  }

  const heat_damage = { percent: '25%', label: 'BAJO' }
  if (has_treatment == 'true') {
    if (scalp_type == 'normal') {
      heat_damage.percent = '55%'
      heat_damage.label = 'MODERADO'
    }
    if (scalp_type == 'dry') {
      heat_damage.percent = '95%'
      heat_damage.label = 'ALTO'
    }
  }

  useEffect(() => {
    Local.set('vua_formula', user_formula)
    Local.delete('vua_test')
    Local.delete('vua_cart')
  }, [null])

  return (
    <>
      <section className='bg-[#FBF5F1] px-[5%] md:px-[7.5%] lg:px-[10%] pb-[5%] text-[#404040]'>
        <div className='p-[5%] py-[15%] md:py-[10%] lg:py-[5%] text-center '>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl mb-2">¡<b className='font-bold text-[#303030]'>Tu fórmula única</b> está lista!</h1>
            <p className="mb-4 text-sm font-extralight">Conoce tus resultados y análisis de tu cabello</p>
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {
                hair_goals.map((goal, index) => {
                  return <span key={index} className='px-4 py-2 bg-[#F7C2C6] rounded-full text-xs font-bold'>{goal.description}</span>
                })
              }
            </div>
          </div>
        </div>
        <div className='px-[5%] pb-[15%] md:pb-[10%] lg:pb-[5%] text-start'>
          <div className='max-w-3xl mx-auto'>

            <div className='mb-2 flex justify-between text-sm'>
              <span>Tu falta de hidratación en el cabello:</span>
              <span className='font-bold'>{hydration[scalp_type].label}</span>
            </div>
            <ProgressBar className='w-full h-3 mb-6' width={hydration[scalp_type].percent} color='#C5B8D4' />

            <div className='mb-2 flex justify-between text-sm'>
              <span>Tu nivel de daño químico en el cabello:</span>
              <span className='font-bold'>{has_treatment == 'true' ? 'ALTO' : 'MODERADO'}</span>
            </div>
            <ProgressBar className='w-full h-3 mb-6' width={has_treatment == 'true' ? '95%' : '55%'} color='#C5B8D4' />

            <div className='mb-2 flex justify-between text-sm'>
              <span>Tu nivel de daño por calor en el cabello:</span>
              <span className='font-bold'>{heat_damage.label}</span>
            </div>
            <ProgressBar className='w-full h-3' width={heat_damage.percent} color='#C5B8D4' />
          </div>
        </div>
        <div className='text-center'>
          <button href={`/formula/${user_formula.id}`} className='bg-[#C5B8D4] text-white text-sm px-16 py-3 rounded mt-4 tracking-widest'>
            <i className='mdi mdi-cart me-1'></i>
            COMPRAR
          </button>
          <NewFormulaButton formula={user_formula} />
        </div>
        <div className='p-[5%] py-[15%] md:py-[10%] lg:py-[5%] text-start '>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl">¡<b>Tu fórmula única</b> está lista!</h1>
            <p className="mb-8 text-sm font-extralight">Conoce tus resultados y análisis de tu cabello</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mb-8'>
              {
                supplies.map((supply, index) => {
                  return <SupplieCard key={index} {...supply} />
                })
              }
            </div>
            <div className='text-center'>
              <button href={`/formula/${user_formula.id}`} className='bg-[#C5B8D4] text-white text-sm px-16 py-3 rounded mt-4 tracking-widest'>
                <i className='mdi mdi-cart me-1'></i>
                COMPRAR
              </button>
              <NewFormulaButton formula={user_formula} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <TestResult {...properties} />
  </Base>);
})