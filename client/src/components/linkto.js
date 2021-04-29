import React from 'react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

export const LinkTo = ({ linkName, toBlock, scrollTime }) => {
  const path = window.location.pathname;
  const scrollToSection = (section, long) => {
    scroller.scrollTo(section, {
      duration: long || 2000,
      delay: 0,
      hashSpy: true,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <>
      {path === '/' && (
        <div
          className="link"
          onClick={scrollToSection.bind(null, toBlock, scrollTime)}
        >
          {linkName}
        </div>
      )}
      {path !== '/' && <Link className="link" to={`/#${toBlock}`}>{linkName}</Link>}
    </>
  );
};
