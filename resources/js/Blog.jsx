import React, { useState } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';

import BlogHeader from './Components/Blog/BlogHeader';
import Filter from './Components/Blog/Filter';
import Results from './Components/Blog/Results';

function Blog({categories}) {

  const [filter, setFilter] = useState({
    category: null,
    search: null,
    sortOrder: 'asc',
  })

  return <>
    <BlogHeader />
    <Filter categories={categories} filter={filter} setFilter={setFilter} />
    <Results filter={filter} />
  </>
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Blog {...properties} />
  </Base>);
})