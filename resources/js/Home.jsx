import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Banner from './components/Home/Banner';
import Highlights from './components/Home/Highlights';
import HowItWorks from './components/Home/HowItWorks';
import Routine from './components/Home/Routine';
import Highlights2 from './components/Home/Highlights2';
import Supplies from './components/Home/Supplies';
import Testimonies from './components/Home/Testimonies';
import CallToAction from './components/Home/CallToAction';
import Popups from './components/Home/Popups';

const Home = ({ sliders, items, supplies, testimonies, popups }) => {
  return (<>
    <Banner sliders={sliders} />
    <hr className='h-4 bg-transparent border-none' />
    <Highlights />
    <HowItWorks />
    <Routine items={items} />
    <Highlights2 />
    <Supplies supplies={supplies} />
    <Testimonies testimonies={testimonies} />
    <CallToAction />
    <Popups popups={popups} />
  </>);
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})