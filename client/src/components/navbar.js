import React, { useState, useEffect } from 'react';
import { NavbarLarge } from './navbarlarge';
import { NavbarMedium } from './navbarmedium';

export const Navbar = () => {
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, []);
  const handleWidth = () => {
    setWidth(document.documentElement.clientWidth);
  };

  return (
    <>
      {width > 780 && <NavbarLarge />}
      {width <= 780 && <NavbarMedium />}
    </>
  );
};
