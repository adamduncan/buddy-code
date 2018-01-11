'use strict';

import Flickity from 'flickity';

const Carousel = () => {

  const elem = document.querySelector('.main-carousel');
  let flkty;

  function init () {
    flkty = new Flickity( elem, {
      // options
      cellAlign: 'left',
      contain: true
    });
  }

  // Expose vars back to export module
  return {
    init
  }

};

export default Carousel;