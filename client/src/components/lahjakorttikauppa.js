import React from 'react';
import { Navbar } from './navbar';
import { LahjakorttiForm } from './lahjakorttiform';

export const LahjakorttiKauppa = () => {
  window.scrollTo(0, 0);
  return (
    <div className="block mainBackground">
      <Navbar />
      <LahjakorttiForm />
    </div>
  );
};
