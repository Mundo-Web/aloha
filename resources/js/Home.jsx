import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import BackgroundHome from './Components/Tailwind/images/bg-home.png'
import BotAloha from './Components/Tailwind/images/bot-aloha.svg'
import ReasonsToChange from './Components/Tailwind/images/reasons-to-change.svg'
import Infrastructure from './Components/Tailwind/images/infrastructure.png'
import TopPackage from './Components/Tailwind/images/top-package.png'
import PlanCard from './Components/Tailwind/Home/PlanCard';

const Home = ({ sliders, items, supplies, testimonies, popups }) => {
  const planes = [
    {
      name: "Básico",
      description: "Para principiantes y emprendedores que quieren tener un sitio web",
      price: "S/. 350.00",
      period: "anual",
      features: [
        "1 Sitio Web",
        "10 GB de almacenamiento",
        "Tráfico ilimitado",
        "1 Base de datos MySQL",
        "Certificado SSL gratuito",
        "Soporte 24/7",
      ],
    },
    {
      name: "Avanzado",
      description: "Para emprendedores que quieren tener un sitio web más avanzado",
      price: "S/. 390.00",
      period: "anual",
      popular: true,
      features: [
        "5 Sitios Web",
        "25 GB de almacenamiento",
        "Tráfico ilimitado",
        "5 Bases de datos MySQL",
        "Certificado SSL gratuito",
        "Soporte prioritario 24/7",
        "Backup automático",
      ],
    },
    {
      name: "Premium",
      description: "Para emprendedores que quieren tener un sitio web aún más avanzado",
      price: "S/. 468.00",
      period: "anual",
      features: [
        "Sitios Web ilimitados",
        "50 GB de almacenamiento",
        "Tráfico ilimitado",
        "Bases de datos ilimitadas",
        "Certificado SSL gratuito",
        "Soporte VIP 24/7",
        "Backup automático",
        "CDN gratuito",
      ],
    },
  ];
  return (<div className="min-h-screen bg-white">
    <section className="text-white py-20 relative overflow-visible">
      <img src={BackgroundHome} className='absolute h-full w-full top-0 object-cover object-bottom z-0 select-none' alt='Fondo AlohaPeru' />
      <div className="container relative mx-auto px-4 grid justify-center md:grid-cols-2 gap-12 items-center z-20 bg-transparent">
        <div className='h-max'>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight md:text-start text-center"><u className='underline-offset-4'>El éxito</u> empieza con el dominio</h1>
          <p className="text-xl mb-8 opacity-90 md:text-start text-center">
            ¡Un dominio atractivo e inventivo es la base del éxito!
          </p>
          <div className="flex gap-2 max-w-md mx-auto md:mx-0">
            <input placeholder="Busca tu dominio aquí" className="bg-white text-black border-0 h-12 px-6 rounded outline-none w-full" />
            <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded">
              <i className="w-5 h-5 mdi mdi-magnify" />
            </button>
          </div>
          <p className="text-sm mt-4 opacity-75 md:text-start text-center">Empieza desde S/. 45.00 al año</p>
        </div>
        <div className="relative h-full w-full">
          <img src={BotAloha} className="w-10/12 z-30 -top-8 mx-auto block h-full object-contain">
          </img>
        </div>
      </div>
    </section>

    {/* Pricing Section */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Emprende</h2>
          <p className="text-xl text-gray-600">
            Quieres emprender y tienes una web, y no sabes por donde empezar, este es tu buen punto de partida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {planes.map((plan, index) => <PlanCard key={index} {...plan} />)}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20">
      <div className="container mx-auto px-4 pb-80">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="w-full h-full mx-auto relative">
              <img src={ReasonsToChange} alt="" className='w-full h-full' />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Buenas razones para cambiar a AlohaPeru!</h2>
            <p className="text-lg text-gray-600 mb-8">
              AlohaPerú ofrece tecnologías de alta calidad para que sus sitios web funcionen más rápido. Puede elegir cualquier versión de PHP, desde la 5.x hasta la 8.x, y usar APcache y LSCache, que, en combinación con el protocolo HTTP/2, garantizan un rendimiento web muy eficiente.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <a className="mdi mdi-database-sync mdi-48px text-blue-600 mr-2" />
                <h3 className="font-semibold mb-2">Copias de seguridad</h3>
                <p className="text-sm text-gray-600">
                  Servidor web muy rápido, que es LiteSpeed, que en combinación con OPcache y LSCache, permite una aceleración radical del funcionamiento de los sitios web.
                </p>
              </div>

              <div>
                <i className="mdi mdi-rocket-launch mdi-48px text-blue-600 mr-2" />
                <h3 className="font-semibold mb-2">El sitio más rápido</h3>
                <p className="text-sm text-gray-600">
                  InfHost le brinda la posibilidad de disfrutar de los beneficios de HTTP/2. Puede usar recursos para cargar en paralelo e incluso cargarlos ANTES de que el navegador los solicite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Popular Package Section */}
    <section className="py-20 bg-gray-50">
      <div className="container  mx-auto px-4">
        <div className='relative w-full aspect-video -mb-80 max-w-7xl mx-auto'>
          <img
            className='absolute left-0 right-0 w-full h-auto -translate-y-[400px]'
            src={Infrastructure}
            alt="Infraestructura InfHost segura y eficiente" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          <div className='md:col-span-2'>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">El paquete elegido con mayor frecuencia</h2>
            <p className="text-lg text-gray-600 mb-8">
              Apueste por la estabilidad y seguridad operacional y disfrute de servicios de hosting del más alto nivel.
            </p>

            {/* Team illustration placeholder */}
            <img src={TopPackage} alt='El paquete mas frecuente' />
          </div>

          <div>
            <PlanCard {...planes.find(plan => plan.popular)} />
          </div>
        </div>
      </div>
    </section>

    {/* Migration Section */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Free migration</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nos encargamos de migrar tu sitio web actual sin costo adicional. Nuestro equipo técnico se asegura de
              que la transición sea perfecta y sin interrupciones.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700">Solicitar migración gratuita</button>
          </div>

          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <i className="w-10 h-10 mdi mdi-earth text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Support Section */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-green-500 rounded-lg flex items-center justify-center">
              <i className="w-16 h-16 mdi mdi-headphones text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Brindamos servicios las 24 horas del día, los 365 días del año
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro equipo de soporte técnico está disponible en todo momento para resolver cualquier consulta o
              problema que puedas tener.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700">Contactar soporte</button>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA Section */}
    <section className="py-20 bg-gradient-to-br from-[#2D1B69] to-[#4C3A9B] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">¿Te convencemos?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Únete a miles de clientes satisfechos que confían en AlohaPeru para su presencia online
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">Comenzar ahora</button>
      </div>
    </section>

    {/* Footer */}
  </div>);
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})