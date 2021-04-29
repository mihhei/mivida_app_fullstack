import React, { useEffect, useState, useCallback } from 'react';

export const ShowMap = ({ closeMap }) => {
  const [expand, setExpand] = useState('');
  const width = document.documentElement.clientWidth;

 /* const handleScroll = useCallback(() => {
    if (window.scrollY) {
      closeMap();
    }
  }, [closeMap]);

  useEffect(() => {
    setExpand(' expand');
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);*/

  useEffect(() => {
    setExpand(' expand');
  },[]);

  return (
    <>
      <div className="mapWrapper" onClick={closeMap.bind(null)}>
        {width > 500 && (
          <div className={'map' + expand}>
            <iframe
              title="mividaMap"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429.31702702283724!2d25.02964599898459!3d60.193129129740726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920947fe5a8c8f%3A0x77031db1bbbc5298!2sHalti%20Base%20Camp%20Store!5e1!3m2!1sfi!2sfi!4v1616481653951!5m2!1sfi!2sfi"
              width="600"
              height="450"
              style={{ border: '0' }}
              loading="lazy"
            ></iframe>
            <div className="closeButton" onClick={closeMap.bind(null)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        )}
        {width <= 500 && (
          <div className={'map' + expand + 'Small'}>
            <iframe
              title="mividaMapMob"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429.31702702283724!2d25.02964599898459!3d60.193129129740726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920947fe5a8c8f%3A0x77031db1bbbc5298!2sHalti%20Base%20Camp%20Store!5e1!3m2!1sfi!2sfi!4v1616481653951!5m2!1sfi!2sfi"
              width="400"
              height="600"
              style={{ border: '0' }}
              loading="lazy"
            ></iframe>
            <div className="closeButton" onClick={closeMap.bind(null)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
