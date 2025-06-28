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

const Hostings = ({ services }) => {
  const features = [
    {
      "icon": "mdi-language-php",
      "name": "Multiple PHP versions to choose from",
      "description": "Nisi pellentesque adipiscing vestibulum suspendisse elementum. Aliquet quam in at nulla quam purus."
    },
    {
      "icon": "mdi-domain",
      "name": "Managing subdomains",
      "description": "Suspendisse volutpat non adipiscing nulla dui egestas consectetur interdum adipiscing. Lorem."
    },
    {
      "icon": "mdi-chart-line",
      "name": "Account load statistics",
      "description": "Odio ultricies senectus sed risus risus consectetur duis. Vel nullam lectus arcu, massa ut. Lacinia."
    },
    {
      "icon": "mdi-shield-check",
      "name": "Anti-spam and anti-virus mail protection",
      "description": "Arcu sodales augue porttitor tellus sollicitudin sed enim cursus. Velit amet ultrices adipiscing porttitor."
    },
    {
      "icon": "mdi-view-dashboard",
      "name": "DirectAdmin panel",
      "description": "Iaculis quis egestas eu massa morbi in urna. Velit tellus cras tempor rhoncus id ornare sem mauris."
    }
  ]

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
              {services.map((plan, index) => <th key={index} className='text-center py-4 px-6'>{plan.name}</th>)}
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

    {/* Migration Section */}
    <fm.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-16 items-start max-w-7xl mx-auto">
          <fm.div
            variants={fadeInUp}
            className='md:col-span-3'>
            <h2 className="text-4xl font-bold mb-6">Common features of hosting accounts</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nunc, facilisis bibendum enim nunc, facilisi ac phasellus aenean ultricies. Orci velit nunc, adipiscing auctor. In amet, urna, neque, consectetur penatibus velit nunc nullam. Scelerisque suspendisse ut gravida aliquam habitant.
            </p>
          </fm.div>

          <fm.div
            variants={fadeInUp}
            className="relative md:col-span-2">
            <ul>
              {
                features.map((feature, index) => {
                  return <li key={index} className='flex gap-6 mb-4'>
                    <i className={`mdi mdi-36px ${feature.icon}`}></i>
                    <div>
                      <span className='font-bold block mb-1'>{feature.name}</span>
                      <span className='block text-gray-600'>{feature.description}</span>
                    </div>
                  </li>
                })
              }
            </ul>
          </fm.div>
        </div>
      </div>
    </fm.section>

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
              Professional service at the highest level
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hosting is a basic service that allows not only to publish a website, but also an online application. It is a space on the server that operates around the clock. Our company offers the best solutions - with them the smooth and fast operation of your site will be ensured at all times.
            </p>
            <fm.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white">
              Transfer your hosting
            </fm.button>
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
            <h2 className="text-4xl font-bold mb-6">The solution you are looking for</h2>
            <p className="text-lg text-gray-600 mb-8">
              The operation of hosting is based on a server owned by us. First, the user obtains a domain name, which is, in simplest terms, the address of his site. The next, equally important step is the configuration of nameservers for the new domain. This is extremely important, because it allows the browser to know which server it should connect to.
            </p>
            <fm.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white">
              Contact us
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
        <fm.div
          variants={fadeInUp}
          className='max-w-7xl mx-auto text-center relative rounded-lg'>
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