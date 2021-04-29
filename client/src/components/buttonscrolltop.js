import React from 'react';
import { animateScroll } from 'react-scroll';

export const ButtonScrollTop = () => {
  const scrollToTopHandler = () => {
    animateScroll.scrollToTop({
      duration: 2000,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div className="buttonScroll" onClick={scrollToTopHandler}>
      U P
    </div>
  );
};
