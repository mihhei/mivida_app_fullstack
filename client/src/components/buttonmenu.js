import React, { useState } from 'react';
import { SlidingMenu } from './slidingmenu';

export const ButtonMenu = () => {
  const [menuButton, setMenuButton] = useState('');

  const clickHandler = () => {
    if (!menuButton) {
      setMenuButton(' selected');
    } else {
      setMenuButton('');
    }
  };
  const hideMenu = () => {
      setMenuButton('');
  }
  return (
    <>
      <div className={'menu-btn' + menuButton} onClick={clickHandler}>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>
      {menuButton && <SlidingMenu onScroll={hideMenu}/>}
    </>
  );
};
