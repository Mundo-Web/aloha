import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import SelectColor from './components/Product/SelectColor';
import SelectPlan from './components/Product/SelectPlan';
import SelectProduct from './components/Product/SelectProduct';
import Checkout from './components/Product/Checkout';
import { Local } from 'sode-extend-react';


const Formula = ({ user_formula, other_formulas, items, publicKey, session, bundles, planes }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [otherFormulas, setOtherFormulas] = useState(other_formulas.sort((a, b) => a.created_at < b.created_at ? 1 : -1))

  const goToNextPage = (length = 1) => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + length);
    }
  };

  const goToPrevPage = (length = 1) => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - length);
    }
  };

  // Páginas
  const pages = [
    {
      name: 'Select Product',
      component: <SelectProduct formula={user_formula} otherFormulas={otherFormulas} setOtherFormulas={setOtherFormulas} items={items} goToNextPage={goToNextPage} bundles={bundles} />,
    },
    {
      name: 'Select Color',
      component: <SelectColor formula={user_formula} otherFormulas={otherFormulas} items={items} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} setSelectedPlan={setSelectedPlan} />,
    },
    {
      name: 'Select Plan',
      component: <SelectPlan formula={user_formula} otherFormulas={otherFormulas} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} setSelectedPlan={setSelectedPlan} session={session} bundles={bundles} planes={planes} />,
    },
    {
      name: 'Checkout',
      component: <Checkout formula={user_formula} otherFormulas={otherFormulas} goToPrevPage={goToPrevPage} publicKey={publicKey} selectedPlan={selectedPlan} goToNextPage={goToNextPage} bundles={bundles} planes={planes} session={session} />,
    }
  ];

  const CurrentPageComponent = pages[currentPageIndex].component;

  useEffect(() => {
    Local.set('vua_formula', user_formula)
  }, [null])

  return CurrentPageComponent
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Formula {...properties} />
  </Base>);
});