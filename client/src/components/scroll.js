import React, { useEffect, useState } from 'react';
import { ButtonScrollTop } from './buttonscrolltop';

export const Scroll = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <>
      {scroll > document.documentElement.clientHeight - 100 && (
        <ButtonScrollTop />
      )}
    </>
  );
};
