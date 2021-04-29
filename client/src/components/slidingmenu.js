import React, { useCallback, useEffect, useState } from 'react';
import { Links } from './links';

export const SlidingMenu = ({ onScroll }) => {
  const [show, setShow] = useState('');

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setShow('');
      onScroll();
    }
  }, [onScroll]);

  useEffect(() => {
    setShow(' show');
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={'slidingMenu' + show}>
      <Links />
    </div>
  );
};
