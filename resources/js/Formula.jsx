import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import SelectColor from './Components/Product/SelectColor';
import SelectPlan from './Components/Product/SelectPlan';
import SelectProduct from './Components/Product/SelectProduct';
import Checkout from './Components/Product/Checkout';
import { Local } from 'sode-extend-react';

const Formula = (properties) => {
  const { user_formula, other_formulas, items, recaptchaSiteKey, defaultColors, publicKey, session: sessionDB, bundles, planes, free_shipping, free_shipping_minimum_amount, free_shipping_amount, free_shipping_zones, free_shipping_banner, } = properties
  const [session, setSession] = useState(sessionDB)
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
      component: <SelectProduct
        formula={user_formula}
        otherFormulas={otherFormulas}
        setOtherFormulas={setOtherFormulas}
        items={items}
        goToNextPage={goToNextPage}
        bundles={bundles}
        freeShipping={free_shipping}
        freeShippingBannerText={free_shipping_banner} />,
    },
    {
      name: 'Select Color',
      component: <SelectColor formula={user_formula} otherFormulas={otherFormulas} items={items} defaultColors={defaultColors} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} setSelectedPlan={setSelectedPlan} />,
    },
    {
      name: 'Select Plan',
      component: <SelectPlan formula={user_formula} otherFormulas={otherFormulas} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} setSelectedPlan={setSelectedPlan} session={session} setSession={setSession} bundles={bundles} planes={planes} recaptchaSiteKey={recaptchaSiteKey} />,
    },
    {
      name: 'Checkout',
      component: <Checkout
        formula={user_formula}
        otherFormulas={otherFormulas}
        goToPrevPage={goToPrevPage}
        publicKey={publicKey}
        selectedPlan={selectedPlan}
        goToNextPage={goToNextPage}
        bundles={bundles}
        planes={planes}
        session={session}
        freeShipping={free_shipping}
        freeShippingMinimumAmount={free_shipping_minimum_amount}
        freeShippingAmount={free_shipping_amount}
        freeShippingZones={free_shipping_zones} />,
    }
  ];

  const CurrentPageComponent = pages[currentPageIndex].component;

  useEffect(() => {
    Local.set('vua_formula', user_formula)
  }, [null])

  return <Base {...properties} session={session}>{CurrentPageComponent}</Base>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Formula {...properties} />);
});