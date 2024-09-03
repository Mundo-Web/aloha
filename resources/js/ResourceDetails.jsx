import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import TailwindBase from '@Tailwind/Base';
import Header from './Components/Resources/Header';
import Sidebar from './Components/Resources/Sidebar';
import MainContent from './Components/Resources/MainContent';
import HtmlContent from './Utils/HtmlContent';

const ResourceDetails = ({ resource }) => {
  const link = resource.social_media === 'youtube'
    ? `https://i.ytimg.com/vi/${resource.media_id}/hqdefault.jpg`
    : `/api/cover/thumbnail/${resource.media_id}`;
  const ref = `/resources/${resource.id}`;

const tags = resource.tags.split(',').map(x => x.trim()).filter(Boolean)

  return (
    <>
      <main className='flex flex-col mt-16'>
        <header className="flex flex-col justify-center self-center max-w-full px-[5%]" style={{ paddingTop: '15%' }}>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-center text-teal-950 max-md:max-w-full">
            {resource.name}
          </h1>
          <div className="flex flex-wrap gap-4 justify-center items-center mt-1 w-full text-sm font-medium leading-tight max-md:max-w-full">
            <time className="self-stretch my-auto text-teal-950">{moment(resource.created_at).format('LLL')}</time>
            <span className='text-neutral-600'>|</span>
            <div className="self-stretch my-auto text-red-500">
              Categoria: <span className="text-red-500">{resource.specialty.name}</span>
            </div>
          </div>
        </header>
        <section className='p-[5%]'>
          <img className='block mx-auto aspect-video object-cover object-center w-full max-w-[600px]' src={link} alt="" />
        </section>
        <section className='p-[5%]'>
          <HtmlContent className='max-w-[720px] mx-auto prose' html={resource.description} />
        </section>
        <section className='p-[5%]'>
        <div className="flex flex-wrap gap-1 items-center mt-12 w-full text-sm max-md:mt-10 max-md:max-w-full">
          <div className="self-stretch my-auto leading-snug text-teal-950">Etiquetas</div>
          <div className="self-stretch my-auto font-medium leading-tight text-red-500">
            {tags.map((tag, index) => (
              <React.Fragment key={tag}>
                #{tag}{index < tags.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        </div>
        <hr className="mt-12 w-full border-t border-gray-200 max-md:mt-10 max-md:max-w-full" />

        <nav className="flex flex-wrap gap-10 justify-center items-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
            <a href={ref} className="flex gap-2 items-center w-full text-sm font-medium leading-tight text-red-500 whitespace-nowrap max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b35409f5889662e48e1cd8f185bae56bc6013cb4af69297f599d86f3479b1fdb?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
              <span className="self-stretch my-auto">Anterior</span>
            </a>
            <div className="mt-3 text-base font-bold leading-5 text-teal-950 max-md:max-w-full">
              {resource.name}
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink self-stretch my-auto leading-tight basis-0 min-w-[240px] max-md:max-w-full">
            <a href={ref} className="flex gap-2 items-center justify-end w-full text-sm font-medium text-red-500 whitespace-nowrap max-md:max-w-full">
              <span className="self-stretch my-auto">Próximo</span>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc59cb1b208504ad7498c423ec7896da85622a29fdd7cbb6d6dc4291092d6727?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
            </a>
            <div className="mt-3 text-base font-bold text-right text-teal-950 max-md:max-w-full">
              {resource.name}
            </div>
          </div>
        </nav>
        </section>
      </main>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<TailwindBase>
    <ResourceDetails {...properties} />
  </TailwindBase>);
})