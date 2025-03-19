import React, { useState } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';

import BlogHeader from './components/Blog/BlogHeader';
import Filter from './components/Blog/Filter';
import Results from './components/Blog/Results';

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