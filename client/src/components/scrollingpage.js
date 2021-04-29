import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MainPage } from './mainpage';
import { Block1 } from './block1';
import { Block2 } from './block2';
import { Block3 } from './block3';
import { Block4 } from './block4';
import { Block5 } from './block5';

export const ScrollingPage = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash]);
  return (
    <>
      <MainPage />
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
    </>
  );
};
