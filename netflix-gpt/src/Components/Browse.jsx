import React from 'react';
import Header from './Header';
import useNowPlaying from '../hooks/useNowPlaying';
import Maincontainer from './maincontainer';
import Secondarycontainer from './Secondarycontainer';

const Browse = () => {
  useNowPlaying();

  return (
    <div>
      <Header />
      <Maincontainer />
      <Secondarycontainer/>
    </div>
  );
};

export default Browse;