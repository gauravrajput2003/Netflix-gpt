import React from 'react';
import Header from './Header';
import useNowPlaying from '../hooks/useNowPlaying';
import Maincontainer from './maincontainer';

const Browse = () => {
  useNowPlaying();

  return (
    <div>
      <Header />
      <Maincontainer />
    </div>
  );
};

export default Browse;