import type { NextPage } from 'next'
import React from 'react';
import { NextSeo } from 'next-seo';
import { Base } from '../layout/base';

const Home: NextPage = () => {
  return(
    <Base>
      <NextSeo
        title="Home"
        titleTemplate = '%s - HRKU Client'
        description="Hrku Home Description"
      />
      ini content
    </Base>
  );
}

export default Home
