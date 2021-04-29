import React from 'react';
import { Heading } from './heading';

import { Location } from './location';

export const ContactInfo = () => {
  return (
    <div className="contactWrapper">
      <div className="contact">
        <Heading value="Kontaktit" />
        <div className="contactLine">
          <a href="tel:+358451332558">
            <i className="fas fa-mobile-alt"></i>
            <span>+358451332558</span>
          </a>
        </div>
        <div className="contactLine">
          <a
            href="mailto:info@mivida.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="far fa-envelope"></i>
            <span>info@mivida.fi</span>
          </a>
        </div>
        <div className="contactLine">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
            <span>facebook.com</span>
          </a>
        </div>
        <div className="contactLine">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
            <span>@instagram</span>
          </a>
        </div>
        <Location />
      </div>
    </div>
  );
};
