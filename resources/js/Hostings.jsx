import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Tailwind/Base';
import PlanCard from './Components/Tailwind/Home/PlanCard';
import { motion as fm } from 'framer-motion';

// BEGIN: Images
import BackgroundHome from './Components/Tailwind/images/bg-home.png'
import BotAloha from './Components/Tailwind/images/bot-aloha.svg'
import ReasonsToChange from './Components/Tailwind/images/reasons-to-change.svg'
import Infrastructure from './Components/Tailwind/images/infrastructure.png'
import TopPackage from './Components/Tailwind/images/top-package.png'
import FreeMigration from './Components/Tailwind/images/free-migration.png'
import Support247 from './Components/Tailwind/images/support-24-7.png'
// END: Images

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Hostings = ({ }) => {
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
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-white py-20 relative overflow-visible">
      <img src={BackgroundHome} className='absolute h-full w-full top-0 object-cover object-top z-0 select-none' alt='Fondo AlohaPeru' />
      <div className="container relative mx-auto px-4 text-center z-20 bg-transparent">
        <div>
          <span className='block mx-auto w-max bg-[#FF8D3A] bg-opacity-10 text-[#FF8D3A] rounded-full px-2 mb-4 py-0.5 text-sm'>Pricing plans</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            WWW Hosting
          </h1>
          <p className="text-xl w-full opacity-90">
            Check out the details of our virtual server offering
          </p>
        </div>
      </div>
    </fm.section>

    {/* Pricing Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <fm.table
          variants={staggerContainer}
          className="w-full max-w-7xl mx-auto">
          <thead>
            <tr>
              <th className="py-4 px-6"></th>
              {planes.map((plan, index) => <th key={index} className='text-center py-4 px-6'>{plan.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* {planes.map((plan, index) => (
              <fm.tr key={index} variants={fadeInUp}>
                <td className="py-4 px-6">
                  <PlanCard {...plan} />
                </td>
              </fm.tr>
            ))} */}
          </tbody>
        </fm.table>
      </div>
    </fm.section>

    {/* Features Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20">
      <div className="container mx-auto px-4 pb-80">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <fm.div
            variants={fadeInUp}
            className="relative">
            <div className="w-full h-full mx-auto relative">
              <img src={ReasonsToChange} alt="" className='w-full h-full' />
            </div>
          </fm.div>
          <fm.div variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-6">Buenas razones para cambiar a AlohaPeru!</h2>
            <p className="text-lg text-gray-600 mb-8">
              AlohaPerú ofrece tecnologías de alta calidad para que sus sitios web funcionen más rápido. Puede elegir cualquier versión de PHP, desde la 5.x hasta la 8.x, y usar APcache y LSCache, que, en combinación con el protocolo HTTP/2, garantizan un rendimiento web muy eficiente.
            </p>

            <fm.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6">
              <fm.div variants={fadeInUp}>
                <a className="mdi mdi-database-sync mdi-48px text-blue-600 mr-2" />
                <h3 className="font-semibold mb-2">Copias de seguridad</h3>
                <p className="text-sm text-gray-600">
                  Servidor web muy rápido, que es LiteSpeed, que en combinación con OPcache y LSCache, permite una aceleración radical del funcionamiento de los sitios web.
                </p>
              </fm.div>

              <fm.div variants={fadeInUp}>
                <i className="mdi mdi-rocket-launch mdi-48px text-blue-600 mr-2" />
                <h3 className="font-semibold mb-2">El sitio más rápido</h3>
                <p className="text-sm text-gray-600">
                  InfHost le brinda la posibilidad de disfrutar de los beneficios de HTTP/2. Puede usar recursos para cargar en paralelo e incluso cargarlos ANTES de que el navegador los solicite.
                </p>
              </fm.div>
            </fm.div>
          </fm.div>
        </div>
      </div>
    </fm.section>

    {/* Popular Package Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <fm.div
          variants={fadeInUp}
          className='relative w-full aspect-video -mb-80 max-w-7xl mx-auto'>
          <img
            className='absolute left-0 right-0 w-full h-auto -translate-y-[400px]'
            src={Infrastructure}
            alt="Infraestructura InfHost segura y eficiente" />
        </fm.div>
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          <fm.div
            variants={fadeInUp}
            className='md:col-span-2'>
            <h2 className="text-4xl font-bold mb-6">El paquete elegido con mayor frecuencia</h2>
            <p className="text-lg text-gray-600 mb-8">
              Apueste por la estabilidad y seguridad operacional y disfrute de servicios de hosting del más alto nivel.
            </p>
            <img src={TopPackage} alt='El paquete mas frecuente' />
          </fm.div>

          <fm.div variants={fadeInUp}>
            <PlanCard {...planes.find(plan => plan.popular)} />
          </fm.div>
        </div>
      </div>
    </fm.section>

    {/* Migration Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-16 items-center max-w-7xl mx-auto">
          <fm.div
            variants={fadeInUp}
            className='md:col-span-3'>
            <h2 className="text-4xl font-bold mb-6">Free migration</h2>
            <p className="text-lg text-gray-600 mb-8">
              ¿Ya no estás satisfecho con tu proveedor de hosting actual? Pásate a AlohaPerú. No tienes que preocuparte por nada, y mucho menos, no necesitas conocimientos técnicos para hacerlo. Nuestros administradores migrarán tu sitio web lo antes posible y, lo más importante, lo harán de forma eficiente y simn costo adicional. Tu sitio web, correo electrónico y bases de datos funcionarán mucho más rápido que antes.
            </p>
            <fm.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white">
              Transfiere tu alojamiento, Ya!
            </fm.button>
          </fm.div>

          <fm.div
            variants={fadeInUp}
            className="relative md:col-span-2">
            <img src={FreeMigration} alt="Brindamos migraciones gratis" className='w-full h-full object-contain object-center' />
          </fm.div>
        </div>
      </div>
    </fm.section>

    {/* Support Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-16 items-center max-w-7xl mx-auto">
          <fm.div
            variants={fadeInUp}
            className="relative md:col-span-2">
            <img src={Support247} alt="Brindamos soporte las 24 horas del dia" className='w-full h-full object-contain object-center' />
          </fm.div>

          <fm.div
            variants={fadeInUp}
            className='md:col-span-3'>
            <h2 className="text-4xl font-bold mb-6">
              Brindamos servicios las 24 horas del día, los 365 días del año.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              El departamento de soporte está disponible 24/7, los 7 días de la semana, durante todo el año. Por lo tanto, no tiene que preocuparse de que su sitio web deje de funcionar repentinamente ni de tener que esperar varias horas para recibir una respuesta del soporte del operador actual.
            </p>
            <fm.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white">
              Contáctanos
            </fm.button>
          </fm.div>
        </div>
        <fm.div
          variants={fadeInUp}
          className='max-w-7xl mx-auto text-center mt-20 relative rounded-lg'>
          <img src={BackgroundHome} className='absolute h-full w-full top-0 object-cover object-bottom z-0 select-none rounded-lg' alt='Fondo AlohaPeru' />
          <div className='relative z-10 p-20 text-white'>
            <h2 className="text-4xl font-bold mb-6">¿Te convencemos?</h2>
            <p className="text-xl mb-8 mx-auto opacity-90">
              Claro que lo hicimos, en lo que mas debes fijarte es en la calidad del servicio, ven y revisa nuestros planes
            </p>
            <fm.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded">
              Mira nuestros planes
            </fm.button>
          </div>
        </fm.div>
      </div>
    </fm.section>
  </div>);
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties} title='Hosting'>
    <Hostings {...properties} />
  </Base>);
})