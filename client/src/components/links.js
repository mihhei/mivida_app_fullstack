import React from 'react';
import { LinkTo } from './linkto';

export const Links = () => {
  return (
    <div className="links">
      <LinkTo linkName="Etusivu" toBlock="etusivu" scrollTime="0" />
      <LinkTo linkName="Meistä" toBlock="meista" scrollTime="1500" />
      <LinkTo linkName="Palvelut" toBlock="palvelut" scrollTime="2000" />
      <LinkTo linkName="Galleria" toBlock="galleria" scrollTime="2500" />
      <LinkTo linkName="Lahjakortti" toBlock="lahjakortti" scrollTime="3000" />
      <LinkTo linkName="Yhteystiedot" toBlock="yhteystiedot" scrollTime="3500" />
    </div>
  );
};
