import React, {useState} from 'react';
import { ShowMap } from './showmap';

export const Location = () => {
    const [showMap, setShowMap] = useState(false);
  const closeMap = () => {
    setShowMap(false);
  };
    return (
        <>
        <div
          className="contactLine"
          id="mapShow"
          onClick={() => {
            setShowMap(!showMap);
          }}
        >
          <i className="fas fa-map-marker-alt"></i>
          <span>Herttoniemi</span>
        </div>
      {showMap && <ShowMap closeMap={closeMap} />}
      </>
    )
}