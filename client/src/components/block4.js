import React from 'react';
import { Heading } from './heading';
import { NavLink } from 'react-router-dom';

export const Block4 = () => {
  return (
    <div className="block bl4" id="lahjakortti">
      <Heading value="Lahjakortti" />
      <NavLink className="btn btn-primary" to="/lahjakortti/kauppa">
        Ostoksille
      </NavLink>
    </div>
  );
};
