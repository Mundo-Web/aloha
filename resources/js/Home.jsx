import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import BackgroundHome from './Components/Tailwind/images/bg-home.png'
import BotAloha from './Components/Tailwind/images/bot-aloha.svg'

const Home = ({ sliders, items, supplies, testimonies, popups }) => {
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Básico",
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
          ].map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? "ring-2 ring-blue-500" : ""} px-6 py-8 bg-white rounded-lg shadow`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Más Popular</span>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold">{plan.name}</div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>
              <div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <i className="w-5 h-5 mdi mdi-check text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700">Elegir Plan</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Buenas razones para cambiar a AlohaPeru</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ofrecemos la mejor tecnología y soporte para que tu sitio web funcione perfectamente las 24 horas del
              día.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <a className="w-6 h-6 mdi mdi-security text-blue-600 mr-2" />
                  <h3 className="font-semibold">Máxima seguridad</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Protección avanzada contra malware y ataques DDoS para mantener tu sitio seguro.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <i className="w-6 h-6 mdi mdi-light-flood-down text-blue-600 mr-2" />
                  <h3 className="font-semibold">Alta velocidad</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Servidores optimizados con SSD y CDN para cargas ultra rápidas.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-96 h-96 mx-auto relative">
              {/* Rocket illustration placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <i className="w-12 h-12 mdi mdi-light-flood-down text-orange-500" />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-16 right-16 w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-16 left-16 w-6 h-6 bg-pink-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Infrastructure Section */}
    <section className="py-20 bg-gradient-to-br from-[#2D1B69] to-[#4C3A9B] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Safe and efficient, without infrastructure</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Nuestra infraestructura en la nube te permite escalar sin preocupaciones técnicas
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">Conoce más detalles</button>

        <div className="mt-16 relative">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <i className="w-10 h-10 mdi mdi-security text-[#2D1B69]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Popular Package Section */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">El paquete elegido con mayor frecuencia</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro plan más popular incluye todo lo que necesitas para comenzar tu presencia online de manera
              profesional.
            </p>

            {/* Team illustration placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <i className="w-16 h-16 mdi mdi-account-multiple text-white" />
            </div>
          </div>

          <div>
            <div className="max-w-sm mx-auto">
              <div className="bg-orange-500 text-white text-center">
                <div className="bg-orange-600 text-white mb-2">Más vendido</div>
                <div className="text-3xl font-bold">$55.99</div>
                <p className="opacity-90">por mes</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="w-5 h-5 mdi mdi-check text-green-500 mr-3" />
                    <span className="text-sm">Hosting ilimitado</span>
                  </li>
                  <li className="flex items-center">
                    <i className="w-5 h-5 mdi mdi-check text-green-500 mr-3" />
                    <span className="text-sm">Dominio gratuito</span>
                  </li>
                  <li className="flex items-center">
                    <i className="w-5 h-5 mdi mdi-check text-green-500 mr-3" />
                    <span className="text-sm">SSL certificado</span>
                  </li>
                  <li className="flex items-center">
                    <i className="w-5 h-5 mdi mdi-check text-green-500 mr-3" />
                    <span className="text-sm">Soporte 24/7</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700">Elegir este plan</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Migration Section */}
    <section className="py-20 bg-gray-50">
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
    <section className="py-20">
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